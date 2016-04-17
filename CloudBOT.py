#!/usr/bin/python3
import pika
import pickle
import base64
import cgi
import json
import uuid

cred = pika.PlainCredentials("terminal", "terminal")
param = pika.ConnectionParameters("localhost", 5672, "/", cred)
conn = pika.BlockingConnection(param)
chan = conn.channel()

jsonReply = {}

def on_request(ch, method, props, body):
    # Get response from machine
    senses = pickle.loads(base64.b64decode(body))
    jsonReply = globals()['jsonReply']
    jsonReply.update(senses)

batchName = None
def on_batch_request(ch, method, props, body):
    senses = pickle.loads(base64.b64decode(body))
    jsonReply = globals()['jsonReply']
    batchName = globals()['batchName']
    jsonReply.update({batchName: senses})

# Get stuff
reqKey = cgi.FieldStorage()
if "machinename" in reqKey and "command" in reqKey:
    # Send command if 'machinename' and 'command' is present
    print("Content-Type: application/json\n\n")
    machinename = reqKey.getvalue('machinename')
    command = reqKey.getvalue('command')
    jsonReply.update({"machinename":machinename, "command":command})
    chan.basic_publish(exchange='cbot', routing_key="cbot.{}".format(machinename), body=command)
    print(json.dumps(jsonReply))
elif "machinename" in reqKey:
    # Read from machine
    print("Content-Type: application/json\n\n")
    machinename = reqKey.getvalue('machinename')
    resQue = chan.queue_declare(exclusive=True)
    resName = resQue.method.queue
    jsonReply.update({"machinename":machinename, "queuename": resName})
    if machinename != "batch":
        prop = pika.BasicProperties(reply_to=resName)
        chan.basic_publish(exchange='cbot', routing_key="cbot.{}".format(machinename), body="pass", properties=prop)
        chan.basic_consume(on_request, no_ack=True, queue=resName)
        conn.process_data_events(1)
    else:
        for machName in ['cbot1', 'cbot2', 'cbot3']:
            batchName = machName
            jsonReply.update({batchName: {}})
            prop = pika.BasicProperties(reply_to=resName)
            chan.basic_publish(exchange='cbot', routing_key="cbot.{}".format(machName), body="pass", properties=prop)
            chan.basic_consume(on_batch_request, no_ack=True, queue=resName)
            conn.process_data_events(1)
    print(json.dumps(jsonReply))
elif "batch" in reqKey:
    # Read batch data
    print("Content-Type: application/json\n\n")
    batchStr = reqKey.getvalue('batch')
    batchObj = json.loads(batchStr)
    for machinename, command in batchObj.items():
        jsonReply.update({machinename:command['statement']})
        chan.basic_publish(exchange='cbot', routing_key="cbot.{}".format(machinename), body=command['statement'])
    print(json.dumps(jsonReply))
else:
    # Assume normal HTML file if no request passed
    print("Content-Type: text/html\n\n")
    htmlFile = open("./__index.html", "r")
    htmlStr = "\n".join(htmlFile.readlines())
    print(htmlStr)

var ws = new SockJS('http://banterbun.com/stomp');
var client = Stomp.over(ws);

var cbotClsObj = {}
function sendToCGIBIN(){
    var machineList = Object.keys(cbotClsObj)
    for(i = 0; i < machineList.length; i++){
        var statement = cbotClsObj[machineList[i]]['statement']
        client.send('/exchange/cbot/cbot.' + machineList[i], {"x-message-ttl":1800000, "content-type":"text/plain"}, statement);
    }
    alert("Packets sent to the broker");
}

//==========================
// CloudBOT units
//==========================
function createConnection(onConnectCallback, onErrorCallback){
    client.connect('terminal', 'terminal', onConnectCallback, onErrorCallback, '/');
}

function sendTelemetry(cbotName){
    return client.send('/exchange/cbot/cbot.' + cbotName,
        {"reply-to":"/temp-queue/" + cbotName + "_telemetry",
        "x-message-ttl": 500,
        "content-type":"text/plain"},
        "pass #@telemetry")
}

function placeToPrefix(telemetryData, nodePrefix){
    if (telemetryData['leftsense'] == undefined) document.getElementById(nodePrefix + "left").innerHTML = "\u2573"
    else if (telemetryData['leftsense'] == 1) document.getElementById(nodePrefix + "left").innerHTML = "\u25A0"
    else if (telemetryData['leftsense'] == 0) document.getElementById(nodePrefix + "left").innerHTML = "\u25A1"
    if (telemetryData['centersense'] == undefined) document.getElementById(nodePrefix + "center").innerHTML = "\u2573"
    else if (telemetryData['centersense'] == 1) document.getElementById(nodePrefix + "center").innerHTML = "\u25A0"
    else if (telemetryData['centersense'] == 0) document.getElementById(nodePrefix + "center").innerHTML = "\u25A1"
    if (telemetryData['rightsense'] == undefined) document.getElementById(nodePrefix + "right").innerHTML = "\u2573"
    else if (telemetryData['rightsense'] == 1) document.getElementById(nodePrefix + "right").innerHTML = "\u25A0"
    else if (telemetryData['rightsense'] == 0) document.getElementById(nodePrefix + "right").innerHTML = "\u25A1"
    if (telemetryData['distance'] == undefined) document.getElementById(nodePrefix + "distance").innerHTML = "-"
    else document.getElementById(nodePrefix + "distance").innerHTML = telemetryData['distance'].toFixed(2)
    if (telemetryData['temperature'] == undefined) document.getElementById(nodePrefix + "temp").innerHTML = "-"
    else document.getElementById(nodePrefix + "temp").innerHTML = telemetryData['temperature']
}

//=============================
// cbot_blocks.js
// Block definitions
//=============================

Blockly.Blocks['cbot_closure'] = {
    init: function() {
    this.appendStatementInput("cbot_closure")
        .setCheck(null)
        .appendField("CloudBOT")
        .appendField(new Blockly.FieldDropdown([['cbot1', 'cbot1'], ['cbot2', 'cbot2'], ['cbot3', 'cbot3']]), "cbot_name");
    this.setColour(45);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
    }
};
Blockly.Blocks['cbot_forward'] = {
    init: function() {
    this.appendDummyInput()
        .appendField("Forward");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(60);
    }
};
Blockly.Blocks['cbot_backward'] = {
    init: function() {
    this.appendDummyInput()
        .appendField("Backward");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(60);
    }
};
Blockly.Blocks['cbot_turnleft'] = {
    init: function() {
    this.appendDummyInput()
        .appendField("Turn Left");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(60);
    }
};
Blockly.Blocks['cbot_turnright'] = {
    init: function() {
    this.appendDummyInput()
        .appendField("Turn Right");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(60);
    }
};
Blockly.Blocks['cbot_halt'] = {
    init: function() {
    this.appendDummyInput()
        .appendField("Halt");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(60);
    }
};
Blockly.Blocks['cbot_import'] = {
    init: function() {
    this.appendDummyInput()
        .appendField("import")
        .appendField(new Blockly.FieldTextInput("time"), "cbot_import");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(50);
    }
};
Blockly.Blocks['cbot_sleep'] = {
    init: function() {
    this.appendDummyInput()
        .appendField("Sleep")
        .appendField(new Blockly.FieldTextInput("0"), "cbot_sleep")
        .appendField("second(s)");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(50);
    }
};
Blockly.Blocks['cbot_getdistance'] = {
    init: function() {
    this.setOutput(true, null);
    this.appendDummyInput()
        .appendField("Get Distance");
    this.setColour(210);
    }
};
Blockly.Blocks['cbot_gettemperature'] = {
    init: function() {
    this.setOutput(true, null);
    this.appendDummyInput()
        .appendField("Get Temperature");
    this.setColour(210);
    }
};
Blockly.Blocks['cbot_getbearing'] = {
    init: function() {
    this.setOutput(true, null);
    this.appendDummyInput()
        .appendField("Get Bearing");
    this.setColour(210);
    }
};
Blockly.Blocks['cbot_leftsense'] = {
    init: function() {
    this.setOutput(true, null);
    this.appendDummyInput()
        .appendField("Left Line Sensor");
    this.setColour(210);
    }
};
Blockly.Blocks['cbot_centersense'] = {
    init: function() {
    this.setOutput(true, null);
    this.appendDummyInput()
        .appendField("Center Line Sensor");
    this.setColour(210);
    }
};
Blockly.Blocks['cbot_rightsense'] = {
    init: function() {
    this.setOutput(true, null);
    this.appendDummyInput()
        .appendField("Right Line Sensor");
    this.setColour(210);
    }
};

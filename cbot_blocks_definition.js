//=============================
// cbot_blocks_definitions.js
// Code Definitions
//=============================
Blockly.Python['cbot_closure'] = function(block) {
    var dropdown_cbot_name = block.getFieldValue('cbot_name');
    var statements_cbot_closure = Blockly.Python.statementToCode(block, 'cbot_closure');

    if ( statements_cbot_closure != "" ){
        var stmt = statements_cbot_closure;

        var lines = stmt.split("\n")
        lines = ['import time'].concat(lines)
        var complete = false;
        while(!complete){
            complete = true;
            for(i = 1; i < lines.length; i++){
                if(lines[i] == lines[i-1]){
                    lines.splice(i, 1)
                    complete = false;
                }
            }
        }
        stmt = lines.join("\n")
        console.log("Sanitized:\n" + stmt)

        stmt = stmt.trim();
        stmt = stmt.split("\n  ")
        stmt = stmt.join("\n")
        cbotClsObj[dropdown_cbot_name] = {"statement":stmt, "id":block.id};
    }

    return stmt;
};
Blockly.Python['cbot_forward'] = function(block) {
    var code = 'forward()\n';
    return code;
};
Blockly.Python['cbot_backward'] = function(block) {
    var code = 'backward()\n';
    return code;
};
Blockly.Python['cbot_turnleft'] = function(block) {
    var code = 'turnleft()\n';
    return code;
};
Blockly.Python['cbot_turnright'] = function(block) {
    var code = 'turnright()\n';
    return code;
};
Blockly.Python['cbot_halt'] = function(block) {
    var code = 'halt()\n';
    return code;
};
Blockly.Python['cbot_import'] = function(block) {
    var text_cbot_import = block.getFieldValue('cbot_import');
    var code = 'import ' + text_cbot_import + '\n';
    return code;
};
Blockly.Python['cbot_sleep'] = function(block) {
    var text_cbot_sleep = block.getFieldValue('cbot_sleep');
    var code = 'time.sleep(' + text_cbot_sleep + ')\n';
    return code;
};
Blockly.Python['cbot_getdistance'] = function(block) {
    var code = 'getDistance()';
    return [code, Blockly.Python.ORDER_NONE];
};
Blockly.Python['cbot_gettemperature'] = function(block) {
    var code = 'getTemperature()';
    return [code, Blockly.Python.ORDER_NONE];
};
Blockly.Python['cbot_getbearing'] = function(block) {
    var code = 'getBearing()["t"]';
    return [code, Blockly.Python.ORDER_NONE];
};
Blockly.Python['cbot_leftsense'] = function(block) {
    var code = 'leftSense()';
    return [code, Blockly.Python.ORDER_NONE];
};
Blockly.Python['cbot_centersense'] = function(block) {
    var code = 'centerSense()';
    return [code, Blockly.Python.ORDER_NONE];
};
Blockly.Python['cbot_rightsense'] = function(block) {
    var code = 'rightSense()';
    return [code, Blockly.Python.ORDER_NONE];
};
Blockly.Python['cbot_forwardloop'] = function(block) {
    var text_cbot_instance = block.getFieldValue('cbot_instance');
    var text_cbot_distance = block.getFieldValue('cbot_distance');
    var code = 'forwardLoopBlock("' + text_cbot_instance + '",' + text_cbot_distance + ')';
    return [code, Blockly.Python.ORDER_NONE];
};
Blockly.Python['cbot_backwardloop'] = function(block) {
    var text_cbot_instance = block.getFieldValue('cbot_instance');
    var text_cbot_distance = block.getFieldValue('cbot_distance');
    var code = 'backwardLoopBlock("' + text_cbot_instance + '",' + text_cbot_distance + ')';
    return [code, Blockly.Python.ORDER_NONE];
};

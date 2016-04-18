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
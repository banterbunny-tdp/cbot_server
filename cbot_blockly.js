var workspace = Blockly.inject('blocklyDiv', {toolbox: document.getElementById('toolbox')});

// TODO: Debug mode. Display Source at bottom
workspace.addChangeListener(myUpdateFunction);
function myUpdateFunction(event) {
    var code = Blockly.Python.workspaceToCode(workspace);
    document.getElementById('blocklyCode').innerHTML = code.replace("\n", "<br/>");

    if ( event.type == Blockly.Events.DELETE && event.oldXml.getAttribute("type") == "cbot_closure"  ){
        var blockId = event.blockId;
        var closure = event.oldXml;
        var closureField = closure.getElementsByTagName("field")[0]
        var closureName = closureField.childNodes[0].textContent;
        console.log("Deleting a closure [" + closureName + "]")
        for( codeBlocks in cbotClsObj ){
            if( cbotClsObj[codeBlocks]["id"] == blockId){
                delete cbotClsObj[codeBlocks];
            }
        }
        console.log("Finding replacements for [" + closureName + "]")
        for( idx = 0; idx < workspace.topBlocks_.length; idx++ ){
            var fieldRow = workspace.topBlocks_[idx].inputList[0].fieldRow[1]
            if ( fieldRow != undefined ){
                if ( fieldRow.text_ == closureName ){
                    console.log("Blocks matched [" + closureName + "]")
                    cbotClsObj[closureName] = {"statement":Blockly.Python['cbot_closure'](workspace.topBlocks_[idx]), "id": workspace.topBlocks_[0].id}
                }
            }
        }
    }
}
Blockly.Blocks['string_length'] = {
  init: function() {
    this.jsonInit({
      "message0": 'length of %1',
      "args0": [
        {
          "type": "input_value",
          "name": "VALUE",
          "check": "String"
        }
      ],
      "output": "Number",
      "colour": 160,
      "tooltip": "Returns number of letters in the provided text.",
      "helpUrl": "http://www.w3schools.com/jsref/jsref_length_string.asp"
    });
  }
};


Blockly.JavaScript['string_length'] = function(block) {
  // Search the text for a substring.


  var code ='("asdasd").length';
  return [code, Blockly.JavaScript.ORDER_MEMBER];

};


Blockly.Blocks['require'] = {
  init: function() {
    this.jsonInit({
      "message0": 'require %1',
      "args0": [
        {
          "type": "input_value",
          "name": "VALUE",
          "check": "String"
        }
      ],
      "output": "String",
      "colour": 165,
      "tooltip": "",
      "helpUrl": "http://www.w3schools.com/jsref/jsref_length_string.asp"
    });
  }
};
 
Blockly.JavaScript['require'] = function(block) {

  // Search the text for a substring.
  var text = Blockly.JavaScript.valueToCode(block, 'VALUE',
      Blockly.JavaScript.ORDER_MEMBER) || '\'\'';

  var code ='require("'+text+'")';
  return [code, Blockly.JavaScript.ORDER_MEMBER];

};

// Example of cloze: "==cloze1==^[1]"
// or "==cloze==^[ash]"
var clozeBegin = "==";
var clozeEnd = "==";
var clozeSeqIndicatorBegin = "^[";
var clozeSeqIndicatorEnd = "]";
function escapeRegExp(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
function getClozes(text) {
    var clozes = [];
    var match;
    // for "{{c1:text}}" is const regex = /\{\{c(\d+):([^}]+)\}\}/g;
    // for "==text==^[1]" is const regex = /==([^=]+)==\^\[(\d+)\]/g;
    // for "==text==^[a]" is const regex = /==([^=]+)==\^\[([ash]+)\]/g;
    // for both is const regex = /==([^=]+)==\^\[(\d+|[ash]+)\]/g;
    // Scape regex special characters
    var cBegin = escapeRegExp(clozeBegin);
    var cEnd = escapeRegExp(clozeEnd);
    var csBegin = escapeRegExp(clozeSeqIndicatorBegin);
    var csEnd = escapeRegExp(clozeSeqIndicatorEnd);
    var regex = new RegExp("".concat(cBegin, "([^").concat(cEnd, "]+)").concat(cEnd).concat(csBegin, "(\\d+|[ash]+)").concat(csEnd), "g");
    while (match = regex.exec(text)) {
        clozes.push({
            text: match[1],
            seq: parseInt(match[2])
        });
    }
    return clozes;
}
function getFront(text, clozes, ask, hide) {
    var newText = text;
    for (var _i = 0, clozes_1 = clozes; _i < clozes_1.length; _i++) {
        var cloze = clozes_1[_i];
        var oldText = "".concat(clozeBegin).concat(cloze.text).concat(clozeEnd).concat(clozeSeqIndicatorBegin).concat(cloze.seq).concat(clozeSeqIndicatorEnd);
        if (ask.indexOf(cloze.seq) !== -1) {
            newText = newText.replace(oldText, "**[...]**");
        }
        else if (hide.indexOf(cloze.seq) !== -1) {
            newText = newText.replace(oldText, "...");
        }
        else {
            newText = newText.replace(oldText, cloze.text);
        }
    }
    return newText;
}
function getBack(text, clozes, hide) {
    var newText = text;
    for (var _i = 0, clozes_2 = clozes; _i < clozes_2.length; _i++) {
        var cloze = clozes_2[_i];
        var oldText = "".concat(clozeBegin).concat(cloze.text).concat(clozeEnd).concat(clozeSeqIndicatorBegin).concat(cloze.seq).concat(clozeSeqIndicatorEnd);
        if (hide.indexOf(cloze.seq) !== -1) {
            newText = newText.replace(oldText, "...");
        }
        else {
            newText = newText.replace(oldText, cloze.text);
        }
    }
    return newText;
}
// Example usage
var text = "This is a ==cloze1==^[1] ==cloze2==^[2] ==cloze3==^[3]";
var clozes = getClozes(text);
console.log(clozes);
console.log(text);
var ask = [1, 3];
var hide = [2];
var front = getFront(text, clozes, ask, hide);
console.log(front);
var back = getBack(text, clozes, hide);
console.log(back);

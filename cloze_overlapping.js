// Example of ClozeOL: "==cloze==^[ash]"
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
    var regex = new RegExp("".concat(cBegin, "([^").concat(cEnd, "]+)").concat(cEnd).concat(csBegin, "([ash]+)").concat(csEnd), "g");
    while (match = regex.exec(text)) {
        clozes.push({
            text: match[1],
            seq: match[2]
        });
    }
    // Garante que todos os clozes tem o mesmo tamanho de seq
    var maxSeq = 0;
    for (var _i = 0, clozes_1 = clozes; _i < clozes_1.length; _i++) {
        var cloze = clozes_1[_i];
        if (cloze.seq.length > maxSeq) {
            maxSeq = cloze.seq.length;
        }
    }
    for (var _a = 0, clozes_2 = clozes; _a < clozes_2.length; _a++) {
        var cloze = clozes_2[_a];
        if (cloze.seq.length < maxSeq) {
            while (cloze.seq.length < maxSeq) {
                cloze.seq += "s";
            }
        }
    }
    return clozes;
}
function getFront(text, clozes, card) {
    var newText = text;
    for (var _i = 0, clozes_3 = clozes; _i < clozes_3.length; _i++) {
        var cloze = clozes_3[_i];
        var oldText = "".concat(clozeBegin).concat(cloze.text).concat(clozeEnd).concat(clozeSeqIndicatorBegin).concat(cloze.seq).concat(clozeSeqIndicatorEnd);
        // Oculta o texto se o caractere da posição "card" for "h"
        if (cloze.seq[card] === "a") {
            newText = newText.replace(oldText, "**[...]**");
        }
        else if (cloze.seq[card] === "h") {
            newText = newText.replace(oldText, "...");
        }
        else if (cloze.seq[card] === "s") {
            newText = newText.replace(oldText, cloze.text);
        }
    }
    return newText;
}
function getBack(text, clozes, card) {
    var newText = text;
    for (var _i = 0, clozes_4 = clozes; _i < clozes_4.length; _i++) {
        var cloze = clozes_4[_i];
        var oldText = "".concat(clozeBegin).concat(cloze.text).concat(clozeEnd).concat(clozeSeqIndicatorBegin).concat(cloze.seq).concat(clozeSeqIndicatorEnd);
        if (cloze.seq[card] === "a") {
            newText = newText.replace(oldText, "**".concat(cloze.text, "**"));
        }
        else if (cloze.seq[card] === "h") {
            newText = newText.replace(oldText, "...");
        }
        else if (cloze.seq[card] === "s") {
            newText = newText.replace(oldText, cloze.text);
        }
    }
    return newText;
}
// Example usage
var text = "This is a ==cloze1==^[ash] ==cloze2==^[sha] ==cloze3==^[has]";
var clozes = getClozes(text);
console.log(clozes);
console.log(text);
var card = 0;
var front = getFront(text, clozes, card);
console.log(front);
var back = getBack(text, clozes, card);
console.log(back);

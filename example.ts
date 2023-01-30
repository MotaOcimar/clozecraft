import { ClozeOLNote } from "./cloze_overlapping";
import { ClozeClassicNote } from "./cloze_classic";
import { ClozeSimpleNote } from "./cloze_simple";
import { ClozeNote, ClozeDelimiters } from "./cloze";


// Example of cloze classic:     "==cloze1==%%1%%^[hint]"
// Example of cloze overlapping: "==cloze==%%ash%%^[hint]"
let clozeDelimiters1 = ClozeDelimiters.Builder().
    setBegin("==").
    setEnd("==").
    setSeqBegin("%%").
    setSeqEnd("%%").
    setHintBegin("^[").
    setHintEnd("]").
    build();

// Example of cloze classic:     "{cloze1}:1:[hint]"
// Example of cloze overlapping: "{cloze}:ash:[hint]"
let clozeDelimiters2 = ClozeDelimiters.Builder().
    setBegin("{").
    setEnd("}").
    setSeqBegin(":").
    setSeqEnd(":").
    setHintBegin("[").
    setHintEnd("]").
    build();


let delimiters = [clozeDelimiters1, clozeDelimiters2];

// Cloze Overlapping example usage
let text = "This is a ==cloze1==%%ash%%^[hint1] ==cloze2==%%ha%% {cloze3}:sha:[hint3]";

console.log(ClozeOLNote.isNote(text, delimiters))
console.log(ClozeClassicNote.isNote(text, delimiters))
console.log(ClozeSimpleNote.isNote(text, delimiters))

let clozeNote: ClozeNote = new ClozeOLNote(text, delimiters);

console.log(clozeNote.clozes);
console.log(clozeNote.text);

let card = 3;

let front = clozeNote.getFront(card);
console.log(front);
let back = clozeNote.getBack(card);
console.log(back);

// Cloze Classic example usage
text = "This is a ==cloze1==%%1%%^[hint1] ==cloze2==%%2%% {cloze3}:3:[hint3]";
console.log(ClozeOLNote.isNote(text, delimiters))
console.log(ClozeClassicNote.isNote(text, delimiters))
console.log(ClozeSimpleNote.isNote(text, delimiters))
clozeNote = new ClozeClassicNote(text, delimiters);

console.log(clozeNote.clozes);
console.log(clozeNote.text);

card = 1;

front = clozeNote.getFront(card);
console.log(front);
back = clozeNote.getBack(card);
console.log(back);


// Cloze Simple example usage
text = "This is a ==cloze1==^[hint1] {cloze2}[hint2] ==cloze3==";
console.log(ClozeOLNote.isNote(text, delimiters))
console.log(ClozeClassicNote.isNote(text, delimiters))
console.log(ClozeSimpleNote.isNote(text, delimiters))
clozeNote = new ClozeSimpleNote(text, delimiters);

console.log(clozeNote.clozes);
console.log(clozeNote.text);

card = 2;

front = clozeNote.getFront(card);
console.log(front);
back = clozeNote.getBack(card);
console.log(back);

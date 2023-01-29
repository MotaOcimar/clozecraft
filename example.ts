import { ClozeOLNote } from "./cloze_overlapping";
import { ClozeClassicNote } from "./cloze_classic";
import { ClozeNote } from "./cloze";


// Cloze Overlapping example usage
let text = "This is a ==cloze1==%%ash%%^[hint1] ==cloze2==%%ha%% ==cloze3==%%sha%%^[hint3]";
let clozeNote: ClozeNote = new ClozeOLNote(text);

console.log(clozeNote.clozes);
console.log(clozeNote.text);

let card = 3;

let front = clozeNote.getFront(card);
console.log(front);
let back = clozeNote.getBack(card);
console.log(back);

// Cloze Classic example usage
text = "This is a ==cloze1==%%1%%^[hint1] ==cloze2==%%2%% ==cloze3==%%3%%";
clozeNote = new ClozeClassicNote(text);

console.log(clozeNote.clozes);
console.log(clozeNote.text);

card = 1;

front = clozeNote.getFront(card);
console.log(front);
back = clozeNote.getBack(card);
console.log(back);

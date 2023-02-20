import { ClozeOLNote } from "./cloze_overlapping";
import { ClozeClassicNote } from "./cloze_classic";
import { ClozeSimpleNote } from "./cloze_simple";
import { ClozeFormattingImpl } from "./clozeFormatting/clozeFormatting";
import { ClozeNote } from "./cloze";


// Example of cloze classic:     "==cloze1==%%1%%^[hint]"
// Example of cloze overlapping: "==cloze==%%ash%%^[hint]"
let formatting1 = new ClozeFormattingImpl("==cloze==[%%123%%][^\\[hint\\]]");

// Example of cloze classic:     "{c1::cloze1::hint}"
// Example of cloze overlapping: "{cash::cloze::hint}
let formatting2 = new ClozeFormattingImpl("{[c123::]cloze[::hint]}");

let formattings = [formatting1, formatting2];

// Cloze Overlapping example usage
let text = "This is a ==cloze1==%%ash%%^[hint1] ==cloze2==%%ha%% {csha::cloze3::hint3}";

console.log(ClozeOLNote.isNote(text, formattings))
console.log(ClozeClassicNote.isNote(text, formattings))
console.log(ClozeSimpleNote.isNote(text, formattings))

let clozeNote: ClozeNote = new ClozeOLNote(text, formattings);

console.log(clozeNote.clozes);
console.log(clozeNote.text);

let card = 3;

let front = clozeNote.getFront(card);
console.log(front);
let back = clozeNote.getBack(card);
console.log(back);

// Cloze Classic example usage
text = "This is a ==cloze1==%%1%%^[hint1] ==cloze2==%%2%% {c3::cloze3::hint3}";
console.log(ClozeOLNote.isNote(text, formattings))
console.log(ClozeClassicNote.isNote(text, formattings))
console.log(ClozeSimpleNote.isNote(text, formattings))
clozeNote = new ClozeClassicNote(text, formattings);

console.log(clozeNote.clozes);
console.log(clozeNote.text);

card = 1;

front = clozeNote.getFront(card);
console.log(front);
back = clozeNote.getBack(card);
console.log(back);


// Cloze Simple example usage
text = "This is a ==cloze1==^[hint1] {cloze2::hint2} ==cloze3==";
console.log(ClozeOLNote.isNote(text, formattings))
console.log(ClozeClassicNote.isNote(text, formattings))
console.log(ClozeSimpleNote.isNote(text, formattings))
clozeNote = new ClozeSimpleNote(text, formattings);

console.log(clozeNote.clozes);
console.log(clozeNote.text);

card = 2;

front = clozeNote.getFront(card);
console.log(front);
back = clozeNote.getBack(card);
console.log(back);

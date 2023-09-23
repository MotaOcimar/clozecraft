import { ClozeNoteOL } from "../src/impl/cloze-note-overlapping";
import { ClozeNoteClassic } from "../src/impl/cloze-note-classic";
import { ClozeNoteSimple } from "../src/impl/cloze-note-simple";
import { ClozeFormattingImpl } from "../src/impl/cloze-formatting";
import { ClozeNote } from "../src/interfaces/cloze-note";


// Example of cloze classic:     "==cloze1==%%1%%^[hint]"
// Example of cloze overlapping: "==cloze==%%ash%%^[hint]"
let formatting1 = new ClozeFormattingImpl("==cloze==[%%123%%][^\\[hint\\]]");

// Example of cloze classic:     "{c1::cloze1::hint}"
// Example of cloze overlapping: "{cash::cloze::hint}
let formatting2 = new ClozeFormattingImpl("{[c123::]cloze[::hint]}");

let formattings = [formatting1, formatting2];

// Cloze Overlapping example usage
let text = "This is a ==cloze1==%%ash%%^[hint1] ==cloze2==%%ha%% {csha::cloze3::hint3}";

console.log(ClozeNoteOL.isNote(text, formattings))
console.log(ClozeNoteClassic.isNote(text, formattings))
console.log(ClozeNoteSimple.isNote(text, formattings))

let clozeNote: ClozeNote = new ClozeNoteOL(text, formattings);

console.log(clozeNote.clozeDeletions);
console.log(clozeNote.raw);

let card = 3;

let front = clozeNote.getFront(card);
console.log(front);
let back = clozeNote.getBack(card);
console.log(back);



// test("Cloze Overlapping", () => {
//     let text = "This is a ==cloze1==%%ash%%^[hint1] ==cloze2==%%ha%% {csha::cloze3::hint3}";
//     let clozeNote = new ClozeOLNote(text, formattings);
//     expect(clozeNote.clozes.length).toBe(3);
//     expect(clozeNote.clozes[0].text).toBe("cloze1");
//     expect(clozeNote.clozes[0].hint).toBe("hint1");
//     expect(clozeNote.clozes[0].seq).toBe("ash");
//     expect(clozeNote.clozes[1].text).toBe("cloze2");
//     expect(clozeNote.clozes[1].hint).toBe("");
//     expect(clozeNote.clozes[1].seq).toBe("ha");
//     expect(clozeNote.clozes[2].text).toBe("cloze3");
//     expect(clozeNote.clozes[2].hint).toBe("hint3");
//     expect(clozeNote.clozes[2].seq).toBe("sha");
//     expect(clozeNote.text).toBe("This is a cloze1 cloze2 cloze3");
//     expect(clozeNote.getFront(1)).toBe("This is a cloze1 cloze2 cloze3");
//     expect(clozeNote.getBack(1)).toBe("This is a ash cloze2 cloze3");
//     expect(clozeNote.getFront(2)).toBe("This is a cloze1 cloze2 cloze3");
//     expect(clozeNote.getBack(2)).toBe("This is a cloze1 ha cloze3");
//     expect(clozeNote.getFront(3)).toBe("This is a cloze1 cloze2 cloze3");
//     expect(clozeNote.getBack(3)).toBe("This is a cloze1 cloze2 sha");
// });

// Cloze Classic example usage
text = "This is a ==cloze1==%%1%%^[hint1] ==cloze2==%%2%% {c3::cloze3::hint3}";
console.log(ClozeNoteOL.isNote(text, formattings))
console.log(ClozeNoteClassic.isNote(text, formattings))
console.log(ClozeNoteSimple.isNote(text, formattings))
clozeNote = new ClozeNoteClassic(text, formattings);

console.log(clozeNote.clozeDeletions);
console.log(clozeNote.raw);

card = 1;

front = clozeNote.getFront(card);
console.log(front);
back = clozeNote.getBack(card);
console.log(back);


// Cloze Simple example usage
text = "This is a ==cloze1==^[hint1] {cloze2::hint2} ==cloze3==";
console.log(ClozeNoteOL.isNote(text, formattings))
console.log(ClozeNoteClassic.isNote(text, formattings))
console.log(ClozeNoteSimple.isNote(text, formattings))
clozeNote = new ClozeNoteSimple(text, formattings);

console.log(clozeNote.clozeDeletions);
console.log(clozeNote.raw);

card = 1;

front = clozeNote.getFront(card);
console.log(front);
back = clozeNote.getBack(card);
console.log(back);

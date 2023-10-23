import { ClozeNoteOL } from "../src/implementation/ClozeNoteOL";
import { ClozeNoteClassic } from "../src/implementation/ClozeNoteClassic";
import { ClozeNoteSimple } from "../src/implementation/ClozeNoteSimple";
import { ClozePattern } from "../src/implementation/ClozePattern";
import { IClozeNote } from "../src/interfaces/IClozeNote";


// Example of cloze classic:     "==cloze1==%%1%%^[hint]"
// Example of cloze overlapping: "==cloze==%%ash%%^[hint]"
let pattern1 = new ClozePattern("==answer==[%%123%%][^\\[hint\\]]");

// Example of cloze classic:     "{c1::cloze1::hint}"
// Example of cloze overlapping: "{cash::cloze::hint}
let pattern2 = new ClozePattern("{[c123::]answer[::hint]}");

let patterns = [pattern1, pattern2];

// Cloze Overlapping example usage
let text = "This is a ==cloze1==%%ash%%^[hint1] ==cloze2==%%ha%% {csha::cloze3::hint3}";

console.log(ClozeNoteOL.isNote(text, patterns))
console.log(ClozeNoteClassic.isNote(text, patterns))
console.log(ClozeNoteSimple.isNote(text, patterns))

let clozeNote: IClozeNote = new ClozeNoteOL(text, patterns);

console.log(clozeNote.clozeDeletions);
console.log(clozeNote.raw);

let card = 3;

let front = clozeNote.getCardFront(card);
console.log(front);
let back = clozeNote.getCardBack(card);
console.log(back);



// test("Cloze Overlapping", () => {
//     let text = "This is a ==cloze1==%%ash%%^[hint1] ==cloze2==%%ha%% {csha::cloze3::hint3}";
//     let clozeNote = new ClozeOLNote(text, patterns);
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
console.log(ClozeNoteOL.isNote(text, patterns))
console.log(ClozeNoteClassic.isNote(text, patterns))
console.log(ClozeNoteSimple.isNote(text, patterns))
clozeNote = new ClozeNoteClassic(text, patterns);

console.log(clozeNote.clozeDeletions);
console.log(clozeNote.raw);

card = 1;

front = clozeNote.getCardFront(card);
console.log(front);
back = clozeNote.getCardBack(card);
console.log(back);


// Cloze Simple example usage
text = "This is a ==cloze1==^[hint1] {cloze2::hint2} ==cloze3==";
console.log(ClozeNoteOL.isNote(text, patterns))
console.log(ClozeNoteClassic.isNote(text, patterns))
console.log(ClozeNoteSimple.isNote(text, patterns))
clozeNote = new ClozeNoteSimple(text, patterns);

console.log(clozeNote.clozeDeletions);
console.log(clozeNote.raw);

card = 1;

front = clozeNote.getCardFront(card);
console.log(front);
back = clozeNote.getCardBack(card);
console.log(back);

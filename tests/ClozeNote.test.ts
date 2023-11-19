import { ClozePattern } from '../src/implementation/ClozePattern';
import { ClozeNoteInitializer } from '../src/implementation/ClozeNoteInitializer';
import { ClozePatternMocksStr } from './mocks/ClozePatternMocks';
import { ClozeNoteMocks } from './mocks/ClozeNoteMocks';
import { IClozeNote } from '../src/interfaces/IClozeNote';


const clozePatternStrs = Object.values(ClozePatternMocksStr);
const patterns = clozePatternStrs.map(str => new ClozePattern(str));
const initializer = new ClozeNoteInitializer(patterns);

const compareNotes = (noteA: IClozeNote, noteB: IClozeNote) => {
    expect(noteA.raw).toEqual(noteB.raw);
    expect(noteA.clozeType).toEqual(noteB.clozeType);
    expect(noteA.numCards).toEqual(noteB.numCards);

    for (let i = 0; i < noteA.numCards; i++) {
        expect(noteA.getCardFront(i)).toEqual(noteB.getCardFront(i));
        expect(noteA.getCardBack(i)).toEqual(noteB.getCardBack(i));
    }
}

test('ClozeNote SHOULD have the correct properties WHEN \
the text contains one or more cloze deletions', () => {

    for (const mockNote of ClozeNoteMocks.ankiLikeNotes.noteList) {
        const clozeNote = initializer.createClozeNoteFromText(mockNote.raw);
    
        if (!clozeNote) {
            throw new Error("Cloze note is null but it shouldn't be.");
        }
        compareNotes(clozeNote, mockNote);
    }
});

import { ClozePattern } from '../src/implementation/ClozePattern';
import { ClozeNoteInitializer } from '../src/implementation/ClozeNoteInitializer';
import { ClozeNoteMocks } from './mocks/ClozeNoteMocks';
import { IClozeNote } from '../src/interfaces/IClozeNote';


const compareNotes = (noteA: IClozeNote, noteB: IClozeNote) => {
    expect(noteA.raw).toEqual(noteB.raw);
    expect(noteA.clozeType).toEqual(noteB.clozeType);
    expect(noteA.numCards).toEqual(noteB.numCards);

    for (let i = 0; i < noteA.numCards; i++) {
        expect(noteA.getCardFront(i)).toEqual(noteB.getCardFront(i));
        expect(noteA.getCardBack(i)).toEqual(noteB.getCardBack(i));
    }
}

test('ClozeNote SHOULD have the correct properties after creation', () => {

    for ( const notesMock of ClozeNoteMocks ) {
        const patterns = [new ClozePattern(notesMock.patternStr)];
        const initializer = new ClozeNoteInitializer(patterns);
    
        for (const mockNote of notesMock.noteList) {
            const clozeNote = initializer.createClozeNoteFromText(mockNote.raw);
        
            if (!clozeNote) {
                throw new Error("Cloze note is null but it shouldn't be.");
            }
            compareNotes(clozeNote, mockNote);
        }
    }
});

import { ClozeCrafter } from '../src/implementation/ClozeCrafter';
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


for ( const notesMock of ClozeNoteMocks ) {
    const clozeCrafter = new ClozeCrafter( [notesMock.patternStr] );

    for (const noteMock of notesMock.noteList) {
        test(`ClozeNote SHOULD have the correct properties after creation WHEN ${noteMock._noteDescription}`, () => {

            const clozeNote = clozeCrafter.createClozeNote(noteMock.raw);

            expect(clozeNote).not.toBeNull();
            compareNotes(clozeNote!, noteMock);
        });
    }
}

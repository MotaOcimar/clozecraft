import { ClozePattern } from '../src/implementation/ClozePattern';
import { ClozeNoteInitializer } from '../src/implementation/ClozeNoteInitializer';
import { ClozePatternMocksStr } from './mocks/ClozePatternMocks';
import { ClozeNoteMocks } from './mocks/ClozeNoteMocks';


const clozePatternStrs = Object.values(ClozePatternMocksStr);
const patterns = clozePatternStrs.map(str => new ClozePattern(str));
const initializer = new ClozeNoteInitializer(patterns);


test('ClozeNote SHOULD have the correct properties WHEN \
the text contains one or more cloze deletions', () => {
    const clozeNoteMock = ClozeNoteMocks.ankiLikeNotes[0];
    const text = clozeNoteMock.raw;
    const clozeNote = initializer.createClozeNoteFromText(text);

    if (!clozeNote) {
        throw new Error("Cloze note is null but it shouldn't be.");
    }
    expect(clozeNote.raw).toEqual(clozeNoteMock.raw);
    expect(clozeNote.clozeType).toEqual(clozeNoteMock.clozeType);
    expect(clozeNote.numCards).toEqual(clozeNoteMock.numCards);

    for (let i = 0; i < clozeNote.numCards; i++) {
        expect(clozeNote.getCardFront(i)).toEqual(clozeNoteMock.getCardFront(i));
        expect(clozeNote.getCardBack(i)).toEqual(clozeNoteMock.getCardBack(i));
    }
});

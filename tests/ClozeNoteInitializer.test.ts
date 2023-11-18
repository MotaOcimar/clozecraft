import { ClozePattern } from '../src/implementation/ClozePattern';
import { ClozeNoteInitializer } from '../src/implementation/ClozeNoteInitializer';
import { ClozePatternMocksStr } from './mocks/ClozePatternMocks';
import { ClozeNoteMocks } from './mocks/ClozeNoteMocks';


const clozePatternStrs = Object.values(ClozePatternMocksStr);
const patterns = clozePatternStrs.map(str => new ClozePattern(str));
const initializer = new ClozeNoteInitializer(patterns);


test('ClozeNoteInitializer SHOULD return null WHEN \
the text does not contain any cloze deletion', () => {
    const text = 'This is a text without any cloze deletion.';
    const clozeNote = initializer.createClozeNoteFromText(text);
    expect(clozeNote).toBeNull();
});

test('ClozeNoteInitializer SHOULD return a cloze note object WHEN \
the text contains one or more cloze deletions', () => {
    const text = ClozeNoteMocks.ankiLikeNotes[0].raw;
    const clozeNote = initializer.createClozeNoteFromText(text);
    expect(clozeNote).not.toBeNull();
});

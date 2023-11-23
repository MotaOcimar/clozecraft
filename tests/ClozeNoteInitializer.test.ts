import { ClozePattern } from '../src/implementation/ClozePattern';
import { ClozeNoteInitializer } from '../src/implementation/ClozeNoteInitializer';
import { ClozeNoteMocks } from './mocks/ClozeNoteMocks';


test('ClozeNoteInitializer SHOULD return null WHEN \
the text does not contain any cloze deletion', () => {
    const patterns = ClozeNoteMocks.map( notesMock => new ClozePattern(notesMock.patternStr) );
    const initializer = new ClozeNoteInitializer(patterns);

    const text = 'This is a text without any cloze deletion.';
    const clozeNote = initializer.createClozeNoteFromText(text);
    expect(clozeNote).toBeNull();
});

test('ClozeNoteInitializer SHOULD return a cloze note object WHEN \
the text contains one or more cloze deletions', () => {
    const patterns = ClozeNoteMocks.map( notesMock => new ClozePattern(notesMock.patternStr) );
    const initializer = new ClozeNoteInitializer(patterns);

    const text = ClozeNoteMocks[0].noteList[0].raw;
    const clozeNote = initializer.createClozeNoteFromText(text);
    expect(clozeNote).not.toBeNull();
});

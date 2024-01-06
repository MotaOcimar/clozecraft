import { ClozeCrafter } from '../src/implementation/ClozeCrafter';
import { ClozeNoteMocks } from './mocks/ClozeNoteMocks';


test('ClozeCrafter SHOULD return null WHEN \
the text does not contain any cloze deletion', () => {
    const patterns = ClozeNoteMocks.map( note => note.patternStr );
    const clozeCrafter = new ClozeCrafter(patterns);

    const text = 'This is a text without any cloze deletion.';
    const clozeNote = clozeCrafter.createClozeNote(text);
    expect(clozeNote).toBeNull();
});

test('ClozeCrafter SHOULD return a cloze note object WHEN \
the text contains one or more cloze deletions', () => {
    const patterns = ClozeNoteMocks.map( note => note.patternStr );
    const clozeCrafter = new ClozeCrafter(patterns);

    const text = ClozeNoteMocks[0].noteList[0].raw;
    const clozeNote = clozeCrafter.createClozeNote(text);
    expect(clozeNote).not.toBeNull();
});

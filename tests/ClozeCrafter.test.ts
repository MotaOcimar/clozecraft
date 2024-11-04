import { ClozeCrafter } from '../src/implementation/ClozeCrafter';
import { ClozeNoteMocks } from './mocks/ClozeNoteMocks';


test('ClozeCrafter SHOULD return null WHEN \
the text does not contain any cloze deletion', () => {
    const patterns = ClozeNoteMocks[0].patterns;
    const clozeCrafter = new ClozeCrafter(patterns);

    const text = 'This is a text without any cloze deletion.';
    const clozeNote = clozeCrafter.createClozeNote(text);
    expect(clozeNote).toBeNull();
});

test('ClozeCrafter SHOULD return a cloze note object WHEN \
the text contains one or more cloze deletions', () => {
    const noteMock = ClozeNoteMocks[0].noteList[0];
    const patterns = ClozeNoteMocks[0].patterns;
    const clozeCrafter = new ClozeCrafter(patterns);

    const text = noteMock.raw;
    const clozeNote = clozeCrafter.createClozeNote(text);
    expect(clozeNote).not.toBeNull();
});

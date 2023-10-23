import { ClozePattern } from '../src/implementation/ClozePattern';

test('ClozePattern constructor SHOULD throw an error WHEN \
the pattern is missing the cloze sequence number', () => {
    const patternWithoutClozeSeqNumber = '{{answer[::hint]}}';
    expect(() => new ClozePattern(patternWithoutClozeSeqNumber)).toThrowError();
});

test('ClozePattern constructor SHOULD throw an error WHEN \
the pattern is missing the answer', () => {
    const patternWithoutAnswer = '{{[c123::][::hint]}}';
    expect(() => new ClozePattern(patternWithoutAnswer)).toThrowError();
});

test('ClozePattern constructor SHOULD throw an error WHEN \
the pattern is missing the hint', () => {
    const patternWithoutHint = '{{[c123::]answer}}';
    expect(() => new ClozePattern(patternWithoutHint)).toThrowError();
});
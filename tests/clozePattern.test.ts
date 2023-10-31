import { ClozePattern } from '../src/implementation/ClozePattern';
import { ClozePatternMocksStr } from './mocks/ClozePatternMocks';
import { ClozeFieldEnum } from '../src/implementation/ClozeFieldEnum';

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

test('ClozePattern constructor SHOULD return a ClozePattern object WITH \
the correct cloze fields order', () => {
    const patternStr = ClozePatternMocksStr.ankiLikePatternStr;
    const clozePattern = new ClozePattern(patternStr);
    expect(clozePattern.clozeFieldsOrder).toEqual([
        ClozeFieldEnum.seq,
        ClozeFieldEnum.answer,
        ClozeFieldEnum.hint
    ]);

    const patternStr2 = ClozePatternMocksStr.commentsAndFootNotesPatternStr;
    const clozePattern2 = new ClozePattern(patternStr2);
    expect(clozePattern2.clozeFieldsOrder).toEqual([
        ClozeFieldEnum.answer,
        ClozeFieldEnum.seq,
        ClozeFieldEnum.hint
    ]);

    const patternStr3 = ClozePatternMocksStr.boldSeqFirstPatternStr;
    const clozePattern3 = new ClozePattern(patternStr3);
    expect(clozePattern3.clozeFieldsOrder).toEqual([
        ClozeFieldEnum.seq,
        ClozeFieldEnum.answer,
        ClozeFieldEnum.hint
    ]);

    const patternStr4 = ClozePatternMocksStr.boldHintFirstPatternStr;
    const clozePattern4 = new ClozePattern(patternStr4);
    expect(clozePattern4.clozeFieldsOrder).toEqual([
        ClozeFieldEnum.hint,
        ClozeFieldEnum.answer,
        ClozeFieldEnum.seq
    ]);

    const patternStr5 = ClozePatternMocksStr.boldAnswerFirstPatternStr;
    const clozePattern5 = new ClozePattern(patternStr5);
    expect(clozePattern5.clozeFieldsOrder).toEqual([
        ClozeFieldEnum.answer,
        ClozeFieldEnum.hint,
        ClozeFieldEnum.seq
    ]);
});

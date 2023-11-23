import { ClozePattern } from "../../src/implementation/ClozePattern";

const ankiLikePatternStr = '{{[c123::]answer[::hint]}}';
const boldSeqFirstPatternStr = '**[123::]answer[::hint]**';
const boldHintFirstPatternStr = '**[hint::]answer[::123]**';
const boldAnswerFirstPatternStr = '**answer[::hint][::123]**';
const commentsAndFootNotesPatternStr = '==answer==[%%123%%][^\\[hint\\]]';

export const ClozePatternMocksStr = {
    ankiLikePatternStr,
    boldSeqFirstPatternStr,
    boldHintFirstPatternStr,
    boldAnswerFirstPatternStr,
    commentsAndFootNotesPatternStr
};

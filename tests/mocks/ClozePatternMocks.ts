import { ClozePattern } from "../../src/implementation/ClozePattern";

const ankiLikePatternStr = '{{[c123::]answer[::hint]}}';
const commentsAndFootNotesPatternStr = '[answer][%%123%%][^\\[hint\\]]';
const boldSeqFirstPatternStr = '*[123::][answer][::hint]*';
const boldHintFirstPatternStr = '*[hint::][answer][::123]*';
const boldAnswerFirstPatternStr = '*[answer][::hint][::123]*';

export const ClozePatternMocksStr = {
    ankiLikePatternStr,
    commentsAndFootNotesPatternStr,
    boldSeqFirstPatternStr,
    boldHintFirstPatternStr,
    boldAnswerFirstPatternStr
};

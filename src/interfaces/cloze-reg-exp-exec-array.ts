export interface ClozeRegExpExecArray extends RegExpExecArray {
    clozeText: string;
    clozeHint: string;
    clozeSeq: string | null;
}

export interface IClozeRegExpExecArray extends RegExpExecArray {
    clozeText: string;
    clozeHint: string;
    clozeSeq: string | null;
}

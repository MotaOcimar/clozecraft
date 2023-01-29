import { escapeRegExp } from "./utils";


// Example of cloze classic:     "==cloze1==%%1%%^[hint]"
// Example of cloze overlapping: "==cloze==%%ash%%^[hint]"
export let clozeBegin = "=="
export let clozeEnd = "=="
export let clozeSeqBegin = "%%"
export let clozeSeqEnd = "%%"
export let clozeHintBegin = "^["
export let clozeHintEnd = "]"

// Escaped regex
export let clozeBeginEsc = escapeRegExp(clozeBegin);
export let clozeEndEsc = escapeRegExp(clozeEnd);
export let clozeSeqBeginEsc = escapeRegExp(clozeSeqBegin);
export let clozeSeqEndEsc = escapeRegExp(clozeSeqEnd);
export let clozeHintBeginEsc = escapeRegExp(clozeHintBegin);
export let clozeHintEndEsc = escapeRegExp(clozeHintEnd);

export interface Cloze {
    raw: string;
    text: string;
    seq: number | string;
    hint: string;
}

export interface ClozeNote {
    text: string;
    clozes: Cloze[];
    numCards: number;
    getFront(card: number): string;
    getBack(card: number): string;
}

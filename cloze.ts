import { escapeRegExp } from "./utils";


// Example of cloze classic:     "==cloze1==^[1]"
// Example of cloze overlapping: "==cloze==^[ash]"
export let clozeBegin = "=="
export let clozeEnd = "=="
export let clozeSeqBegin = "^["
export let clozeSeqEnd = "]"

// Escaped regex
export let clozeBeginEsc = escapeRegExp(clozeBegin);
export let clozeEndEsc = escapeRegExp(clozeEnd);
export let clozeSeqBeginEsc = escapeRegExp(clozeSeqBegin);
export let clozeSeqEndEsc = escapeRegExp(clozeSeqEnd);

export interface Cloze {
    text: string;
    seq: number | string;
}

export interface ClozeNote {
    text: string;
    clozes: Cloze[];
    numCards: number;
    getFront(card: number): string;
    getBack(card: number): string;
}

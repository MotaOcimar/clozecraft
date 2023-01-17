
// Example of cloze classic:     "==cloze1==^[1]"
// Example of cloze overlapping: "==cloze==^[ash]"
export let clozeBegin = "=="
export let clozeEnd = "=="
export let clozeSeqIndicatorBegin = "^["
export let clozeSeqIndicatorEnd = "]"

export interface Cloze {
    text: string;
    seq: number|string;
}

export interface ClozeNote {
    text: string;
    clozes: Cloze[];
    getFront(card: number): string;
    getBack(card: number): string;
}
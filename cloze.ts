import { ClozeFormatting } from "./clozeFormatting/clozeFormatting";

export interface Cloze {
    raw: string;
    text: string;
    seq: number | string;
    hint: string;
}

export interface ClozeNote {
    get text(): string;
    get clozes(): Cloze[];
    get numCards(): number;
    getFront(card: number): string;
    getBack(card: number): string;
}

export class ClozeNoteDefault {
    protected _text: string;
    protected _clozes: Cloze[];
    protected _numCards: number;

    constructor(text: string) {
        this._text = text;
        this._clozes = [];
        this._numCards = 0;
    }

    get text(): string {
        return this._text;
    }

    get clozes(): Cloze[] {
        return this._clozes;
    }

    get numCards(): number {
        return this._numCards;
    }
}

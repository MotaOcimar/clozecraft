/**
 * Interface Cloze
 *
 * Represents a single cloze test question.
 * It contains information about the original text, the text with a blank, the sequence
 * number that identifies the question, and an optional hint to aid the user in completing
 * the blank.
 */
export interface Cloze {
    /**
    * The original raw text of the cloze test question, including the blank to be filled.
    * Example: "{{c1::Brazil::country}}"
    */
    raw: string;
    /**
    * The answer text of the cloze test question.
    * Example: "Brazil" in "{{c1::Brazil::country}}"
    */
    text: string;
    /**
    * The sequence number or identifier of the cloze test question.
    * It can be a number or a string, used to order or identify the questions in a set.
    * Example: 1 in "{{c1::Brazil::country}}"
    */
    seq: number | string;
    /**
    * An optional hint to provide additional information or context to help the user
    * answer the cloze test question.
    * Example: "country" in "{{c1::Brazil::country}}"
    */
    hint: string;
}

/**
 * Interface ClozeNote
 *
 * Represents a set of cloze test questions. It contains the original text and the
 * list of cloze test questions. It also contains the number of cards, which is the
 * number of questions in the set. It also provides methods to get the front and back
 * of each card.
 */
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

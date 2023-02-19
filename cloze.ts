import { escapeRegexString } from "./utils";

export class ClozeDelimiters {
    private readonly _begin: string;
    private readonly _end: string;
    private readonly _seqBegin: string;
    private readonly _seqEnd: string;
    private readonly _hintBegin: string;
    private readonly _hintEnd: string;

    constructor(begin: string, end: string, seqBegin: string, seqEnd: string, hintBegin: string, hintEnd: string) {
        this._begin = begin;
        this._end = end;
        this._seqBegin = seqBegin;
        this._seqEnd = seqEnd;
        this._hintBegin = hintBegin;
        this._hintEnd = hintEnd;
    }

    static Builder(): ClozeDelimitersBuilder {
        return new ClozeDelimitersBuilder();
    }

    get begin(): string {
        return this._begin;
    }

    get end(): string {
        return this._end;
    }

    get seqBegin(): string {
        return this._seqBegin;
    }

    get seqEnd(): string {
        return this._seqEnd;
    }

    get hintBegin(): string {
        return this._hintBegin;
    }

    get hintEnd(): string {
        return this._hintEnd;
    }

    get beginEsc(): string {
        return escapeRegexString(this._begin);
    }

    get endEsc(): string {
        return escapeRegexString(this._end);
    }

    get seqBeginEsc(): string {
        return escapeRegexString(this._seqBegin);
    }

    get seqEndEsc(): string {
        return escapeRegexString(this._seqEnd);
    }

    get hintBeginEsc(): string {
        return escapeRegexString(this._hintBegin);
    }

    get hintEndEsc(): string {
        return escapeRegexString(this._hintEnd);
    }
}

class ClozeDelimitersBuilder {
    private begin: string;
    private end: string;
    private seqBegin: string;
    private seqEnd: string;
    private hintBegin: string;
    private hintEnd: string;
    
    setBegin(begin: string): ClozeDelimitersBuilder {
        this.begin = begin;
        return this;
    }

    setEnd(end: string): ClozeDelimitersBuilder {
        this.end = end;
        return this;
    }

    setSeqBegin(seqBegin: string): ClozeDelimitersBuilder {
        this.seqBegin = seqBegin;
        return this;
    }

    setSeqEnd(seqEnd: string): ClozeDelimitersBuilder {
        this.seqEnd = seqEnd;
        return this;
    }

    setHintBegin(hintBegin: string): ClozeDelimitersBuilder {
        this.hintBegin = hintBegin;
        return this;
    }

    setHintEnd(hintEnd: string): ClozeDelimitersBuilder {
        this.hintEnd = hintEnd;
        return this;
    }

    build(): ClozeDelimiters {
        // Check if all fields are set
        if (this.begin === undefined || this.begin === "" ||
            this.end === undefined || this.end === "" ||
            this.seqBegin === undefined || this.seqBegin === "" ||
            this.seqEnd === undefined || this.seqEnd === "" ||
            this.hintBegin === undefined || this.hintBegin === "" ||
            this.hintEnd === undefined || this.hintEnd === ""
            ) {
            throw new Error("Not all fields are set");
        }

        return new ClozeDelimiters(this.begin, this.end, this.seqBegin, this.seqEnd, this.hintBegin, this.hintEnd);
    }
}

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

    static isNote(text: string, delimiters: ClozeDelimiters[]):boolean {
        let ans = false;

        this.parse(text, delimiters, function(regex: RegExp) {
            if ( regex.test(text) ){
                ans = true;
                return false; // stop parsing
            }
        } )

        return ans;
    }

    // Must be overridden to replace the regex
    protected static parse(text: string, delimiters: ClozeDelimiters[], fun: Function) {
        for (const cd of delimiters) {
            const regex = new RegExp(`(${cd.beginEsc}([^${cd.endEsc}]+)${cd.endEsc}${cd.seqBeginEsc}(\\d+)${cd.seqEndEsc}(?:${cd.hintBeginEsc}([^${cd.hintEndEsc}]+)${cd.hintEndEsc})?)`, "g");
    
            if ( fun(regex) === false ) {
                break;
            }
        }
    }
}

import { IClozeDeletion } from "../interfaces/IClozeDeletion";
import { IClozeFormat } from "../interfaces/IClozeFormat";
import { IClozeNote } from "../interfaces/IClozeNote";
import { IClozePattern } from "../interfaces/IClozePattern";
import { ClozeTypeEnum } from "./ClozeTypeEnum";

/**
 * Class ClozeNote
 * 
 * This class is not meant to be used directly. It serves as a base implementation
 * for common methods used in other implementations of ClozeNote.
 */
export abstract class ClozeNote<T extends IClozeDeletion> implements IClozeNote {
    protected _raw: string;
    protected _clozeDeletions: T[];
    protected _numCards: number;

    /**
     * Creates a new ClozeNote instance.
     * 
     * @param raw The raw text of the cloze note before processing.
     */
    constructor(raw: string, patterns: IClozePattern[]) {
        this._raw = raw;
        
        const { clozeDeletions, numCards } = this.initParsing(raw, patterns);
        this._clozeDeletions = clozeDeletions;
        this._numCards = numCards;
    }

    abstract get clozeType(): ClozeTypeEnum;

    protected abstract initParsing(rawNote: string, patterns: IClozePattern[]): { clozeDeletions: T[], numCards: number };

    get raw(): string {
        return this._raw;
    }

    get numCards(): number {
        return this._numCards;
    }

    abstract getCardFront(cardIndex: number, format?:IClozeFormat): string;
    abstract getCardBack(cardIndex: number, format?:IClozeFormat): string;
}

import { IClozeDeletion } from "../interfaces/IClozeDeletion";
import { IClozeFormat } from "../interfaces/IClozeFormat";
import { IClozeNote } from "../interfaces/IClozeNote";
import { ClozeTypeEnum } from "./ClozeTypeEnum";

/**
 * Class ClozeNoteDefault
 * 
 * This class is not meant to be used directly. It serves as a base implementation
 * for common methods used in other implementations of ClozeNote.
 */
export abstract class ClozeNoteDefault implements IClozeNote {
    protected _raw: string;
    protected _clozeDeletions: IClozeDeletion[];
    protected _numCards: number;
    protected _clozeType: ClozeTypeEnum;

    /**
     * Creates a new ClozeNoteDefault instance.
     * 
     * @param raw The raw text of the cloze note before processing.
     */
    constructor(raw: string) {
        this._raw = raw;
        this._clozeDeletions = [];
        this._numCards = 0;
    }

    get clozeType(): ClozeTypeEnum {
        return this._clozeType;
    }

    get raw(): string {
        return this._raw;
    }

    get numCards(): number {
        return this._numCards;
    }

    abstract getCardFront(cardIndex: number, format?:IClozeFormat): string;
    abstract getCardBack(cardIndex: number, format?:IClozeFormat): string;
}

import { ClozeDeletionClassic } from "./ClozeDeletionClassic";
import { IClozeNote } from "../interfaces/IClozeNote";
import { ClozeNoteDefault } from "./ClozeNoteDefault";
import { IClozePattern } from "../interfaces/IClozePattern";
import { IClozeRegExpExecArray } from "../interfaces/IClozeRegExpExecArray";
import { simpleFormat } from "./utils";
import { ClozeTypeEnum } from "./ClozeTypeEnum";
import { IClozeFormat } from "../interfaces/IClozeFormat";


export class ClozeNoteClassic extends ClozeNoteDefault implements IClozeNote  {
    protected _clozeDeletions: ClozeDeletionClassic[];

    constructor(text: string, patterns: IClozePattern[]) {
        super(text);
        this._clozeType = ClozeTypeEnum.CLASSIC;
        this.initParsing(text, patterns);
    }

    protected initParsing(text: string, patterns: IClozePattern[]): void {

        let deletions: ClozeDeletionClassic[] = [];
        let numCards = 0;

        patterns.forEach( (pattern) => {
            const regex = pattern.getClozeRegex(ClozeTypeEnum.CLASSIC);

            let match: IClozeRegExpExecArray | null;

            while (match = regex.exec(text)) {

                let newCloze: ClozeDeletionClassic = {
                    raw: match.raw,
                    answer: match.answer,
                    seq: parseInt(match.seq),
                    hint: match.hint
                };

                deletions.push(newCloze);

                // Get the max seq
                if (numCards < newCloze.seq) {
                    numCards = newCloze.seq;
                }
            }
        } )

        this._clozeDeletions = deletions;
        this._numCards = numCards;
    }

    getCardFront(cardIndex: number, format?: IClozeFormat): string {
        if (cardIndex >= this._numCards || cardIndex < 0) {
            throw new Error(`Card ${cardIndex} does not exist`);
        }

        if (!format) {
            format = new simpleFormat();
        }

        let frontText = this.raw;
        for (const deletion of this._clozeDeletions) {

            if (deletion.seq !== cardIndex + 1) {
                frontText = frontText.replace(deletion.raw, deletion.answer); // Just show
                continue;
            }

            if (deletion.hint !== undefined) {
                frontText = frontText.replace(deletion.raw, format.hinting(deletion.hint) ); // Hide asked cloze with hint
                continue
            }

            frontText = frontText.replace(deletion.raw, format.asking(deletion.answer)); // Hide asked cloze
        }
        return frontText;
    }

    getCardBack(cardIndex: number, format?:IClozeFormat): string {
        if (cardIndex >= this._numCards || cardIndex < 0) {
            throw new Error(`Card ${cardIndex} does not exist`);
        }

        if (!format) {
            format = new simpleFormat();
        }

        let backText = this.raw;
        for (const deletion of this._clozeDeletions) {

            if (deletion.seq === cardIndex + 1) {
                backText = backText.replace(deletion.raw, format.showing(deletion.answer)); // Show as answer
            } else {
                backText = backText.replace(deletion.raw, deletion.answer); // Just show
            }
        }
        return backText;
    }
}

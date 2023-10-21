import { ClozeDeletionClassic } from "./ClozeDeletionClassic";
import { IClozeNote } from "../interfaces/IClozeNote";
import { ClozeNoteDefault } from "./ClozeNoteDefault";
import { ClozeFormatting } from "./ClozeFormatting";
import { IClozeRegExpExecArray } from "../interfaces/IClozeRegExpExecArray";
import { format } from "./utils";


export class ClozeNoteClassic extends ClozeNoteDefault implements IClozeNote  {
    protected _clozeDeletions: ClozeDeletionClassic[];

    constructor(text: string, formattings: ClozeFormatting[]) {
        super(text);
        this.initParsing(text, formattings);
    }

    protected initParsing(text: string, formattings: ClozeFormatting[]): void {

        let clozes: ClozeDeletionClassic[] = [];
        let numCards = 0

        formattings.forEach( (formatting) => {
            const regex = formatting.clozeClassicRegex;

            let match: IClozeRegExpExecArray | null;

            while (match = regex.exec(text)) {

                let newCloze: ClozeDeletionClassic = {
                    raw: match[0],
                    answer: match.clozeText,
                    seq: parseInt(match.clozeSeq),
                    hint: match.clozeHint
                }

                clozes.push(newCloze);

                // Get the max seq
                if (numCards < newCloze.seq) {
                    numCards = newCloze.seq;
                }
            }
        } )

        this._clozeDeletions = clozes;
        this._numCards = numCards;
    }

    static isNote(text: string, formattings: ClozeFormatting[]): boolean {
        for (const formatting of formattings) {
            const regex = formatting.clozeClassicRegex;
            if ( regex.test(text) ){
                return true;
            }
        }
        return false;
    }

    getCardFront(cardIndex: number): string {
        if (cardIndex > this._numCards || cardIndex < 1) {
            throw new Error(`Card ${cardIndex} does not exist`);
        }

        let frontText = this.raw;
        for (const cloze of this._clozeDeletions) {

            if (cloze.seq !== cardIndex) {
                frontText = frontText.replace(cloze.raw, cloze.answer); // Just show
                continue;
            }

            if (cloze.hint !== undefined) {
                frontText = frontText.replace(cloze.raw, format.asking(`[${cloze.hint}]`) ); // Hide asked cloze with hint
                continue
            }

            frontText = frontText.replace(cloze.raw, format.asking(`[...]`)); // Hide asked cloze
        }
        return frontText;
    }

    getCardBack(cardIndex: number): string {
        if (cardIndex > this._numCards || cardIndex < 1) {
            throw new Error(`Card ${cardIndex} does not exist`);
        }

        let backText = this.raw;
        for (const cloze of this._clozeDeletions) {

            if (cloze.seq === cardIndex) {
                backText = backText.replace(cloze.raw, format.showing(cloze.answer)); // Show as answer
            } else {
                backText = backText.replace(cloze.raw, cloze.answer); // Just show
            }
        }
        return backText;
    }
}

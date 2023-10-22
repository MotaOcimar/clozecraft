import { ClozeDeletionOL } from "./ClozeDeletionOL";
import { IClozeNote } from "../interfaces/IClozeNote";
import { ClozeNoteDefault } from "./ClozeNoteDefault";
import { ClozeFormatting } from "./ClozeFormatting";
import { IClozeRegExpExecArray } from "../interfaces/IClozeRegExpExecArray";
import { format } from "./utils";


export class ClozeNoteOL extends ClozeNoteDefault implements IClozeNote {
    protected _clozeDeletions: ClozeDeletionOL[];

    constructor(text: string, formattings: ClozeFormatting[]) {
        super(text)
        this.initParsing(text, formattings);
    }

    protected initParsing(text: string, formattings: ClozeFormatting[]) {

        let clozes: ClozeDeletionOL[] = [];
        let numCards = 0

        formattings.forEach( (formatting) => {
            const regex = formatting.clozeOLRegex;

            let match: IClozeRegExpExecArray | null;

            while (match = regex.exec(text)) {

                let newCloze: ClozeDeletionOL = {
                    raw: match[0],
                    answer: match.answer,
                    seq: match.seq,
                    hint: match.answer
                }

                clozes.push(newCloze);

                // Get the max seq length
                if (numCards < newCloze.seq.length) {
                    numCards = newCloze.seq.length;
                }
            }
        } )

        this._clozeDeletions = clozes;
        this._numCards = numCards;
    }

    static isNote(text: string, formattings: ClozeFormatting[]): boolean {
        for (const formatting of formattings) {
            const regex = formatting.clozeOLRegex;
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

        cardIndex = cardIndex - 1; // card 1 is the first card, but the array starts at 0

        let frontText = this.raw;
        for (const cloze of this._clozeDeletions) {

            // If the cloze has a sequence that does not specify the action on a certain card 
            // (a shorter sequence length than on other clozes), the default action will be just show
            // Example:             "This is a ==cloze1==^[a] ==cloze2==^[sha] ==cloze3==^[ha]"
            // Will be the same as: "This is a ==cloze1==^[ass] ==cloze2==^[sha] ==cloze3==^[has]"
            let clozeAction = "s";
            if ( cardIndex < cloze.seq.length ) {
                clozeAction = cloze.seq[cardIndex];
            }

            switch (clozeAction) {
                case "a":
                    if (cloze.hint !== undefined) {
                        frontText = frontText.replace(cloze.raw, format.asking(`[${cloze.hint}]`)); // Hide asked cloze with hint
                        break;
                    }
                    frontText = frontText.replace(cloze.raw, format.asking(`[...]`)); // Hide asked cloze
                    break;
                case "h":
                    frontText = frontText.replace(cloze.raw, `...`); // Just hide
                    break;
                case "s":
                    frontText = frontText.replace(cloze.raw, cloze.answer); // Just show
                    break;
            }
        }
        return frontText;
    }

    getCardBack(cardIndex: number): string {
        if (cardIndex > this._numCards || cardIndex < 1) {
            throw new Error(`Card ${cardIndex} does not exist`);
        }

        cardIndex = cardIndex - 1; // card 1 is the first card, but the array starts at 0

        let backText = this.raw;
        for (const cloze of this._clozeDeletions) {

            // If the cloze has a sequence that does not specify the action on a certain card 
            // (a shorter sequence length than on other clozes), the default action will be just show
            // Example:             "This is a ==cloze1==^[a] ==cloze2==^[sha] ==cloze3==^[ha]"
            // Will be the same as: "This is a ==cloze1==^[ass] ==cloze2==^[sha] ==cloze3==^[has]"
            let clozeAction = "s";
            if ( cardIndex < cloze.seq.length ) {
                clozeAction = cloze.seq[cardIndex];
            }

            switch (clozeAction) {
                case "a":
                    backText = backText.replace(cloze.raw, format.showing(cloze.answer)); // Show as answer
                    break;
                case "h":
                    backText = backText.replace(cloze.raw, `...`); // Just hide
                    break;
                case "s":
                    backText = backText.replace(cloze.raw, cloze.answer); // Just show
                    break;
            }
        }
        return backText;
    }
}

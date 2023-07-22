import { ClozeFormatting } from "./clozeFormatting";
import { ClozeRegExpExecArray } from "./clozeRegExp";
import { ClozeClassicNote, ClozeClassic} from "./cloze_classic";

class ClozeSimple extends ClozeClassic {}

export class ClozeSimpleNote extends ClozeClassicNote {
    protected _clozeDeletions: ClozeSimple[];

    // Override
    protected initParsing(text: string, formattings: ClozeFormatting[]) {

        let clozes: ClozeSimple[] = [];
        let numCards = 0

        formattings.forEach( (formatting) => {
            const regex = formatting.clozeSimpleRegex;

            let match: ClozeRegExpExecArray | null;

            while (match = regex.exec(text)) {

                numCards++;

                let newCloze: ClozeSimple = {
                    raw: match[0],
                    answer: match.clozeText,
                    seq: numCards,
                    hint: match.clozeHint
                }

                clozes.push(newCloze);
            }
        } )

        this._clozeDeletions = clozes;
        this._numCards = numCards;
    }

    static isNote(text: string, formattings: ClozeFormatting[]): boolean {
        for (const formatting of formattings) {
            const regex = formatting.clozeSimpleRegex;
            if ( regex.test(text) ){
                return true;
            }
        }
        return false;
    }
}

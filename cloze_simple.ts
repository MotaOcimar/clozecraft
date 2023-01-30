import { ClozeDelimiters } from "./cloze";
import { ClozeClassicNote, ClozeClassic} from "./cloze_classic";

class ClozeSimple extends ClozeClassic {}

export class ClozeSimpleNote extends ClozeClassicNote {
    protected _clozes: ClozeSimple[];

    // Override
    protected initParsing(text: string, delimiters: ClozeDelimiters[]) {

        let clozes: ClozeSimple[] = [];
        let numCards = 0

        ClozeSimpleNote.parse(text, delimiters, function(regex:RegExp) {

            let match: RegExpExecArray | null;

            while (match = regex.exec(text)) {

                numCards++;

                let newCloze: ClozeSimple = {
                    raw: match[1],
                    text: match[2],
                    seq: numCards,
                    hint: match[3]
                }

                clozes.push(newCloze);
            }
        } )

        this._clozes = clozes;
        this._numCards = numCards;
    }

    // Override
    protected static parse(text: string, delimiters: ClozeDelimiters[], fun: Function) {
        for (const cd of delimiters) {
            const regex = new RegExp(`(${cd.beginEsc}([^${cd.endEsc}]+)${cd.endEsc}(?:${cd.hintBeginEsc}([^${cd.hintEndEsc}]+)${cd.hintEndEsc})?)`, "g");
    
            if ( fun(regex) === false ) {
                break;
            }
        }
    }
}

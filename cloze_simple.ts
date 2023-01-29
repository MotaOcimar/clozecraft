import { ClozeDelimiters } from "./cloze";
import { ClozeClassicNote, ClozeClassic} from "./cloze_classic";

class ClozeSimple extends ClozeClassic {}

export class ClozeSimpleNote extends ClozeClassicNote {

    // Override
    protected initParsing(text: string, delimiters: ClozeDelimiters[]) {

        let match: RegExpExecArray | null;

        for (const cd of delimiters) {

            const regex = new RegExp(`(${cd.beginEsc}([^${cd.endEsc}]+)${cd.endEsc}(?:${cd.hintBeginEsc}([^${cd.hintEndEsc}]+)${cd.hintEndEsc})?)`, "g");
            while (match = regex.exec(text)) {

                this.numCards++;

                let newCloze: ClozeSimple = {
                    raw: match[1],
                    text: match[2],
                    seq: this.numCards,
                    hint: match[3]
                }

                this.clozes.push(newCloze);
            }
        }
    }
}

import { Cloze, ClozeNote, ClozeNoteDefault, ClozeDelimiters } from "./cloze";
import { format } from "./utils";


export class ClozeClassic implements Cloze {
    raw: string;
    text: string;
    seq: number;
    hint: string;
}

export class ClozeClassicNote extends ClozeNoteDefault implements ClozeNote  {
    protected _clozes: ClozeClassic[];

    constructor(text: string, delimiters: ClozeDelimiters[]) {
        super(text);

        this.initParsing(text, delimiters);
    }

    protected initParsing(text: string, delimiters: ClozeDelimiters[]): void {

        let clozes: ClozeClassic[] = [];
        let numCards = 0

        ClozeClassicNote.parse(text, delimiters, function(regex:RegExp) {

            let match: RegExpExecArray | null;

            while (match = regex.exec(text)) {

                let newCloze: ClozeClassic = {
                    raw: match[1],
                    text: match[2],
                    seq: parseInt(match[3]),
                    hint: match[4]
                }

                clozes.push(newCloze);

                // Get the max seq
                if (numCards < newCloze.seq) {
                    numCards = newCloze.seq;
                }
            }
        } )

        this._clozes = clozes;
        this._numCards = numCards;
    }

    // Override
    protected static parse(text: string, delimiters: ClozeDelimiters[], fun: Function) {
        for (const cd of delimiters) {
            const regex = new RegExp(`(${cd.beginEsc}([^${cd.endEsc}]+)${cd.endEsc}${cd.seqBeginEsc}(\\d+)${cd.seqEndEsc}(?:${cd.hintBeginEsc}([^${cd.hintEndEsc}]+)${cd.hintEndEsc})?)`, "g");
    
            if ( fun(regex) === false ) {
                break;
            }
        }
    }

    getFront(card: number): string {
        if (card > this._numCards || card < 1) {
            throw new Error(`Card ${card} does not exist`);
        }

        let frontText = this.text;
        for (const cloze of this._clozes) {

            if (cloze.seq !== card) {
                frontText = frontText.replace(cloze.raw, cloze.text); // Just show
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

    getBack(card: number): string {
        if (card > this._numCards || card < 1) {
            throw new Error(`Card ${card} does not exist`);
        }

        let backText = this.text;
        for (const cloze of this._clozes) {

            if (cloze.seq === card) {
                backText = backText.replace(cloze.raw, format.showing(cloze.text)); // Show as answer
            } else {
                backText = backText.replace(cloze.raw, cloze.text); // Just show
            }
        }
        return backText;
    }
}

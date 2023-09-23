import { escapeRegexString } from "./utils";
import { ClozeRegExpImpl as ClozeRegExp } from "./cloze-reg-exp";

const numFormattingRegex = new RegExp(`\\[(?:(?:\\\\\\])?[^\\]]?)+?\\d+(?:(?:\\\\\\])?[^\\]]?)+?\\]`)
const hintFormattingRegex = new RegExp(`\\[(?:(?:\\\\\\])?[^\\]]?)+?hint(?:(?:\\\\\\])?[^\\]]?)+?\\]`)
const clozeKeyword = `cloze` // Must not have regex special characters


export enum clozeElement {
    text = "text",
    hint = "hint",
    seq = "seq"
}

export interface ClozeFormatting {
    get clozeSimpleRegex(): ClozeRegExp;
    get clozeClassicRegex(): ClozeRegExp;
    get clozeOLRegex(): ClozeRegExp;

    hasClozeSimple(text: string): boolean;
    hasClozeClassic(text: string): boolean;
    hasClozeOL(text: string): boolean;
}

export class ClozeFormattingImpl implements ClozeFormatting {
    private readonly _raw: string;
    
    private readonly numFormatting: RegExpExecArray;
    private readonly hintFormatting: RegExpExecArray;

    private readonly hintRegex: string;
    private readonly numRegex: string;
    private readonly seqRegex: string;

    private readonly clozeOrder: clozeElement[];

    private _clozeSimpleRegex: ClozeRegExp;
    private _clozeClassicRegex: ClozeRegExp;
    private _clozeOLRegex: ClozeRegExp;

    constructor(raw: string){
        this._raw = raw;
    
        let _numMatch = numFormattingRegex.exec(raw)
        let _hintMatch = hintFormattingRegex.exec(raw)
    
        if (!_numMatch){
            throw new Error("No cloze number formatting found")
        }
        if (!_hintMatch){
            throw new Error("No cloze hint formatting found")
        }
        if (raw.indexOf(clozeKeyword) == -1){
            throw new Error("No \"cloze\" keyword found in the formatting")
        }

        this.numFormatting = _numMatch;
        this.hintFormatting = _hintMatch;
        this.numRegex = ClozeFormattingImpl.processFormatting(_numMatch[0], (text: string) => text.replace(/\d+/g, "(\\d+)"));
        this.seqRegex = ClozeFormattingImpl.processFormatting(_numMatch[0], (text: string) => text.replace(/\d+/g, "([ash]+)"));
        this.hintRegex = ClozeFormattingImpl.processFormatting(_hintMatch[0], (text: string) => text.replace(/hint/g, "(.+?)"));

        this.hintRegex = "(?:" + this.hintRegex + ")?"; // Cloze hint is always optional

        this.clozeOrder = [clozeElement.text, clozeElement.hint, clozeElement.seq];
        let positions = {
            [clozeElement.text]: raw.indexOf(clozeKeyword),
            [clozeElement.hint]: this.hintFormatting.index,
            [clozeElement.seq]: this.numFormatting.index
        };

        // Sort the indexes by their positions
        this.clozeOrder.sort((a, b) => positions[a] - positions[b]);
    }

    private static processFormatting(text: string, rplc: Function): string{
        let ans = text.substring(1, text.length - 1);
        ans = ans.replace(/\\\[/g, "[").replace(/\\]/g, "]");
        ans = escapeRegexString(ans);
        ans = rplc(ans);
        return ans
    }

    private generateClozeRegexStr(first: RegExpExecArray, firstReplace: string, second: RegExpExecArray, secondReplace: string): string {
        let begin = this._raw.slice(0, first.index);
        let middle = this._raw.slice(first.index + first[0].length, second.index);
        let ending = this._raw.slice(second.index + second[0].length, this._raw.length);
    
        let regexStr = escapeRegexString(begin) + 
            firstReplace +
            escapeRegexString(middle) +
            secondReplace +
            escapeRegexString(ending);
    
        regexStr = regexStr.replace(clozeKeyword, "(.+?)"); // clozeKeyword must not have regex special characters
    
        return regexStr;
    }

    get clozeSimpleRegex(): ClozeRegExp {
        if (this._clozeSimpleRegex != undefined){
            return this._clozeSimpleRegex;
        }

        let regexStr: string;

        if (this.numFormatting.index < this.hintFormatting.index) {
            regexStr = this.generateClozeRegexStr(this.numFormatting, "", this.hintFormatting, this.hintRegex);
        } else {
            regexStr = this.generateClozeRegexStr(this.hintFormatting, this.hintRegex, this.numFormatting, "");
        }

        let clozeOrderWithoutSeq = this.clozeOrder.filter((x) => x != clozeElement.seq);
        this._clozeSimpleRegex =  new ClozeRegExp(regexStr, clozeOrderWithoutSeq, 'g');

        return this._clozeSimpleRegex;
    }

    get clozeClassicRegex(): ClozeRegExp {
        if (this._clozeClassicRegex != undefined){
            return this._clozeClassicRegex;
        }

        let regexStr: string;

        if (this.numFormatting.index < this.hintFormatting.index) {
            regexStr = this.generateClozeRegexStr(this.numFormatting, this.numRegex, this.hintFormatting, this.hintRegex);
        } else {
            regexStr = this.generateClozeRegexStr(this.hintFormatting, this.hintRegex, this.numFormatting, this.numRegex);
        }

        this._clozeClassicRegex =  new ClozeRegExp(regexStr, this.clozeOrder, 'g');

        return this._clozeClassicRegex;
    }

    get clozeOLRegex(): ClozeRegExp {
        if (this._clozeOLRegex != undefined){
            return this._clozeOLRegex;
        }

        let regexStr: string;

        if (this.numFormatting.index < this.hintFormatting.index) {
            regexStr = this.generateClozeRegexStr(this.numFormatting, this.seqRegex, this.hintFormatting, this.hintRegex);
        } else {
            regexStr = this.generateClozeRegexStr(this.hintFormatting, this.hintRegex, this.numFormatting, this.seqRegex);
        }
        
        this._clozeOLRegex =  new ClozeRegExp(regexStr, this.clozeOrder, 'g');

        return this._clozeOLRegex;
    }

    hasClozeSimple(text: string): boolean {
        return !this.clozeClassicRegex.test(text) && // A valid Cloze Classic text is also a valid Cloze Simple text
               !this.clozeOLRegex.test(text) && // A valid Cloze OL text is also a valid Cloze Simple text
               this.clozeSimpleRegex.test(text);
    }

    hasClozeClassic(text: string): boolean {
        return this.clozeClassicRegex.test(text);
    }

    hasClozeOL(text: string): boolean {
        return this.clozeOLRegex.test(text);
    }
}

import { escapeRegexString } from "./utils";
import { ClozeRegExp } from "./ClozeRegExp";
import { IClozeFormatting } from "../interfaces/IClozeFormatting";
import { ClozeFieldEnum } from "./ClozeFieldEnum";

const numFormattingRegex = new RegExp(`\\[(?:(?:\\\\\\])?[^\\]]?)+?\\d+(?:(?:\\\\\\])?[^\\]]?)+?\\]`)
const hintFormattingRegex = new RegExp(`\\[(?:(?:\\\\\\])?[^\\]]?)+?hint(?:(?:\\\\\\])?[^\\]]?)+?\\]`)
const clozeKeyword = `cloze` // Must not have regex special characters

export class ClozeFormatting implements IClozeFormatting {
    private readonly _raw: string;
    
    private readonly numFormatting: RegExpExecArray;
    private readonly hintFormatting: RegExpExecArray;

    private readonly hintRegex: string;
    private readonly numRegex: string;
    private readonly seqRegex: string;

    private readonly clozeOrder: ClozeFieldEnum[];

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
        this.numRegex = ClozeFormatting.processFormatting(_numMatch[0], (text: string) => text.replace(/\d+/g, "(\\d+)"));
        this.seqRegex = ClozeFormatting.processFormatting(_numMatch[0], (text: string) => text.replace(/\d+/g, "([ash]+)"));
        this.hintRegex = ClozeFormatting.processFormatting(_hintMatch[0], (text: string) => text.replace(/hint/g, "(.+?)"));

        this.hintRegex = "(?:" + this.hintRegex + ")?"; // Cloze hint is always optional

        this.clozeOrder = [ClozeFieldEnum.answer, ClozeFieldEnum.hint, ClozeFieldEnum.seq];
        let positions = {
            [ClozeFieldEnum.answer]: raw.indexOf(clozeKeyword),
            [ClozeFieldEnum.hint]: this.hintFormatting.index,
            [ClozeFieldEnum.seq]: this.numFormatting.index
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

        let clozeOrderWithoutSeq = this.clozeOrder.filter((x) => x != ClozeFieldEnum.seq);
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

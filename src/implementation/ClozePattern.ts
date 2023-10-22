import { escapeRegexString } from "./utils";
import { ClozeRegExp } from "./ClozeRegExp";
import { IClozePattern } from "../interfaces/IClozePattern";
import { ClozeFieldEnum } from "./ClozeFieldEnum";

const numPatternRegex = new RegExp(`\\[(?:(?:\\\\\\])?[^\\]]?)+?\\d+(?:(?:\\\\\\])?[^\\]]?)+?\\]`)
const hintPatternRegex = new RegExp(`\\[(?:(?:\\\\\\])?[^\\]]?)+?hint(?:(?:\\\\\\])?[^\\]]?)+?\\]`)
const answerKeyword = `answer` // Must not have regex special characters

export class ClozePattern implements IClozePattern {
    private readonly _raw: string;
    
    private readonly numPattern: RegExpExecArray;
    private readonly hintPattern: RegExpExecArray;

    private readonly hintRegex: string;
    private readonly numRegex: string;
    private readonly seqRegex: string;

    private readonly clozeOrder: ClozeFieldEnum[];

    private _clozeSimpleRegex: ClozeRegExp;
    private _clozeClassicRegex: ClozeRegExp;
    private _clozeOLRegex: ClozeRegExp;

    constructor(raw: string){
        this._raw = raw;
    
        let _numMatch = numPatternRegex.exec(raw)
        let _hintMatch = hintPatternRegex.exec(raw)
    
        if (!_numMatch){
            throw new Error("No cloze number pattern found")
        }
        if (!_hintMatch){
            throw new Error("No cloze hint pattern found")
        }
        if (raw.indexOf(answerKeyword) == -1){
            throw new Error("No \"cloze\" keyword found in the pattern")
        }

        this.numPattern = _numMatch;
        this.hintPattern = _hintMatch;
        this.numRegex = ClozePattern.processPattern(_numMatch[0], (text: string) => text.replace(/\d+/g, "(\\d+)"));
        this.seqRegex = ClozePattern.processPattern(_numMatch[0], (text: string) => text.replace(/\d+/g, "([ash]+)"));
        this.hintRegex = ClozePattern.processPattern(_hintMatch[0], (text: string) => text.replace(/hint/g, "(.+?)"));

        this.hintRegex = "(?:" + this.hintRegex + ")?"; // Cloze hint is always optional

        this.clozeOrder = [ClozeFieldEnum.answer, ClozeFieldEnum.hint, ClozeFieldEnum.seq];
        let positions = {
            [ClozeFieldEnum.answer]: raw.indexOf(answerKeyword),
            [ClozeFieldEnum.hint]: this.hintPattern.index,
            [ClozeFieldEnum.seq]: this.numPattern.index
        };

        // Sort the indexes by their positions
        this.clozeOrder.sort((a, b) => positions[a] - positions[b]);
    }

    private static processPattern(text: string, rplc: Function): string{
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
    
        regexStr = regexStr.replace(answerKeyword, "(.+?)"); // clozeKeyword must not have regex special characters
    
        return regexStr;
    }

    get clozeSimpleRegex(): ClozeRegExp {
        if (this._clozeSimpleRegex != undefined){
            return this._clozeSimpleRegex;
        }

        let regexStr: string;

        if (this.numPattern.index < this.hintPattern.index) {
            regexStr = this.generateClozeRegexStr(this.numPattern, "", this.hintPattern, this.hintRegex);
        } else {
            regexStr = this.generateClozeRegexStr(this.hintPattern, this.hintRegex, this.numPattern, "");
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

        if (this.numPattern.index < this.hintPattern.index) {
            regexStr = this.generateClozeRegexStr(this.numPattern, this.numRegex, this.hintPattern, this.hintRegex);
        } else {
            regexStr = this.generateClozeRegexStr(this.hintPattern, this.hintRegex, this.numPattern, this.numRegex);
        }

        this._clozeClassicRegex =  new ClozeRegExp(regexStr, this.clozeOrder, 'g');

        return this._clozeClassicRegex;
    }

    get clozeOLRegex(): ClozeRegExp {
        if (this._clozeOLRegex != undefined){
            return this._clozeOLRegex;
        }

        let regexStr: string;

        if (this.numPattern.index < this.hintPattern.index) {
            regexStr = this.generateClozeRegexStr(this.numPattern, this.seqRegex, this.hintPattern, this.hintRegex);
        } else {
            regexStr = this.generateClozeRegexStr(this.hintPattern, this.hintRegex, this.numPattern, this.seqRegex);
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

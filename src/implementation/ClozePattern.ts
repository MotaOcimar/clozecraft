import { escapeRegexString } from "./utils";
import { ClozeRegExp } from "./ClozeRegExp";
import { IClozePattern } from "../interfaces/IClozePattern";
import { ClozeFieldEnum } from "./ClozeFieldEnum";
import { ClozeTypeEnum, ClozeTypesPriority } from "./ClozeTypeEnum";

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

    private readonly _clozeFieldOrder: ClozeFieldEnum[];

    private clozeRegexByType: { [key in ClozeTypeEnum]: ClozeRegExp } = {
        [ClozeTypeEnum.CLASSIC]: undefined,
        [ClozeTypeEnum.OVERLAPPING]: undefined,
        [ClozeTypeEnum.SIMPLE]: undefined,
    };

    private generateClozeRegexByType: { [key in ClozeTypeEnum]: () => ClozeRegExp } = {
        [ClozeTypeEnum.CLASSIC]: this.generateClozeClassicRegex,
        [ClozeTypeEnum.OVERLAPPING]: this.generateClozeOLRegex,
        [ClozeTypeEnum.SIMPLE]: this.generateClozeSimpleRegex,
    };

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
            throw new Error(`No answerkeyword (${answerKeyword}) found in the pattern.`)
        }

        this.numPattern = _numMatch;
        this.hintPattern = _hintMatch;
        this.numRegex = ClozePattern.processPattern(_numMatch[0], (text: string) => text.replace(/\d+/g, "(\\d+)"));
        this.seqRegex = ClozePattern.processPattern(_numMatch[0], (text: string) => text.replace(/\d+/g, "([ash]+)"));
        this.hintRegex = ClozePattern.processPattern(_hintMatch[0], (text: string) => text.replace(/hint/g, "(.+?)"));

        this.hintRegex = "(?:" + this.hintRegex + ")?"; // Cloze hint is always optional

        this._clozeFieldOrder = [ClozeFieldEnum.answer, ClozeFieldEnum.hint, ClozeFieldEnum.seq];
        let positions = {
            [ClozeFieldEnum.answer]: raw.indexOf(answerKeyword),
            [ClozeFieldEnum.hint]: this.hintPattern.index,
            [ClozeFieldEnum.seq]: this.numPattern.index
        };

        // Sort the indexes by their positions
        this._clozeFieldOrder.sort((a, b) => positions[a] - positions[b]);
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
    
        regexStr = regexStr.replace(answerKeyword, "(.+?)"); // answerKeyword must not have regex special characters
    
        return regexStr;
    }

    private generateClozeSimpleRegex(): ClozeRegExp {
        let regexStr: string;

        if (this.numPattern.index < this.hintPattern.index) {
            regexStr = this.generateClozeRegexStr(this.numPattern, "", this.hintPattern, this.hintRegex);
        } else {
            regexStr = this.generateClozeRegexStr(this.hintPattern, this.hintRegex, this.numPattern, "");
        }

        let clozeOrderWithoutSeq = this._clozeFieldOrder.filter((x) => x != ClozeFieldEnum.seq);
        return new ClozeRegExp(regexStr, clozeOrderWithoutSeq, 'g');
    }

    private generateClozeClassicRegex(): ClozeRegExp {
        let regexStr: string;

        if (this.numPattern.index < this.hintPattern.index) {
            regexStr = this.generateClozeRegexStr(this.numPattern, this.numRegex, this.hintPattern, this.hintRegex);
        } else {
            regexStr = this.generateClozeRegexStr(this.hintPattern, this.hintRegex, this.numPattern, this.numRegex);
        }

        return new ClozeRegExp(regexStr, this._clozeFieldOrder, 'g');
    }

    private generateClozeOLRegex(): ClozeRegExp {
        let regexStr: string;

        if (this.numPattern.index < this.hintPattern.index) {
            regexStr = this.generateClozeRegexStr(this.numPattern, this.seqRegex, this.hintPattern, this.hintRegex);
        } else {
            regexStr = this.generateClozeRegexStr(this.hintPattern, this.hintRegex, this.numPattern, this.seqRegex);
        }
        
        return new ClozeRegExp(regexStr, this._clozeFieldOrder, 'g');
    }

    get clozeFieldsOrder(): ClozeFieldEnum[] {
        return this._clozeFieldOrder;
    }

    getClozeRegex(clozeType: ClozeTypeEnum): ClozeRegExp {
        if (this.clozeRegexByType[clozeType] != undefined){
            return this.clozeRegexByType[clozeType];
        }

        const clozeRegex = this.generateClozeRegexByType[clozeType]();
        this.clozeRegexByType[clozeType] = clozeRegex;
        return clozeRegex;
    }

    hasClozeType(text: string, clozeType: ClozeTypeEnum): boolean {
        for (const priorityType of ClozeTypesPriority) {
            if (this.getClozeRegex(priorityType).test(text)) {
                return clozeType == priorityType;
            }
        }

        return false;
    }

    getClozeTypes(text: string): ClozeTypeEnum[] {
        const clozeTypes: ClozeTypeEnum[] = [];
        for (const priorityType of ClozeTypesPriority) {
            if (this.getClozeRegex(priorityType).test(text)) {
                clozeTypes.push(priorityType);
            }
        }

        return clozeTypes;
    }

    getMainClozeType(text: string): ClozeTypeEnum | null {
        for (const priorityType of ClozeTypesPriority) {
            if (this.getClozeRegex(priorityType).test(text)) {
                return priorityType;
            }
        }

        return null;
    }
}

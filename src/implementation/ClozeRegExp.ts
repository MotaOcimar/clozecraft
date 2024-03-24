import { ClozeFieldEnum } from "./ClozeFieldEnum";
import { IClozeRegExp } from "../interfaces/IClozeRegExp"
import { IClozeRegExpExecArray } from "../interfaces/IClozeRegExpExecArray";

export class ClozeRegExp implements IClozeRegExp {
    readonly regex: RegExp;
    private readonly clozeFieldsOrder: ClozeFieldEnum[];

    constructor(pattern: string, clozeFieldsOrder: ClozeFieldEnum[], flags?: string) {
        this.regex = new RegExp(pattern, flags);
        this.clozeFieldsOrder = clozeFieldsOrder;
    }

    exec(str: string): IClozeRegExpExecArray | null {

        let match = this.regex.exec(str) as IClozeRegExpExecArray;
        if (!match) {
            return null;
        }

        // All clozes (Cloze simple, Cloze Classic and Cloze overlapping) have an answer and can have a hint
        if (this.clozeFieldsOrder.indexOf(ClozeFieldEnum.answer) == -1) {
            throw new Error("Cloze text not found in clozeFieldsOrder");
        }
        if (this.clozeFieldsOrder.indexOf(ClozeFieldEnum.hint) == -1) {
            throw new Error("Cloze hint not found in clozeFieldsOrder");
        }

        // But cloze simple doesn't have cloze seq
        if (this.clozeFieldsOrder.indexOf(ClozeFieldEnum.seq) == -1) {
            match.seq = null;
        } else {
            match.seq = match[this.clozeFieldsOrder.indexOf(ClozeFieldEnum.seq) + 1];
        }

        match.raw = match[0];
        match.answer = match[this.clozeFieldsOrder.indexOf(ClozeFieldEnum.answer) + 1];
        match.hint = match[this.clozeFieldsOrder.indexOf(ClozeFieldEnum.hint) + 1];

        return match;
    }

    test(str: string): boolean {
        return this.regex.test(str);
    }
}

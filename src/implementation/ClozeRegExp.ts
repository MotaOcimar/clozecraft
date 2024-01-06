import { ClozeFieldEnum } from "./ClozeFieldEnum";
import { IClozeRegExp } from "../interfaces/IClozeRegExp"
import { IClozeRegExpExecArray } from "../interfaces/IClozeRegExpExecArray";

export class ClozeRegExp implements IClozeRegExp {
    readonly regex: RegExp;
    private readonly clozeOrder: ClozeFieldEnum[];

    constructor(pattern: string, clozeOrder: ClozeFieldEnum[], flags?: string) {
        this.regex = new RegExp(pattern, flags);
        this.clozeOrder = clozeOrder;
    }

    exec(str: string): IClozeRegExpExecArray | null {

        let match = this.regex.exec(str) as IClozeRegExpExecArray;
        if (!match) {
            return null;
        }

        // All clozes (Cloze simple, Cloze Classic and Cloze overlapping) have the cloze text and can have cloze hint
        if (this.clozeOrder.indexOf(ClozeFieldEnum.answer) == -1) {
            throw new Error("Cloze text not found in clozeOrder");
        }
        if (this.clozeOrder.indexOf(ClozeFieldEnum.hint) == -1) {
            throw new Error("Cloze hint not found in clozeOrder");
        }

        // But cloze simple doesn't have cloze seq
        if (this.clozeOrder.indexOf(ClozeFieldEnum.seq) == -1) {
            match.seq = null;
        } else {
            match.seq = match[this.clozeOrder.indexOf(ClozeFieldEnum.seq) + 1];
        }

        match.raw = match[0];
        match.answer = match[this.clozeOrder.indexOf(ClozeFieldEnum.answer) + 1];
        match.hint = match[this.clozeOrder.indexOf(ClozeFieldEnum.hint) + 1];

        return match;
    }

    test(str: string): boolean {
        return this.regex.test(str);
    }
}

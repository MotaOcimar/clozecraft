import { ClozeFieldEnum } from "./cloze-field-enum";
import { ClozeRegExp } from "../interfaces/cloze-reg-exp"
import { ClozeRegExpExecArray } from "../interfaces/cloze-reg-exp-exec-array";

export class ClozeRegExpImpl implements ClozeRegExp {
    readonly regex: RegExp;
    private readonly clozeOrder: ClozeFieldEnum[];

    constructor(pattern: string, clozeOrder: ClozeFieldEnum[], flags?: string) {
        this.regex = new RegExp(pattern, flags);
        this.clozeOrder = clozeOrder;
    }

    exec(str: string): ClozeRegExpExecArray | null {

        let ans = this.regex.exec(str) as ClozeRegExpExecArray;
        
        if (!ans) {
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
            ans.clozeSeq = null;
        } else {
            ans.clozeSeq = ans[this.clozeOrder.indexOf(ClozeFieldEnum.seq) + 1];
        }

        ans.clozeText = ans[this.clozeOrder.indexOf(ClozeFieldEnum.answer) + 1];
        ans.clozeHint = ans[this.clozeOrder.indexOf(ClozeFieldEnum.hint) + 1];

        return ans;
    }

    test(str: string): boolean {
        return this.regex.test(str);
    }
}
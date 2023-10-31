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

        let ans = this.regex.exec(str) as IClozeRegExpExecArray;
        
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
            ans.seq = null;
        } else {
            ans.seq = ans[this.clozeOrder.indexOf(ClozeFieldEnum.seq) + 1];
        }

        ans.raw = ans[0];
        ans.answer = ans[this.clozeOrder.indexOf(ClozeFieldEnum.answer) + 1];
        ans.hint = ans[this.clozeOrder.indexOf(ClozeFieldEnum.hint) + 1];

        return ans;
    }

    test(str: string): boolean {
        return this.regex.test(str);
    }
}
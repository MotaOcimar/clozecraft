import { ClozeRegExpExecArray } from "./cloze-reg-exp-exec-array";

export interface ClozeRegExp {
    get regex(): RegExp;
    exec(str: string): ClozeRegExpExecArray | null;
    test(str: string): boolean;
}
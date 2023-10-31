import { IClozeRegExpExecArray } from "./IClozeRegExpExecArray";

export interface IClozeRegExp {
    get regex(): RegExp;
    exec(str: string): IClozeRegExpExecArray | null;
    test(str: string): boolean;
}
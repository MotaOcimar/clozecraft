import { ClozeRegExp } from "./cloze-reg-exp";

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

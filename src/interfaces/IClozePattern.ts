import { IClozeRegExp } from "./IClozeRegExp";

export interface IClozePattern {
    get clozeSimpleRegex(): IClozeRegExp;
    get clozeClassicRegex(): IClozeRegExp;
    get clozeOLRegex(): IClozeRegExp;

    get clozeFieldsOrder(): string[];

    hasClozeSimple(text: string): boolean;
    hasClozeClassic(text: string): boolean;
    hasClozeOL(text: string): boolean;
}

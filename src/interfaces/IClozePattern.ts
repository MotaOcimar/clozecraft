import { ClozeTypeEnum } from "../implementation/ClozeTypeEnum";
import { IClozeRegExp } from "./IClozeRegExp";

export interface IClozePattern {
    get raw() : string;
    get clozeFieldsOrder(): string[];
    
    getClozeRegex(clozeType: ClozeTypeEnum): IClozeRegExp;
    getMainClozeType(text: string): ClozeTypeEnum | null;
}

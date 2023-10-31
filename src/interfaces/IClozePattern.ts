import { ClozeTypeEnum } from "../implementation/ClozeTypeEnum";
import { IClozeRegExp } from "./IClozeRegExp";

export interface IClozePattern {
    get clozeFieldsOrder(): string[];
    
    getClozeRegex(clozeType: ClozeTypeEnum): IClozeRegExp;
    hasClozeType(text: string, clozeType: ClozeTypeEnum): boolean;
    getClozeTypes(text: string): ClozeTypeEnum[];
    getMainClozeType(text: string): ClozeTypeEnum | null;
}

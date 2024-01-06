import { IClozeNote } from "../interfaces/IClozeNote";
import { ClozeNoteClassic } from "./ClozeNoteClassic";
import { ClozeNoteOL } from "./ClozeNoteOL";
import { ClozeNoteSimple } from "./ClozeNoteSimple";
import { IClozePattern } from "../interfaces/IClozePattern";

export enum ClozeTypeEnum {
    CLASSIC = "classic",
    OVERLAPPING = "overlapping",
    SIMPLE = "simple"
}

export const ClozeTypesPriority = [
    ClozeTypeEnum.CLASSIC,
    ClozeTypeEnum.OVERLAPPING,
    ClozeTypeEnum.SIMPLE, // Cloze Simple must be the last one because it is a subset of Cloze Classic and Cloze Overlapping
];

export const NoteClassByClozeType: { [key in ClozeTypeEnum]: new (text: string, patterns: IClozePattern[]) => IClozeNote } = {
    [ClozeTypeEnum.CLASSIC]: ClozeNoteClassic,
    [ClozeTypeEnum.OVERLAPPING]: ClozeNoteOL,
    [ClozeTypeEnum.SIMPLE]: ClozeNoteSimple,
};

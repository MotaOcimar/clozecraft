import { IClozeNote } from '../interfaces/IClozeNote';
import { IClozePattern } from '../interfaces/IClozePattern';
import { ClassMapByClozeType as ClassByClozeType, ClozeTypeEnum, ClozeTypesPriority } from './ClozeTypeEnum';

export class ClozeNoteInitializer {
    private patterns: IClozePattern[];

    constructor(patterns: IClozePattern[]) {
        this.patterns = patterns;
    }

    public createClozeNoteFromText(text: string): IClozeNote | null {

        let noteType: ClozeTypeEnum | null = null;

        for (const pattern of this.patterns) {
            const currentType = pattern.getMainClozeType(text);
            if ( currentType !== null &&
                    (noteType === null ||
                    ClozeTypesPriority.indexOf(currentType) < ClozeTypesPriority.indexOf(noteType))
                    ) {
                noteType = currentType;
            }
        }

        if (noteType === null) {
            return null;
        }

        const selectedClass = ClassByClozeType[noteType];
        const clozeNote = new selectedClass(text, this.patterns);

        return clozeNote;
    }
}
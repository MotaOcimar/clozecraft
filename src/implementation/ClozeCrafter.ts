import { IClozeNote } from '../interfaces/IClozeNote';
import { IClozePattern } from '../interfaces/IClozePattern';
import { ClozePattern } from './ClozePattern';
import { NoteClassByClozeType, ClozeTypeEnum, ClozeTypesPriority } from './ClozeTypeEnum';

export class ClozeCrafter {
    private patterns: IClozePattern[];

    constructor(patterns: string[]) {
        this.patterns = patterns.map( patternStr => new ClozePattern(patternStr) );
    }

    public createClozeNote(text: string): IClozeNote | null {

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

        const selectedClass = NoteClassByClozeType[noteType];
        const clozeNote = new selectedClass(text, this.patterns);

        return clozeNote;
    }
}
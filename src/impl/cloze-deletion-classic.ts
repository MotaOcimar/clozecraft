import { ClozeDeletion } from '../interfaces/cloze-deletion';

export class ClozeDeletionClassic implements ClozeDeletion {
    raw: string;
    seq: number;
    answer: string;
    hint: string;
}

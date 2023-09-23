import { ClozeDeletion } from '../interfaces/cloze-deletion';

export class ClozeDeletionClassic implements ClozeDeletion {
    raw: string;
    answer: string;
    seq: number;
    hint: string;
}

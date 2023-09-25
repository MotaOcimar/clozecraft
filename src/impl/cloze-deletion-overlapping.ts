import { ClozeDeletion } from '../interfaces/cloze-deletion';

export class ClozeDeletionOL implements ClozeDeletion {
    raw: string;
    seq: string;
    answer: string;
    hint: string;
}

import { ClozeDeletion } from '../interfaces/cloze-deletion';

export class ClozeDeletionOL implements ClozeDeletion {
    raw: string;
    answer: string;
    seq: string;
    hint: string;
}

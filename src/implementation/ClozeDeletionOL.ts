import { IClozeDeletion } from '../interfaces/IClozeDeletion';

export class ClozeDeletionOL implements IClozeDeletion {
    raw: string;
    seq: string;
    answer: string;
    hint: string;
}

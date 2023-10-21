import { IClozeDeletion } from '../interfaces/IClozeDeletion';

export class ClozeDeletionClassic implements IClozeDeletion {
    raw: string;
    seq: number;
    answer: string;
    hint: string;
}

/**
 * Interface ClozeDeletion
 *
 * Represents a single cloze test question.
 * It contains the original text, before being processed, the answer text, the sequence
 * number that identifies the question, and an optional hint to aid the user in completing
 * the blank.
 */
export interface ClozeDeletion {

    /**
     * The original raw text of the cloze test question, before being processed.
     * Example: "{{c1::Brazil::country}}"
     */
    raw: string;
    
    /**
     * The answer text of the cloze test question.
     * Example: "Brazil" in "{{c1::Brazil::country}}"
     */
    answer: string;
    
    /**
     * The sequence number or identifier of the cloze test question.
     * It can be a number or a string, used to order or identify the questions in a set.
     * Example: 1 in "{{c1::Brazil::country}}"
     */
    seq: number | string;
    
    /**
     * An optional hint to provide additional information or context to help the user
     * answer the cloze test question.
     * Example: "country" in "{{c1::Brazil::country}}"
     */
    hint: string;
}

/**
 * Interface ClozeDeletion
 *
 * Represents a single cloze test question.
 * It contains the original text, before being processed, the answer text, the sequence
 * number that identifies the question, and an optional hint to aid the user in completing
 * the blank.
 * 
 * @example
 * {
 *   raw: "{{c1::Brazil::country}}",
 *   seq: 1,
 *   answer: "Brazil",
 *   hint: "country"
 * }
 */
export interface ClozeDeletion {

    /**
     * The original raw text of the cloze test question, before being processed.
     * 
     * @example
     * consloe.log(clozeDeletion.raw) // "{{c1::Brazil::country}}"
     */
    raw: string;

    /**
     * The sequence number or string of the cloze deletion.
     * It's used to order the cloze deletions in a cloze note
     * or to specify how it will be shown or asked along with
     * the other cloze deletions in the same note.
     * 
     * @example
     * consloe.log(clozeDeletion.raw) // "{{c1::Brazil::country}}"
     * console.log(clozeDeletion.seq) // 1
     */
    seq: number | string;

    /**
     * The answer text of the cloze deletion.
     * 
     * @example
     * consloe.log(clozeDeletion.raw) // "{{c1::Brazil::country}}"
     * console.log(clozeDeletion.answer) // "Brazil"
     */
    answer: string;

    /**
     * An optional hint to provide additional information or
     * context and help the user answer the cloze deletion.
     * 
     * @example
     * consloe.log(clozeDeletion.raw) // "{{c1::Brazil::country}}"
     * console.log(clozeDeletion.hint) // "country"
     */
    hint: string;
}

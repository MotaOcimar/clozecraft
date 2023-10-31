/**
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
export interface IClozeDeletion {

    /**
     * @returns {string} The original raw text of the cloze deletion, before being processed.
     * 
     * @example
     * consloe.log(clozeDeletion.raw) // "{{c1::Brazil::country}}"
     */
    get raw(): string;

    /**
     * @returns {number | string} The sequence number or string of the cloze deletion.
     * It's used to order the cloze deletions in a cloze note
     * or to specify how it will be shown or asked along with
     * the other cloze deletions in the same note.
     * 
     * @example
     * consloe.log(clozeDeletion.raw) // "{{c1::Brazil::country}}"
     * console.log(clozeDeletion.seq) // 1
     */
    get seq(): number | string;

    /**
     * @returns {string} The answer text of the cloze deletion.
     * 
     * @example
     * consloe.log(clozeDeletion.raw) // "{{c1::Brazil::country}}"
     * console.log(clozeDeletion.answer) // "Brazil"
     */
    get answer(): string;

    /**
     * @returns {string} An optional hint to provide additional information or
     * context and help the user answer the cloze deletion.
     * 
     * @example
     * consloe.log(clozeDeletion.raw) // "{{c1::Brazil::country}}"
     * console.log(clozeDeletion.hint) // "country"
     */
    get hint(): string;
}

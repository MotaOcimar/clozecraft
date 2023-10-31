
/**
 * Enum for cloze field types.
 * They are the different components of a cloze deletion.
 * 
 * For example, in the cloze deletion "{{c1::Brazil::country}}",
 * we have the following fields:
 * - seq: 1
 * - answer: "Brazil"
 * - hint: "country"
 */
export enum ClozeFieldEnum {

    /**
     * The sequence number or string of the cloze deletion.
     * It's used to order the cloze deletions in a cloze note
     * or to specify how it will be shown or asked along with
     * the other cloze deletions in the same note.
     * 
     * For example, in the cloze deletion "{{c1::Brazil::country}}",
     * the sequence number is 1.
     */
    seq = "seq",

    /**
     * The answer text of the cloze deletion.
     * 
     * For example, in the cloze deletion "{{c1::Brazil::country}}",
     * the answer is "Brazil".
     */
    answer = "answer",

    /**
     * An optional hint to provide additional information or
     * context and help the user answer the cloze deletion.
     * 
     * For example, in the cloze deletion "{{c1::Brazil::country}}",
     * the hint is "country".
     */
    hint = "hint"
}

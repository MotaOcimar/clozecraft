/**
 * Represents the RegExpExecArray with additional cloze properties
 * to easily extract the cloze deletion information after a regex
 * parsing.
 * 
 * This interface is **not** meant to be used as a Cloze Deletion
 * representation, because some properties must be processed before
 * being used.
 * The properties of this interface are just the raw values resulting from
 * a regex parsing.
 * 
 * **If you want to use a Cloze Deletion representation, use the interface
 * IClozeDeletion instead.**
 */
export interface IClozeRegExpExecArray extends RegExpExecArray {

    /**
     * The first text that was matched by the regular expression of
     * a Cloze Deletion pattern.
     * 
     * @example
     * // The pattern "{{c1::answer::hint}}" generated the cRegExp ClozeRegExp
     * const noteText = "People from {{c1::Brazil::country}} are called {{c2::Brazilians::nationality}}."
     * const matches = cRegExp.exec(noteText)
     * console.log(matches[0]) // "{{c1::Brazil::country}}"
     * console.log(matches.raw) // "{{c1::Brazil::country}}"
     */
    raw: string;

    /**
     * The answer text that was inside the fist match found by the
     * regular expression of a Cloze Deletion pattern.
     * 
     * @example
     * // The pattern "{{c1::answer::hint}}" generated the cRegExp ClozeRegExp
     * const noteText = "People from {{c1::Brazil::country}} are called {{c2::Brazilians::nationality}}."
     * const matches = cRegExp.exec(noteText)
     * console.log(matches[0]) // "{{c1::Brazil::country}}"
     * console.log(matches.answer) // "Brazil"
     */
    answer: string;

    /**
     * The hint text that was inside the fist match found by the
     * regular expression of a Cloze Deletion pattern.
     * 
     * @example
     * // The pattern "{{c1::answer::hint}}" generated the cRegExp ClozeRegExp
     * const noteText = "People from {{c1::Brazil::country}} are called {{c2::Brazilians::nationality}}."
     * const matches = cRegExp.exec(noteText)
     * console.log(matches[0]) // "{{c1::Brazil::country}}"
     * console.log(matches.hint) // "country"
     */
    hint: string;

    /**
     * The sequence identifier that was inside the fist match found by the
     * regular expression of a Cloze Deletion pattern. Can be null for some Cloze types,
     * like Cloze Simple.
     * 
     * @example
     * // The pattern "{{c1::answer::hint}}" generated the cRegExp ClozeRegExp
     * const noteText = "People from {{c1::Brazil::country}} are called {{c2::Brazilians::nationality}}."
     * const matches = cRegExp.exec(noteText)
     * console.log(matches[0]) // "{{c1::Brazil::country}}"
     * console.log(matches.seq) // "1"
     * 
     * // The pattern "{{answer::hint}}" generated the cSimpleRegExp ClozeRegExp for a Cloze Simple
     * const noteText = "People from {{Brazil::country}} are called {{Brazilians::nationality}}."
     * const matches = cRegExp.exec(noteText)
     * console.log(matches[0]) // "{{Brazil::country}}"
     * console.log(matches.seq) // null
     */
    seq: string | null;
}

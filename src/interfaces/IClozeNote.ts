import { ClozeTypeEnum } from "../implementation/ClozeTypeEnum";
import { IClozeDeletion } from "./IClozeDeletion"

/**
 * Represents a complete text with one or more cloze deletions
 * in it.
 * 
 * Cloze notes are used to generate cloze cards.
 * 
 * A cloze card is a question-answer pair that asks the user
 * one or more cloze deletions.
 * 
 * For example, the following text is a cloze note:
 * "People from {{c1::Brazil::country}} are called {{c2::Brazilians::nationality}}."
 * 
 * It contains two cloze deletions:
 * 1. "{{c1::Brazil::country}}"
 * 2. "{{c2::Brazilians::nationality}}"
 * 
 * And it can be used to generate two cloze cards:
 * 
 * **Card 1**:
 * - **Front**: "People from _[country]_ are called Brazilians."
 * - **Back**: "People from _Brazil_ are called Brazilians."
 * 
 * **Card 2**:
 * - **Front**: "People from Brazil are called _[nationality]_."
 * - **Back**: "People from Brazil are called _Brazilians_."
 */
export interface IClozeNote {

    /**
    * @returns {ClozeTypeEnum} The type of cloze note.
    * 
    * @example
    * console.log(clozeNote.raw) // "People from {{c1::Brazil::country}} are called {{c2::Brazilians::nationality}}."
    * console.log(clozeNote.getClozeType()) // ClozeTypeEnum.CLASSIC
    * 
    * console.log(clozeNote2.raw) // "People from {Brazil::country} are called {Brazilians::nationality}."
    * console.log(clozeNote2.getClozeType()) // ClozeTypeEnum.SIMPLE
    */
    get clozeType(): ClozeTypeEnum;

    /**
     * @returns {string} The raw text of the entire cloze note before processing.
     * 
     * @example
     * console.log(clozeNote.raw) // "People from {{c1::Brazil::country}} are called {{c2::Brazilians::nationality}}."
     */
    get raw(): string;

    /**
     * @returns {IClozeDeletion[]} The list of cloze deletions in the cloze note.
     * 
     * @example
     * console.log(clozeNote.raw) // "People from {{c1::Brazil::country}} are called {{c2::Brazilians::nationality}}."
     * console.log(clozeNote.clozeDeletions)
     * // [
     * //   { raw: "{{c1::Brazil::country}}", answer: "Brazil", seq: 1, hint: "country" },
     * //   { raw: "{{c2::Brazilians::nationality}}", answer: "Brazilians", seq: 2, hint: "nationality" }
     * // ]
     */
    get clozeDeletions(): IClozeDeletion[];

    /**
     * @returns {number} The total number of cards that can be generated from the cloze note.
     * 
     * @example
     * console.log(clozeNote.raw) // "People from {{c1::Brazil::country}} are called {{c2::Brazilians::nationality}}."
     * console.log(clozeNote.numCards) // 2
     */
    get numCards(): number;

    /**
     * @param {number} cardIndex The index of the card (starting at 0).
     * @returns {string} The front (question) of the i-th card that can be generated from the cloze note.
     * 
     * @example
     * console.log(clozeNote.raw) // "People from {{c1::Brazil::country}} are called {{c2::Brazilians::nationality}}."
     * console.log(clozeNote.getFront(0)) // People from [country] are called Brazilians.
     */
    getCardFront(cardIndex: number): string;
    
    /**
     * @param {number} cardIndex The index of the card (starting at 0).
     * @returns {string} The back (answer) of the i-th card that can be generated from the cloze note.
     * 
     * @example
     * console.log(clozeNote.raw) // "People from {{c1::Brazil::country}} are called {{c2::Brazilians::nationality}}."
     * console.log(clozeNote.getBack(0)) // People from Brazil are called Brazilians.
     */
    getCardBack(cardIndex: number): string;
}

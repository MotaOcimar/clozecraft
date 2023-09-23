import { ClozeDeletion } from "./cloze-deletion"

/**
 * Interface ClozeNote
 *
 * Represents a set of cloze test questions inside a context (cards).
 * It contains the original text, before being processed, and the list
 * of cloze test questions. It also provides methods to get
 * the front (question) and back (answer) of each card.
 */
export interface ClozeNote {
    
    /**
     * Returns the raw text of the entire cloze note before processing.
     * This includes all the cloze test questions and their content.
     * Example: "People from {{c1::Brazil::country}} are called {{c2::Brazilians::nationality}}."
     */
    get raw(): string;
    
    /**
     * Returns the list of cloze test questions in the cloze note.
     * Example:
     * [
     *   { raw: "{{c1::Brazil::country}}", answer: "Brazil", seq: 1, hint: "country" },
     *   { raw: "{{c2::Brazilians::nationality}}", answer: "Brazilians", seq: 2, hint: "nationality" }
     * ]
     */
    get clozeDeletions(): ClozeDeletion[];
    
    /**
     * Returns the total number of cards in the cloze note.
     * Example: 2 in "People from {{c1::Brazil::country}} are called {{c2::Brazilians::nationality}}."
     */
    get numCards(): number;
    
    /**
     * Returns the front (question) part of a specific cloze test question identified by the index.
     * The index starts at 0.
     * Example:
     * getFront(0) can return "People from [country] are called Brazilians."
     * in "People from {{c1::Brazil::country}} are called {{c2::Brazilians::nationality}}."
     * 
     * @param card The index of the cloze test question (zero-based).
     */
    getFront(card: number): string;
    
    /**
     * Returns the back (answer) part of a specific cloze test question identified by the index.
     * The index starts at 0.
     * Example:
     * getBack(0) can return "People from Brazil are called Brazilians."
     * in "People from {{c1::Brazil::country}} are called {{c2::Brazilians::nationality}}."
     * 
     * @param card The index of the cloze test question (zero-based).
     * @returns 
     */
    getBack(card: number): string;
}

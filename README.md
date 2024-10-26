# Clozecraft

Clozecraft is a package that aims to creat cloze deletion flashcards from text. It seeks to be simple, easy to use, and flexible.

## Usage Example

```typescript
import { ClozeCrafter } from "clozecraft";

const clozeCrafter = new ClozeCrafter( ['{{[c123::]answer[::hint]}}'] );
const clozeNote = clozeCrafter.createClozeNote('People from {{c1::Brazil::country}} are called {{c2::Brazilians::nationality}}.');

console.log(clozeNote?.getCardFront(0)); // People from [country] are called Brazilians.
console.log(clozeNote?.getCardBack(0)); // People from Brazil are called Brazilians.
console.log(clozeNote?.getCardFront(1)); // People from Brazil are called [nationality].
console.log(clozeNote?.getCardBack(1)); // People from Brazil are called Brazilians.
```

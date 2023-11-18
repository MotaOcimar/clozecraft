import { ClozeTypeEnum } from "../../src/implementation/ClozeTypeEnum";

const ankiLikeNotes = [
    {
        clozeType: ClozeTypeEnum.CLASSIC,
        raw: "People from {{c1::Brazil::country}} are called {{c2::Brazilians::nationality}}.",
        numCards: 2,
        getCardFront: (cardIndex: number) => {
            switch (cardIndex) {
                case 0:
                    return "People from [country] are called Brazilians.";
                case 1:
                    return "People from Brazil are called [nationality]."
            }
            throw new Error("Invalid card index.");
        },
        getCardBack: (cardIndex: number) => {
            switch (cardIndex) {
                case 0:
                    return "People from Brazil are called Brazilians.";
                case 1:
                    return "People from Brazil are called Brazilians."
            }
            throw new Error("Invalid card index.");
        }
    }
];

export const ClozeNoteMocks = {
    ankiLikeNotes
};

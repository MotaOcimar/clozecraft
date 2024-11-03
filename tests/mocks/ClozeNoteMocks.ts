import { ClozeTypeEnum } from '../../src/implementation/ClozeTypeEnum';

const ankiLikeNotes = {
    patternStr: '{{[c123::]answer[::hint]}}',
    noteList: [
        {
            _noteDescription: 'Classic Anki like note. With hints.',
            clozeType: ClozeTypeEnum.CLASSIC,
            raw: 'People from {{c1::Brazil::country}} are called {{c2::Brazilians::nationality}}.',
            numCards: 2,
            getCardFront: (cardIndex: number) => {
                switch (cardIndex) {
                    case 0:
                        return 'People from [country] are called Brazilians.';
                    case 1:
                        return 'People from Brazil are called [nationality].';
                }
                throw new Error('Invalid card index.');
            },
            getCardBack: (cardIndex: number) => {
                switch (cardIndex) {
                    case 0:
                        return 'People from Brazil are called Brazilians.';
                    case 1:
                        return 'People from Brazil are called Brazilians.';
                }
                throw new Error('Invalid card index.');
            }
        },
        {
            _noteDescription: 'Classic Anki like note. Without hints.',
            clozeType: ClozeTypeEnum.CLASSIC,
            raw: 'People from {{c1::Brazil}} are called {{c2::Brazilians}}.',
            numCards: 2,
            getCardFront: (cardIndex: number) => {
                switch (cardIndex) {
                    case 0:
                        return 'People from [...] are called Brazilians.';
                    case 1:
                        return 'People from Brazil are called [...].';
                }
                throw new Error('Invalid card index.');
            },
            getCardBack: (cardIndex: number) => {
                switch (cardIndex) {
                    case 0:
                        return 'People from Brazil are called Brazilians.';
                    case 1:
                        return 'People from Brazil are called Brazilians.';
                }
                throw new Error('Invalid card index.');
            }
        },
        {
            _noteDescription: 'Classic Anki like note. Mixed hints. A card has multiple clozes.',
            clozeType: ClozeTypeEnum.CLASSIC,
            raw: 'People from {{c1::Brazil::country}} are called {{c1::Brazilians::nationality}} and speak {{c2::Portuguese}}.',
            numCards: 2,
            getCardFront: (cardIndex: number) => {
                switch (cardIndex) {
                    case 0:
                        return 'People from [country] are called [nationality] and speak Portuguese.';
                    case 1:
                        return 'People from Brazil are called Brazilians and speak [...].';
                }
                throw new Error('Invalid card index.');
            },
            getCardBack: (cardIndex: number) => {
                switch (cardIndex) {
                    case 0:
                        return 'People from Brazil are called Brazilians and speak Portuguese.';
                    case 1:
                        return 'People from Brazil are called Brazilians and speak Portuguese.';
                }
                throw new Error('Invalid card index.');
            }
        },
        {
            _noteDescription: 'Simple Anki like note. With hints.',
            clozeType: ClozeTypeEnum.SIMPLE,
            raw: 'People from {{Brazil::country}} are called {{Brazilians::nationality}} and speak {{Portuguese::language}}.',
            numCards: 3,
            getCardFront: (cardIndex: number) => {
                switch (cardIndex) {
                    case 0:
                        return 'People from [country] are called Brazilians and speak Portuguese.';
                    case 1:
                        return 'People from Brazil are called [nationality] and speak Portuguese.';
                    case 2:
                        return 'People from Brazil are called Brazilians and speak [language].';
                }
                throw new Error('Invalid card index.');
            },
            getCardBack: (cardIndex: number) => {
                switch (cardIndex) {
                    case 0:
                        return 'People from Brazil are called Brazilians and speak Portuguese.';
                    case 1:
                        return 'People from Brazil are called Brazilians and speak Portuguese.';
                    case 2:
                        return 'People from Brazil are called Brazilians and speak Portuguese.';
                }
                throw new Error('Invalid card index. Mixed hints');
            }
        },
        {
            _noteDescription: 'Simple Anki like note. With mixed hints.',
            clozeType: ClozeTypeEnum.SIMPLE,
            raw: 'People from {{Brazil}} are called {{Brazilians}} and speak {{Portuguese::language}}.',
            numCards: 3,
            getCardFront: (cardIndex: number) => {
                switch (cardIndex) {
                    case 0:
                        return 'People from [...] are called Brazilians and speak Portuguese.';
                    case 1:
                        return 'People from Brazil are called [...] and speak Portuguese.';
                    case 2:
                        return 'People from Brazil are called Brazilians and speak [language].';
                }
                throw new Error('Invalid card index.');
            },
            getCardBack: (cardIndex: number) => {
                switch (cardIndex) {
                    case 0:
                        return 'People from Brazil are called Brazilians and speak Portuguese.';
                    case 1:
                        return 'People from Brazil are called Brazilians and speak Portuguese.';
                    case 2:
                        return 'People from Brazil are called Brazilians and speak Portuguese.';
                }
                throw new Error('Invalid card index.');
            }
        },
        {
            _noteDescription: 'Overlapping Anki like note. With mixed hints.',
            clozeType: ClozeTypeEnum.OVERLAPPING,
            raw: 'People from {{cssa::Brazil::country}} are called {{cahs::Brazilians::nationality}} and speak {{chas::Portuguese}}.',
            numCards: 3,
            getCardFront: (cardIndex: number) => {
                switch (cardIndex) {
                    case 0:
                        return 'People from Brazil are called [nationality] and speak ....';
                    case 1:
                        return 'People from Brazil are called ... and speak [...].';
                    case 2:
                        return 'People from [country] are called Brazilians and speak Portuguese.';
                }
                throw new Error('Invalid card index.');
            },
            getCardBack: (cardIndex: number) => {
                switch (cardIndex) {
                    case 0:
                        return 'People from Brazil are called Brazilians and speak ....';
                    case 1:
                        return 'People from Brazil are called ... and speak Portuguese.';
                    case 2:
                        return 'People from Brazil are called Brazilians and speak Portuguese.';
                }
                throw new Error('Invalid card index.');
            }
        }
    ]
};

const boldClozeNotes = {
    patternStr: '**[123::]answer[::hint]**',
    noteList: [
        {
            _noteDescription: 'Classic bold cloze note. With hints.',
            clozeType: ClozeTypeEnum.CLASSIC,
            raw: 'People from **1::Brazil::country** are called **2::Brazilians::nationality**.',
            numCards: 2,
            getCardFront: (cardIndex: number) => {
                switch (cardIndex) {
                    case 0:
                        return 'People from [country] are called Brazilians.';
                    case 1:
                        return 'People from Brazil are called [nationality].';
                }
                throw new Error('Invalid card index.');
            },
            getCardBack: (cardIndex: number) => {
                switch (cardIndex) {
                    case 0:
                        return 'People from Brazil are called Brazilians.';
                    case 1:
                        return 'People from Brazil are called Brazilians.';
                }
                throw new Error('Invalid card index.');
            }
        },
        {
            _noteDescription: 'Classic bold cloze note. Without hints.',
            clozeType: ClozeTypeEnum.CLASSIC,
            raw: 'People from **1::Brazil** are called **2::Brazilians**.',
            numCards: 2,
            getCardFront: (cardIndex: number) => {
                switch (cardIndex) {
                    case 0:
                        return 'People from [...] are called Brazilians.';
                    case 1:
                        return 'People from Brazil are called [...].';
                }
                throw new Error('Invalid card index.');
            },
            getCardBack: (cardIndex: number) => {
                switch (cardIndex) {
                    case 0:
                        return 'People from Brazil are called Brazilians.';
                    case 1:
                        return 'People from Brazil are called Brazilians.';
                }
                throw new Error('Invalid card index.');
            }
        },
        {
            _noteDescription: 'Classic bold cloze note. Mixed hints. A card has multiple clozes.',
            clozeType: ClozeTypeEnum.CLASSIC,
            raw: 'People from **1::Brazil::country** are called **1::Brazilians::nationality** and speak **2::Portuguese**.',
            numCards: 2,
            getCardFront: (cardIndex: number) => {
                switch (cardIndex) {
                    case 0:
                        return 'People from [country] are called [nationality] and speak Portuguese.';
                    case 1:
                        return 'People from Brazil are called Brazilians and speak [...].';
                }
                throw new Error('Invalid card index.');
            },
            getCardBack: (cardIndex: number) => {
                switch (cardIndex) {
                    case 0:
                        return 'People from Brazil are called Brazilians and speak Portuguese.';
                    case 1:
                        return 'People from Brazil are called Brazilians and speak Portuguese.';
                }
                throw new Error('Invalid card index.');
            }
        },
        {
            _noteDescription: 'Simple bold cloze note. With hints.',
            clozeType: ClozeTypeEnum.SIMPLE,
            raw: 'People from **Brazil::country** are called **Brazilians::nationality** and speak **Portuguese::language**.',
            numCards: 3,
            getCardFront: (cardIndex: number) => {
                switch (cardIndex) {
                    case 0:
                        return 'People from [country] are called Brazilians and speak Portuguese.';
                    case 1:
                        return 'People from Brazil are called [nationality] and speak Portuguese.';
                    case 2:
                        return 'People from Brazil are called Brazilians and speak [language].';
                }
                throw new Error('Invalid card index.');
            },
            getCardBack: (cardIndex: number) => {
                switch (cardIndex) {
                    case 0:
                        return 'People from Brazil are called Brazilians and speak Portuguese.';
                    case 1:
                        return 'People from Brazil are called Brazilians and speak Portuguese.';
                    case 2:
                        return 'People from Brazil are called Brazilians and speak Portuguese.';
                }
                throw new Error('Invalid card index. Mixed hints');
            }
        },
        {
            _noteDescription: 'Simple bold cloze note. With mixed hints.',
            clozeType: ClozeTypeEnum.SIMPLE,
            raw: 'People from **Brazil** are called **Brazilians** and speak **Portuguese::language**.',
            numCards: 3,
            getCardFront: (cardIndex: number) => {
                switch (cardIndex) {
                    case 0:
                        return 'People from [...] are called Brazilians and speak Portuguese.';
                    case 1:
                        return 'People from Brazil are called [...] and speak Portuguese.';
                    case 2:
                        return 'People from Brazil are called Brazilians and speak [language].';
                }
                throw new Error('Invalid card index.');
            },
            getCardBack: (cardIndex: number) => {
                switch (cardIndex) {
                    case 0:
                        return 'People from Brazil are called Brazilians and speak Portuguese.';
                    case 1:
                        return 'People from Brazil are called Brazilians and speak Portuguese.';
                    case 2:
                        return 'People from Brazil are called Brazilians and speak Portuguese.';
                }
                throw new Error('Invalid card index.');
            }
        },
        {
            _noteDescription: 'Overlapping bold cloze note. With mixed hints.',
            clozeType: ClozeTypeEnum.OVERLAPPING,
            raw: 'People from **ssa::Brazil::country** are called **ahs::Brazilians::nationality** and speak **has::Portuguese**.',
            numCards: 3,
            getCardFront: (cardIndex: number) => {
                switch (cardIndex) {
                    case 0:
                        return 'People from Brazil are called [nationality] and speak ....';
                    case 1:
                        return 'People from Brazil are called ... and speak [...].';
                    case 2:
                        return 'People from [country] are called Brazilians and speak Portuguese.';
                }
                throw new Error('Invalid card index.');
            },
            getCardBack: (cardIndex: number) => {
                switch (cardIndex) {
                    case 0:
                        return 'People from Brazil are called Brazilians and speak ....';
                    case 1:
                        return 'People from Brazil are called ... and speak Portuguese.';
                    case 2:
                        return 'People from Brazil are called Brazilians and speak Portuguese.';
                }
                throw new Error('Invalid card index.');
            }
        }
    ]
}

const commentWithFootnoteNotes = {
    patternStr: '==answer==[%%123%%][^\\[hint\\]]',
    noteList: [
        {
            _noteDescription: 'Classic "comment with footnote" note. With hints.',
            clozeType: ClozeTypeEnum.CLASSIC,
            raw: 'People from ==Brazil==%%1%%^[country] are called ==Brazilians==%%2%%^[nationality].',
            numCards: 2,
            getCardFront: (cardIndex: number) => {
                switch (cardIndex) {
                    case 0:
                        return 'People from [country] are called Brazilians.';
                    case 1:
                        return 'People from Brazil are called [nationality].';
                }
                throw new Error('Invalid card index.');
            },
            getCardBack: (cardIndex: number) => {
                switch (cardIndex) {
                    case 0:
                        return 'People from Brazil are called Brazilians.';
                    case 1:
                        return 'People from Brazil are called Brazilians.';
                }
                throw new Error('Invalid card index.');
            }
        },
        {
            _noteDescription: 'Classic "comment with footnote" note. Without hints.',
            clozeType: ClozeTypeEnum.CLASSIC,
            raw: 'People from ==Brazil==%%1%% are called ==Brazilians==%%2%%.',
            numCards: 2,
            getCardFront: (cardIndex: number) => {
                switch (cardIndex) {
                    case 0:
                        return 'People from [...] are called Brazilians.';
                    case 1:
                        return 'People from Brazil are called [...].';
                }
                throw new Error('Invalid card index.');
            },
            getCardBack: (cardIndex: number) => {
                switch (cardIndex) {
                    case 0:
                        return 'People from Brazil are called Brazilians.';
                    case 1:
                        return 'People from Brazil are called Brazilians.';
                }
                throw new Error('Invalid card index.');
            }
        },
        {
            _noteDescription: 'Classic "comment with footnote" note. Mixed hints. A card has multiple clozes.',
            clozeType: ClozeTypeEnum.CLASSIC,
            raw: 'People from ==Brazil==%%1%%^[country] are called ==Brazilians==%%1%%^[nationality] and speak ==Portuguese==%%2%%.',
            numCards: 2,
            getCardFront: (cardIndex: number) => {
                switch (cardIndex) {
                    case 0:
                        return 'People from [country] are called [nationality] and speak Portuguese.';
                    case 1:
                        return 'People from Brazil are called Brazilians and speak [...].';
                }
                throw new Error('Invalid card index.');
            },
            getCardBack: (cardIndex: number) => {
                switch (cardIndex) {
                    case 0:
                        return 'People from Brazil are called Brazilians and speak Portuguese.';
                    case 1:
                        return 'People from Brazil are called Brazilians and speak Portuguese.';
                }
                throw new Error('Invalid card index.');
            }
        },
        {
            _noteDescription: 'Simple "comment with footnote" note. With hints.',
            clozeType: ClozeTypeEnum.SIMPLE,
            raw: 'People from ==Brazil==^[country] are called ==Brazilians==^[nationality] and speak ==Portuguese==^[language].',
            numCards: 3,
            getCardFront: (cardIndex: number) => {
                switch (cardIndex) {
                    case 0:
                        return 'People from [country] are called Brazilians and speak Portuguese.';
                    case 1:
                        return 'People from Brazil are called [nationality] and speak Portuguese.';
                    case 2:
                        return 'People from Brazil are called Brazilians and speak [language].';
                }
                throw new Error('Invalid card index.');
            },
            getCardBack: (cardIndex: number) => {
                switch (cardIndex) {
                    case 0:
                        return 'People from Brazil are called Brazilians and speak Portuguese.';
                    case 1:
                        return 'People from Brazil are called Brazilians and speak Portuguese.';
                    case 2:
                        return 'People from Brazil are called Brazilians and speak Portuguese.';
                }
                throw new Error('Invalid card index. Mixed hints');
            }
        },
        {
            _noteDescription: 'Simple "comment with footnote" note. With mixed hints.',
            clozeType: ClozeTypeEnum.SIMPLE,
            raw: 'People from ==Brazil== are called ==Brazilians== and speak ==Portuguese==^[language].',
            numCards: 3,
            getCardFront: (cardIndex: number) => {
                switch (cardIndex) {
                    case 0:
                        return 'People from [...] are called Brazilians and speak Portuguese.';
                    case 1:
                        return 'People from Brazil are called [...] and speak Portuguese.';
                    case 2:
                        return 'People from Brazil are called Brazilians and speak [language].';
                }
                throw new Error('Invalid card index.');
            },
            getCardBack: (cardIndex: number) => {
                switch (cardIndex) {
                    case 0:
                        return 'People from Brazil are called Brazilians and speak Portuguese.';
                    case 1:
                        return 'People from Brazil are called Brazilians and speak Portuguese.';
                    case 2:
                        return 'People from Brazil are called Brazilians and speak Portuguese.';
                }
                throw new Error('Invalid card index.');
            }
        },
        {
            _noteDescription: 'Overlapping "comment with footnote" note. With mixed hints.',
            clozeType: ClozeTypeEnum.OVERLAPPING,
            raw: 'People from ==Brazil==%%ssa%%^[country] are called ==Brazilians==%%ahs%%^[nationality] and speak ==Portuguese==%%has%%.',
            numCards: 3,
            getCardFront: (cardIndex: number) => {
                switch (cardIndex) {
                    case 0:
                        return 'People from Brazil are called [nationality] and speak ....';
                    case 1:
                        return 'People from Brazil are called ... and speak [...].';
                    case 2:
                        return 'People from [country] are called Brazilians and speak Portuguese.';
                }
                throw new Error('Invalid card index.');
            },
            getCardBack: (cardIndex: number) => {
                switch (cardIndex) {
                    case 0:
                        return 'People from Brazil are called Brazilians and speak ....';
                    case 1:
                        return 'People from Brazil are called ... and speak Portuguese.';
                    case 2:
                        return 'People from Brazil are called Brazilians and speak Portuguese.';
                }
                throw new Error('Invalid card index.');
            }
        }
    ]
}

const hintAndSeqWithSamePatternNotes = {
    patternStr: '→answer←[{hint}][{123}]',
    noteList: [
        {
            _noteDescription: 'Both hint and sequence number/string have the same pattern. Classic cloze without hint in the first deletion, but with hint in the second deletion.',
            clozeType: ClozeTypeEnum.CLASSIC,
            raw: 'People from →Brazil←{1} are called →Brazilians←{nationality}{1}.',
            numCards: 1,
            getCardFront: (cardIndex: number) => {
                switch (cardIndex) {
                    case 0:
                        return 'People from [...] are called [nationality].';
                }
                throw new Error('Invalid card index.');
            },
            getCardBack: (cardIndex: number) => {
                switch (cardIndex) {
                    case 0:
                        return 'People from Brazil are called Brazilians.';
                }
                throw new Error('Invalid card index.');
            }
        },
        {
            _noteDescription: 'Both hint and sequence number/string have the same pattern. Overlapped cloze without hint in the first deletion, but with hint in the second deletion.',
            clozeType: ClozeTypeEnum.OVERLAPPING,
            raw: 'People from →Brazil←{a} are called →Brazilians←{nationality}{a}.',
            numCards: 1,
            getCardFront: (cardIndex: number) => {
                switch (cardIndex) {
                    case 0:
                        return 'People from [...] are called [nationality].';
                }
                throw new Error('Invalid card index.');
            },
            getCardBack: (cardIndex: number) => {
                switch (cardIndex) {
                    case 0:
                        return 'People from Brazil are called Brazilians.';
                }
                throw new Error('Invalid card index.');
            }
        },
        {
            _noteDescription: 'Both hint and sequence number/string have the same pattern. Simple cloze without hint in the first deletion, but with hint in the second deletion.',
            clozeType: ClozeTypeEnum.SIMPLE,
            raw: 'People from →Brazil← are called →Brazilians←{nationality}.',
            numCards: 2,
            getCardFront: (cardIndex: number) => {
                switch (cardIndex) {
                    case 0:
                        return 'People from [...] are called Brazilians.';
                    case 1:
                        return 'People from Brazil are called [nationality].';
                }
                throw new Error('Invalid card index.');
            },
            getCardBack: (cardIndex: number) => {
                switch (cardIndex) {
                    case 0:
                        return 'People from Brazil are called Brazilians.';
                    case 1:
                        return 'People from Brazil are called Brazilians.';
                }
                throw new Error('Invalid card index.');
            }
        }
    ]
}

export const ClozeNoteMocks = [
    ankiLikeNotes,
    boldClozeNotes,
    commentWithFootnoteNotes,
    hintAndSeqWithSamePatternNotes
];

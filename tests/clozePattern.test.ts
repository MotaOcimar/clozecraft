import { ClozePattern } from "../src/implementation/ClozePattern";
import { IClozeRegExpExecArray } from "../src/interfaces/IClozeRegExpExecArray";

let patterns =
"[answer][%%\\[123\\]%%][^\\[hint\\]]\n\
{{[c123::]answer[::hint]}}\n\
*[c123::][answer][::hint]*\n\
*[hint::][answer][::123]*";

let clozeOLExample =
"[oi mundo]%%[as]%%^[dica1] \
{{cas::oi mundo::dica1}} \
*dica1::[oi mundo]::as* \
*dica2::[texto2]::hsa* \
*cas::[oi mundo]::dica1*";

let clozeClassicExample =
"[oi mundo]%%[1]%%^[dica1] \
{{c2::oi mundo::dica1}} \
*dica1::[oi mundo]::3* \
*dica2::[texto2]::4* \
*c5::[oi mundo]::dica1*";

let clozeSimpleExample = 
"[texto1]^[dica1] \
{{texto2::dica2}} \
*dica3::[texto3]* \
*dica4::[texto4]* \
*[texto5]::dica5*";


patterns.split("\n").forEach((line) => {
    let clozePattern = new ClozePattern(line);

    console.log("\n\n")
    console.log("pattern: " + line);
    console.log(clozePattern.clozeSimpleRegex);
    console.log(clozePattern.clozeClassicRegex);
    console.log(clozePattern.clozeOLRegex);

    let match: IClozeRegExpExecArray | null;
    // while (match = clozePattern.clozeOLRegex.exec(clozeOLExample)) {
    //     console.log(clozePattern.clozeOLRegex)
    //     console.log("clozeText: " + match.clozeText);
    //     console.log("clozeHint: " + match.clozeHint);
    //     console.log("clozeSeq: " + match.clozeSeq);
    // }

    // while (match = clozePattern.clozeClassicRegex.exec(clozeClassicExample)) {
    //     console.log(clozePattern.clozeClassicRegex)
    //     console.log("clozeText: " + match.clozeText);
    //     console.log("clozeHint: " + match.clozeHint);
    //     console.log("clozeSeq: " + match.clozeSeq);
    // }

    const clozeRegex = clozePattern.clozeSimpleRegex;
    console.log(clozeRegex);
    while (match = clozeRegex.exec(clozeSimpleExample)) {
        console.log("match: " + match);
        console.log("cloze raw: " + match.answer)
        console.log("cloze answer: " + match.answer);
        console.log("cloze hint: " + match.hint);
        console.log("cloze seq: " + match.seq);
    }

});
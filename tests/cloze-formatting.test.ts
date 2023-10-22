import { ClozePattern } from "../src/implementation/ClozePattern";
import { IClozeRegExpExecArray } from "../src/interfaces/IClozeRegExpExecArray";

let text =
"[cloze][%%\\[123\\]%%][^\\[hint\\]]\n\
{{[c123::]cloze[::hint]}}\n\
*[c123::][cloze][::hint]*\n\
*[hint::][cloze][::123]*";

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


text.split("\n").forEach((line) => {
    let clozePattern = new ClozePattern(line);

    console.log("\n\n")
    console.log(line);
    // console.log(clozePattern.clozeSimpleRegex);
    // console.log(clozePattern.clozeClassicRegex);
    // console.log(clozePattern.clozeOLRegex);

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

    while (match = clozePattern.clozeSimpleRegex.exec(clozeSimpleExample)) {
        console.log(clozePattern.clozeSimpleRegex)
        console.log("match: " + match[0])
        console.log("clozeText: " + match.answer);
        console.log("clozeHint: " + match.hint);
        console.log("clozeSeq: " + match.seq);
    }

});
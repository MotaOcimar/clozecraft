import { clozeFormattingImpl } from "./clozeFormattingImpl";
import { ClozeRegExpExecArray } from "./clozeRegExp";

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

text.split("\n").forEach((line) => {
    let clozeFormatting = new clozeFormattingImpl(line);

    console.log("\n\n")
    console.log(line);
    // console.log(clozeFormatting.clozeSimpleRegex);
    // console.log(clozeFormatting.clozeClassicRegex);
    // console.log(clozeFormatting.clozeOLRegex);

    let match: ClozeRegExpExecArray;
    while (match = clozeFormatting.clozeOLRegex.exec(clozeOLExample)) {
        console.log(clozeFormatting.clozeOLRegex)
        console.log("clozeText: " + match.clozeText);
        console.log("clozeHint: " + match.clozeHint);
        console.log("clozeSeq: " + match.clozeSeq);
    }
});
import { ClozeFormattingImpl } from "./clozeFormatting";
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
    let clozeFormatting = new ClozeFormattingImpl(line);

    console.log("\n\n")
    console.log(line);
    // console.log(clozeFormatting.clozeSimpleRegex);
    // console.log(clozeFormatting.clozeClassicRegex);
    // console.log(clozeFormatting.clozeOLRegex);

    let match: ClozeRegExpExecArray | null;
    // while (match = clozeFormatting.clozeOLRegex.exec(clozeOLExample)) {
    //     console.log(clozeFormatting.clozeOLRegex)
    //     console.log("clozeText: " + match.clozeText);
    //     console.log("clozeHint: " + match.clozeHint);
    //     console.log("clozeSeq: " + match.clozeSeq);
    // }

    // while (match = clozeFormatting.clozeClassicRegex.exec(clozeClassicExample)) {
    //     console.log(clozeFormatting.clozeClassicRegex)
    //     console.log("clozeText: " + match.clozeText);
    //     console.log("clozeHint: " + match.clozeHint);
    //     console.log("clozeSeq: " + match.clozeSeq);    
    // }

    while (match = clozeFormatting.clozeSimpleRegex.exec(clozeSimpleExample)) {
        console.log(clozeFormatting.clozeSimpleRegex)
        console.log("match: " + match[0])
        console.log("clozeText: " + match.clozeText);
        console.log("clozeHint: " + match.clozeHint);
        console.log("clozeSeq: " + match.clozeSeq);    
    }        
            
});
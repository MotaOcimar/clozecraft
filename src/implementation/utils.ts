import { IClozeFormat } from "../interfaces/IClozeFormat";

export function escapeRegexString(str: string) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export class htmlFormat implements IClozeFormat {
    asking(text: string): string {
        return`<span style='color:#2196f3'>[...]</span>`
    }
    showing(text: string): string {
        return`<span style='color:#2196f3'>${text}</span>`
    }
    hinting(text: string): string {
        return`<span style='color:#2196f3'>[${text}]</span>`
    }
    hiding(text: string): string {
        return`...`
    }
}

export class simpleFormat implements IClozeFormat {
    asking(text: string): string {
        return `[...]`
    }
    showing(text: string): string {
        return `${text}`
    }
    hinting(text: string): string {
        return `[${text}]`
    }
    hiding(text: string): string {
        return `...`
    }
}

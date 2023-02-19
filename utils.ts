export function escapeRegexString(str: string) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export class format{
    static asking(text: string): string {
        return`<span style='color:#2196f3'>${text}</span>`
    }
    static showing(text: string): string {
        return`<span style='color:#2196f3'>${text}</span>`
    }
}

import { IClozeFormatter } from "../interfaces/IClozeFormatter";

export function escapeRegexString(str: string) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export class htmlFormatter implements IClozeFormatter {
    asking(answer: string, hint: string): string {
        return `<span style='color:#2196f3'>${!hint ? '[...]' : `[${hint}]`}</span>`;
    };
    showingAnswer(answer: string, hint: string): string {
        return`<span style='color:#2196f3'>${answer}</span>`
    };
    hiding(answer: string, hint: string): string {
        return `${!hint ? '...' : `[${hint}]`} `;
    };
}

export class simpleFormatter implements IClozeFormatter {
    asking(answer: string, hint: string): string {
        return `${!hint ? '[...]' : `[${hint}]`}`;
    };
    showingAnswer(answer: string, hint: string): string {
        return answer;
    };
    hiding(answer: string, hint: string): string {
        return `...`;
    };
}

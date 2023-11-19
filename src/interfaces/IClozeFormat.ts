export interface IClozeFormat {
    hiding(answer: string, hint: string): string;
    asking(answer: string, hint: string): string;
    showingAnswer(answer: string, hint: string): string;
}

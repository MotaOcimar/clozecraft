export interface IClozeFormat {
    asking(text: string): string;
    showing(text: string): string;
    hinting(text: string): string;
    hiding(text: string): string;
}

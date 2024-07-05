export const breakChar = /(?<=[.．。!?！？\n]+?)(?=[^.．。!?！？\n])/g;

export const isBreakChar = (char: string) =>
    [".", "．", "。", "!", "?", "！", "？", "\n"].includes(char);

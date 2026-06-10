// ===== PM Digital Textbook — barrel =====
import type { TextbookChapter } from "./types";
import { nodeWordCount, countNodes } from "./types";
import { CH1 } from "./ch01";
import { CH2 } from "./ch02";
import { CH3 } from "./ch03";
import { CH4 } from "./ch04";
import { CH5 } from "./ch05";
import { CH6 } from "./ch06";
import { CH7 } from "./ch07";
import { CH8 } from "./ch08";
import { CH9 } from "./ch09";

export * from "./types";

export const PM_TEXTBOOK: Record<string, TextbookChapter> = {
  "1": CH1,
  "2": CH2,
  "3": CH3,
  "4": CH4,
  "5": CH5,
  "6": CH6,
  "7": CH7,
  "8": CH8,
  "9": CH9,
};

export const PM_TEXTBOOK_STATS = Object.fromEntries(
  Object.entries(PM_TEXTBOOK).map(([ch, c]) => {
    const total = c.subchapters.reduce((s, n) => s + countNodes(n), 0);
    const words = c.subchapters.reduce((s, n) => s + nodeWordCount(n) + (n.children?.reduce((a, x) => a + nodeWordCount(x), 0) ?? 0), 0);
    return [ch, { parents: c.subchapters.length, totalNodes: total, words, readMin: Math.round(words / 180) }];
  }),
);

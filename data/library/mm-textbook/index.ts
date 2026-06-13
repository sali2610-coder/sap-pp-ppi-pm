// ===== MM Digital Textbook — barrel =====
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
import { CH10 } from "./ch10";
import { CH11 } from "./ch11";
import { CH12 } from "./ch12";
import { CH13 } from "./ch13";
import { CH14 } from "./ch14";
import { CH15 } from "./ch15";
import { CH16 } from "./ch16";
import { CH17 } from "./ch17";
import { CH18 } from "./ch18";

export * from "./types";

export const MM_TEXTBOOK: Record<string, TextbookChapter> = {
  "1": CH1,
  "2": CH2,
  "3": CH3,
  "4": CH4,
  "5": CH5,
  "6": CH6,
  "7": CH7,
  "8": CH8,
  "9": CH9,
  "10": CH10,
  "11": CH11,
  "12": CH12,
  "13": CH13,
  "14": CH14,
  "15": CH15,
  "16": CH16,
  "17": CH17,
  "18": CH18,
};

export const MM_TEXTBOOK_STATS = Object.fromEntries(
  Object.entries(MM_TEXTBOOK).map(([ch, c]) => {
    const total = c.subchapters.reduce((s, n) => s + countNodes(n), 0);
    const words = c.subchapters.reduce((s, n) => s + nodeWordCount(n) + (n.children?.reduce((a, x) => a + nodeWordCount(x), 0) ?? 0), 0);
    return [ch, { parents: c.subchapters.length, totalNodes: total, words, readMin: Math.round(words / 180) }];
  }),
);

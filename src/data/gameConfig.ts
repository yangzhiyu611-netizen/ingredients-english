export type WordType = "core" | "pair";

export interface PhraseContent {
  zh: string;
  clue: string;
  example: string;
  exampleZh: string;
  point: string;
  mistakeAnalysis?: string;
}

export interface GameConfig {
  theme: string;
  level: string;
  rules: {
    coreWordCount: number;
    pairWordCount: number;
    finalQuestionCount: number;
    strictMatrixMode: boolean;
    useValidPhraseWhitelist: boolean;
  };
  initialSet: {
    coreWords: string[];
    pairWords: string[];
  };
  coreReplacementPool: string[];
  pairReplacementPool: string[];
  wordFocus: Record<string, string>;
  wordZh: Record<string, string>;
  wordIpa: Record<string, string>;
  validPhraseZh: Record<string, string>;
  phraseContent: Record<string, PhraseContent>;
}

import { phraseContentIntensity } from "@/data/phraseContentIntensity";

export const gameConfig: GameConfig = {
  theme: "核心搭配矩阵：Record/Reputation/Career... × Stellar/Spotless...",
  level: "形容词修饰名词（评价/口碑/履历）",
  rules: {
    coreWordCount: 3,
    pairWordCount: 3,
    finalQuestionCount: 9,
    strictMatrixMode: true,
    useValidPhraseWhitelist: true,
  },
  initialSet: {
    coreWords: ["record", "reputation", "career"],
    pairWords: ["stellar", "spotless", "abysmal"],
  },
  coreReplacementPool: [
    "performance",
    "background",
    "history",
    "pedigree",
    "standing",
  ],
  pairReplacementPool: [
    "checkered",
    "mediocre",
    "illustrious",
    "flawless",
    "unimpeachable",
  ],
  wordFocus: {
    record: "record：履历、记录。",
    reputation: "reputation：口碑、名声。",
    career: "career：生涯、事业。",
    performance: "performance：业绩、表现。",
    background: "background：出身、背景。",
    history: "history：历程。",
    pedigree: "pedigree：门第、血统。",
    standing: "standing：地位、身份。",

    stellar: "stellar：顶级的，一流的。",
    spotless: "spotless：清白的，无可挑剔的。",
    abysmal: "abysmal：惨淡的，糟透的。",
    checkered: "checkered：曲折的。",
    mediocre: "mediocre：平庸的。",
    illustrious: "illustrious：显赫的，辉煌的。",
    flawless: "flawless：完美的，无瑕的。",
    unimpeachable: "unimpeachable：过硬的，无懈可击的。",
  },
  wordZh: {
    record: "履历,记录",
    reputation: "口碑，名声",
    career: "生涯，事业",
    performance: "业绩，表现",
    background: "出身，背景",
    history: "历程",
    pedigree: "门第，血统",
    standing: "地位，身份",

    stellar: "顶级的，一流的",
    spotless: "清白的，无可挑剔的",
    abysmal: "惨淡的，糟透的",
    checkered: "曲折的",
    mediocre: "平庸的",
    illustrious: "显赫的，辉煌的",
    flawless: "完美的，无瑕的",
    unimpeachable: "过硬的，无懈可击的",
  },
  wordIpa: {
    record: "/ˈrekərd/",
    reputation: "/ˌrepjʊˈteɪʃən/",
    career: "/kəˈrɪər/",
    performance: "/pərˈfɔːrməns/",
    background: "/ˈbækɡraʊnd/",
    history: "/ˈhɪstəri/",
    pedigree: "/ˈpedɪɡriː/",
    standing: "/ˈstændɪŋ/",

    stellar: "/ˈstɛləriːr/",
    spotless: "/ˈspɑːtˌləs/",
    abysmal: "/əˈbɪzməl/",
    checkered: "/ˈtʃɛkərd/",
    mediocre: "/ˌmiːdiˈoʊkər/",
    illustrious: "/ɪˈlʌstriəs/",
    flawless: "/ˈflɔːləs/",
    unimpeachable: "/ˌʌnɪmˈpiːtʃəbl/",
  },
  validPhraseZh: {
    // record
    "record stellar": "一流的履历",
    "record spotless": "清白的记录",
    "record abysmal": "惨淡的记录",
    "record checkered": "曲折的记录",
    "record mediocre": "平庸的履历",
    "record illustrious": "辉煌的履历",
    "record flawless": "完美的履历",
    "record unimpeachable": "过硬的履历",

    // reputation
    "reputation stellar": "顶级的口碑",
    "reputation spotless": "清白的名声",
    "reputation abysmal": "惨淡的口碑",
    "reputation checkered": "波折的名声",
    "reputation mediocre": "平庸的口碑",
    "reputation illustrious": "显赫的名声",
    "reputation flawless": "完美的名声",
    "reputation unimpeachable": "过硬的口碑",

    // career
    "career stellar": "一流的事业",
    "career spotless": "清白的事业",
    "career abysmal": "惨淡的事业",
    "career checkered": "曲折的事业",
    "career mediocre": "平庸的事业",
    "career illustrious": "辉煌的事业",
    "career flawless": "完美的生涯",
    "career unimpeachable": "过硬的事业",

    // performance
    "performance stellar": "一流的表现",
    "performance spotless": "无可挑剔的表现",
    "performance abysmal": "惨淡的表现",
    "performance checkered": "曲折的表现",
    "performance mediocre": "平庸的表现",
    "performance illustrious": "辉煌的表现",
    "performance flawless": "完美的表现",
    "performance unimpeachable": "无懈可击的表现",

    // background
    "background stellar": "顶级的出身",
    "background spotless": "清白的出身",
    "background abysmal": "惨淡的出身",
    "background checkered": "曲折的出身",
    "background mediocre": "平庸的出身",
    "background illustrious": "显赫的背景",
    "background flawless": "完美的出身",
    "background unimpeachable": "过硬的背景",

    // history
    "history stellar": "一流的历程",
    "history spotless": "清白的历程",
    "history abysmal": "惨淡的历程",
    "history checkered": "驳杂的历程",
    "history mediocre": "平庸的历程",
    "history illustrious": "辉煌的历程",
    "history flawless": "完美的历程",
    "history unimpeachable": "无懈可击的历程",

    // pedigree
    "pedigree stellar": "顶级的门第",
    "pedigree spotless": "清白的门扉",
    "pedigree abysmal": "糟透的门第",
    "pedigree checkered": "曲折的出身",
    "pedigree mediocre": "平庸的出身",
    "pedigree illustrious": "显赫的门第",
    "pedigree flawless": "完美的出身",
    "pedigree unimpeachable": "过硬的出身",

    // standing
    "standing stellar": "顶级的地位",
    "standing spotless": "清白的身份",
    "standing abysmal": "曲折的身份",
    "standing checkered": "驳杂的地位",
    "standing mediocre": "平庸的身份",
    "standing illustrious": "显赫的地位",
    "standing flawless": "完美的身份",
    "standing unimpeachable": "无懈可击的地位",
  },
  phraseContent: {
    ...phraseContentIntensity,
  },
};

export const validPhraseSet = new Set(Object.keys(gameConfig.validPhraseZh));

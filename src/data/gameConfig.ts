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
    record: "record 为名词：“履历/记录”；在矩阵里被各类形容词评价。",
    reputation: "reputation 为名词：“名声/口碑”；被形容词转成褒贬判断。",
    career: "career 为名词：“职业生涯”；被形容词评价成不同等级。",
    performance: "performance 为名词：“表现/业绩”；被形容词评价成高低档次。",
    background: "background 为名词：“背景/出身”；被形容词评价出身与经历。",
    history: "history 为名词：“历史/过往”；被形容词评价过往质量。",
    pedigree: "pedigree 为名词：“出身/门第/血统”；被形容词评价门第层级。",
    standing: "standing 为名词：“社会地位/声望”；被形容词评价权威与地位。",

    stellar: "stellar 为形容词：“极其出彩的”；搭配不同核心名词形成高评价。",
    spotless: "spotless 为形容词：“身家清白/一尘不染的”；搭配形成“无瑕”的评价。",
    abysmal: "abysmal 为形容词：“劣迹斑斑/惨不忍睹的”；搭配形成强烈负面。",
    checkered: "checkered 为形容词：“毁誉参半/复杂的过去”；搭配形成起伏与争议。",
    mediocre: "mediocre 为形容词：“平庸的/乏善可陈的”；搭配形成一般评价。",
    illustrious: "illustrious 为形容词：“赫赫有名/功勋卓著”；搭配形成显赫褒扬。",
    flawless: "flawless 为形容词：“完美无缺/无懈可击”；搭配形成近乎满分。",
    unimpeachable: "unimpeachable 为形容词：“铁证如山/无可指摘”；搭配形成权威定论。",
  },
  wordZh: {
    record: "履历/记录",
    reputation: "名声/口碑",
    career: "职业生涯",
    performance: "表现/业绩",
    background: "背景/出身",
    history: "历史/过往",
    pedigree: "出身/门第/血统",
    standing: "社会地位/声望",

    stellar: "出彩的/彪炳的",
    spotless: "无瑕的/清白的",
    abysmal: "糟糕的/劣迹的",
    checkered: "复杂的/起伏的",
    mediocre: "平庸的/一般的",
    illustrious: "显赫的/功勋的",
    flawless: "完美的/无懈可击的",
    unimpeachable: "铁证如山/无可指摘的",
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
    "record stellar": "极其出彩的履历",
    "record spotless": "毫无污点的履历",
    "record abysmal": "惨不忍睹的履历",
    "record checkered": "复杂的过去",
    "record mediocre": "乏善可陈的记录",
    "record illustrious": "辉煌的战果 / 功勋卓著的履历",
    "record flawless": "完美无缺的记录",
    "record unimpeachable": "铁证如山 / 过硬的履历",

    // reputation
    "reputation stellar": "极其出彩的名声",
    "reputation spotless": "一尘不染的名声",
    "reputation abysmal": "臭名昭著 / 名声扫地",
    "reputation checkered": "褒贬不一 / 争议不断的名声",
    "reputation mediocre": "名不见经传 / 泛泛的口碑",
    "reputation illustrious": "赫赫有名的声望",
    "reputation flawless": "无暇的名誉",
    "reputation unimpeachable": "德高望重 / 无可指摘的名声",

    // career
    "career stellar": "平步青云 / 璀璨的职场生涯",
    "career spotless": "清廉的仕途 / 一尘不染的职业生涯",
    "career abysmal": "一团糟的职业生涯",
    "career checkered": "仕途坎坷 / 起伏不定的职业生涯",
    "career mediocre": "碌碌无为的职场生涯",
    "career illustrious": "功勋卓著的生涯",
    "career flawless": "无懈可击的职业表现",
    "career unimpeachable": "根基深厚且无可非议的生涯",

    // performance
    "performance stellar": "惊艳全场 / 顶尖的业绩表现",
    "performance spotless": "零失误的表现",
    "performance abysmal": "烂透了的表现 / 表现极差",
    "performance checkered": "状态起伏不定 / 时好时坏的表现",
    "performance mediocre": "表现平平 / 混日子式的表现",
    "performance illustrious": "光彩夺目的演出/表现",
    "performance flawless": "教科书级别的表现",
    "performance unimpeachable": "稳如泰山 / 无可挑剔的表现",

    // background
    "background stellar": "极其硬核的背景",
    "background spotless": "根正苗红 / 家世非常清白",
    "background abysmal": "出身寒微 / 糟糕的家庭环境",
    "background checkered": "背景复杂 / 经历坎坷的背景",
    "background mediocre": "家境一般 / 平凡的背景",
    "background illustrious": "显赫的家世",
    "background flawless": "毫无瑕疵的成长背景",
    "background unimpeachable": "经得起查的背景",

    // history
    "history stellar": "光辉历程",
    "history spotless": "一干二净的过去",
    "history abysmal": "一段不堪回首的历史",
    "history checkered": "兴衰更迭 / 充满变数的历史",
    "history mediocre": "平淡无奇的历史",
    "history illustrious": "源远流长的辉煌历史",
    "history flawless": "没有过失的历史",
    "history unimpeachable": "清清白白的过往",

    // pedigree
    "pedigree stellar": "血统高贵 / 顶尖的师承/门派",
    "pedigree spotless": "纯正的血统/出身",
    "pedigree abysmal": "寒门出身 / 极差的门第背景",
    "pedigree checkered": "复杂的门第传承",
    "pedigree mediocre": "出身平平",
    "pedigree illustrious": "名门之后 / 门第显赫",
    "pedigree flawless": "无可挑剔的出身",
    "pedigree unimpeachable": "血统纯正得毋庸置疑",

    // standing
    "standing stellar": "举足轻重的地位",
    "standing spotless": "清白的社会声望",
    "standing abysmal": "卑微的地位",
    "standing checkered": "动摇不定的地位",
    "standing mediocre": "人微言轻 / 普通的社会身份",
    "standing illustrious": "德高望重的地位",
    "standing flawless": "稳固且完美的声望",
    "standing unimpeachable": "泰斗级地位 / 绝对权威的身份",
  },
  phraseContent: {
    ...phraseContentIntensity,
  },
};

export const validPhraseSet = new Set(Object.keys(gameConfig.validPhraseZh));

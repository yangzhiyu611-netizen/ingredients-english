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
    "background",
    "pedigree",
    "standing",
    "stature",
    "trajectory",
  ],
  pairReplacementPool: [
    "checkered",
    "mediocre",
    "illustrious",
    "flawless",
    "unimpeachable",
  ],
  wordFocus: {
    stellar:
      "该词属于六级超高频词，你5天前刚新学过还未复习，建议再巩固一遍",
    spotless:
      "作为四级常考词，你12天前学过，目前正确率78%，建议在“斩”之前再巩固最后一遍。",
    abysmal:
      "属于六级难词，系统显示你从未学过此词，建议学习其高频词意“惨淡”的搭配用法",
    checkered:
      "六级难词以及高频易混词，你2天前刷过但还未学习过词单词，建议学习其常考词意“曲折的”的搭配用法",
    mediocre:
      "六级基础词汇，你20天前学过，遗忘曲线显示该词并未进入深度记忆区",
    illustrious:
      "六级难词，你10天前刚学过，正确率暂为60%，是趁热打铁的阶段",
    flawless:
      "六级高频词，你30天前学过，正确率为95%，本节将学习词意为”完美的“时的搭配用法",
    unimpeachable:
      "六级阅读高频词，目前状态为“未学过”，本节将学习其阅读高频释义”过硬的，无懈可击的“",

    record:
      "六级核心名词，再不同语境下有多个词意，你10天前复习过其”记录“的意思，本节将学习record作为”履历“的搭配用法",
    reputation:
      "六级必考词，你3天前学过，正确率为85%，本节将学习其作为”名声和口碑“的搭配用法",
    career:
      "六级基础词，15天前学过，正确率为90%，本节将学习其作为”事业、生涯“的搭配用法",
    performance:
      "四六级常用词，7天前学过，正确率82%，本节将学习其作为“业绩和表现”的词意",
    background:
      "四级常用词，8天前复习过其词意“背景”，本节将学习在阅读语境下作为”出身“的搭配用法",
    history:
      "六级入门词，25天前学过词意“历史”，正确率96%，本节将学习在阅读语境下作为”历程“的搭配用法",
    pedigree:
      "六级阅读高频词，当前状态为“未学过”，本节将学习阅读高频释义门第，血统“的搭配用法",
    standing:
      "六级易混词，已学过其形容词“永久的”，但未学习作为名词“地位，身份“的搭配用法，名词为阅读翻译高频词。",

    stature:
      "阅读高阶词汇，“未学过”，它是形容一个人地位与高度的终极表达。",
    trajectory: "阅读高阶词汇，3天前学过，正确率为 30%。",
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
    stature: "名望，声望",
    trajectory: "轨迹，走势",

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
    stature: "/ˈstætʃər/",
    trajectory: "/trəˈdʒektəri/",

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
    "pedigree spotless": "清白的门第",
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

    // stature
    "stature stellar": "顶尖的声望",
    "stature spotless": "清白的声望",
    "stature abysmal": "惨淡的声望",
    "stature checkered": "毁誉参半的声望",
    "stature mediocre": "平庸的声望",
    "stature illustrious": "显赫的声望",
    "stature flawless": "完美的名望",
    "stature unimpeachable": "无懈可击的声望",

    // trajectory
    "trajectory stellar": "一流的轨迹",
    "trajectory spotless": "清白的历程",
    "trajectory abysmal": "惨淡的走势",
    "trajectory checkered": "曲折的轨迹",
    "trajectory mediocre": "平庸的走势",
    "trajectory illustrious": "辉煌的历程",
    "trajectory flawless": "完美的轨迹",
    "trajectory unimpeachable": "无懈可击的历程",
  },
  phraseContent: {
    ...phraseContentIntensity,
  },
};

export const validPhraseSet = new Set(Object.keys(gameConfig.validPhraseZh));

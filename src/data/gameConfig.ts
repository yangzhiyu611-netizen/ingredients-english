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
  theme: "Social & Emotional：Pure/Absolute/Complete...搭配学习",
  level: "心理/关系语境",
  rules: {
    coreWordCount: 3,
    pairWordCount: 3,
    finalQuestionCount: 9,
    strictMatrixMode: true,
    useValidPhraseWhitelist: true,
  },
  initialSet: {
    coreWords: ["pure", "absolute", "complete"],
    pairWords: ["nonsense", "madness", "chaos"],
  },
  coreReplacementPool: ["total", "utter", "sheer", "downright", "outright"],
  pairReplacementPool: [
    "folly",
    "rubbish",
    "fabrication",
    "lunacy",
    "absurdity",
  ],
  wordFocus: {
    pure: "pure 表示“纯粹、没有掺杂的那种程度”：pure nonsense（纯粹是胡扯/一派胡言）",
    absolute:
      "absolute 强调“绝对到位、无可置疑的程度”：absolute madness（丧心病狂）",
    complete:
      "complete 表示“彻底、完全到结束”：complete chaos（翻天覆地的混乱）",
    total: "total 表示“全盘、全面都这样”：total rubbish（全是垃圾内容）",
    utter: "utter 带来更强的“极度/彻底”：utter lunacy（极其荒唐）",
    sheer: "sheer 表示“纯粹就是…”：sheer fabrication（纯系伪造）",
    downright: "downright 表示“简直就是、压根儿”：downright lunacy（明摆着是胡闹）",
    outright: "outright 表示“明目张胆、赤裸裸”：outright nonsense（明目张胆的胡说）",

    nonsense: "nonsense 指“胡言/废话/不着调的东西”。",
    madness: "madness 常用来表达“疯狂的状态/丧心病狂的程度”。",
    chaos: "chaos 指“混乱到失控”。",
    folly: "folly 表示“蠢事/愚行/犯浑”。",
    rubbish: "rubbish 是“垃圾/废话”。",
    fabrication: "fabrication 表示“捏造/伪造”。",
    lunacy: "lunacy 表示“荒唐/发疯/不正常”。",
    absurdity: "absurdity 表示“荒谬/不可理喻”。",
  },
  wordZh: {
    pure: "纯粹的",
    absolute: "绝对的",
    complete: "彻底的",
    total: "完全的",
    utter: "极度的",
    sheer: "纯粹的",
    downright: "简直就是",
    outright: "公然的",

    nonsense: "胡言",
    madness: "疯狂",
    chaos: "混乱",
    folly: "蠢事",
    rubbish: "废话/垃圾",
    fabrication: "捏造/伪造",
    lunacy: "荒唐",
    absurdity: "荒谬",
  },
  wordIpa: {
    // 可选 IPA：缺失也不影响学习逻辑
    pure: "/pjʊr/",
    absolute: "/ˈæbsəluːt/",
    complete: "/kəmˈpliːt/",
    total: "/ˈtoʊtəl/",
    utter: "/ˈʌtər/",
    sheer: "/ʃɪr/",
    downright: "/ˌdaʊnˈraɪt/",
    outright: "/ˌaʊtˈraɪt/",

    nonsense: "/ˈnɒnsens/",
    madness: "/ˈmædnəs/",
    chaos: "/ˈkeɪɒs/",
    folly: "/ˈfɒlə/",
    rubbish: "/ˈrʌbɪʃ/",
    fabrication: "/ˌfæbrɪˈkeɪʃən/",
    lunacy: "/ˈluːnəsi/",
    absurdity: "/əbˈsɜːdəti/",
  },
  validPhraseZh: {
    "pure nonsense": "一派胡言",
    "pure madness": "简直疯了",
    "pure chaos": "乱成一锅粥",
    "pure folly": "纯属犯浑",
    "pure rubbish": "全是废话",
    "pure fabrication": "子虚乌有",
    "pure lunacy": "荒唐透顶",
    "pure absurdity": "荒诞不经",

    "absolute nonsense": "满口胡言",
    "absolute madness": "丧心病狂",
    "absolute chaos": "乌烟瘴气",
    "absolute folly": "愚不可及",
    "absolute rubbish": "狗屁不通",
    "absolute fabrication": "凭空捏造",
    "absolute lunacy": "脑壳坏掉",
    "absolute absurdity": "简直不可理喻",

    "complete nonsense": "彻头彻尾的废话",
    "complete madness": "彻底的疯狂",
    "complete chaos": "翻天覆地的混乱",
    "complete folly": "十足的蠢事",
    "complete rubbish": "一堆垃圾话",
    "complete fabrication": "完全是瞎编",
    "complete lunacy": "彻底的神经质",
    "complete absurdity": "荒谬绝伦",

    "total nonsense": "全在胡说",
    "total madness": "整个儿疯掉了",
    "total chaos": "彻底乱了套",
    "total folly": "糊涂透顶",
    "total rubbish": "全是垃圾内容",
    "total fabrication": "全是编造出来的",
    "total lunacy": "十足的荒唐",
    "total absurdity": "完全不着调",

    "utter nonsense": "胡说八道",
    "utter madness": "极度疯狂",
    "utter chaos": "乱成马蜂窝",
    "utter folly": "犯了大糊涂",
    "utter rubbish": "一文不值",
    "utter fabrication": "纯属虚构",
    "utter lunacy": "极其荒唐",
    "utter absurdity": "滑天下之大稽",

    "sheer nonsense": "纯粹是胡扯",
    "sheer madness": "纯属疯狂",
    "sheer chaos": "纯粹的混乱",
    "sheer folly": "纯属愚蠢",
    "sheer rubbish": "纯粹是垃圾",
    "sheer fabrication": "纯系伪造",
    "sheer lunacy": "纯粹是发疯",
    "sheer absurdity": "纯粹的荒谬",

    "downright nonsense": "压根儿就是瞎说",
    "downright madness": "简直就是疯了",
    "downright chaos": "简直乱得离谱",
    "downright folly": "简直是缺心眼",
    "downright rubbish": "压根就是废品",
    "downright fabrication": "摆明了是捏造",
    "downright lunacy": "明摆着是胡闹",
    "downright absurdity": "简直岂有此理",

    "outright nonsense": "明目张胆的胡说",
    "outright madness": "赤裸裸的疯狂",
    "outright chaos": "彻底的崩溃混乱",
    "outright folly": "彻头彻尾的愚行",
    "outright rubbish": "十足的垃圾",
    "outright fabrication": "公然的伪造",
    "outright lunacy": "十足的荒谬行径",
    "outright absurdity": "彻彻底底的怪诞",
  },
  phraseContent: {
    ...phraseContentIntensity,
  },
};

export const validPhraseSet = new Set(Object.keys(gameConfig.validPhraseZh));

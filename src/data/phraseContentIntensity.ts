import type { PhraseContent } from "@/data/gameConfig";

const CORE_WORDS = [
  "pure",
  "absolute",
  "complete",
  "total",
  "utter",
  "sheer",
  "downright",
  "outright",
] as const;

const PAIR_WORDS = [
  "nonsense",
  "madness",
  "chaos",
  "folly",
  "rubbish",
  "fabrication",
  "lunacy",
  "absurdity",
] as const;

const PHRASE_ZH: Record<(typeof CORE_WORDS)[number] | (typeof PAIR_WORDS)[number], string> =
  {} as any;

// 64 组：Core + Pair -> 你的“地道中文意译”
const phraseZhByCore: Record<
  (typeof CORE_WORDS)[number],
  Record<(typeof PAIR_WORDS)[number], string>
> = {
  pure: {
    nonsense: "一派胡言",
    madness: "简直疯了",
    chaos: "乱成一锅粥",
    folly: "纯属犯浑",
    rubbish: "全是废话",
    fabrication: "子虚乌有",
    lunacy: "荒唐透顶",
    absurdity: "荒诞不经",
  },
  absolute: {
    nonsense: "满口胡言",
    madness: "丧心病狂",
    chaos: "乌烟瘴气",
    folly: "愚不可及",
    rubbish: "狗屁不通",
    fabrication: "凭空捏造",
    lunacy: "脑壳坏掉",
    absurdity: "简直不可理喻",
  },
  complete: {
    nonsense: "彻头彻尾的废话",
    madness: "彻底的疯狂",
    chaos: "彻底的混乱",
    folly: "完全是蠢事",
    rubbish: "完全是垃圾",
    fabrication: "完全是瞎编",
    lunacy: "完全是神经质",
    absurdity: "完全是荒谬绝伦",
  },
  total: {
    nonsense: "全在胡说",
    madness: "全疯掉了",
    chaos: "全乱了套",
    folly: "糊涂透顶",
    rubbish: "全是垃圾内容",
    fabrication: "全是编造出来的",
    lunacy: "全是的荒唐",
    absurdity: "完全不着调",
  },
  utter: {
    nonsense: "胡说八道",
    madness: "极度疯狂",
    chaos: "乱成马蜂窝",
    folly: "犯了大糊涂",
    rubbish: "一文不值",
    fabrication: "纯属虚构",
    lunacy: "极其荒唐",
    absurdity: "滑天下之大稽",
  },
  sheer: {
    nonsense: "纯粹是胡扯",
    madness: "纯属疯狂",
    chaos: "纯粹的混乱",
    folly: "纯属愚蠢",
    rubbish: "纯粹是垃圾",
    fabrication: "纯系伪造",
    lunacy: "纯粹是发疯",
    absurdity: "纯粹的荒谬",
  },
  downright: {
    nonsense: "彻头彻尾地瞎说",
    madness: "彻头彻尾的疯了",
    chaos: "彻头彻尾的离谱",
    folly: "彻头彻尾的缺心眼",
    rubbish: "彻头彻尾的废物",
    fabrication: "彻头彻尾的捏造",
    lunacy: "彻头彻尾地胡闹",
    absurdity: "彻头彻尾的荒谬",
  },
  outright: {
    nonsense: "明目张胆的胡说",
    madness: "赤裸裸的疯狂",
    chaos: "彻底的崩溃混乱",
    folly: "彻头彻尾的愚行",
    rubbish: "十足的垃圾",
    fabrication: "公然的伪造",
    lunacy: "十足的荒谬行径",
    absurdity: "彻彻底底的怪诞",
  },
};

const phraseExampleByCorePair: Record<
  (typeof CORE_WORDS)[number],
  Record<
    (typeof PAIR_WORDS)[number],
    {
      en: string;
      zh: string;
    }
  >
> = {
  pure: {
    nonsense: {
      en: "What he said about the moon landing is pure nonsense.",
      zh: "他关于登月的那些话简直是一派胡言。",
    },
    madness: {
      en: "Attempting to climb Everest without oxygen is pure madness.",
      zh: "不带氧气爬珠峰，这简直是疯了。",
    },
    chaos: {
      en: "The concert became pure chaos once the gates opened.",
      zh: "大门一开，音乐会现场瞬间乱成了一锅粥。",
    },
    folly: {
      en: "It would be pure folly to invest all your money in a single stock.",
      zh: "把钱全压在一只股票上，纯属犯浑。",
    },
    rubbish: {
      en: "I've read his latest novel; it's pure rubbish.",
      zh: "他那本新小说我读了，简直是满纸荒唐言。",
    },
    fabrication: {
      en: "The allegations against the CEO were pure fabrication.",
      zh: "针对首席执行官的指控完全是子虚乌有。",
    },
    lunacy: {
      en: "The new tax law is pure lunacy.",
      zh: "新税法简直是荒唐透顶。",
    },
    absurdity: {
      en: "The situation had reached a point of pure absurdity.",
      zh: "局面已经发展到了荒诞不经的地步。",
    },
  },
  absolute: {
    nonsense: {
      en: "That's absolute nonsense and you know it.",
      zh: "你心里清楚，那纯粹是满口胡言。",
    },
    madness: {
      en: "To drive in this blizzard would be absolute madness.",
      zh: "在暴风雪里开车，真是丧心病狂。",
    },
    chaos: {
      en: "The kitchen was in absolute chaos during the rush hour.",
      zh: "高峰时段，厨房里忙得乌烟瘴气。",
    },
    folly: {
      en: "It is absolute folly to ignore the doctor's advice.",
      zh: "不听医生的话，真是愚不可及。",
    },
    rubbish: {
      en: "His excuse for being late was absolute rubbish.",
      zh: "他迟到的理由简直是鬼话连篇。",
    },
    fabrication: {
      en: "The entire history of the incident was an absolute fabrication.",
      zh: "整件事的经过完全是凭空捏造。",
    },
    lunacy: {
      en: "Expecting different results from the same action is absolute lunacy.",
      zh: "指望墨守成规能出新结果，真是脑壳坏掉了。",
    },
    absurdity: {
      en: "I laughed at the absolute absurdity of his proposal.",
      zh: "对他那个方案的荒谬绝伦，我只能一笑了之。",
    },
  },
  complete: {
    nonsense: {
      en: "Everything they told us was complete nonsense.",
      zh: "他们告诉我们的一切全是彻头彻尾的废话。",
    },
    madness: {
      en: "The party was complete madness from start to finish.",
      zh: "这场派对从头到尾都闹得不可开交。",
    },
    chaos: {
      en: "The retreat ended in complete chaos.",
      zh: "那次撤退最后变成了溃不成军的混乱。",
    },
    folly: {
      en: "Relying on luck alone is complete folly.",
      zh: "只指望运气，那是十足的蠢事。",
    },
    rubbish: {
      en: "I'm tired of listening to this complete rubbish.",
      zh: "我听够了这堆没用的废话。",
    },
    fabrication: {
      en: "His alibi turned out to be a complete fabrication.",
      zh: "他的不在场证明结果证明是彻底瞎编的。",
    },
    lunacy: {
      en: "It's complete lunacy to go out in this heat.",
      zh: "大热天出去，简直是疯得彻底。",
    },
    absurdity: {
      en: "We were struck by the complete absurdity of the movie's plot.",
      zh: "电影剧情的荒诞离奇让我们目瞪口呆。",
    },
  },
  total: {
    nonsense: {
      en: "Stop talking total nonsense!",
      zh: "别在那儿瞎扯淡了！",
    },
    madness: {
      en: "The stadium was total madness after the goal.",
      zh: "进球后，体育场里全炸开了锅。",
    },
    chaos: {
      en: "Without a leader, the team fell into total chaos.",
      zh: "没了领头的，这队伍彻底乱了套。",
    },
    folly: {
      en: "Building a house on sand is total folly.",
      zh: "把房子盖在沙滩上，真是糊涂透顶。",
    },
    rubbish: {
      en: "The movie we saw last night was total rubbish.",
      zh: "昨晚看的电影真是烂透了。",
    },
    fabrication: {
      en: "The news report was a total fabrication.",
      zh: "那则新闻报道全是编出来的。",
    },
    lunacy: {
      en: "Selling the house now would be total lunacy.",
      zh: "现在卖房简直是十足的荒唐。",
    },
    absurdity: {
      en: "He couldn't help but point out the total absurdity of the rules.",
      zh: "他忍不住指出了那些规矩有多不着调。",
    },
  },
  utter: {
    nonsense: {
      en: "What an utter nonsense he's talking!",
      zh: "他说的简直是胡说八道！",
    },
    madness: {
      en: "The project was an exercise in utter madness.",
      zh: "这项目简直就是一场极度疯狂的冒险。",
    },
    chaos: {
      en: "The airport was in a state of utter chaos.",
      zh: "机场里乱成了一窝蜂。",
    },
    folly: {
      en: "It was utter folly to try and reason with him.",
      zh: "想跟他讲道理，真是犯了大糊涂。",
    },
    rubbish: {
      en: "These cheap tools are utter rubbish.",
      zh: "这些便宜货简直是一文不值。",
    },
    fabrication: {
      en: "Her story was an utter fabrication to win sympathy.",
      zh: "她那故事就是为了骗同情而纯属虚构的。",
    },
    lunacy: {
      en: "This plan is utter lunacy, believe me.",
      zh: "相信我，这计划极其荒唐。",
    },
    absurdity: {
      en: "The trial was an utter absurdity.",
      zh: "那场审判简直是滑天下之大稽。",
    },
  },
  sheer: {
    nonsense: {
      en: "This is sheer nonsense, nothing more.",
      zh: "这纯粹是瞎扯，没别的。",
    },
    madness: {
      en: "The schedule they proposed is sheer madness.",
      zh: "他们提的那个时间表纯属疯狂。",
    },
    chaos: {
      en: "Sheer chaos broke out when the fire alarm went off.",
      zh: "火警一响，场面纯粹失控了。",
    },
    folly: {
      en: "Spending your life savings on a gamble is sheer folly.",
      zh: "把养老钱拿去赌博，纯属犯傻。",
    },
    rubbish: {
      en: "I don't listen to that sheer rubbish on the radio.",
      zh: "我不听电台里那些没营养的垃圾话。",
    },
    fabrication: {
      en: "The documents were a sheer fabrication.",
      zh: "那些文件纯系伪造。",
    },
    lunacy: {
      en: "To suggest we skip the safety check is sheer lunacy.",
      zh: "建议跳过安全检查，纯粹是发疯。",
    },
    absurdity: {
      en: "I was laughing at the sheer absurdity of the situation.",
      zh: "我笑这情况怎么能荒谬成这样。",
    },
  },
  downright: {
    nonsense: {
      en: "Some of his ideas are downright nonsense.",
      zh: "他的一些想法压根儿就是瞎说。",
    },
    madness: {
      en: "The traffic in this city is downright madness.",
      zh: "这城市的交通简直就是疯了。",
    },
    chaos: {
      en: "The meeting was downright chaos.",
      zh: "那会议简直乱得离谱。",
    },
    folly: {
      en: "It would be downright folly to quit now.",
      zh: "现在辞职简直是缺心眼。",
    },
    rubbish: {
      en: "The food at that restaurant is downright rubbish.",
      zh: "那家餐馆的菜压根就是废品。",
    },
    fabrication: {
      en: "That claim is a downright fabrication.",
      zh: "那个说法摆明了是捏造。",
    },
    lunacy: {
      en: "This whole scheme is downright lunacy.",
      zh: "整个方案明摆着是胡闹。",
    },
    absurdity: {
      en: "The logic behind this is downright absurdity.",
      zh: "这背后的逻辑简直岂有此理。",
    },
  },
  outright: {
    nonsense: {
      en: "His response was outright nonsense.",
      zh: "他的回复是明目张胆的胡说。",
    },
    madness: {
      en: "The violence was outright madness.",
      zh: "这种暴力行径是赤裸裸的疯狂。",
    },
    chaos: {
      en: "The town fell into outright chaos after the storm.",
      zh: "暴风雨后，小镇陷入了彻底的瘫痪。",
    },
    folly: {
      en: "The decision was described as outright folly.",
      zh: "这个决定被形容为彻头彻尾的愚行。",
    },
    rubbish: {
      en: "Most of what's on TV is outright rubbish.",
      zh: "电视上大部分内容都是十足的垃圾。",
    },
    fabrication: {
      en: "The evidence was an outright fabrication.",
      zh: "证据完全是公然伪造。",
    },
    lunacy: {
      en: "Such a move would be outright lunacy.",
      zh: "这种举动简直是十足的荒谬。",
    },
    absurdity: {
      en: "The comedy relied on outright absurdity.",
      zh: "那部喜剧全靠彻彻底底的怪诞来博眼球。",
    },
  },
};

function buildPhraseContent(
  core: (typeof CORE_WORDS)[number],
  pair: (typeof PAIR_WORDS)[number],
): PhraseContent {
  const phraseZh = phraseZhByCore[core][pair];
  const example = phraseExampleByCorePair[core][pair];
  const phrase = `${core} ${pair}`;
  return {
    zh: phraseZh,
    clue: `做出一道表达：${phraseZh}`,
    example: example.en,
    exampleZh: example.zh,
    point: `语气是“强烈否定/夸张指责”：${phrase} = ${phraseZh}。`,
    mistakeAnalysis:
      "这类搭配通常不是在“客观描述”，而是在情绪上直接定性；别按日常字面理解。",
  };
}

export const phraseContentIntensity: Record<string, PhraseContent> = (() => {
  const out: Record<string, PhraseContent> = {};
  for (const core of CORE_WORDS) {
    for (const pair of PAIR_WORDS) {
      out[`${core} ${pair}`] = buildPhraseContent(core, pair);
    }
  }
  return out;
})();

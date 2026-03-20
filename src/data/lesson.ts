export type WordType = "core" | "pair";

export interface IngredientWord {
  word: string;
  type: WordType;
  focus: string;
  representativePhrase: string;
}

export interface Phrase {
  phrase: string;
  zh: string;
  clue: string;
  parts: string[];
  example: string;
  point: string;
  mistakeAnalysis: string;
}

export interface LessonData {
  theme: string;
  level: string;
  coreWords: IngredientWord[];
  pairWords: IngredientWord[];
  phrases: Phrase[];
}

export const lessonData: LessonData = {
  theme: "Social & Emotional Intelligence",
  level: "TOEFL",
  coreWords: [
    {
      word: "emotional",
      type: "core",
      focus:
        "本节将学习 emotional 不只是“情绪化的”，还常用来表示和情绪运作有关：emotional regulation",
      representativePhrase: "emotional regulation",
    },
    {
      word: "secure",
      type: "core",
      focus:
        "本节将学习 secure 在心理语境里不是“安全的”，而是“内心稳定、有安全感的”：secure attachment",
      representativePhrase: "secure attachment",
    },
    {
      word: "interpersonal",
      type: "core",
      focus:
        "本节将学习 interpersonal 不是“人际的”这么简单，而是专门用来讲人与人之间的互动关系：interpersonal trust",
      representativePhrase: "interpersonal trust",
    },
    {
      word: "fragile",
      type: "core",
      focus:
        "本节将学习 fragile 不只是“易碎的”，放进关系里也能表示“很脆弱、经不起拉扯”：fragile intimacy",
      representativePhrase: "fragile intimacy",
    },
    {
      word: "mutual",
      type: "core",
      focus:
        "本节将学习 mutual 的关键不是“彼此的”字面义，而是“双向发生、不是单方面付出”：mutual validation",
      representativePhrase: "mutual validation",
    },
    {
      word: "reciprocal",
      type: "core",
      focus:
        "本节将学习 reciprocal 比 mutual 更强调“有来有回、相互作用”：reciprocal connection",
      representativePhrase: "reciprocal connection",
    },
    {
      word: "relational",
      type: "core",
      focus:
        "本节将学习 relational 不是普通“有关联的”，而是“关系内部的、关系层面的”：relational resilience",
      representativePhrase: "relational resilience",
    },
    {
      word: "healthy",
      type: "core",
      focus:
        "本节将学习 healthy 不只是“健康的身体”，也常用来描述“健康的关系模式”：healthy boundaries",
      representativePhrase: "healthy boundaries",
    },
    {
      word: "anxious",
      type: "core",
      focus:
        "本节将学习 anxious 不只是“焦虑的”，还常用来描述关系里的不安和依赖：anxious attachment",
      representativePhrase: "anxious attachment",
    },
    {
      word: "psychological",
      type: "core",
      focus:
        "本节将学习 psychological 不只是“心理学的”，更常用来表达更深层的心理机制：psychological resilience",
      representativePhrase: "psychological resilience",
    },
    {
      word: "unstable",
      type: "core",
      focus:
        "本节将学习 unstable 放进关系语境里，不只是“不稳定”，还常暗示容易失衡、容易失控：unstable attachment",
      representativePhrase: "unstable attachment",
    },
    {
      word: "compassionate",
      type: "core",
      focus:
        "本节将学习 compassionate 不只是“有同情心”，而是“能温和接住别人情绪”：compassionate validation",
      representativePhrase: "compassionate validation",
    },
    {
      word: "authentic",
      type: "core",
      focus:
        "本节将学习 authentic 不只是“真的”，在社交表达里更像“真实、不端着”：authentic intimacy",
      representativePhrase: "authentic intimacy",
    },
    {
      word: "vulnerable",
      type: "core",
      focus:
        "本节将学习 vulnerable 不只是“脆弱的”，也常表示“愿意袒露真实自己”：vulnerable intimacy",
      representativePhrase: "vulnerable intimacy",
    },
    {
      word: "perceptive",
      type: "core",
      focus:
        "本节将学习 perceptive 不只是“有感知力的”，还常表示能敏锐看出他人状态：perceptive awareness",
      representativePhrase: "perceptive awareness",
    },
    {
      word: "grounded",
      type: "core",
      focus:
        "本节将学习 grounded 不是“在地上的”，而是“稳得住、很务实的”：grounded regulation",
      representativePhrase: "grounded regulation",
    },
  ],
  pairWords: [
    {
      word: "regulation",
      type: "pair",
      focus:
        "本节将学习心理学语境里 regulation 不是“规章制度”，而是“别上头”的能力：emotional regulation",
      representativePhrase: "emotional regulation",
    },
    {
      word: "validation",
      type: "pair",
      focus:
        "本节将学习 validation 不是“验证对错”，而是“认可你的感受是真的”：emotional validation",
      representativePhrase: "emotional validation",
    },
    {
      word: "resilience",
      type: "pair",
      focus:
        "本节将学习 resilience 不是简单“忍一忍”，而是“被打击后还能弹回来”：emotional resilience",
      representativePhrase: "emotional resilience",
    },
    {
      word: "attachment",
      type: "pair",
      focus:
        "本节将学习 attachment 不只是“附件”，在心理学里更重要的是“依恋关系”：secure attachment",
      representativePhrase: "secure attachment",
    },
    {
      word: "intimacy",
      type: "pair",
      focus:
        "本节将学习 intimacy 不只是“亲密”，而是“能真正靠近、能坦露自己”：mutual intimacy",
      representativePhrase: "mutual intimacy",
    },
    {
      word: "boundaries",
      type: "pair",
      focus:
        "本节将学习 boundaries 不是“边界线”而已，在关系里它就是大家常说的“边界感”：healthy boundaries",
      representativePhrase: "healthy boundaries",
    },
    {
      word: "connection",
      type: "pair",
      focus:
        "本节将学习 connection 不只是“连接”，在人际语境里常常就是“联结感”：emotional connection",
      representativePhrase: "emotional connection",
    },
    {
      word: "trust",
      type: "pair",
      focus:
        "本节将学习 trust 不只是“相信”，在关系里它更像“敢不敢把自己交出去一点”：interpersonal trust",
      representativePhrase: "interpersonal trust",
    },
    {
      word: "stability",
      type: "pair",
      focus:
        "本节将学习 stability 不只是“稳定”，还常用来表达情绪和关系里的“稳得住”：emotional stability",
      representativePhrase: "emotional stability",
    },
    {
      word: "awareness",
      type: "pair",
      focus:
        "本节将学习 awareness 不只是“知道”，而是“对自己和别人状态有觉察”：emotional awareness",
      representativePhrase: "emotional awareness",
    },
    {
      word: "reassurance",
      type: "pair",
      focus:
        "本节将学习 reassurance 不只是“安慰”，而是“让我重新安心下来”：emotional reassurance",
      representativePhrase: "emotional reassurance",
    },
    {
      word: "responsiveness",
      type: "pair",
      focus:
        "本节将学习 responsiveness 不只是“反应快”，而是“能及时接住对方的信号”：interpersonal responsiveness",
      representativePhrase: "interpersonal responsiveness",
    },
    {
      word: "sensitivity",
      type: "pair",
      focus:
        "本节将学习 sensitivity 不只是“敏感”，也可以是对情绪和关系变化的高感知力：emotional sensitivity",
      representativePhrase: "emotional sensitivity",
    },
    {
      word: "dependency",
      type: "pair",
      focus:
        "本节将学习 dependency 在关系里不是普通“依赖”，而更像“离不开、容易失衡的依附”：emotional dependency",
      representativePhrase: "emotional dependency",
    },
    {
      word: "self-worth",
      type: "pair",
      focus:
        "本节将学习 self-worth 不只是“自我价值”，而是“我值不值得被爱、被尊重”的底层感受：fragile self-worth",
      representativePhrase: "fragile self-worth",
    },
    {
      word: "detachment",
      type: "pair",
      focus:
        "本节将学习 detachment 不只是“分离”，还常表示一种有分寸、不被卷进去的抽离感：emotional detachment",
      representativePhrase: "emotional detachment",
    },
  ],
  phrases: [
    {
      phrase: "emotional regulation",
      zh: "情绪调节",
      clue: "做出一道表达：情绪调节",
      parts: ["emotional", "regulation"],
      example: "Good sleep is one of the simplest tools for emotional regulation.",
      point: "这里的 regulation 不是“规章制度”，而是调节和安顿情绪的能力。",
      mistakeAnalysis:
        "你可能把 regulation 按日常高频义理解成“规则管理”，但在心理学语境里，它常表示“调节”。",
    },
    {
      phrase: "emotional validation",
      zh: "情绪认可",
      clue: "做出一道表达：双向认可里的“情绪被看见”",
      parts: ["emotional", "validation"],
      example:
        "Sometimes you don't need advice, you just need emotional validation.",
      point: "validation 在这里是“情绪被承认、被看见”，不是“验证对错”。",
      mistakeAnalysis:
        "如果你把 validation 理解成“证明正确”，就抓不到它在情绪语境里的安抚功能。",
    },
    {
      phrase: "emotional resilience",
      zh: "情绪韧性",
      clue: "做出一道表达：被打击后还能弹回来",
      parts: ["emotional", "resilience"],
      example:
        "Therapy helped her build emotional resilience after a tough breakup.",
      point: "resilience 是“弹性、恢复力”，强调“被打击后还能回来”。",
      mistakeAnalysis:
        "如果只按“忍一忍”理解 resilience，就忽略了它的“恢复和成长”含义。",
    },
    {
      phrase: "secure attachment",
      zh: "安全型依恋",
      clue: "做出一道表达：有安全感的依恋关系",
      parts: ["secure", "attachment"],
      example:
        "Kids with secure attachment usually find it easier to trust people later in life.",
      point: "secure 在这里是“内心有安全感的”，而不是一般的“安全的”。",
      mistakeAnalysis:
        "如果只把 attachment 理解成“附件”，就会错过它在心理学里的核心义项。",
    },
    {
      phrase: "healthy boundaries",
      zh: "健康的边界感",
      clue: "做出一道表达：关系里的边界感",
      parts: ["healthy", "boundaries"],
      example:
        "Setting healthy boundaries is not selfish, it's a way to protect your energy.",
      point: "boundaries 在关系语境中，就是大家常说的“边界感”。",
      mistakeAnalysis:
        "如果只理解成物理“边界线”，就很难把它和情绪、关系联系起来。",
    },
    {
      phrase: "interpersonal trust",
      zh: "人际信任",
      clue: "做出一道表达：关系中的信任",
      parts: ["interpersonal", "trust"],
      example:
        "Repeated broken promises slowly destroy interpersonal trust in a relationship.",
      point: "interpersonal 是“人与人之间互动层面的”，而 trust 在这里是一种“敢不敢交出去自己”的感觉。",
      mistakeAnalysis:
        "如果只把 trust 当作一般的“相信事实正确”，就会弱化它在亲密关系里的情感重量。",
    },
    {
      phrase: "mutual intimacy",
      zh: "双向亲密",
      clue: "做出一道表达：双向靠近、双向袒露",
      parts: ["mutual", "intimacy"],
      example:
        "Mutual intimacy grows when both people feel safe to share their fears.",
      point: "mutual 强调双方都在投入，而 intimacy 不只是“关系亲近”，更是“愿意袒露自己”。",
      mistakeAnalysis:
        "如果只看 intimacy 的“亲密关系”表层含义，就很难捕捉到它的“脆弱袒露”色彩。",
    },
    {
      phrase: "reciprocal connection",
      zh: "双向互动的联结",
      clue: "做出一道表达：有来有回的联结感",
      parts: ["reciprocal", "connection"],
      example:
        "She is tired of one-sided texting and wants a more reciprocal connection.",
      point: "reciprocal 比 mutual 更强调“有来有回、你来我往”的互动感。",
      mistakeAnalysis:
        "如果只按“互相的”理解 reciprocal，很容易忽略它的“动态互动”意味。",
    },
    {
      phrase: "relational resilience",
      zh: "关系韧性",
      clue: "做出一道表达：吵架后还能修复的关系",
      parts: ["relational", "resilience"],
      example:
        "Healthy conflict can actually build relational resilience over time.",
      point: "relational 指“关系层面的”，resilience 则是“被拉扯后还能弹回来”的能力。",
      mistakeAnalysis:
        "如果只关注个人层面的 resilience，就会忽略“关系本身也可以有韧性”。",
    },
  ],
};


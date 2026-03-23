import type { PhraseContent } from "@/data/gameConfig";

const CORE_WORDS = [
  "record",
  "reputation",
  "career",
  "performance",
  "background",
  "history",
  "pedigree",
  "standing",
] as const;

const PAIR_WORDS = [
  "stellar",
  "spotless",
  "abysmal",
  "checkered",
  "mediocre",
  "illustrious",
  "flawless",
  "unimpeachable",
] as const;

const PHRASE_DATA: Record<
  string,
  {
    zh: string;
    en: string;
    exampleZh: string;
  }
> = {
  "stellar reputation": {
    zh: "顶级的口碑",
    en: "The tech giant has built a stellar reputation for innovation and user privacy.",
    exampleZh: "这家科技巨头在创新和用户隐私方面建立了顶级的口碑。",
  },
  "spotless reputation": {
    zh: "清白的名声",
    en: "After thirty years in public office, she retired with a spotless reputation.",
    exampleZh: "在公共部门任职三十年后，她带着清白的名声退休了。",
  },
  "abysmal reputation": {
    zh: "惨淡的口碑",
    en: "That airline has an abysmal reputation for losing luggage and constant delays.",
    exampleZh: "那家航空公司在丢行李和频繁延误方面有着惨淡的口碑。",
  },
  "checkered reputation": {
    zh: "波折的名声",
    en: "The investor has a checkered reputation due to his involvement in several failed startups.",
    exampleZh: "由于参与过几家倒闭的初创公司，这位投资人在业内有着波折的名声。",
  },
  "mediocre reputation": {
    zh: "平庸的口碑",
    en: "The restaurant has a mediocre reputation, being neither terrible nor particularly impressive.",
    exampleZh: "这家餐厅有着平庸的口碑，既不糟糕，但也并不出众。",
  },
  "illustrious reputation": {
    zh: "显赫的名声",
    en: "As a Nobel laureate, he carries an illustrious reputation in the scientific community.",
    exampleZh: "作为诺贝尔奖得主，他在科学界拥有显赫的名声。",
  },
  "flawless reputation": {
    zh: "完美的名声",
    en: "The boutique firm is known for its flawless reputation for delivering high-end results.",
    exampleZh: "这家精品事务所因其交付高端成果而拥有的完美的名声而闻名。",
  },
  "unimpeachable reputation": {
    zh: "过硬的口碑",
    en: "Her unimpeachable reputation for honesty makes her the ideal candidate for treasurer.",
    exampleZh: "她那诚实过硬的口碑使她成为财务主管的理想人选。",
  },

  "stellar record": {
    zh: "一流的履历",
    en: "He was hired immediately because of his stellar record in sales management.",
    exampleZh: "他被立即聘用是因为他在销售管理方面拥有一流的履历。",
  },
  "spotless record": {
    zh: "清白的记录",
    en: "To join the police force, you must have a spotless record with no criminal history.",
    exampleZh: "加入警队，你必须拥有没有任何犯罪史的清白的记录。",
  },
  "abysmal record": {
    zh: "惨淡的记录",
    en: "The team’s abysmal record this season has led to the coach being fired.",
    exampleZh: "该队本赛季惨淡的记录导致了教练被解雇。",
  },
  "checkered record": {
    zh: "曲折的记录",
    en: "The city has a checkered record of completing public infrastructure projects on time.",
    exampleZh: "这座城市在按时完成公共基础设施项目方面有着曲折的记录。",
  },
  "mediocre record": {
    zh: "平庸的履历",
    en: "A mediocre record at university might make it harder to get into top law schools.",
    exampleZh: "大学时期平庸的履历可能会让你更难进入顶尖的法学院。",
  },
  "illustrious record": {
    zh: "辉煌的履历",
    en: "The general retired after forty years of service and an illustrious record.",
    exampleZh: "这位将军在服役四十年并拥有辉煌的履历后退休了。",
  },
  "flawless record": {
    zh: "完美的履历",
    en: "The surgeon has a flawless record, having never lost a patient on the operating table.",
    exampleZh: "这位外科医生有着完美的履历，从未在手术台上失去过一位病人。",
  },
  "unimpeachable record": {
    zh: "过硬的履历",
    en: "We need a CEO with an unimpeachable record of ethical leadership.",
    exampleZh: "我们需要一位在伦理领导力方面拥有过硬履历的首席执行官。",
  },

  "stellar career": {
    zh: "一流的事业",
    en: "After a stellar career in Hollywood, she decided to move into directing.",
    exampleZh: "在好莱坞拥有了一流的事业后，她决定转向导演行业。",
  },
  "spotless career": {
    zh: "清白的事业",
    en: "Despite the surrounding scandals, he maintained a spotless career in finance.",
    exampleZh: "尽管周围丑闻不断，他仍在金融界维持了清白的事业。",
  },
  "abysmal career": {
    zh: "惨淡的事业",
    en: "His abysmal career as a professional gambler left him in deep debt.",
    exampleZh: "他那作为职业赌徒的惨淡事业让他深陷债务。",
  },
  "checkered career": {
    zh: "曲折的事业",
    en: "He had a checkered career, moving between high-profile jobs and periods of unemployment.",
    exampleZh: "他有着曲折的事业，在高薪职位和失业期之间不断更迭。",
  },
  "mediocre career": {
    zh: "平庸的事业",
    en: "He spent most of his mediocre career in middle management, never reaching the top.",
    exampleZh: "他在平庸的事业中度过了大部分时光，止步于中层管理，从未登顶。",
  },
  "illustrious career": {
    zh: "辉煌的事业",
    en: "The professor was honored at the gala for her illustrious career in cancer research.",
    exampleZh: "这位教授因其在癌症研究领域的辉煌事业而在晚会上受到表彰。",
  },
  "flawless career": {
    zh: "完美的生涯",
    en: "To many young athletes, his flawless career represents the ultimate goal.",
    exampleZh: "对许多年轻运动员来说，他那完美的生涯代表了终极目标。",
  },
  "unimpeachable career": {
    zh: "过硬的事业",
    en: "Hard work and transparency have been the hallmarks of his unimpeachable career.",
    exampleZh: "努力和透明一直是他那过硬事业的标志。",
  },

  "stellar performance": {
    zh: "一流的表现",
    en: "The stock price surged following the company’s stellar performance last quarter.",
    exampleZh: "公司上季度展现了一流的表现后，股价随之飙升。",
  },
  "spotless performance": {
    zh: "无可挑剔的表现",
    en: "The pianist gave a spotless performance, hitting every note with perfect precision.",
    exampleZh: "钢琴家带来了无可挑剔的表现，精准地弹奏出了每一个音符。",
  },
  "abysmal performance": {
    zh: "惨淡的表现",
    en: "Shareholders were outraged by the company's abysmal performance during the recession.",
    exampleZh: "股东们对公司在经济衰退期间惨淡的表现感到愤怒。",
  },
  "checkered performance": {
    zh: "曲折的表现",
    en: "The new software has shown a checkered performance, working well some days and crashing on others.",
    exampleZh: "这款新软件表现出了曲折的表现，有时运行良好，有时又会崩溃。",
  },
  "mediocre performance": {
    zh: "平庸的表现",
    en: "The athlete was disappointed with his mediocre performance at the qualifying event.",
    exampleZh: "运动员对他自己在预选赛中平庸的表现感到失望。",
  },
  "illustrious performance": {
    zh: "辉煌的表现",
    en: "It was an illustrious performance that secured his place in the Hall of Fame.",
    exampleZh: "正是这次辉煌的表现确保了他在名人堂中的地位。",
  },
  "flawless performance": {
    zh: "完美的表现",
    en: "The figure skater received a perfect score for her flawless performance.",
    exampleZh: "这位花样滑冰选手因其完美的表现获得了满分。",
  },
  "unimpeachable performance": {
    zh: "无懈可击的表现",
    en: "The audit confirmed that the fund manager had delivered an unimpeachable performance.",
    exampleZh: "审计确认基金经理交出了无懈可击的表现。",
  },

  "stellar background": {
    zh: "顶级的出身",
    en: "With a stellar background in Ivy League education, he had his pick of job offers.",
    exampleZh: "凭借常春藤盟校教育的顶级的出身，他可以任意挑选职位。",
  },
  "spotless background": {
    zh: "清白的出身",
    en: "All candidates for the high-security role must have a spotless background.",
    exampleZh: "所有应聘这一高安全级别职位的人员都必须拥有清白的出身。",
  },
  "abysmal background": {
    zh: "惨淡的出身",
    en: "Rising from an abysmal background of poverty, he eventually became a billionaire.",
    exampleZh: "他从贫困惨淡的出身中崛起，最终成为了亿万富翁。",
  },
  "checkered background": {
    zh: "曲折的出身",
    en: "The applicant's checkered background raised some red flags during the interview.",
    exampleZh: "申请人那曲折的出身背景在面试中引起了一些疑虑。",
  },
  "mediocre background": {
    zh: "平庸的出身",
    en: "Despite his mediocre background, he achieved success through sheer determination.",
    exampleZh: "尽管他平庸的出身，他还是凭借顽强的意志取得了成功。",
  },
  "illustrious background": {
    zh: "显赫的背景",
    en: "She comes from an illustrious background of diplomats and high-ranking officials.",
    exampleZh: "她拥有外交官和高级官员组成的显赫的背景。",
  },
  "flawless background": {
    zh: "完美的出身",
    en: "His flawless background made him the easy choice for the prestigious award.",
    exampleZh: "他那完美的出身使他轻松获得了这一重要奖项。",
  },
  "unimpeachable background": {
    zh: "过硬的背景",
    en: "The committee verified his unimpeachable background before appointing him as chairman.",
    exampleZh: "委员会在任命他为主席之前核实了他那过硬的背景。",
  },

  "stellar history": {
    zh: "一流的历程",
    en: "The brand has a stellar history of producing the world’s most reliable engines.",
    exampleZh: "该品牌在生产世界上最可靠的发动机方面有着一流的历程。",
  },
  "spotless history": {
    zh: "清白的历程",
    en: "Our organization is proud of its spotless history of financial transparency.",
    exampleZh: "我们的机构为其在财务透明度方面清白的历程感到自豪。",
  },
  "abysmal history": {
    zh: "惨淡的历程",
    en: "The region has an abysmal history of human rights violations.",
    exampleZh: "该地区在侵犯人权方面有着一段惨淡的历程。",
  },
  "checkered history": {
    zh: "驳杂的历程",
    en: "The historic hotel has a checkered history, having survived fires, bankruptcies, and wars.",
    exampleZh: "这家历史悠久的酒店有着驳杂的历程，在火灾、破产和战争中幸存了下来。",
  },
  "mediocre history": {
    zh: "平庸的历程",
    en: "For decades, the department had a mediocre history until the new director took over.",
    exampleZh: "在新主管接手之前，这个部门几十年来一直只有一段平庸的历程。",
  },
  "illustrious history": {
    zh: "辉煌的历程",
    en: "Students are inspired by the university's illustrious history of academic excellence.",
    exampleZh: "学生们被这所大学学术卓越的辉煌历程所激励。",
  },
  "flawless history": {
    zh: "完美的历程",
    en: "The safety system has a flawless history, with zero accidents in fifty years.",
    exampleZh: "该安全系统有着完美的历程，五十年来零事故。",
  },
  "unimpeachable history": {
    zh: "无懈可击的历程",
    en: "He was praised for his unimpeachable history of honest public service.",
    exampleZh: "他因其诚实的公共服务这一无懈可击的历程而受到赞扬。",
  },

  "stellar pedigree": {
    zh: "顶级的门第",
    en: "The racing horse has a stellar pedigree, sired by a legendary champion.",
    exampleZh: "这匹赛马有着顶级的门第（血统），是一头传奇冠军的后代。",
  },
  "spotless pedigree": {
    zh: "清白的门扉",
    en: "The aristocratic family took great pride in their spotless pedigree.",
    exampleZh: "这个贵族家庭对他们那清白的门扉深感自豪。",
  },
  "abysmal pedigree": {
    zh: "糟透的门第",
    en: "Investors stayed away from the project due to its abysmal pedigree of failed leadership.",
    exampleZh: "由于该项目在领导层失败方面那糟透的门第（渊源），投资者们望而却步。",
  },
  "checkered pedigree": {
    zh: "曲折的出身",
    en: "This art piece has a checkered pedigree, having been stolen and recovered twice.",
    exampleZh: "这件艺术品有着曲折的出身（流转记录），曾两次被盗又被追回。",
  },
  "mediocre pedigree": {
    zh: "平庸的出身",
    en: "It was a budget smartphone with a mediocre pedigree, designed for basic tasks.",
    exampleZh: "这是一部平庸出身的廉价智能手机，专为基本任务设计。",
  },
  "illustrious pedigree": {
    zh: "显赫的门第",
    en: "He felt the pressure of his illustrious pedigree as the son of two world-renowned surgeons.",
    exampleZh: "作为两位世界知名外科医生的儿子，他感受到了来自自己显赫门第的压力。",
  },
  "flawless pedigree": {
    zh: "完美的出身",
    en: "This vintage wine has a flawless pedigree, tracked from the vineyard to the cellar.",
    exampleZh: "这款陈年佳酿有着完美的出身（来源记录），从葡萄园到酒窖都有迹可循。",
  },
  "unimpeachable pedigree": {
    zh: "过硬的出身",
    en: "The scholar’s unimpeachable pedigree was established under the tutelage of grandmasters.",
    exampleZh: "这位学者在多位大师的指导下建立了其过硬的出身（师承）。",
  },

  "stellar standing": {
    zh: "顶级的地位",
    en: "Her stellar standing in the legal world makes her a sought-after consultant.",
    exampleZh: "她在法律界顶级的地位使她成为炙手可热的顾问。",
  },
  "spotless standing": {
    zh: "清白的身份",
    en: "Membership in the club is reserved for those with a spotless standing in the community.",
    exampleZh: "俱乐部的会员资格仅保留给那些在社区中拥有清白身份的人。",
  },
  "abysmal standing": {
    zh: "曲折的身份",
    en: "Following the corruption scandal, his abysmal standing made a political comeback impossible.",
    exampleZh: "在贪腐丑闻之后，他那曲折的身份（糟糕的处境）使政治复出变得不可能。",
  },
  "checkered standing": {
    zh: "驳杂的地位",
    en: "The journalist had a checkered standing, being loved by some readers and hated by others.",
    exampleZh: "这位记者有着驳杂的地位，被一些读者喜爱，却被另一些人痛恨。",
  },
  "mediocre standing": {
    zh: "平庸的身份",
    en: "He was frustrated by his mediocre standing within the company’s hierarchy.",
    exampleZh: "他对他自己在公司层级中平庸的身份（地位）感到沮丧。",
  },
  "illustrious standing": {
    zh: "显赫的地位",
    en: "The honorary degree was a reflection of his illustrious standing as a global statesman.",
    exampleZh: "荣誉学位反映了他作为全球政治家所拥有的显赫地位。",
  },
  "flawless standing": {
    zh: "完美的身份",
    en: "Her flawless standing in the industry was built on years of reliable results.",
    exampleZh: "她在行业中完美的身份是建立在多年可靠成果的基础之上的。",
  },
  "unimpeachable standing": {
    zh: "无懈可击的地位",
    en: "As a man of unimpeachable standing, his testimony carried great weight in court.",
    exampleZh: "作为一个地位无懈可击的人，他的证词在法庭上极具分量。",
  },
};

function buildPhraseContent(
  core: (typeof CORE_WORDS)[number],
  pair: (typeof PAIR_WORDS)[number],
): PhraseContent {
  const displayPhrase = `${pair} ${core}`;
  const data = PHRASE_DATA[displayPhrase];
  const phraseZh = data?.zh ?? "（占位）";
  const phrase = `${core} ${pair}`;
  return {
    zh: phraseZh,
    clue: `做出一道表达：${phraseZh}`,
    example: data?.en ?? `Example for ${displayPhrase}.`,
    exampleZh: data?.exampleZh ?? "（暂无中文例句）",
    point: `${displayPhrase}：${phraseZh}`,
    mistakeAnalysis:
      "先确认你是否按固定搭配顺序作答（pair + core），再核对对应语义。",
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

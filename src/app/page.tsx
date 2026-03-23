/* eslint-disable @next/next/no-img-element */
"use client";

import { useMemo, useRef, useState } from "react";
import { gameConfig, validPhraseSet } from "@/data/gameConfig";

type Step = "preview" | "learn" | "review" | "feedback" | "summary";

type Phase = "learning" | "review";

type ActiveWikiState =
  | { type: "phrase"; index: number; isCorrect: boolean }
  | { type: "corePick"; core: string; isCorrect: boolean }
  | { type: "pairPick"; pair: string; isCorrect: boolean };

type LearningQuestion = {
  phrase: string;
  parts: string[];
  zh: string;
  clue: string;
  example: string;
  exampleZh: string;
  point: string;
  mistakeAnalysis: string;
};

type SequenceItem =
  | { type: "phrase"; phraseIndex: number }
  | { type: "corePick"; targetCore: string }
  | { type: "pairPick"; targetPair: string };

const CORE_COUNT = gameConfig.rules.coreWordCount;
const PAIR_COUNT = gameConfig.rules.pairWordCount;

const initialCore = gameConfig.initialSet.coreWords;
const initialPair = gameConfig.initialSet.pairWords;
const corePool = gameConfig.coreReplacementPool;
const pairPool = gameConfig.pairReplacementPool;

export default function Home() {
  const [step, setStep] = useState<Step>("preview");
  const [phase, setPhase] = useState<Phase>("learning");
  const [coreWords, setCoreWords] = useState<string[]>(initialCore);
  const [pairWords, setPairWords] = useState<string[]>(initialPair);
  const [skippedCore, setSkippedCore] = useState<string[]>([]);
  const [skippedPair, setSkippedPair] = useState<string[]>([]);
  const [activeFocusWord, setActiveFocusWord] = useState<string | null>(null);

  const [sequenceIndex, setSequenceIndex] = useState(0);
  const [phraseProgress, setPhraseProgress] = useState(0);
  const [plate, setPlate] = useState<string[]>([]);
  const [usedIngredients, setUsedIngredients] = useState<string[]>([]);
  const [activeWikiState, setActiveWikiState] =
    useState<ActiveWikiState | null>(null);
  const [showTrimConfirm, setShowTrimConfirm] = useState(false);
  const [learningPhrases, setLearningPhrases] = useState<LearningQuestion[]>([]);
  const [learningWordOrder, setLearningWordOrder] = useState<string[]>([]);
  const [learningSequence, setLearningSequence] = useState<SequenceItem[]>([]);
  const [corePickWrong, setCorePickWrong] = useState(false);
  const [wrongPhraseIndices, setWrongPhraseIndices] = useState<number[]>([]);
  const [revealResult, setRevealResult] = useState(false);
  const [lastCheckCorrect, setLastCheckCorrect] = useState<boolean | null>(null);
  const [lastAttemptWords, setLastAttemptWords] = useState<string[]>([]);
  const [cutPhraseIndices, setCutPhraseIndices] = useState<number[]>([]);
  const [cutCoreWords, setCutCoreWords] = useState<string[]>([]);

  const phraseContent = useMemo(() => gameConfig.phraseContent, []);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const speakPhrase = (text: string) => {
    if (typeof window === "undefined") return;
    const synth = window.speechSynthesis;
    if (!synth) return;
    synth.cancel();

    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-US";
    utter.rate = 0.95;
    utter.pitch = 1;
    synth.speak(utter);
  };

  const playFeedbackSound = (kind: "correct" | "wrong") => {
    if (typeof window === "undefined") return;
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!AudioCtx) return;

    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioCtx();
    }
    const ctx = audioCtxRef.current;
    // 某些浏览器需要用户手势后 resume；这里本来就在 click 内调用
    if (ctx.state === "suspended") {
      ctx.resume().catch(() => {});
    }
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;
    gain.gain.setValueAtTime(0.0001, now);

    if (kind === "correct") {
      // 更明显的“闪烁”成功音：两段短 beep，音高上扬
      osc.type = "sine";
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.setValueAtTime(1320, now + 0.10);

      // beep 1
      gain.gain.exponentialRampToValueAtTime(0.38, now + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);

      // beep 2（稍高音）
      osc.frequency.setValueAtTime(1320, now + 0.11);
      osc.frequency.setValueAtTime(1760, now + 0.18);
      gain.gain.exponentialRampToValueAtTime(0.40, now + 0.12);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);

      osc.start(now);
      osc.stop(now + 0.23);
      return;
    }

    // 错误音：短促下滑
    osc.type = "square";
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(120, now + 0.18);
    gain.gain.exponentialRampToValueAtTime(0.28, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);
    osc.start(now);
    osc.stop(now + 0.23);
  };

  const renderExampleWithBoldPhrase = (example: string, phrase: string) => {
    const normalize = (s: string) => s.trim().replace(/\s+/g, " ");
    const p = normalize(phrase);
    const variants = [
      p,
      // 例句里常省略冠词：El/La/Los/Las
      p.replace(/^(El|La|Los|Las)\s+/i, ""),
    ].filter((v, i, arr) => v && arr.indexOf(v) === i);

    const lower = example.toLowerCase();
    const hit = variants
      .map((v) => ({ v, idx: lower.indexOf(v.toLowerCase()) }))
      .find((x) => x.idx >= 0);

    if (!hit) return example;
    const idx = hit.idx;
    const before = example.slice(0, idx);
    const match = example.slice(idx, idx + hit.v.length);
    const after = example.slice(idx + hit.v.length);
    return (
      <>
        {before}
        <strong className="font-semibold text-rose-600">{match}</strong>
        {after}
      </>
    );
  };

  const availableCorePool = useMemo(
    () => corePool.filter((w) => !coreWords.includes(w)),
    [coreWords],
  );
  const availablePairPool = useMemo(
    () => pairPool.filter((w) => !pairWords.includes(w)),
    [pairWords],
  );

  const currentItem = learningSequence[sequenceIndex];
  const currentPhrase =
    currentItem?.type === "phrase"
      ? learningPhrases[currentItem.phraseIndex]
      : undefined;

  const handleToggleSkip = (type: "core" | "pair", word: string) => {
    if (type === "core") {
      const nextSkippedCore = skippedCore.includes(word)
        ? skippedCore.filter((w) => w !== word)
        : [...skippedCore, word];
      setSkippedCore(nextSkippedCore);
    } else {
      const nextSkippedPair = skippedPair.includes(word)
        ? skippedPair.filter((w) => w !== word)
        : [...skippedPair, word];
      setSkippedPair(nextSkippedPair);
    }
    // 先只是“标记要斩掉的词”，真正移除/补齐在 Confirm 时进行
    setActiveFocusWord(word);
  };

  const isValidPhrase = (core: string, pair: string) =>
    validPhraseSet.has(`${core} ${pair}`);

  const computeSkipAndRefillWith = (
    nextSkippedCore: string[],
    nextSkippedPair: string[],
  ) => {
    const remainingCore = coreWords
      .slice(0, CORE_COUNT)
      .filter((w) => !nextSkippedCore.includes(w));
    const remainingPair = pairWords
      .slice(0, PAIR_COUNT)
      .filter((w) => !nextSkippedPair.includes(w));

    let nextCore = [...remainingCore];
    let nextPair = [...remainingPair];

    // 使用局部候选池副本，避免 while 中 splice 修改 useMemo 结果
    const coreCandidates = [...availableCorePool];
    const pairCandidates = [...availablePairPool];

    // 先补 core：候选 core 必须能与当前剩余全部 pairWords 形成合法词组
    while (nextCore.length < CORE_COUNT) {
      const cand = coreCandidates.find(
        (w) => !nextCore.includes(w) && !nextSkippedCore.includes(w),
      );
      if (!cand) break;
      const ok = nextPair.every((p) => isValidPhrase(cand, p));
      if (ok) nextCore.push(cand);
      else {
        // 若不满足严格矩阵，跳过该候选，继续找下一个
        const idx = coreCandidates.indexOf(cand);
        if (idx >= 0) coreCandidates.splice(idx, 1);
      }
    }

    // 再补 pair：候选 pair 必须能与当前剩余全部 coreWords 形成合法词组
    while (nextPair.length < PAIR_COUNT) {
      const cand = pairCandidates.find(
        (w) => !nextPair.includes(w) && !nextSkippedPair.includes(w),
      );
      if (!cand) break;
      const ok = nextCore.every((c) => isValidPhrase(c, cand));
      if (ok) nextPair.push(cand);
      else {
        const idx = pairCandidates.indexOf(cand);
        if (idx >= 0) pairCandidates.splice(idx, 1);
      }
    }

    return { nextCore, nextPair };
  };

  const applySkipAndRefill = () => {
    const { nextCore, nextPair } = computeSkipAndRefillWith(
      skippedCore,
      skippedPair,
    );
    setCoreWords(nextCore);
    setPairWords(nextPair);
    return { nextCore, nextPair };
  };

  const computeFinalQuestions = (finalCore: string[], finalPair: string[]) => {
    const c = finalCore.slice(0, CORE_COUNT);
    const p = finalPair.slice(0, PAIR_COUNT);
    const order: Array<[number, number]> = [
      [0, 0],
      [0, 1],
      [0, 2],
      [1, 2],
      [1, 1],
      [1, 0],
      [2, 1],
      [2, 0],
      [2, 2],
    ];

    const questions = order
      .map(([ci, pi]) => {
        const core = c[ci];
        const pair = p[pi];
        if (!core || !pair) return null;
        const configKey = `${core} ${pair}`;
        if (
          gameConfig.rules.useValidPhraseWhitelist &&
          !validPhraseSet.has(configKey)
        )
          return null;

        // 展示与判题顺序采用 pair + core（如 stellar record）
        const phrase = `${pair} ${core}`;
        const content =
          phraseContent[configKey] ??
          phraseContent[phrase];
        const zh =
          content?.zh ??
          gameConfig.validPhraseZh[configKey] ??
          gameConfig.validPhraseZh[phrase] ??
          "（占位）";
        return {
          phrase,
          parts: [pair, core],
          zh,
          clue: content?.clue ?? `做出一道表达：${zh}`,
          example:
            content?.example ??
            `Try using "${phrase}" in a social or emotional context.`,
          exampleZh: content?.exampleZh ?? "（暂无中文例句）",
          point:
            content?.point ??
            "该词组在心理/关系语境中很常见，先抓住它的整体感觉与搭配习惯。",
          mistakeAnalysis:
            content?.mistakeAnalysis ??
            "先确认你是否把某个词按日常义理解了；在心理语境里它常常是另一层抽象义。",
        } satisfies LearningQuestion;
      })
      .filter((q): q is LearningQuestion => q !== null);

    return questions;
  };

  const buildLearningSequence = (
    questions: LearningQuestion[],
    finalCore: string[],
  ) => {
    // 固定：每个 core 对应 3 道 phrase（按你的顺序生成的 9 道题）
    // 调整为：先 corePick，再学该 core 下的 3 道 phrase。
    const seq: SequenceItem[] = [];
    const groupSize = 3;
    for (let coreIdx = 0; coreIdx < finalCore.length; coreIdx++) {
      const core = finalCore[coreIdx];
      if (core) {
        seq.push({ type: "corePick", targetCore: core });
      }
      const start = coreIdx * groupSize;
      const end = start + groupSize;
      for (let i = start; i < end && i < questions.length; i++) {
        seq.push({ type: "phrase", phraseIndex: i });
      }
    }
    return seq;
  };

  const startLearning = () => {
    setPhase("learning");
    const { nextCore, nextPair } = applySkipAndRefill();
    const finalQuestions = computeFinalQuestions(nextCore, nextPair);
    setLearningPhrases(finalQuestions);
    setLearningWordOrder([...nextCore, ...nextPair]);
    setLearningSequence(buildLearningSequence(finalQuestions, nextCore));
    setStep("learn");
    setPlate([]);
    setUsedIngredients([]);
    setSequenceIndex(0);
    setPhraseProgress(0);
    setActiveWikiState(null);
    setCorePickWrong(false);
    setWrongPhraseIndices([]);
    setRevealResult(false);
    setLastCheckCorrect(null);
    setLastAttemptWords([]);
    setCutPhraseIndices([]);
    setCutCoreWords([]);
  };

  const startReview = (opts?: {
    cutPhraseIndices?: number[];
    cutCoreWords?: string[];
  }) => {
    setPhase("review");

    const cutPhraseSet = new Set<number>(opts?.cutPhraseIndices ?? cutPhraseIndices);
    const cutCoreSet = new Set<string>(opts?.cutCoreWords ?? cutCoreWords);

    // 复习题型只包含“未被斩掉”的词组
    const allowedIndices: number[] = [];
    for (let i = 0; i < learningPhrases.length; i++) {
      const q = learningPhrases[i];
      if (!q) continue;
      if (cutPhraseSet.has(i)) continue;
      if (cutCoreSet.has(q.parts[0])) continue;
      allowedIndices.push(i);
    }

    const shuffle = (arr: number[]) => {
      const a = [...arr];
      for (let j = a.length - 1; j > 0; j--) {
        const k = Math.floor(Math.random() * (j + 1));
        [a[j], a[k]] = [a[k], a[j]];
      }
      return a;
    };

    // 复习阶段：先考一遍 pair，再随机考词组
    const reviewPairWords = pairWords.slice(0, PAIR_COUNT);
    const pairPickSequence: SequenceItem[] = reviewPairWords.map((pair) => ({
      type: "pairPick",
      targetPair: pair,
    }));

    const randomPhraseOrder = shuffle(allowedIndices);
    const phraseSequence: SequenceItem[] = randomPhraseOrder.map((phraseIndex) => ({
      type: "phrase",
      phraseIndex,
    }));

    const reviewSequence: SequenceItem[] = [...pairPickSequence, ...phraseSequence];

    setLearningSequence(reviewSequence);
    setSequenceIndex(0);
    setPhraseProgress(0);
    setActiveWikiState(null);
    setPlate([]);
    setUsedIngredients([]);
    setCorePickWrong(false);
    setRevealResult(false);
    setLastCheckCorrect(null);
    setLastAttemptWords([]);
    setStep("review");
  };

  const handleConfirmTrim = () => {
    // 按严格矩阵补齐：被标记的 skippedCore/skippedPair 会移除并在对应池中补新词
    const { nextCore, nextPair } = computeSkipAndRefillWith(
      skippedCore,
      skippedPair,
    );

    // 斩掉后停留在 Preview：展示补位后的词池，不直接开始学习
    setCoreWords(nextCore);
    setPairWords(nextPair);
    setLearningPhrases([]);
    setLearningWordOrder([]);
    setLearningSequence([]);
    setSequenceIndex(0);
    setPhraseProgress(0);
    setPlate([]);
    setUsedIngredients([]);
    setActiveWikiState(null);
    setCorePickWrong(false);
    setWrongPhraseIndices([]);
    setRevealResult(false);
    setLastCheckCorrect(null);
    setLastAttemptWords([]);
    setSkippedCore([]);
    setSkippedPair([]);
    setActiveFocusWord(null);
    setShowTrimConfirm(false);
  };

  const handleIngredientClick = (word: string) => {
    if (!currentItem) return;

    if (currentItem.type === "corePick" || currentItem.type === "pairPick") {
      // 核心词选择题：题干是中文释义，选对的核心词才通过
      if (revealResult) return;
      // 只负责“填入”，不直接给正误反馈；正误在 Check Dish 后展示
      setPlate([word]);
      setUsedIngredients([word]);
      setCorePickWrong(false);
      return;
    }

    if (!currentPhrase) return;
    if (plate.includes(word)) return;
    const nextPlate = [...plate, word];
    setPlate(nextPlate);
    setUsedIngredients((prev) => [...prev, word]);

    if (nextPlate.length === currentPhrase.parts.length) {
      // 不在此处直接给正误/跳转；统一由 Check Dish 决定并跳转 wiki
    }
  };

  const handleRemoveFromPlate = (word: string) => {
    setPlate((prev) => prev.filter((w) => w !== word));
    setUsedIngredients((prev) => prev.filter((w) => w !== word));
  };

  const handleClearPlate = () => {
    setPlate([]);
    setUsedIngredients([]);
  };

  const goToNextDish = (opts?: {
    cutPhraseIndices?: number[];
    cutCoreWords?: string[];
  }) => {
    // feedback 只来自 phrase 题
    if (activeWikiState?.type === "phrase") {
      setPhraseProgress((p) =>
        p < learningPhrases.length ? p + 1 : p,
      );
    }
    setActiveWikiState(null);
    setPlate([]);
    setUsedIngredients([]);
    setCorePickWrong(false);
    setRevealResult(false);
    setLastCheckCorrect(null);
    setLastAttemptWords([]);
    const nextIndex = sequenceIndex + 1;
    if (nextIndex >= learningSequence.length) {
      if (phase === "learning") {
        setStep("summary");
      } else {
        // 复习阶段结束：不再进入总结页
        setPhase("learning");
        setStep("preview");
        setLearningPhrases([]);
        setLearningSequence([]);
        setSequenceIndex(0);
        setPhraseProgress(0);
        setActiveWikiState(null);
        setPlate([]);
        setUsedIngredients([]);
        setCorePickWrong(false);
        setRevealResult(false);
        setLastCheckCorrect(null);
        setLastAttemptWords([]);
        setWrongPhraseIndices([]);
        setCutPhraseIndices([]);
        setCutCoreWords([]);
      }
      return;
    }
    setSequenceIndex(nextIndex);
    setStep(phase === "learning" ? "learn" : "review");
  };

  const cutCurrentInLearning = () => {
    if (phase !== "learning") return;
    if (!currentItem) return;

    if (currentItem.type === "phrase") {
      const idx = currentItem.phraseIndex;
      const nextCutPhraseIndices = cutPhraseIndices.includes(idx)
        ? cutPhraseIndices
        : [...cutPhraseIndices, idx];
      setCutPhraseIndices(nextCutPhraseIndices);

      // 若该词组之前已经被记为“答错”，同时剔除掉以免影响复习优先级
      if (wrongPhraseIndices.includes(idx)) {
        setWrongPhraseIndices((prev) => prev.filter((x) => x !== idx));
      }

      const nextIndex = sequenceIndex + 1;
      const nextCutCoreWords = cutCoreWords;

      setActiveWikiState(null);
      setPlate([]);
      setUsedIngredients([]);
      setCorePickWrong(false);
      setRevealResult(false);
      setLastCheckCorrect(null);
      setLastAttemptWords([]);

      setPhraseProgress((p) =>
        p < learningPhrases.length ? p + 1 : p,
      );

      if (nextIndex >= learningSequence.length) {
        startReview({
          cutPhraseIndices: nextCutPhraseIndices,
          cutCoreWords: nextCutCoreWords,
        });
        return;
      }

      setSequenceIndex(nextIndex);
      setStep("learn");
      return;
    }

    // 非 corePick 不支持“斩 core”
    if (currentItem.type !== "corePick") return;

    // corePick：斩掉 core，复习时所有包含该 core 的词组都过滤掉
    const core = currentItem.targetCore;
    const nextCutCoreWords = cutCoreWords.includes(core)
      ? cutCoreWords
      : [...cutCoreWords, core];
    setCutCoreWords(nextCutCoreWords);

    const nextIndex = sequenceIndex + 1;

    setActiveWikiState(null);
    setPlate([]);
    setUsedIngredients([]);
    setCorePickWrong(false);
    setRevealResult(false);
    setLastCheckCorrect(null);
    setLastAttemptWords([]);

    if (nextIndex >= learningSequence.length) {
      startReview({
        cutPhraseIndices: cutPhraseIndices,
        cutCoreWords: nextCutCoreWords,
      });
      return;
    }

    setSequenceIndex(nextIndex);
    setStep("learn");
  };

  const cutFromFeedbackInLearning = () => {
    if (phase !== "learning") return;
    if (!activeWikiState) return;

    if (activeWikiState.type === "phrase") {
      const idx = activeWikiState.index;
      const nextCutPhraseIndices = cutPhraseIndices.includes(idx)
        ? cutPhraseIndices
        : [...cutPhraseIndices, idx];
      setCutPhraseIndices(nextCutPhraseIndices);

      if (wrongPhraseIndices.includes(idx)) {
        setWrongPhraseIndices((prev) => prev.filter((x) => x !== idx));
      }

      goToNextDish({
        cutPhraseIndices: nextCutPhraseIndices,
        cutCoreWords: cutCoreWords,
      });
      return;
    }

    if (activeWikiState.type !== "corePick") return;

    // corePick：斩掉 core
    const core = activeWikiState.core;
    const nextCutCoreWords = cutCoreWords.includes(core)
      ? cutCoreWords
      : [...cutCoreWords, core];
    setCutCoreWords(nextCutCoreWords);

    goToNextDish({
      cutPhraseIndices: cutPhraseIndices,
      cutCoreWords: nextCutCoreWords,
    });
  };

  const renderPreview = () => (
    <div className="flex min-h-screen w-full justify-center bg-zinc-50 text-zinc-900">
      <div className="relative flex h-screen w-full max-w-md flex-col bg-white">
        <header className="flex h-14 items-center justify-between border-b border-zinc-100 px-4">
          <button className="flex items-center text-zinc-400">
            <span className="material-symbols-outlined text-[20px]">
              arrow_back
            </span>
          </button>
          <div className="text-center">
            <h1 className="text-xs font-bold uppercase tracking-tight">
              Today's Ingredients
            </h1>
            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-emerald-600">
              Social &amp; Emotional
            </p>
          </div>
          <button className="flex items-center text-zinc-400">
            <span className="material-symbols-outlined text-[20px]">
              info
            </span>
          </button>
        </header>

        <main className="no-scrollbar flex-1 overflow-y-auto pb-24">
          <div className="px-4 py-4">
            <div className="rounded-xl border border-zinc-100 bg-zinc-50 px-4 py-3">
              <h2 className="text-sm font-semibold text-zinc-900">
                Prep Your Station
              </h2>
              <p className="mt-0.5 text-xs text-zinc-500">
                勾掉你已经很稳的词，然后开始学习吧
              </p>
            </div>
          </div>

          <section className="px-4 pb-2">
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-400">
              Ingredients Pool
            </p>
            <div className="divide-y divide-zinc-100">
              {[...coreWords.slice(0, CORE_COUNT), ...pairWords.slice(0, PAIR_COUNT)].map(
                (word) => {
                  const type: "core" | "pair" = coreWords.includes(word)
                    ? "core"
                    : "pair";
                  const skipped =
                    type === "core"
                      ? skippedCore.includes(word)
                      : skippedPair.includes(word);
                  const isActive = activeFocusWord === word;
                  return (
                    <div
                      key={word}
                      className="py-3.5"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex flex-col">
                          <span
                            className={`text-sm font-semibold ${
                              skipped ? "line-through text-zinc-400" : ""
                            }`}
                          >
                            {word}
                          </span>
                        </div>
                        <button
                          onClick={() =>
                            handleToggleSkip(type, word)
                          }
                          className={`h-5 w-5 rounded border text-xs transition ${
                            skipped
                              ? "border-emerald-500 bg-emerald-500 text-white"
                              : "border-zinc-300 bg-white text-transparent"
                          }`}
                          aria-label="skip word"
                        >
                          ✓
                        </button>
                      </div>
                      {isActive && (
                        <p className="mt-1.5 text-[11px] leading-relaxed text-zinc-600">
                          {gameConfig.wordFocus[word] ?? "（暂无 focus 文案）"}
                        </p>
                      )}
                    </div>
                  );
                })}
            </div>
          </section>
        </main>

        <div className="fixed bottom-0 left-1/2 z-10 w-full max-w-md -translate-x-1/2 border-t border-zinc-100 bg-white/95 px-4 py-3 backdrop-blur">
          <div className="flex gap-2">
            <button
              onClick={() => {
              if (skippedCore.length === 0 && skippedPair.length === 0) {
                startLearning();
              } else {
                setShowTrimConfirm(true);
              }
              }}
              className="flex h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-zinc-900 text-sm font-semibold text-white active:scale-[0.98] transition"
            >
              <span className="material-symbols-outlined text-[18px]">
                skillet
              </span>
              斩掉并确认词池
            </button>
            <button
            onClick={() => {
              if (skippedCore.length === 0 && skippedPair.length === 0) {
                startLearning();
              } else {
                setShowTrimConfirm(true);
              }
            }}
              className="hidden h-11 items-center justify-center rounded-lg border border-zinc-300 px-3 text-xs font-medium text-zinc-700 hover:bg-zinc-50 sm:flex"
            >
              直接开始学习
            </button>
          </div>
        </div>

        {showTrimConfirm && (
          <div className="fixed inset-0 z-20 flex items-center justify-center bg-zinc-900/60 px-6 backdrop-blur-[2px]">
            <div className="w-full max-w-xs overflow-hidden rounded-lg bg-white shadow-2xl">
              <div className="p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                  <span className="material-symbols-outlined text-2xl">
                    warning
                  </span>
                </div>
                <p className="text-sm font-medium leading-relaxed text-zinc-800">
                  斩掉后将无法学习这些单词在心理语境中特有的意思哦，是否确认斩掉？
                </p>
              </div>
              <div className="flex border-t border-zinc-100 text-sm">
                <button
                  onClick={() => setShowTrimConfirm(false)}
                  className="flex-1 border-r border-zinc-100 px-4 py-3 font-medium text-zinc-500 hover:bg-zinc-50"
                >
                  取消
                </button>
                <button
                  onClick={handleConfirmTrim}
                  className="flex-1 px-4 py-3 font-semibold text-emerald-600 hover:bg-zinc-50"
                >
                  确认
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderLearn = () => {
    const allIngredients = [...coreWords, ...pairWords];
    const orderedAll =
      learningWordOrder.length > 0
        ? learningWordOrder.filter((w) => allIngredients.includes(w))
        : allIngredients;
    const ingredients = orderedAll;

    // 渐进解锁（严格按题序）：
    // 1) A+B -> 展示 A,B
    // 2) A+C -> 展示 A,B,C
    // 3) A+D -> 展示 A,B,C,D
    // 4) E+B -> 展示 A,B,C,D,E
    // 5) E+C -> 展示 A,B,C,D,E
    // 6) E+D -> 展示 A,B,C,D,E
    // 7) F+B -> 展示 A,B,C,D,E,F
    // 8) F+C -> 展示 A,B,C,D,E,F
    // 9) F+D -> 展示 A,B,C,D,E,F
    // 核心组解锁逻辑：
    // - core2 只能在“core2 选择题”出现后/通过后才算开启
    // - core3 同理
    const coreUnlockedByPhraseProgress = [1, 1, 1, 2, 2, 2, 3, 3, 3];
    const pairUnlockedByPhraseProgress = [1, 2, 3, 3, 3, 3, 3, 3, 3];
    const baseCoreCount =
      coreUnlockedByPhraseProgress[
        Math.min(phraseProgress, coreUnlockedByPhraseProgress.length - 1)
      ] ?? CORE_COUNT;
    const basePairCount =
      pairUnlockedByPhraseProgress[
        Math.min(phraseProgress, pairUnlockedByPhraseProgress.length - 1)
      ] ?? PAIR_COUNT;

    const isReviewMode = phase === "review";
    const isPairPickMode = currentItem?.type === "pairPick";
    const visibleCoreCount = isReviewMode
      ? CORE_COUNT
      : currentItem?.type === "corePick"
        ? Math.max(1, Math.min(baseCoreCount, CORE_COUNT) - 1) // 选择题允许看到“下一组核心词”用于选择
        : Math.min(baseCoreCount, CORE_COUNT);
    const visiblePairCount = isReviewMode ? PAIR_COUNT : Math.min(basePairCount, PAIR_COUNT);
    const coreBankWords = isPairPickMode ? [] : coreWords.slice(0, CORE_COUNT);
    const pairBankWords = isPairPickMode
      ? currentItem?.targetPair
        ? [currentItem.targetPair]
        : []
      : pairWords.slice(0, PAIR_COUNT);
    const bankCount = isPairPickMode
      ? pairBankWords.length
      : Math.min(visibleCoreCount + visiblePairCount, 6);

    const cutDisabled =
      phase !== "learning" || !currentItem
        ? true
        : currentItem.type === "phrase"
          ? cutPhraseIndices.includes(currentItem.phraseIndex)
          : currentItem.type === "corePick"
            ? cutCoreWords.includes(currentItem.targetCore)
            : true;
    return (
      <div className="flex min-h-screen w-full justify-center bg-zinc-50 text-zinc-900">
        <div className="relative flex h-screen w-full max-w-md flex-col bg-white">
          <header className="flex h-14 items-center justify-between border-b border-zinc-100 px-4">
            <button
              onClick={() => {
                setPhase("learning");
                setStep("preview");
              }}
              className="flex items-center text-zinc-400"
            >
              <span className="material-symbols-outlined text-[20px]">
                arrow_back
              </span>
            </button>
            <span />
            <div className="flex items-center gap-3">
              {phase === "learning" && (
                <button
                  onClick={cutCurrentInLearning}
                  disabled={cutDisabled}
                  className={`flex h-6 items-center justify-center rounded-md border px-2 text-[10px] font-bold transition ${
                    cutDisabled
                      ? "border-zinc-200 bg-zinc-100 text-zinc-300"
                      : "border-rose-200 bg-rose-50 text-rose-600 active:scale-[0.98]"
                  }`}
                  aria-label="cut current"
                >
                  斩
                </button>
              )}
              <span className="text-[10px] text-zinc-400">
                {learningPhrases.length === 0
                  ? "0 / 0"
                  : `${Math.min(phraseProgress + 1, learningPhrases.length)} / ${learningPhrases.length}`}
              </span>
            </div>
          </header>

          <main className="no-scrollbar flex-1 overflow-y-auto pb-24">
            {learningPhrases.length === 0 || !currentItem ? (
              <div className="px-6 pt-10">
                <div className="rounded-xl border border-zinc-100 bg-zinc-50 p-4">
                  <h1 className="text-base font-semibold text-zinc-900">
                    当前词池无法生成可学习词组
                  </h1>
                  <p className="mt-1 text-xs text-zinc-500">
                    你斩掉了一些关键 ingredients，导致题库里没有任何 dish 能被完整拼出。
                    返回 Preview 调整词池后再开始。
                  </p>
                </div>
              </div>
            ) : (
            <div className="flex flex-col items-center px-6 pt-6">
              <div className="mb-5 h-28 w-44 rounded-xl border border-zinc-50 bg-zinc-100 shadow-sm">
                {/* 预留插画位 */}
                <div className="flex h-full items-center justify-center text-zinc-300">
                  <span className="material-symbols-outlined text-4xl">
                    image
                  </span>
                </div>
              </div>
              <div className="mb-6 text-center">
                <h1 className="mb-1 text-2xl font-semibold text-zinc-900">
                  {currentItem.type === "phrase"
                    ? currentPhrase?.zh
                    : currentItem.type === "corePick"
                      ? gameConfig.wordZh[currentItem.targetCore] ?? "选择对应核心词"
                      : gameConfig.wordZh[currentItem.targetPair] ?? "选择对应搭配词"}
                </h1>
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-zinc-400">
                  {currentItem.type === "phrase"
                    ? "Main Concept"
                    : currentItem.type === "corePick"
                      ? "Pick the Core Word"
                      : "Pick the Pair Word"}
                </p>
                {currentItem.type === "corePick" && corePickWrong && (
                  <p className="mt-2 text-xs font-medium text-rose-500">
                    选错了，再试一次。
                  </p>
                )}
              </div>

              <div className="flex w-full justify-center gap-3 pb-4">
                {(currentItem.type === "phrase"
                  ? currentPhrase?.parts ?? []
                  : currentItem.type === "corePick"
                    ? [currentItem.targetCore]
                    : [currentItem.targetPair]
                ).map((part, idx) => {
                  const filled = plate[idx];
                  const isCorrectSlot = revealResult && filled && filled === part;
                  return (
                    <div
                      key={`${part}-${idx}`}
                      className={`flex h-10 w-28 items-center justify-center rounded-t border-b-2 ${
                        filled
                          ? revealResult
                            ? isCorrectSlot
                              ? "border-emerald-500 bg-emerald-50"
                              : "border-rose-400 bg-rose-50/40"
                            : "border-zinc-200 bg-zinc-50"
                          : "border-zinc-200 bg-zinc-50"
                      }`}
                    >
                      <span
                        className={`text-sm font-semibold ${
                          filled
                            ? revealResult
                              ? isCorrectSlot
                                ? "text-emerald-700"
                                : "text-rose-600"
                              : "text-zinc-700"
                            : "text-zinc-400"
                        }`}
                      >
                        {filled ?? " "}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
            )}

            <div className="flex justify-center gap-10 pb-2">
              <button
                onClick={() => {
                  if (plate.length === 0) return;
                  const next = [...plate];
                  const removed = next.pop();
                  setPlate(next);
                  if (removed) {
                    setUsedIngredients((prev) =>
                      prev.filter((w) => w !== removed),
                    );
                  }
                }}
                className="flex flex-col items-center gap-1"
                aria-label="撤回"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  aria-hidden="true"
                  className="text-zinc-400"
                >
                  <path
                    fill="currentColor"
                    d="M12 5a7 7 0 0 1 7 7 7 7 0 0 1-7 7H9a1 1 0 1 1 0-2h3a5 5 0 0 0 0-10H8.414l1.293 1.293A1 1 0 0 1 8.293 9.707l-3-3a1 1 0 0 1 0-1.414l3-3A1 1 0 1 1 9.707 3.293L8.414 4.586H12z"
                  />
                </svg>
              </button>
              <button
                onClick={handleClearPlate}
                className="flex flex-col items-center gap-1"
                aria-label="清除"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  aria-hidden="true"
                  className="text-zinc-400"
                >
                  <path
                    fill="currentColor"
                    d="M7 6h10l-1 14H8L7 6zm3-3h4a1 1 0 0 1 1 1v1H9V4a1 1 0 0 1 1-1zm-3 2h10a1 1 0 1 1 0 2H7a1 1 0 1 1 0-2z"
                  />
                </svg>
              </button>
            </div>

            <section className="mt-4 px-6 pb-4">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                  Word Bank
                </h2>
                <span className="text-[10px] font-medium text-zinc-400">
                  {bankCount}/6
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-3">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                    Core
                  </p>
                  {coreBankWords.map((w, idx) => {
                    const unlocked = idx < visibleCoreCount;
                    const used = usedIngredients.includes(w);
                    return (
                      <button
                        key={`core-${w}`}
                        onClick={() => handleIngredientClick(w)}
                        disabled={!unlocked || used}
                        className={`w-full rounded-lg p-3 text-left text-xs font-bold transition-all ${
                          !unlocked
                            ? "border border-zinc-100 bg-zinc-50 text-zinc-200"
                            : used
                              ? "pointer-events-none border border-zinc-100 bg-white italic text-zinc-300"
                              : "border border-zinc-100 bg-white text-zinc-700 shadow-sm active:border-emerald-500 active:text-emerald-600"
                        }`}
                      >
                        {unlocked ? w : "—"}
                      </button>
                    );
                  })}
                </div>

                <div className="space-y-3">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                    Pair
                  </p>
                  {pairBankWords.map((w, idx) => {
                    const unlocked = isPairPickMode ? true : idx < visiblePairCount;
                    const used = usedIngredients.includes(w);
                    return (
                      <button
                        key={`pair-${w}`}
                        onClick={() => handleIngredientClick(w)}
                        disabled={!unlocked || used}
                        className={`w-full rounded-lg p-3 text-left text-xs font-bold transition-all ${
                          !unlocked
                            ? "border border-zinc-100 bg-zinc-50 text-zinc-200"
                            : used
                              ? "pointer-events-none border border-zinc-100 bg-white italic text-zinc-300"
                              : "border border-zinc-100 bg-white text-zinc-700 shadow-sm active:border-emerald-500 active:text-emerald-600"
                        }`}
                      >
                        {unlocked ? w : "—"}
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>
          </main>

          <div className="fixed bottom-0 left-1/2 z-10 w-full max-w-md -translate-x-1/2 border-t border-zinc-100 bg-white/95 px-4 py-3 backdrop-blur">
            <button
              onClick={() => {
                if (!currentItem) return;

                if (currentItem.type === "phrase") {
                  if (!currentPhrase) return;
                  const isCorrect =
                    plate.length === currentPhrase.parts.length &&
                    currentPhrase.parts.every(
                      (part, idx) => part === plate[idx],
                    );
                  setLastAttemptWords([...plate]);
                  setRevealResult(true);
                  setLastCheckCorrect(isCorrect);
                  playFeedbackSound(isCorrect ? "correct" : "wrong");
                  if (!isCorrect) {
                    if (phase === "learning") {
                      setWrongPhraseIndices((prev) =>
                        prev.includes(currentItem.phraseIndex)
                          ? prev
                          : [...prev, currentItem.phraseIndex],
                      );
                    }
                  } else {
                    speakPhrase(currentPhrase.phrase);
                  }
                  const delayMs = isCorrect ? 650 : 420;
                  window.setTimeout(() => {
                    setActiveWikiState({
                      type: "phrase",
                      index: currentItem.phraseIndex,
                      isCorrect,
                    });
                    setStep("feedback");
                  }, delayMs);
                  return;
                }

                // corePick / pairPick：也用 Check Dish 触发正误反馈 -> wiki
                const picked = plate[0];
                if (!picked) return;
                const expected =
                  currentItem.type === "corePick"
                    ? currentItem.targetCore
                    : currentItem.targetPair;
                const isCorrect = picked === expected;
                setLastAttemptWords([picked]);
                setRevealResult(true);
                setLastCheckCorrect(isCorrect);
                setCorePickWrong(!isCorrect);
                playFeedbackSound(isCorrect ? "correct" : "wrong");
                if (isCorrect) speakPhrase(expected);
                const delayMs = isCorrect ? 650 : 420;
                window.setTimeout(() => {
                  if (currentItem.type === "corePick") {
                    setActiveWikiState({
                      type: "corePick",
                      core: currentItem.targetCore,
                      isCorrect,
                    });
                  } else {
                    setActiveWikiState({
                      type: "pairPick",
                      pair: currentItem.targetPair,
                      isCorrect,
                    });
                  }
                  setStep("feedback");
                }, delayMs);
              }}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 text-sm font-semibold text-white active:scale-[0.98] transition"
            >
              提交
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderFeedback = () => {
    if (!activeWikiState) return null;

    const isPhrase = activeWikiState.type === "phrase";
    const phrase = isPhrase ? learningPhrases[activeWikiState.index] : null;
    const pickWord = !isPhrase
      ? activeWikiState.type === "corePick"
        ? activeWikiState.core
        : activeWikiState.pair
      : null;
    const isCorrect = activeWikiState.isCorrect;

    const title = isPhrase ? phrase?.phrase ?? "" : pickWord ?? "";
    const titleZh = isPhrase
      ? phrase?.zh ?? ""
      : gameConfig.wordZh[pickWord ?? ""] ?? "";
    const ipa = isPhrase
      ? (phrase?.phrase ?? "")
          .split(" ")
          .map((w) => gameConfig.wordIpa[w] ?? "")
          .filter(Boolean)
          .join(" ")
      : gameConfig.wordIpa[pickWord ?? ""] ?? "";
    const keyPointText = isPhrase
      ? (phrase?.parts ?? [])
          .map((w) => `${w}：${gameConfig.wordZh[w] ?? "（暂无释义）"}`)
          .join("；")
      : `${pickWord}：${gameConfig.wordZh[pickWord ?? ""] ?? "（暂无释义）"}`;

    const coreWord = isPhrase ? (phrase?.parts?.[0] ?? "") : (pickWord ?? "");
    const pairWord = isPhrase ? (phrase?.parts?.[1] ?? "") : "";

    const cutDisabled =
      phase !== "learning"
        ? true
        : activeWikiState.type === "phrase"
          ? cutPhraseIndices.includes(activeWikiState.index)
          : activeWikiState.type === "corePick"
            ? cutCoreWords.includes(activeWikiState.core)
            : true;

    return (
      <div className="flex min-h-screen w-full justify-center bg-zinc-50 text-zinc-900">
        <div className="relative flex h-screen w-full max-w-md flex-col bg-white">
          <header className="flex h-14 items-center justify-between border-b border-zinc-100 px-4">
            <button
              onClick={() => {
                setActiveWikiState(null);
                setStep(phase === "learning" ? "learn" : "review");
              }}
              className="flex items-center text-zinc-400"
            >
              <span className="material-symbols-outlined text-[20px]">
                close
              </span>
            </button>
            <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-400">
              Wiki
            </h2>
            <div className="flex items-center gap-2">
              {phase === "learning" && (
                <button
                  onClick={cutFromFeedbackInLearning}
                  disabled={cutDisabled}
                  className={`flex h-6 items-center justify-center rounded-md border px-2 text-[10px] font-bold transition ${
                    cutDisabled
                      ? "border-zinc-200 bg-zinc-100 text-zinc-300"
                      : "border-rose-200 bg-rose-50 text-rose-600 active:scale-[0.98]"
                  }`}
                  aria-label="cut current"
                >
                  斩
                </button>
              )}
              <button
                onClick={() => speakPhrase(title)}
                className="flex items-center text-zinc-400"
                aria-label="play audio"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  aria-hidden="true"
                  className="text-zinc-400"
                >
                  <path
                    fill="currentColor"
                    d="M3 10v4a1 1 0 0 0 1 1h3.586l4.707 4.707A1 1 0 0 0 14 19V5a1 1 0 0 0-1.707-.707L7.586 9H4a1 1 0 0 0-1 1zm9-2.586V16.586l-3.293-3.293A1 1 0 0 0 8 13H5v-2h3a1 1 0 0 0 .707-.293L12 7.414zM16.5 8.5a1 1 0 0 1 1.414 0 5 5 0 0 1 0 7.071 1 1 0 1 1-1.414-1.414 3 3 0 0 0 0-4.243 1 1 0 0 1 0-1.414z"
                  />
                </svg>
              </button>
            </div>
          </header>

          <main className="no-scrollbar flex-1 overflow-y-auto pb-24">
            <div className="px-6 pt-6 pb-4">
              <div className="flex items-start justify-between gap-3">
                <h1 className="min-w-0 text-2xl font-bold leading-tight text-zinc-900">
                  {isPhrase ? (
                    <>
                      <span className="text-orange-700">{coreWord}</span>
                      <span className="text-zinc-900"> </span>
                      <span className="text-blue-700">{pairWord}</span>
                    </>
                  ) : (
                    <span className="text-orange-700">{title}</span>
                  )}
                </h1>
                <button
                  type="button"
                  onClick={() => speakPhrase(title)}
                  className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-zinc-200 bg-white text-zinc-500 hover:bg-zinc-50 active:scale-[0.98]"
                  aria-label="play phrase audio"
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    aria-hidden="true"
                    className="text-zinc-500"
                  >
                    <path
                      fill="currentColor"
                      d="M3 10v4a1 1 0 0 0 1 1h3.586l4.707 4.707A1 1 0 0 0 14 19V5a1 1 0 0 0-1.707-.707L7.586 9H4a1 1 0 0 0-1 1zm9-2.586V16.586l-3.293-3.293A1 1 0 0 0 8 13H5v-2h3a1 1 0 0 0 .707-.293L12 7.414zM16.5 8.5a1 1 0 0 1 1.414 0 5 5 0 0 1 0 7.071 1 1 0 1 1-1.414-1.414 3 3 0 0 0 0-4.243 1 1 0 0 1 0-1.414z"
                    />
                  </svg>
                </button>
              </div>
              {ipa && (
                <p className="mt-1 text-sm text-zinc-400">
                  {ipa}
                </p>
              )}
              {titleZh && (
                <p className="mt-1 text-sm text-zinc-600">{titleZh}</p>
              )}
            </div>

            <div className="space-y-6 px-6 pb-8">
              {isPhrase && phrase && (
                <section>
                  <div className="mb-1.5 flex items-center gap-2">
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                      例句
                    </h3>
                  </div>
                  <div className="space-y-2 border-l-2 border-zinc-100 pl-3">
                    <p className="text-sm italic text-zinc-800">
                      {renderExampleWithBoldPhrase(phrase.example, phrase.phrase)}
                    </p>
                    <p className="text-xs text-zinc-500">
                      {phrase.exampleZh}
                    </p>
                  </div>
                </section>
              )}

              <section>
                <div className="mb-1.5 flex items-center gap-2">
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-600">
                    Key Point
                  </h3>
                </div>
                {isPhrase ? (
                  <p className="text-sm text-zinc-800">
                    <span className="font-semibold text-orange-700">
                      {coreWord}
                    </span>
                    <span className="text-orange-700">
                      ：{gameConfig.wordZh[coreWord] ?? "（暂无释义）"}
                    </span>
                    <span className="text-zinc-500">；</span>
                    <span className="font-semibold text-blue-700">
                      {pairWord}
                    </span>
                    <span className="text-blue-700">
                      ：{gameConfig.wordZh[pairWord] ?? "（暂无释义）"}
                    </span>
                  </p>
                ) : (
                  <p className="text-sm text-zinc-800">
                    <span className="font-semibold text-orange-700">
                      {title}
                    </span>
                    <span className="text-orange-700">
                      ：{gameConfig.wordZh[title] ?? "（暂无释义）"}
                    </span>
                  </p>
                )}
              </section>

              {!isCorrect && (
                <section>
                  <div className="mb-1.5 flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm text-rose-500">
                      warning
                    </span>
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-rose-500">
                      Mistake
                    </h3>
                  </div>
                  <div className="space-y-2">
                    {(() => {
                      if (isPhrase && phrase) {
                        const correct = phrase.parts ?? [];
                        const wrongItems = lastAttemptWords
                          .map((w, i) => ({ w, i }))
                          .filter(({ w, i }) => !!w && correct[i] && w !== correct[i]);
                        if (wrongItems.length === 0) {
                          return (
                            <p className="text-sm text-zinc-700">
                              你这题选错了，看看正确搭配再来一遍。
                            </p>
                          );
                        }
                        return (
                          <div className="space-y-2">
                            {wrongItems.map(({ w, i }) => (
                              <div
                                key={`wrong-${w}-${i}`}
                                className="rounded-lg border border-rose-100 bg-rose-50/40 px-3 py-2"
                              >
                                <p className="text-sm font-semibold text-zinc-900">
                                  你选了：{w}
                                </p>
                                <p className="mt-0.5 text-xs text-zinc-600">
                                  {gameConfig.wordZh[w] ?? "（暂无释义）"}
                                </p>
                              </div>
                            ))}
                          </div>
                        );
                      }

                      // corePick
                      const picked = lastAttemptWords[0];
                      if (!picked) return null;
                      return (
                        <div className="rounded-lg border border-rose-100 bg-rose-50/40 px-3 py-2">
                          <p className="text-sm font-semibold text-zinc-900">
                            你选了：{picked}
                          </p>
                          <p className="mt-0.5 text-xs text-zinc-600">
                            {gameConfig.wordZh[picked] ?? "（暂无释义）"}
                          </p>
                        </div>
                      );
                    })()}
                  </div>
                </section>
              )}
            </div>
          </main>

          <div className="fixed bottom-0 left-1/2 z-10 w-full max-w-md -translate-x-1/2 border-t border-zinc-100 bg-white/95 px-4 py-3 backdrop-blur">
            <button
              onClick={() => goToNextDish()}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-zinc-900 text-sm font-semibold text-white active:scale-[0.98] transition"
            >
              <span>Next</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderSummary = () => {
    const words = learningWordOrder.length > 0
      ? learningWordOrder
      : [...coreWords.slice(0, CORE_COUNT), ...pairWords.slice(0, PAIR_COUNT)];
    const wrongPhrases = wrongPhraseIndices
      .map((idx) => learningPhrases[idx])
      .filter(Boolean);

    return (
      <div className="flex min-h-screen w-full justify-center bg-zinc-50 text-zinc-900">
        <div className="relative flex h-screen w-full max-w-md flex-col bg-white">
          <header className="flex h-14 items-center justify-between border-b border-zinc-100 px-4">
            <button
              onClick={() => setStep("preview")}
              className="flex items-center text-zinc-400"
            >
              <span className="material-symbols-outlined text-[20px]">
                arrow_back
              </span>
            </button>
            <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-400">
              Summary
            </h2>
            <span className="text-[10px] text-zinc-400">
              完成
            </span>
          </header>

          <main className="no-scrollbar flex-1 overflow-y-auto pb-24">
            <div className="px-6 pt-6 pb-4">
              <h1 className="text-xl font-bold text-zinc-900">
                本轮总结
              </h1>
              <p className="mt-1 text-xs text-zinc-500">
                单词释义 &amp; 你答错过的词组
              </p>
            </div>

            <div className="space-y-6 px-6 pb-8">
              <section>
                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                  单词释义
                </h3>
                <div className="mt-2 space-y-2">
                  {words.map((w) => (
                    <div
                      key={`w-${w}`}
                      className="rounded-lg border border-zinc-100 bg-white px-3 py-2"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="truncate text-sm font-semibold text-zinc-900">
                              {w}
                            </span>
                            <button
                              type="button"
                              onClick={() => speakPhrase(w)}
                              className="flex h-7 w-7 items-center justify-center rounded-md border border-zinc-200 bg-white text-zinc-500 hover:bg-zinc-50 active:scale-[0.98]"
                              aria-label="play word audio"
                            >
                              <svg
                                viewBox="0 0 24 24"
                                width="18"
                                height="18"
                                aria-hidden="true"
                                className="text-zinc-500"
                              >
                                <path
                                  fill="currentColor"
                                  d="M3 10v4a1 1 0 0 0 1 1h3.586l4.707 4.707A1 1 0 0 0 14 19V5a1 1 0 0 0-1.707-.707L7.586 9H4a1 1 0 0 0-1 1zm9-2.586V16.586l-3.293-3.293A1 1 0 0 0 8 13H5v-2h3a1 1 0 0 0 .707-.293L12 7.414zM16.5 8.5a1 1 0 0 1 1.414 0 5 5 0 0 1 0 7.071 1 1 0 1 1-1.414-1.414 3 3 0 0 0 0-4.243 1 1 0 0 1 0-1.414z"
                                />
                              </svg>
                            </button>
                          </div>
                          <p className="mt-0.5 text-xs text-zinc-600">
                            {gameConfig.wordZh[w] ?? "（暂无释义）"}
                          </p>
                        </div>
                        <span className="shrink-0 text-[11px] text-zinc-500">
                          {gameConfig.wordIpa[w] ?? ""}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-rose-500">
                  答错的词组
                </h3>
                {wrongPhrases.length === 0 ? (
                  <p className="mt-2 text-sm text-zinc-600">
                    太棒了，本轮没有答错的词组。
                  </p>
                ) : (
                  <div className="mt-2 space-y-2">
                    {wrongPhrases.map((p) => (
                      <div
                        key={`wp-${p.phrase}`}
                        className="rounded-lg border border-rose-100 bg-rose-50/40 px-3 py-2"
                      >
                        <p className="text-sm font-semibold text-zinc-900">
                          {p.phrase}
                        </p>
                        <p className="mt-0.5 text-xs text-zinc-600">
                          {p.zh}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </section>

              <div className="pt-2">
                <button
                  onClick={() => startReview()}
                  className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 text-sm font-semibold text-white active:scale-[0.98] transition"
                >
                  开始复习
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  };

  if (step === "preview") return renderPreview();
  if (step === "learn" || step === "review") return renderLearn();
  if (step === "summary") return renderSummary();
  return renderFeedback();
}


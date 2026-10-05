'use client';

import { useCallback, useEffect, useMemo, useState, type MouseEvent as ReactMouseEvent } from 'react';
import { Archive, BookOpen, BookMarked, ChevronDown, ChevronLeft, ChevronRight, Clock3, Coins, Flag, Languages, MapPinned, Menu, PackageOpen, RefreshCw, RotateCcw, Settings2, ShoppingBag, Sparkles, Target, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { exams as baseExams8, type Exam, type Question } from '@/lib/exams';
import { additionalExams8 } from '@/lib/exams8-content';
import { exams9 } from '@/lib/exams9';
import { exams10 } from '@/lib/exams10';
import { vocabularyByGrade, type VocabularyItem } from '@/lib/vocabulary';
import { distributeAnswers, distributeExams } from '@/lib/answer-distribution';
import { GrammarLesson } from '@/components/grammar-lesson';
import { grammarLessons8 } from '@/lib/grammar-lessons8';
import { grammarLessons9 } from '@/lib/grammar-lessons9';
import { grammarLessons10 } from '@/lib/grammar-lessons10';
import { enrichUnitExam } from '@/lib/unit-enrichment';
import { ExerciseQuestion } from '@/components/exercise-question';
import { correctAnswer, formatAnswer, isAnswerComplete, isQuestionCorrect, questionKey, type AnswerValue } from '@/lib/question-utils';
import { semester2Exams, upgradeEnglish10MidtermSix } from '@/lib/semester2-exams';
import { newBookUnitExams } from '@/lib/unit-new-books';
import { extendedExams, extendedGrammarLessons, extendedVocabulary, type ExtendedGrade } from '@/lib/extended-grades';

type Answers = Record<number, AnswerValue>;
type ExamMode = 'practice' | 'test' | 'survival';
type CoreGrade = 8 | 9 | 10;
type GradeLevel = ExtendedGrade | CoreGrade;
type MenuGroup = NonNullable<Exam['menuGroup']>;
type ModelContext = { registerTool: (tool: Record<string, unknown>, options?: { signal: AbortSignal }) => void | Promise<void> };
type DictionaryState = { word: string; translation: string; status: 'loading' | 'ready' | 'error' | 'empty'; x: number; y: number };
type AidKind = 'cotton' | 'medicine' | 'injection';
type AidInventory = Record<AidKind, number>;
type ChickenSpawn = { id: number; x: number; y: number; size: number; rotate: number; delay: number };
type FoodKind = 'roast' | 'grilled' | 'fried' | 'rice' | 'plucked';
type FoodSpawn = ChickenSpawn & { kind: FoodKind };
type Weapon = 'knife' | 'grenade' | 'pencil';
type EffectLevel = 'full' | 'light' | 'off';
type HubPanel = 'map' | 'vault' | 'wrong' | 'missions' | 'shop' | 'inventory' | null;
type FlagEntry = { key: string; grade: GradeLevel; examId: number; examTitle: string; prompt: string; section: Question['section']; savedAt: number };
type WrongEntry = FlagEntry & { mistakes: number };
type DailyStats = { date: string; correct: number; flags: number; completed: number };
type BossPenaltyKind = 'keyboard' | 'extra-options' | 'one-hp' | 'screen-lock' | 'duck-salad' | 'duck-porridge' | 'plucked-duck' | 'peking-duck' | 'duck-bamboo';
type BossPenalty = { kind: BossPenaltyKind; seconds: number; label: string; asset?: string };
type LoadoutSlot = 'head' | 'outfit' | 'weapon';
type Loadout = Record<LoadoutSlot, string | null>;
type LoadoutItem = { id: string; name: string; slot: LoadoutSlot; icon: string; price: number; rarity: 'Phổ thông' | 'Hiếm' | 'Sử thi'; color: string };

const STARTER_AID: AidInventory = { cotton: 0, medicine: 0, injection: 0 };
const AID_ITEMS: { kind: AidKind; name: string; icon: string; heal: number; color: string }[] = [
  { kind: 'cotton', name: 'Bông băng', icon: '🩹', heal: 1, color: 'border-sky-200 bg-sky-50 text-sky-900' },
  { kind: 'medicine', name: 'Thuốc hồi phục', icon: '💊', heal: 2, color: 'border-emerald-200 bg-emerald-50 text-emerald-900' },
  { kind: 'injection', name: 'Ống tiêm', icon: '💉', heal: 3, color: 'border-violet-200 bg-violet-50 text-violet-900' },
];
const COMMANDO_RANKS = [
  { streak: 10, name: 'Vịt Xạ Thủ' },
  { streak: 20, name: 'Vịt Liên Thanh' },
  { streak: 30, name: 'Vịt Đặc Nhiệm' },
  { streak: 40, name: 'Vịt Hỏa Lực' },
  { streak: Number.POSITIVE_INFINITY, name: 'Vịt Commando' },
];
const SURVIVAL_STAGES = ['Đi bộ', 'Xe đạp', 'Xe máy', 'Xe Jeep', 'Xe tăng', 'Máy bay chiến đấu'] as const;
const SURVIVAL_VEHICLES = [
  'survival-walk-v2.png',
  'survival-bike-v2.png',
  'survival-scooter-v2.png',
  'survival-jeep-v2.png',
  'survival-tank-v2.png',
  'survival-jet-v2.png',
] as const;
const SURVIVAL_TARGET = 10;
const FOOD_IMAGES: Record<FoodKind, string> = {
  roast: 'chicken-roast-v2.png', grilled: 'chicken-grilled-v2.png', fried: 'chicken-fried-v2.png',
  rice: 'chicken-rice-v2.png', plucked: 'plucked-chicken-v2.png',
};
const JOURNEY_STAGES: { group: MenuGroup | 'survival'; label: string; icon: string; position: [number, number] }[] = [
  { group: 'unit', label: 'Học theo Unit', icon: '📘', position: [23, 81] },
  { group: 'review', label: 'Ôn tập', icon: '🧠', position: [28, 62] },
  { group: 'midterm', label: 'Giữa kỳ I', icon: '⭐', position: [26, 38] },
  { group: 'final', label: 'Cuối kỳ I', icon: '🏙️', position: [44, 28] },
  { group: 'midterm2', label: 'Giữa kỳ II', icon: '🔬', position: [52, 51] },
  { group: 'final2', label: 'Cuối kỳ II', icon: '✈️', position: [70, 47] },
  { group: 'survival', label: 'Boss Survival', icon: '🏰', position: [88, 22] },
];
const BOSS_FOOD_EFFECTS: Record<Extract<BossPenaltyKind, 'duck-salad' | 'duck-porridge' | 'plucked-duck' | 'peking-duck' | 'duck-bamboo'>, { label: string; asset: string }> = {
  'duck-salad': { label: 'Dĩa gỏi vịt!', asset: 'duck-salad-v1.png' },
  'duck-porridge': { label: 'Nồi cháo vịt!', asset: 'duck-porridge-v1.png' },
  'plucked-duck': { label: 'Vịt trụi lông!', asset: 'plucked-duck-v1.png' },
  'peking-duck': { label: 'Vịt quay Bắc Kinh!', asset: 'peking-duck-v1.png' },
  'duck-bamboo': { label: 'Vịt kho măng!', asset: 'duck-bamboo-v1.png' },
};
const STARTER_LOADOUT: Loadout = { head: null, outfit: null, weapon: null };
const LOADOUT_ITEMS: LoadoutItem[] = [
  { id: 'cap-scout', name: 'Mũ trinh sát', slot: 'head', icon: '🧢', price: 15, rarity: 'Phổ thông', color: 'from-sky-500 to-cyan-400' },
  { id: 'headset-radio', name: 'Tai nghe vô tuyến', slot: 'head', icon: '🎧', price: 30, rarity: 'Hiếm', color: 'from-violet-600 to-fuchsia-500' },
  { id: 'helmet-commando', name: 'Mũ Commando', slot: 'head', icon: '🪖', price: 55, rarity: 'Sử thi', color: 'from-emerald-700 to-lime-500' },
  { id: 'vest-field', name: 'Áo tác chiến', slot: 'outfit', icon: '🦺', price: 25, rarity: 'Phổ thông', color: 'from-amber-500 to-orange-500' },
  { id: 'suit-agent', name: 'Vest đặc vụ', slot: 'outfit', icon: '🤵', price: 60, rarity: 'Sử thi', color: 'from-slate-800 to-indigo-700' },
  { id: 'medal-hero', name: 'Huy chương anh hùng', slot: 'outfit', icon: '🎖️', price: 40, rarity: 'Hiếm', color: 'from-rose-600 to-amber-400' },
  { id: 'pencil-tool', name: 'Bút chì chiến thuật', slot: 'weapon', icon: '✏️', price: 20, rarity: 'Phổ thông', color: 'from-yellow-500 to-amber-500' },
  { id: 'knife-tool', name: 'Dao sinh tồn', slot: 'weapon', icon: '🔪', price: 35, rarity: 'Hiếm', color: 'from-slate-500 to-sky-600' },
  { id: 'grenade-tool', name: 'Lựu đạn xóa gà', slot: 'weapon', icon: '💣', price: 70, rarity: 'Sử thi', color: 'from-red-700 to-orange-500' },
];
const SLOT_LABELS: Record<LoadoutSlot, string> = { head: 'Mũ', outfit: 'Trang phục', weapon: 'Vũ khí' };

function DuckLoadoutAvatar({ loadout, rankIndex, rankName, large = false }: { loadout: Loadout; rankIndex: number; rankName: string; large?: boolean }) {
  const equipped = Object.fromEntries((Object.keys(loadout) as LoadoutSlot[]).map((slot) => [slot, LOADOUT_ITEMS.find((item) => item.id === loadout[slot])])) as Record<LoadoutSlot, LoadoutItem | undefined>;
  const size = large ? 'h-48 w-44' : 'h-24 w-24';
  return <div aria-label={`Avatar ${rankName}`} className={`relative mx-auto shrink-0 overflow-hidden rounded-[28px] border border-amber-200 bg-gradient-to-b from-sky-100 to-amber-50 ${size}`}>
    {rankIndex >= 0 ? <div className="absolute inset-4 bg-contain bg-center bg-no-repeat" style={{ backgroundImage: 'url(duck-commando-ranks.png)', backgroundSize: '500% 100%', backgroundPosition: `${rankIndex * 25}% center` }}/> : <img src="duck-learn.png" alt="Vịt Tân Binh" className="absolute inset-0 h-full w-full object-contain p-2"/>}
    {equipped.outfit && <span className={`absolute left-1/2 -translate-x-1/2 drop-shadow-lg ${large ? 'bottom-5 text-6xl' : 'bottom-2 text-4xl'}`}>{equipped.outfit.icon}</span>}
    {equipped.head && <span className={`absolute left-1/2 -translate-x-1/2 drop-shadow-lg ${large ? 'top-1 text-6xl' : '-top-1 text-4xl'}`}>{equipped.head.icon}</span>}
    {equipped.weapon && <span className={`absolute rotate-[-18deg] drop-shadow-lg ${large ? 'bottom-6 right-3 text-5xl' : 'bottom-2 right-0 text-3xl'}`}>{equipped.weapon.icon}</span>}
  </div>;
}

function rollAidDrop(totalCorrect: number): AidKind {
  if (totalCorrect >= 20) {
    const roll = Math.random();
    if (roll < 0.2) return 'injection';
    if (roll < 0.55) return 'medicine';
  }
  if (totalCorrect >= 10 && Math.random() < 0.35) return 'medicine';
  return 'cotton';
}

function unitNumber(exam: Exam, grade: GradeLevel) {
  if (exam.unit) return exam.unit;
  if (exam.menuGroup !== 'unit') return undefined;
  return grade === 8 ? exam.id - 6 : grade === 9 ? exam.id - 100 : exam.id;
}

function prepareExams(items: Exam[], grade: CoreGrade) {
  const enriched = items.map((exam) => enrichUnitExam(exam, grade));
  const newByUnit = new Map(newBookUnitExams[grade].map((exam) => [exam.unit, exam]));
  const inserted = new Set<number>();
  const prepared: Exam[] = [];
  for (const exam of enriched) {
    const unit = unitNumber(exam, grade);
    const newBook = unit ? newByUnit.get(unit) : undefined;
    if (!unit || !newBook) {
      prepared.push(exam);
      continue;
    }
    const baseLabel = (exam.menuLabel ?? `Unit ${unit}`).replace(/ · Bộ cũ$/, '');
    prepared.push({ ...exam, unit, bookLabel: 'Bộ cũ', menuLabel: `${baseLabel} · Bộ cũ` }, newBook);
    inserted.add(unit);
  }
  for (const exam of newBookUnitExams[grade]) {
    if (exam.unit && !inserted.has(exam.unit)) prepared.push(exam);
  }
  return prepared;
}

const exams8 = distributeExams(prepareExams([...baseExams8, ...additionalExams8, ...semester2Exams[8]], 8));
const balancedExams9 = distributeExams(prepareExams([...exams9, ...semester2Exams[9]], 9));
const balancedExams10 = distributeExams(prepareExams(upgradeEnglish10MidtermSix([...exams10, ...semester2Exams[10]]), 10));
const examsByGrade: Record<GradeLevel, Exam[]> = {
  6: extendedExams[6],
  7: extendedExams[7],
  8: exams8,
  9: balancedExams9,
  10: balancedExams10,
  11: extendedExams[11],
  12: extendedExams[12],
};

function shuffled<T>(items: T[]) {
  return [...items].sort(() => Math.random() - 0.5);
}

function questionFormat(question: Question) {
  if (question.options.length === 2 && question.options[0] === 'True' && question.options[1] === 'False') return 'true-false';
  if (question.kind === 'cloze-dropdown') return 'cloze';
  if (question.kind === 'typed' && /rearrange|unscramble|put .* order|make .* sentence/i.test(`${question.prompt} ${question.template ?? ''}`)) return 'unscramble';
  if (question.kind === 'typed') return 'typed';
  return 'mcq';
}

function buildMixedQuestions(exam: Exam, allExams: Exam[], examIndex: number, targetCount: number, seenBefore: Set<string>, pinnedKey?: string | null, excludeTypedVocabulary = false) {
  const sourcePool = allExams.flatMap((source, sourceIndex) => source.questions.map((question) => ({
    ...question,
    passage: question.section === 'Reading' ? source.passage : undefined,
    passageTitle: question.section === 'Reading' ? source.passageTitle : undefined,
    sourceIndex,
  }))).filter((question) => !(excludeTypedVocabulary && question.skillArea === 'Vocabulary' && question.kind === 'typed'));
  const unique = new Map<string, Question & { sourceIndex: number }>();
  for (const item of sourcePool) if (!unique.has(questionKey(item))) unique.set(questionKey(item), item);
  const priority = (items: (Question & { sourceIndex: number })[]) => [
    ...shuffled(items.filter((item) => !seenBefore.has(questionKey(item)))),
    ...shuffled(items.filter((item) => seenBefore.has(questionKey(item)))),
  ];
  const total = Math.max(1, exam.questions.length);
  const readingTarget = Math.max(exam.questions.some((item) => item.section === 'Reading') ? 1 : 0, Math.round(targetCount * exam.questions.filter((item) => item.section === 'Reading').length / total));
  const writingTarget = Math.round(targetCount * exam.questions.filter((item) => item.section === 'Writing').length / total);
  const languageTarget = Math.max(0, targetCount - readingTarget - writingTarget);
  const pool = [...unique.values()];
  const chosen: (Question & { sourceIndex: number })[] = [];
  const used = new Set<string>();
  const take = (item: Question & { sourceIndex: number }) => {
    const key = questionKey(item);
    if (used.has(key) || chosen.length >= targetCount) return false;
    used.add(key); chosen.push(item); return true;
  };

  const language = priority(pool.filter((item) => item.section === 'Language Focus'));
  const formats = ['mcq', 'true-false', 'typed', 'unscramble', 'cloze'];
  let languageCount = 0;
  while (languageCount < languageTarget) {
    let added = false;
    for (const format of formats) {
      const item = language.find((candidate) => !used.has(questionKey(candidate)) && questionFormat(candidate) === format);
      if (item && take(item)) { languageCount += 1; added = true; }
      if (languageCount >= languageTarget) break;
    }
    if (!added) break;
  }

  const readingGroups = new Map<string, (Question & { sourceIndex: number })[]>();
  for (const item of pool.filter((candidate) => candidate.section === 'Reading')) {
    const key = `${item.sourceIndex}|${item.passageTitle}|${item.passage}`;
    const group = readingGroups.get(key) ?? [];
    group.push(item); readingGroups.set(key, group);
  }
  const allReadingGroups = [...readingGroups.values()];
  const orderedGroups = [
    ...shuffled(allReadingGroups.filter((group) => group.some((item) => !seenBefore.has(questionKey(item))))),
    ...shuffled(allReadingGroups.filter((group) => group.every((item) => seenBefore.has(questionKey(item))))),
  ];
  let readingCount = 0;
  for (const group of orderedGroups) {
    if (readingCount >= readingTarget) break;
    const remainingRoom = targetCount - chosen.length - writingTarget;
    if (group.length > remainingRoom || (readingCount > 0 && readingCount + group.length > readingTarget)) continue;
    for (const item of group) if (take(item)) readingCount += 1;
  }

  for (const item of priority(pool.filter((candidate) => candidate.section === 'Writing'))) {
    if (chosen.filter((candidate) => candidate.section === 'Writing').length >= writingTarget) break;
    take(item);
  }
  for (const item of priority(pool)) {
    if (chosen.length >= targetCount) break;
    take(item);
  }

  const languageBlock = shuffled(chosen.filter((item) => item.section === 'Language Focus'));
  const readingBlock = chosen.filter((item) => item.section === 'Reading');
  const writingBlock = shuffled(chosen.filter((item) => item.section === 'Writing'));
  let arranged = [...languageBlock, ...readingBlock, ...writingBlock].slice(0, targetCount);
  if (pinnedKey) {
    const pinned = pool.find((item) => questionKey(item) === pinnedKey);
    if (pinned) arranged = [pinned, ...arranged.filter((item) => questionKey(item) !== pinnedKey)].slice(0, targetCount);
  }
  return distributeAnswers(arranged.map((item, index) => ({ ...item, id: index + 1 })), `mixed|${examIndex}|${targetCount}|${Date.now()}`);
}

function randomVocabulary(grade: GradeLevel): VocabularyItem[] {
  const pool = grade === 6 || grade === 7 || grade === 11 || grade === 12 ? extendedVocabulary[grade] : vocabularyByGrade[grade];
  return [...pool].sort(() => Math.random() - 0.5).slice(0, 3);
}

function formatTime(seconds: number) {
  const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
  const secs = (seconds % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
}

function readSeenQuestions() {
  try { return new Set(JSON.parse(window.localStorage.getItem('english-moet-seen-questions') ?? '[]') as string[]); }
  catch { return new Set<string>(); }
}

export default function Home() {
  const [grade, setGrade] = useState<GradeLevel>(8);
  const [mode, setMode] = useState<ExamMode>('practice');
  const [examIndex, setExamIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [drafts, setDrafts] = useState<Answers>({});
  const [lockedQuestion, setLockedQuestion] = useState<number | null>(null);
  const [hintOpen, setHintOpen] = useState(false);
  const [flagged, setFlagged] = useState<number[]>([]);
  const [secondsLeft, setSecondsLeft] = useState(60 * 60);
  const [submitted, setSubmitted] = useState(false);
  const [vocabulary, setVocabulary] = useState<VocabularyItem[]>([]);
  const [dictionary, setDictionary] = useState<DictionaryState | null>(null);
  const [wrongAttempts, setWrongAttempts] = useState<Record<number, number>>({});
  const [damage, setDamage] = useState(0);
  const [correctStreak, setCorrectStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [lockSeconds, setLockSeconds] = useState(0);
  const [aidInventory, setAidInventory] = useState<AidInventory>(STARTER_AID);
  const [aidOpen, setAidOpen] = useState(false);
  const [practiceCorrectCount, setPracticeCorrectCount] = useState(0);
  const [aidDropNotice, setAidDropNotice] = useState<AidKind | null>(null);
  const [hitPulse, setHitPulse] = useState(0);
  const [survivalStage, setSurvivalStage] = useState(0);
  const [stageCorrect, setStageCorrect] = useState(0);
  const [survivalLives, setSurvivalLives] = useState(5);
  const [chickenSpawns, setChickenSpawns] = useState<ChickenSpawn[]>([]);
  const [survivalEnded, setSurvivalEnded] = useState(false);
  const [survivalReason, setSurvivalReason] = useState<'time' | 'lives'>('lives');
  const [stageUpNotice, setStageUpNotice] = useState<string | null>(null);
  const [armorPoints, setArmorPoints] = useState(0);
  const [armorUnlocked, setArmorUnlocked] = useState(false);
  const [grenades, setGrenades] = useState(1);
  const [weapon, setWeapon] = useState<Weapon>('knife');
  const [foodSpawns, setFoodSpawns] = useState<FoodSpawn[]>([]);
  const [screenBlurred, setScreenBlurred] = useState(false);
  const [agentNotice, setAgentNotice] = useState(false);
  const [pencilUnlocked, setPencilUnlocked] = useState(false);
  const [pencilCharges, setPencilCharges] = useState(0);
  const [seenAtSelection, setSeenAtSelection] = useState<Set<string>>(new Set());
  const [hubPanel, setHubPanel] = useState<HubPanel>(null);
  const [flagVault, setFlagVault] = useState<FlagEntry[]>([]);
  const [wrongBook, setWrongBook] = useState<WrongEntry[]>([]);
  const [dailyStats, setDailyStats] = useState<DailyStats>({ date: new Date().toISOString().slice(0, 10), correct: 0, flags: 0, completed: 0 });
  const [duckCoins, setDuckCoins] = useState(0);
  const [completedExamKeys, setCompletedExamKeys] = useState<string[]>([]);
  const [effectLevel, setEffectLevel] = useState<EffectLevel>('full');
  const [storageReady, setStorageReady] = useState(false);
  const [focusQuestionKey, setFocusQuestionKey] = useState<string | null>(null);
  const [vocabHintSteps, setVocabHintSteps] = useState<Record<string, number>>({});
  const [bossPenalty, setBossPenalty] = useState<BossPenalty | null>(null);
  const [ownedLoadout, setOwnedLoadout] = useState<string[]>([]);
  const [equippedLoadout, setEquippedLoadout] = useState<Loadout>(STARTER_LOADOUT);
  const availableExams = examsByGrade[grade];
  const exam = availableExams[examIndex];
  const selectedUnit = unitNumber(exam, grade);
  const unitLesson = exam.menuGroup === 'unit' && selectedUnit
    ? grade === 6 || grade === 7 || grade === 11 || grade === 12
      ? extendedGrammarLessons[grade][selectedUnit]
      : grade === 8 ? grammarLessons8[selectedUnit] : grade === 9 ? grammarLessons9[selectedUnit] : grammarLessons10[selectedUnit]
    : undefined;
  const questions = useMemo(() => buildMixedQuestions(exam, availableExams, examIndex, mode === 'practice' ? exam.questions.length : 40, seenAtSelection, focusQuestionKey, mode === 'test'), [availableExams, exam, examIndex, focusQuestionKey, mode, seenAtSelection]);
  const question = questions[questionIndex];
  const selected = drafts[question.id] ?? answers[question.id];
  const displayQuestion = useMemo<Question>(() => bossPenalty?.kind === 'extra-options' && question.kind !== 'typed' && question.kind !== 'cloze-dropdown' && question.options.length >= 2
    ? { ...question, options: [...question.options, 'Both A and B', 'Not enough information'] }
    : question, [bossPenalty?.kind, question]);

  const score = useMemo(() => questions.filter((item) => isQuestionCorrect(item, answers[item.id])).length, [answers, questions]);
  const answeredCount = questions.filter((item) => isAnswerComplete(item, answers[item.id])).length;
  const canSubmit = answeredCount === questions.length;
  const maxDamage = Math.max(1, Math.ceil(questions.length * 0.2));
  const damagePercent = Math.min(100, Math.round((damage / maxDamage) * 100));
  const gameOver = mode === 'practice' && damage >= maxDamage;
  const commandoUnlocked = mode === 'practice' && canSubmit && score === questions.length;
  const rankIndex = commandoUnlocked ? 4 : correctStreak >= 40 ? 3 : correctStreak >= 30 ? 2 : correctStreak >= 20 ? 1 : correctStreak >= 10 ? 0 : -1;
  const rankName = commandoUnlocked ? 'Vịt Commando' : rankIndex >= 0 ? COMMANDO_RANKS[rankIndex].name : 'Vịt Tân Binh';
  const isBossStage = mode === 'survival' && survivalStage % 7 === 6;
  const vehicleIndex = Math.min(survivalStage % 7, SURVIVAL_STAGES.length - 1);
  const stageName = isBossStage ? 'Màn Boss Gà Khổng Lồ' : SURVIVAL_STAGES[vehicleIndex];
  const survivalGameOver = mode === 'survival' && survivalEnded;
  const nextAidMilestone = Math.max(5, Math.ceil((practiceCorrectCount + 1) / 5) * 5);
  const currentFlagged = flagVault.some((item) => item.key === questionKey(question));
  const dailyMissions = [
    { label: 'Đúng 10 câu', value: dailyStats.correct, target: 10, icon: '🎯' },
    { label: 'Cắm 3 lá cờ', value: dailyStats.flags, target: 3, icon: '🚩' },
    { label: 'Hoàn thành 1 bài', value: dailyStats.completed, target: 1, icon: '🏆' },
  ];
  const dailyDone = dailyMissions.filter((item) => item.value >= item.target).length;
  const vocabHintAnswer = question.skillArea === 'Vocabulary' && question.kind === 'typed'
    ? String(Array.isArray(question.answer) ? question.answer[0] ?? '' : question.answer)
    : '';
  const vocabHintStep = vocabHintSteps[questionKey(question)] ?? 0;
  const vocabHintText = vocabHintAnswer
    ? [...vocabHintAnswer].map((character, index) => /[a-z]/i.test(character) ? index < vocabHintStep ? character : '_' : character).join(' ')
    : '';
  const currentWrongAttempt = wrongAttempts[question.id] ?? 1;

  useEffect(() => {
    try {
      const stored = JSON.parse(window.localStorage.getItem('english-moet-seen-questions') ?? '[]') as string[];
      setSeenAtSelection(new Set(stored));
    } catch { /* localStorage is optional */ }
  }, []);

  useEffect(() => {
    try {
      const today = new Date().toISOString().slice(0, 10);
      const storedDaily = JSON.parse(window.localStorage.getItem('english-moet-daily') ?? 'null') as DailyStats | null;
      setFlagVault(JSON.parse(window.localStorage.getItem('english-moet-flag-vault') ?? '[]') as FlagEntry[]);
      setWrongBook(JSON.parse(window.localStorage.getItem('english-moet-wrong-book') ?? '[]') as WrongEntry[]);
      setCompletedExamKeys(JSON.parse(window.localStorage.getItem('english-moet-completed') ?? '[]') as string[]);
      setDuckCoins(Number(window.localStorage.getItem('english-moet-coins') ?? 0));
      setEffectLevel((window.localStorage.getItem('english-moet-effects') as EffectLevel | null) ?? 'full');
      setOwnedLoadout(JSON.parse(window.localStorage.getItem('english-moet-owned-loadout') ?? '[]') as string[]);
      setEquippedLoadout({ ...STARTER_LOADOUT, ...JSON.parse(window.localStorage.getItem('english-moet-equipped-loadout') ?? '{}') as Partial<Loadout> });
      setDailyStats(storedDaily?.date === today ? storedDaily : { date: today, correct: 0, flags: 0, completed: 0 });
    } catch { /* localStorage is optional */ }
    setStorageReady(true);
  }, []);

  useEffect(() => {
    if (!storageReady) return;
    try {
      window.localStorage.setItem('english-moet-flag-vault', JSON.stringify(flagVault));
      window.localStorage.setItem('english-moet-wrong-book', JSON.stringify(wrongBook));
      window.localStorage.setItem('english-moet-completed', JSON.stringify(completedExamKeys));
      window.localStorage.setItem('english-moet-coins', String(duckCoins));
      window.localStorage.setItem('english-moet-effects', effectLevel);
      window.localStorage.setItem('english-moet-daily', JSON.stringify(dailyStats));
      window.localStorage.setItem('english-moet-owned-loadout', JSON.stringify(ownedLoadout));
      window.localStorage.setItem('english-moet-equipped-loadout', JSON.stringify(equippedLoadout));
    } catch { /* localStorage is optional */ }
  }, [completedExamKeys, dailyStats, duckCoins, effectLevel, equippedLoadout, flagVault, ownedLoadout, storageReady, wrongBook]);

  useEffect(() => {
    if (!question) return;
    try {
      const stored = JSON.parse(window.localStorage.getItem('english-moet-seen-questions') ?? '[]') as string[];
      const updated = [...new Set([...stored, questionKey(question)])].slice(-2500);
      window.localStorage.setItem('english-moet-seen-questions', JSON.stringify(updated));
    } catch { /* localStorage is optional */ }
  }, [question]);

  useEffect(() => {
    if (!focusQuestionKey) return;
    const focusedIndex = questions.findIndex((item) => questionKey(item) === focusQuestionKey);
    if (focusedIndex >= 0) setQuestionIndex(focusedIndex);
  }, [focusQuestionKey, questions]);

  useEffect(() => {
    if ((mode !== 'test' && mode !== 'survival') || submitted || survivalEnded || secondsLeft <= 0) return;
    const timer = window.setInterval(() => setSecondsLeft((value) => Math.max(0, value - 1)), 1000);
    return () => window.clearInterval(timer);
  }, [mode, secondsLeft, submitted, survivalEnded]);

  useEffect(() => {
    if (mode === 'survival' && secondsLeft === 0 && !survivalEnded) {
      setSurvivalReason('time');
      setSurvivalEnded(true);
    }
  }, [mode, secondsLeft, survivalEnded]);

  useEffect(() => {
    if (!stageUpNotice) return;
    const timer = window.setTimeout(() => setStageUpNotice(null), 1800);
    return () => window.clearTimeout(timer);
  }, [stageUpNotice]);

  useEffect(() => {
    if (!aidDropNotice) return;
    const timer = window.setTimeout(() => setAidDropNotice(null), 2400);
    return () => window.clearTimeout(timer);
  }, [aidDropNotice]);

  useEffect(() => {
    if (lockSeconds <= 0) return;
    const timer = window.setInterval(() => setLockSeconds((value) => Math.max(0, value - 1)), 1000);
    return () => window.clearInterval(timer);
  }, [lockSeconds]);

  useEffect(() => {
    if (!bossPenalty || bossPenalty.seconds <= 0) return;
    const timer = window.setInterval(() => setBossPenalty((current) => current && current.seconds > 1 ? { ...current, seconds: current.seconds - 1 } : null), 1000);
    return () => window.clearInterval(timer);
  }, [bossPenalty]);

  useEffect(() => {
    if (bossPenalty?.kind !== 'keyboard') return;
    const blockKeyboard = (event: KeyboardEvent) => { event.preventDefault(); event.stopPropagation(); };
    window.addEventListener('keydown', blockKeyboard, true);
    return () => window.removeEventListener('keydown', blockKeyboard, true);
  }, [bossPenalty?.kind]);

  useEffect(() => {
    setVocabulary(randomVocabulary(grade));
  }, [grade, examIndex]);

  const selectExam = useCallback((index: number) => {
    setSeenAtSelection(readSeenQuestions());
    setFocusQuestionKey(null);
    setExamIndex(index);
    setQuestionIndex(0);
    setAnswers({});
    setDrafts({});
    setLockedQuestion(null);
    setHintOpen(false);
    setFlagged([]);
    setSubmitted(false);
    setSecondsLeft(mode === 'survival' ? 2 * 60 : 60 * 60);
    setDictionary(null);
    setWrongAttempts({});
    setDamage(0);
    setCorrectStreak(0);
    setBestStreak(0);
    setLockSeconds(0);
    setAidInventory(STARTER_AID);
    setAidOpen(false);
    setPracticeCorrectCount(0);
    setAidDropNotice(null);
    setHitPulse(0);
    setSurvivalStage(0);
    setStageCorrect(0);
    setSurvivalLives(5);
    setChickenSpawns([]);
    setSurvivalEnded(false);
    setStageUpNotice(null);
    setGrenades(1);
    setWeapon('knife');
    setFoodSpawns([]);
    setScreenBlurred(false);
    setAgentNotice(false);
    setVocabHintSteps({});
    setBossPenalty(null);
  }, [mode]);

  const switchGrade = (nextGrade: GradeLevel) => {
    setSeenAtSelection(readSeenQuestions());
    setFocusQuestionKey(null);
    setGrade(nextGrade);
    setExamIndex(0);
    setQuestionIndex(0);
    setAnswers({});
    setDrafts({});
    setLockedQuestion(null);
    setHintOpen(false);
    setFlagged([]);
    setSubmitted(false);
    setSecondsLeft(mode === 'survival' ? 2 * 60 : 60 * 60);
    setDictionary(null);
    setWrongAttempts({});
    setDamage(0);
    setCorrectStreak(0);
    setBestStreak(0);
    setLockSeconds(0);
    setAidInventory(STARTER_AID);
    setAidOpen(false);
    setPracticeCorrectCount(0);
    setAidDropNotice(null);
    setHitPulse(0);
    setSurvivalStage(0);
    setStageCorrect(0);
    setSurvivalLives(5);
    setChickenSpawns([]);
    setSurvivalEnded(false);
    setStageUpNotice(null);
    setGrenades(1);
    setWeapon('knife');
    setFoodSpawns([]);
    setScreenBlurred(false);
    setAgentNotice(false);
    setVocabHintSteps({});
    setBossPenalty(null);
  };

  const switchMode = (nextMode: ExamMode) => {
    setSeenAtSelection(readSeenQuestions());
    setFocusQuestionKey(null);
    setMode(nextMode);
    setQuestionIndex(0);
    setAnswers({});
    setDrafts({});
    setLockedQuestion(null);
    setHintOpen(false);
    setFlagged([]);
    setSubmitted(false);
    setSecondsLeft(nextMode === 'survival' ? 2 * 60 : 60 * 60);
    setDictionary(null);
    setWrongAttempts({});
    setDamage(0);
    setCorrectStreak(0);
    setBestStreak(0);
    setLockSeconds(0);
    setAidInventory(STARTER_AID);
    setAidOpen(false);
    setPracticeCorrectCount(0);
    setAidDropNotice(null);
    setHitPulse(0);
    setSurvivalStage(0);
    setStageCorrect(0);
    setSurvivalLives(5);
    setChickenSpawns([]);
    setSurvivalEnded(false);
    setStageUpNotice(null);
    setGrenades(1);
    setWeapon('knife');
    setFoodSpawns([]);
    setScreenBlurred(false);
    setAgentNotice(false);
    setVocabHintSteps({});
    setBossPenalty(null);
  };

  const recordCorrect = useCallback(() => {
    setDailyStats((current) => ({ ...current, correct: current.correct + 1 }));
    setDuckCoins((current) => current + 1);
    setCorrectStreak((current) => {
      const next = current + 1;
      setBestStreak((best) => Math.max(best, next));
      return next;
    });
    if (mode === 'practice') {
      setPracticeCorrectCount((current) => {
        const next = current + 1;
        if (next >= 5 && next % 5 === 0) {
          const dropped = rollAidDrop(next);
          setAidInventory((inventory) => ({ ...inventory, [dropped]: inventory[dropped] + 1 }));
          setAidDropNotice(dropped);
        }
        return next;
      });
    }
  }, [mode]);

  const recordWrong = useCallback((wrongQuestion: Question) => {
    const questionId = wrongQuestion.id;
    const attempt = (wrongAttempts[questionId] ?? 0) + 1;
    const key = questionKey(wrongQuestion);
    setWrongAttempts((current) => ({ ...current, [questionId]: attempt }));
    setWrongBook((current) => {
      const existing = current.find((item) => item.key === key);
      const entry: WrongEntry = { key, grade, examId: exam.id, examTitle: exam.title, prompt: wrongQuestion.prompt, section: wrongQuestion.section, savedAt: Date.now(), mistakes: (existing?.mistakes ?? 0) + 1 };
      return [entry, ...current.filter((item) => item.key !== key)].slice(0, 100);
    });
    setArmorPoints((current) => {
      if (current > 0) return current - 1;
      setDamage((damageNow) => damageNow + 1);
      return 0;
    });
    setHitPulse((current) => current + 1);
    if (typeof document !== 'undefined' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.documentElement.animate([
        { transform: 'translate3d(0,0,0)' },
        { transform: 'translate3d(-9px,4px,0)' },
        { transform: 'translate3d(8px,-5px,0)' },
        { transform: 'translate3d(-5px,3px,0)' },
        { transform: 'translate3d(0,0,0)' },
      ], { duration: 420, easing: 'cubic-bezier(.36,.07,.19,.97)' });
    }
    setCorrectStreak(0);
    setLockedQuestion(questionId);
    setLockSeconds(attempt === 1 ? 0 : attempt === 2 ? 10 : 20);
    setHintOpen(true);
  }, [exam.id, exam.title, grade, wrongAttempts]);

  const advanceSurvivalQuestion = useCallback(() => {
    setQuestionIndex((current) => (current + 1) % questions.length);
  }, [questions.length]);

  const defeatChickens = useCallback((amount: number, forcedKind?: FoodKind) => {
    setChickenSpawns((current) => {
      if (current.length === 0) return current;
      const removeIds = new Set(shuffled(current).slice(0, amount).map((item) => item.id));
      const removed = current.filter((item) => removeIds.has(item.id));
      const drops: FoodSpawn[] = removed.map((item, index) => ({
        ...item,
        id: Date.now() + index,
        kind: forcedKind ?? (['roast', 'grilled', 'fried', 'rice'] as FoodKind[])[Math.floor(Math.random() * 4)],
      }));
      if (drops.length > 0) {
        setFoodSpawns((existing) => [...existing, ...drops].slice(-30));
        const dropIds = new Set(drops.map((item) => item.id));
        window.setTimeout(() => setFoodSpawns((existing) => existing.filter((item) => !dropIds.has(item.id))), 3000);
      }
      return current.filter((item) => !removeIds.has(item.id));
    });
  }, []);

  const useGrenade = useCallback(() => {
    if (mode !== 'survival' || grenades <= 0 || chickenSpawns.length === 0) return;
    setGrenades((value) => value - 1);
    defeatChickens(Math.min(8, Math.max(2, Math.ceil(chickenSpawns.length / 2))));
    setScreenBlurred(true);
    window.setTimeout(() => setScreenBlurred(false), 4000);
  }, [chickenSpawns.length, defeatChickens, grenades, mode]);

  const usePencil = useCallback(() => {
    if (mode !== 'survival' || !pencilUnlocked || pencilCharges <= 0 || chickenSpawns.length === 0) return;
    setPencilCharges((value) => value - 1);
    defeatChickens(chickenSpawns.length);
    setAgentNotice(true);
    window.setTimeout(() => setAgentNotice(false), 3000);
  }, [chickenSpawns.length, defeatChickens, mode, pencilCharges, pencilUnlocked]);

  const recordSurvivalCorrect = useCallback(() => {
    recordCorrect();
    if (weapon === 'knife') defeatChickens(1, 'plucked');
    setStageCorrect((current) => {
      const next = current + 1;
      if (next < SURVIVAL_TARGET) return next;
      setSurvivalStage((stage) => {
        const upgraded = stage + 1;
        setSurvivalLives(upgraded % 7 === 6 ? 3 : 5);
        setStageUpNotice(upgraded % 7 === 6 ? 'Boss Gà Khổng Lồ · Chỉ có 3 máu!' : `${SURVIVAL_STAGES[Math.min(upgraded % 7, SURVIVAL_STAGES.length - 1)]} · +01:00`);
        return upgraded;
      });
      setSecondsLeft((time) => time + 60);
      setGrenades((value) => value + 1);
      setChickenSpawns([]);
      setAnswers({});
      setDrafts({});
      return 0;
    });
    advanceSurvivalQuestion();
  }, [advanceSurvivalQuestion, defeatChickens, recordCorrect, weapon]);

  const triggerBossPenalty = useCallback(() => {
    const kinds: BossPenaltyKind[] = ['keyboard', 'extra-options', 'one-hp', 'screen-lock', 'duck-salad', 'duck-porridge', 'plucked-duck', 'peking-duck', 'duck-bamboo'];
    const kind = kinds[Math.floor(Math.random() * kinds.length)];
    if (kind === 'one-hp') {
      setBossPenalty({ kind, seconds: 3, label: 'Boss ép máu còn 1!' });
      return kind;
    }
    if (kind === 'keyboard') {
      setBossPenalty({ kind, seconds: 6, label: 'Khóa bàn phím!' });
      return kind;
    }
    if (kind === 'extra-options') {
      setBossPenalty({ kind, seconds: 15, label: 'Đáp án nhiễu: +2 lựa chọn!' });
      return kind;
    }
    if (kind === 'screen-lock') {
      setBossPenalty({ kind, seconds: 5, label: 'Boss khóa màn hình!' });
      return kind;
    }
    const food = BOSS_FOOD_EFFECTS[kind];
    setBossPenalty({ kind, seconds: 3, label: food.label, asset: food.asset });
    return kind;
  }, []);

  const recordSurvivalWrong = useCallback(() => {
    const wrongQuestion = questions[questionIndex];
    if (wrongQuestion) {
      const key = questionKey(wrongQuestion);
      setWrongBook((current) => {
        const existing = current.find((item) => item.key === key);
        const entry: WrongEntry = { key, grade, examId: exam.id, examTitle: exam.title, prompt: wrongQuestion.prompt, section: wrongQuestion.section, savedAt: Date.now(), mistakes: (existing?.mistakes ?? 0) + 1 };
        return [entry, ...current.filter((item) => item.key !== key)].slice(0, 100);
      });
    }
    setCorrectStreak(0);
    const bossEffect = isBossStage ? triggerBossPenalty() : null;
    setHitPulse((current) => current + 1);
    if (typeof document !== 'undefined' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.documentElement.animate([
        { transform: 'translate3d(0,0,0)' },
        { transform: 'translate3d(-11px,5px,0)' },
        { transform: 'translate3d(10px,-6px,0)' },
        { transform: 'translate3d(-6px,3px,0)' },
        { transform: 'translate3d(0,0,0)' },
      ], { duration: 430, easing: 'cubic-bezier(.36,.07,.19,.97)' });
    }
    setChickenSpawns((current) => {
      const amount = isBossStage ? 3 : 5;
      const created = Array.from({ length: amount }, (_, index) => ({
        id: Date.now() + index,
        x: 4 + Math.random() * 86,
        y: 8 + Math.random() * 76,
        size: 64 + Math.random() * 70,
        rotate: -22 + Math.random() * 44,
        delay: Math.random() * 0.35,
      }));
      return [...current, ...created].slice(-32);
    });
    setSurvivalLives((lives) => {
      if (bossEffect === 'one-hp') return 1;
      const next = lives - 1;
      if (next <= 0) {
        setSurvivalReason('lives');
        setSurvivalEnded(true);
      }
      return Math.max(0, next);
    });
    setDrafts({});
    advanceSurvivalQuestion();
  }, [advanceSurvivalQuestion, exam.id, exam.title, grade, isBossStage, questionIndex, questions, triggerBossPenalty]);

  const chooseAnswer = useCallback((value: AnswerValue) => {
    const currentQuestion = questions[questionIndex];
    if (gameOver || survivalGameOver || lockedQuestion === currentQuestion.id || (mode === 'practice' && answers[currentQuestion.id] !== undefined)) return;
    if (mode === 'test') {
      setAnswers((current) => ({ ...current, [currentQuestion.id]: value }));
      setDrafts((current) => ({ ...current, [currentQuestion.id]: value }));
      return;
    }
    if (mode === 'survival') {
      setDrafts((current) => ({ ...current, [currentQuestion.id]: value }));
      if (typeof value !== 'number') return;
      if (isQuestionCorrect(currentQuestion, value)) recordSurvivalCorrect();
      else recordSurvivalWrong();
      return;
    }
    setDrafts((current) => ({ ...current, [currentQuestion.id]: value }));
    if (typeof value !== 'number') return;
    if (isQuestionCorrect(currentQuestion, value)) {
      setAnswers((current) => ({ ...current, [currentQuestion.id]: value }));
      recordCorrect();
    } else {
      recordWrong(currentQuestion);
    }
  }, [answers, gameOver, lockedQuestion, mode, questionIndex, questions, recordCorrect, recordSurvivalCorrect, recordSurvivalWrong, recordWrong, survivalGameOver]);

  const checkTypedAnswer = useCallback(() => {
    const currentQuestion = questions[questionIndex];
    const value = drafts[currentQuestion.id];
    if (gameOver || survivalGameOver || !isAnswerComplete(currentQuestion, value)) return;
    if (mode === 'survival') {
      if (isQuestionCorrect(currentQuestion, value)) recordSurvivalCorrect();
      else recordSurvivalWrong();
      return;
    }
    if (mode === 'test' || isQuestionCorrect(currentQuestion, value)) {
      setAnswers((current) => ({ ...current, [currentQuestion.id]: value }));
      if (mode === 'practice') recordCorrect();
    } else {
      recordWrong(currentQuestion);
    }
  }, [drafts, gameOver, mode, questionIndex, questions, recordCorrect, recordSurvivalCorrect, recordSurvivalWrong, recordWrong, survivalGameOver]);

  const retryAfterHint = () => {
    if (lockedQuestion === null || lockSeconds > 0) return;
    setDrafts((current) => { const next = { ...current }; delete next[lockedQuestion]; return next; });
    setLockedQuestion(null);
    setHintOpen(false);
  };

  const consumeAid = (kind: AidKind) => {
    const item = AID_ITEMS.find((entry) => entry.kind === kind);
    if (!item || aidInventory[kind] <= 0 || damage <= 0 || gameOver) return;
    setAidInventory((current) => ({ ...current, [kind]: current[kind] - 1 }));
    setDamage((current) => Math.max(0, current - item.heal));
    setAidOpen(false);
  };

  const submitExam = () => {
    if (!canSubmit) return;
    const completionKey = `${grade}-${exam.id}`;
    setCompletedExamKeys((current) => {
      if (current.includes(completionKey)) return current;
      setDuckCoins((coinsNow) => coinsNow + 20);
      return [...current, completionKey];
    });
    setDailyStats((current) => ({ ...current, completed: current.completed + 1 }));
    if (mode === 'practice' && score === questions.length) {
      setArmorUnlocked(true);
      setArmorPoints(5);
    }
    if (mode === 'test' && score === questions.length) {
      setPencilUnlocked(true);
      setPencilCharges(1);
    }
    setSubmitted(true);
  };

  const openDictionary = async (event: ReactMouseEvent<HTMLElement>) => {
    if (mode !== 'practice') return;
    event.preventDefault();
    const selectedText = window.getSelection()?.toString().trim().replace(/\s+/g, ' ') ?? '';
    const x = Math.min(event.clientX, window.innerWidth - 300);
    const y = Math.min(event.clientY, window.innerHeight - 190);
    if (!selectedText || selectedText.length > 120 || !/[a-zA-Z]/.test(selectedText)) {
      setDictionary({ word: '', translation: 'Hãy bôi đen một từ hoặc cụm từ tiếng Anh, sau đó nhấp chuột phải.', status: 'empty', x, y });
      return;
    }
    setDictionary({ word: selectedText, translation: 'Đang tra nghĩa…', status: 'loading', x, y });
    try {
      const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(selectedText)}&langpair=en|vi`);
      if (!response.ok) throw new Error('Translation failed');
      const data = await response.json() as { responseData?: { translatedText?: string } };
      const translation = data.responseData?.translatedText?.trim();
      if (!translation) throw new Error('No translation');
      setDictionary({ word: selectedText, translation, status: 'ready', x, y });
    } catch {
      setDictionary({ word: selectedText, translation: 'Chưa tra được nghĩa. Hãy kiểm tra kết nối mạng và thử lại.', status: 'error', x, y });
    }
  };

  useEffect(() => {
    const context = (document as Document & { modelContext?: ModelContext }).modelContext;
    if (!context?.registerTool) return;
    const lifecycle = new AbortController();
    const report = () => undefined;
    try {
      void Promise.resolve(context.registerTool({
        name: 'select_exam',
        title: 'Chọn đề luyện tập',
        description: `Mở một đề trong bộ Tiếng Anh ${grade} hiện tại và đặt lại lượt làm bài.`,
        inputSchema: { type: 'object', properties: { examNumber: { type: 'integer', minimum: 1, maximum: availableExams.length } }, required: ['examNumber'], additionalProperties: false },
        annotations: { readOnlyHint: false, untrustedContentHint: false },
        execute(input: unknown) {
          const value = (input as { examNumber?: number }).examNumber;
          if (!Number.isInteger(value) || !value || value < 1 || value > availableExams.length) throw new Error(`examNumber must be an integer from 1 to ${availableExams.length}`);
          selectExam(value - 1);
          return { examNumber: value, status: 'ready' };
        },
      }, { signal: lifecycle.signal })).catch(report);
      void Promise.resolve(context.registerTool({
        name: 'answer_current_question',
        title: 'Trả lời câu hiện tại',
        description: 'Chọn đáp án theo số thứ tự cho câu trắc nghiệm đang hiển thị.',
        inputSchema: { type: 'object', properties: { optionNumber: { type: 'integer', minimum: 1, maximum: 4 } }, required: ['optionNumber'], additionalProperties: false },
        annotations: { readOnlyHint: false, untrustedContentHint: false },
        execute(input: unknown) {
          if (question.kind === 'typed' || question.kind === 'cloze-dropdown' || typeof question.answer !== 'number') throw new Error('Câu này cần nhập trực tiếp trên biểu mẫu.');
          const value = (input as { optionNumber?: number }).optionNumber;
          if (!Number.isInteger(value) || !value || value < 1 || value > question.options.length) throw new Error(`optionNumber must be from 1 to ${question.options.length}`);
          chooseAnswer(value - 1);
          return mode === 'practice'
            ? { question: question.id, correct: value - 1 === question.answer, status: value - 1 === question.answer ? 'completed' : 'retry' }
            : { question: question.id, status: 'recorded' };
        },
      }, { signal: lifecycle.signal })).catch(report);
    } catch { report(); }
    return () => lifecycle.abort();
  }, [availableExams.length, chooseAnswer, grade, mode, question, selectExam]);

  const resetExam = () => selectExam(examIndex);
  const toggleFlag = () => {
    const key = questionKey(question);
    if (currentFlagged) {
      setFlagVault((items) => items.filter((item) => item.key !== key));
      setFlagged((items) => items.filter((id) => id !== question.id));
      return;
    }
    const entry: FlagEntry = { key, grade, examId: exam.id, examTitle: exam.title, prompt: question.prompt, section: question.section, savedAt: Date.now() };
    setFlagVault((items) => [entry, ...items.filter((item) => item.key !== key)].slice(0, 120));
    setFlagged((items) => items.includes(question.id) ? items : [...items, question.id]);
    setDailyStats((current) => ({ ...current, flags: current.flags + 1 }));
    setDuckCoins((current) => current + 2);
  };

  const buyLoadoutItem = (item: LoadoutItem) => {
    if (ownedLoadout.includes(item.id) || duckCoins < item.price) return;
    setDuckCoins((current) => current - item.price);
    setOwnedLoadout((current) => [...current, item.id]);
  };

  const equipLoadoutItem = (item: LoadoutItem) => {
    if (!ownedLoadout.includes(item.id)) return;
    setEquippedLoadout((current) => ({ ...current, [item.slot]: current[item.slot] === item.id ? null : item.id }));
  };

  const openSavedEntry = (entry: FlagEntry | WrongEntry) => {
    const targetExams = examsByGrade[entry.grade];
    const targetIndex = Math.max(0, targetExams.findIndex((item) => item.id === entry.examId));
    switchGrade(entry.grade);
    setMode('practice');
    setExamIndex(targetIndex);
    setFocusQuestionKey(entry.key);
    setHubPanel(null);
  };

  const openJourneyStage = (group: MenuGroup | 'survival') => {
    if (group === 'survival') {
      switchMode('survival');
      setHubPanel(null);
      return;
    }
    const targetIndex = availableExams.findIndex((item) => item.menuGroup === group);
    if (targetIndex >= 0) selectExam(targetIndex);
    setHubPanel(null);
  };

  const renderExamButton = (item: (typeof availableExams)[number], index: number) => (
    <button key={item.id} onClick={() => selectExam(index)} className={`group rounded-2xl px-3 py-2.5 text-left transition ${index === examIndex ? 'bg-sky-600 text-white shadow-md shadow-sky-100' : 'bg-sky-50 text-[#15324a] hover:bg-sky-100'}`}>
      <span className="block font-bold">{item.menuLabel ?? `Đề số ${item.id}`}</span>
      {item.bookLabel && <span className={`mt-1 inline-flex rounded-full px-2 py-0.5 text-[11px] font-bold ${index === examIndex ? 'bg-white/20 text-white' : item.bookLabel === 'Bộ mới' ? 'bg-amber-100 text-amber-800' : 'bg-white text-slate-500'}`}>{item.bookLabel}</span>}
    </button>
  );

  const menuGroups: [MenuGroup, string][] = [
    ['unit', 'Học theo Unit'],
    ['review', 'Ôn tập'],
    ...(grade === 9 ? [['survey', 'Khảo sát đầu năm'] as [MenuGroup, string]] : []),
    ['midterm', 'Đề giữa kỳ I'],
    ['final', 'Đề cuối kỳ I'],
    ['midterm2', 'Đề giữa kỳ II'],
    ['final2', 'Đề cuối kỳ II'],
  ];

  const examMenu = (
    <div>
      <p className="mb-3 text-xs font-bold uppercase tracking-[.16em] text-sky-700">Nội dung · English {grade}</p>
      <nav className="grid gap-3">
        {menuGroups.map(([group, label]) => {
          const groupItems = availableExams
            .map((item, index) => ({ item, index }))
            .filter(({ item }) => item.menuGroup === group);

          if (groupItems.length === 0) return null;

          return <details key={`${grade}-${group}`} className="group overflow-hidden rounded-2xl border border-sky-100 bg-white shadow-sm">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 bg-sky-50 px-3 py-3 font-bold text-sky-900 transition hover:bg-sky-100 [&::-webkit-details-marker]:hidden">
              <span>{label}</span>
              <span className="flex shrink-0 items-center gap-2">
                <span className="rounded-full bg-white px-2 py-0.5 text-xs font-bold text-sky-700">{groupItems.length}</span>
                <ChevronDown className="size-4 transition-transform group-open:rotate-180" aria-hidden="true" />
              </span>
            </summary>
            <div className="grid gap-2 border-t border-sky-100 p-2">
              {groupItems.map(({ item, index }) => renderExamButton(item, index))}
            </div>
          </details>;
        })}
      </nav>
    </div>
  );

  return (
    <main className={`min-h-screen bg-[#f7fbff] text-[#15324a] effects-${effectLevel}`}>
      <header className="sticky top-0 z-30 border-b border-sky-100 bg-white/92 px-4 py-3 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <img src={grade === 8 ? 'duck-grade8-reading.png' : grade === 9 ? 'duck-grade9-explorer.png' : 'duck-learn.png'} alt={`Mascot vịt vàng English ${grade}`} className="h-12 w-12 rounded-xl object-cover object-top" />
            <div><strong className="block text-lg leading-tight">English MOET</strong><span className="hidden text-sm text-slate-500 sm:block">English {grade} · Học chắc, luyện đúng dạng</span></div>
          </div>
          <div className="flex max-w-[58vw] overflow-x-auto rounded-2xl border border-sky-100 bg-sky-50 p-1 sm:max-w-[68vw]" aria-label="Chọn khối lớp">
            {([6, 7, 8, 9, 10, 11, 12] as GradeLevel[]).map((item) => <button key={item} onClick={() => switchGrade(item)} className={`shrink-0 rounded-xl px-2 py-2 text-xs font-extrabold transition sm:px-3 sm:text-sm ${grade === item ? 'bg-sky-600 text-white shadow-sm' : 'text-sky-800 hover:bg-white'}`} aria-pressed={grade === item}>English {item}</button>)}
          </div>
          <span className="hidden rounded-full bg-amber-100 px-3 py-1.5 text-sm font-semibold text-amber-800 xl:inline">{availableExams.length} mục học · {availableExams.reduce((total, item) => total + item.questions.length, 0)} câu</span>
          <Sheet><SheetTrigger render={<Button variant="outline" size="icon" className="lg:hidden" aria-label="Mở danh sách đề" />}><Menu /></SheetTrigger><SheetContent side="left"><SheetTitle className="mb-5">Chọn đề</SheetTitle>{examMenu}</SheetContent></Sheet>
        </div>
      </header>

      <section id="journey-map" className="relative isolate min-h-[330px] overflow-hidden border-b-4 border-cyan-200 bg-sky-900 shadow-inner sm:min-h-[430px]" aria-label={`Bản đồ các chặng English ${grade}`}>
        <img src="learning-journey-map-v1.png" alt="" className="absolute inset-0 -z-20 h-full w-full object-cover"/>
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-sky-950/10 via-transparent to-sky-950/55"/>
        <div className="mx-auto flex max-w-6xl items-start justify-between gap-4 px-5 pt-5 text-white"><div className="rounded-2xl bg-slate-950/75 px-5 py-3 shadow-xl backdrop-blur-sm"><p className="text-xs font-black uppercase tracking-[.2em] text-cyan-300">Learning Journey</p><h1 className="text-2xl font-black">Chọn chặng English {grade}</h1><p className="mt-1 text-sm text-sky-100">Bấm trực tiếp vào một điểm trên bản đồ để bắt đầu.</p></div><div className="rounded-full bg-amber-300 px-4 py-2 font-black text-amber-950 shadow-lg">🪙 {duckCoins}</div></div>
        {JOURNEY_STAGES.map((stage) => { const stageExams = stage.group === 'survival' ? [] : availableExams.filter((item) => item.menuGroup === stage.group); const completed = stage.group === 'survival' ? (survivalStage > 0 ? 1 : 0) : stageExams.filter((item) => completedExamKeys.includes(`${grade}-${item.id}`)).length; const total = stage.group === 'survival' ? 1 : stageExams.length; return <button key={stage.group} onClick={() => openJourneyStage(stage.group)} disabled={stage.group !== 'survival' && total === 0} className={`journey-node absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-4 p-1 text-center shadow-2xl transition hover:scale-110 focus-visible:outline-4 focus-visible:outline-white disabled:opacity-35 ${completed >= total && total > 0 ? 'border-emerald-200 bg-emerald-600 text-white' : 'border-amber-300 bg-white text-sky-950'}`} style={{ left: `${stage.position[0]}%`, top: `${stage.position[1]}%` }}><span className="block text-2xl sm:text-3xl">{completed >= total && total > 0 ? '✓' : stage.icon}</span><b className="block whitespace-nowrap rounded-full bg-slate-950/85 px-2 py-1 text-[9px] text-white sm:text-xs">{stage.label} · {completed}/{Math.max(1, total)}</b></button>; })}
      </section>

      <div className="relative mx-auto grid max-w-6xl gap-6 px-4 py-6 lg:grid-cols-[210px_minmax(0,1fr)_250px]">
        <aside className="hidden self-start rounded-3xl border border-sky-100 bg-white p-4 shadow-sm lg:block">{examMenu}</aside>

        <section className="min-w-0" onContextMenu={openDictionary}>
          <div className="mb-5 overflow-hidden rounded-[28px] border border-indigo-100 bg-gradient-to-r from-indigo-950 via-sky-900 to-cyan-800 text-white shadow-[0_18px_45px_rgba(30,64,175,.18)]">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/15 px-5 py-4">
              <div><p className="text-xs font-black uppercase tracking-[.2em] text-cyan-200">Adventure Hub</p><strong className="text-xl">Hành trình English {grade}</strong></div>
              <div className="flex flex-wrap items-center gap-2"><span className="inline-flex items-center gap-1.5 rounded-full bg-amber-300 px-3 py-1.5 text-sm font-black text-amber-950"><Coins className="size-4"/> {duckCoins} Duck Coins</span><div className="flex rounded-full bg-white/10 p-1 text-[11px] font-bold"><span className="grid place-items-center px-2"><Settings2 className="size-3.5"/></span>{(['full', 'light', 'off'] as EffectLevel[]).map((level) => <button key={level} onClick={() => setEffectLevel(level)} className={`rounded-full px-2 py-1 ${effectLevel === level ? 'bg-white text-sky-900' : 'text-white/75 hover:bg-white/10'}`}>{level === 'full' ? 'Đầy đủ' : level === 'light' ? 'Nhẹ' : 'Tắt'}</button>)}</div></div>
            </div>
            <div className="grid grid-cols-2 gap-2 p-3 sm:grid-cols-3">
              <button onClick={() => document.getElementById('journey-map')?.scrollIntoView({ behavior: 'smooth' })} className="group flex items-center gap-3 rounded-2xl bg-white/10 p-3 text-left transition hover:-translate-y-0.5 hover:bg-white/20"><span className="grid h-11 w-11 place-items-center rounded-xl bg-emerald-300 text-emerald-950"><MapPinned/></span><span><b className="block">Bản đồ nền</b><small className="text-white/70">Xem các chặng phía trên</small></span></button>
              <button onClick={() => setHubPanel('vault')} className="group flex items-center gap-3 rounded-2xl bg-white/10 p-3 text-left transition hover:-translate-y-0.5 hover:bg-white/20"><span className="grid h-11 w-11 place-items-center rounded-xl bg-amber-300 text-amber-950"><Archive/></span><span><b className="block">Vault cờ</b><small className="text-white/70">{flagVault.length} vị trí đã lưu</small></span></button>
              <button onClick={() => setHubPanel('wrong')} className="group flex items-center gap-3 rounded-2xl bg-white/10 p-3 text-left transition hover:-translate-y-0.5 hover:bg-white/20"><span className="grid h-11 w-11 place-items-center rounded-xl bg-rose-300 text-rose-950"><BookMarked/></span><span><b className="block">Sổ câu sai</b><small className="text-white/70">{wrongBook.length} câu cần ôn</small></span></button>
              <button onClick={() => setHubPanel('missions')} className="group flex items-center gap-3 rounded-2xl bg-white/10 p-3 text-left transition hover:-translate-y-0.5 hover:bg-white/20"><span className="grid h-11 w-11 place-items-center rounded-xl bg-violet-300 text-violet-950"><Target/></span><span><b className="block">Nhiệm vụ</b><small className="text-white/70">{dailyDone}/3 hoàn thành</small></span></button>
              <button onClick={() => setHubPanel('shop')} className="group flex items-center gap-3 rounded-2xl bg-white/10 p-3 text-left transition hover:-translate-y-0.5 hover:bg-white/20"><span className="grid h-11 w-11 place-items-center rounded-xl bg-cyan-300 text-cyan-950"><ShoppingBag/></span><span><b className="block">Cửa hàng</b><small className="text-white/70">Mua bằng Duck Coin</small></span></button>
              <button onClick={() => setHubPanel('inventory')} className="group flex items-center gap-3 rounded-2xl bg-white/10 p-3 text-left transition hover:-translate-y-0.5 hover:bg-white/20"><span className="grid h-11 w-11 place-items-center rounded-xl bg-lime-300 text-lime-950"><PackageOpen/></span><span><b className="block">Rương đồ</b><small className="text-white/70">{ownedLoadout.length} vật phẩm</small></span></button>
            </div>
          </div>
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div><p className="mb-1 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-sky-700"><BookOpen className="size-4"/> English {grade} · {question.section}</p><h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{exam.title}</h1></div>
            <span className="rounded-full bg-white px-3 py-2 text-sm font-semibold shadow-sm">Câu {questionIndex + 1} / {questions.length}</span>
          </div>
          <div className="mb-3 grid gap-2 text-sm sm:grid-cols-3">
            <div className="rounded-2xl border border-sky-200 bg-sky-50 px-4 py-3 text-sky-950"><strong>Luyện tập:</strong> sai lần 1 xem gợi ý; lần 2 khóa 10 giây; từ lần 3 khóa 20 giây. Mỗi lần sai mất một máu và chỉ tủ cấp cứu mới xóa được vết thương. Bôi đen tiếng Anh rồi nhấp chuột phải để dịch.</div>
            <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-700"><strong>Làm bài test:</strong> mỗi lần một câu; 40 câu trong 60 phút. Làm đủ và nộp bài mới xem đáp án, lời giải.</div>
            <div className="rounded-2xl border border-amber-300 bg-amber-50 px-4 py-3 text-amber-950"><strong>Survival:</strong> có 2 phút và 5 máu. Đúng 10 câu để qua màn, nâng phương tiện và cộng thêm 1 phút. Màn Boss chỉ có 3 máu.</div>
          </div>
          <div className="mb-5 grid grid-cols-3 rounded-2xl border border-sky-100 bg-white p-1.5 shadow-sm">
            <button onClick={() => switchMode('practice')} className={`rounded-xl px-3 py-2.5 text-sm font-bold transition ${mode === 'practice' ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-600 hover:bg-sky-50'}`}>Luyện tập</button>
            <button onClick={() => switchMode('test')} className={`rounded-xl px-3 py-2.5 text-sm font-bold transition ${mode === 'test' ? 'bg-[#123c5a] text-white shadow-sm' : 'text-slate-600 hover:bg-sky-50'}`}>Làm bài test</button>
            <button onClick={() => switchMode('survival')} className={`rounded-xl px-3 py-2.5 text-sm font-bold transition ${mode === 'survival' ? 'bg-amber-500 text-slate-950 shadow-sm' : 'text-slate-600 hover:bg-amber-50'}`}>Survival</button>
          </div>
          {exam.sourceNote && <p className="mb-5 rounded-2xl border border-sky-100 bg-sky-50 px-4 py-3 text-sm leading-6 text-sky-900"><strong>Nguồn ôn tập:</strong> {exam.sourceNote}</p>}
          {unitLesson && (mode === 'practice' || submitted) && <GrammarLesson key={`${grade}-${exam.id}`} grade={grade} lesson={unitLesson} />}
          {exam.reviewNotes && !unitLesson && <details className="mb-5 overflow-hidden rounded-2xl border border-amber-200 bg-amber-50/70" open>
            <summary className="cursor-pointer px-5 py-4 font-bold text-amber-950">Kiến thức cần nhớ trước khi luyện</summary>
            <div className="grid gap-3 border-t border-amber-200 p-4 sm:grid-cols-2">
              {exam.reviewNotes.map((note) => <div key={note.title} className="rounded-2xl bg-white p-4 shadow-sm">
                <strong className="text-sky-800">{note.title}</strong>
                <p className="mt-1 text-sm leading-6 text-slate-700">{note.rule}</p>
                <p className="mt-2 rounded-lg bg-sky-50 px-3 py-2 text-sm font-medium text-sky-900">Ví dụ: {note.example}</p>
              </div>)}
            </div>
          </details>}
          <Progress value={(answeredCount / questions.length) * 100} className="mb-5 h-2.5" />

          {submitted ? (
            <article className="overflow-hidden rounded-[28px] border border-sky-100 bg-white text-center shadow-[0_16px_50px_rgba(24,95,140,.08)]">
              <div className="bg-sky-600 px-6 py-8 text-white">{commandoUnlocked ? <><div aria-label="Huy hiệu Vịt Commando" className="mx-auto h-44 w-28 bg-no-repeat drop-shadow-xl" style={{ backgroundImage: 'url(duck-commando-ranks.png)', backgroundSize: '500% 100%', backgroundPosition: '100% center' }} /><span className="mt-2 inline-flex rounded-full bg-amber-300 px-4 py-1.5 text-sm font-black uppercase tracking-wider text-amber-950">Huy hiệu Vịt Commando</span></> : <img src="duck-celebrate.png" alt="Vịt nhỏ chúc mừng" className="mx-auto h-36 w-36 object-contain drop-shadow-lg"/>}<p className="mt-3 text-sm font-bold uppercase tracking-[.18em] text-sky-100">Đã hoàn thành English {grade} · {exam.menuLabel ?? `Đề ${exam.id}`}</p><h2 className="mt-2 text-4xl font-extrabold">{score}/{questions.length} câu đúng</h2></div>
              <div className="p-7">
                <p className="text-lg text-slate-600">{score / questions.length >= 0.8 ? 'Xuất sắc! Vịt Nhỏ thấy bạn đã nắm bài rất chắc.' : score / questions.length >= 0.6 ? 'Làm tốt lắm! Xem lại vài câu sai là bạn sẽ tiến bộ nhanh.' : 'Mình cùng xem lại đáp án rồi thử lần nữa nhé.'}</p>
                {mode === 'practice' && score === questions.length && <div className="mx-auto mt-5 flex max-w-md items-center gap-4 rounded-2xl border-2 border-slate-700 bg-slate-900 p-4 text-left text-white"><img src="duck-kevlar-v2.png" alt="Vịt nhận giáp Kevlar" className="h-24 w-24 object-contain"/><div><strong className="text-lg text-amber-300">Đã nhận giáp Kevlar +5</strong><p className="mt-1 text-sm text-slate-300">Giáp chặn 5 lần sai trước khi trừ máu thật. Tủ cấp cứu không hồi được giáp.</p></div></div>}
                {mode === 'test' && score === questions.length && <div className="mx-auto mt-5 flex max-w-md items-center gap-4 rounded-2xl border-2 border-amber-300 bg-slate-900 p-4 text-left text-white"><img src="duck-pencil-agent-v2.png" alt="Vịt điệp viên mở khóa bút chì" className="h-24 w-24 object-contain"/><div><strong className="text-lg text-amber-300">Đã mở khóa Bút chì</strong><p className="mt-1 text-sm text-slate-300">Vào Survival để dùng một lần và dọn sạch quân gà trên màn hình.</p></div></div>}
                <div className="mt-7 space-y-3 text-left">
                  <h3 className="text-lg font-bold">Đáp án và hướng dẫn giải</h3>
                  {questions.map((item, index) => {
                    const chosen = answers[item.id];
                    const correct = isQuestionCorrect(item, chosen);
                    return <details key={item.id} className={`rounded-2xl border ${correct ? 'border-emerald-200 bg-emerald-50/60' : 'border-rose-200 bg-rose-50/60'}`}>
                      <summary className="cursor-pointer list-none p-4 font-semibold"><span className={`mr-2 inline-flex h-7 w-7 items-center justify-center rounded-full text-sm text-white ${correct ? 'bg-emerald-500' : 'bg-rose-500'}`}>{correct ? '✓' : '×'}</span>Câu {index + 1}: {item.prompt}</summary>
                      <div className="border-t border-current/10 px-4 pb-4 pt-3 text-sm leading-6">
                        <p>Bạn trả lời: <strong>{formatAnswer(item, chosen)}</strong></p>
                        <p>Đáp án đúng: <strong>{correctAnswer(item)}</strong></p>
                        <p className="mt-2 text-slate-700">{item.explanation}</p>
                      </div>
                    </details>;
                  })}
                </div>
                <Button onClick={resetExam} size="lg" className="mt-7 rounded-xl bg-sky-600"><RotateCcw /> Làm lại đề</Button>
              </div>
            </article>
          ) : (
            <article className="rounded-[28px] border border-sky-100 bg-white p-5 shadow-[0_16px_50px_rgba(24,95,140,.08)] sm:p-8">
              <div className="mb-5 flex items-center justify-between gap-3"><span className="rounded-full bg-sky-50 px-3 py-1 text-sm font-semibold text-sky-700">{question.skillArea ?? (question.section === 'Reading' ? `Bài đọc · ${exam.passageTitle}` : question.section === 'Writing' ? 'Writing' : 'Ngữ âm · Từ vựng · Ngữ pháp')}</span><button onClick={toggleFlag} className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium ${currentFlagged ? 'bg-amber-100 text-amber-800' : 'text-slate-500 hover:bg-slate-50'}`}><Flag className="size-4" fill={currentFlagged ? 'currentColor' : 'none'}/> {currentFlagged ? 'Đã cắm cờ' : 'Cắm cờ'}</button></div>
              {question.section === 'Reading' && (question.passage ?? exam.passage) && <div className="mb-6 max-h-72 overflow-y-auto rounded-2xl border border-amber-100 bg-amber-50/70 p-4 text-[15px] leading-7 text-slate-700"><strong className="mb-2 block text-amber-900">{question.passageTitle ?? exam.passageTitle}</strong>{question.passage ?? exam.passage}</div>}
              <ExerciseQuestion
                question={displayQuestion}
                questionNumber={questionIndex + 1}
                value={selected}
                disabled={lockedQuestion === question.id || (mode === 'practice' && answers[question.id] !== undefined) || (mode === 'survival' && (bossPenalty?.kind === 'keyboard' || bossPenalty?.kind === 'screen-lock'))}
                practiceCorrect={mode === 'practice' && isQuestionCorrect(question, answers[question.id])}
                showCheck={mode === 'practice' || mode === 'survival'}
                progressiveHint={mode === 'practice' && question.skillArea === 'Vocabulary' && question.kind === 'typed' ? vocabHintText : undefined}
                onRevealHint={mode === 'practice' && question.skillArea === 'Vocabulary' && question.kind === 'typed' ? () => setVocabHintSteps((current) => ({ ...current, [questionKey(question)]: Math.min(vocabHintAnswer.length, vocabHintStep + 1) })) : undefined}
                onChange={chooseAnswer}
                onCheck={checkTypedAnswer}
              />
              {mode === 'practice' && answers[question.id] !== undefined && <div aria-live="polite" className="mt-5 overflow-hidden rounded-2xl border border-emerald-200 bg-emerald-50 text-emerald-900"><div className="bg-emerald-100 px-4 py-2 text-sm font-bold uppercase tracking-wide">Hướng dẫn giải chi tiết</div><div className="p-4"><strong>Chính xác! Đáp án: {correctAnswer(question)}</strong><p className="mt-2 text-[15px] leading-7">{question.explanation}</p></div></div>}
              {mode !== 'survival' ? <div className="mt-6 flex items-center justify-between gap-3"><Button variant="outline" disabled={questionIndex === 0} onClick={() => setQuestionIndex((value) => value - 1)} className="rounded-xl"><ChevronLeft/> Câu trước</Button>{questionIndex === questions.length - 1 ? <Button disabled={!canSubmit} onClick={submitExam} className="rounded-xl bg-[#123c5a] px-5 hover:bg-[#0e3048]">{mode === 'test' ? 'Nộp bài' : 'Xem tổng kết'}</Button> : <Button onClick={() => setQuestionIndex((value) => value + 1)} className="rounded-xl bg-sky-600 px-5 hover:bg-sky-700">Câu tiếp <ChevronRight/></Button>}</div> : <p className="mt-5 rounded-xl bg-amber-50 px-4 py-3 text-center text-sm font-bold text-amber-900">Chọn hoặc nhập đáp án — Survival sẽ tự chuyển sang câu kế tiếp.</p>}
            </article>
          )}
        </section>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          {mode === 'survival' ? <div className={`overflow-hidden rounded-3xl p-5 text-white shadow-lg ${isBossStage ? 'bg-gradient-to-br from-rose-800 to-slate-950' : 'bg-gradient-to-br from-sky-600 via-cyan-700 to-slate-900'}`}>
            <div className="flex items-center justify-between"><span className="font-black uppercase tracking-wider">Survival · Màn {survivalStage + 1}</span><Clock3 className="size-5 text-white"/></div>
            <strong suppressHydrationWarning className="mt-2 block font-mono text-4xl tracking-tight">{formatTime(secondsLeft)}</strong>
            <div className="mt-3 rounded-2xl bg-white/15 p-3">
              {isBossStage
                ? <img src="chicken-boss.png" alt="Gà Boss" className="mx-auto h-28 w-28 object-contain" style={{ transform: `scale(${1 + stageCorrect * 0.035 + (3 - survivalLives) * 0.08})` }}/>
                : <img src={SURVIVAL_VEHICLES[vehicleIndex]} alt={`Phương tiện: ${stageName}`} className="mx-auto h-28 w-full object-contain drop-shadow-xl"/>
              }
              <p className="mt-1 text-center font-black">{stageName}</p>
            </div>
            <div className="mt-4 flex justify-between text-sm"><span>Tiến độ màn</span><b>{stageCorrect}/{SURVIVAL_TARGET}</b></div>
            <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-black/20"><div className="h-full bg-white transition-all" style={{ width: `${stageCorrect * 10}%` }}/></div>
            <div className="mt-4 flex items-center justify-between border-t border-white/20 pt-3"><span className="text-sm">Máu</span><span className="text-xl" aria-label={`${survivalLives} máu`}>{'❤️'.repeat(survivalLives)}{'🖤'.repeat((isBossStage ? 3 : 5) - survivalLives)}</span></div>
            <div className="mt-4 grid grid-cols-3 gap-2 border-t border-white/20 pt-4">
              <button onClick={() => setWeapon('knife')} className={`rounded-xl px-2 py-2 text-xs font-black ${weapon === 'knife' ? 'bg-amber-300 text-slate-950 ring-2 ring-white' : 'bg-white/15'}`}>🔪 Dao</button>
              <button onClick={useGrenade} disabled={grenades <= 0 || chickenSpawns.length === 0} className="rounded-xl bg-white/15 px-2 py-2 text-xs font-black disabled:opacity-35"><img src="grenade-v2.png" alt="" className="mx-auto h-8 w-8 object-contain"/>Lựu đạn ×{grenades}</button>
              <button onClick={usePencil} disabled={!pencilUnlocked || pencilCharges <= 0 || chickenSpawns.length === 0} className="rounded-xl bg-white/15 px-2 py-2 text-xs font-black disabled:opacity-35">✏️ Bút chì ×{pencilCharges}</button>
            </div>
            <p className="mt-3 text-xs leading-5 text-white/85">Dao: mỗi câu đúng hạ 1 gà. Lựu đạn dọn nhiều gà nhưng làm mờ màn hình 4 giây. Bút chì chỉ mở sau bài test 100% và dọn màn hình một lần.</p>
          </div> : mode === 'test' ? <div className="rounded-3xl bg-[#123c5a] p-5 text-white shadow-lg shadow-sky-100"><div className="mb-3 flex items-center justify-between"><span className="text-sm text-sky-100">Thời gian còn lại</span><Clock3 className="size-5 text-amber-300"/></div><strong suppressHydrationWarning className="font-mono text-3xl tracking-tight">{formatTime(secondsLeft)}</strong><div className="mt-4 flex justify-between border-t border-white/15 pt-3 text-sm"><span>Đã làm</span><b>{answeredCount}/{questions.length}</b></div><Button disabled={!canSubmit} onClick={submitExam} className="mt-4 w-full bg-amber-500 font-bold text-white hover:bg-amber-600">NỘP BÀI</Button>{answeredCount < questions.length && <p className="mt-2 text-center text-xs leading-5 text-sky-100">Làm đủ {questions.length} câu để mở nút nộp bài.</p>}</div> : <div className="rounded-3xl bg-sky-600 p-5 text-white shadow-lg shadow-sky-100"><div className="flex items-center justify-between"><span className="font-bold">Luyện tập có trợ giúp</span><BookOpen className="size-5 text-amber-200"/></div><p className="mt-2 text-sm leading-6 text-sky-50">Sai nhiều sẽ làm màn hình nứt. Dùng vật phẩm trong tủ cấp cứu trước khi máu về 0.</p><div className="mt-4 flex justify-between border-t border-white/20 pt-3 text-sm"><span>Đã luyện</span><b>{answeredCount}/{questions.length}</b></div>{canSubmit && <Button onClick={submitExam} className="mt-4 w-full bg-white font-bold text-sky-700 hover:bg-sky-50">XEM TỔNG KẾT</Button>}</div>}
          {mode === 'practice' && <div className="overflow-hidden rounded-3xl border border-rose-100 bg-white shadow-sm">
            <div className="grid grid-cols-[96px_1fr] gap-3 p-4">
              <DuckLoadoutAvatar loadout={equippedLoadout} rankIndex={rankIndex} rankName={rankName}/>
              <div><p className="text-xs font-bold uppercase tracking-wider text-amber-700">{rankName}</p><strong className="mt-1 block text-lg text-slate-900">Chuỗi đúng: {correctStreak}</strong><p className="text-xs text-slate-500">Kỷ lục: {bestStreak} · Mốc tiếp: {correctStreak < 10 ? 10 : correctStreak < 20 ? 20 : correctStreak < 30 ? 30 : correctStreak < 40 ? 40 : '100%'}</p></div>
            </div>
            <div className="border-t border-rose-100 bg-rose-50 p-4"><div className="flex items-center justify-between text-sm"><strong className="text-rose-900">Máu còn lại</strong><span className="font-bold text-rose-700">{Math.max(0, maxDamage - damage)}/{maxDamage}</span></div><div className="mt-2 h-2.5 overflow-hidden rounded-full bg-rose-200"><div className="h-full bg-rose-500 transition-all" style={{ width: `${100 - damagePercent}%` }} /></div>{armorUnlocked && <div className="mt-3 flex items-center gap-3 rounded-xl border border-slate-300 bg-slate-900 px-3 py-2 text-xs text-white"><img src="duck-kevlar-v2.png" alt="Vịt mặc giáp bảo vệ" className="h-12 w-12 object-contain"/><span><strong className="block text-amber-300">Giáp Kevlar: {armorPoints}/5</strong>Giáp đỡ sai trước máu thật và không thể hồi bằng tủ thuốc.</span></div>}<div className="mt-3 rounded-xl bg-white/80 px-3 py-2 text-xs leading-5 text-slate-600"><strong className="text-emerald-800">Kho: 🩹 {aidInventory.cotton} · 💊 {aidInventory.medicine} · 💉 {aidInventory.injection}</strong><br/>Mỗi 5 câu đúng nhận 1 vật phẩm. Mốc tiếp theo: {nextAidMilestone} câu.</div><Button onClick={() => setAidOpen(true)} disabled={damage === 0 || gameOver || Object.values(aidInventory).every((count) => count === 0)} className="mt-3 w-full bg-emerald-600 font-bold hover:bg-emerald-700">🧰 Mở tủ cấp cứu</Button></div>
          </div>}
          <div className="rounded-3xl border border-sky-100 bg-white p-4 shadow-sm"><p className="mb-3 text-sm font-bold">Danh sách câu</p><div className="grid grid-cols-5 gap-2">{questions.map((item, index) => { const done = isAnswerComplete(item, answers[item.id]); const marked = flagVault.some((saved) => saved.key === questionKey(item)); return <button aria-label={`Mở câu ${index + 1}`} key={item.id} onClick={() => setQuestionIndex(index)} className={`relative aspect-square rounded-xl text-sm font-bold transition ${questionIndex === index && !submitted ? 'ring-2 ring-sky-700 ring-offset-2' : ''} ${marked ? 'bg-indigo-400 text-white' : done ? 'bg-sky-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-sky-100'}`}>{marked && <Flag className="absolute right-0.5 top-0.5 size-3" fill="currentColor"/>}{index + 1}</button>})}</div><div className="mt-4 grid gap-2 text-xs text-slate-600"><span><i className="mr-2 inline-block h-3 w-3 rounded-full bg-sky-500"/>Câu đã làm</span><span><i className="mr-2 inline-block h-3 w-3 rounded-full bg-slate-200"/>Câu chưa làm</span><span><i className="mr-2 inline-block h-3 w-3 rounded-full bg-indigo-400"/>Cờ đã lưu trong Vault</span></div></div>
          <div className="rounded-3xl border border-amber-100 bg-amber-50 p-5"><div className="flex items-center justify-between gap-3"><div className="flex items-center gap-2"><Sparkles className="size-5 text-amber-600"/><strong className="text-amber-950">Từ vựng của Vịt</strong></div><button onClick={() => setVocabulary(randomVocabulary(grade))} className="rounded-full p-2 text-amber-700 transition hover:bg-amber-100" aria-label="Đổi ba từ vựng"><RefreshCw className="size-4"/></button></div><div className="mt-3 grid gap-3">{vocabulary.map((item) => <div key={item.word} className="rounded-2xl bg-white p-3 shadow-sm"><strong className="text-sky-800">{item.word}</strong><span className="ml-2 text-sm text-amber-800">{item.meaning}</span><p className="mt-1 text-sm leading-5 text-slate-600">{item.example}</p></div>)}</div></div>
        </aside>
      </div>
      {hubPanel === 'map' && <dialog open className="fixed inset-0 z-[120] m-0 grid h-screen w-screen max-w-none place-items-center overflow-y-auto bg-slate-950/80 p-3 sm:p-6" aria-labelledby="map-title"><div className="w-full max-w-6xl overflow-hidden rounded-[30px] border-2 border-cyan-300 bg-slate-950 shadow-2xl"><div className="flex items-center justify-between gap-3 px-5 py-4 text-white"><div><p className="text-xs font-black uppercase tracking-[.2em] text-cyan-300">Learning Journey</p><h2 id="map-title" className="text-2xl font-black">Bản đồ English {grade}</h2></div><button onClick={() => setHubPanel(null)} className="rounded-full bg-white/10 p-2 hover:bg-white/20" aria-label="Đóng bản đồ"><X/></button></div><div className="relative aspect-[2/1] min-h-[330px] overflow-hidden bg-sky-200"><img src="learning-journey-map-v1.png" alt="Bản đồ hành trình học tiếng Anh" className="absolute inset-0 h-full w-full object-cover"/>{JOURNEY_STAGES.map((stage) => { const stageExams = stage.group === 'survival' ? [] : availableExams.filter((item) => item.menuGroup === stage.group); const completed = stage.group === 'survival' ? (survivalStage > 0 ? 1 : 0) : stageExams.filter((item) => completedExamKeys.includes(`${grade}-${item.id}`)).length; const total = stage.group === 'survival' ? 1 : stageExams.length; return <button key={stage.group} onClick={() => openJourneyStage(stage.group)} disabled={stage.group !== 'survival' && total === 0} className={`journey-node absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-4 p-1 text-center shadow-xl transition hover:scale-110 disabled:opacity-40 ${completed >= total && total > 0 ? 'border-emerald-300 bg-emerald-600 text-white' : 'border-amber-300 bg-white text-sky-950'}`} style={{ left: `${stage.position[0]}%`, top: `${stage.position[1]}%` }}><span className="block text-xl sm:text-2xl">{completed >= total && total > 0 ? '✓' : stage.icon}</span><b className="hidden whitespace-nowrap rounded-full bg-slate-950/80 px-2 py-0.5 text-[10px] text-white sm:block">{stage.label} · {completed}/{Math.max(1, total)}</b></button>; })}</div><div className="grid gap-2 bg-white p-4 sm:grid-cols-3 lg:grid-cols-7">{JOURNEY_STAGES.map((stage) => <button key={stage.group} onClick={() => openJourneyStage(stage.group)} className="rounded-xl border border-sky-100 bg-sky-50 px-3 py-2 text-sm font-bold text-sky-900 hover:bg-sky-100">{stage.icon} {stage.label}</button>)}</div></div></dialog>}
      {hubPanel === 'vault' && <dialog open className="fixed inset-0 z-[120] m-0 grid h-screen w-screen max-w-none place-items-center overflow-y-auto bg-slate-950/75 p-4" aria-labelledby="vault-title"><div className="w-full max-w-3xl overflow-hidden rounded-[30px] border-2 border-amber-300 bg-white shadow-2xl"><div className="grid items-center bg-gradient-to-r from-indigo-950 to-sky-800 px-6 py-5 text-white sm:grid-cols-[170px_1fr_auto]"><img src="flag-vault-v1.png" alt="Vault chứa cờ và bản đồ" className="mx-auto h-32 w-40 object-contain sm:h-36"/><div><p className="text-xs font-black uppercase tracking-[.2em] text-amber-300">Flag Vault</p><h2 id="vault-title" className="text-3xl font-black">Kho cờ đã cắm</h2><p className="mt-1 text-sm text-sky-100">Mỗi lá cờ lưu chính xác câu hỏi để em quay lại luyện sau.</p></div><button onClick={() => setHubPanel(null)} className="absolute right-6 top-6 rounded-full bg-white/10 p-2 hover:bg-white/20 sm:static" aria-label="Đóng Vault"><X/></button></div><div className="max-h-[55vh] space-y-3 overflow-y-auto p-5">{flagVault.length === 0 ? <div className="rounded-2xl bg-amber-50 p-8 text-center text-amber-900"><Flag className="mx-auto mb-2 size-9"/><strong>Vault đang trống</strong><p className="mt-1 text-sm">Nhấn “Cắm cờ” trên một câu hỏi để lưu vào đây.</p></div> : flagVault.map((entry) => <div key={entry.key} className="flex items-start gap-3 rounded-2xl border border-amber-100 bg-amber-50/60 p-4"><span className="text-2xl">🚩</span><button onClick={() => openSavedEntry(entry)} className="min-w-0 flex-1 text-left"><span className="text-xs font-bold text-amber-700">English {entry.grade} · {entry.section}</span><strong className="mt-1 block line-clamp-2 text-slate-900">{entry.prompt}</strong><span className="mt-1 block text-xs text-slate-500">{entry.examTitle}</span></button><button onClick={() => setFlagVault((items) => items.filter((item) => item.key !== entry.key))} className="rounded-full p-2 text-slate-400 hover:bg-rose-100 hover:text-rose-700" aria-label="Xóa cờ"><X className="size-4"/></button></div>)}</div></div></dialog>}
      {hubPanel === 'wrong' && <dialog open className="fixed inset-0 z-[120] m-0 grid h-screen w-screen max-w-none place-items-center overflow-y-auto bg-slate-950/75 p-4" aria-labelledby="wrong-title"><div className="w-full max-w-3xl overflow-hidden rounded-[30px] border-2 border-rose-300 bg-white shadow-2xl"><div className="flex items-center justify-between gap-4 bg-rose-700 px-6 py-5 text-white"><div><p className="text-xs font-black uppercase tracking-[.2em] text-rose-200">Review Book</p><h2 id="wrong-title" className="text-2xl font-black">Sổ câu sai · {wrongBook.length} câu</h2></div><button onClick={() => setHubPanel(null)} className="rounded-full bg-white/10 p-2 hover:bg-white/20"><X/></button></div><div className="max-h-[65vh] space-y-3 overflow-y-auto p-5">{wrongBook.length === 0 ? <p className="rounded-2xl bg-emerald-50 p-8 text-center font-bold text-emerald-800">Tuyệt vời! Chưa có câu nào cần ôn lại.</p> : wrongBook.map((entry) => <div key={entry.key} className="flex items-start gap-3 rounded-2xl border border-rose-100 p-4"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-rose-100 font-black text-rose-700">×{entry.mistakes}</span><button onClick={() => openSavedEntry(entry)} className="min-w-0 flex-1 text-left"><span className="text-xs font-bold text-rose-700">English {entry.grade} · {entry.section}</span><strong className="mt-1 block line-clamp-2 text-slate-900">{entry.prompt}</strong><span className="mt-1 block text-xs text-slate-500">Mở bài để luyện lại</span></button><button onClick={() => setWrongBook((items) => items.filter((item) => item.key !== entry.key))} className="rounded-full p-2 text-slate-400 hover:bg-slate-100" aria-label="Xóa khỏi sổ"><X className="size-4"/></button></div>)}</div></div></dialog>}
      {hubPanel === 'missions' && <dialog open className="fixed inset-0 z-[120] m-0 grid h-screen w-screen max-w-none place-items-center bg-slate-950/75 p-4" aria-labelledby="mission-title"><div className="w-full max-w-xl rounded-[30px] border-2 border-violet-300 bg-white p-6 shadow-2xl"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-black uppercase tracking-[.2em] text-violet-600">Daily Missions</p><h2 id="mission-title" className="text-2xl font-black text-slate-900">Nhiệm vụ hôm nay</h2><p className="mt-1 text-sm text-slate-500">Tiến độ tự đặt lại vào ngày mới.</p></div><button onClick={() => setHubPanel(null)} className="rounded-full bg-slate-100 p-2"><X/></button></div><div className="mt-6 space-y-3">{dailyMissions.map((mission) => { const percent = Math.min(100, mission.value / mission.target * 100); return <div key={mission.label} className={`rounded-2xl border p-4 ${percent === 100 ? 'border-emerald-200 bg-emerald-50' : 'border-violet-100 bg-violet-50'}`}><div className="flex items-center justify-between"><strong>{mission.icon} {mission.label}</strong><span className="font-bold">{Math.min(mission.value, mission.target)}/{mission.target} {percent === 100 && '✓'}</span></div><div className="mt-3 h-2.5 overflow-hidden rounded-full bg-white"><div className="h-full rounded-full bg-violet-500 transition-all" style={{ width: `${percent}%` }}/></div></div>; })}</div><div className="mt-5 rounded-2xl bg-amber-50 p-4 text-center text-amber-900"><Coins className="mx-auto size-7"/><strong className="mt-1 block">1 câu đúng = 1 xu · Cắm cờ mới = 2 xu · Hoàn thành bài mới = 20 xu</strong></div></div></dialog>}
      {hubPanel === 'shop' && <dialog open className="fixed inset-0 z-[120] m-0 grid h-screen w-screen max-w-none place-items-center overflow-y-auto bg-slate-950/85 p-3 sm:p-6" aria-labelledby="shop-title"><div className="w-full max-w-5xl overflow-hidden rounded-[30px] border-2 border-cyan-300 bg-slate-950 text-white shadow-2xl"><div className="flex items-center justify-between gap-3 border-b border-white/10 px-5 py-4"><div><p className="text-xs font-black uppercase tracking-[.2em] text-cyan-300">Duck Tactical Store</p><h2 id="shop-title" className="text-2xl font-black">Cửa hàng trang bị</h2></div><div className="flex items-center gap-3"><span className="rounded-full bg-amber-300 px-4 py-2 font-black text-amber-950">🪙 {duckCoins}</span><button onClick={() => setHubPanel(null)} className="rounded-full bg-white/10 p-2 hover:bg-white/20" aria-label="Đóng cửa hàng"><X/></button></div></div><div className="grid gap-5 p-5 lg:grid-cols-[220px_1fr]"><div className="rounded-3xl border border-white/10 bg-gradient-to-b from-sky-900 to-slate-900 p-4 text-center"><DuckLoadoutAvatar loadout={equippedLoadout} rankIndex={rankIndex} rankName={rankName} large/><strong className="mt-3 block text-lg">{rankName}</strong><p className="mt-1 text-xs leading-5 text-slate-300">Mua vật phẩm ở đây. Muốn mặc thử, mở Rương đồ và chuyển sang chế độ lắp đồ.</p><Button onClick={() => setHubPanel('inventory')} className="mt-4 w-full bg-cyan-500 font-bold text-slate-950 hover:bg-cyan-400"><PackageOpen/> Mở rương đồ</Button></div><div className="grid max-h-[66vh] gap-3 overflow-y-auto pr-1 sm:grid-cols-2 xl:grid-cols-3">{LOADOUT_ITEMS.map((item) => { const owned = ownedLoadout.includes(item.id); const affordable = duckCoins >= item.price; return <article key={item.id} className="overflow-hidden rounded-2xl border border-white/10 bg-white/5"><div className={`grid h-24 place-items-center bg-gradient-to-br ${item.color}`}><span className="text-6xl drop-shadow-xl">{item.icon}</span></div><div className="p-4"><span className="text-[10px] font-black uppercase tracking-widest text-cyan-300">{SLOT_LABELS[item.slot]} · {item.rarity}</span><strong className="mt-1 block">{item.name}</strong><button onClick={() => buyLoadoutItem(item)} disabled={owned || !affordable} className={`mt-3 w-full rounded-xl px-3 py-2 text-sm font-black ${owned ? 'bg-emerald-500/20 text-emerald-300' : affordable ? 'bg-amber-300 text-amber-950 hover:bg-amber-200' : 'cursor-not-allowed bg-white/10 text-slate-500'}`}>{owned ? '✓ Đã sở hữu' : `🪙 ${item.price}`}</button></div></article>; })}</div></div></div></dialog>}
      {hubPanel === 'inventory' && <dialog open className="fixed inset-0 z-[120] m-0 grid h-screen w-screen max-w-none place-items-center overflow-y-auto bg-slate-950/85 p-3 sm:p-6" aria-labelledby="inventory-title"><div className="w-full max-w-5xl overflow-hidden rounded-[30px] border-2 border-lime-300 bg-slate-100 shadow-2xl"><div className="flex items-center justify-between gap-3 bg-slate-950 px-5 py-4 text-white"><div><p className="text-xs font-black uppercase tracking-[.2em] text-lime-300">Loadout locker</p><h2 id="inventory-title" className="text-2xl font-black">Rương đồ · Chế độ lắp trang bị</h2></div><button onClick={() => setHubPanel(null)} className="rounded-full bg-white/10 p-2 hover:bg-white/20" aria-label="Đóng rương đồ"><X/></button></div><div className="grid gap-5 p-5 lg:grid-cols-[260px_1fr]"><div><div className="rounded-3xl bg-gradient-to-b from-sky-100 to-amber-50 p-5 text-center shadow-inner"><DuckLoadoutAvatar loadout={equippedLoadout} rankIndex={rankIndex} rankName={rankName} large/><strong className="mt-3 block text-slate-950">Avatar hiện tại</strong><p className="text-xs text-slate-500">Thay đổi được lưu tự động</p></div><div className="mt-3 grid gap-2">{(['head', 'outfit', 'weapon'] as LoadoutSlot[]).map((slot) => { const item = LOADOUT_ITEMS.find((entry) => entry.id === equippedLoadout[slot]); return <div key={slot} className="flex items-center gap-3 rounded-xl border bg-white p-3"><span className="grid h-10 w-10 place-items-center rounded-lg bg-slate-100 text-2xl">{item?.icon ?? '＋'}</span><span className="min-w-0 flex-1"><small className="block font-bold uppercase text-slate-400">{SLOT_LABELS[slot]}</small><b className="block truncate text-sm">{item?.name ?? 'Chưa lắp'}</b></span>{item && <button onClick={() => setEquippedLoadout((current) => ({ ...current, [slot]: null }))} className="rounded-lg px-2 py-1 text-xs font-bold text-rose-600 hover:bg-rose-50">Tháo</button>}</div>; })}</div></div><div><div className="mb-3 flex items-center justify-between"><div><strong className="text-lg">Vật phẩm sở hữu</strong><p className="text-xs text-slate-500">Nhấn Lắp; vật phẩm cùng ô sẽ tự thay thế.</p></div><Button onClick={() => setHubPanel('shop')} variant="outline" className="rounded-xl"><ShoppingBag/> Cửa hàng</Button></div>{ownedLoadout.length === 0 ? <div className="grid min-h-64 place-items-center rounded-3xl border-2 border-dashed border-slate-300 bg-white p-8 text-center text-slate-500"><div><PackageOpen className="mx-auto mb-3 size-12"/><strong className="text-slate-800">Rương đang trống</strong><p className="mt-1 text-sm">Kiếm Duck Coin rồi mua món đầu tiên trong cửa hàng.</p></div></div> : <div className="grid max-h-[66vh] gap-3 overflow-y-auto sm:grid-cols-2 xl:grid-cols-3">{LOADOUT_ITEMS.filter((item) => ownedLoadout.includes(item.id)).map((item) => { const equipped = equippedLoadout[item.slot] === item.id; return <article key={item.id} className={`rounded-2xl border-2 bg-white p-4 ${equipped ? 'border-lime-500 ring-2 ring-lime-200' : 'border-slate-200'}`}><div className={`grid h-20 place-items-center rounded-xl bg-gradient-to-br ${item.color}`}><span className="text-5xl">{item.icon}</span></div><span className="mt-3 block text-[10px] font-black uppercase tracking-widest text-slate-500">{SLOT_LABELS[item.slot]} · {item.rarity}</span><strong className="block">{item.name}</strong><button onClick={() => equipLoadoutItem(item)} className={`mt-3 w-full rounded-xl px-3 py-2 text-sm font-black ${equipped ? 'bg-slate-200 text-slate-700' : 'bg-lime-500 text-lime-950 hover:bg-lime-400'}`}>{equipped ? 'Tháo ra' : 'Lắp vào avatar'}</button></article>; })}</div>}</div></div></div></dialog>}
      {mode === 'practice' && damage > 0 && <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[60] overflow-hidden transition-all duration-500" style={{ background: `rgba(20,10,14,${Math.min(.34, damagePercent / 290)})` }}>
        {Array.from({ length: Math.min(damage, maxDamage) }, (_, index) => <img key={index} src="glass-crack-v2.png" alt="" className="glass-crack absolute object-contain drop-shadow-[0_5px_12px_rgba(0,0,0,.55)]" style={{ left: `${-5 + ((index * 37) % 83)}%`, top: `${-8 + ((index * 29) % 75)}%`, width: `${190 + (index % 3) * 55}px`, rotate: `${(index * 47) % 360}deg` }}/>) }
      </div>}
      {mode === 'survival' && chickenSpawns.length > 0 && <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[58] overflow-hidden bg-amber-950/10">{chickenSpawns.map((chicken) => <img key={chicken.id} src="chicken-army.png" alt="" className="chicken-invade absolute object-contain drop-shadow-2xl" style={{ left: `${chicken.x}%`, top: `${chicken.y}%`, width: chicken.size, height: chicken.size, rotate: `${chicken.rotate}deg`, animationDelay: `${chicken.delay}s` }}/>)}</div>}
      {mode === 'survival' && foodSpawns.length > 0 && <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[59] overflow-hidden">{foodSpawns.map((food) => <img key={food.id} src={FOOD_IMAGES[food.kind]} alt="" className="food-drop absolute object-contain drop-shadow-2xl" style={{ left: `${food.x}%`, top: `${food.y}%`, width: food.size, height: food.size, rotate: `${food.rotate}deg` }}/>)}</div>}
      {mode === 'survival' && screenBlurred && <div aria-hidden="true" className="screen-blur pointer-events-none fixed inset-0 z-[64] bg-slate-100/25 backdrop-blur-md"/>}
      {mode === 'survival' && agentNotice && <div role="status" className="pointer-events-none fixed inset-0 z-[95] grid place-items-center bg-slate-950/45 p-4"><div className="agent-pop text-center"><img src="duck-pencil-agent-v2.png" alt="Vịt điệp viên cầm bút chì" className="mx-auto max-h-[70vh] object-contain drop-shadow-2xl"/><p className="-mt-8 inline-flex rounded-full bg-amber-300 px-5 py-2 text-lg font-black text-slate-950 shadow-xl">BÚT CHÌ CLEAR MÀN HÌNH!</p></div></div>}
      {mode === 'survival' && isBossStage && !survivalEnded && <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[57] grid place-items-center overflow-hidden"><img src="chicken-boss.png" alt="" className="max-h-[82vh] max-w-[82vw] object-contain opacity-25 drop-shadow-2xl transition-transform duration-700" style={{ transform: `scale(${0.7 + stageCorrect * 0.055 + (3 - survivalLives) * 0.12})` }}/></div>}
      {mode === 'survival' && bossPenalty && bossPenalty.asset && <div role="status" className="pointer-events-none fixed inset-0 z-[88] grid place-items-center bg-slate-950/70 p-4"><div className="food-penalty text-center"><img src={bossPenalty.asset} alt={bossPenalty.label} className="mx-auto max-h-[70vh] max-w-[90vw] object-contain drop-shadow-2xl"/><strong className="mt-2 block text-4xl font-black text-amber-300 drop-shadow-xl">{bossPenalty.label}</strong><span className="mt-2 inline-flex rounded-full bg-white/15 px-4 py-1 font-bold text-white">{bossPenalty.seconds}s</span></div></div>}
      {mode === 'survival' && bossPenalty && !bossPenalty.asset && bossPenalty.kind !== 'screen-lock' && <div role="status" className="pointer-events-none fixed inset-x-0 top-24 z-[88] flex justify-center px-4"><div className="rounded-2xl border-2 border-rose-300 bg-slate-950/95 px-6 py-4 text-center text-white shadow-2xl"><p className="text-xs font-black uppercase tracking-[.2em] text-rose-300">Kỹ năng Boss</p><strong className="mt-1 block text-xl">{bossPenalty.label}</strong><span className="text-sm text-slate-300">Còn {bossPenalty.seconds}s</span></div></div>}
      {mode === 'survival' && bossPenalty?.kind === 'screen-lock' && <div className="fixed inset-0 z-[100] grid place-items-center bg-slate-950/95 p-5 text-center text-white"><div><div className="mx-auto grid h-28 w-28 place-items-center rounded-full border-4 border-rose-400 bg-rose-950 text-6xl">🔒</div><img src="chicken-boss.png" alt="Boss Gà khóa màn hình" className="mx-auto mt-3 h-64 max-w-[80vw] object-contain"/><strong className="block text-4xl font-black text-rose-300">MÀN HÌNH ĐÃ BỊ KHÓA</strong><p className="mt-3 text-xl">Boss sẽ mở lại sau {bossPenalty.seconds} giây</p></div></div>}
      {mode === 'survival' && stageUpNotice && <div role="status" className="pointer-events-none fixed inset-0 z-[90] grid place-items-center bg-sky-950/35 p-4"><div className="rounded-[28px] border-4 border-amber-300 bg-slate-950/95 px-8 py-7 text-center text-white shadow-2xl"><p className="text-sm font-black uppercase tracking-[.22em] text-amber-300">Qua màn!</p><p className="mt-2 text-3xl font-black">{stageUpNotice}</p></div></div>}
      {mode === 'practice' && aidDropNotice && <div role="status" className="pointer-events-none fixed inset-x-0 top-24 z-[92] flex justify-center px-4"><div className="rounded-2xl border-2 border-emerald-300 bg-slate-950/95 px-5 py-4 text-center text-white shadow-2xl"><p className="text-xs font-black uppercase tracking-[.2em] text-emerald-300">Túi cứu thương</p><p className="mt-1 text-lg font-black">Nhận {AID_ITEMS.find((item) => item.kind === aidDropNotice)?.icon} {AID_ITEMS.find((item) => item.kind === aidDropNotice)?.name}</p></div></div>}
      {(mode === 'practice' || mode === 'survival') && hitPulse > 0 && <div key={hitPulse} aria-hidden="true" className="hit-flash pointer-events-none fixed inset-0 z-[65] grid place-items-center bg-rose-700/35"><div className="h-32 w-32 rounded-full border-[14px] border-white/55 shadow-[0_0_80px_32px_rgba(225,29,72,.75)]" /></div>}
      {hintOpen && !gameOver && lockedQuestion === question.id && currentWrongAttempt === 1 && <dialog open className="fixed inset-0 z-[70] m-0 grid h-screen w-screen max-w-none place-items-center bg-slate-950/45 p-4" aria-labelledby="hint-title"><div className="w-full max-w-lg rounded-[28px] border border-amber-200 bg-white p-6 shadow-2xl"><div className="flex items-center gap-3"><img src="duck-learn.png" alt="Mascot vịt đưa gợi ý" className="h-16 w-16 rounded-2xl object-cover"/><div><p className="text-sm font-bold uppercase tracking-wider text-amber-700">Sai lần 1</p><h2 id="hint-title" className="text-xl font-extrabold text-slate-900">Chưa đúng — xem gợi ý nhé</h2></div></div><p className="mt-4 rounded-2xl bg-amber-50 p-4 leading-7 text-slate-700">{question.hint ?? 'Read the instruction carefully. Check the tense marker, word form, sentence structure, or the exact evidence in the passage before trying again.'}</p><p className="mt-3 text-sm text-slate-500">Đáp án chưa được tiết lộ. Câu trả lời sẽ được xóa để em làm lại.</p><Button onClick={retryAfterHint} autoFocus className="mt-5 w-full rounded-xl bg-amber-500 font-bold text-white hover:bg-amber-600">Đã hiểu · Làm lại</Button></div></dialog>}
      {hintOpen && !gameOver && lockedQuestion === question.id && currentWrongAttempt === 2 && <dialog open className="fixed inset-0 z-[75] m-0 h-screen w-screen max-w-none overflow-hidden bg-slate-950" aria-label="T-rex phạt thời gian"><img src="trex-grrr-v2.png" alt="T-rex gầm chiếm toàn màn hình" className="trex-fullscreen absolute inset-0 h-full w-full object-contain"/><div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/75 to-transparent px-4 pb-8 pt-28 text-center text-white"><strong className="block text-5xl font-black tracking-[.12em] text-rose-400 drop-shadow-2xl sm:text-7xl">GRRRRRRRR</strong><Button onClick={retryAfterHint} disabled={lockSeconds > 0} className="mt-5 min-w-64 rounded-xl bg-rose-600 py-6 text-lg font-black hover:bg-rose-500 disabled:bg-slate-600">{lockSeconds > 0 ? `🔒 T-rex khóa ${lockSeconds}s` : 'Thoát và làm lại'}</Button></div></dialog>}
      {hintOpen && !gameOver && lockedQuestion === question.id && currentWrongAttempt >= 3 && <dialog open className="fixed inset-0 z-[75] m-0 grid h-screen w-screen max-w-none place-items-center overflow-hidden bg-gradient-to-b from-amber-950 to-slate-950 p-4" aria-label="Vịt quay Bắc Kinh"><div className="food-penalty text-center"><img src="peking-duck-v1.png" alt="Vịt quay Bắc Kinh" className="mx-auto max-h-[72vh] max-w-[92vw] object-contain drop-shadow-2xl"/><strong className="block text-3xl font-black text-amber-300 sm:text-5xl">VỊT QUAY BẮC KINH</strong><Button onClick={retryAfterHint} disabled={lockSeconds > 0} className="mt-5 min-w-64 rounded-xl bg-amber-500 py-6 text-lg font-black text-slate-950 hover:bg-amber-400 disabled:bg-slate-600 disabled:text-white">{lockSeconds > 0 ? `🔒 Chờ ${lockSeconds}s` : 'Làm lại câu này'}</Button></div></dialog>}
      {aidOpen && !gameOver && <dialog open className="fixed inset-0 z-[80] m-0 grid h-screen w-screen max-w-none place-items-center bg-emerald-950/55 p-4" aria-labelledby="aid-title"><div className="w-full max-w-xl rounded-[28px] border-4 border-emerald-400 bg-slate-950 p-6 text-white shadow-2xl"><div className="flex items-start justify-between gap-4"><div><p className="text-sm font-bold uppercase tracking-[.18em] text-emerald-300">Medical crate</p><h2 id="aid-title" className="text-2xl font-black">🧰 Tủ cấp cứu</h2><p className="mt-1 text-sm text-slate-300">Cứ 5 câu đúng sẽ rơi một vật phẩm: từ 5 câu có bông băng; từ 10 câu có thể ra thuốc cấp 2; từ 20 câu có thể ra ống tiêm cấp 3. Chọn một món để hồi máu.</p></div><button onClick={() => setAidOpen(false)} className="rounded-full bg-white/10 p-2 hover:bg-white/20" aria-label="Đóng tủ cấp cứu"><X className="size-5"/></button></div><div className="mt-5 grid gap-3 sm:grid-cols-3">{AID_ITEMS.map((item) => <button key={item.kind} onClick={() => consumeAid(item.kind)} disabled={aidInventory[item.kind] <= 0 || damage <= 0} className={`rounded-2xl border-2 p-4 text-left transition hover:-translate-y-1 disabled:cursor-not-allowed disabled:opacity-35 ${item.color}`}><span className="text-4xl">{item.icon}</span><strong className="mt-2 block">{item.name}</strong><span className="text-sm">Hồi {item.heal} máu · Còn {aidInventory[item.kind]}</span></button>)}</div><div className="mt-5 rounded-2xl bg-white/10 p-4"><div className="flex justify-between text-sm"><span>Mức thương tích</span><strong>{damage}/{maxDamage}</strong></div><div className="mt-2 h-3 overflow-hidden rounded-full bg-slate-700"><div className="h-full bg-rose-500" style={{ width: `${damagePercent}%` }}/></div></div></div></dialog>}
      {gameOver && <dialog open className="fixed inset-0 z-[100] m-0 grid h-screen w-screen max-w-none place-items-center overflow-y-auto bg-slate-950/90 p-4" aria-labelledby="game-over-title"><div className="w-full max-w-md rounded-[28px] border-2 border-rose-500 bg-slate-900 p-6 text-center text-white shadow-2xl"><img src="duck-hospital.png" alt="Vịt băng bó đang hồi phục trong bệnh viện" className="mx-auto h-48 w-48 object-contain drop-shadow-2xl"/><p className="mt-2 text-sm font-bold uppercase tracking-[.22em] text-rose-300">Vịt cần hồi phục</p><h2 id="game-over-title" className="mt-2 text-3xl font-black">Màn hình đã bị che hoàn toàn</h2><p className="mt-3 leading-7 text-slate-300">Số lần sai đã đạt 20% số câu của bài. Vịt đã được băng bó an toàn; em cần làm lại từ đầu và dùng tủ cấp cứu sớm hơn ở lượt tới.</p><Button onClick={resetExam} autoFocus className="mt-5 w-full bg-rose-600 py-6 text-base font-black hover:bg-rose-700"><RotateCcw/> Làm lại từ đầu</Button></div></dialog>}
      {survivalGameOver && <dialog open className="fixed inset-0 z-[110] m-0 grid h-screen w-screen max-w-none place-items-center overflow-y-auto bg-slate-950/90 p-4" aria-labelledby="survival-over-title"><div className="w-full max-w-lg rounded-[30px] border-2 border-amber-400 bg-slate-900 p-6 text-center text-white shadow-2xl"><div className="grid grid-cols-2 items-end gap-2"><img src="duck-hospital.png" alt="Vịt đang hồi phục" className="h-44 w-full object-contain"/><img src={isBossStage ? 'chicken-boss.png' : 'chicken-army.png'} alt={isBossStage ? 'Gà Boss' : 'Quân đội gà'} className="h-44 w-full object-contain"/></div><p className="mt-2 text-sm font-bold uppercase tracking-[.22em] text-amber-300">Survival kết thúc</p><h2 id="survival-over-title" className="mt-2 text-3xl font-black">{survivalReason === 'time' ? 'Hết thời gian!' : 'Vịt đã hết máu!'}</h2><p className="mt-3 leading-7 text-slate-300">Bạn đã tới màn {survivalStage + 1} · {stageName}, đạt chuỗi cao nhất {bestStreak}. Bắt đầu lại với 02:00 và 5 máu nhé.</p><Button onClick={resetExam} autoFocus className="mt-5 w-full bg-amber-500 py-6 text-base font-black text-slate-950 hover:bg-amber-400"><RotateCcw/> Chơi Survival lại</Button></div></dialog>}
      {dictionary && <div role="dialog" aria-live="polite" onClick={(event) => event.stopPropagation()} className="fixed z-50 w-72 rounded-2xl border border-sky-200 bg-white p-4 shadow-2xl" style={{ left: Math.max(12, dictionary.x), top: Math.max(12, dictionary.y) }}><div className="flex items-start justify-between gap-3"><div className="flex items-center gap-2 text-sky-800"><Languages className="size-5"/><strong>Từ điển Anh–Việt</strong></div><button onClick={() => setDictionary(null)} className="rounded-full p-1 text-slate-400 hover:bg-slate-100" aria-label="Đóng từ điển"><X className="size-4"/></button></div>{dictionary.word && <p className="mt-3 break-words text-base font-bold text-slate-900">{dictionary.word}</p>}<p className={`mt-1 break-words text-sm leading-6 ${dictionary.status === 'error' ? 'text-rose-700' : 'text-slate-700'}`}>{dictionary.translation}</p>{dictionary.status === 'ready' && <p className="mt-2 text-[11px] text-slate-400">Bản dịch tự động · MyMemory</p>}</div>}
    </main>
  );
}

// Enhanced Dashboard Store for GYAANSETU.AI
// Includes gamification, learning profiles, and advanced features

import { create } from "zustand";
import { persist } from "zustand/middleware";

// AI Configuration constants
const AI_CONFIG = {
  gamification: {
    levelThresholds: [0, 100, 300, 600, 1000, 1500, 2100, 2800, 3600, 4500],
  },
};

// ==================== INTERFACES ====================

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  metadata?: {
    subject?: string;
    topic?: string;
    sources?: string[];
    xpEarned?: number;
    saved?: boolean;
  };
}

export interface Lesson {
  id: string;
  title: string;
  titleGu: string;
  description: string;
  content: string;
  subject: string;
  chapter: string;
  duration?: string;
  difficulty: "easy" | "medium" | "hard";
  xpReward: number;
  completed: boolean;
  completedAt?: Date;
  createdAt: Date;
}

export interface Question {
  id: string;
  question: string;
  questionGu: string;
  type: "mcq" | "short" | "long" | "fill";
  options?: string[];
  answer: string;
  explanation?: string;
  explanationGu?: string;
  userAnswer?: string;
  isCorrect?: boolean;
  difficulty: "easy" | "medium" | "hard";
  subject: string;
  topic: string;
  xpReward: number;
  timeSpent?: number;
}

export interface LearningProfile {
  class: number;
  board: string;
  subjects: string[];
  weakTopics: string[];
  strongTopics: string[];
  preferredExplanationMode: string;
  readingSpeed: "slow" | "normal" | "fast";
  memoryStyle: "visual" | "auditory" | "kinesthetic";
  dailyGoalMinutes: number;
  voicePreference: boolean;
}

export interface GamificationState {
  xp: number;
  level: number;
  streak: number;
  longestStreak: number;
  lastActiveDate: string;
  streakFreezes: number;
  badges: Badge[];
  dailyXP: number;
  weeklyXP: number;
  totalQuestionsAnswered: number;
  correctAnswers: number;
  lessonsCompleted: number;
}

export interface Badge {
  id: string;
  name: string;
  nameGu: string;
  description: string;
  icon: string;
  earnedAt: Date;
  category: "streak" | "subject" | "milestone" | "special";
}

export interface StudyPlan {
  id: string;
  examDate?: Date;
  dailyTasks: DailyTask[];
  completedTasks: string[];
  missedDays: number;
}

export interface DailyTask {
  id: string;
  title: string;
  titleGu: string;
  subject: string;
  topic: string;
  type: "lesson" | "practice" | "revision";
  duration: number;
  completed: boolean;
  scheduledDate: string;
}

export interface SubjectProgress {
  subject: string;
  chaptersTotal: number;
  chaptersCompleted: number;
  questionsAttempted: number;
  questionsCorrect: number;
  lastStudied?: Date;
  readinessScore: number;
}

// ==================== STORE ====================

interface DashboardState {
  // Profile
  learningProfile: LearningProfile;
  updateLearningProfile: (profile: Partial<LearningProfile>) => void;

  // Messages
  messages: Message[];
  isAILoading: boolean;
  addMessage: (message: Omit<Message, "id" | "timestamp">) => void;
  clearMessages: () => void;
  setAILoading: (loading: boolean) => void;

  // Lessons
  lessons: Lesson[];
  currentLesson: Lesson | null;
  setCurrentLesson: (lesson: Lesson | null) => void;
  addLesson: (lesson: Omit<Lesson, "id" | "createdAt">) => void;
  completeLesson: (lessonId: string) => void;

  // Practice
  questions: Question[];
  currentQuestionIndex: number;
  practiceMode: "topic" | "exam" | "revision" | "challenge";
  addQuestion: (question: Omit<Question, "id">) => void;
  addQuestions: (questions: Omit<Question, "id">[]) => void;
  answerQuestion: (questionId: string, answer: string, timeSpent?: number) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  resetPractice: () => void;
  setPracticeMode: (mode: "topic" | "exam" | "revision" | "challenge") => void;

  // Notes
  savedNotes: Message[];
  saveNote: (message: Message) => void;
  removeNote: (id: string) => void;

  // Gamification
  gamification: GamificationState;
  addXP: (amount: number, source: string) => void;
  updateStreak: () => void;
  useStreakFreeze: () => boolean;
  addBadge: (badge: Omit<Badge, "earnedAt">) => void;
  checkBadgeEligibility: () => void;

  // Study Plan
  studyPlan: StudyPlan | null;
  createStudyPlan: (examDate: Date, subjects: string[]) => void;
  completeTask: (taskId: string) => void;

  // Subject Progress
  subjectProgress: SubjectProgress[];
  updateSubjectProgress: (subject: string, progress: Partial<SubjectProgress>) => void;

  // Uploaded Documents
  uploadedDocuments: Array<{
    id: string;
    name: string;
    type: string;
    subject?: string;
    uploadedAt: Date;
  }>;
  addDocument: (doc: { name: string; type: string; subject?: string }) => void;
  removeDocument: (id: string) => void;
}

// Helper functions
function calculateLevel(xp: number): number {
  const thresholds = AI_CONFIG.gamification.levelThresholds;
  for (let i = thresholds.length - 1; i >= 0; i--) {
    if (xp >= thresholds[i]) return i + 1;
  }
  return 1;
}

function getTodayDate(): string {
  return new Date().toISOString().split("T")[0];
}

function isConsecutiveDay(lastDate: string): boolean {
  const last = new Date(lastDate);
  const today = new Date();
  const diff = Math.floor((today.getTime() - last.getTime()) / (1000 * 60 * 60 * 24));
  return diff === 1;
}

// Initial state
const initialGamification: GamificationState = {
  xp: 0,
  level: 1,
  streak: 0,
  longestStreak: 0,
  lastActiveDate: "",
  streakFreezes: 2,
  badges: [],
  dailyXP: 0,
  weeklyXP: 0,
  totalQuestionsAnswered: 0,
  correctAnswers: 0,
  lessonsCompleted: 0,
};

const initialProfile: LearningProfile = {
  class: 10,
  board: "GSEB",
  subjects: ["ગણિત", "વિજ્ઞાન", "ગુજરાતી", "અંગ્રેજી", "સામાજિક વિજ્ઞાન"],
  weakTopics: [],
  strongTopics: [],
  preferredExplanationMode: "stepByStep",
  readingSpeed: "normal",
  memoryStyle: "visual",
  dailyGoalMinutes: 30,
  voicePreference: true,
};

export const useDashboardStore = create<DashboardState>()(
  persist(
    (set, get) => ({
      // Profile
      learningProfile: initialProfile,
      updateLearningProfile: (profile) =>
        set((state) => ({
          learningProfile: { ...state.learningProfile, ...profile },
        })),

      // Messages
      messages: [],
      isAILoading: false,
      addMessage: (message) =>
        set((state) => ({
          messages: [
            ...state.messages,
            {
              ...message,
              id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
              timestamp: new Date(),
            },
          ],
        })),
      clearMessages: () => set({ messages: [] }),
      setAILoading: (loading) => set({ isAILoading: loading }),

      // Lessons
      lessons: [],
      currentLesson: null,
      setCurrentLesson: (lesson) => set({ currentLesson: lesson }),
      addLesson: (lesson) =>
        set((state) => ({
          lessons: [
            ...state.lessons,
            {
              ...lesson,
              id: `lesson_${Date.now()}`,
              createdAt: new Date(),
            },
          ],
        })),
      completeLesson: (lessonId) =>
        set((state) => {
          const lesson = state.lessons.find((l) => l.id === lessonId);
          if (lesson && !lesson.completed) {
            get().addXP(lesson.xpReward, "lesson_complete");
            get().checkBadgeEligibility();
          }
          return {
            lessons: state.lessons.map((l) =>
              l.id === lessonId ? { ...l, completed: true, completedAt: new Date() } : l
            ),
            gamification: {
              ...state.gamification,
              lessonsCompleted: state.gamification.lessonsCompleted + 1,
            },
          };
        }),

      // Practice
      questions: [],
      currentQuestionIndex: 0,
      practiceMode: "topic",
      addQuestion: (question) =>
        set((state) => ({
          questions: [
            ...state.questions,
            {
              ...question,
              id: `q_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            },
          ],
        })),
      addQuestions: (questions) =>
        set((state) => ({
          questions: [
            ...state.questions,
            ...questions.map((q, i) => ({
              ...q,
              id: `q_${Date.now()}_${i}`,
            })),
          ],
        })),
      answerQuestion: (questionId, answer, timeSpent = 0) =>
        set((state) => {
          const question = state.questions.find((q) => q.id === questionId);
          const isCorrect = question?.answer === answer;
          
          if (question) {
            get().addXP(isCorrect ? question.xpReward : Math.floor(question.xpReward / 3), "answer");
            get().updateSubjectProgress(question.subject, {
              questionsAttempted: (state.subjectProgress.find(s => s.subject === question.subject)?.questionsAttempted || 0) + 1,
              questionsCorrect: (state.subjectProgress.find(s => s.subject === question.subject)?.questionsCorrect || 0) + (isCorrect ? 1 : 0),
            });
          }

          return {
            questions: state.questions.map((q) =>
              q.id === questionId
                ? { ...q, userAnswer: answer, isCorrect, timeSpent }
                : q
            ),
            gamification: {
              ...state.gamification,
              totalQuestionsAnswered: state.gamification.totalQuestionsAnswered + 1,
              correctAnswers: state.gamification.correctAnswers + (isCorrect ? 1 : 0),
            },
          };
        }),
      nextQuestion: () =>
        set((state) => ({
          currentQuestionIndex: Math.min(
            state.currentQuestionIndex + 1,
            state.questions.length - 1
          ),
        })),
      previousQuestion: () =>
        set((state) => ({
          currentQuestionIndex: Math.max(state.currentQuestionIndex - 1, 0),
        })),
      resetPractice: () => set({ questions: [], currentQuestionIndex: 0 }),
      setPracticeMode: (mode) => set({ practiceMode: mode }),

      // Notes
      savedNotes: [],
      saveNote: (message) =>
        set((state) => ({
          savedNotes: [
            ...state.savedNotes,
            { ...message, metadata: { ...message.metadata, saved: true } },
          ],
        })),
      removeNote: (id) =>
        set((state) => ({
          savedNotes: state.savedNotes.filter((note) => note.id !== id),
        })),

      // Gamification
      gamification: initialGamification,
      addXP: (amount, _source) =>
        set((state) => {
          const newXP = state.gamification.xp + amount;
          const newLevel = calculateLevel(newXP);
          const today = getTodayDate();
          const isNewDay = state.gamification.lastActiveDate !== today;

          return {
            gamification: {
              ...state.gamification,
              xp: newXP,
              level: newLevel,
              dailyXP: isNewDay ? amount : state.gamification.dailyXP + amount,
              weeklyXP: state.gamification.weeklyXP + amount,
              lastActiveDate: today,
            },
          };
        }),
      updateStreak: () =>
        set((state) => {
          const today = getTodayDate();
          const lastDate = state.gamification.lastActiveDate;
          
          if (lastDate === today) return state;
          
          let newStreak = state.gamification.streak;
          
          if (isConsecutiveDay(lastDate)) {
            newStreak += 1;
          } else if (lastDate && lastDate !== today) {
            newStreak = 0;
          } else {
            newStreak = 1;
          }

          return {
            gamification: {
              ...state.gamification,
              streak: newStreak,
              longestStreak: Math.max(newStreak, state.gamification.longestStreak),
              lastActiveDate: today,
              dailyXP: lastDate === today ? state.gamification.dailyXP : 0,
            },
          };
        }),
      useStreakFreeze: () => {
        const state = get();
        if (state.gamification.streakFreezes > 0) {
          set({
            gamification: {
              ...state.gamification,
              streakFreezes: state.gamification.streakFreezes - 1,
            },
          });
          return true;
        }
        return false;
      },
      addBadge: (badge) =>
        set((state) => ({
          gamification: {
            ...state.gamification,
            badges: [
              ...state.gamification.badges,
              { ...badge, earnedAt: new Date() },
            ],
          },
        })),
      checkBadgeEligibility: () => {
        const state = get();
        const { gamification } = state;
        const existingBadgeIds = new Set(gamification.badges.map((b) => b.id));

        if (gamification.streak >= 7 && !existingBadgeIds.has("streak_7")) {
          get().addBadge({
            id: "streak_7",
            name: "Week Warrior",
            nameGu: "સાપ્તાહિક વિજેતા",
            description: "7 day streak achieved!",
            icon: "🔥",
            category: "streak",
          });
        }
        if (gamification.streak >= 30 && !existingBadgeIds.has("streak_30")) {
          get().addBadge({
            id: "streak_30",
            name: "Monthly Master",
            nameGu: "માસિક માસ્ટર",
            description: "30 day streak achieved!",
            icon: "🏆",
            category: "streak",
          });
        }
        if (gamification.totalQuestionsAnswered >= 100 && !existingBadgeIds.has("questions_100")) {
          get().addBadge({
            id: "questions_100",
            name: "Century Solver",
            nameGu: "સો પ્રશ્નો",
            description: "Answered 100 questions!",
            icon: "💯",
            category: "milestone",
          });
        }
        if (gamification.lessonsCompleted >= 10 && !existingBadgeIds.has("lessons_10")) {
          get().addBadge({
            id: "lessons_10",
            name: "Knowledge Seeker",
            nameGu: "જ્ઞાન શોધક",
            description: "Completed 10 lessons!",
            icon: "📚",
            category: "milestone",
          });
        }
      },

      // Study Plan
      studyPlan: null,
      createStudyPlan: (examDate, subjects) =>
        set((_state) => {
          const tasks: DailyTask[] = [];
          const today = new Date();
          const daysUntilExam = Math.ceil(
            (examDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
          );

          for (let i = 0; i < Math.min(daysUntilExam, 30); i++) {
            const date = new Date(today);
            date.setDate(date.getDate() + i);
            const dateStr = date.toISOString().split("T")[0];

            subjects.forEach((subject, idx) => {
              if (i % subjects.length === idx) {
                tasks.push({
                  id: `task_${i}_${idx}`,
                  title: `${subject} - Chapter Review`,
                  titleGu: `${subject} - પ્રકરણ સમીક્ષા`,
                  subject,
                  topic: "General",
                  type: i % 3 === 0 ? "revision" : i % 2 === 0 ? "practice" : "lesson",
                  duration: 30,
                  completed: false,
                  scheduledDate: dateStr,
                });
              }
            });
          }

          return {
            studyPlan: {
              id: `plan_${Date.now()}`,
              examDate,
              dailyTasks: tasks,
              completedTasks: [],
              missedDays: 0,
            },
          };
        }),
      completeTask: (taskId) =>
        set((state) => {
          if (!state.studyPlan) return state;
          const task = state.studyPlan.dailyTasks.find((t) => t.id === taskId);
          if (task) {
            get().addXP(20, "task_complete");
          }
          return {
            studyPlan: {
              ...state.studyPlan,
              completedTasks: [...state.studyPlan.completedTasks, taskId],
              dailyTasks: state.studyPlan.dailyTasks.map((t) =>
                t.id === taskId ? { ...t, completed: true } : t
              ),
            },
          };
        }),

      // Subject Progress
      subjectProgress: [],
      updateSubjectProgress: (subject, progress) =>
        set((state) => {
          const existing = state.subjectProgress.find((s) => s.subject === subject);
          if (existing) {
            return {
              subjectProgress: state.subjectProgress.map((s) =>
                s.subject === subject ? { ...s, ...progress, lastStudied: new Date() } : s
              ),
            };
          }
          return {
            subjectProgress: [
              ...state.subjectProgress,
              {
                subject,
                chaptersTotal: 10,
                chaptersCompleted: 0,
                questionsAttempted: 0,
                questionsCorrect: 0,
                readinessScore: 0,
                ...progress,
                lastStudied: new Date(),
              },
            ],
          };
        }),

      // Documents
      uploadedDocuments: [],
      addDocument: (doc) =>
        set((state) => ({
          uploadedDocuments: [
            ...state.uploadedDocuments,
            {
              ...doc,
              id: `doc_${Date.now()}`,
              uploadedAt: new Date(),
            },
          ],
        })),
      removeDocument: (id) =>
        set((state) => ({
          uploadedDocuments: state.uploadedDocuments.filter((d) => d.id !== id),
        })),
    }),
    {
      name: "gyaansetu-dashboard-storage",
      partialize: (state) => ({
        learningProfile: state.learningProfile,
        gamification: state.gamification,
        savedNotes: state.savedNotes,
        subjectProgress: state.subjectProgress,
        studyPlan: state.studyPlan,
        uploadedDocuments: state.uploadedDocuments,
      }),
    }
  )
);

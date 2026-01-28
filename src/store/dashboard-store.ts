import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  GamificationData,
  StudentContext,
  LearningDNA,
  RevisionSchedule,
  ExamReadiness,
  AICoachMessage,
  AITutorConfig,
  LessonPlan,
  QuizConfig,
  ClassInsight,
  TeacherShadowInsight,
  Assignment,
  UserSettings,
} from "@/types";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string;
  duration?: string;
  createdAt: Date;
}

export interface Question {
  id: string;
  question: string;
  options?: string[];
  answer?: string;
  userAnswer?: string;
  isCorrect?: boolean;
}

interface DashboardState {
  // === STUDENT FEATURES ===
  
  // Student Context
  studentContext: StudentContext;
  setStudentContext: (context: Partial<StudentContext>) => void;

  // AI Tutor Config
  aiTutorConfig: AITutorConfig;
  setAITutorConfig: (config: Partial<AITutorConfig>) => void;

  // Ask AI
  messages: Message[];
  isAILoading: boolean;
  addMessage: (message: Omit<Message, "id" | "timestamp">) => void;
  clearMessages: () => void;

  // Learn
  lessons: Lesson[];
  currentLesson: Lesson | null;
  setCurrentLesson: (lesson: Lesson | null) => void;
  addLesson: (lesson: Omit<Lesson, "id" | "createdAt">) => void;

  // Practice
  questions: Question[];
  currentQuestionIndex: number;
  addQuestion: (question: Omit<Question, "id">) => void;
  answerQuestion: (questionId: string, answer: string) => void;
  nextQuestion: () => void;
  resetPractice: () => void;

  // Notes/History
  savedNotes: Message[];
  saveNote: (message: Message) => void;
  removeNote: (id: string) => void;

  // Gamification
  gamification: GamificationData;
  addXP: (amount: number) => void;
  incrementStreak: () => void;
  addBadge: (badge: any) => void;
  resetDailyXP: () => void;

  // Learning DNA
  learningDNA: LearningDNA;
  updateLearningDNA: (data: Partial<LearningDNA>) => void;

  // Revision Schedule
  revisionSchedule: RevisionSchedule[];
  addRevisionItem: (item: Omit<RevisionSchedule, "id">) => void;
  completeRevision: (id: string) => void;

  // Exam Readiness
  examReadiness: ExamReadiness;
  updateExamReadiness: (data: Partial<ExamReadiness>) => void;

  // AI Coach Messages
  coachMessages: AICoachMessage[];
  addCoachMessage: (message: Omit<AICoachMessage, "id" | "timestamp">) => void;

  // === TEACHER FEATURES ===
  
  // Lesson Plans
  lessonPlans: LessonPlan[];
  addLessonPlan: (plan: Omit<LessonPlan, "id" | "createdAt">) => void;
  removeLessonPlan: (id: string) => void;

  // Class Insights
  classInsights: ClassInsight[];
  setClassInsights: (insights: ClassInsight[]) => void;

  // Teacher Shadow Insights
  teacherInsights: TeacherShadowInsight[];
  addTeacherInsight: (insight: Omit<TeacherShadowInsight, "id" | "timestamp">) => void;
  dismissInsight: (id: string) => void;

  // Assignments
  assignments: Assignment[];
  addAssignment: (assignment: Omit<Assignment, "id" | "createdAt">) => void;
  updateAssignment: (id: string, updates: Partial<Assignment>) => void;

  // === SETTINGS ===
  settings: UserSettings;
  updateSettings: (settings: Partial<UserSettings>) => void;
}

export const useDashboardStore = create<DashboardState>()(
  persist(
    (set) => ({
      // === STUDENT FEATURES ===

      // Student Context
      studentContext: {
        classLevel: 10,
      },
      setStudentContext: (context) =>
        set((state) => ({
          studentContext: { ...state.studentContext, ...context },
        })),

      // AI Tutor Config
      aiTutorConfig: {
        speed: "normal",
        explainLike10: false,
        style: "step-by-step",
        voiceEnabled: false,
      },
      setAITutorConfig: (config) =>
        set((state) => ({
          aiTutorConfig: { ...state.aiTutorConfig, ...config },
        })),

      // Ask AI
      messages: [],
      isAILoading: false,
      addMessage: (message) =>
        set((state) => ({
          messages: [
            ...state.messages,
            {
              ...message,
              id: Date.now().toString(),
              timestamp: new Date(),
            },
          ],
        })),
      clearMessages: () => set({ messages: [] }),

      // Learn
      lessons: [],
      currentLesson: null,
      setCurrentLesson: (lesson) => set({ currentLesson: lesson }),
      addLesson: (lesson) =>
        set((state) => ({
          lessons: [
            ...state.lessons,
            {
              ...lesson,
              id: Date.now().toString(),
              createdAt: new Date(),
            },
          ],
        })),

      // Practice
      questions: [],
      currentQuestionIndex: 0,
      addQuestion: (question) =>
        set((state) => ({
          questions: [
            ...state.questions,
            {
              ...question,
              id: Date.now().toString(),
            },
          ],
        })),
      answerQuestion: (questionId, answer) =>
        set((state) => ({
          questions: state.questions.map((q) =>
            q.id === questionId
              ? {
                  ...q,
                  userAnswer: answer,
                  isCorrect: q.answer ? q.answer === answer : undefined,
                }
              : q
          ),
        })),
      nextQuestion: () =>
        set((state) => ({
          currentQuestionIndex: Math.min(
            state.currentQuestionIndex + 1,
            state.questions.length - 1
          ),
        })),
      resetPractice: () => set({ questions: [], currentQuestionIndex: 0 }),

      // Notes/History
      savedNotes: [],
      saveNote: (message) =>
        set((state) => ({
          savedNotes: [...state.savedNotes, message],
        })),
      removeNote: (id) =>
        set((state) => ({
          savedNotes: state.savedNotes.filter((note) => note.id !== id),
        })),

      // Gamification
      gamification: {
        xp: 0,
        level: 1,
        streak: 0,
        badges: [],
        dailyXP: 0,
        weeklyXP: 0,
      },
      addXP: (amount) =>
        set((state) => {
          const newXP = state.gamification.xp + amount;
          const newLevel = Math.floor(newXP / 1000) + 1;
          return {
            gamification: {
              ...state.gamification,
              xp: newXP,
              level: newLevel,
              dailyXP: state.gamification.dailyXP + amount,
              weeklyXP: state.gamification.weeklyXP + amount,
            },
          };
        }),
      incrementStreak: () =>
        set((state) => ({
          gamification: {
            ...state.gamification,
            streak: state.gamification.streak + 1,
          },
        })),
      addBadge: (badge) =>
        set((state) => ({
          gamification: {
            ...state.gamification,
            badges: [...state.gamification.badges, { ...badge, earnedAt: new Date() }],
          },
        })),
      resetDailyXP: () =>
        set((state) => ({
          gamification: { ...state.gamification, dailyXP: 0 },
        })),

      // Learning DNA
      learningDNA: {
        strongSubjects: [],
        weakTopics: [],
        preferredLearningTime: "evening",
        averageStudyDuration: 0,
        conceptGaps: [],
      },
      updateLearningDNA: (data) =>
        set((state) => ({
          learningDNA: { ...state.learningDNA, ...data },
        })),

      // Revision Schedule
      revisionSchedule: [],
      addRevisionItem: (item) =>
        set((state) => ({
          revisionSchedule: [
            ...state.revisionSchedule,
            { ...item, id: Date.now().toString() },
          ],
        })),
      completeRevision: (id) =>
        set((state) => ({
          revisionSchedule: state.revisionSchedule.map((item) =>
            item.id === id ? { ...item, completed: true } : item
          ),
        })),

      // Exam Readiness
      examReadiness: {
        percentage: 0,
        strongAreas: [],
        weakAreas: [],
        recommendedFocus: [],
      },
      updateExamReadiness: (data) =>
        set((state) => ({
          examReadiness: { ...state.examReadiness, ...data },
        })),

      // AI Coach Messages
      coachMessages: [],
      addCoachMessage: (message) =>
        set((state) => ({
          coachMessages: [
            ...state.coachMessages,
            {
              ...message,
              id: Date.now().toString(),
              timestamp: new Date(),
            },
          ],
        })),

      // === TEACHER FEATURES ===

      // Lesson Plans
      lessonPlans: [],
      addLessonPlan: (plan) =>
        set((state) => ({
          lessonPlans: [
            ...state.lessonPlans,
            { ...plan, id: Date.now().toString(), createdAt: new Date() },
          ],
        })),
      removeLessonPlan: (id) =>
        set((state) => ({
          lessonPlans: state.lessonPlans.filter((plan) => plan.id !== id),
        })),

      // Class Insights
      classInsights: [],
      setClassInsights: (insights) => set({ classInsights: insights }),

      // Teacher Shadow Insights
      teacherInsights: [],
      addTeacherInsight: (insight) =>
        set((state) => ({
          teacherInsights: [
            ...state.teacherInsights,
            { ...insight, id: Date.now().toString(), timestamp: new Date() },
          ],
        })),
      dismissInsight: (id) =>
        set((state) => ({
          teacherInsights: state.teacherInsights.filter((i) => i.id !== id),
        })),

      // Assignments
      assignments: [],
      addAssignment: (assignment) =>
        set((state) => ({
          assignments: [
            ...state.assignments,
            { ...assignment, id: Date.now().toString(), createdAt: new Date() },
          ],
        })),
      updateAssignment: (id, updates) =>
        set((state) => ({
          assignments: state.assignments.map((a) =>
            a.id === id ? { ...a, ...updates } : a
          ),
        })),

      // === SETTINGS ===
      settings: {
        language: "gu",
        lowBandwidthMode: false,
        textFirstMode: false,
        voiceEnabled: false,
        notificationsEnabled: true,
        offlineMode: false,
        theme: "light",
      },
      updateSettings: (settings) =>
        set((state) => ({
          settings: { ...state.settings, ...settings },
        })),
    }),
    {
      name: "gyaansetu-dashboard-storage",
    }
  )
);

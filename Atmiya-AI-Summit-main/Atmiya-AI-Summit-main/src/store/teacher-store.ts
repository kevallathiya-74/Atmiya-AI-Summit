// Teacher Dashboard Store for GYAANSETU.AI
// Includes lesson planning, quiz generation, and assessment tools

import { create } from "zustand";
import { persist } from "zustand/middleware";

// ==================== INTERFACES ====================

export interface LessonPlan {
  id: string;
  title: string;
  titleGu: string;
  class: number;
  subject: string;
  chapter: string;
  topic: string;
  duration: number; // in minutes
  objectives: string[];
  objectivesGu: string[];
  introduction: string;
  mainContent: string;
  activities: string[];
  assessment: string;
  homework: string;
  resources: string[];
  boardContent: string; // Blackboard-ready content
  createdAt: Date;
  lastModified: Date;
}

export interface GeneratedQuiz {
  id: string;
  title: string;
  titleGu: string;
  class: number;
  subject: string;
  chapter: string;
  difficulty: "easy" | "medium" | "hard" | "mixed";
  questionCount: number;
  questions: QuizQuestion[];
  totalMarks: number;
  duration: number;
  createdAt: Date;
}

export interface QuizQuestion {
  id: string;
  type: "mcq" | "short" | "long" | "fill" | "truefalse";
  question: string;
  questionGu: string;
  options?: string[];
  answer: string;
  answerGu: string;
  marks: number;
  explanation?: string;
  explanationGu?: string;
}

export interface GeneratedNotes {
  id: string;
  title: string;
  titleGu: string;
  class: number;
  subject: string;
  chapter: string;
  topic: string;
  type: "short" | "detailed" | "exam-focused";
  content: string;
  contentGu: string;
  keyPoints: string[];
  keyPointsGu: string[];
  createdAt: Date;
}

export interface ClassHeatmap {
  subject: string;
  topics: {
    name: string;
    nameGu: string;
    difficulty: number; // 0-100, higher = more difficult for students
    studentsStruggling: number;
    averageScore: number;
  }[];
}

export interface StudentPerformance {
  studentId: string;
  name: string;
  class: number;
  subjects: {
    subject: string;
    score: number;
    trend: "up" | "down" | "stable";
    weakTopics: string[];
    strongTopics: string[];
  }[];
}

export interface SyllabusProgress {
  subject: string;
  totalChapters: number;
  completedChapters: number;
  currentChapter: string;
  percentComplete: number;
  behindSchedule: boolean;
  estimatedCompletionDate: Date;
}

// ==================== STORE ====================

interface TeacherState {
  // Lesson Plans
  lessonPlans: LessonPlan[];
  currentLessonPlan: LessonPlan | null;
  addLessonPlan: (plan: Omit<LessonPlan, "id" | "createdAt" | "lastModified">) => void;
  updateLessonPlan: (id: string, updates: Partial<LessonPlan>) => void;
  deleteLessonPlan: (id: string) => void;
  setCurrentLessonPlan: (plan: LessonPlan | null) => void;

  // Quizzes
  generatedQuizzes: GeneratedQuiz[];
  addQuiz: (quiz: Omit<GeneratedQuiz, "id" | "createdAt">) => void;
  deleteQuiz: (id: string) => void;

  // Notes
  generatedNotes: GeneratedNotes[];
  addNotes: (notes: Omit<GeneratedNotes, "id" | "createdAt">) => void;
  deleteNotes: (id: string) => void;

  // Analytics
  classHeatmaps: ClassHeatmap[];
  studentPerformances: StudentPerformance[];
  syllabusProgress: SyllabusProgress[];

  // Settings
  teacherProfile: {
    name: string;
    school: string;
    classes: number[];
    subjects: string[];
    board: string;
  };
  updateTeacherProfile: (profile: Partial<TeacherState["teacherProfile"]>) => void;

  // Generation state
  isGenerating: boolean;
  setIsGenerating: (generating: boolean) => void;
}

// Initial teacher profile
const initialTeacherProfile = {
  name: "શિક્ષક",
  school: "GSEB School",
  classes: [9, 10],
  subjects: ["ગણિત", "વિજ્ઞાન"],
  board: "GSEB",
};

// Sample data for demonstration
const sampleHeatmap: ClassHeatmap = {
  subject: "ગણિત",
  topics: [
    { name: "Algebra", nameGu: "બીજગણિત", difficulty: 65, studentsStruggling: 12, averageScore: 58 },
    { name: "Geometry", nameGu: "ભૂમિતિ", difficulty: 45, studentsStruggling: 8, averageScore: 72 },
    { name: "Statistics", nameGu: "આંકડાશાસ્ત્ર", difficulty: 30, studentsStruggling: 5, averageScore: 78 },
    { name: "Trigonometry", nameGu: "ત્રિકોણમિતિ", difficulty: 75, studentsStruggling: 18, averageScore: 52 },
  ],
};

const sampleSyllabusProgress: SyllabusProgress[] = [
  {
    subject: "ગણિત",
    totalChapters: 15,
    completedChapters: 8,
    currentChapter: "ત્રિકોણમિતિ",
    percentComplete: 53,
    behindSchedule: false,
    estimatedCompletionDate: new Date("2026-03-15"),
  },
  {
    subject: "વિજ્ઞાન",
    totalChapters: 12,
    completedChapters: 6,
    currentChapter: "પ્રકાશ",
    percentComplete: 50,
    behindSchedule: true,
    estimatedCompletionDate: new Date("2026-03-20"),
  },
];

export const useTeacherStore = create<TeacherState>()(
  persist(
    (set, _get) => ({
      // Lesson Plans
      lessonPlans: [],
      currentLessonPlan: null,
      addLessonPlan: (plan) =>
        set((state) => ({
          lessonPlans: [
            ...state.lessonPlans,
            {
              ...plan,
              id: `lesson_${Date.now()}`,
              createdAt: new Date(),
              lastModified: new Date(),
            },
          ],
        })),
      updateLessonPlan: (id, updates) =>
        set((state) => ({
          lessonPlans: state.lessonPlans.map((plan) =>
            plan.id === id ? { ...plan, ...updates, lastModified: new Date() } : plan
          ),
        })),
      deleteLessonPlan: (id) =>
        set((state) => ({
          lessonPlans: state.lessonPlans.filter((plan) => plan.id !== id),
        })),
      setCurrentLessonPlan: (plan) => set({ currentLessonPlan: plan }),

      // Quizzes
      generatedQuizzes: [],
      addQuiz: (quiz) =>
        set((state) => ({
          generatedQuizzes: [
            ...state.generatedQuizzes,
            {
              ...quiz,
              id: `quiz_${Date.now()}`,
              createdAt: new Date(),
            },
          ],
        })),
      deleteQuiz: (id) =>
        set((state) => ({
          generatedQuizzes: state.generatedQuizzes.filter((quiz) => quiz.id !== id),
        })),

      // Notes
      generatedNotes: [],
      addNotes: (notes) =>
        set((state) => ({
          generatedNotes: [
            ...state.generatedNotes,
            {
              ...notes,
              id: `notes_${Date.now()}`,
              createdAt: new Date(),
            },
          ],
        })),
      deleteNotes: (id) =>
        set((state) => ({
          generatedNotes: state.generatedNotes.filter((notes) => notes.id !== id),
        })),

      // Analytics (sample data)
      classHeatmaps: [sampleHeatmap],
      studentPerformances: [],
      syllabusProgress: sampleSyllabusProgress,

      // Settings
      teacherProfile: initialTeacherProfile,
      updateTeacherProfile: (profile) =>
        set((state) => ({
          teacherProfile: { ...state.teacherProfile, ...profile },
        })),

      // Generation state
      isGenerating: false,
      setIsGenerating: (generating) => set({ isGenerating: generating }),
    }),
    {
      name: "gyaansetu-teacher-storage",
      partialize: (state) => ({
        lessonPlans: state.lessonPlans,
        generatedQuizzes: state.generatedQuizzes,
        generatedNotes: state.generatedNotes,
        teacherProfile: state.teacherProfile,
        syllabusProgress: state.syllabusProgress,
      }),
    }
  )
);

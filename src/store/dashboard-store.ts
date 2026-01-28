import { create } from "zustand";

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
}

export const useDashboardStore = create<DashboardState>((set) => ({
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
}));

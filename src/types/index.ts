// ====================
// SHARED TYPES
// ====================

export type ClassLevel = 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type DifficultyLevel = "weak" | "average" | "advanced";

export type Subject = {
  id: string;
  name: string;
  nameGu: string;
  icon?: string;
};

export type Chapter = {
  id: string;
  subjectId: string;
  name: string;
  nameGu: string;
  topicCount: number;
};

export type Topic = {
  id: string;
  chapterId: string;
  name: string;
  nameGu: string;
  isWeak?: boolean;
  masteryLevel?: number;
};

// ====================
// STUDENT TYPES
// ====================

export type ExplanationSpeed = "slow" | "normal" | "fast";

export type ExplanationStyle = "story" | "real-life" | "step-by-step" | "visual-analogy";

export type AITutorConfig = {
  speed: ExplanationSpeed;
  explainLike10: boolean;
  style: ExplanationStyle;
  voiceEnabled: boolean;
};

export type StudentContext = {
  classLevel: ClassLevel;
  currentSubject?: string;
  currentChapter?: string;
  currentTopic?: string;
};

export type GamificationData = {
  xp: number;
  level: number;
  streak: number;
  badges: Badge[];
  dailyXP: number;
  weeklyXP: number;
};

export type Badge = {
  id: string;
  name: string;
  nameGu: string;
  description: string;
  descriptionGu: string;
  icon: string;
  earnedAt?: Date;
};

export type LearningDNA = {
  strongSubjects: string[];
  weakTopics: string[];
  preferredLearningTime: string;
  averageStudyDuration: number;
  conceptGaps: ConceptGap[];
};

export type ConceptGap = {
  topicId: string;
  topicName: string;
  severity: "low" | "medium" | "high";
  relatedTopics: string[];
};

export type RevisionSchedule = {
  id: string;
  topicId: string;
  topicName: string;
  scheduledDate: Date;
  priority: "high" | "medium" | "low";
  completed: boolean;
};

export type ExamReadiness = {
  percentage: number;
  strongAreas: string[];
  weakAreas: string[];
  predictedScore?: number;
  recommendedFocus: string[];
};

export type AICoachMessage = {
  id: string;
  message: string;
  messageGu: string;
  type: "motivation" | "reminder" | "suggestion" | "achievement";
  timestamp: Date;
  actionable?: boolean;
};

// ====================
// TEACHER TYPES
// ====================

export type LessonPlan = {
  id: string;
  title: string;
  classLevel: ClassLevel;
  subject: string;
  topic: string;
  duration: number;
  objectives: string[];
  activities: string[];
  resources: string[];
  assessment: string;
  createdAt: Date;
};

export type QuizConfig = {
  subject: string;
  topic: string;
  difficulty: DifficultyLevel;
  questionCount: number;
  questionTypes: ("mcq" | "short" | "long")[];
};

export type ClassInsight = {
  classId: string;
  className: string;
  averageScore: number;
  attendance: number;
  topPerformers: string[];
  needsAttention: string[];
  topicMastery: TopicMastery[];
};

export type TopicMastery = {
  topicId: string;
  topicName: string;
  masteryPercentage: number;
  studentsMastered: number;
  studentsStruggling: number;
};

export type ClassHeatmap = {
  date: Date;
  classId: string;
  data: HeatmapCell[];
};

export type HeatmapCell = {
  studentId: string;
  studentName: string;
  topicId: string;
  topicName: string;
  score: number;
  attentionLevel: "low" | "medium" | "high";
};

export type TeacherShadowInsight = {
  id: string;
  type: "time-optimization" | "content-suggestion" | "student-alert" | "teaching-tip";
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  timestamp: Date;
};

export type Assignment = {
  id: string;
  title: string;
  description: string;
  classLevel: ClassLevel;
  subject: string;
  dueDate: Date;
  maxScore: number;
  submissions: number;
  totalStudents: number;
  createdAt: Date;
};

export type CurriculumAlignment = {
  board: "GSEB" | "NCERT" | "CBSE";
  alignmentScore: number;
  coveredTopics: string[];
  pendingTopics: string[];
};

export type SubstituteTeacherPack = {
  id: string;
  classLevel: ClassLevel;
  subject: string;
  duration: number;
  lessonPlan: string;
  activities: string[];
  assessmentQuestions: string[];
  answerKey: string;
};

// ====================
// API CONTRACTS
// ====================

export type APIResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
};

export type PaginatedResponse<T> = {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
};

// ====================
// SETTINGS TYPES
// ====================

export type UserSettings = {
  language: "gu" | "en";
  lowBandwidthMode: boolean;
  textFirstMode: boolean;
  voiceEnabled: boolean;
  notificationsEnabled: boolean;
  offlineMode: boolean;
  theme: "light" | "dark" | "auto";
};

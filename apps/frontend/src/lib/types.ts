export interface QuizCardProps {
  id: string
  name: string
  desc: string
  length: number
  created: string
}

export interface QuizData {
  name: string
  desc: string
  questions: Questions[]
}

interface Questions {
  id: number
  question: string
  correct: string
  options: Options[]
  explanation?: string
}

interface Options {
  optionId: string
  option: string
}

export interface BulkStatsTypes {
  answeredQuestions: number
  categoryId: string
  correctAnswers: number
  id: string
  incorrectAnswers: number
  score: number
  totalQuestions: number
  createdAt: string
  category: {
    name: string
  }
}

export interface StatTypes {
  answeredQuestions: number
  correctAnswers: number
  incorrectAnswers: number
  score: number
  totalQuestions: number
  createdAt: string
  category: {
    name: string
    questions: Questions[]
  }
  answers: {
    optionId: string
    questionId: number
  }[]
}
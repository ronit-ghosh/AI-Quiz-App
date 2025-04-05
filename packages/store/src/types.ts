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

export interface QuizzesTypes {
    id: string
    name: string
    desc: string
    length: number
    created: string
  }
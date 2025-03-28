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
  id: string
  question: string
  correct: string
  options: Options[]
  explanation?: string
}

interface Options {
  optionId: string
  option: string
}
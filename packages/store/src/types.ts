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

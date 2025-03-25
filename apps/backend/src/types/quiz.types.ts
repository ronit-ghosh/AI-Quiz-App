export interface Quizes {
    questions: Questions[]
}

export interface Questions {
    question: string
    options: Options[]
    correct: QuestionOption
}

interface Options {
    optionId: QuestionOption
    option: string
}

enum QuestionOption {
    A = "A",
    B = "B",
    C = "C",
    D = "D"
}

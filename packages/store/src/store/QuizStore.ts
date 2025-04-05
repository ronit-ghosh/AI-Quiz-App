import { create, type StateCreator } from "zustand"
import type { BulkStatsTypes, QuizData, QuizzesTypes } from "../types"
import axios from "axios"
import { BACKEND_URL } from "../env"

interface QuizStoreTypes {
    quizData: QuizData | null
    quizCompleted: boolean
    currentQuestionIndex: number
    selectedAnswer: string | null
    showExplanation: boolean
    statsData: BulkStatsTypes[]
    fetchQuizData: (id: string) => void
    handleNext: () => void
    handlePrev: () => void
    handleSkip: () => void
    handleReset: () => void
    handleAnswerSelect: (
        currentQuestionId: number,
        optionId: string
    ) => void
    userAnswers: {
        questionId: number,
        optionId: string | null
    }[]
    fetchCategories: (page: number) => void
    fetchQuizLen: () => void
    loading: boolean
    quizzes: QuizzesTypes[]
    quizzesLength: number
}

const QuizStore: StateCreator<QuizStoreTypes> = (set, get) => ({
    quizData: null,
    quizCompleted: false,
    currentQuestionIndex: 0,
    userAnswers: [],
    selectedAnswer: null,
    showExplanation: false,
    statsData: [],
    currentStatPage: 1,
    loading: false,
    quizzesLength: 0,
    quizzes: [],

    fetchQuizData: async (id) => {
        try {
            const response = await axios.get(`${BACKEND_URL}/api/quiz/get/${id}`)
            set({ quizData: response.data })
        } catch (error) {
            console.error("Error fetching quiz data: ", error)
        }
    },

    handleAnswerSelect: (currentQuestionId, optionId) => set((state) => {
        if (!state.selectedAnswer) {
            set({
                selectedAnswer: optionId,
                showExplanation: true
            })
            state.userAnswers.push({
                questionId: currentQuestionId,
                optionId: optionId
            })
        }

        return {}
    }),

    handleNext: () => set((state) => {
        if (state.quizData && state.currentQuestionIndex < state.quizData.questions.length - 1) {
            set({
                currentQuestionIndex: state.currentQuestionIndex + 1,
                selectedAnswer: state.userAnswers[state.currentQuestionIndex + 1]?.optionId ?? null,
                showExplanation: state.userAnswers[state.currentQuestionIndex + 1]?.optionId ? true : false
            })
        } else {
            set({ quizCompleted: true })
        }

        return {}
    }),

    handlePrev: () => set((state) => {
        if (state.quizData && state.currentQuestionIndex > 0) {
            set({
                currentQuestionIndex: state.currentQuestionIndex - 1,
                selectedAnswer: state.userAnswers[state.currentQuestionIndex - 1]?.optionId || null,
                showExplanation: state.userAnswers[state.currentQuestionIndex - 1] ? true : false
            })
        }

        return {}
    }),

    handleSkip: () => set((state) => {
        if (state.quizData && state.currentQuestionIndex < state.quizData.questions.length - 1) {
            set({
                currentQuestionIndex: state.currentQuestionIndex + 1,
                selectedAnswer: null,
                showExplanation: false
            })
        } else {
            set({ quizCompleted: true })
        }

        return {}
    }),

    handleReset: () => set(() => {
        set({
            userAnswers: [],
            currentQuestionIndex: 0,
            selectedAnswer: null,
            showExplanation: false
        })
        return {}
    }),

    fetchQuizLen: async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/api/quiz/get/length`)
            set({ quizzesLength: response.data.quizLength })
        } catch (error) {
            console.error(error)
        }
    },

    fetchCategories: async (page) => {
        const { quizzesLength } = get()
        console.log(quizzesLength)
        const max = page > Math.ceil(quizzesLength / 6)
        if (page < 1 || max) return

        try {
            set({ loading: true })
            const response = await axios.get(`${BACKEND_URL}/api/quiz/get/category?page=${page}`)
            console.log(response.data.categories)
            set({
                quizzes: response.data.categories,
                loading: false
            })
        } catch (error) {
            console.error(error)
        }
    },
})

export const useQuizStore = create(QuizStore)
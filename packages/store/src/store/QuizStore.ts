import { create, type StateCreator } from "zustand"
import type { QuizData } from "../types"
import axios from "axios"
import { BACKEND_URL } from "../env"
import { useStatStore } from "./StatStore"

interface QuizStoreTypes {
    quizData: QuizData | null
    quizCompleted: boolean
    currentQuestionIndex: number
    selectedAnswer: string | null
    showExplanation: boolean
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
}

const QuizStore: StateCreator<QuizStoreTypes> = (set) => ({
    quizData: null,
    quizCompleted: false,
    currentQuestionIndex: 0,
    userAnswers: [],
    selectedAnswer: null,
    showExplanation: false,

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
    })

})

export const useQuizStore = create(QuizStore)
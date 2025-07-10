import { create, type StateCreator } from "zustand"
import { useQuizStore } from "./QuizStore";
import axios from "axios";
// import { BACKEND_URL } from "../env";
import type { BulkStatsTypes } from "../types";

interface StatStoreTypes {
    calculateStats: () => {
        answeredQuestions: number,
        correctAnswers: number,
        incorrectAnswers: number,
        score?: number
    }
    createStats: (
        answeredQuestions: number,
        correctAnswers: number,
        incorrectAnswers: number,
        score: number,
        categoryId: string,
        token: string,
        BACKEND_URL: string
    ) => Promise<string>
    fetchStats: (page: number, token: string, BACKEND_URL: string) => void
    fetchStatsLen: (token: string, BACKEND_URL: string) => void
    loading: boolean
    statsData: BulkStatsTypes[]
    statsLength: number
}

const StatStore: StateCreator<StatStoreTypes> = (set, get) => ({
    statsData: [],
    loading: false,
    statsLength: 0,
    calculateStats: () => {
        const { quizData, userAnswers } = useQuizStore.getState();

        if (!quizData) return { answeredQuestions: 0, correctAnswers: 0, incorrectAnswers: 0 };

        let answeredQuestions = 0;
        let correctAnswers = 0;
        let incorrectAnswers = 0;

        userAnswers.forEach((answer) => {
            const question = quizData.questions.find((q) => q.id === answer.questionId);
            if (question) {
                answeredQuestions++;
                if (answer.optionId === question.correct) {
                    correctAnswers++;
                } else {
                    incorrectAnswers++;
                }
            }
        });

        const score = Math.round(correctAnswers / answeredQuestions * 100)

        return { answeredQuestions, correctAnswers, incorrectAnswers, score };
    },

    createStats: async (answeredQuestions, correctAnswers, incorrectAnswers, score, categoryId, token, BACKEND_URL) => {
        if (!BACKEND_URL) return
        const { quizData, userAnswers } = useQuizStore.getState();
        try {
            const response = await axios.post(`${BACKEND_URL}/api/stats/create`, {
                answeredQuestions,
                correctAnswers,
                incorrectAnswers,
                score,
                categoryId,
                totalQuestions: quizData?.questions.length,
                answers: userAnswers
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return response.data.statsId
        } catch (error) {
            console.error(error)
        }
    },

    fetchStatsLen: async (token, BACKEND_URL) => {
        if (!BACKEND_URL) return
        const response = await axios.get(`${BACKEND_URL}/api/stats/get/length`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        set({ statsLength: response.data.statsLength })
    },

    fetchStats: async (page, token, BACKEND_URL) => {
        const { statsLength } = get()
        const max = page > Math.ceil(statsLength / 5)
        if (page < 1 || max) return

        try {
            set({ loading: true })
            const response = await axios.get(`${BACKEND_URL}/api/stats/get?page=${page}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            set({ statsData: response.data.stats, loading: false })
        } catch (error) {
            console.error(error)
        }
    }

})

export const useStatStore = create(StatStore)
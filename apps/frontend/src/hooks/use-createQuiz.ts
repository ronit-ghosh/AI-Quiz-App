import { BACKEND_URL } from "@/lib/env"
import { CreateQuizFromTextTypes } from '@repo/validations/inferred-types'
import axios from "axios"
import { toast } from "sonner"

export default async function useCreateQuizFromText(props: CreateQuizFromTextTypes) {
    async function createQuizFromText(props: CreateQuizFromTextTypes) {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/quiz/create/text`, { props })
            return response.data.responseId
        } catch (error) {
            toast("Error while creating quiz, Please try again!😓")
            console.error(error)
        }
    }

    return {
        createQuizFromText
    }
}
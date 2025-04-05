"use client"

import axios from 'axios'
import { FileImage, FileText, FileType } from 'lucide-react'
import { BACKEND_URL } from '@/lib/env'
import pdfToText from "react-pdftotext"
import { toast } from 'sonner'
import { useState } from 'react'
import QuizOption from './quiz-option'

export default function CreateQuiz() {
    const [loading, setLoading] = useState(false)

    async function handleGeneration(
        title: string,
        categoryName: string,
        categoryDesc: string,
        file?: File,
        prompt?: string
    ) {
        if (title === "text") {
            if (categoryDesc === "" || categoryName === "" || prompt === "") {
                toast("Fill the input fields!")
                return
            }
            try {
                setLoading(true)
                const response = await axios.post(`${BACKEND_URL}/api/quiz/create/text`, {
                    categoryName,
                    categoryDesc,
                    text: prompt
                })
                toast(response.data.categoryId)
                setLoading(false)
            } catch (error) {
                toast("Error while creating quiz!")
                console.error(error)
                setLoading(false)
            }
        } else if (title === "pdf") {
            if (categoryDesc === "" || categoryName === "" || prompt === "") {
                toast("Fill the input fields!")
                return
            }

            pdfToText(file!)
                .then(async (text) => {
                    setLoading(true)
                    const response = await axios.post(`${BACKEND_URL}/api/quiz/create/pdf`, {
                        categoryName,
                        categoryDesc,
                        text
                    })
                    toast(response.data.categoryId)
                    setLoading(false)
                })
                .catch((error) => {
                    console.error(error)
                    toast((error as Error).message)
                    setLoading(false)
                })
        } else if (title === "largepdf") {
            if (categoryDesc === "" || categoryName === "" || !file) {
                toast("Fill the input fields!")
                return
            }
            try {
                setLoading(true)
                const formData = new FormData()
                formData.append("categoryName", categoryName)
                formData.append("categoryDesc", categoryDesc)
                formData.append("pdf", file)

                formData.forEach(d => console.log(d))
                const response = await axios.post(`${BACKEND_URL}/api/quiz/create/pdf/bulk`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                })
                toast(response.data.categoryId)
                setLoading(false)
            } catch (error) {
                toast("Error while creating quiz!")
                console.error(error)
                setLoading(false)
            }
        } else if (title === "image") {
            if (categoryDesc === "" || categoryName === "" || !file) {
                toast("Fill the input fields!")
                return
            }

            try {
                setLoading(true)
                const formData = new FormData()
                formData.append("categoryName", categoryName)
                formData.append("categoryDesc", categoryDesc)
                formData.append("image", file)

                const response = await axios.post(`${BACKEND_URL}/api/quiz/create/image`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                })
                toast(response.data.categoryId)
                setLoading(false)
            } catch (error) {
                toast((error as Error).message)
                console.error(error)
                setLoading(false)
            }
        } else {
            toast("Ugh!")
        }
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <QuizOption
                icon={<FileText className="h-6 w-6 text-blue-600" />}
                title="Text to Quiz"
                description="Generate quizzes from text passages and notes"
                isTextQuiz
                handleGeneration={(
                    categoryName,
                    categoryDesc,
                    _,
                    prompt
                ) => handleGeneration(
                    "text",
                    categoryName,
                    categoryDesc,
                    undefined,
                    prompt
                )}
                loading={loading}
            />

            <QuizOption
                icon={<FileType className="h-6 w-6 text-blue-600" />}
                title="Short PDF to Quiz"
                description="Convert 2-3 page PDF documents into quizzes"
                handleGeneration={(
                    categoryName,
                    categoryDesc,
                    file,
                ) => handleGeneration(
                    "pdf",
                    categoryName,
                    categoryDesc,
                    file
                )}
                loading={loading}
            />

            <QuizOption
                icon={<FileText className="h-6 w-6 text-blue-600" />}
                title="Multipage PDF to Quiz"
                description="Transform longer PDF documents into comprehensive quizzes"
                handleGeneration={(
                    categoryName,
                    categoryDesc,
                    file,
                ) => handleGeneration(
                    "largepdf",
                    categoryName,
                    categoryDesc,
                    file
                )}
                loading={loading}
            />

            <QuizOption
                icon={<FileImage className="h-6 w-6 text-blue-600" />}
                title="Image to Quiz"
                description="Create quizzes from diagrams, charts and visual content"
                handleGeneration={(
                    categoryName,
                    categoryDesc,
                    file,
                ) => handleGeneration(
                    "image",
                    categoryName,
                    categoryDesc,
                    file
                )}
                loading={loading}
            />
        </div>
    )
}

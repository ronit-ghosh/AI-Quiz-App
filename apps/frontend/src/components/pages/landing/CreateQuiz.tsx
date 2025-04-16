"use client"

import axios from 'axios'
import { FileImage, FileText, FileType } from 'lucide-react'
import { BACKEND_URL } from '@/lib/env'
import pdfToText from "react-pdftotext"
import { toast } from 'sonner'
import { useCallback, useEffect, useState } from 'react'
import QuizOption from './quiz-option'
import { useAuth } from '@clerk/nextjs'
import { useQuizStore } from '@repo/store'

export default function CreateQuiz() {
    const { getToken } = useAuth()
    const [loading, setLoading] = useState(false)
    const [jobId, setJobId] = useState("")
    const [status, setStatus] = useState<"GENERATED" | "FAILED" | "PENDING">()
    console.log(status)
    const { fetchCategories, currentCategoryPage } = useQuizStore()

    const fetchCategory = useCallback(async () => {
        const token = await getToken()
        fetchCategories(currentCategoryPage, token!)
    }, [currentCategoryPage, fetchCategories, getToken])

    useEffect(() => {
        if (!jobId || status === "FAILED") {
            toast.dismiss()
            return
        }

        if (status === "GENERATED") {
            toast.dismiss()
            fetchCategory()
            return
        }

        const PollForStatus = async () => {
            try {
                const token = await getToken()
                const response = await axios.get(`${BACKEND_URL}/api/quiz/get/status/${jobId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                // setStatus("PENDING")
                setStatus(response.data.status)
            } catch (error) {
                setStatus("FAILED")
                console.error(error)
            }
        }

        const interval = setInterval(PollForStatus, 10000)

        return () => clearTimeout(interval)

    }, [jobId, status, getToken, fetchCategory])

    async function handleGeneration(
        title: string,
        categoryName: string,
        categoryDesc: string,
        file?: File,
        prompt?: string
    ) {
        const token = await getToken()
        if (title === "text") {
            if (categoryDesc === "" || categoryName === "" || prompt === "") {
                toast("Fill the input fields!")
                return
            }
            try {
                setLoading(true)
                await axios.post(`${BACKEND_URL}/api/quiz/create/text`, {
                    categoryName,
                    categoryDesc,
                    text: prompt
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                toast("Quiz Created")
                fetchCategory()
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
                    await axios.post(`${BACKEND_URL}/api/quiz/create/pdf`, {
                        categoryName,
                        categoryDesc,
                        text
                    }, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                    toast("Quiz Created")
                    fetchCategory()
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

                const response = await axios.post(`${BACKEND_URL}/api/quiz/create/pdf/bulk`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`
                    }
                })
                setJobId(response.data.jobId)
                toast.loading("Generating quizzes...")

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

                await axios.post(`${BACKEND_URL}/api/quiz/create/image`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`
                    }
                })
                toast("Quiz Created")
                fetchCategory()
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
            {/* <div className={`w-89 h-16 fixed right-5 bottom-5 rounded-lg flex items-center gap-1 px-5 font-bold bg-primary text-secondary 
                ${status === "PENDING" ? "block" : "hidden"}`}>
                <span>
                    Generating quizzes
                </span>
                <div className="flex flex-row gap-1 mt-2">
                    <div className="w-1 h-1 rounded-full bg-secondary animate-bounce"></div>
                    <div className="w-1 h-1 rounded-full bg-secondary animate-bounce [animation-delay:-.3s]"></div>
                    <div className="w-1 h-1 rounded-full bg-secondary animate-bounce [animation-delay:-.5s]"></div>
                </div>
            </div> */}
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

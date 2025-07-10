"use client"

import QuizCard from './quiz-card'
import { Skeleton } from '@/components/ui/skeleton'
import { ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useQuizStore } from '@repo/store'
import { useEffect, useState } from 'react'
import { useAuth } from '@clerk/nextjs'
import { BACKEND_URL } from '@/lib/env'

export default function RecentQuiz() {
    const { quizzes, fetchCategories, fetchQuizLen, quizzesLength, loading } = useQuizStore()
    const [page, setPage] = useState(1)
    const { getToken } = useAuth()

    useEffect(() => {
        (async function fetchData() {
            const token = await getToken()
            fetchQuizLen(token!, BACKEND_URL)
        })()
    }, [fetchQuizLen, getToken])

    useEffect(() => {
        (async function fetchData() {
            const token = await getToken()
            fetchCategories(page, token!, BACKEND_URL)
        })()
    }, [page, quizzesLength, getToken, fetchCategories])

    async function fetchData() {
        const token = await getToken()
        fetchCategories(page, token!, BACKEND_URL)
    }

    return (
        <>
            <div className="mb-6 flex">
                <div className="mx-auto flex items-center gap-2">

                    <h2 className="text-2xl font-bold">Recent Quizzes</h2>
                    <RotateCcw
                        size={18}
                        onClick={() => fetchData()}
                        className='cursor-pointer active:-rotate-45 transition-transform mt-1.5' />
                </div>
            </div>
            {
                quizzes.length === 0 ?
                    <div className="text-xl text-center my-10 underline">
                        You haven&apos;t created any quizzes yet
                    </div> :
                    <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6 mb-6">

                        {
                            loading ?
                                <>
                                    <Skeleton className='w-full h-39' />
                                    <Skeleton className='w-full h-39' />
                                    <Skeleton className='w-full h-39' />
                                </> :
                                quizzes?.map((category, i) => {
                                    return <QuizCard
                                        key={i}
                                        id={category.id}
                                        name={category.name}
                                        desc={category.desc}
                                        length={category.length}
                                        created={category.created}
                                    />
                                })
                        }
                    </div>
            }
            <div className="flex items-center justify-center gap-2 mx-auto w-full mb-12">
                <Button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}>
                    {loading ? "..." : <ArrowLeft />}
                </Button>
                <Button
                    disabled={page > Math.round(quizzesLength / 6)}
                    onClick={() => setPage(page + 1)}>
                    {loading ? "..." : <ArrowRight />}
                </Button>
            </div>
        </>
    )
}

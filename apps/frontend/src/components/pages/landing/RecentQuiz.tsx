"use client"

import QuizCard from './quiz-card'
import { Skeleton } from '@/components/ui/skeleton'
import { ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useQuizStore } from '@repo/store'
import { useEffect, useState } from 'react'

export default function RecentQuiz() {
    const { quizzes, fetchCategories, fetchQuizLen, quizzesLength, loading } = useQuizStore()
    const [page, setPage] = useState(1)

    useEffect(() => {
        fetchQuizLen()
    }, [])

    useEffect(() => {
        fetchCategories(page)
    }, [page, quizzesLength])
    
    if (quizzesLength === 0) return (
        <div />
    )

    return (
        <>
            <div className="mb-6 flex">
                <div className="mx-auto flex items-center gap-2">

                    <h2 className="text-2xl font-bold">Recent Quizzes</h2>
                    <RotateCcw
                        size={18}
                        onClick={() => fetchCategories(page)}
                        className='cursor-pointer active:-rotate-45 transition-transform mt-1.5' />
                </div>
            </div>
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

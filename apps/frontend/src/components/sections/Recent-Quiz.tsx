"use client"

import QuizCard from '../quiz-card'
import { useFetchCategoriesBulk } from '@/hooks/use-fetchCategories'
import { Skeleton } from '../ui/skeleton'
import { RotateCcw } from 'lucide-react'

export default function RecentQuiz() {
    const { categories, loading, reloadData } = useFetchCategoriesBulk()

    return (
        <>
            <div className="mb-6 flex">
                <div className="mx-auto flex items-center gap-2">

                    <h2 className="text-2xl font-bold">Recent Quizzes</h2>
                    <RotateCcw
                        size={18}
                        onClick={reloadData}
                        className='cursor-pointer active:-rotate-45 transition-transform mt-1.5' />
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6 mb-12">
                {
                    loading ?
                        <>
                            <Skeleton className='w-full h-39' />
                            <Skeleton className='w-full h-39' />
                            <Skeleton className='w-full h-39' />
                        </> :
                        categories?.map((category, i) => {
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
        </>
    )
}

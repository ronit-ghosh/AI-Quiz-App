"use client"

import QuizCard from '../quiz-card'
import { useFetchCategoriesBulk } from '@/hooks/use-fetchCategories'
import { Skeleton } from '../ui/skeleton'

export default function RecentQuiz() {
    const { categories, loading } = useFetchCategoriesBulk()

    return (
        <>
            <h2 className="text-2xl font-bold mb-6">Recent Quizzes</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
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

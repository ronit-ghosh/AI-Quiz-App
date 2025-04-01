import { Lightbulb } from "lucide-react";
import StatsPage from "./StatsPage";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { StatTypes } from "@/lib/types";
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";

export default function ReviewAnswers({ data }: { data: StatTypes }) {
    const time = formatDistanceToNow(new Date(data.createdAt), { addSuffix: true })

    return (
        <div className="my-10 max-w-5xl w-[95%] mx-auto">
            <StatsPage
                answeredQuestions={data.answeredQuestions}
                correctAnswers={data.correctAnswers}
                incorrectAnswers={data.incorrectAnswers}
                name={data.category.name}
                score={data.score}
                time={time}
                totalQuestions={10}
                isReviewPage
            />
            <Accordion type="single" collapsible className="w-full mt-4">
                {
                    data.category.questions.map((question, i) => {
                        const userAttemptedQusetion = data.answers.find(ans => ans.questionId === question.id)
                        const isCorrect = userAttemptedQusetion?.optionId === question.correct

                        return (
                            <AccordionItem
                                key={i}
                                value={`item-${i}`}
                                className={`
                                ${userAttemptedQusetion && isCorrect && "dark:bg-green-700/20 bg-green-50"}
                                ${userAttemptedQusetion && !isCorrect && "dark:bg-red-700/20 bg-red-50"}
                            `}>
                                <AccordionTrigger>
                                    {question.question}
                                </AccordionTrigger>
                                <AccordionContent>
                                    {
                                        question.options.map((option, i) => {
                                            const correctAnswer = option.optionId === question.correct
                                            const userAttemptedOpionId = userAttemptedQusetion?.optionId === option.optionId
                                            const isUserAnswerCorrect = userAttemptedQusetion?.optionId === question.correct

                                            return <div key={i} className={`
                                                    border py-3 px-4 rounded-xl bg-background/50 mb-2 flex
                                                    ${correctAnswer && "border-green-400 text-green-500 font-bold"}
                                                    ${userAttemptedOpionId && !isUserAnswerCorrect && "border-red-400 text-red-500 font-bold"}
                                                `}>
                                                <span className={`mr-2 ${correctAnswer ? "block" : "hidden"} `}>(✓)</span>
                                                {option.option}
                                                <span className={`ml-4 
                                                    ${userAttemptedOpionId ? "block" : "hidden"}
                                                    ${userAttemptedOpionId && isUserAnswerCorrect ? "text-green-500" : "text-red-500"}
                                                `}>(Your Answer)</span>
                                            </div>
                                        })
                                    }
                                    <div className="border py-3 px-4 rounded-xl dark:bg-yellow-900/40 bg-yellow-100 mt-4 flex gap-2 items-center">
                                        <span className="dark:bg-yellow-900/40 bg-yellow-200/80 p-2 rounded-full">
                                            <Lightbulb className="text-yellow-500" />
                                        </span>
                                        {question.explanation}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        )
                    })
                }
            </Accordion>
        </div >
    )
}

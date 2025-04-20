import { Lightbulb } from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { StatTypes } from "@/lib/types";
import { formatDistanceToNow } from "date-fns";
import SingleStats from "./SingleStats";

export default function ReviewAnswers({ data }: { data: StatTypes }) {
    const time = formatDistanceToNow(new Date(data.createdAt), { addSuffix: true })

    return (
        <div className="my-10 max-w-5xl w-[95%] mx-auto">
            <SingleStats
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
                                    ${!userAttemptedQusetion && "bg-gradient-to-b dark:from-neutral-800/40 dark:to-neutral-800/20 from-neutral-50 to-neutral-100"}
                                ${userAttemptedQusetion && isCorrect && "bg-gradient-to-b dark:from-green-700/40 dark:to-green-700/20 from-green-50 to-green-100"}
                                ${userAttemptedQusetion && !isCorrect && "bg-gradient-to-b dark:from-red-700/40 dark:to-red-700/20 from-red-50 to-red-100"}\
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
                                                    border py-3 px-4 rounded-xl bg-background/30 mb-2 flex
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

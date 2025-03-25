"use client"

import QuizOption from '../quiz-option'
import { FileImage, FileText, FileType } from 'lucide-react'

export default function CreateQuiz() {
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <QuizOption
                icon={<FileText className="h-6 w-6 text-blue-600" />}
                title="Text to Quiz"
                description="Generate quizzes from text passages and notes"
                isTextQuiz
            />

            <QuizOption
                icon={<FileType className="h-6 w-6 text-blue-600" />}
                title="Short PDF to Quiz"
                description="Convert 2-3 page PDF documents into quizzes"
            />

            <QuizOption
                icon={<FileText className="h-6 w-6 text-blue-600" />}
                title="Multipage PDF to Quiz"
                description="Transform longer PDF documents into comprehensive quizzes"
            />

            <QuizOption
                icon={<FileImage className="h-6 w-6 text-blue-600" />}
                title="Image to Quiz"
                description="Create quizzes from diagrams, charts and visual content"
            />
        </div>
    )
}

import TipItem from "./tip-item";

export default function CreateQuizTips() {
    return (
        <>
            <h2 className="text-2xl font-bold text-center mb-6">Tips for Better Quiz Generation</h2>
            <div className="bg-card max-w-4xl mx-auto rounded-lg shadow-sm p-8 bg-gradient-to-b dark:from-neutral-900 dark:to-neutral-950 from-neutral-50 to-neutral-100">
                <div className="space-y-2 grid md:grid-cols-2 grid-cols-1 mx-auto">
                    <TipItem text="Use clear, well-structured content for more accurate questions" />
                    <TipItem text="Include definitions, facts, and key concepts for better questions" />
                    <TipItem text="For PDFs, ensure the document text is selectable, not image-based" />
                    <TipItem text="For images, make sure text is clear and readable in the diagram" />
                </div>
            </div>
        </>
    )
}

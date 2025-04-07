import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Brain, FileText, Image, Upload } from "lucide-react";
import Link from "next/link";

export default function page() {
  return (
    <div className="min-h-screen w-full bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-slate-950">
        <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)]" />
      </div>

      <main className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tighter bg-gradient-to-bl from-blue-500 to-blue-700 bg-clip-text text-transparent">
              Quiz AI
            </h1>
            <p className="text-xl text-muted-foreground max-w-[600px] mx-auto">
              Create engaging quizzes instantly using AI. Upload content, get intelligent questions.
            </p>
          </div>
          <Link href="/app">
            <Button className="bg-gradient-to-bl from-blue-500 to-blue-700">Get Started</Button>
          </Link>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-5xl">
            <Card className="p-6 hover:shadow-lg transition-shadow group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform mx-auto dark:bg-blue-900/40 bg-blue-100 ">
                  <Brain className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold">Text Prompt</h3>
                <p className="text-sm text-muted-foreground">
                  Generate quizzes from simple text descriptions
                </p>
                <Link href="/app">
                  <Button className="w-full">Try Now</Button>
                </Link>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform mx-auto dark:bg-blue-900/40 bg-blue-100">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold">Small PDF</h3>
                <p className="text-sm text-muted-foreground">
                  Upload small PDFs for targeted quizzes
                </p>
                <Link href="/app">
                  <Button className="w-full">Upload PDF</Button>
                </Link>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform mx-auto dark:bg-blue-900/40 bg-blue-100">
                  <Upload className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold">Large PDF</h3>
                <p className="text-sm text-muted-foreground">
                  Process extensive documents efficiently
                </p>
                <Link href="/app">
                  <Button className="w-full">Upload PDF</Button>
                </Link>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform mx-auto dark:bg-blue-900/40 bg-blue-100">
                  <Image className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold">Image Upload</h3>
                <p className="text-sm text-muted-foreground">
                  Create quizzes from images and diagrams
                </p>
                <Link href="/app">
                  <Button className="w-full">Upload Image</Button>
                </Link>
              </div>
            </Card>
          </div>

          <div className="mt-16 space-y-8">
            <h2 className="text-3xl font-bold">Why Choose Quiz AI?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">Intelligent Generation</h3>
                <p className="text-muted-foreground">
                  Advanced AI algorithms create relevant and challenging questions
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">Multiple Formats</h3>
                <p className="text-muted-foreground">
                  Support for text, PDFs, and images gives you flexibility
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">Instant Results</h3>
                <p className="text-muted-foreground">
                  Get your quiz generated within seconds
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
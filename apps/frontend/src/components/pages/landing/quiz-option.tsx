"use client"

import type React from "react"

import { useState, type ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload } from "lucide-react"
import { toast } from "sonner"

interface QuizOptionProps {
  icon: ReactNode
  title: string
  description: string
  isTextQuiz?: boolean
  handleGeneration?: (categoryName: string, categoryDesc: string, file?: File, prompt?: string) => void
  loading: boolean
}

export default function QuizOption({ icon, title, description, isTextQuiz, handleGeneration, loading }: QuizOptionProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [categoryName, setCategoryName] = useState<string>("")
  const [categoryDesc, setCategoryDesc] = useState<string>("")
  const [prompt, setPrompt] = useState<string>("")
  const [file, setFile] = useState<File | undefined>(undefined)
  const [uploaded, setUploaded] = useState(false)

  const onSubmit = () => {
    handleGeneration!(
      categoryName,
      categoryDesc,
      file,
      prompt
    )
  }

  function handleFileChange() {
    const input = document.createElement("input")
    input.type = "file"

    if (title.includes("PDF")) {
      input.accept = "application/pdf"

      input.onchange = async () => {
        if (!input.files) {
          toast("No file found!")
          return
        }

        const file = input.files[0]
        setFile(file)
        setUploaded(true)
      }
    } else {
      input.accept = "image/png"

      input.onchange = async () => {
        if (!input.files) {
          toast("No file found!")
          return
        }

        const file = input.files[0]
        setFile(file)
        setUploaded(true)
      }
    }

    input.click()
  }

  return (
    <>
      <div className="bg-card rounded-lg shadow-sm p-6 flex flex-col items-center border dark:border-neutral-900 border-neutral-50 bg-gradient-to-b dark:from-neutral-900 dark:to-neutral-950 from-neutral-50 to-neutral-100">
        <div className="w-12 h-12 rounded-full dark:bg-blue-900/20 bg-blue-100 flex items-center justify-center mb-4">{icon}</div>
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <p className="text-primary/60 text-sm text-center mb-6">{description}</p>
        <Button
          className={`w-full py-2 px-4 rounded-md text-white font-medium`}
          onClick={() => setIsOpen(true)}
        >
          Create Quiz
        </Button>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogDescription />
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Create {title}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="grid gap-2">
              <Label htmlFor="category-name">Category Name</Label>
              <Input
                onChange={e => setCategoryName(e.target.value)}
                id="category-name"
                placeholder="Enter category name" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="category-description">Category Description</Label>
              <Textarea
                onChange={e => setCategoryDesc(e.target.value)}
                id="category-description"
                placeholder="Enter a brief description of this quiz category"
                className="resize-none h-16"
              />
            </div>

            <div className="grid gap-2">
              <Label>Upload Content</Label>
              {
                !isTextQuiz ?
                  <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center gap-2">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <Upload className="h-6 w-6 text-blue-600" />
                    </div>
                    <p className="text-sm text-gray-600 text-center">
                      {"Drag and drop your file here, or click to browse"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {title.includes("PDF")
                        ? "Supports PDF files (max 10MB)"
                        : title.includes("Image")
                          ? "Supports JPG, PNG files (max 10MB)"
                          : "Supports TXT, PDF files (max 10MB)"}
                    </p>
                    {
                      !uploaded ?
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="mt-2"
                          onClick={handleFileChange}
                        >
                          Browse Files
                        </Button> :
                        <div className="flex gap-2">
                          <Button
                            disabled
                            variant="outline"
                            size="sm"
                            className="mt-2"
                          >
                            Uploaded
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-2"
                            onClick={() => setUploaded(false)}
                          >
                            Clear
                          </Button>
                        </div>
                    }
                    {/* <Button onClick={() => setUploaded(false)}></Button> */}
                  </div> :
                  <Textarea
                    onChange={e => setPrompt(e.target.value)}
                    className="h-40 resize-none"
                    placeholder="Enter a brief prompt..."
                  />
              }
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button
                disabled={loading || !categoryDesc || !categoryName || !prompt && !file}
                onClick={onSubmit}>
                {loading ? "Generating..." : "Create Quiz"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}


"use client"

import { useState } from "react"
import { Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export default function CreateQuizModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [fileName, setFileName] = useState("")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0]!.name)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Create New Quiz</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="grid gap-2">
            <Label htmlFor="category-name">Category Name</Label>
            <Input id="category-name" placeholder="Enter category name" />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="category-description">Category Description</Label>
            <Textarea
              id="category-description"
              placeholder="Enter a brief description of this quiz category"
              rows={3}
            />
          </div>

          <div className="grid gap-2">
            <Label>Upload Content</Label>
            <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center gap-2">
              <div className="bg-blue-100 p-3 rounded-full">
                <Upload className="h-6 w-6 text-blue-600" />
              </div>
              <p className="text-sm text-gray-600 text-center">
                {fileName ? fileName : "Drag and drop your file here, or click to browse"}
              </p>
              <p className="text-xs text-gray-500">Supports PDF, JPG, PNG (max 10MB)</p>
              <Input
                id="file-upload"
                type="file"
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
              />
              <Button
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => document.getElementById("file-upload")?.click()}
              >
                Browse Files
              </Button>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button>Create Quiz</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}


"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { FiUpload } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import RichTextEditor from "@/components/RichTextEditor";
import { uploadImage, addArticle, getAllArticles } from "@/firebase/firestore";

export default function AddArticlePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [readingTime, setReadingTime] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      let imageUrl = undefined;

      if (file) {
        // Upload image to Firebase and get the URL
        // imageUrl = await uploadImage(file, "articles");
        imageUrl =
          "https://images.unsplash.com/photo-1742969590900-67c6d077946d?q=80&w=1894&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
        console.log("Uploaded Image URL:", imageUrl);
      }

      // Prepare article data
      const articleData = {
        title,
        content,
        category,
        readingTime: Number(readingTime),
        imageUrl,
      };

      // Add article to Firestore
      const articleId = await addArticle(articleData);
      console.log("Article added with ID:", articleId);
        
      alert("Article submitted successfully!");

      // Reset form
      setTitle("");
      setReadingTime("");
      setContent("");
      setCategory("");
      setFile(null);
      setPreview(null);
    } catch (error) {
      console.error("Error submitting article:", error);
      alert("Failed to submit article. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Add New Article</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Article Title</Label>
          <Input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter article title"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="readingTime">Reading Time in minute</Label>
          <Input
            type="number"
            id="readingTime"
            value={readingTime}
            onChange={(e) => setReadingTime(e.target.value)}
            placeholder="e.g., 5 min read"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select value={category} onValueChange={setCategory} required>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="science">Science</SelectItem>
                <SelectItem value="art">Art</SelectItem>
                <SelectItem value="travel">Travel</SelectItem>
                <SelectItem value="lifestyle">Lifestyle</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="content">Article Content</Label>
          <RichTextEditor content={content} onChange={setContent} />
        </div>

        <div className="space-y-2">
          <Label>Featured Image</Label>
          <Card>
            <CardContent className="p-6">
              {preview ? (
                <div className="relative flex flex-col items-center">
                  <img
                    src={preview}
                    alt="Preview"
                    className="mx-auto max-h-52 object-contain mb-4"
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      setFile(null);
                      setPreview(null);
                    }}
                  >
                    Remove
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <FiUpload className="text-4xl mb-4 text-gray-400" />
                  <p className="mb-4 text-sm text-gray-600">
                    Drag and drop an image, or click to select
                  </p>
                  <Label htmlFor="image-upload" className="cursor-pointer">
                    <Button
                      variant="secondary"
                      type="button" // Explicitly set type to button to prevent form submission
                      onClick={() =>
                        document.getElementById("image-upload")?.click()
                      } // Trigger file input click
                    >
                      Select Image
                    </Button>
                    <Input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </Label>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Publish Article"}
          </Button>
        </div>
      </form>
    </div>
  );
}

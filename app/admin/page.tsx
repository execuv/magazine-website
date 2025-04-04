"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Plus, Trash2, Edit2 } from "lucide-react"
import { useAuth } from "@/authContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import {
  Magazine,
  getMagazines,
  addMagazine,
  deleteMagazine,
  updateMagazine,
} from "@/firebase/firestore"

export default function AdminPage() {
  const { currentUser, userLoggedIn } = useAuth()
  const router = useRouter()
  const [magazines, setMagazines] = useState<Magazine[]>([])
  const [loading, setLoading] = useState(true)
  const [isAddingMagazine, setIsAddingMagazine] = useState(false)
  const [newMagazine, setNewMagazine] = useState({
    name: "",
    description: "",
    brand: "",
    category: "",
    price: 0,
    image: "",
    pageCount: 0,
    language: "English",
    publicationDate: "",
    physicalDelivery: false,
    badge: "",
    previewImage: [""],
    deliveryPrice: 0,
    pdfUrl: "", // Add this new field
  })
  const [editingMagazine, setEditingMagazine] = useState<Magazine | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  const handleAddPreviewImage = () => {
    setNewMagazine({
      ...newMagazine,
      previewImage: [...newMagazine.previewImage, ""],
    })
  }

  const handleRemovePreviewImage = (index: number) => {
    setNewMagazine({
      ...newMagazine,
      previewImage: newMagazine.previewImage.filter((_, i) => i !== index),
    })
  }

  const handlePreviewImageChange = (index: number, value: string) => {
    const updatedImages = [...newMagazine.previewImage]
    updatedImages[index] = value
    setNewMagazine({
      ...newMagazine,
      previewImage: updatedImages,
    })
  }

  useEffect(() => {
    // Redirect if not admin
    if (!userLoggedIn || currentUser?.email !== "admin@example.com") {
      // router.push("/")
      // return
    }

    const loadMagazines = async () => {
      try {
        const data = await getMagazines()
        setMagazines(data)
      } catch (error) {
        toast.error("Failed to load magazines")
      } finally {
        setLoading(false)
      }
    }

    loadMagazines()
  }, [userLoggedIn, currentUser, router])

  const handleAddMagazine = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setIsAddingMagazine(true)
      await addMagazine({
        ...newMagazine,
        price: newMagazine.price * 100, // Convert to cents
      })
      toast.success("Magazine added successfully")
      // Reset form
      setNewMagazine({
        name: "",
        description: "",
        brand: "",
        category: "",
        price: 0,
        image: "",
        pageCount: 0,
        language: "English",
        publicationDate: "",
        physicalDelivery: false,
        badge: "",
        previewImage: [""],
        deliveryPrice: 0,
        pdfUrl: "", // Add this new field
      })
      // Refresh magazine list
      const data = await getMagazines()
      setMagazines(data)
    } catch (error) {
      toast.error("Failed to add magazine")
    } finally {
      setIsAddingMagazine(false)
    }
  }

  const handleDeleteMagazine = async (id: string) => {
    if (!confirm("Are you sure you want to delete this magazine?")) return
    try {
      await deleteMagazine(id)
      toast.success("Magazine deleted successfully")
      setMagazines(magazines.filter((mag) => mag.id !== id))
    } catch (error) {
      toast.error("Failed to delete magazine")
    }
  }

  const handleEditClick = (magazine: Magazine) => {
    setEditingMagazine(magazine)
    setNewMagazine({
      name: magazine.name,
      description: magazine.description,
      brand: magazine.brand,
      category: magazine.category,
      price: magazine.price / 100, // Convert from cents to dollars
      image: magazine.image,
      pageCount: magazine.pageCount,
      language: magazine.language,
      publicationDate: magazine.publicationDate,
      physicalDelivery: magazine.physicalDelivery,
      badge: magazine.badge || "",
      previewImage: magazine.previewImage,
      deliveryPrice: magazine.deliveryPrice || 0,
      pdfUrl: magazine.pdfUrl || "", // Add this new field
    })
    setIsEditing(true)
  }

  const handleCancelEdit = () => {
    setEditingMagazine(null)
    setIsEditing(false)
    // Reset form
    setNewMagazine({
      name: "",
      description: "",
      brand: "",
      category: "",
      price: 0,
      image: "",
      pageCount: 0,
      language: "English",
      publicationDate: "",
      physicalDelivery: false,
      badge: "",
      previewImage: [""],
      deliveryPrice: 0,
      pdfUrl: "", // Add this new field
    })
  }

  const handleUpdateMagazine = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingMagazine) return

    try {
      setIsAddingMagazine(true)
      await updateMagazine(editingMagazine.id, {
        ...newMagazine,
        price: newMagazine.price * 100, // Convert to cents
      })
      toast.success("Magazine updated successfully")
      // Refresh magazine list
      const data = await getMagazines()
      setMagazines(data)
      handleCancelEdit()
    } catch (error) {
      toast.error("Failed to update magazine")
    } finally {
      setIsAddingMagazine(false)
    }
  }

  // Update the form title and submit button based on edit mode
  const formTitle = isEditing ? "Edit Magazine" : "Add New Magazine"
  const submitButtonText = isEditing ? "Update Magazine" : "Add Magazine"
  const handleSubmit = isEditing ? handleUpdateMagazine : handleAddMagazine

  if (loading) return <div>Loading...</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">{formTitle}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={newMagazine.name}
                  onChange={(e) =>
                    setNewMagazine({ ...newMagazine, name: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <Label htmlFor="brand">Brand</Label>
                <Input
                  id="brand"
                  value={newMagazine.brand}
                  onChange={(e) =>
                    setNewMagazine({ ...newMagazine, brand: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newMagazine.description}
                onChange={(e) =>
                  setNewMagazine({
                    ...newMagazine,
                    description: e.target.value,
                  })
                }
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">Price ($)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={newMagazine.price}
                  onChange={(e) =>
                    setNewMagazine({
                      ...newMagazine,
                      price: parseFloat(e.target.value),
                    })
                  }
                  required
                />
              </div>

              <div>
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={newMagazine.category}
                  onChange={(e) =>
                    setNewMagazine({ ...newMagazine, category: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="pageCount">Page Count</Label>
                <Input
                  id="pageCount"
                  type="number"
                  value={newMagazine.pageCount}
                  onChange={(e) =>
                    setNewMagazine({
                      ...newMagazine,
                      pageCount: parseInt(e.target.value),
                    })
                  }
                  required
                />
              </div>

              <div>
                <Label htmlFor="language">Language</Label>
                <Input
                  id="language"
                  value={newMagazine.language}
                  onChange={(e) =>
                    setNewMagazine({ ...newMagazine, language: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="publicationDate">Publication Date</Label>
                <Input
                  id="publicationDate"
                  type="date"
                  value={newMagazine.publicationDate}
                  onChange={(e) =>
                    setNewMagazine({
                      ...newMagazine,
                      publicationDate: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div>
                <Label htmlFor="badge">Badge (optional)</Label>
                <Input
                  id="badge"
                  value={newMagazine.badge}
                  onChange={(e) =>
                    setNewMagazine({ ...newMagazine, badge: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <Label htmlFor="image">Cover Image URL</Label>
              <Input
                id="image"
                value={newMagazine.image}
                onChange={(e) =>
                  setNewMagazine({ ...newMagazine, image: e.target.value })
                }
                required
              />
            </div>

            <div>
              <Label htmlFor="pdfUrl">PDF Download URL</Label>
              <Input
                id="pdfUrl"
                type="url"
                value={newMagazine.pdfUrl}
                onChange={(e) =>
                  setNewMagazine({ ...newMagazine, pdfUrl: e.target.value })
                }
                placeholder="Enter secure URL to PDF file"
                required
              />
              <p className="text-xs text-muted-foreground mt-1">
                This URL will be used to download the magazine after purchase
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Preview Images</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddPreviewImage}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Image URL
                </Button>
              </div>

              {newMagazine.previewImage.map((url, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={url}
                    onChange={(e) =>
                      handlePreviewImageChange(index, e.target.value)
                    }
                    placeholder={`Preview image URL ${index + 1}`}
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => handleRemovePreviewImage(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="physicalDelivery"
                  checked={newMagazine.physicalDelivery}
                  onChange={(e) =>
                    setNewMagazine({
                      ...newMagazine,
                      physicalDelivery: e.target.checked,
                    })
                  }
                  className="form-checkbox"
                />
                <Label htmlFor="physicalDelivery">
                  Physical Delivery Available
                </Label>
              </div>

              {newMagazine.physicalDelivery && (
                <div>
                  <Label htmlFor="deliveryPrice">Delivery Price ($)</Label>
                  <Input
                    id="deliveryPrice"
                    type="number"
                    step="0.01"
                    value={newMagazine.deliveryPrice}
                    onChange={(e) =>
                      setNewMagazine({
                        ...newMagazine,
                        deliveryPrice: parseFloat(e.target.value),
                      })
                    }
                  />
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <Button type="submit" disabled={isAddingMagazine}>
                {isAddingMagazine ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                    {isEditing ? "Updating..." : "Adding..."}
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    {submitButtonText}
                  </span>
                )}
              </Button>

              {isEditing && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancelEdit}
                >
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Manage Magazines</h2>
          <div className="space-y-4">
            {magazines.map((magazine) => (
              <div
                key={magazine.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={magazine.image}
                    alt={magazine.name}
                    className="w-16 h-24 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-semibold">{magazine.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      ${(magazine.price / 100).toFixed(2)} • {magazine.category}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleEditClick(magazine)}
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleDeleteMagazine(magazine.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'
import { uploadImage } from '@/lib/supabase/storage-client'

interface ImageItem {
  id: string
  url: string
  file?: File
  isExisting?: boolean
}

interface MultiImageUploadProps {
  existingImages?: Array<{ id: string; image_url: string; display_order: number }>
  onImagesChange: (images: ImageItem[]) => void
  maxImages?: number
}

export default function MultiImageUpload({ 
  existingImages = [], 
  onImagesChange,
  maxImages = 3 
}: MultiImageUploadProps) {
  const [images, setImages] = useState<ImageItem[]>(() => 
    existingImages.map((img, index) => ({
      id: img.id,
      url: img.image_url,
      isExisting: true
    }))
  )
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileSelect = useCallback((files: FileList | null) => {
    if (!files) return
    
    const newImages: ImageItem[] = []
    const remainingSlots = maxImages - images.length
    
    if (remainingSlots <= 0) {
      setError(`最大${maxImages}枚まで登録できます`)
      return
    }

    Array.from(files).slice(0, remainingSlots).forEach(file => {
      if (file.size > 5 * 1024 * 1024) {
        setError('画像サイズは5MB以下にしてください')
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        const newImage: ImageItem = {
          id: `new-${Date.now()}-${Math.random()}`,
          url: reader.result as string,
          file
        }
        newImages.push(newImage)
        
        if (newImages.length === files.length || newImages.length === remainingSlots) {
          const updatedImages = [...images, ...newImages]
          setImages(updatedImages)
          onImagesChange(updatedImages)
          setError(null)
        }
      }
      reader.readAsDataURL(file)
    })
  }, [images, maxImages, onImagesChange])

  const handleDragStart = (index: number) => {
    setDraggedIndex(index)
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    if (draggedIndex === null || draggedIndex === index) return

    const newImages = [...images]
    const draggedImage = newImages[draggedIndex]
    newImages.splice(draggedIndex, 1)
    newImages.splice(index, 0, draggedImage)
    
    setImages(newImages)
    setDraggedIndex(index)
  }

  const handleDragEnd = () => {
    if (draggedIndex !== null) {
      onImagesChange(images)
    }
    setDraggedIndex(null)
  }

  const handleRemove = (index: number) => {
    const newImages = images.filter((_, i) => i !== index)
    setImages(newImages)
    onImagesChange(newImages)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    handleFileSelect(e.dataTransfer.files)
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="text-sm text-red-600">{error}</div>
      )}

      <div className="grid grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div
            key={image.id}
            className="relative group cursor-move"
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragEnd={handleDragEnd}
          >
            <div className="aspect-square relative overflow-hidden rounded-lg border-2 border-gray-200 hover:border-primary-500 transition-colors">
              <Image
                src={image.url}
                alt={`画像 ${index + 1}`}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              {/* 順番バッジ */}
              <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold text-gray-800 shadow-md">
                {index + 1}
              </div>

              {/* 削除ボタン */}
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        ))}

        {images.length < maxImages && (
          <label
            className="aspect-square relative overflow-hidden rounded-lg border-2 border-dashed border-gray-300 hover:border-primary-500 transition-colors cursor-pointer flex items-center justify-center bg-gray-50 hover:bg-gray-100"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => handleFileSelect(e.target.files)}
              className="hidden"
            />
            <div className="text-center">
              <svg className="w-12 h-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
              </svg>
              <p className="text-sm text-gray-600">画像を追加</p>
              <p className="text-xs text-gray-500 mt-1">
                残り{maxImages - images.length}枚
              </p>
            </div>
          </label>
        )}
      </div>

      <div className="text-sm text-gray-500">
        <p>• 最大{maxImages}枚まで登録できます</p>
        <p>• ドラッグ&ドロップで順番を変更できます</p>
        <p>• 画像をクリックして削除できます</p>
        <p>• 1枚目の画像がサムネイルになります</p>
      </div>
    </div>
  )
}
"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import ReactCrop, { type Crop, type PixelCrop, centerCrop, makeAspectCrop } from "react-image-crop"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Card } from "@/components/ui/card"
import { canvasPreview } from "@/lib/canvas-preview"
import { useLanguage } from "@/contexts/language-context"
import { RotateCcw, ZoomIn, Sparkles } from "lucide-react"
import "react-image-crop/dist/ReactCrop.css"

interface PhotoCropperProps {
  image: string
  onCropComplete: (croppedImageUrl: string) => void
}

// 法国签证照片比例 35mm x 45mm
const ASPECT_RATIO = 35 / 45

export default function PhotoCropper({ image, onCropComplete }: PhotoCropperProps) {
  const [crop, setCrop] = useState<Crop>()
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
  const [scale, setScale] = useState(1)
  const [rotate, setRotate] = useState(0)
  const imgRef = useRef<HTMLImageElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { t } = useLanguage()

  function centerAspectCrop(mediaWidth: number, mediaHeight: number, aspect: number) {
    return centerCrop(
      makeAspectCrop(
        {
          unit: "%",
          width: 90,
        },
        aspect,
        mediaWidth,
        mediaHeight,
      ),
      mediaWidth,
      mediaHeight,
    )
  }

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const { width, height } = e.currentTarget
    setCrop(centerAspectCrop(width, height, ASPECT_RATIO))
  }

  useEffect(() => {
    if (completedCrop?.width && completedCrop?.height && imgRef.current && canvasRef.current) {
      canvasPreview(imgRef.current, canvasRef.current, completedCrop, scale, rotate)
    }
  }, [completedCrop, scale, rotate])

  const handleComplete = () => {
    if (completedCrop?.width && completedCrop?.height && canvasRef.current) {
      const dataUrl = canvasRef.current.toDataURL("image/jpeg")
      onCropComplete(dataUrl)
    }
  }

  return (
    <div className="space-y-10">
      {/* Image Cropping Area */}
      <div className="flex justify-center">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-violet-400 via-purple-500 to-fuchsia-500 p-2">
          <div className="bg-white rounded-2xl p-4">
            <ReactCrop
              crop={crop}
              onChange={(c) => setCrop(c)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={ASPECT_RATIO}
              minHeight={100}
              className="max-w-full"
            >
              <img
                ref={imgRef}
                alt="Upload"
                src={image || "/placeholder.svg"}
                style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
                onLoad={onImageLoad}
                className="max-h-[500px] w-auto rounded-xl"
              />
            </ReactCrop>
          </div>
        </div>
      </div>

      {/* Controls */}
      <Card className="p-8 bg-gradient-to-br from-white/90 to-violet-50/90 backdrop-blur-xl border-0 shadow-2xl rounded-3xl">
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Scale Control */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl">
                <div className="p-2 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl shadow-lg">
                  <ZoomIn className="h-5 w-5 text-white" />
                </div>
                <label className="text-lg font-bold text-violet-900">{t("scale")}</label>
                <span className="text-sm text-violet-600 bg-white/80 px-3 py-1 rounded-full font-bold shadow-sm">
                  {Math.round(scale * 100)}%
                </span>
              </div>
              <Slider
                value={[scale]}
                min={0.5}
                max={2}
                step={0.01}
                onValueChange={(value) => setScale(value[0])}
                className="w-full"
              />
            </div>

            {/* Rotate Control */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl">
                <div className="p-2 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl shadow-lg">
                  <RotateCcw className="h-5 w-5 text-white" />
                </div>
                <label className="text-lg font-bold text-violet-900">{t("rotate")}</label>
                <span className="text-sm text-violet-600 bg-white/80 px-3 py-1 rounded-full font-bold shadow-sm">
                  {rotate}°
                </span>
              </div>
              <Slider
                value={[rotate]}
                min={-180}
                max={180}
                step={1}
                onValueChange={(value) => setRotate(value[0])}
                className="w-full"
              />
            </div>
          </div>

          {/* Complete Button */}
          <div className="flex justify-center pt-6">
            <Button
              onClick={handleComplete}
              className="flex items-center gap-3 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-600 hover:via-teal-600 hover:to-cyan-600 text-white px-12 py-4 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 text-lg font-bold hover:scale-105"
            >
              <Sparkles className="h-6 w-6 animate-pulse" />
              {t("completeCrop")}
            </Button>
          </div>
        </div>
      </Card>

      <canvas
        ref={canvasRef}
        className="hidden"
        // 法国签证照片尺寸为 35mm x 45mm，以 300dpi 计算
        width={413} // 35mm at 300dpi
        height={531} // 45mm at 300dpi
      />
    </div>
  )
}

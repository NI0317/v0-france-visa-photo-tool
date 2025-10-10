"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Download, Check, Camera, Sparkles } from "lucide-react"
import PhotoCropper from "@/components/photo-cropper"
import RequirementsList from "@/components/requirements-list"
import LanguageSwitcher from "@/components/language-switcher"
import PricingModal from "@/components/pricing-modal"
import { useLanguage } from "@/contexts/language-context"

export default function PhotoTool() {
  const [originalImage, setOriginalImage] = useState<string | null>(null)
  const [croppedImage, setCroppedImage] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("upload")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { t } = useLanguage()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setOriginalImage(reader.result as string)
        setActiveTab("crop")
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleCropComplete = (croppedImageUrl: string) => {
    setCroppedImage(croppedImageUrl)
    setActiveTab("download")
  }

  const handleDownload = () => {
    if (croppedImage) {
      const link = document.createElement("a")
      link.href = croppedImage
      link.download = "french-visa-photo.jpg"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const handleReset = () => {
    setOriginalImage(null)
    setCroppedImage(null)
    setActiveTab("upload")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-900 to-fuchsia-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-pink-400 to-violet-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="container mx-auto py-12 px-4 max-w-7xl relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-16">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 rounded-2xl shadow-2xl">
                <Sparkles className="h-8 w-8 text-white animate-pulse" />
              </div>
              <h1 className="text-5xl sm:text-7xl font-black bg-gradient-to-r from-white via-pink-200 to-violet-200 bg-clip-text text-transparent drop-shadow-2xl">
                {t("title")}
              </h1>
            </div>
            <p className="text-xl text-violet-100 max-w-2xl font-medium leading-relaxed">{t("photoProcessingDesc")}</p>
          </div>
          <div className="flex items-center gap-4">
            <PricingModal />
            <LanguageSwitcher />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Processing Area */}
          <div className="lg:col-span-2">
            <Card className="shadow-2xl border-0 bg-gradient-to-br from-white/95 to-violet-50/95 backdrop-blur-xl rounded-3xl overflow-hidden">
              <CardHeader className="pb-8 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 text-white">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                    <Camera className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-3xl font-bold">{t("photoProcessing")}</CardTitle>
                    <CardDescription className="text-violet-100 mt-2 text-lg font-medium">
                      {t("photoProcessingDesc")}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-8 px-8 pb-8">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-3 bg-gradient-to-r from-violet-100 to-purple-100 p-2 rounded-2xl shadow-inner">
                    <TabsTrigger
                      value="upload"
                      disabled={activeTab === "crop" || activeTab === "download"}
                      className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-500 data-[state=active]:to-purple-500 data-[state=active]:text-white data-[state=active]:shadow-lg font-semibold"
                    >
                      {t("upload")}
                    </TabsTrigger>
                    <TabsTrigger
                      value="crop"
                      disabled={!originalImage || activeTab === "download"}
                      className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-500 data-[state=active]:to-purple-500 data-[state=active]:text-white data-[state=active]:shadow-lg font-semibold"
                    >
                      {t("crop")}
                    </TabsTrigger>
                    <TabsTrigger
                      value="download"
                      disabled={!croppedImage}
                      className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-500 data-[state=active]:to-purple-500 data-[state=active]:text-white data-[state=active]:shadow-lg font-semibold"
                    >
                      {t("download")}
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="upload" className="py-10">
                    <div
                      className="border-3 border-dashed border-violet-300 rounded-3xl p-20 text-center cursor-pointer hover:border-fuchsia-400 hover:bg-gradient-to-br hover:from-violet-50 hover:to-fuchsia-50 transition-all duration-500 group relative overflow-hidden"
                      onClick={handleUploadClick}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-violet-400/10 to-fuchsia-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        className="hidden"
                      />
                      <div className="relative z-10">
                        <div className="p-6 bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 rounded-full w-fit mx-auto mb-8 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-2xl">
                          <Upload className="h-12 w-12 text-white" />
                        </div>
                        <p className="text-2xl font-bold text-violet-900 mb-3">{t("clickToUpload")}</p>
                        <p className="text-violet-600 text-lg">{t("supportedFormats")}</p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="crop" className="py-10">
                    {originalImage && <PhotoCropper image={originalImage} onCropComplete={handleCropComplete} />}
                  </TabsContent>

                  <TabsContent value="download" className="py-10">
                    {croppedImage && (
                      <div className="text-center space-y-8">
                        <div className="relative w-80 h-96 mx-auto rounded-3xl overflow-hidden shadow-2xl border-4 border-gradient-to-br from-violet-400 to-fuchsia-400 bg-gradient-to-br from-violet-400 to-fuchsia-400 p-1">
                          <div className="w-full h-full bg-white rounded-2xl overflow-hidden">
                            <Image
                              src={croppedImage || "/placeholder.svg"}
                              alt="Cropped photo"
                              fill
                              className="object-contain"
                            />
                          </div>
                        </div>
                        <div className="space-y-6">
                          <div className="flex items-center justify-center gap-4 p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border-2 border-emerald-200 shadow-lg">
                            <div className="p-2 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full shadow-lg">
                              <Check className="h-6 w-6 text-white" />
                            </div>
                            <p className="text-emerald-800 font-bold text-lg">{t("photoCompliant")}</p>
                          </div>
                          <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                              onClick={handleDownload}
                              className="flex items-center gap-3 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 hover:from-violet-600 hover:via-purple-600 hover:to-fuchsia-600 text-white px-10 py-4 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 text-lg font-bold hover:scale-105"
                            >
                              <Download className="h-6 w-6" /> {t("downloadPhoto")}
                            </Button>
                            <Button
                              variant="outline"
                              onClick={handleReset}
                              className="px-10 py-4 rounded-2xl border-3 border-violet-300 hover:bg-violet-50 transition-all duration-300 text-lg font-bold hover:scale-105 bg-white/80 backdrop-blur-sm"
                            >
                              {t("startOver")}
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Requirements Sidebar */}
          <div className="lg:col-span-1">
            <RequirementsList />
          </div>
        </div>
      </div>
    </div>
  )
}

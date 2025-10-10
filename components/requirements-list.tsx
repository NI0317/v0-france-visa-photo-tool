"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, ExternalLink, Star } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function RequirementsList() {
  const { t } = useLanguage()

  const requirementSections = [
    {
      title: t("photoSize"),
      items: ["requirements.size1", "requirements.size2"],
      color: "from-cyan-400 via-blue-500 to-indigo-600",
      icon: "📏📏📏",
    },
    {
      title: t("headPosition"),
      items: ["requirements.position1", "requirements.position2"],
      color: "from-emerald-400 via-teal-500 to-cyan-600",
      icon: "👤👤👤👤👤👤👤👤👤👤👤👤👤👤",
    },
    {
      title: t("backgroundAndPose"),
      items: ["requirements.background1", "requirements.background2", "requirements.background3"],
      color: "from-pink-400 via-rose-500 to-red-600",
      icon: "🎭",
    },
    {
      title: t("photoQuality"),
      items: ["requirements.quality1", "requirements.quality2", "requirements.quality3"],
      color: "from-amber-400 via-orange-500 to-red-600",
      icon: "✨",
    },
  ]

  return (
    <Card className="shadow-2xl border-0 bg-gradient-to-br from-white/95 to-violet-50/95 backdrop-blur-xl sticky top-8 rounded-3xl overflow-hidden">
      <CardHeader className="pb-8 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
            <Star className="h-8 w-8 text-white animate-pulse" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold">{t("frenchVisaRequirements")}</CardTitle>
            <CardDescription className="text-orange-100 mt-2 font-medium">{t("officialRequirements")}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-8 pt-8 px-6 pb-8">
        {requirementSections.map((section, index) => (
          <div key={index} className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-violet-50 to-purple-50 rounded-2xl">
              <div className="text-2xl">{section.icon}</div>
              <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${section.color} shadow-lg`} />
              <h3 className="font-bold text-violet-900 text-lg">{section.title}</h3>
            </div>
            <ul className="space-y-4 ml-6">
              {section.items.map((item, itemIndex) => (
                <li key={itemIndex} className="flex items-start gap-4 group">
                  <div className="mt-1 p-1.5 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full group-hover:scale-110 transition-transform duration-200 shadow-lg">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm text-violet-800 leading-relaxed font-medium">{t(item)}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="pt-6 border-t-2 border-gradient-to-r from-violet-200 to-purple-200">
          <a
            href="https://www.diplomatie.gouv.fr/IMG/pdf/sample_photos_france.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-sm bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent font-bold group transition-all duration-200 hover:scale-105"
          >
            <div className="p-2 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full group-hover:rotate-12 transition-transform duration-200 shadow-lg">
              <ExternalLink className="h-4 w-4 text-white" />
            </div>
            {t("viewOfficialDoc")}
          </a>
        </div>
      </CardContent>
    </Card>
  )
}

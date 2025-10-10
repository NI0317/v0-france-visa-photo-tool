"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Check, Globe } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import type { Language } from "@/lib/translations"

const languageNames = {
  zh: "中文",
  en: "English",
  fr: "Français",
}

const languageFlags = {
  zh: "🇨🇳",
  en: "🇺🇸",
  fr: "🇫🇷",
}

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="lg"
          className="flex items-center gap-4 bg-gradient-to-r from-white/90 to-violet-50/90 backdrop-blur-xl border-2 border-violet-200 hover:border-fuchsia-300 shadow-2xl hover:shadow-3xl transition-all duration-300 px-6 py-3 rounded-2xl hover:scale-105"
        >
          <div className="p-2 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-xl shadow-lg">
            <Globe className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-violet-900 text-lg">
            {languageFlags[language]} {languageNames[language]}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-gradient-to-br from-white/95 to-violet-50/95 backdrop-blur-xl border-2 border-violet-200 shadow-2xl rounded-2xl p-3 min-w-[200px]"
      >
        {Object.entries(languageNames).map(([code, name]) => (
          <DropdownMenuItem
            key={code}
            onClick={() => setLanguage(code as Language)}
            className={`flex items-center justify-between gap-4 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 ${
              language === code
                ? "bg-gradient-to-r from-violet-500 to-purple-500 text-white shadow-lg"
                : "hover:bg-gradient-to-r hover:from-violet-50 hover:to-purple-50 text-violet-800"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">{languageFlags[code as Language]}</span>
              <span className="font-bold">{name}</span>
            </div>
            {language === code && (
              <div className="p-1 bg-white/20 rounded-full">
                <Check className="h-4 w-4 text-white" />
              </div>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

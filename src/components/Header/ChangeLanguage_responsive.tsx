import { useTranslation } from 'react-i18next'
import Popup from '../Popup'

interface ChangeLanguageProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

function ChangeLanguage_responsive({ open, setOpen }: ChangeLanguageProps) {
  const { i18n } = useTranslation()

  const languages = [
    { code: 'tm', name: 'Türkmen dili', flag: '🇹🇲' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'en', name: 'English', flag: 'en' },
  ]

  const handleLanguageChange = (code: string) => {
    i18n.changeLanguage(code)
    localStorage.setItem('i18nextLng', code)
    setOpen(false)
  }

  // Mevcut dili temiz biçimde alır (Örn: 'en-US' -> 'en')
  const currentLang = (i18n.language || 'tm').substring(0, 2)

  return (
    <Popup open={open} setOpen={setOpen}>
      <div className="bg-white rounded-lg p-5 w-[85vw] max-w-[320px] relative shadow-lg mx-auto">
        <button 
          onClick={() => setOpen(false)} 
          className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 text-sm font-bold cursor-pointer"
        >
          ✕
        </button>

        {/* Başlık */}
        <h3 className="text-center text-lg font-semibold mb-4 text-gray-800">
          Dil saýlaň
        </h3>

        {/* Dil Seçenekleri */}
        <div className="flex flex-col gap-3">
          {languages.map((lang, index) => {
            const isSelected = currentLang === lang.code || i18n.language === lang.code

            return (
              <button
                key={lang.code || index}
                onClick={() => handleLanguageChange(lang.code)}
                className={`flex items-center justify-between p-2.5 rounded-md transition-all cursor-pointer border ${
                  isSelected ? 'border-gray-300 bg-gray-50' : 'border-transparent hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{lang.flag}</span>
                  <span className="text-sm font-medium text-gray-700">{lang.name}</span>
                </div>

                {/* Seçili olan dilde onay işareti */}
                {isSelected && (
                  <span className="text-purple-900 font-bold text-base">✓</span>
                )}
              </button>
            )
          })}
        </div>
      </div>
    </Popup>
  )
}

export default ChangeLanguage_responsive
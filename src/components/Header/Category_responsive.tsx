import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { TfiViewGrid } from 'react-icons/tfi'
import { IoClose } from 'react-icons/io5'
import axios from 'axios'

// Backend'den gelen Kategori tipi
interface Category {
  id: number | string
  image: string
  name_tm?: string
  name_ru?: string
  name_en?: string
}

function Category_responsive() {
  const [open, setOpen] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [active, setActive] = useState<number | null>(null)
  const { i18n } = useTranslation()

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API}/categories`) // Kendi API endpoint'ini kontrol et
        setCategories(response.data)
      } catch (error) {
        console.error('Kategoriler çekilemedi:', error)
      }
    }

    fetchCategories()
  }, [])

  return (
    <>
      {/* Kategori Açma Butonu */}
      <button 
        onClick={() => setOpen(true)} 
        className="flex flex-1 items-center justify-center gap-1 text-gray-600 h-full lg:hidden"
      >
        <span className="mr-1"><TfiViewGrid size={18} /></span>
        Kategoriýalar
      </button>

      {/* Sol Çekmece */}
      <div 
        className={
          'pt-2 pb-4 px-3 lg:hidden bg-white flex flex-col w-80 max-w-[85vw] h-full z-[100] fixed top-0 transition-all duration-300 ease-in-out shadow-2xl ' + 
          (open ? "left-0" : "-left-full")
        }
      >
        {/* Kapatma Butonu */}
        <div className="flex justify-end pt-1 pr-1 pb-2">
          <button 
            onClick={() => setOpen(false)} 
            className="text-red-500 hover:text-red-700 p-1 rounded-full transition-colors"
          >
            <IoClose size={22} />
          </button>
        </div>

        {/* Kategori Listesi */}
        <div className="flex-1 overflow-y-auto space-y-1.5 pr-1 custom-scrollbar">
          {categories.map((category, index) => (
            <div key={"category-" + index} className="flex">
              <Link 
                onClick={() => {
                  setOpen(false)
                  setActive(index)
                }} 
                to={"category/" + category.id}  
                className={
                  'flex items-center justify-between w-full rounded-xl p-2.5 border border-gray-100 shadow-sm transition-all duration-150 text-[#361537] text-sm font-medium bg-white active:bg-gray-50 ' + 
                  (active === index ? "bg-gray-100! text-arbat-hover!" : "")
                }
              >
                <div className="flex items-center gap-3">
                  {category.image ? (
                    <img 
                      className="w-6 h-6 rounded-lg object-contain" 
                      src={import.meta.env.VITE_API + category.image} 
                      alt="" 
                    />
                  ) : (
                    <div className="w-6 h-6 flex items-center justify-center text-arbat-green">
                      ❖
                    </div>
                  )}
                  <span>
                    {category[`name_${i18n.language}` as keyof typeof category] || category.name_tm}
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Arka Plan Karartması */}
      <div 
        onClick={() => setOpen(false)} 
        className={
          'lg:hidden fixed inset-0 z-[90] bg-black/50 transition-all duration-300 ' + 
          (open ? "visible opacity-100" : "invisible opacity-0")
        }
      ></div>
    </>
  )
}

export default Category_responsive
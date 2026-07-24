import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import BrandCart from './BrandCart'
import { api } from '../../api/api'
import type { BrandT } from '../../types/brands'

function index() {
  const { t } = useTranslation()
  const [aramaMetni, setAramaMetni] = useState("")
  const [data, setData] = useState([])
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      console.log("Enter'a basıldı! Aranan:", event.currentTarget.value);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await api.get("/brands?limit=6&offset=0")
        setData(res.data.data)

      } catch (error: any) {
        alert("Error message: " + error.message)
      }
    }

    getData()
  }, [])

  return (
    <div className='py-2 px-10 h-full container mx-auto'>
      <div className="relative w-full max-w-xl">
        {/* Arama İkonu */}
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </span>

        <input
          type="text"
          placeholder={t("search_placeholder")}
          value={aramaMetni}
          onKeyDown={handleKeyDown}
          onChange={(e) => setAramaMetni(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-200 bg-white focus:outline-none focus:border-orange-500"
        />
      </div>
      <section className='pt-3 pb-4'>
        <h2 className='font-bold text-2xl mb-1'>{t("vegetables_fruits")}</h2>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4'>
          {
            data.map((brand:BrandT) => {
              if (brand.name.toUpperCase().includes(aramaMetni.toUpperCase())) return (<BrandCart data={brand} />)
            })
          }
        </div>
      </section>
    </div>
  )
}

export default index
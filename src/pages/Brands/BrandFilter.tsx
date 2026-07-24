import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import BrandFilter_Cart from './BrandFilter_Cart'
import type { BrandT } from '../../types/brands'

function BrandFilter({ brands }: { brands?: BrandT[] }) {
  const { t } = useTranslation()
  const [aramaMetni, setAramaMetni] = useState("")
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        console.log("Enter'a basıldı! Aranan:", event.currentTarget.value);
      }
    }
  return (
    <div className='flex flex-col overflow-x-hidden overflow-y-hidden min-h-50 mt-5'>
      <h3 className='text-lg font-semibold'>{t("brands")}</h3>
      <div className='py-1 my-0.5'>
        <div className='w-full'>
          <input placeholder={t("search_placeholder")} type="text" value={aramaMetni} onChange={(e) => setAramaMetni(e.target.value)} onKeyDown={handleKeyDown} className='duration-200 transition-colors outline-none text-sm w-full rounded py-1 px-2 border border-gray-400 focus-within:border-blue-400 appearance-none' />
        </div>
      </div>
      <div className='py-0.5 overflow-x-hidden flex grow'>
        <div className='overflow-x-hidden grow'>
          {brands&&brands.map((brand:BrandT)=>{
            if (brand.name.toUpperCase().includes(aramaMetni.toUpperCase())) {
              return (
                <BrandFilter_Cart key={brand.id} data={brand} />
              )
            }
            return null
          })}
        </div>
      </div>
    </div>
  )
}

export default BrandFilter
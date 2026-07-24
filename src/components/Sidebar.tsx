import BrandsInput from '../pages/Brands/BrandInput'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import BrandFilter from '../pages/Brands/BrandFilter'
import type { CategoryT } from '../types/Category' 
import type { BrandT } from '../types/brands'
import { useState } from 'react'

function Sidebar({ subcategories, brands }: { subcategories: CategoryT[], brands?: BrandT[] }) {
  const { t, i18n } = useTranslation()
  const [activeSort, setActiveSort] =useState<string>('0');
  console.log(subcategories)
  return (
    <div className='lg:block hidden lg:w-1/4 h-full pb-10 py-2 relative mt-3'>
      <div className='h-screen sticky pt-5 pb-4 pl-4 bg-white border border-gray-200 rounded flex flex-col top-20 shadow-sm'>
        <div className='pr-4 overflow-x-hidden flex flex-col grow'>
          {
            subcategories.length > 0 &&
            <div className='mb-5'>
              <h2 className='font-semibold text-lg'>{t("categories_title")}</h2>
              <div className='py-1 flex flex-col'>
                <ul className='pr-1 pl-1.5 text-sm'>
                  {
                    subcategories.map((sub) => (
                      <li key={'subcategories-' + sub} className='py-0.5'>
                        <Link to={"/"} className='duration-100 transition-colors hover:text-orange-y'>
                          {i18n.language == 'tm' && sub.name_tm}
                          {i18n.language == 'ru' && sub.name_ru}
                          {i18n.language == 'en' && sub.name_en}
                        </Link>
                      </li>
                    ))
                  }
                </ul>
              </div>
            </div>
          }

          <h2 className='font-semibold text-lg'>{t("sort_title")}</h2>
          <BrandsInput title={t("sort_none")} id='0' name="sort_group"/>
          <BrandsInput title={t("sort_asc")} id='1' name='sort_group' />
          <BrandsInput title={t("sort_desc")} id='2' name='sort_group' />

          <BrandFilter brands={brands} />
        </div>
      </div>
    </div>
  )
}

export default Sidebar
import { Link, useParams } from 'react-router-dom'
import CartContainer from '../../components/CartContainer'
import Banner from './components/Banner'
import { androidweioslogo } from '../../assets/images'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import { api } from '../../api/api'
import type { bannerT } from '../../types/banner'
import type { CategoryT } from '../../types/Category'

function Index() {
  const { id } = useParams()
  // Hook kullanımını tek satıra indirgedik
  const { t, i18n } = useTranslation()
  const currentLang = i18n.language

  const [data, setData] = useState<CategoryT[]>([])
  const [bannerData, setBannerData] = useState<bannerT[]>([])

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await api.get(`/categories/homepage`)
        const res2 = await api.get(`/banners`)
        console.log(res.data)
        setData(res.data)
        setBannerData(res2.data)
      } catch (error: any) {
        alert(error.message)
      }
    }

    getData()
  }, [id])

  return (
    <div className='container mx-auto px-10'>
      <Banner data={bannerData} />
      <Link to={"#"} className='lg:hidden'>
        <section className='shadow-sm p-2 bg-[#ec632333] rounded mt-6 flex justify-center items-center'>
          <img src={androidweioslogo} alt="" className='w-15 mr-1' />
          <span className='font-semibold text-sm'>Mobile programmany al</span>
        </section>
      </Link>
      {data.map((category: CategoryT, index: number) => {
        if (!category.products || category.products.length === 0) return null

        const categoryTitle = (category?.[`name_${currentLang}` as keyof CategoryT] as string) || "Ýüklenýär"
        const uniqueKey = category.id ? `home-page-category-${category.id}` : `home-page-category-idx-${index}`

        return (
          <CartContainer 
            key={uniqueKey} 
            data={category.products} 
            title={categoryTitle} 
            link={category.id} 
            Style="py-4 mt-2" 
          />
        )
      })}
    </div>
  )
}

export default Index
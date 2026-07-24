import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Sidebar from '../Sidebar'
import CartContainer from '../CartContainer'
import { api } from '../../api/api'

function Search() {
  const { i18n } = useTranslation()
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''

  const [data, setData] = useState<any[]>([])
  const [brands, setBrands] = useState<any[]>([])
  const [subcategories, setSubcategories] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false)

 useEffect(() => {
  const fetchSearchResults = async () => {
    if (!query.trim()) return
    setLoading(true)
    try {
      const res = await api.get(`/search/${encodeURIComponent(query)}`)
      console.log("BACKEND ARAMA CEVABI:", res.data)
      const rawProducts = res.data?.products || res.data?.data || (Array.isArray(res.data) ? res.data : [])
      
      setData(rawProducts)
      setBrands(res.data?.brands || [])
      setSubcategories(res.data?.subcategories || [])
    } catch (error) {
      console.error('Arama hatası:', error)
    } finally {
      setLoading(false)
    }
  }

  fetchSearchResults()
}, [query])

  return (
    <div className='px-10 mx-auto container'>
      <section className='pt-4 pb-2'>
        <h1 className='lg:text-2xl lg:font-bold'>
          Gözleg: "{query}"
        </h1>
        <h6 className='text-sm text-gray-600 pl-2'>
          jemi: 
          <span className='font-medium mx-1'>
            {data?.length || 0}
          </span>
          harytlar
        </h6>
      </section>
      <section className='h-full flex pt-1'>
        <Sidebar subcategories={subcategories} brands={brands} />
        <div className='lg:w-3/4 w-full p-2'>
          {loading ? (
            <p className='text-gray-500 py-4'>Ýüklenýär...</p>
          ) : (
            <CartContainer title="" data={data} />
          )}
        </div>
      </section>
    </div>
  )
}

export default Search
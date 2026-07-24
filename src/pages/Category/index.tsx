import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../../api/api'
import { useTranslation } from 'react-i18next'
import Sidebar from '../../components/Sidebar'
import CartContainer from '../../components/CartContainer'

function index() {
  const {id} = useParams()
  const [data,setData] = useState([])
  const [len,setLen] = useState(0)
  const [category,setCategory] = useState(null)
  const [subcategories,setSubcategories] = useState([])
  const { t, i18n } = useTranslation()
  const [brands,setBrands]=useState([])
  window.scrollTo(0,0)
  useEffect(()=>{
    const getData = async()=>{
      try {
        const res = await api.get(`/category/${id}?limit=20&offset=0`)
        setData(res.data.data)
        setLen(res.data.total)
        const res2 = await api.get(`/categories/${id}`)
        setCategory(res2.data)
        const res3 = await api.get(`/categories/${id}/subcategories/`)
        setSubcategories(res3.data)
        const res4=await api.get("/banners")
        setBrands(res4.data)
      } catch (error:any) {
        alert(error.message)
      }
    }
    
    getData()
  },[id])

  return (
    <div className='px-10 mx-auto container'>
      <section className='pt-4 pb-2'>
        <h1 className='lg:text-2xl lg:font-bold'>{category && category[`name_${i18n.language}` as keyof typeof category]}</h1>
        <h6 className='text-sm text-gray-600 pl-2'>
          jemi: 
          <span className='font-medium mx-1'>
            {len}
          </span>
          haritlar
        </h6>
      </section>
      <section className='h-full flex pt-1'>
        <Sidebar subcategories={subcategories} brands={brands}/>
        <div className='lg:w-3/4 w-full p-2'>
          <CartContainer title="" data={data} />
        </div>
      </section>
    </div>
  )
}

export default index
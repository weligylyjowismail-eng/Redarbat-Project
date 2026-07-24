import { useState } from 'react'
import CartContainer from '../../components/CartContainer'
import { useTranslation } from 'react-i18next'
import Sidebar from '../../components/Sidebar'


function BrandsPage() {
  const {t} = useTranslation() 
  const [open,setOpen]=useState(false)
  const [subcategories,setSubcategories] = useState([])
  return (
    <div className='container px-10 mx-auto'>
      <section className='py-2'>
        <h2 className='lg:font-bold lg:text-2xl lg:border-none md:text-xl md:font-medium sm:text-lg border-b border-gray-300 text-base'>Gök Önüm </h2>
        <h6 className='lg:border-none md:text-sm text-xs text-gray-600 font-medium'>
          <span>{t("total_products")}
          </span>
          
        </h6>
      </section>
      <section className='flex h-full w-full'>
        <Sidebar subcategories={subcategories}/>
        {/* <div className='lg:w-3/4 w-full px-2'>
          <CartContainer title="" />
        </div> */}
      </section>
    </div>
  )
}

export default BrandsPage
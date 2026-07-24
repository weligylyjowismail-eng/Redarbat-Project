import { useState } from 'react'
import { HiOutlineChevronLeft, HiOutlineChevronRight, HiOutlineShoppingCart, HiOutlineTrash } from 'react-icons/hi';
import { alma } from '../../assets/images';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../../store/Store';
import type { productT } from '../../types/productT'
import i18n from '../../i18n';
import Popup from '../../components/Popup';

function ShoppingCart({ product }: { product: productT & { quantity?: number } }) {
  const { t } = useTranslation()
  const currentLang = i18n.language; 
  const productQuantity = product?.quantity || 1;
  const [openbut4, setopenbut4] = useState(productQuantity > 0)
  const [sany4, setsany4] = useState(1)
  const { addToCart, removeFromCart,removeAllSingleProductFromCart } = useAuthStore()
  const [Open, setOpen] = useState(false)
  const lineTotal = (Number(product?.price || 0) * productQuantity).toFixed(2);
  function azalt() {
    removeFromCart(product.id);
    if (productQuantity <= 1) {
      setopenbut4(false);
    }
  }
  return (
    <div className='py-1 border-b last:border-none border-gray-300'>
      <div className='flex'>
        <div className='p-2 w-1/3 sm:w-1/5 md:w-40 shrink-0'>
          <div className='pt-[100%] relative'>
            <div className='h-full w-full absolute left-0 right-0 top-0'>
              <img className='h-full w-full absolute left-0 z-2 top-0' src={product?.image_small ? `${import.meta.env.VITE_API}${product.image_small}` : alma} alt="" />
            </div>
          </div>
        </div>
        <div className='sm:pr-3 md:static md:flex-row md:py-4 relative flex flex-grow flex-col py-0.5 pl-3'>
          <div className='pr-2 grow'>
            <h2 className='mb-1 text-lg font-semibold sm:text-xl'>{product?.name_tm || ""}</h2>
            <p className='sm:text-sm py-1 text-xs'>
              {(product?.[`minibody_${currentLang}` as keyof productT] as string) || t("description_products")}
            </p>
          </div>
          <div className='md:relative md:ml-0 md:mt-0 md:w-60 md:flex-col md:pb-0 mt-3.5 flex flex-shrink-0 items-center justify-center pb-2'>
            <h2 className='sm:text-base md:pl-0 md:text-lg pl-1 text-xs font-medium text-black sm:font-bold md:order-none md:mb-2 md:ml-0 order-2 ml-auto'>{((Number(product?.price || 0) - (Number(product?.price || 0) / 100 * Number(product?.discount || 0))) * productQuantity).toFixed(2)}m</h2>
            <div className='w-30 md:w-40 relative flex items-center justify-between'>
              <div className='flex grow justify-center items-center'>
                <button onClick={() => setopenbut4(true)} className='bg-arbat-green py-2 rounded h-9 w-full flex justify-center items-center border-y-orange-y cursor-pointer shrink-0 hover:bg-arbat-hover text-white'>
                  {
                    openbut4 ?
                      <div className='flex items-center gap-4'>
                        <div>
                          <span
                            onClick={azalt}
                            className='cursor-pointer p-1 hover:opacity-80 flex items-center justify-center'
                          >
                            <HiOutlineChevronLeft className='text-white' size={20} />
                          </span>
                        </div>
                        <div>
                          <span>{productQuantity}</span>
                        </div>
                        <div>
                          <span onClick={(e) => { e.stopPropagation(); addToCart(product) }}><HiOutlineChevronRight color='white' size={24} /></span>
                        </div>
                      </div>
                      :
                      <span><HiOutlineShoppingCart className='text-white' /></span>
                  }
                </button>
              </div>
            </div>
            <button onClick={() => {
              setOpen(true)
            }} className='px-1 -top-2 -right-1 text-white bg-arbat-green w-5 h-5 absolute rounded flex justify-center items-center cursor-pointer hover:bg-arbat-hover'>
              <span><HiOutlineTrash className='text-white' /></span>
            </button>
            <Popup open={Open} setOpen={setOpen}>
              <div className='outline-none shadow-lg bg-white rounded h-auto'>
                <div className='pt-6 pb-4 px-4'>
                  <p className='pr-4'>{t("delete_single_product_confirm")}</p>
                  <div className='mt-2 py-1'>
                    <div className='flex justify-end pt-1'>
                      <button onClick={() => {
                        removeAllSingleProductFromCart(product.id)
                      }} className='duration-200 font-semibold transition-colors text-white text-sm px-3 py-1 bg-[#4bb543] rounded mx-1 cursor-pointer hover:bg-[#7ed26f]'>{t("Yes")}</button>
                      <button onClick={() => {
                        setOpen(false)
                      }} className='duration-200 font-semibold transition-colors text-white text-sm px-3 py-1 bg-red-600 rounded mx-1 cursor-pointer hover:bg-[#ff503f]'>{t("No")}</button>
                    </div>
                  </div>
                </div>
              </div>
            </Popup>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShoppingCart
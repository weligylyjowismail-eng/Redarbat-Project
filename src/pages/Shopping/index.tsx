import React, { useState } from 'react'
import { HiOutlineTrash } from 'react-icons/hi'
import ShoppingCart from './ShoppingCart'
import { BiChevronDown, BiChevronUp } from 'react-icons/bi'
import { useTranslation } from 'react-i18next'
import { useAuthStore } from '../../store/Store'
import { Sebetbosfot } from '../../assets/images'
import Popup from '../../components/Popup'

function Shopping() {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const [Open, setOpen] = useState(false)
  const { cart, clearCart } = useAuthStore()

  const totalQuantity = cart?.reduce((sum, item) => sum + (item.quantity || 1), 0) || 0;
  const totalAmount = cart?.reduce((sum, item) => {
    const oldPrice = Number(item?.price || 0);
    const discountPercent = Number(item?.discount || 0);
    const newPrice = oldPrice - (oldPrice * discountPercent / 100);
    return sum + (newPrice * (item.quantity || 1));
  }, 0) || 0;

  return (
    <div className='mx-auto px-2 sm:px-4 lg:px-10 container mb-10 lg:mb-6'>
      <div className='pt-2 lg:pt-4'>
        <section className='flex flex-col h-full'>
          
          {/* Başlık ve Sepeti Temizle Butonu */}
          <div className='flex items-center justify-between mb-2'>
            <h2 className='font-medium text-base sm:text-lg md:text-xl lg:text-2xl lg:font-bold text-gray-800'>
              {t("shopping_cart")} ({totalQuantity})
            </h2>
            
            {cart.length > 0 && (
              <button 
                onClick={() => setOpen(true)} 
                className='bg-orange-y hover:opacity-90 text-white font-medium text-xs py-1 px-2.5 rounded shadow-sm transition-opacity cursor-pointer flex items-center gap-1'
              >
                <span>{t("clear_cart")}</span>
                <HiOutlineTrash size={14} />
              </button>
            )}
          </div>

          {/* Sepeti Temizle Onay PopUp */}
          <Popup open={Open} setOpen={setOpen}>
            <div className='outline-none shadow-lg bg-white rounded h-auto'>
              <div className='pt-6 pb-4 px-4'>
                <p className='pr-4 text-sm text-gray-700'>{t("clear_cart_confirm")}</p>
                <div className='mt-2 py-1'>
                  <div className='flex justify-end pt-1 gap-2'>
                    <button 
                      onClick={() => { clearCart(); setOpen(false); }} 
                      className='duration-200 font-semibold transition-colors text-white text-sm px-3 py-1 bg-[#4bb543] rounded cursor-pointer hover:bg-[#7ed26f]'
                    >
                      {t("Yes")}
                    </button>
                    <button 
                      onClick={() => setOpen(false)} 
                      className='duration-200 font-semibold transition-colors text-white text-sm px-3 py-1 bg-red-600 rounded cursor-pointer hover:bg-[#ff503f]'
                    >
                      {t("No")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Popup>

          {cart.length > 0 ? (
            <div className='lg:min-h-[60vh] flex lg:flex-nowrap flex-wrap gap-4 relative'>
              <div className='flex flex-col lg:grow w-full'>
                <div className='shadow-sm bg-white rounded border border-gray-200 w-full overflow-hidden'>
                  <div className='p-2 sm:p-3 flex flex-col gap-2'>
                    {cart.map((item) => (
                      <ShoppingCart key={item.id} product={item} />
                    ))}
                  </div>
                  <div className='lg:hidden border-t border-gray-200 bg-white'>
                    
                    {isOpen && (
                      <div className='bg-gray-50 border-b border-gray-200 py-2 px-3 text-xs space-y-1 text-gray-600'>
                        <div className='flex justify-between items-center'>
                          <span>{t("quantity")} ({totalQuantity})</span>
                          <span className='font-semibold text-orange-y'>{totalAmount.toFixed(2)} m.</span>
                        </div>
                        <div className='flex justify-between items-center'>
                          <span>{t("delivery_fee")}</span>
                          <span className='font-semibold text-orange-y'>0.00 m.</span>
                        </div>
                      </div>
                    )}
                    <div className='flex items-center justify-between p-2 gap-2'>
                      <div 
                        className='flex items-center gap-1 cursor-pointer select-none' 
                        onClick={() => setIsOpen(!isOpen)}
                      >
                        <button className='text-gray-700'>
                          {isOpen ? <BiChevronUp size={20} /> : <BiChevronDown size={20} />}
                        </button>
                        <span className='text-orange-y font-bold text-sm sm:text-base'>
                          {totalAmount.toFixed(2)} m.
                        </span>
                      </div>

                      <button className='bg-arbat-green hover:bg-arbat-hover text-white text-xs font-semibold py-2 px-3 sm:px-4 rounded transition-colors cursor-pointer shadow-sm'>
                        {t("go_shopping")}
                      </button>
                    </div>
                  </div>

                </div>
              </div>
              <div className='lg:flex w-80 shrink-0 self-start px-2 sticky top-20 hidden'>
                <div className='w-full'>
                  <div className='w-full shadow-sm rounded border border-gray-200 bg-white p-4'>
                    <h3 className='block text-lg font-medium border-b border-gray-200 pb-2'>{t("shopping_cart")}</h3>
                    <div className='pt-3 space-y-2 text-sm'>
                      <div className='flex justify-between'>
                        <span className='font-medium'>{t("quantity")} ({totalQuantity})</span>
                        <span className='text-orange-y font-medium'>{totalAmount.toFixed(2)} m.</span>
                      </div>
                      <div className='flex justify-between'>
                        <span className='font-medium'>{t("delivery_fee")}</span>
                        <span className='text-orange-y font-medium'>0.00 m.</span>
                      </div>
                      <div className='flex justify-between pt-2 border-t border-gray-200 text-base'>
                        <span className='font-bold'>{t("total_amount")}</span>
                        <span className='text-orange-y font-bold'>{totalAmount.toFixed(2)} m.</span>
                      </div>
                    </div>
                  </div>
                  <button className='py-3 bg-arbat-green hover:bg-arbat-hover font-medium w-full mt-4 text-white rounded transition-colors cursor-pointer shadow'>
                    {t("go_shopping")}
                  </button>
                </div>
              </div>

            </div>
          ) : (
            <div className="flex h-32 items-center justify-center gap-3 rounded border border-gray-200 bg-white p-2 shadow-sm md:h-60 md:flex-col md:gap-1">
              <div className="flex items-center justify-center">
                <img 
                  src={Sebetbosfot} 
                  alt="Empty Cart" 
                  className="h-16 w-16 object-contain md:h-28 md:w-28" 
                />
              </div>
              <div className="flex items-center justify-center">
                <h2 className="text-base font-medium text-gray-700 md:text-xl md:font-bold">
                  {t("cart_empty")}
                </h2>
              </div>
            </div>
          )}

        </section>
      </div>
    </div>
  )
}

export default Shopping
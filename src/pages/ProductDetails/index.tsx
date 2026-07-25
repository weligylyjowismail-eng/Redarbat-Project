import React, { useEffect, useState } from 'react'
import { alma } from '../../assets/images'
import { Link, useParams } from 'react-router-dom'
import { HiOutlineChevronLeft, HiOutlineChevronRight, HiOutlineShoppingCart } from 'react-icons/hi'
import CartContainer from '../../components/CartContainer'
import { useTranslation } from 'react-i18next'
import { api } from '../../api/api'
import type { productT } from '../../types/productT'
import { useAuthStore } from '../../store/Store'

function ProductDetails() {
  const { t, i18n } = useTranslation()
  const currentLang = i18n.language; // "tm" veya "ru" değerini otomatik yakalar
  const { id } = useParams()
  const { wishlist, toggleLike, cart, addToCart, removeFromCart } = useAuthStore();
  const [product, setProduct] = useState<productT | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<productT[]>([])
  const cartItem = cart.find((item) => String(item.id) === String(product?.id));
  const productQuantity = cartItem && 'quantity' in cartItem ? (cartItem.quantity as number) : 0;
  const [openbut4, setopenbut4] = useState(productQuantity > 0)
  const [sany4, setsany4] = useState(1)
  const isLiked = product?.id ? wishlist.some((item) => String(item?.id) === String(product.id)) : false;
  const cleanWishlist = wishlist.filter(item => item !== null && item !== undefined);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await api.get(`${import.meta.env.VITE_API}/products/${id}`)
        const anaUrun = res.data.data || res.data
        const resRelated = await api.get(`${import.meta.env.VITE_API}/products?category_id=${anaUrun.category_id}`)
        setProduct(anaUrun)
        const allRelated = resRelated.data.data || resRelated.data
        setRelatedProducts(allRelated.slice(0, 4))

      } catch (error: any) {
        alert(error.message)
      }
    }
    window.scrollTo(0, 0)

    getData()
  }, [id])

  function azalt() {
    if (product?.id) {
      removeFromCart(product.id);

      if (productQuantity <= 1) {
        setopenbut4(false);
      }
    }
  }

  if (!product) {
    return <div className='flex justify-center items-center'>Yükleniyor...</div>
  }

  return (
    <div className='md:p-5 p-2 md:flex md:flex-wrap flex flex-col mx-auto px-10 container'>
      <div className='flex flex-col md:flex-row w-full bg-white px-5 pt-5 md:pb-5 rounded-sm'>
        <div className='md:w-2/5 w-full'>
          <div className='cursor-zoom-in shadow-sm pt-[100%] border border-gray-200 rounded overflow-hidden relative'>
            <div className='absolute left-0 top-0 h-full w-full'>
              <img className='object-cover w-full z-2 h-full absolute left-0 top-0' src={product?.image_big ? `${import.meta.env.VITE_API}${product.image_big}` : alma} alt="" />
              {Number(product?.discount) > 0 && (
                <div className='shadow-sm py-1 bg-red-500 text-white text-xs font-semibold px-2.5 rounded-lg flex justify-center items-center w-13 select-none z-2 absolute bottom-0 left-0 translate-x-2 -translate-y-2'>
                  {Number(product?.discount)}%
                </div>
              )}
            </div>
          </div>
        </div>

        <div className='md:w-[60%] md:pl-6 md:pr-2 sm:pt-0 px-1 pt-2 w-full'>
          <div className='h-full w-full'>
            <div className='sm:px-4 pt-1 pb-1 px-1'>
              <h2 className='lg:text-3xl sm:text-2xl font-semibold block mb-1'>
                {product.name_tm || ''}
              </h2>
              <p className='sm:font-normal font-medium sm:pt-1.5 pt-0 pb-1.5 sm:text-sm text-base'>{(product?.[`body_${currentLang}` as keyof productT] as string) || "Ýüklenýär"}</p>

              <div className='text-sm py-1 bg-[#f5f5f5] rounded-lg overflow-hidden'>
                <div className='flex justify-between items-center py-1.5 px-3 border-b-2 border-white'>
                  <div className='font-medium text-gray-500'>{t("product_code")}</div>
                  <div className=' text-[#361537] font-semibold'>{`${product.kode}`}</div>
                </div>
                <div className='flex justify-between items-center py-1.5 px-3'>
                  <div className='font-medium text-gray-500'>{t("barcode")}</div>
                  <div className='text-[#361537] font-semibold text-sm'>0004</div>
                </div>
              </div>
              <div className='lg:hidden bg-white flex items-center justify-between w-full px-1 py-3 border-t border-gray-200 mt-4 sticky bottom-16'>
                <div className='flex flex-col justify-center'>
                  <span className='text-xl font-bold text-[#361537] leading-none'>
                    {(Number(product?.price) - (Number(product.price) / 100 * Number(product?.discount))).toFixed(2) + 'm.'}
                  </span>
                  {Number(product?.discount) > 0 && (
                    <span className='text-base text-gray-400 line-through font-semibold mt-1'>
                      {product?.price.toFixed(2)}m.
                    </span>
                  )}
                </div>
                <div className='flex items-center gap-2'>
                  <button
                    className='w-[42px] h-[42px] bg-white rounded-md border border-[#ede4ff] flex items-center justify-center shrink-0 cursor-pointer active:scale-95 transition-transform'
                    onClick={(e) => {
                      e.preventDefault();
                      if (product) toggleLike(product);
                    }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill={isLiked ? "#156349" : "none"}>
                      <path
                        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                        stroke="#156349"
                        strokeWidth="2"
                      />
                    </svg>
                  </button>

                  <div className='w-30 h-10 rounded sm:w-40'>
                    <button
                      onClick={() => {
                        setopenbut4(true);
                        if (product) addToCart(product);
                      }}
                      className='h-full bg-arbat-green rounded h-9 w-full flex justify-center items-center border-y-arbat-green cursor-pointer shrink-0 hover:bg-arbat-hover text-white px-2'
                    >
                      {openbut4 ? (
                        <div className='flex items-center w-full h-full justify-between'>
                          <span className='px-1' onClick={(e) => { e.stopPropagation(); if (product) addToCart(product); }}>
                            <HiOutlineChevronLeft size={20} />
                          </span>
                          <span className='font-bold text-sm select-none'>
                            {productQuantity}
                          </span>
                          <span className='px-1' onClick={(e) => { e.stopPropagation(); azalt(); }}>
                            <HiOutlineChevronRight size={20} color='white' />
                          </span>
                        </div>
                      ) : (
                        <HiOutlineShoppingCart className='text-white' size={20} />
                      )}
                    </button>
                  </div>
                </div>

              </div>
              <div className='lg:block hidden'>
                <div className='sm:px-4 px-1 py-2 border-t mt-4 border-gray-200 border-b justify-between items-center flex'>
                  <div className='text-2xl font-bold'>
                    <div className='relative items-center justify-center flex flex-col'>
                      <span className='mx-0.5 w-max'>
                        {(Number(product?.price) - (Number(product.price) / 100 * Number(product?.discount))).toFixed(2) + 'm.'}
                      </span>
                      {Number(product?.discount) > 0 && (
                        <span className='mx-0.5 text-base text-gray-400 line-through font-semibold translate-y-1.5'>
                          {product?.price.toFixed(2)}m.
                        </span>
                      )}

                    </div>
                  </div>
                  <div className='py-3 px-4 flex justify-center items-center'>
                    <div>
                      <button className='bg-white px-1 mr-2 w-[42px] h-[42px] rounded-md border border-[#ede4ff] items-center flex justify-center cursor-pointer' onClick={(e) => {
                        e.preventDefault();
                        if (product) toggleLike(product);
                      }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill={isLiked ? "#156349" : "none"}>
                          <path
                            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                            stroke="#156349"
                            strokeWidth="2"
                          />
                        </svg>
                      </button>
                    </div>
                    <div className='h-10.5 w-40 border border-[#0000] rounded'>
                      <button onClick={() => {
                        if (product) addToCart(product)
                        setopenbut4(true)
                      }} className='h-full bg-arbat-green py-2 rounded h-9 w-full flex justify-center items-center border-y-arbat-green cursor-pointer shrink-0 hover:bg-arbat-hover text-white'>
                        {
                          productQuantity > 0 ?
                            <div className='flex items-center gap-4'>
                              <div>
                                <span onClick={(e) => { e.stopPropagation(); azalt(); }}><HiOutlineChevronLeft size={24} /></span>
                              </div>
                              <div>
                                <span>{productQuantity}</span>
                              </div>
                              <div>
                                <span onClick={(e) => { e.stopPropagation(); addToCart(product) }}><HiOutlineChevronRight size={24} color='white' /></span>
                              </div>
                            </div>
                            :
                            <span><HiOutlineShoppingCart className='text-white' /></span>
                        }
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CartContainer data={relatedProducts} title={t("related_products")} Style="py-4 mt-2" />
    </div>
  )
}

export default ProductDetails
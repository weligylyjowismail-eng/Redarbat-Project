import { useState } from 'react'
import { Link } from 'react-router-dom'
import { apk, appstore, googleplay, Logfut } from '../../assets/images'
import { HiHome, HiOutlineHeart, HiOutlineUser } from 'react-icons/hi'
import { MdLayers, MdTranslate } from 'react-icons/md'
import { IoCartOutline } from 'react-icons/io5'
import { useTranslation } from 'react-i18next'

function Footer() {
  const { t, i18n } = useTranslation()
  const [active, setActive] = useState(0)
  return (
    <div className='bg-white'>
      <footer className='pt-2 pb-8 px-10 container mx-auto lg:flex lg:flex-col hidden'>
        <div className='py-3 mb-3 w-40'>
          <img className='w-full' src={Logfut} alt="" />
        </div>
        <div className='flex justify-between'>
          <div className='w-[32%] px-2 ml-8'>
            <h3 className='text-gray-600 text-lg font-semibold mb-2'>{t("footer_market")}</h3>
            <ul className='text-gray-600 text-sm'>
              <li className='py-0.5'><a href="" className='hover:text-black'>{t("footer_about")}</a></li>
              <li className='py-0.5'><a href="" className='hover:text-black'>{t("footer_contact")}</a></li>
              <li className='py-0.5'><a href="" className='hover:text-black'>{t("footer_delivery_terms")}</a></li>
              <li className='py-0.5'><a href="" className='hover:text-black'>{t("footer_privacy")}</a></li>
            </ul>
          </div>
          <div className='w-[32%] px-2 ml-8'>
            <h3 className='text-gray-600 text-lg font-semibold mb-2'>{t("footer_help_title")}</h3>
            <ul className='text-gray-600 text-sm'>
              <li className='py-0.5'><span className='inline-block w-20'>{t("footer_phone")}</span><a href="" className='hover:text-black'>+993 12 22-74-75</a></li>
              <li className='py-0.5'><span className='w-20 inline-block'>{t("footer_imo")}</span><a href="" className='hover:text-black'>+993 63 75-74-22</a></li>
              <li className='py-0.5'><span className='w-20 inline-block'>{t("footer_email")}</span><a href="" className='hover:text-black'>info@ynamdar.com</a></li>
              <li className='py-0.5'><span className='w-20 inline-block'>{t("footer_instagram")}</span><a href="" className='hover:text-black'>@ynamdar_com</a></li>
            </ul>
          </div>
          <div className='w-[32%]'>
            <h3 className='text-gray-600 text-lg font-semibold mb-2'>{t("footer_mobile_apps")}</h3>
            <div className='flex py-1'>
              <div className='w-40'><a href=""><img src={googleplay} alt="" /></a></div>
              <div className='w-40'><a href=""><img src={appstore} alt="" /></a></div>
            </div>
            <div className='w-40'><a href=""><img src={apk} alt="" /></a></div>
          </div>
        </div>
      </footer>
      <div className="lg:hidden grid grid-cols-5 fixed left-0 bottom-0 w-full z-20 bg-[#f0f9f4] shadow-lg border-t border-gray-200 h-16">
        <Link 
          to="/" 
          onClick={() => setActive(0)}
          className={"h-full flex flex-col justify-center items-center pb-1 relative transition-colors duration-300 " + (active === 0 ? "text-arbat-hover font-semibold" : "text-gray-500")}
        >
          <span className="flex justify-center items-center mb-1"><HiHome size={22} /></span>
          <span className="text-[10px] font-medium leading-none mb-1">{t("home") || "Baş sahypa"}</span>
          <span className={"absolute bottom-0 left-0 w-full h-[3px] bg-arbat-hover rounded-t-sm transition-all duration-300 ease-in-out " + (active === 0 ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0")}></span>
        </Link>
        <Link 
          to="/Brands" 
          onClick={() => setActive(1)}
          className={"h-full flex flex-col justify-center items-center pb-1 relative transition-colors duration-300 " + (active === 1 ? "text-arbat-hover font-semibold" : "text-gray-500")}
        >
          <span className="w-7 h-7 flex justify-center items-center mb-1"><MdLayers size={22} /></span>
          <span className="text-[10px] font-medium leading-none mb-1">{t("Brands")}</span>
          <span className={"absolute bottom-0 left-0 w-full h-[3px] bg-arbat-hover rounded-t-sm transition-all duration-300 ease-in-out " + (active === 1 ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0")}></span>
        </Link>
        <Link 
          to="/Shopping" 
          onClick={() => setActive(2)}
          className={"h-full flex flex-col justify-center items-center pb-1 relative transition-colors duration-300 " + (active === 2 ? "text-arbat-hover font-semibold" : "text-gray-500")}
        >
          <span className="w-7 h-7 flex justify-center items-center mb-0.5"><IoCartOutline size={22} /></span>
          <span className="text-[10px] font-medium leading-none mb-1">{t("Shopping")}</span>
          <span className={"absolute bottom-0 left-0 w-full h-[3px] bg-arbat-hover rounded-t-sm transition-all duration-300 ease-in-out " + (active === 2 ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0")}></span>
        </Link>
        <Link 
          to="/Favorites" 
          onClick={() => setActive(3)}
          className={"h-full flex flex-col justify-center items-center pb-1 relative transition-colors duration-300 " + (active === 3 ? "text-arbat-hover font-semibold" : "text-gray-500")}
        >
          <span className="w-7 h-7 flex justify-center items-center mb-0.5"><HiOutlineHeart size={22} /></span>
          <span className="text-[10px] font-medium leading-none mb-1">{t("favorites") || "Halanlarym"}</span>
          <span className={"absolute bottom-0 left-0 w-full h-[3px] bg-arbat-hover rounded-t-sm transition-all duration-300 ease-in-out " + (active === 3 ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0")}></span>
        </Link>
        <Link 
          to="/Profil" 
          onClick={() => setActive(4)}
          className={`h-full flex flex-col justify-center items-center pb-1 relative transition-colors duration-200 ${
            active === 4 ? "text-emerald-700 font-semibold" : "text-gray-400 hover:text-gray-600"
          }`}
        >
          <HiOutlineUser size={22} className="mb-0.5" />
          <span className="text-[10px]">{t("profile_title") || "Hasabym"}</span>
          {active === 4 && <span className="absolute bottom-0 left-0 w-full h-[3px] bg-emerald-700 rounded-t-full"></span>}
        </Link>

      </div>
    </div>
  )
}

export default Footer
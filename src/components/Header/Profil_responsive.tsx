import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

// Modal bileşenin
import Register from './Register' 

import marketImg from '../../assets/images/ynamdar-market.png'
import storeImg from '../../assets/images/ynamdar-store.png'
import foodImg from '../../assets/images/ynamdar-food.png'

function Profil_responsive() {
  const { t } = useTranslation()

  // Modalların açık/kapalı durumunu yöneten stateler
  const [isRegisterOpen, setIsRegisterOpen] = useState(false)
  const [isLanguageOpen, setIsLanguageOpen] = useState(false)

  const menuItems = [
    {
      id: 1,
      titleKey: 'Register',
      defaultText: 'Agza bol',
      action: () => setIsRegisterOpen(true),
      icon: (
        <svg className="w-5 h-5 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
      )
    },
    {
      id: 2,
      titleKey: 'Login',
      defaultText: 'Içeri gir',
      path: '/login',
      icon: (
        <svg className="w-5 h-5 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
        </svg>
      )
    },
    {
      id: 3,
      titleKey: 'orders_title',
      defaultText: 'Sargytlarym',
      path: '/orders',
      icon: (
        <svg className="w-5 h-5 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      )
    },
    {
      id: 4,
      titleKey: 'favorites_title',
      defaultText: 'Halanlarym',
      path: '/favorites',
      icon: (
        <svg className="w-5 h-5 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    },
    {
      id: 5,
      titleKey: 'changeLanguage',
      defaultText: 'changeLanguage',
      icon: (
        <svg className="w-5 h-5 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m1 4h6m-3-1v8m-4-4l4 4m6 0l-4-4M3 19h18" />
        </svg>
      )
    },
    {
      id: 6,
      titleKey: 'footer_delivery_terms',
      defaultText: 'Eltip bermek we töleg tertibi',
      path: '#',
      icon: (
        <svg className="w-5 h-5 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0zM13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1" />
        </svg>
      )
    },
    {
      id: 7,
      titleKey: 'footer_contact',
      defaultText: 'Aragatnaşyk',
      path: '#',
      icon: (
        <svg className="w-5 h-5 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      id: 8,
      titleKey: 'footer_about',
      defaultText: 'Biz barada',
      path: '#',
      icon: (
        <svg className="w-5 h-5 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ]

  return (
    <div className="w-full max-w-md mx-auto p-3">
      <div className="flex flex-col gap-2.5">
        {menuItems.map((item) => {
          const content = (
            <>
              <div className="text-arbat-green">
                {item.icon}
              </div>
              <span className="text-[13px] font-semibold text-gray-800">
                {t(item.titleKey, item.defaultText)}
              </span>
            </>
          )

          const itemClassName = "flex items-center gap-3.5 px-4 py-3 bg-white border border-gray-200 rounded-xl text-[#ff4500] hover:bg-gray-50 active:scale-[0.99] transition-all shadow-2xs w-full text-left"

          if (item.action) {
            return (
              <button
                key={item.id}
                onClick={item.action}
                className={itemClassName}
              >
                {content}
              </button>
            )
          }

          return (
            <Link
              key={item.id}
              to={item.path || '#'}
              className={itemClassName}
            >
              {content}
            </Link>
          )
        })}
      </div>
      <Register 
        open={isRegisterOpen} 
        setOpen={setIsRegisterOpen} 
      />
    </div>
  )
}

export default Profil_responsive
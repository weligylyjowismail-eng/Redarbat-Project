import { Apple, google } from '../../assets/images'
import Popup from '../Popup'
import { IoPersonAddOutline } from 'react-icons/io5'
import { useState } from 'react'
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { api } from '../../api/api';
import { useAuthStore } from '../../store/Store';

function Register({ open, setOpen }: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const login = useAuthStore((state) => state.login)
  const {t} = useTranslation()
  const [active, setActive] = useState(0)
  const [Telefon, setTelefon] = useState("+993")
  const [Email, setEmail] = useState("")
  const [password, setpassword] = useState("")
  const [password2, setpassword2] = useState("")
  const [name, setname] = useState("")

  async function sendData() {
    if (password !== password2) {
      alert("Açar sözler deň gelenok!")
      return
    }

    const data = {
      username: name,
      phone: Telefon,
      email: Email,
      password: password
    };

    setname("")
    setpassword("")
    setpassword2("")
    setEmail("")
    setTelefon("+993")

    try {
      const res = await api.post("/register", data)
      localStorage.setItem("token",res.data.token)
      login(res.data.user);
      setOpen(false)
      alert("Siz ustunlikli register boldunyz")
    } catch (error) {
      if (axios.isAxiosError(error)){
        if (error.status === 409){
          alert("Bu ulanyjy onden hem bar")
        }else if(error.status === 400){
          alert("Dogry maglumat ugrat")
        }else{
          alert(error.message)
        }
      }
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
        sendData();
    }
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputVal = event.target.value;
    if(!inputVal.startsWith("+993")){
      setTelefon("+993")
      return
    }
    const sonrakiKisim=inputVal.slice(4).replace(/\D/g, "");
    if(sonrakiKisim.length<=8){
      setTelefon("+993"+sonrakiKisim)
    }
  };

  return (
    <Popup open={open} setOpen={setOpen}>
      {/* MASAÜSTÜ VERSİYONU (Aynen korundu) */}
      <div className="shadow-lg bg-white w-100 relative lg:block hidden">
        <button onClick={() => setOpen(false)} className="absolute right-3 top-1 cursor-pointer">x</button>
        <div className="p-4">
          <h2 className="text-xl font-medium mb-2">{t("register_title")}</h2>
          <div className="flex py-1">
            <div className="ml-auto w-40">
              <div className="py-1">
                <div className="shadow-sm border border-gray-200 rounded-sm flex">
                  <button onClick={() => setActive(0)} className={`w-1/2 p-1 text-xs cursor-pointer ${active === 0 ? "bg-white text-blue-500" : "bg-gray-100 text-gray-600"}`}>Telefon</button>
                  <button onClick={() => setActive(1)} className={`w-1/2 p-1 text-xs cursor-pointer ${active === 1 ? "bg-white text-blue-500" : "bg-gray-100 text-gray-600"}`}>Email</button>
                </div>
              </div>
            </div>
          </div>
          {
            active === 0 ? (
              <div className="border border-gray-300 rounded-md p-2 mt-4 focus-within:border-blue-400 relative">
                <div className='absolute -translate-y-1/2 top-0 left-3 bg-white overflow-hidden rounded'>
                  <label className="text-xs text-gray-400 block">{t("phone_number")}</label>
                </div>
                <input onKeyDown={handleKeyDown} type="text" className="w-full outline-none text-sm" value={Telefon} onChange={handlePhoneChange} />
              </div>
            ) : <div className="border border-gray-300 rounded-md p-2 mt-4 focus-within:border-blue-400 relative">
              <div className='absolute -translate-y-1/2 top-0 left-3 bg-white overflow-hidden rounded'>
                <label className="text-xs text-gray-400 block">Email</label>
              </div>
              <input onKeyDown={handleKeyDown} type="text" className="w-full outline-none text-sm" value={Email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          }
          <div className="border border-gray-300 rounded-md p-2 mt-4 focus-within:border-blue-400 relative">
            <div className='absolute -translate-y-1/2 top-0 left-3 bg-white overflow-hidden rounded'>
              <label className="text-xs text-gray-400 block">{t("first_name")}</label>
            </div>
            <input value={name} onChange={(e) => setname(e.target.value)} type="text" className="w-full outline-none text-sm" />
          </div>
          <div className="border border-gray-300 rounded-md p-2 mt-4 focus-within:border-blue-400 relative">
            <div className='absolute -translate-y-1/2 top-0 left-3 bg-white overflow-hidden rounded'>
              <label className="text-xs text-gray-400 block">{t("password")}</label>
            </div>
            <input onKeyDown={handleKeyDown} value={password} onChange={(e) => setpassword(e.target.value)} type="password" className="w-full outline-none text-sm" />
          </div>
          <div className="border border-gray-300 rounded-md p-2 mt-4 focus-within:border-blue-400 relative">
            <div className='absolute -translate-y-1/2 top-0 left-3 bg-white overflow-hidden rounded'>
              <label className="text-xs text-gray-400 block">{t("password_confirm")}</label>
            </div>
            <input onKeyDown={handleKeyDown} value={password2} onChange={(e) => setpassword2(e.target.value)} type="password" className="w-full outline-none text-sm" />
          </div>
          <div className="text-gray-600 flex py-1 px-1.5">
            <button className="cursor-pointer ml-auto">{t("forgot_password")}</button>
          </div>
          <div className="py-1">
            <div className="py-1">
              <button onClick={sendData} className="font-semibold duration-200 text-white py-1 px-3 rounded bg-[#4bb543] w-full h-11 cursor-pointer hover:bg-[#7ed26f]">
                <div className="flex justify-center items-center">
                  <span className="mr-1"><IoPersonAddOutline className="text-2xl" /></span><span className="w-max">{t("register_button")}</span>
                </div>
              </button>
            </div>
            <div className="font-semibold text-center py-3 p-1 relative">
              <span className="absolute h-1 top-1/2 w-full left-0 bg-gray-200 z-1"></span>
              <span className="z-2 relative px-3 bg-white">{t("or_text")}</span>
            </div>
          </div>
        </div>
        <div className='pt-1 pb-2 p-1 flex justify-center'>
          <div className='px-1.5'>
            <button className='border border-gray-500 rounded-lg flex justify-center items-center w-12 h-12 cursor-pointer hover:bg-gray-100'>
              <img className='w-2/5' src={google} alt="" />
            </button>
          </div>
          <div className='px-1.5'>
            <button className='border border-gray-500 rounded-lg flex justify-center items-center w-12 h-12 cursor-pointer hover:bg-gray-100'>
              <img className='w-2/5' src={Apple} alt="" />
            </button>
          </div>
        </div>
      </div>
      <div className="shadow-lg bg-white w-[90vw] max-w-[320px] mx-auto relative lg:hidden block rounded-md">
        <button onClick={() => setOpen(false)} className="absolute right-2.5 top-1 cursor-pointer text-sm font-bold text-gray-500">x</button>
        <div className="p-3">
          <h2 className="text-base font-medium mb-1">{t("register_title")}</h2>
          <div className="flex py-0.5">
            <div className="ml-auto w-32">
              <div className="py-0.5">
                <div className="shadow-sm border border-gray-200 rounded-sm flex">
                  <button onClick={() => setActive(0)} className={`w-1/2 p-0.5 text-[10px] cursor-pointer ${active === 0 ? "bg-white text-blue-500" : "bg-gray-100 text-gray-600"}`}>Telefon</button>
                  <button onClick={() => setActive(1)} className={`w-1/2 p-0.5 text-[10px] cursor-pointer ${active === 1 ? "bg-white text-blue-500" : "bg-gray-100 text-gray-600"}`}>Email</button>
                </div>
              </div>
            </div>
          </div>
          {
            active === 0 ? (
              <div className="border border-gray-300 rounded-md p-1.5 mt-2 focus-within:border-blue-400 relative">
                <div className='absolute -translate-y-1/2 top-0 left-2 bg-white overflow-hidden rounded px-0.5'>
                  <label className="text-[10px] text-gray-400 block">{t("phone_number")}</label>
                </div>
                <input onKeyDown={handleKeyDown} type="text" className="w-full outline-none text-xs" value={Telefon} onChange={handlePhoneChange} />
              </div>
            ) : <div className="border border-gray-300 rounded-md p-1.5 mt-2 focus-within:border-blue-400 relative">
              <div className='absolute -translate-y-1/2 top-0 left-2 bg-white overflow-hidden rounded px-0.5'>
                <label className="text-[10px] text-gray-400 block">Email</label>
              </div>
              <input onKeyDown={handleKeyDown} type="text" className="w-full outline-none text-xs" value={Email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          }
          <div className="border border-gray-300 rounded-md p-1.5 mt-2 focus-within:border-blue-400 relative">
            <div className='absolute -translate-y-1/2 top-0 left-2 bg-white overflow-hidden rounded px-0.5'>
              <label className="text-[10px] text-gray-400 block">{t("first_name")}</label>
            </div>
            <input value={name} onChange={(e) => setname(e.target.value)} type="text" className="w-full outline-none text-xs" />
          </div>
          <div className="border border-gray-300 rounded-md p-1.5 mt-2 focus-within:border-blue-400 relative">
            <div className='absolute -translate-y-1/2 top-0 left-2 bg-white overflow-hidden rounded px-0.5'>
              <label className="text-[10px] text-gray-400 block">{t("password")}</label>
            </div>
            <input onKeyDown={handleKeyDown} value={password} onChange={(e) => setpassword(e.target.value)} type="password" className="w-full outline-none text-xs" />
          </div>
          <div className="border border-gray-300 rounded-md p-1.5 mt-2 focus-within:border-blue-400 relative">
            <div className='absolute -translate-y-1/2 top-0 left-2 bg-white overflow-hidden rounded px-0.5'>
              <label className="text-[10px] text-gray-400 block">{t("password_confirm")}</label>
            </div>
            <input onKeyDown={handleKeyDown} value={password2} onChange={(e) => setpassword2(e.target.value)} type="password" className="w-full outline-none text-xs" />
          </div>
          <div className="text-gray-600 flex py-0.5 px-1">
            <button className="cursor-pointer ml-auto text-[11px]">{t("forgot_password")}</button>
          </div>
          <div className="py-0.5">
            <div className="py-0.5">
              <button onClick={sendData} className="font-semibold duration-200 text-white py-1 px-2 rounded bg-[#4bb543] w-full h-9 cursor-pointer hover:bg-[#7ed26f] text-xs">
                <div className="flex justify-center items-center">
                  <span className="mr-1"><IoPersonAddOutline className="text-lg" /></span><span className="w-max">{t("register_button")}</span>
                </div>
              </button>
            </div>
            <div className="font-semibold text-center py-2 p-1 relative text-xs">
              <span className="absolute h-0.5 top-1/2 w-full left-0 bg-gray-200 z-1"></span>
              <span className="z-2 relative px-2 bg-white">{t("or_text")}</span>
            </div>
          </div>
        </div>
        <div className='pt-0 pb-2 p-1 flex justify-center'>
          <div className='px-1'>
            <button className='border border-gray-400 rounded-md flex justify-center items-center w-9 h-9 cursor-pointer hover:bg-gray-100'>
              <img className='w-4' src={google} alt="" />
            </button>
          </div>
          <div className='px-1'>
            <button className='border border-gray-400 rounded-md flex justify-center items-center w-9 h-9 cursor-pointer hover:bg-gray-100'>
              <img className='w-4' src={Apple} alt="" />
            </button>
          </div>
        </div>
      </div>
    </Popup>
  )
}

export default Register
import React from 'react'
import { useState } from 'react';

interface PropsType {
  setInfoModal: React.Dispatch<React.SetStateAction<boolean>>,
}

function InfoModal({ setInfoModal }: PropsType) {
  const [language, setLanguage] = useState(false);

  return (
    <div>
      <div onClick={() => setInfoModal(false)} className='bg-slate-800 opacity-60 fixed top-0 left-0 w-full h-screen'></div>
      <div className='px-3 py-3 md:px-6 md:py-4 fixed bg-slate-300 top-11 sm:top-1/2 left-1/2 -translate-x-1/2 sm:-translate-y-60 border border-black rounded-xl text-xs sm:text-sm md:text-base w-full md:w-[650px] md:mx-0'>
        <div className='flex justify-start mb-3'>
          <div className='py-2 px-4 border border-black rounded-lg cursor-pointer hover:bg-slate-400 w-24 text-center' onClick={() => setLanguage(!language)}>{language ? "English" : "Türkçe"}</div>
        </div>

        <h1>{language ? "Bilgilendirme" : "Information"}</h1>
        {language && <div><p>
          Eczaneler nöbet haricinde hafta içi ve cumartesi günleri 08:30 - 19.00 saatleri arasında açık olurlar. Nöbetçi eczaneler ise 24 saat açıktır.</p>
          <br />
          <p>Pazar ve bayram tatillerine denk gelen günlerde de nöbetçi eczaneler çalışmaktadır.</p>
          <br />
          <p>(Uygulama listelenen nöbetçi eczanelerin nöbet saati bitimine(Tüm eczanelerin açılış saati) kadar tıklanan iller için browser'a(localStorage) kaydedilir, böylece çevrim dışı durumda nöbet saati bitene kadar kullanılabilir. Nöbet saati geçtiğinde yapılan listelemelerde API'dan güncel liste istenir.)
            <br />
            <br />
            API Link: <a href="https://collectapi.com/tr/api/health/nobetci-eczane-api" rel='noreferrer' target='_blank'>https://collectapi.com/tr/api/health/nobetci-eczane-api</a>
          </p>
        </div>}
        {!language && <div>
          <p>Pharmacies are open on weekdays and Saturdays from 08:30 to 19:00, except for night shifts. Night shift pharmacies are open 24 hours.</p>
          <br />
          <p>On Sundays and public holidays, there are also pharmacies on duty.</p>
          <br />
          <p>The application saves the clicked cities for the listed duty pharmacies to the browser's localStorage until the end of the duty hours (openings of all pharmacies), allowing it to be used offline until the duty hours expire. Updated list fetch with API request, after end of the duty time passed
            <br />
            <br />
            API Link: <a href="https://collectapi.com/tr/api/health/nobetci-eczane-api" rel='noreferrer' target='_blank'>https://collectapi.com/tr/api/health/nobetci-eczane-api</a>
          </p>
        </div>}
        <div className='flex justify-end mt-3'>
          <div className='py-2 px-4 border border-black rounded-lg cursor-pointer hover:bg-slate-400' onClick={() => setInfoModal(false)}>OK</div>
        </div>
      </div>
    </div>
  )
}

export default InfoModal

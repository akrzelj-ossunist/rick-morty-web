import React, {useState} from 'react'


export default function Numlist() {
/*
1. zadtak ti je div koji ima u sebi 3 diva u redu koji su jednako udaljeni jedni od drugih 
glavni div zauzima cijeli ekran a mali divovi imaju visinu i veličinu 40 pixela

2. Zadtak ispod njega div zelene boje koji zauzima cijeli ekran koji ima unutar sebe absolutni div
 koji je gore desno i jedan div koji je centriran unutar tog diva 
*/


  return (
    <>
      <div className='flex h-[100vh] w-[100%] bg-white justify-between'>
          <div className='bg-black w-10 h-10'></div>
          <div className='bg-black w-10 h-10'></div>
          <div className='bg-black w-10 h-10'></div>
      </div>

      <div className='flex h-[100vh] w-[100%] bg-green-900 z-10 justify-center items-center relative'>
        <div className='absolute top-0 right-0 bg-black w-20 h-20'></div>
        <div className="bg-black h-10 w-10"></div>
      </div>

      <div className='flex h-[100vh] w-[100%] bg-blue-900 z-0 justify-center items-center relative'>
        <div className='absolute top-0 right-0 bg-black w-20 h-20'></div>
        <div className="bg-black h-10 w-10"></div>
      </div>
    </>
  )
}

import React from 'react'
import Link from 'next/link'

 const Navigation = ({children}) => {
  
    const links = "m-5 text-black cursor-pointer"
  
    return (<>
        <div className='bg-white flex justify-between'>
            <Link className='text-black p-4' href='/nesto'>Nesto</Link>
            <Link className='text-black p-4' href='/characters'>Charcters</Link>
            <Link className='text-black p-4' href='/empty'>Empty</Link>
    </div>  
    <div>{children}</div>
    <div className='bg-green-900 w-full h-20'></div>
    </>
    
    )
}


export default Navigation
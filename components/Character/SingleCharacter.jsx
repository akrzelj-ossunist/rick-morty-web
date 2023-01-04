import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const SingleCharacter = ( {name, image, species, status} ) => {

  const myLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`
  }
  

  return  <div className='m-4 bg-white text-black rounded-lg shadow-[0px_0px_5px_2px] shadow-white'>
    <Link href={name.replace(" ","-")}><Image className='rounded-t-lg m-0' 
                                        loader={myLoader}
                                        src={image}
                                        alt={name}
                                        width={300}
                                        height={300}/>
    </Link>
    <div className='m-[40px_-15px_35px_20px] w-[70%]'>
      <Link href={name.replace(" ","-")} className='text-2xl text-blue-900 m-1'>{name}</Link>
      <p className='text-gray-500 text-sm m-1'>{status}</p>
      <p className='text-lg text-gray-400 m-1'>{species}</p>
    </div>
  </div>
  
}

export default SingleCharacter
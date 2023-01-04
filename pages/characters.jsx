import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {

  useQuery,
} from '@tanstack/react-query'
import SingleCharacter from '../components/Character/SingleCharacter'


/*
Preuzeti s RM API-a podatke i ispisati prvih dvadeset imena u kutije 80 x 80 siva boje . Spremiti imena u lokalno i da su imena centirarana.
Između svakog slova u imenu staviti zarez
*/


export default function characters() {
  
  const {data:characterData,isLoading,isError} = useQuery(["fsaa"], async () => {
    return await axios.get('https://rickandmortyapi.com/api/character').then(
        res => res.data
      ).catch(err=>console.log(err))
    })

  // printCharacters()
  if(isLoading) {
 return <p>Loading ...</p>  }  


 return<div className='flex flex-wrap justify-between'>
 {characterData.results.map(character=> <SingleCharacter 
    name = {character.name}
    image = {character.image}
    species = {character.species}
    status = {character.status}
  />)}
  </div>
}


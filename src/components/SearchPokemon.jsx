import { useState } from 'react';
import axios from 'axios';

/**
  effect_entries = short_effect
  pokemon = name (done)
  flavor_text_entries = (it is an array, show only language en)
 **/

const baseUrl = 'https://pokeapi.co/api/v2/ability/'

export default function SearchPokemon() {
  const [search, setSearch] = useState ("")
  const [pokemonName, setPokemonName] = useState([])
  const [pokemonEffectEntries, setPokemonEffectEntries] = useState([])
  const [pokemonFlavorText, setPokemonFlavorText] = useState([])

  const findPokemon = () => {
    console.log('rendered')
    axios({
      method: "GET",
      url: `${baseUrl}${search}`
    }).then(result => {
      setPokemonName(result.data.pokemon)
      setPokemonEffectEntries(result.data.effect_entries)
      setPokemonFlavorText(result.data.flavor_text_entries)
    })
  }


  return (
    <div>
        <h1 className='pertama'>Pokemon Ability</h1>
        <div>
          <input className='input-ability' placeholder='Cari Ability' onChange={(x) => setSearch(x.target.value)}/>
          <button onClick={() => findPokemon()}>Search</button>
        </div>
        <div><b className='pokemon-name'>Pokemon Name:  </b>
        {pokemonName.map((data, i) => {
          return(
            <span key={i} className='list-nama'>
              <ul>
                <li>
                  {data.pokemon.name}
                </li>
              </ul>
            </span>
          )
        })}
        </div>
        <div><b className='pokemon-effect'>Pokemon Effect Entries: </b>
          {pokemonEffectEntries.map((data, i) => {
            return (
              <span key={i} className='list-effect'>
                <ul>
                  <li>
                    {data.short_effect}
                  </li>
                </ul>
              </span> 
            )
          })}
        </div>
        <div><b className='pokemon-flavor'>Pokemon Flavor Text: </b>
          {pokemonFlavorText.map((data, i) => {
            if(data.language.name === 'en'){
              return <span key={i} className='list-keterangan'>
                <ul>
                  <li>
                    {data.flavor_text}
                  </li>
                </ul>
              </span>
            }
          })}
        </div>
    </div>
  )
}

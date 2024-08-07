import React, { useEffect, useState } from 'react'
import '../App.css'
import Card from './Card'
function Pokemon() {

    const [pokemonData, setPokemonData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search,setSearch] = useState("");

    const API = 'https://pokeapi.co/api/v2/pokemon/?offset=20&limit=40';

    const fetchPokemon = async () => {
        try {
            const res = await fetch(API);
            const data = await res.json();
            // console.log(data);
            const pokeUrl = data.results.map(async (currPoke) => {
                const res = await fetch(currPoke.url);
                const data = await res.json();
                return data;
            });

            const PokeData = await Promise.all(pokeUrl);
            setPokemonData(PokeData);
            setLoading(false);
        }
        catch (error) {
            console.log(error);
            setLoading(false);
            setError(error);
        }

    }

    useEffect(() => {
        fetchPokemon();
    }, [])

     
    //Search Functionality

    const searchData = pokemonData.filter((currPokemon)=> currPokemon.name.toLowerCase().includes(search.toLowerCase()))

    //Before api load
    if (loading) {
        return (
            <h1>Loading...</h1>
        )
    }

    if (error) {
        return (
            <h1>{error.message}</h1>
        )
    }

    return (
        <>
            <div className="container">
                <h1>Pokemon</h1>
                <input
                    type="text"
                    placeholder='Search Pokemon'
                    value={search}
                    onChange={(e)=> setSearch(e.target.value)}
        
                />
            </div>

            <ul>
                {searchData.map((currElem) => {
                    return (<Card key={currElem.id} data={currElem} />)
                })}
            </ul>

        </>
    )
}

export default Pokemon
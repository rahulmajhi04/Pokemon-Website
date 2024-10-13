import React from 'react'
import './Card.css'
function Card(props) {
    return (
        <li className='pokemonCard'>
            <img src={props.data.sprites.other.dream_world.front_default} alt={props.data.name} />
            <h2>{props.data.name}</h2>
            <div className="span">
                <b>Height: {props.data.height}</b>
                <b>Weight: {props.data.weight}</b>
                <b>Speed: {props.data.stats[5].base_stat}</b>
                <b>Experience: {props.data.base_experience}</b>
                <b>Attack: {props.data.stats[1].base_stat}</b>
                <b>Abilities: {props.data.abilities.map((abilityInfo) => abilityInfo.ability.name).slice(0, 1).join(", ")}</b>
            </div>
        </li>
    )
}

export default Card
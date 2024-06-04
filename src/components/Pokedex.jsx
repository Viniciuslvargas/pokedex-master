import React, {useState, useEffect} from "react";
import style, {styled} from 'styled-components'
import {motion} from 'framer-motion'

const Spinner = style (motion.div)`
  width: 50px;
  height: 50px;
  border: 4px solid black;
  border-radius: 50%;
  border-top: 4px solid red;
  display: insline-block;
`;

const Container = style.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;


export default function Pokedex(){
 const [id, setId] = useState(1);
 const [pokemon, setPokemon] = useState(null);
 const [carregando, setCarregando] = useState(true);


const fetchData = async () => { 
    setCarregando(true);
// função assincrona para encontrar dados e conectar na API
    try{
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`) 
        const data = await response.json();
        setTimeout(() => {
            setPokemon(data);
            setCarregando(false);
        },500);
    }catch(error){
        console.error(error);
        setCarregando(false);
    }
 };

    useEffect(() => {
        fetchData()
    }, [id]);

    const nextPokemon = () =>{
        setId(id+1)
    }
    const anteriorPokemon = () =>{
        setId(id-1)
    }
    
    return(
        <>
        <Container>
          {carregando ? (
            <Spinner
            animate={{rotate: 360}}
            transition={{duration: 0.5, repeat: Infinity, ease: 'linear'}}
          >
          </Spinner>
          ):(
            <div>
                {pokemon && (
          
            <div className="pokemon">
                <h1><img className="title" src="pologo.png" alt="" /></h1>
                <p className="name">{pokemon.name}</p>
                <p className="peso">Peso: {pokemon.weight}</p>
                <img className="pokemon-img" src={pokemon.sprites.front_default} alt="Pokemon" />
                <div className="divbotao">
                <button className="botao" onClick={anteriorPokemon}>Anterior</button>
                <br/>
                <button className="botao" onClick={nextPokemon}>Próximo</button>
                </div>
            </div>
            )}
        </div>
          )
}

        </Container>
        
        
        </>
        
    )
}
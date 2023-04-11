import { GetStaticProps, NextPage } from "next";
import axios from "axios";

import Menu from "../../components/navbar";
import Card from "../../components/card";
import { Poke, PokemonListResponse } from "../../interfaces";

interface Props {
  pokemon: Poke[];
}

const HomePage: NextPage<Props> = (props) => {
  return (
    <>
      <Menu />
      <div className="container mx-auto px-2 py-2 m-1">
        <h2 className="brightness-150 font-bold text-transparent text-3xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-700">
          Listado de Pokemon
        </h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-1">
        {
            props.pokemon.map( (pokemon) => (
              <Card key={pokemon.id} pokemon={pokemon} />
            ))
        }
        </div>
        
      </div>

      
    </>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await axios.get<PokemonListResponse>(
    "https://pokeapi.co/api/v2/pokemon?limit=151"
  );

  const pokemon: Poke[] = data.results.map((poke, index) => {
    const number = index + 1;
    const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${number}.svg`;
    return {
      ...poke,
      image,
      id: number,
    };
  });

  return {
    props: {
      pokemon: pokemon,
    },
  };
};
export default HomePage;

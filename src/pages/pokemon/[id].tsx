import { GetStaticProps, NextPage, GetStaticPaths } from "next";
import axios from "axios";

import { Pokemon } from "../../../interfaces";
import Menu from "../../../components/navbar";
import Image from "next/image";

interface Props {
  pokemon: Pokemon;
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {
  // console.log(pokemon);
    
  return (
    <>
      <Menu />
      <div className="container mx-auto px-2 py-2 m-1 border-2 mt-4 ">
        <h2 className="capitalize brightness-150 font-bold text-transparent text-3xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-700">
          #{pokemon.id}-{pokemon.name}
        </h2>
        <div className="grid grid-rows-3 grid-flow-col gap-4">
          <div className="row-span-3 ...">
            <Image
              src={
                pokemon.sprites.other?.dream_world.front_default ||
                "/no-image.png"
              }
              alt={pokemon.name}
              width={200}
              height={200}
              style={{ width: '50%', height: 'auto' }}
              className="object-scale-down h-48 w-96"
            />
          </div>
          <div className="col-span-2 ">
            <p className="capitalize brightness-150 font-bold text-transparent text-3xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-700">{pokemon.types.map((type) => type.type.name).join(", ")}</p>
          </div>
          <div className="row-span-2 col-span-2 flex">
            <Image
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              width={70}
              height={70}
              style={{ width: '50%', height: 'auto' }}
              className="object-scale-down h-48 w-96"
            />
            <Image
              src={pokemon.sprites.back_default}
              alt={pokemon.name}
              width={70}
              height={70}
              style={{ width: '50%', height: 'auto' }}
              className="object-scale-down h-48 w-96"
            />
            <Image
              src={pokemon.sprites.front_shiny}
              alt={pokemon.name}
              width={70}
              height={70}
              style={{ width: '50%', height: 'auto' }}
              className="object-scale-down h-48 w-96"
            />
            <Image
              src={pokemon.sprites.back_shiny}
              alt={pokemon.name}
              width={70}
              height={70}
              style={{ width: '50%', height: 'auto' }}
              className="object-scale-down h-48 w-96"
            />
          </div>
        </div>
      </div>
    </>
  );
};

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const pokemons151 = [...Array(151)].map((value, index) => `${index + 1}`);

  return {
    paths: pokemons151.map((id) => ({
      params: { id },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };

  const { data } = await axios.get<Pokemon>(
    `https://pokeapi.co/api/v2/pokemon/${id}`
  );

  return {
    props: {
      pokemon: data,
    },
  };
};

export default PokemonPage;

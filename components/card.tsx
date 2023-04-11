import Image from "next/image";
import { useRouter } from "next/router";
import { FC } from "react";

import { Poke } from "../interfaces";
import handler from '../src/pages/api/hello';


interface Props {
    pokemon: Poke
}

const Card: FC<Props> = ({ pokemon }) => {

    const router = useRouter()
    const handlerClick = () => {  
        router.push(`/pokemon/${pokemon.id }`)
    }



  return (
    <div className="h-full p-2" onClick={handlerClick}>
    <div className="grid h-full m-2 rounded-lg dark:bg-gray-900 overflow-hidden">
        <div className=" h-64 opacity-70 hover:opacity-100 hover:scale-105 flex mt-4 justify-center hover:cursor-pointer">
            <Image src={pokemon.image} alt={pokemon.name} width={300} height={300} className="object-scale-down h-48 w-96"/>
        </div>
        <div className="z-20 content-end rounded p-2 justify-items-stretch dark:bg-gray-700 text-center">
            <h5 className="capitalize brightness-150 text-xl text-left font-bold text-transparent text-3xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-700">
                #{ pokemon.id } - { pokemon.name}
            </h5>
        </div>
    </div>
</div>
  );
};

export default Card;

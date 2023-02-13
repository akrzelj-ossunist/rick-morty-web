import axios from "axios";
import { IAPIResponse, ICharacter } from "../components/interfaces";
import { useQuery } from "@tanstack/react-query";

export const getSingleCharacterDetails = async (id: string) => {
  try {
    const resp = await axios.get<ICharacter>(
      `https://rickandmortyapi.com/api/character/${id}`
    );
    return resp.data;
  } catch (error) {
    console.log(error);
  }
};

export const getSingleCharacterDetailsByQuery = (id: string) => {
  return useQuery([id], () => getSingleCharacterDetails(id));
};

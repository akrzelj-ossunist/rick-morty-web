import { useQueries, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IAPIResponse, ICharacter } from "../components/interfaces";

export const getCharacters = async (
  page: number,
  status: string,
  name: string
) => {
  try {
    const resp = await axios.get<IAPIResponse<ICharacter>>(
      "https://rickandmortyapi.com/api/character",
      {
        params: {
          page: page,
          status: status,
          name: name,
        },
      }
    );
    return resp.data;
  } catch (error) {
    console.error(error);
  }
};

export const useGetCharactersQuery = ({
  status,
  name,
  page,
}: {
  status: string;
  name: string;
  page: number;
}) => {
  return useQuery(["characters", page, status, name], () =>
    getCharacters(page, status, name)
  );
};

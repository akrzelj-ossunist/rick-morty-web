import React from "react";
import { useRouter } from "next/router";
import { getSingleCharacterDetailsByQuery } from "../../services/getSingleCharactersDetails";
import Image from "next/image";
import Link from "next/link";

const SingleChracterDetails: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const {
    data: characterData,
    isLoading,
    isError,
  } = getSingleCharacterDetailsByQuery(String(id));
  if (isLoading) return <p>Loading...</p>;
  return (
    <div className="m-10 bg-blue-200 w-[300px] rounded-t-2xl rounded-b-2xl">
      <Image
        className="rounded-t-2xl"
        src={characterData?.image || ""}
        width={300}
        height={300}
        alt={String(characterData?.id) || ""}
      />
      <div className="text-white w-[300px]">
        <p className="m-[40px_20px_20px_20px] text-2xl text-blue-900">
          Name: {characterData?.name}
        </p>
        <p className="m-5 text-blue-600">Species: {characterData?.species}</p>
        <p className="m-5 text-blue-600">Gender: {characterData?.gender}</p>
        <p className="m-5 text-blue-600">
          Origin: {characterData?.origin.name}
        </p>
        <p className="m-5 text-blue-600">
          Loaction: {characterData?.location.name}
        </p>
        <p className="m-5 text-blue-600">Status: {characterData?.status}</p>
        <p className="m-5 text-blue-600">Created: {characterData?.created}</p>
        <div className="flex">
          <p className="m-[20px_20px_-10px_20px] text-blue-600">Episodes:</p>
          <select className="m-5 bg-blue-200 text-blue-600 cursor-pointer">
            {characterData?.episode.map((ep) => (
              <option className="bg-blue-200">
                {ep
                  .substring(ep.indexOf("api/") + 4, ep.length)
                  .replace("/", " ")}
              </option>
            ))}
          </select>
        </div>
      </div>
      <Link
        className="m-5 text-blue-900"
        href={`/?page=${Math.ceil(Number(id) / 20)}`}
      >
        Return
      </Link>
    </div>
  );
};

export default SingleChracterDetails;

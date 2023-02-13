import React, { useEffect, useState } from "react";
import { useGetCharactersQuery } from "../services/getCharacters";
import { SingleCharacter } from "../components/SingleCharacter";
import { GetServerSideProps } from "next";
import { Modal } from "../components/Modal";
import { FilterForm } from "../components/FilterForm";
import { useQueryStates, queryTypes } from "next-usequerystate";
import { useRouter } from "next/router";

interface Params {
  status: string;
  name: string;
  page: number;
}

const Characters: React.FC<{ params: Params }> = ({
  params: initialParams,
}) => {
  const [params, setParams] = useQueryStates(
    {
      name: queryTypes.string.withDefault(initialParams.name),
      status: queryTypes.string.withDefault(initialParams.status),
      page: queryTypes.integer.withDefault(initialParams.page),
    },
    { history: "replace" }
  );

  const router = useRouter();

  const [listView, setListView] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("listView") === "true" || false;
    }
    return false;
  });

  const changeView = (view: boolean) => {
    setListView(view);
    localStorage.setItem("listView", String(view));
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const {
    data: charactersData,
    isLoading,
    isError,
  } = useGetCharactersQuery(params);

  const prevPage = () => {
    if (charactersData?.info.prev !== null) {
      setParams({ ...params, page: params.page - 1 });
    }
  };

  const nextPage = () => {
    if (charactersData?.info.next) {
      setParams({ ...params, page: params.page + 1 });
    }
  };

  if (isLoading) return <p>Loading...</p>;
  return (
    <div>
      {isModalVisible && (
        <Modal isOpen={isModalVisible} onClose={() => setIsModalVisible(false)}>
          <FilterForm
            setParams={setParams}
            params={params}
            setModal={setIsModalVisible}
          />
        </Modal>
      )}
      <div className="flex justify-between bg-blue-500 text-white top-0 sticky">
        <button
          className="text-blue-500 bg-white active:bg-gray-200 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ml-10 mt-1 mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
          onClick={() => setIsModalVisible(true)}
        >
          Open filter
        </button>
        <div>
          <button
            onClick={() => {
              router.push("/", "register");
              setTimeout(() => {
                window.location.reload();
              }, 50);
            }}
            type="button"
            className="bg-white text-blue-700 font-bold uppercase active:bg-gray-200 text-sm px-6 py-3 rounded shadow outline-none focus:outline-none mr-10 mb-1"
          >
            Register
          </button>
          <button
            type="button"
            onClick={() => changeView(!listView)}
            className="bg-white text-blue-700 font-bold uppercase active:bg-gray-200 text-sm px-6 py-3 rounded shadow outline-none focus:outline-none mr-10 mb-1 mt-1"
          >
            <p className="mt-1">{listView ? "List" : "Grid"}</p>
          </button>
        </div>
      </div>
      <div
        className={`flex justify-between flex-wrap m-10 ${
          listView ? "flex-row" : "flex-col items-center"
        }`}
      >
        {charactersData?.results.map((character) => (
          <SingleCharacter
            image={character.image}
            name={character.name}
            status={character.status}
            species={character.species}
            id={character.id}
            view={listView}
          />
        ))}
      </div>
      <div className="flex justify-around bottom-0 sticky bg-blue-500 text-white">
        <button className="m-5" onClick={prevPage}>
          Prev
        </button>
        <button className="m-5" onClick={nextPage}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Characters;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const params = {
    status: context.query.status || null,
    name: context.query.name || null,
    page: context.query.page || 1,
  };
  return {
    props: { params },
  };
};

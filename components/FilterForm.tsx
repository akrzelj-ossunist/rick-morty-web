import { useState } from "react";

interface Params {
  name: string;
  status: string;
  page: number;
}

interface Props {
  setModal: (modal: boolean) => void;
  params: Params;
  setParams: (params: Params) => void;
}

export const FilterForm: React.FC<Props> = ({
  setModal,
  params,
  setParams,
}) => {
  const [localParams, setLocalParams] = useState<Params>(params);

  return (
    <>
      <form
        className="flex justify-center flex-col h-[100vh] items-center"
        onSubmit={() => {
          setModal(false);
          setParams({ ...localParams, page: 1 });
        }}
      >
        <div
          className="fixed top-0 h-[100vh] w-[100vw] text-transparent"
          onClick={() => setModal(false)}
        >
          Click on window close modal
        </div>
        <div className="flex flex-col rounded-2xl justify-center bg-blue-500 w-[25%] h-[25%] z-10">
          <div className="flex justify-center">
            <p className="m-10 text-white">Filters: </p>
            <select
              className="m-10 bg-blue-500 text-white border-opacity-0"
              onChange={(el) =>
                setLocalParams({ ...localParams, status: el.target.value })
              }
            >
              <option value="none" selected disabled hidden>
                {params.status ? localParams.status : "Filter by: "}
              </option>
              <option className="bg-blue-500 text-white" value="alive">
                Alive
              </option>
              <option className="bg-blue-500 text-white" value="dead">
                Dead
              </option>
              <option className="bg-blue-500 text-white" value="unknown">
                Unknown
              </option>
            </select>
          </div>
          <div className="flex justify-center">
            <label className=" mb-10 mr-3 text-white">Name:</label>
            <input
              value={localParams.name}
              className="mb-10"
              onChange={(el) =>
                setLocalParams({ ...localParams, name: el.target.value })
              }
            ></input>
            <button
              className="ml-10 text-blue-500 mb-10 p-1 bold uppercase text-sm bg-white rounded shadow"
              type="submit"
            >
              Filter
            </button>
          </div>
          <button
            className="ml-10 text-blue-500 mb-10 p-1 mr-10 bold uppercase text-sm bg-white rounded shadow"
            onClick={() => {
              localParams.name = "";
              localParams.status = "";
            }}
          >
            Home
          </button>
        </div>
      </form>
    </>
  );
};

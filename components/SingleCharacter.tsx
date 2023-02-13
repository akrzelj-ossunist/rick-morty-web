import Image from "next/image";
import Link from "next/link";

interface Props {
  image: string;
  name: string;
  status: string;
  species: string;
  id: number;
  view: Boolean;
}

export const SingleCharacter: React.FC<Props> = ({
  image,
  name,
  status,
  species,
  id,
  view,
}) => {
  return (
    <div
      className={`mb-10 ${
        view
          ? "w-[33%]"
          : "flex desktop:flex-row desktop:w-[50%] border-2 border-black tablet:flex-col tablet:w-[300px]"
      }`}
    >
      <Image src={image} width={300} height={300} alt={name} />
      <div className={`${view ? "" : "ml-14 mt-4"}`}>
        <Link className="text-3xl text-blue-900" href={"/character/" + id}>
          {name}
        </Link>
        <p className="mt-5 text-lg text-blue-600">{status}</p>
        <p className="text-lg text-blue-600">{species}</p>
      </div>
    </div>
  );
};

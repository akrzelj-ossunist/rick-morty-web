export interface IAPIResponse<T> {
  info: IAPIResponseInfo;
  results: Array<T>;
}
export interface IAPIResponseInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface ICharacter {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: Location;
  location: Location;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface Location {
  name: string;
  url: string;
}

export interface ComicsProps {
  data: ComicData;
}

export type ComicData = {
  results: ComicResult[];
};

export type ComicResult = {
  title: string;
  description: string;
  format: string;
  thumbnail: ThumbnailComicProps;
  creators: CreatorsComicProps;
  characters: CharactersComicProps;
};

export type ThumbnailComicProps = {
  path: string;
  extension: string;
};

export type CreatorsComicProps = {
  available: number;
  returned: number;
  collectionURI: string;
  items: [{ resourceURI: string; name: string; role: string }];
};

export type CharactersComicProps = {
  available: number;
  returned: number;
  collectionURI: string;
  items: ItemsComicProps[];
};

export type ItemsComicProps = {
  resourceURI: string;
  name: string;
  role: string;
};
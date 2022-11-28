export interface CharactersProps {
  data: CharacterData;
}

export type CharacterData = {
  results: CharacterResult[];
};

export type CharacterResult = {
  id: number;
  name: string;
  description: string;
  modified: Date;
  resourceURI: string;
  thumbnail: ThumbnailCharacterProps;
  comics: ComicsCharacterProps;
};

export type ThumbnailCharacterProps = {
  path: string;
  extension: string;
};

export type ComicsCharacterProps = {
  available: number;
  returned: number;
  collectionURI: string;
  items: ItemsCharacterProps[];
};

export type ItemsCharacterProps = {
  resourceURI: string;
  name: string;
};
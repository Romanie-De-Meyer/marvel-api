export interface CreatorsProps {
  data: CreatorData;
}

export type CreatorData = {
  results: CreatorResult[];
};

export type CreatorResult = {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  fullName: string;
  thumbnail: ThumbnailCreatorProps;
  comics: ComicsCreatorProps;
};

export type ThumbnailCreatorProps = {
  path: string;
  extension: string;
};

export type ComicsCreatorProps = {
  available: number;
  returned: number;
  collectionURI: string;
  items: ItemsCreatorProps[];
};

export type ItemsCreatorProps = {
  resourceURI: string;
  name: string;
};

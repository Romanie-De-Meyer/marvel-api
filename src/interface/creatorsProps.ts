export type CreatorResult = {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  fullName: string;
  thumbnail: { path: string; extension: string };
  comics: {
    available: number;
    returned: number;
    collectionURl: string;
    items: [{ resourceURl: string; name: string }];
  };
}

export interface CreatorsProps {
  data: {
    results: CreatorResult[];
  };
}

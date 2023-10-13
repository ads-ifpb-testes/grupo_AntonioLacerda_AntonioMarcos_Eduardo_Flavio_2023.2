export type OcurrencyDTO = {
  id: string;
  userId: string;
  title: string;
  type: OcurrencyType;
  date: Date;
  location: {
    LNG: number;
    LTD: number;
  };
  public: boolean;
  createdAt: Date;
  updatedAt: Date;
};

enum OcurrencyType {
  theft,
  robbery,
  sexualHarassment,
  kidnapping,
  vandalism,
  other
}

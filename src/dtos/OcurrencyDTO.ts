export type OcurrencyDTO = {
  id: string;
  userId: string;
  title: string;
  type: OcurrencyType;
  date: Date;
  time: string;
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

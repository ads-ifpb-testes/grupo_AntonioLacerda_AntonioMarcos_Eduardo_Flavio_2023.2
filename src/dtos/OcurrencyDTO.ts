import { Schema } from 'mongoose';

export interface IOcurrency {
  _id: string;
  userId: Schema.Types.ObjectId;
  title: string;
  type: string;
  date: Date;
  time: string;
  location: {
    type: string;
    coordinates: [number, number];
  };
  public: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateOcurrency {
  userId: string;
  title: string;
  type: string;
  date: Date;
  time: string;
  location: {
    type: string;
    coordinates: [number, number];
  };
  public: boolean;
}

export enum OcurrencyType {
  theft,
  robbery,
  sexualHarassment,
  kidnapping,
  vandalism,
  other
}

export interface IOcurrencyMethods {
  getLatLng(): [number, number];
}

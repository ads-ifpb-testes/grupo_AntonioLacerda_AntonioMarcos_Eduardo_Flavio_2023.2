export interface IUser {
  _id: number;
  email: string;
  name: string;
  password: string;
  birthDate?: Date;
  country?: string;
  city?: string;
  adress?: string;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateUser {
  email: string;
  name: string;
  password: string;
  birthDate?: Date;
  country?: string;
  city?: string;
  adress?: string;
  phone?: string;
}

export interface IUserWithoutPassword {
  _id: number;
  email: string;
  name: string;
  birthDate?: Date;
  country?: string;
  city?: string;
  adress?: string;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
}

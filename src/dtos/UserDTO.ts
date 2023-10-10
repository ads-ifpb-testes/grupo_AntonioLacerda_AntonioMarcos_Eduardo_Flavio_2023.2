export type UserDTO = {
  id: number;
  email: string;
  name: string;
  password: string;
  birthDate?: Date;
  country?: string;
  city?: string;
  adress?: string;
  phone?: string;
  ocurrency?: string[];
  createdAt: Date;
  updatedAt: Date;
};

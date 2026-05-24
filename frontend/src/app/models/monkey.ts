export interface Monkey {
  _id?: string;
  name: string;
  microchipId: string;
  gender: string;
  age: number;
  weight: number;
  species: string;
  acquisitionDate?: Date;
  acquisitionCountry: string;
  trainingStatus: string;
  reserved: boolean;
  inService: boolean;
  inServiceCountry?: string;
  tailLength: number;
  height: number;
}

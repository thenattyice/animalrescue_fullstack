export interface Dog {
  _id?: string;
  name: string;
  microchipId: string;
  gender: string;
  age: number;
  weight: number;
  breed: string;
  acquisitionDate?: Date;
  acquisitionCountry: string;
  trainingStatus: string;
  reserved: boolean;
  inService: boolean;
  inServiceCountry?: string;
}

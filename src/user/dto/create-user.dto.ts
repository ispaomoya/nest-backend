export class CreateUserDto {
  name: string;
  email: string;
  pwd: string;
  phone: number;
  sex: number;
  age: number;
  address: string;
  role: string;
  avatar: string;
  text: string;
  orderId: number;
}

export class UpdateUserDto {
  name: string;
  email: string;
  phone: number;
  sex: number;
  age: number;
  address: string;
  role: string;
  avatar: string;
  text: string;
  orderId: number;
}
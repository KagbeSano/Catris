import { User } from '../models';

export interface MockUserRecord extends User {
  password: string;
}

export let mockUsersDB: MockUserRecord[] = [
  { id: '1', pseudo: 'Sano',    email: 'sano@gmail.com',    password: '123456' },
  { id: '2', pseudo: 'Felania', email: 'felania@gmail.com', password: '123456' },
  { id: '3', pseudo: 'Ciel',    email: 'ciel@gmail.com',    password: '123456' },
];

export function addMockUser(user: MockUserRecord) {
  mockUsersDB.push(user);
}
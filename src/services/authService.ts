import { addMockUser, mockUsersDB } from '../mocks/mockUser';
import { User } from '../models';

const FAKE_DELAY = 600;

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function loginMock(email: string, password: string): Promise<User> {
  await delay(FAKE_DELAY);

  const found = mockUsersDB.find(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  );

  if (!found) {
    throw new Error("Aucun compte ne correspond à cet email.");
  }
  if (found.password !== password) {
    throw new Error("Mot de passe incorrect.");
  }

  const { password: _pw, ...user } = found;
  return user;
}

export async function registerMock(
  pseudo: string,
  email: string,
  password: string
): Promise<User> {
  await delay(FAKE_DELAY);

  const exists = mockUsersDB.some(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  );
  if (exists) {
    throw new Error("Un compte existe déjà avec cet email.");
  }

  const newUser = { id: Date.now().toString(), pseudo, email, password };
  addMockUser(newUser);

  const { password: _pw, ...user } = newUser;
  return user;
}
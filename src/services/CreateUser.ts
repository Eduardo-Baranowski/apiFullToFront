import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../models/User';

interface UserDTO {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: UserDTO): Promise<User> {
    const usersRepository = getRepository(User);

    const emailExists = await usersRepository.findOne({ email });
    if (emailExists) {
      throw new Error('Email already exists!');
    }
    const encryptedPassword = await hash(password, 8);
    const user = usersRepository.create({
      name,
      email,
      password: encryptedPassword,
    });
    await usersRepository.save(user);
    return user;
  }
}

export default CreateUserService;

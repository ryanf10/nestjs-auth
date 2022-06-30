import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { USER_REPOSITORY } from '../../core/constants';
import * as bcrypt from 'bcrypt';
import { Role } from './role.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
  ) {}

  async create(user: CreateUserDto): Promise<User> {
    return await this.userRepository.create<User>(user);
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne<User>({
      where: { email },
      include: [
        {
          model: Role,
          attributes: ['id', 'roleName'],
        },
      ],
    });
  }

  async findOneById(id: number): Promise<User> {
    return await this.userRepository.findOne<User>({
      where: { id },
      include: [
        {
          model: Role,
          attributes: ['id', 'roleName'],
        },
      ],
    });
  }

  async profile(id: number): Promise<User> {
    const user = await this.findOneById(id);
    return this.userResponse(user);
  }

  async updateProfile(id: number, name: string, gender: string): Promise<User> {
    const user = await this.findOneById(id);
    await user.update({ name, gender });
    await user.save();
    return this.userResponse(user);
  }

  async changePassword(id: number, oldPassword: string, newPassword: string) {
    const user = await this.findOneById(id);
    const match = await this.comparePassword(oldPassword, user.password);
    if (!match) {
      throw new ForbiddenException(
        'old password does not match with our record',
      );
    }

    const password = await this.hashPassword(newPassword);
    await user.update({ password });
    await user.save();
  }

  userResponse(user) {
    const { password, ...result } = user['dataValues'];
    return result;
  }

  async hashPassword(password) {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }

  async comparePassword(enteredPassword, dbPassword) {
    const match = await bcrypt.compare(enteredPassword, dbPassword);
    return match;
  }
}

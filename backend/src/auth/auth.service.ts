import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.usersService.findOne({
      where: { username },
      select: {
        id: true,
        username: true,
        password: true,
      },
    });

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword && !user) {
      return null;
    }

    return user;
  }

  async signIn(id: number): Promise<{ access_token: string }> {
    return {
      access_token: await this.jwtService.signAsync({ sub: id }),
    };
  }
}

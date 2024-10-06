import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { PrismaService } from '../prisma/prisma.service';
import { hash } from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,

    private readonly jwt: JwtService,
  ) {}
  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  public login(loginBody: LoginDto) {}

  public async register(body: RegisterDto) {
    const userData = await this.prisma.user.create({
      data: {
        name: body.name,
        password: await hash(body.password),
      },
    });
    console.log(userData);
    return this.token(userData);
  }

  private async token({ name, id }) {
    return {
      token: await this.jwt.signAsync(
        { name, sub: id },
        // { expiresIn: '15m', privateKey: '' },
      ),
    };
  }
}

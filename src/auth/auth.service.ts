import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { PrismaService } from '../prisma/prisma.service';
import { hash, verify } from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,

    private readonly jwt: JwtService,
  ) {}

  /**
   * 用户登录
   * @param {LoginDto} loginBody
   * @return {Promise<{token: string}>}
   */
  public async login(loginBody: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { name: loginBody.name },
    });

    // 校验密码是否正确
    const isUserFound = verify(user?.password, loginBody.password);
    if (!isUserFound) {
      throw new HttpException('用户名或密码错误', HttpStatus.BAD_REQUEST);
    }

    return this.token(user);
  }

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

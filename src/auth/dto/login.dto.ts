import { IsEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsEmpty({ message: '登录用户名称不能为空' })
  name: string;

  @IsString()
  @IsEmpty({ message: '登录密码不能为空' })
  password: string;
}

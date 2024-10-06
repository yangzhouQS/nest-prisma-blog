import { IsNotEmpty } from 'class-validator';
import { IsExistsRule } from '../../common/rules/is-exists.rule';

export class LoginDto {
  @IsNotEmpty({ message: '登录用户名称不能为空' })
  @IsExistsRule('user', { message: '账号不存在' })
  name: string;

  @IsNotEmpty({ message: '登录密码不能为空' })
  password: string;
}

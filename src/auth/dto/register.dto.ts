import { IsNotEmpty } from 'class-validator';
import { IsNotExistsRule } from '../../common/rules/is-not-exists.rule';
import { isConfirm } from '../../common/rules/is-confirm';

export class RegisterDto {
  @IsNotEmpty({ message: '用户名称不能为空' })
  @IsNotExistsRule(`user`, { message: '用户已存在,禁止注册' })
  name: string;

  @IsNotEmpty({ message: '密码不能为空' })
  @isConfirm({ message: '两次输入的密码不一致' })
  password: string;

  @IsNotEmpty({ message: '确认密码不能为空' })
  passwordConfirm: string;
}

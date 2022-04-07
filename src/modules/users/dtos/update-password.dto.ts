import { IsNotEmpty, MinLength } from 'class-validator';

export class UpdatePasswordDto {
  @IsNotEmpty()
  @MinLength(6)
  readonly old_password: string;

  @IsNotEmpty()
  @MinLength(6)
  readonly new_password: string;
}

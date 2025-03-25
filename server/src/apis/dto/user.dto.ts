import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator'

export enum ProviderType {
  LOCAL = 'local',
  GOOGLE = 'google',
  FACEBOOK = 'facebook'
}

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(3)
  username!: string

  @IsEmail()
  email!: string

  @IsNotEmpty()
  lastname!: string

  @IsNotEmpty()
  firstname!: string

  @IsNotEmpty()
  @MinLength(6)
  password!: string

  @IsOptional()
  photo_url?: string | null

  @IsOptional()
  provider?: ProviderType

  @IsOptional()
  googleId?: string | null
}

export class GoogleAuthDto {
  @IsNotEmpty()
  username!: string

  @IsEmail()
  email!: string

  @IsOptional()
  photo_url?: string | null

  @IsOptional()
  googleId?: string | null

  @IsNotEmpty()
  provider!: ProviderType.GOOGLE
}

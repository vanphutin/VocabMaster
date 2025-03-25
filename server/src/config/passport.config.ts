import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { Request, Response } from 'express'
import dotenv from 'dotenv'
import { CreateUserDto, GoogleAuthDto, ProviderType } from '~/apis/dto/user.dto'
import { AuthService } from '~/apis/services/auth.service'
import { EmailExistsException, UsernameExistsException } from '~/apis/exceptions/custom.exception'
import { UserEntity } from '~/apis/entities/user.entity'
import { generateRandomUsername } from '~/apis/utils/generateRandomUsername.util'

const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development'
dotenv.config({ path: envFile })

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_CALLBACK_URL!
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const userExists = await AuthService.findOneUser('users', { googleId: profile.id })
        const emailUnique = await AuthService.findOneUser('users', { email: profile.emails?.[0].value })

        if (userExists || emailUnique) {
          return done(null, profile)
        }
        if (emailUnique) {
          // Nếu tồn tại email nhưng không có googleId, cập nhật googleId
        }
        const userOAuth: CreateUserDto = {
          firstname: profile.name?.givenName ?? 'Unknown',
          lastname: profile.name?.familyName ?? 'Unknown',
          email: profile.emails?.[0].value ?? '',
          password: '', // Tạo password ngẫu nhiên nếu cần
          username: generateRandomUsername(profile.name?.givenName ?? 'user', profile.name?.familyName ?? 'user'),
          googleId: profile.id,
          photo_url: profile.photos?.[0]?.value ?? '',
          provider: ProviderType.GOOGLE
        }

        const newUser = await AuthService.create(userOAuth)
        return done(null, newUser)
      } catch (error) {
        return done(error)
      }
    }
  )
)

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user: GoogleAuthDto, done) => {
  done(null, user)
})

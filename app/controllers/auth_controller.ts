import Profile from '#models/profile'
import User from '#models/user'
import { loginValidator, registerValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class AuthController {
  async register({ request }: HttpContext) {
    const data = await request.validateUsing(registerValidator)
    const user = await User.create({
      email: data.email,
      password: data.password,
    })

    // save profile
    await Profile.create({
      fullName: data.fullName,
      address: data.address,
      phone: data.phone,
      isAlumni: data.isAlumni,
      graduateYear: data.graduateYear,
      avatarUrl: data.avatarUrl,
      userId: user.id,
    })

    return User.accessTokens.create(user)
  }

  async login({ request }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)
    const user = await User.verifyCredentials(email, password)

    return User.accessTokens.create(user)
  }

  async logout({ auth }: HttpContext) {
    const user = await auth.user!
    await User.accessTokens.delete(user, user.currentAccessToken.identifier)
    return { message: 'success' }
  }

  async me({ auth }: HttpContext) {
    await auth.check()

    const profile = await db
      .from('users')
      .select(
        'users.id',
        'users.email',
        'profiles.full_name',
        'profiles.address',
        'profiles.phone',
        'profiles.is_alumni',
        'profiles.avatar_url',
        'profiles.graduate_year'
      )
      .join('profiles', 'users.id', '=', 'profiles.user_id')
      .where('profiles.user_id', auth.user?.id ?? 0)
      .firstOrFail()

    return profile
  }
}

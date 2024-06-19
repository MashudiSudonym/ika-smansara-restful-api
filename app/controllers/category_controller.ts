import Category from '#models/category'
import { categoryValidator } from '#validators/category'
import type { HttpContext } from '@adonisjs/core/http'

export default class CategoryController {
  async index({ auth }: HttpContext) {
    await auth.check()
    return await Category.all()
  }

  async store({ auth, request }: HttpContext) {
    await auth.check()

    const data = await request.validateUsing(categoryValidator)

    return await Category.create(data)
  }
}

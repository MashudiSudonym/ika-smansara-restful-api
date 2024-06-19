import vine from '@vinejs/vine'

const password = vine.string().minLength(8)

export const registerValidator = vine.compile(
  vine.object({
    email: vine
      .string()
      .email()
      .normalizeEmail()
      .unique(async (db, value) => {
        const match = await db.from('users').select('id').where('email', value).first()
        return !match
      }),
    password,
    fullName: vine.string().trim(),
    address: vine.string().trim(),
    phone: vine.string().trim().minLength(9).maxLength(14),
    isAlumni: vine.boolean(),
    graduateYear: vine.string().optional().requiredWhen('isAlumni', '=', 'true'),
    avatarUrl: vine.string().trim().optional(),
  })
)

export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().email().normalizeEmail(),
    password,
  })
)

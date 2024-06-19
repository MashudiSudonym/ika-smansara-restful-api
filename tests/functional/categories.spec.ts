import User from '#models/user'
import { group, test } from '#tests/db'

group('Categories', () => {
  test('can get list of category', async ({ client }) => {
    await client.post('/api/v1/auth/register').json({
      email: 'test@test.test',
      password: '123123123',
      fullName: 'test123',
    })

    const user = await User.verifyCredentials('test@test.test', '123123123')

    const response = await client.get('api/v1/categories').loginAs(user)

    return response.assertStatus(200)
  })
})

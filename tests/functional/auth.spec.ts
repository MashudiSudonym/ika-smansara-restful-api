import User from '#models/user'
import { group, test } from '#tests/db'

group('Auth', () => {
  test('can register', async ({ client }) => {
    const response = await client.post('/api/v1/auth/register').json({
      email: 'test@test.test',
      password: '123123123',
      fullName: 'test123',
    })

    return response.assertStatus(200)
  })

  test('can register user already exist', async ({ client }) => {
    await client.post('/api/v1/auth/register').json({
      email: 'test@test.test',
      password: '123123123',
      fullName: 'test123',
    })

    const response = await client.post('/api/v1/auth/register').json({
      email: 'test@test.test',
      password: '123123123',
      fullName: 'test123',
    })

    return response.assertStatus(422)
  })

  test('failed register wrong minimum password', async ({ client }) => {
    const response = await client.post('/api/v1/auth/register').json({
      email: 'test@test.test',
      password: '123',
      fullName: 'test123',
    })

    return response.assertStatus(422)
  })

  test('failed register wrong email format', async ({ client }) => {
    const response = await client.post('/api/v1/auth/register').json({
      email: 'test',
      password: '123123123',
      fullName: 'test123',
    })

    return response.assertStatus(422)
  })

  test('failed login wrong minimum password', async ({ client }) => {
    await client.post('/api/v1/auth/register').json({
      email: 'test@test.test',
      password: '123123123',
      fullName: 'test123',
    })

    const response = await client.post('/api/v1/auth/login').json({
      email: 'test@test.test',
      password: '123',
    })

    return response.assertStatus(422)
  })

  test('failed login wrong email format', async ({ client }) => {
    await client.post('/api/v1/auth/register').json({
      email: 'test@test.test',
      password: '123123123',
      fullName: 'test123',
    })

    const response = await client.post('/api/v1/auth/login').json({
      email: 'test',
      password: '123123123',
    })

    return response.assertStatus(422)
  })

  test('can login', async ({ client }) => {
    await client.post('/api/v1/auth/register').json({
      email: 'test@test.test',
      password: '123123123',
      fullName: 'test123',
    })

    const response = await client.post('/api/v1/auth/login').json({
      email: 'test@test.test',
      password: '123123123',
    })

    return response.assertStatus(200)
  })

  test('can logout', async ({ client }) => {
    await client.post('/api/v1/auth/register').json({
      email: 'test@test.test',
      password: '123123123',
      fullName: 'test123',
    })

    const user = await User.verifyCredentials('test@test.test', '123123123')
    const response = await client.delete('/api/v1/auth/logout').loginAs(user)

    return response.assertStatus(200)
  })

  test('can show profile', async ({ client }) => {
    await client.post('/api/v1/auth/register').json({
      email: 'test@test.test',
      password: '123123123',
      fullName: 'test123',
    })

    const user = await User.verifyCredentials('test@test.test', '123123123')
    const response = await client.get('/api/v1/auth/me').loginAs(user)

    return response.assertStatus(200)
  })
})

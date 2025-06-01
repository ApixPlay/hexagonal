import { test } from '@japa/runner'
import { InMemoryUserRepository } from '#user_management/infrastructure/repositories/in_memory_user.repository'
import { RegisterNewUserUseCase } from '#user_management/application/use_cases/register_new_user.usecase'
import { AuthService } from '#user_management/application/services/auth.service'
import { PasswordHashingAdapter } from '#user_management/infrastructure/adapters/password_hashing.adapter'
import { Email } from '#user_management/domain/email'
import { PlainPassword } from '#user_management/domain/plain_password'

test.group('Register user UseCase', () => {
  test('should register a new user', async ({ assert }) => {
    const userRepository = new InMemoryUserRepository()

    const authService = new AuthService(userRepository, new PasswordHashingAdapter())

    const registerUser = new RegisterNewUserUseCase(authService)
    await registerUser.execute({
      firstName: 'John',
      lastName: 'Doe',
      email: Email.fromString('test@test.fr'),
      password: PlainPassword.fromString('1234'),
    })

    const user = await userRepository.findByEmail(Email.fromString('test@test.fr'))

    assert.isNotNull(user)
    assert.equal(user?.props.firstName, 'John')
  })
})

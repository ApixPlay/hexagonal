import { HttpContext } from '@adonisjs/core/http'
import { RegisterRequestDTO } from '#user_management/application/dtos/register_request.dto'
import { AlreadyRegisteredException } from '#user_management/application/exceptions/already_registered.exception'
import vine from '@vinejs/vine'
import { Email } from '#user_management/domain/email'
import { PlainPassword } from '#user_management/domain/plain_password'
import { inject } from '@adonisjs/core'
import { RegisterNewUserUseCase } from '#user_management/application/use_cases/register_new_user.usecase'

@inject()
export default class RegisterNewUserController {
  constructor(private useCase: RegisterNewUserUseCase) {}

  static validator = vine.compile(
    vine.object({
      email: vine.string().email(),
      firstName: vine.string(),
      lastName: vine.string().nullable(),
      password: vine.string(),
    })
  )

  async execute({ request, response }: HttpContext) {
    const payload = await request.validateUsing(RegisterNewUserController.validator)

    const dto = new RegisterRequestDTO(
      Email.fromString(payload.email),
      payload.firstName,
      payload.lastName,
      PlainPassword.fromString(payload.password)
    )

    try {
      await this.useCase.execute(dto)
    } catch (error) {
      if (error instanceof AlreadyRegisteredException) {
        //session.flash('error', error.serialize())

        //response.redirect().back()

        response.conflict(error.serialize())
      }
    }
  }
}

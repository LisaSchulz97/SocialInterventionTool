import { number, string } from 'yup'

export const errorMessages = {
  required: 'Bitte Pflichtfeld ausfüllen',
  numb: 'Bitte eine gültige Nummer eingeben',
  phone: 'Bitte eine gültige Telefonnummer eingeben',
  email: 'Bitte eine gültige E-Mail-Adresse eingeben',
  confirmPassword: 'Das Passwort stimmt nicht überein',
  empty: 'Kann nicht leer sein',
  lessthanchars: 'Das Passwort muss mindestens 8 Zeichen haben',
}

export const formValidator = {
  phonenumber: number().min(11, errorMessages.phone).required(errorMessages.phone),
  number: number().min(1, errorMessages.numb).required(errorMessages.numb),
  numberOptional: number(),
  string: string()
    .trim()
    .min(1, errorMessages?.required)
    .required(errorMessages?.required),
  stringOptional: string()
    .trim()
    .min(1, errorMessages?.empty),

  email: string()
    .email(errorMessages?.email)
    .required(errorMessages?.required),

  passowrd: string()
    .min(8, errorMessages?.lessthanchars)
    .required(errorMessages?.required),
  passwordConfirmation: string().test('string', errorMessages?.confirmPassword, function (value) {
    return this.parent.password === value
  }),
}

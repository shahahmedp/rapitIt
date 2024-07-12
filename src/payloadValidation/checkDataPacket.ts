import { body, check } from 'express-validator';

export const registerCheck = [
  check('username', 'Name length should be 10 to 20 characters').isLength({
    min: 10,
    max: 20,
  }),
  body('email', 'invalid email').isEmail().isLength({ min: 10, max: 30 }),
  check(
    'password',
    'Please enter a password at least 8 character and contain At least one uppercase.At least one lower case.At least one special character. ',
  )
    .isLength({ min: 8 })
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/),
];
export const signInCheck = [
  body('email', 'invalid email').isEmail().isLength({ min: 10, max: 30 }),
  check('password', 'Password length should be 8 to 10 characters').isLength({
    min: 8,
  }),
];

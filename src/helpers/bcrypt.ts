import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);

export const hasher = (password: string): string => {
  return bcrypt.hashSync(password, salt);
};

export const passValidator = (password: string, hashedPass: string): boolean => {
  return bcrypt.compareSync(password, hashedPass);
};

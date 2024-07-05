import bcrypt from 'bcrypt';

async function hashPassword(password: string): Promise<string> {
  const saltRound = Number(process.env.DEV_BCRYPT_SALT_ROUND)
  return new Promise((resolve, reject) => {
    try {
      const hashedPassword = bcrypt.hash(password, saltRound);
      resolve(hashedPassword);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
}

async function comparePassword(password: string, passwordHash: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    try {
      const result = bcrypt.compare(password, passwordHash);
      resolve(result); 
    } catch (error) {
      console.error(error);
      reject(error);
    }
  })
}

export {
    hashPassword,
    comparePassword
}

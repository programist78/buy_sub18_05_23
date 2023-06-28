import pick from 'lodash';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config()
export const issueAuthToken = (id, email) => {
    let token = jwt.sign(
      {
        id: id,
        email: email
      },
      process.env.SECRET_KEY,
      {
        expiresIn: '30d'
      }
    );
    return `Bearer ${token}`;
  };
  


  export const verifyAuthToken = (token) => {
    try {
      // Удаление префикса "Bearer" (если присутствует)
      const tokenWithoutBearer = token.replace('Bearer ', '');
      const decoded = jwt.verify(tokenWithoutBearer, process.env.SECRET_KEY);
      return decoded;
    } catch (error) {
      // Обработка ошибки раскодирования токена
      console.error('Ошибка раскодирования токена:', error);
      return null;
    }
  };

export const serializeUser = user => pick(user, [
    'id',
    'email',
    'fullname'
]);
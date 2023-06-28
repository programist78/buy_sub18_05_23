export default function validatePassword(password) {
  // Проверка длины пароля
  if (password.length !== 8) {
    return false;
  }
  // Проверка наличия хотя бы одной цифры
  if (!/\d/.test(password)) {
    return false;
  }

  // Проверка наличия только букв и цифр
  if (!/^[a-zA-Z0-9]+$/.test(password)) {
    return false;
  }

  return true;
}

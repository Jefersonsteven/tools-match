export default function generatePassword() {
  const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let password = "";

  for (let i = 0; i < 8; i++) {
    const index = Math.floor(Math.random() * characters.length);
    password += characters[index];
  }

  return password;
}

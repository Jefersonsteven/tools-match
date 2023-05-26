import prisma from "../../../prisma/client";

export default async function findUser(email) {
  if (Array.isArray(email)) {
    for (let i = 0; i < email.length; i++) {
      const user = await findUserDb(email[i]);
      if (!user) {
        throw new Error("El usuario no existe");
      }
    }
  } else {
    const user = await findUserDb(email);
    if (!user) {
      throw new Error("El usuario no existe");
    }
  }
}

async function findUserDb(email) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return user;
}

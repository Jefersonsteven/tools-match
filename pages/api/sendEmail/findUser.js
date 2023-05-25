import prisma from "../../../prisma/client";

export default async function findUser(email) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    }
  });
  return user;
}

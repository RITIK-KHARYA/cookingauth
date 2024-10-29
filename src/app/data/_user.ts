import db from "@/lib/prisma";
import { VerifySession } from "@/lib/session";
import { cache } from "react";

export const getUser = cache(async () => {
  const session = await VerifySession();
  console.log(session.userId);

  if (!session.userId) {
    return null;
  }

  const data = await db.user.findUnique({
    where: {
      userId: session.userId,
    },
  });

  return data;
});

function filteredcontent(userDTO: any) {
  return filteredcontent;
}

function userDTO(user: any) {
  return {
    name: user.name,
    email: user.email,
  };
}

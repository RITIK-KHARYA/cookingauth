"use server";

import { getUser } from "../data/_user";
import { SigninSchema } from "@/lib/Validation";
import db from "@/lib/prisma";
import { createSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function Signin(state: any, formData: FormData) {
  const validatedResult = SigninSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!validatedResult.success) {
    console.log(validatedResult.error.flatten().fieldErrors);
    return {
      errors: "invalied email or password",
    };
  }

  const { email, password } = validatedResult.data;

  const data = await db.user.findUnique({
    where: { email },
  });

  if (!data) {
    return { errors: "invalied email" };
  }
  const isValidated = await Bun.password.verify(password, data.password);
  if (!isValidated) {
    return { errors: "wrong password" };
  }

  await createSession(data.userId);
  redirect("/dashboard");
}
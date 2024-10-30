"use server";

import { SignupSchema } from "@/lib/Validation";
import db from "@/lib/prisma";
import { createSession } from "@/lib/session";


export async function Signup(state: any, formData: FormData) {
  const validatedResult = SignupSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!validatedResult.success) {
    console.log(validatedResult.error.flatten().fieldErrors);
    return {
      errors: validatedResult.error.flatten().fieldErrors,
    };
  }
  const { name, email, password } = validatedResult.data;
  const hashedPassword = await Bun.password.hash(password);
  const data = await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
  await createSession(data.userId);
}
"use server";

import { getUser } from "../data/_user";
import { SigninSchema } from "@/lib/Validation";
import db from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function Signin(state: any, formData: FormData) {
  const user = getUser();
  const validatedResult = SigninSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!validatedResult.success) {
    console.log(validatedResult.error.flatten().fieldErrors);
    return {
      errors: validatedResult.error.flatten().fieldErrors,
    };
  }

  if (!user) {
    console.log("user not found");
    redirect("/sign-up");
  }
  redirect("/dashboard");
}

// import { SigninSchema } from "@/lib/Validation";
// import db from "@/lib/prisma";
// import { redirect } from "next/dist/server/api-utils";
// import { root } from "postcss";

// export default async function Signin(state: any, formData: FormData) {
//   const validateResult = SigninSchema.safeParse({
//     email: formData.get("email"),
//     password: formData.get("password"),
//   });
//   if (!validateResult.success) {
//     console.log("pussy error");
//     return { errors: validateResult.error.flatten().fieldErrors };
//   }
//   const { email, password } = validateResult.data;
//   const data = await db.user.findUnique({
//     where: {
//       password: password,
//       email: email,
//     },
//   });
//   if (!data) {
//     return { errors: "invalied email or password" };
//   }
// }

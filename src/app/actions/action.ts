// "use server";

// import { loginSchema } from "@/lib/Validation";
// import { error } from "console";

// type FormData = {
//   email: string;
//   password: string;
// };
// export const login = async (data: FormData) => {
//   const validated = loginSchema.safeParse(data);
//   if (!validated.success) {
//     return validated.error.flatten().fieldErrors;
//   }
// };

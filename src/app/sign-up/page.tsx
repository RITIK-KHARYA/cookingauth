"use client";

import { Signup } from "./action";
import { Input } from "@/components/ui/input";
import { useActionState } from "react";

export default function Signupform() {
  const [state, action, pending] = useActionState(Signup, null);
  console.log(state?.errors);
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <form action={action}>
        <div className="flex flex-col items-center justify-center gap-y-2 ">
          <Input
            type="text"
            className="w-full h-10 "
            placeholder="name"
            name="name"
          />
          {state?.errors?.name && (
            <p className="text-red-400">{state?.errors?.name[0]}</p>
          )}
          <Input
            type="text"
            className="w-full h-10 text-white "
            placeholder="email"
            name="email"
          />
          {state?.errors?.email && (
            <p className="text-red-400">{state?.errors?.email[0]}</p>
          )}
          <Input
            type="password"
            name="password"
            className="w-full h-10  "
            placeholder="password"
          />
          {state?.errors?.password && (
            <p className="text-red-400">{state?.errors?.password[0]}</p>
          )}
          <button
            className="text-white bg-red-400/90 rounded-lg h-10 w-24 hover:opacity-90 "
            type="submit"
            disabled={pending}
          >
            {pending ? "loading..." : "Sign Up"}
          </button>
        </div>
      </form>
    </div>
  );
}

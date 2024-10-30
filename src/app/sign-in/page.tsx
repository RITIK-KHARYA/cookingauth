"use client";

import Signin from "./action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useActionState } from "react";

export default function SigninForm() {
  const [state, action, pending] = useActionState(Signin, null);
  console.log(state?.errors);
  return (
    <div className="flex items-center justify-center w-screen h-screen text-white">
      <form action={action}>
        <Input type="text" name="email" className="" placeholder="email" />
        <Input
          type="password"
          name="password"
          className=""
          placeholder="password"
        />

        {state?.errors && (
          <p className="text-red-400">{state?.errors}</p>
        )}
        <Button type="submit">{pending ? "Signing in..." : "Sign in"}</Button>
      </form>
    </div>
  );
}

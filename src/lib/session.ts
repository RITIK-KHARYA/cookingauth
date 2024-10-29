import "server-only";
import { JWTPayload, JWTVerifyResult, SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface Payload extends JWTPayload {
  userId: string;
  expires: Date;
}

const key = new TextEncoder().encode(process.env.SECRET);

const cookie = {
  name: "session",
  options: {
    httpOnly: true,
    secure: true,
    sameSite: "lax" as const, //used in ease condition of reuseablity work only at get request
    path: "/",
  },
  duration: 24 * 60 * 60 * 1000,
};

export async function encrypt(payload: Payload) {
  console.log(payload);
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1day")
    .sign(key);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, key, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log(error);
  }
}
//create session
export async function createSession(userId: string) {
  const expires = new Date(Date.now() + cookie.duration);
  const session = await encrypt({ userId, expires });

  console.log("session", session);
  console.log(session);

  (await cookies()).set(cookie.name, session, { ...cookie.options, expires });
  redirect("/dashboard");
}

//now verify the session
export async function VerifySession() {
  const cookie = (await cookies()).get("session")?.value;
  console.log("heheh", cookie);
  const session = await decrypt(cookie);
  console.log("hehehe", session);
  if (!session?.userId) {
    redirect("/sign-up");
  }
  return { userId: session.userId as string };
}
//delete session

export async function DeleleSession() {
  (await cookies()).delete(cookie.name);
  redirect("/sign-up");
}

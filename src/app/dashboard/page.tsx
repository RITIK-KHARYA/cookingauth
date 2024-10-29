import { getUser } from "../data/_user";

export default async function dashboard() {
  const user = await getUser();
  if (!user) return null;
  return (
    <div className="text-white flex items-center w-full h-full justify-center">
      {user?.name}
    </div>
  );
}

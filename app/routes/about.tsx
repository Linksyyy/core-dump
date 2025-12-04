import { useUserSession } from "~/globalContext";

export default function About() {
  const user = useUserSession();
  return (
    <div className="overflow-y-auto w-full px-50 text-justify">
      About
      <button className="h-5 w-10 bg-black" onClick={() => console.log(user.username)}></button>
    </div>
  );
}

import { CiEdit } from "react-icons/ci";
import { Link } from "react-router";

export default function CreateArticle() {
  return (
    <Link to="/create">
      <div className="group flex justify-center items-center rounded-full size-15 bg-acid text-void bottom-2 absolute right-5 border border-acid hover:border-2 hover:bg-acid/80 hover:border-dashed cursor-pointer">
        <CiEdit className="size-8" />
      </div>
    </Link>
  );
}

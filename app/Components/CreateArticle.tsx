import { CiEdit } from "react-icons/ci";
import { Link } from "react-router";

export default function CreateArticle() {
  return (
    <Link to="/create">
      <div className="group flex justify-center items-center rounded-full size-15 bg-neutral-500 bottom-2 absolute right-5 border border-neutral-600 hover:border-2 hover:bg-neutral-400 hover:border-dashed cursor-pointer">
        <CiEdit className="size-8 group-hover:text-white" />
      </div>
    </Link>
  );
}

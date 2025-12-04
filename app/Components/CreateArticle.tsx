import { CiEdit } from "react-icons/ci";

export default function CreateArticle() {
  return (
    <div className="group flex justify-center items-center rounded-full size-15 bg-neutral-500 bottom-2 absolute right-5 border border-neutral-800 hover:border-2 hover:bg-neutral-400 cursor-pointer">
      <CiEdit className="size-8 group-hover:text-white" />
    </div>
  );
}

import Link from "next/link";
import { PostType } from "../types/PostType";

type Props = {
  post: PostType;
};
export const Post = (props: Props): JSX.Element => {
  const { post } = props;

  return (
    <div>
      <span>{post.id}</span>
      {" : "}
      <Link href={`/posts/${post.id}`} passHref>
        <span className="cursor-pointer text-white border-b border-gray-500 hover:bg-gray-600">
          {post.title}
        </span>
      </Link>
    </div>
  );
};

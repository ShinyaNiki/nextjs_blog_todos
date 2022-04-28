import { Layout } from "../components/Layout";
import Link from "next/link";
import { getAllPostData } from "../lib/posts";
import { GetStaticProps, GetStaticPropsResult } from "next/types";
import { PostType } from "../types/PostType";
import { Post } from "../components/Post";

type Props = {
  posts: Array<PostType>;
};

const BlogPage = (props: Props): JSX.Element => {
  const { posts } = props;
  return (
    <Layout title="Blog page">
      <ul>
        {posts &&
          posts.map((post: PostType) => <Post key={post.id} post={post} />)}
      </ul>
      <Link href="/main-page" passHref>
        <div className="flex cursor-pointer mt-12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
            />
          </svg>
          <span>Back to main page</span>
        </div>
      </Link>
    </Layout>
  );
};

export default BlogPage;

export const getStaticProps: GetStaticProps = async (): Promise<
  GetStaticPropsResult<Props>
> => {
  const posts: Array<PostType> = await getAllPostData();
  return {
    props: { posts },
    revalidate: 3,
  };
};

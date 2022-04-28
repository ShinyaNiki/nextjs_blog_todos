import Link from "next/link";
import { NextRouter, useRouter } from "next/router";
import { GetStaticPathsResult, GetStaticPropsResult } from "next/types";
import { Layout } from "../../components/Layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import { PostIdType } from "../../types/PostIdType";
import { PostType } from "../../types/PostType";

type Props = {
  post: PostType;
};

export const Post = (props: Props): JSX.Element => {
  const router: NextRouter = useRouter();
  const { post } = props;

  if (router.isFallback || !post) {
    return <div>Loading...</div>;
  }

  return (
    <Layout title={post.title}>
      <p className="m-4">{`ID : ${post.id}`}</p>
      <p className="mb-4 text-xl font-bold">{post.title}</p>
      <p className="mb-12">{post.created_at}</p>
      <p className="px-10">{post.content}</p>
      <Link href="/blog-page" passHref>
        <div className="flex cursor-pointer mt-12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-3"
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
          <span>Back to blog-page</span>
        </div>
      </Link>
    </Layout>
  );
};

export const getStaticPaths = async (): Promise<
  GetStaticPathsResult<PostIdType>
> => {
  const postIds: Array<PostIdType> = await getAllPostIds();
  const paths = postIds.map((post: PostIdType) => {
    return {
      params: post,
    };
  });

  return {
    paths: paths,
    fallback: true,
  };
};

export const getStaticProps = async ({
  params,
}: {
  params: { id: string };
}): Promise<GetStaticPropsResult<Props>> => {
  const post: PostType = await getPostData(params!.id);

  return {
    props: {
      post: post,
    },
    revalidate: 30,
  };
};

export default Post;

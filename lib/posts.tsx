import axios, { AxiosResponse } from "axios";
import { PostType } from "../types/PostType";
import { PostIdType } from "../types/PostIdType";

export const getAllPostData = async () => {
  const posts: Array<PostType> = await axios
    .get<Array<PostType>>(
      `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-post/`
    )
    .then((res: AxiosResponse) => {
      const { data, status } = res;
      return data;
    })
    .catch((e) => {
      console.log(e.message);
    });

  return posts.sort((a: PostType, b: PostType) => {
    return new Date(a.created_at) < new Date(b.created_at) ? 1 : -1;
  });
};

export const getAllPostIds = async (): Promise<Array<PostIdType>> => {
  const posts: Array<PostType> = await axios
    .get<Array<PostType>>(
      `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-post/`
    )
    .then((res: AxiosResponse) => {
      const { data, status } = res;
      return data;
    })
    .catch((e) => {
      console.log(e.message);
    });

  return posts.map((post: PostType) => {
    return {
      id: String(post.id),
    };
  });
};

export const getPostData = async (id: string): Promise<PostType> => {
  return await axios
    .get<PostType>(
      `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/detail-post/${id}/`
    )
    .then((res: AxiosResponse) => {
      const { data, status } = res;
      return data;
    })
    .catch((e) => {
      console.log(e.message);
    });
};

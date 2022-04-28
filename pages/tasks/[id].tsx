import Link from "next/link";
import { useEffect } from "react";
import { Layout } from "../../components/Layout";
import { useRouter } from "next/router";
import useSWR from "swr";
import { getAllTaskIds, getTaskData } from "../../lib/tasks";
import { GetStaticPathsResult, GetStaticPropsResult } from "next/types";
import { TaskType } from "../../types/TaskType";
import { TaskIdType } from "../../types/TaskIdType";
import axios, { AxiosResponse } from "axios";

type Props = {
  id: string;
  task: TaskType;
};

const fetcher = (url: string) => {
  return axios.get(url).then((res: AxiosResponse<any>) => {
    return res.data;
  });
};

export const Post = (props: Props) => {
  const router = useRouter();
  const { id, task } = props;
  const { data: fetchTasks, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/detail-task/${id}`,
    fetcher,
    {
      fallbackData: task,
    }
  );

  useEffect(() => {
    mutate();
  }, []);

  if (router.isFallback || !task) {
    return <div>Loading...</div>;
  }

  return (
    <Layout title={task.title}>
      <span className="mb-4">
        {"id : "}
        {task.id}
      </span>
      <p className="mb-4 text-xl font-bold">{task.title}</p>
      <p className="mb-12">{task.created_at}</p>
      <Link href="/task-page" passHref>
        <div className="flex cursor-pointer mt-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
            />
          </svg>
          <span>Back to task-page</span>
        </div>
      </Link>
    </Layout>
  );
};

export const getStaticPaths = async (): Promise<
  GetStaticPathsResult<TaskIdType>
> => {
  const taskIds: Array<TaskIdType> = await getAllTaskIds();
  const paths = taskIds.map((task: TaskIdType) => {
    return {
      params: task,
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
  const task: TaskType = await getTaskData(params!.id);

  return {
    props: {
      id: task.id,
      task: task,
    },
    revalidate: 3,
  };
};

export default Post;

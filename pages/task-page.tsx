import { Layout } from "../components/Layout";
import { Task } from "../components/Task";
import Link from "next/link";
import { GetStaticProps, GetStaticPropsResult } from "next/types";
import { TaskType } from "../types/TaskType";
import { getAllTaskData } from "../lib/tasks";
import useSWR from "swr";
import axios, { AxiosResponse } from "axios";
import { useEffect } from "react";
import { StateContextProvider } from "../context/StateContext";
import { TaskForm } from "../components/TaskForm";

const fetcher = (url: string) => {
  return axios.get(url).then((res: AxiosResponse<any>) => {
    return res.data;
  });
};
const apiUrl = `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-task/`;

type Props = {
  tasks: Array<TaskType>;
};

const TaskPage = (props: Props): JSX.Element => {
  const { tasks } = props;

  const { data: fetchTasks, mutate } = useSWR(apiUrl, fetcher, {
    fallbackData: tasks,
  });

  const filteredTasks = fetchTasks?.sort((a: TaskType, b: TaskType) => {
    return new Date(a.created_at) < new Date(b.created_at) ? 1 : -1;
  });

  useEffect(() => {
    mutate();
  }, []);

  return (
    <StateContextProvider>
      <Layout title="Task page">
        <TaskForm taskCreated={mutate} />
        <ul>
          {filteredTasks &&
            filteredTasks.map((task: TaskType) => (
              <Task key={task.id} task={task} taskDeleted={mutate} />
            ))}
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
    </StateContextProvider>
  );
};

export const getStaticProps: GetStaticProps = async (): Promise<
  GetStaticPropsResult<Props>
> => {
  const tasks: Array<TaskType> = await getAllTaskData();
  return {
    props: { tasks },
    revalidate: 3,
  };
};

export default TaskPage;

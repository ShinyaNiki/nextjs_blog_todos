import { TaskType } from "../types/TaskType";
import axios, { AxiosResponse } from "axios";
import { TaskIdType } from "../types/TaskIdType";
import { PostType } from "../types/PostType";

export const getAllTaskData = async (): Promise<Array<TaskType>> => {
  const tasks: Array<TaskType> = await axios
    .get<Array<TaskType>>(
      `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-task/`
    )
    .then((res: AxiosResponse) => {
      const { data, status } = res;
      return data;
    })
    .catch((e) => {
      console.log(e.message);
    });

  return tasks.sort((a: TaskType, b: TaskType) => {
    return new Date(a.created_at) < new Date(b.created_at) ? 1 : -1;
  });
};

export const getAllTaskIds = async (): Promise<Array<TaskIdType>> => {
  const tasks: Array<TaskType> = await axios
    .get<Array<TaskIdType>>(
      `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-task/`
    )
    .then((res: AxiosResponse) => {
      const { data, status } = res;
      return data;
    })
    .catch((e) => {
      console.log(e.message);
    });

  return tasks.map((task: TaskType) => {
    return {
      id: String(task.id),
    };
  });
};

export const getTaskData = async (id: string): Promise<TaskType> => {
  return await axios
    .get<TaskType>(
      `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/detail-task/${id}/`
    )
    .then((res: AxiosResponse) => {
      const { data, status } = res;
      return data;
    })
    .catch((e) => {
      console.log(e.message);
    });
};

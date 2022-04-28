import React, { useContext } from "react";
import { StateContext } from "../context/StateContext";
import Cookies from "universal-cookie";
import axios, { AxiosResponse } from "axios";

const cookie: Cookies = new Cookies();

type Props = {
  taskCreated: any;
};

export const TaskForm = (props: Props): JSX.Element => {
  const { taskCreated } = props;
  const { selectedTask, setSelectedTask } = useContext(StateContext)!;
  const create = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    await axios
      .post(
        `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/tasks/`,
        {
          title: selectedTask.title,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${cookie.get("access_token")}`,
          },
        }
      )
      .then((res: AxiosResponse) => {
        if (res.status === 401) {
          alert("JWT Token not valid");
        }
      })
      .catch((e) => {
        console.log(e.message);
      });
    setSelectedTask({ id: 0, title: "" });
    taskCreated();
  };

  const update = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    await axios
      .put(
        `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/tasks/${selectedTask.id}/`,
        {
          title: selectedTask.title,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${cookie.get("access_token")}`,
          },
        }
      )
      .then((res: AxiosResponse) => {
        if (res.status === 401) {
          alert("JWT Token not valid");
        }
      })
      .catch((e) => {
        console.log(e.message);
      });
    setSelectedTask({ id: 0, title: "" });
    taskCreated();
  };

  return (
    <div>
      <form onSubmit={selectedTask.id !== 0 ? update : create}>
        <input
          className="text-black mb-8 px-2 y-1"
          type="text"
          value={selectedTask.title}
          onChange={(e) => {
            setSelectedTask({ ...selectedTask, title: e.target.value });
          }}
        />
        <button
          type="submit"
          className="bg-gray-500 ml-2 hover:bg-gray-600 text-sm px-2 py-1 rounted uppercase"
        >
          {selectedTask.id !== 0 ? "update" : "create"}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;

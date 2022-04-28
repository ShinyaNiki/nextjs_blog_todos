import { LockClosedIcon } from "@heroicons/react/solid";
import React, { useCallback, useState } from "react";
import { NextRouter, useRouter } from "next/router";
import Cookies from "universal-cookie";
import axios, { AxiosError, AxiosResponse } from "axios";
import Image from "next/image";

type JWT = {
  refresh: string;
  access: string;
};

type User = {
  id: number;
  username: string;
};

const cookie: Cookies = new Cookies();

export const Auth = (): JSX.Element => {
  const router: NextRouter = useRouter();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLogin, setIsLogin] = useState<boolean>(true);

  const login = async (): Promise<void> => {
    await axios
      .post(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/auth/jwt/create/`, {
        username: username,
        password: password,
      })
      .then((res: AxiosResponse<JWT>) => {
        const { data, status } = res;
        if (status == 400) {
          throw "auth failed";
        } else if (res.status == 200) {
          const options = { path: "/" };
          cookie.set("access_token", data.access, options);
          return data.access;
        }
      })
      .catch((e: AxiosError<{ error: string }>) => {
        alert(e.message);
      });

    await router.push("/main-page");
  };

  const authUser = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (isLogin) {
      await login();
    } else {
      console.log(username);
      console.log(password);
      await axios
        .post(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/register/`, {
          username: username,
          password: password,
        })
        .then((res: AxiosResponse<User>) => {
          const { data, status } = res;
          if (status == 400) {
            throw "auth failed";
          }
        })
        .catch((e: AxiosError<{ error: string }>) => {
          alert(e.message);
        });

      await login();
    }
  };

  const onChangeUsername = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setUsername(event.target.value);
    },
    [setUsername]
  );

  const onChangePassword = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value);
    },
    [setPassword]
  );

  const onClickChangeMode = useCallback(() => {
    setIsLogin(!isLogin);
  }, [isLogin]);

  return (
    <div className="max-w-md w-full space-y-8">
      <div>
        {/* eslint-dsable-next-line @next/next/no-img-element */}
        <Image
          className="mx-auto h-12 w-auto"
          src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
          alt="Workflow"
          width="600"
          height="600"
        />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white-900">
          {isLogin ? "Login" : "Sign up"}
        </h2>
      </div>
      <form className="mt-8 space-y-6" onSubmit={authUser}>
        <input type="hidden" name="remember" defaultValue="true" />
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <input
              name="username"
              type="text"
              autoComplete="username"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Username"
              value={username}
              onChange={onChangeUsername}
            />
          </div>
          <div>
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password"
              onChange={onChangePassword}
            />
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="text-sm">
            <span
              onClick={onClickChangeMode}
              className="font-medium text-white-600 hover:text-indigo-500 cursor-pointer"
            >
              change mode?
            </span>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <LockClosedIcon
                className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                aria-hidden="true"
              />
            </span>
            {isLogin ? "Login with JWT" : "Create new user"}
          </button>
        </div>
      </form>
    </div>
  );
};

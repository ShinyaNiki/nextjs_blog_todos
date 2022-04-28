import Cookies from "universal-cookie";
import { NextRouter, useRouter } from "next/router";
import React from "react";
import { Layout } from "../components/Layout";
import Link from "next/link";

const cookie: Cookies = new Cookies();

const MainPage = (): JSX.Element => {
  const router: NextRouter = useRouter();

  const logout = (event: React.MouseEvent<SVGSVGElement>): void => {
    cookie.remove("access_token");
    router.push("/");
  };

  return (
    <Layout title="Main Page">
      <div className="mb-10">
        <Link href="/blog-page">
          <a className="bg-indigo-500 mr-8 hover:bg-indigo-600 text-white px-4 py-12 rounded">
            Visit Blog by SSG + ISR
          </a>
        </Link>
        <Link href="/task-page">
          <a className="bg-indigo-500 mr-8 hover:bg-indigo-600 text-white px-4 py-12 rounded">
            Visit Task by ISR + CSR
          </a>
        </Link>
      </div>
      <svg
        onClick={logout}
        xmlns="http://www.w3.org/2000/svg"
        className="mt-10 cusor-pointer h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
        />
      </svg>
    </Layout>
  );
};

export default MainPage;
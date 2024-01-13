import { Icon } from "@iconify-icon/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import ThemeToggleBtn from "../../components/ThemeToggleBtn";
import fs from "fs";
import matter from "gray-matter";
import { useState } from "react";
import path from "path";

export async function getStaticProps() {
  try {
    const files = fs
      .readdirSync(path.join(process.cwd(), "public", `posts`))
      .filter((fileName) => !fileName.includes(".gitkeep"));

    if (!files.length) {
      return {
        props: {
          posts: [],
        },
      };
    }

    const posts = files.map((fileName) => {
      const slug = fileName.replace(".md", "");
      const readFile = fs.readFileSync(
        path.join(process.cwd(), "public", `posts/${fileName}`),
        "utf-8",
      );
      const { data: frontmatter } = matter(readFile);

      return {
        slug,
        frontmatter,
      };
    });

    return {
      props: { posts },
    };
  } catch (error) {
    console.error(error);

    return {
      props: {},
    };
  }
}

export default function BlogsPage({ posts }: any) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div>
      <Head>
        <title>Aufa Rijal • Blogs</title>
        <meta name="description" content="My blogs." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full min-h-screen bg-white dark:bg-zinc-900 bg-blur-image">
        <div className="max-w-4xl px-2 mx-auto">
          <header className="flex items-center h-16 border-b dark:border-zinc-800">
            <button
              className="flex items-center p-2 transition rounded-lg text-sky-700 hover:bg-sky-100 hover:text-sky-500 dark:text-white dark:hover:bg-sky-100/10 dark:hover:text-sky-300"
              onClick={router.back}
            >
              <Icon icon="mdi:arrow-left" width="20" />
            </button>

            <div className="w-full text-lg font-bold text-center flex-grow-1">
              Blogs
            </div>

            <div>
              <ThemeToggleBtn />
            </div>
          </header>

          <div className="mt-4" id="posts-search">
            {posts.length > 4 ? (
              <div className="relative w-full">
                <input
                  type="search"
                  id="location-search"
                  className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-sky-500 focus:border-sky-500 dark:bg-zinc-900 dark:border-s-gray-700  dark:border-zinc-700 dark:placeholder-gray-400 dark:text-white dark:focus:border-sky-500 outline-none"
                  placeholder="Search for posts"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
                />
                <button
                  type="submit"
                  className="absolute top-0 end-0 h-full p-2.5 text-sm font-medium text-white bg-sky-700 rounded-e-lg border border-sky-700 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-sky-300 dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800"
                >
                  <Icon icon="ic:round-search" width="20" />
                  <span className="sr-only">Search</span>
                </button>
              </div>
            ) : null}
          </div>

          <div className="flex flex-wrap justify-start gap-4 pt-4">
            {posts.length ? (
              posts
                .filter((post: any) =>
                  post.frontmatter.title.toLowerCase().includes(searchQuery),
                )
                .map(({ slug, frontmatter }: any, i: number) => {
                  return (
                    <Link
                      href={`/blogs/${slug}`}
                      className="w-full p-4 bg-white border rounded-lg dark:bg-zinc-900 dark:border-zinc-700 group"
                      key={i}
                    >
                      <div className="text-xs dark:text-zinc-400">
                        {frontmatter.date}
                      </div>
                      <div className="my-2 text-lg font-semibold">
                        <p>{frontmatter.title}</p>
                      </div>
                      <div className="text-sm group-hover:underline">
                        Read more
                      </div>
                    </Link>
                  );
                })
            ) : (
              <div className="w-full mt-10 text-center dark:text-zinc-400 text-zinc-500">
                No blogs available yet.
              </div>
            )}
            <div></div>
          </div>
        </div>
      </main>
    </div>
  );
}

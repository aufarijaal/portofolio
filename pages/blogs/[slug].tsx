import { Icon } from "@iconify-icon/react";
import fs from "fs";
import matter from "gray-matter";
import Head from "next/head";
import { useRouter } from "next/router";
import ThemeToggleBtn from "../../components/ThemeToggleBtn";
import path from "path";
import MarkdownIt from "markdown-it";
import Link from "next/link";

export async function getStaticPaths() {
  try {
    const files = fs
      .readdirSync(path.join(process.cwd(), "public", `posts`))
      .filter((fileName) => !fileName.includes(".gitkeep"));

    const paths = files.map((fileName) => ({
      params: {
        slug: fileName.replace(".md", ""),
      },
    }));

    return {
      paths,
      fallback: "blocking",
    };
  } catch (error) {
    console.error(error);

    return {
      paths: [],
      fallback: false,
    };
  }
}

export async function getStaticProps({ params: { slug } }: any) {
  try {
    const fileName = fs.readFileSync(path.join(process.cwd(), "public", `posts/${slug}.md`), "utf-8");
    const { data: frontmatter, content } = matter(fileName);

    return {
      props: {
        frontmatter,
        content,
      },
    };
  } catch (error) {
    console.error(error);

    return {
      props: {},
    };
  }
}

export default function Post({ frontmatter, content }: any) {
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>Aufa Rijal • {frontmatter.title}</title>
        <meta name="description" content={frontmatter.metaDesc} />
        <meta name="title" content={frontmatter.metaTitle} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full min-h-screen bg-white dark:bg-zinc-900">
        <div className="mx-auto max-w-4xl">
          <header className="flex items-center h-16 px-2 border-b dark:border-zinc-800">
            <button
              className="flex items-center p-2 transition rounded-lg text-sky-700 hover:bg-sky-100 hover:text-sky-500 dark:text-white dark:hover:bg-sky-100/10 dark:hover:text-sky-300"
              onClick={router.back}
            >
              <Icon icon="mdi:arrow-left" width="20" />
            </button>

            <Link href="/" className="w-full text-lg font-bold text-center flex-grow-1">
              aufarijaal's blogs
            </Link>

            <div>
              <ThemeToggleBtn />
            </div>
          </header>

          <div className="p-4 prose prose-sm md:prose-base max-w-none dark:prose-invert">
            <h1>{frontmatter.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: MarkdownIt().render(content) }} />
          </div>
        </div>
      </main>
    </div>
  );
}

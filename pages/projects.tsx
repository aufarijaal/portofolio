/* eslint-disable @next/next/no-img-element */
import { Icon } from "@iconify-icon/react";
import Head from "next/head";
import { useRouter } from "next/router";
import ThemeToggleBtn from "../components/ThemeToggleBtn";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

type Project = {
  title: string;
  desc: string;
  techs: {
    name: string;
    icon: string;
    customClasses: string[];
  }[];
  links: {
    name: string;
    icon: string;
    url: string;
  }[];
  images: string[];
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["projects"])),
    },
  };
};

export default function ProjectsPage() {
  const router = useRouter();
  const [drawer, setDrawer] = useState(false);
  const { t } = useTranslation("projects");
  const [projectToShow, setProjectToShow] = useState<Project>();
  const [mounted, setMounted] = useState(false);
  const [mainImage, setMainImage] = useState<string>("");

  function showDrawer(project: Project) {
    setProjectToShow(project);
    setMainImage(project.images[0]);
    setDrawer(true);
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div>
      <Head>
        <title>Aufa Rijal • Projects</title>
        <meta name="description" content="Projects I have been done." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full min-h-screen bg-white dark:bg-zinc-900 bg-blur-image">
        {drawer ? (
          <div className="fixed inset-0 z-50 flex flex-col w-full h-screen overflow-hidden duration-500 bg-black/20 drawer-backdrop backdrop-blur-lg animate-in slide-in-from-bottom-32">
            <div className="flex justify-end py-1">
              <button
                className="grid w-10 h-10 transition opacity-80 hover:opacity-100 place-items-center"
                onClick={() => setDrawer(false)}
              >
                <Icon icon="mdi:close" width="24" />
              </button>
            </div>

            <div className="overflow-y-auto bg-white drawer dark:bg-zinc-800 flex-grow-1 md:rounded-tl-xl">
              <div className="h-full max-w-6xl px-4 py-16 mx-auto drawer-body">
                <div>
                  <h3 className="text-lg font-bold text-center md:text-2xl md:text-start">{projectToShow?.title}</h3>
                </div>

                <div className="mt-4">
                  <div className="mb-2 text-sm text-center text-zinc-500 dark:text-zinc-400 md:text-start">
                    Built with
                  </div>
                  <div className="flex justify-center gap-2 md:justify-start">
                    {projectToShow?.techs.map((tech, i: number) => {
                      return (
                        <div className="grid w-12 h-12 place-items-center" key={i}>
                          <Icon icon={tech.icon} width="36" className={tech.customClasses.join(" ")} />
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-6">
                  <div className="w-full rounded-lg h-[300px] sm:h-[600px] bg-zinc-700">
                    <img
                      className="object-cover w-full h-full"
                      src={`/img/${mainImage}`}
                      alt={`${projectToShow?.title}'s screenshot`}
                    />
                  </div>
                </div>

                {projectToShow?.images.length! > 1 ? (
                  <div className="flex items-center max-w-full gap-4 pb-4 mt-4 overflow-x-auto md:px-4">
                    {projectToShow?.images.map((image, i) => {
                      return (
                        <div
                          className="w-36 overflow-hidden flex-shrink-0 h-[100px] bg-zinc-700 rounded-lg cursor-pointer"
                          key={i}
                          onClick={() => setMainImage(image)}
                        >
                          <img
                            className="object-cover w-full h-full"
                            src={`/img/${image}`}
                            alt={`${projectToShow.title}'s screenshot`}
                          />
                        </div>
                      );
                    })}
                  </div>
                ) : null}

                {projectToShow?.links.length! > 0 ? (
                  <div className="flex justify-center gap-2 mt-5 md:mt-10">
                    {projectToShow?.links.map((link, i) => {
                      return (
                        <a
                          href={link.url}
                          target="_blank"
                          className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-sky-700 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-sky-300 dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800"
                          key={i}
                        >
                          <Icon icon={link.icon} width="20" />
                          {link.name}
                        </a>
                      );
                    })}
                  </div>
                ) : null}

                <div className="max-w-3xl pb-16 mx-auto mt-5 md:mt-10">
                  <p className="text-xs sm:text-sm md:text-lg">{projectToShow?.desc}</p>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        <div className="mx-auto max-w-7xl">
          <header className="flex items-center h-16 px-2 border-b dark:border-zinc-800 sm:px-0">
            <button
              className="flex items-center p-2 transition rounded-lg text-sky-700 hover:bg-sky-100 hover:text-sky-500 dark:text-white dark:hover:bg-sky-100/10 dark:hover:text-sky-300"
              onClick={router.back}
            >
              <Icon icon="mdi:arrow-left" width="20" />
            </button>

            <div className="w-full text-lg font-bold text-center flex-grow-1 dark:text-sky-400 text-sky-600">
              Projects
            </div>

            <div>
              <ThemeToggleBtn />
            </div>
          </header>

          <div className="grid grid-cols-1 gap-4 px-2 py-4 place-items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {/* Projects items */}
            {mounted
              ? (t("projects", { returnObjects: true }) as any).map((project: any, i: number) => {
                  return (
                    <div
                      className="grid grid-rows-[65%_auto_auto] w-full max-w-[300px] min-w-[250px] h-96 p-4 rounded-lg border dark:border-zinc-700 bg-zinc-50 shadow-sm dark:bg-zinc-800 place-items-center"
                      key={i}
                      onClick={() => showDrawer(project)}
                    >
                      <img
                        className="object-cover w-full h-full rounded-lg"
                        src={`/img/${project.images[0]}`}
                        alt={`${project.title}'s Screenshot`}
                      />

                      <div className="self-end text-lg font-semibold select-none line-clamp-2 justify-self-start">
                        <p>{project.title}</p>
                      </div>

                      <div className="flex self-end gap-4 justify-self-start">
                        {project.techs.slice(0, 4).map((tech: any, i: any) => {
                          return <Icon icon={tech.icon} width="28" key={i} className={tech.customClasses.join(" ")} />;
                        })}

                        {project.techs.length > 4 && (
                          <div className="w-[28px] h-[28px] rounded-full dark:bg-zinc-700 bg-zinc-200 text-sm flex justify-center items-center">
                            +{project.techs.length - 4}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
              : /* Skeletons => */ Array.from({ length: 8 }, (v, i) => {
                  return (
                    <div
                      className="grid grid-rows-[65%_auto_auto] w-full max-w-[300px] min-w-[250px] h-96 p-4 rounded-lg dark:bg-zinc-800 place-items-center"
                      key={i}
                      onClick={() => setDrawer(true)}
                    >
                      <div className="w-full h-full rounded-lg bg-zinc-700 animate-pulse"></div>

                      <div className="self-end w-full justify-self-start">
                        <div className="w-full h-5 rounded-full bg-zinc-700 animate-pulse"></div>
                        <div className="w-full h-5 mt-2 rounded-full bg-zinc-700 animate-pulse"></div>
                      </div>

                      <div className="flex self-end gap-2 justify-self-start">
                        {Array.from({ length: 5 }, (v, i) => {
                          return <div className="rounded-full w-7 h-7 bg-zinc-700 animate-pulse" key={i}></div>;
                        })}
                      </div>
                    </div>
                  );
                })}
            <div></div>
          </div>
        </div>
      </main>
    </div>
  );
}

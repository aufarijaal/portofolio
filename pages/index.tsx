/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import Head from "next/head";
import Navbar from "../components/Navbar";
import { Icon } from "@iconify-icon/react";
import Link from "next/link";
import type { GetStaticProps, InferGetStaticPropsType } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Socials from "../public/socials.json";

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", [
      "common",
      "works",
      "edu",
    ])),
  },
});

const SkillList: React.FC<{ skills: any }> = ({ skills }) => {
  return skills.map((skill: any, i: number) => {
    return (
      <div
        className="grid p-px shadow-lg rounded-xl shadow-gray-600/10 bg-gradient-to-t from-transparent to-zinc-100 dark:to-zinc-700 place-items-center group"
        key={i}
      >
        <div className="relative flex flex-col items-center justify-center w-32 h-32 gap-2 overflow-hidden select-none rounded-xl skill-item dark:border-zinc-600 dark:bg-zinc-900/90">
          <div
            className={`absolute top-0 left-0 scale-[3] opacity-20 transition duration-500 group-hover:translate-x-5 group-hover:translate-y-5 dark:opacity-15 blur-sm ${skill.customClasses.join(
              " ",
            )}`}
          >
            <Icon icon={skill.icon} width="48" />
          </div>

          <div
            className={`absolute w-full h-full justify-center flex items-end opacity-20 group-hover:blur-xl duration-500 transition dark:opacity-60 blur-lg brightness-125 ${skill.customClasses.join(
              " ",
            )}`}
          >
            <Icon icon={skill.icon} width="48" className="translate-y-5" />
          </div>
          <div
            className={`absolute flex flex-col items-center justify-center w-full h-full gap-2 ${skill.customClasses.join(
              " ",
            )}`}
          >
            <Icon icon={skill.icon} width="48" />
            <div className="text-sm font-semibold dark:text-white">
              {skill.name}
            </div>
          </div>
        </div>
      </div>
    );
  });
};

const Home: NextPage = (
  props: InferGetStaticPropsType<typeof getStaticProps>,
) => {
  const { t: tCommon } = useTranslation("common");
  const { t: tWorks } = useTranslation("works");
  const { t: tEdu } = useTranslation("edu");

  return (
    <div>
      <Head>
        <title>Aufa Rijal • Portofolio Website</title>
        <meta
          name="description"
          content="Hey there, I am Aufa. A Web Developer."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar
        menus={
          tCommon("menu", { returnObjects: true }) as {
            title: string;
            path: string;
            enabled: boolean;
          }[]
        }
      />
      <main className="w-full min-h-screen transition-colors bg-white dark:bg-zinc-900 bg-blur-image">
        <div className="px-4 pt-32 mx-auto md:px-0 max-w-7xl">
          {/* Hero */}
          <section
            className="flex flex-col items-center px-10 md:justify-between md:flex-row md:max-w-5xl md:mx-auto"
            id="hero-section"
          >
            <img
              src="/avatar.jpg"
              alt="avatar"
              className="w-40 rounded-lg md:order-1 md:w-60"
            />

            <div className="max-w-2xl px-4 text-4xl font-bold text-center md:text-left text-sky-900 dark:text-sky-50 md:text-5xl mt-7 md:mt-0 md:px-0 md:mr-4">
              <div className="font-extrabold font-inter">
                <p>{tCommon("heroTitle1")}</p>
                <p className="mt-4">{tCommon("heroTitle2")}</p>
              </div>

              <p className="mt-8 text-xs font-normal md:text-sm">
                {tCommon("bio")}
              </p>

              <div className="flex justify-center gap-2 mt-10 md:justify-start">
                {Socials.map((social, i) => {
                  return (
                    <a
                      href={social.url}
                      className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-sky-700 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-sky-300 dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800"
                      target="_blank"
                      key={i}
                    >
                      <Icon icon={social.icon} width="18" />
                      {social.name}
                    </a>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Projects */}
          <section className="flex flex-col items-center mt-20" id="projects">
            <div className="text-3xl font-bold text-center text-sky-900 dark:text-sky-50">
              {tCommon("sectionTitles.projects")}
            </div>

            <div className="mt-10">
              <Link
                href="/projects"
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-sky-700 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-sky-300 dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800"
              >
                <Icon icon="gg:external" width="18" />
                {tCommon("linkToProjectsPage")}
              </Link>
            </div>
          </section>

          {/* Work Experience */}
          <section className="flex flex-col items-center mt-20" id="work">
            <div className="text-3xl font-bold text-center text-sky-900 dark:text-sky-50">
              {tCommon("sectionTitles.work")}
            </div>

            <div className="flex flex-col gap-6 mt-10">
              {(tWorks("works", { returnObjects: true }) as any).map(
                (work: any, i: number) => {
                  return (
                    <div
                      className="p-px rounded-xl shadow-lg bg-gradient-to-t from-transparent to-zinc-200/20 dark:from-zinc-800 dark:to-zinc-700 shadow-gray-600/10 group min-w-[350px]"
                      key={i}
                    >
                      <div className="relative px-6 py-4 overflow-hidden rounded-xl dark:bg-zinc-900">
                        <div className="absolute top-10 left-10 text-sky-500 scale-[10] opacity-50 transition group-hover:scale-[15] blur-sm duration-500">
                          <Icon
                            icon="material-symbols:work-outline"
                            width="28"
                          />
                        </div>

                        <div className="text-sky-500">
                          <Icon
                            icon="material-symbols:work-outline"
                            width="28"
                          />
                        </div>
                        <div className="text-sm dark:text-zinc-400 text-zinc-500">
                          {work.start} - {work.end}
                        </div>
                        <div className="my-2 text-xl font-bold text-sky-500 dark:text-sky-400">
                          {work.as}
                        </div>
                        <div className="dark:text-white text-zinc-600">
                          {work.at}
                        </div>
                        <div className="max-w-xl mt-2 text-sm dark:text-zinc-400 text-zinc-500">
                          <p>{work.desc}</p>
                        </div>
                      </div>
                    </div>
                  );
                },
              )}
            </div>
          </section>

          {/* Education */}
          <section className="flex flex-col items-center mt-20" id="edu">
            <div className="text-3xl font-bold text-center text-sky-900 dark:text-sky-50">
              {tCommon("sectionTitles.edu")}
            </div>

            <div className="flex flex-col items-center max-w-4xl gap-2 mt-10">
              {(tEdu("edu", { returnObjects: true }) as any).map(
                (edu: any, i: number) => {
                  return (
                    <div
                      className="p-px rounded-xl shadow-lg bg-gradient-to-t from-transparent to-zinc-200/20 dark:from-zinc-800 dark:to-zinc-700 shadow-gray-600/10 group min-w-[350px]"
                      key={i}
                    >
                      <div className="relative px-6 py-4 overflow-hidden rounded-xl dark:bg-zinc-900">
                        <div className="absolute top-10 left-10 text-sky-500 scale-[10] opacity-50 transition group-hover:scale-[15] blur-sm duration-500">
                          <Icon icon="mdi:college-outline" width="28" />
                        </div>

                        <div className="text-sky-500">
                          <Icon icon="mdi:college-outline" width="28" />
                        </div>
                        <div className="text-sm dark:text-zinc-400 text-zinc-500">
                          {edu.start} - {edu.end}
                        </div>
                        <div className="my-2 text-xl font-bold text-sky-500 dark:text-sky-400">
                          {edu.institution}
                        </div>
                        <div className="dark:text-white text-zinc-600">
                          {edu.degree}&nbsp;-&nbsp;{edu.major}
                        </div>
                        <div className="mt-2 font-semibold dark:text-white text-zinc-600">
                          {edu.GPA}
                        </div>
                      </div>
                    </div>
                  );
                },
              )}
            </div>
          </section>

          {/* Skills */}
          <section className="flex flex-col items-center mt-20" id="skills">
            <div className="text-3xl font-bold text-center text-sky-900 dark:text-sky-50">
              {tCommon("sectionTitles.skills")}
            </div>

            <div className="flex flex-wrap justify-center max-w-4xl gap-6 mt-10">
              <SkillList skills={tCommon("skills", { returnObjects: true })} />
            </div>
          </section>

          {/* Contact */}
          <section className="flex flex-col items-center mt-20" id="contact">
            <div className="text-3xl font-bold text-center text-sky-900 dark:text-sky-50">
              {tCommon("sectionTitles.contact")}
            </div>

            <div className="mt-10">
              <div className="p-px shadow-lg rounded-xl bg-gradient-to-t from-transparent to-zinc-200/20 dark:from-zinc-800 dark:to-zinc-700 shadow-gray-600/10 group">
                <div className="max-w-4xl min-w-[350px] dark:bg-zinc-900 h-32 rounded-xl relative overflow-hidden">
                  <div className="absolute top-10 left-10 blur-sm opacity-90 scale-[10] group-hover:scale-[15] transition duration-500 text-sky-500">
                    <Icon icon="mdi:email-outline" />
                  </div>

                  <div className="absolute flex w-full h-full items-center justify-center z-[2] text-sky-600 dark:text-sky-400">
                    {tCommon("emailme")}&nbsp;
                    <strong>rijalaufa0@gmail.com</strong>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <footer className="py-5 mx-auto mt-24 text-sm font-medium text-center border-t max-w-7xl text-sky-900 dark:text-white dark:border-zinc-600">
            © aufarijaal • 2024
          </footer>
        </div>
      </main>
    </div>
  );
};

export default Home;

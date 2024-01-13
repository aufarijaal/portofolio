/* eslint-disable @next/next/no-img-element */
import { Icon } from "@iconify-icon/react";
import { useWindowScroll } from "@uidotdev/usehooks";
import Link from "next/link";
import { useState } from "react";
import ThemeToggleBtn from "./ThemeToggleBtn";
import { useRouter } from "next/router";
import { useBreakpoint } from "use-breakpoint";

const MenuList: React.FC<{
  menus: { title: string; path: string; enabled: boolean }[];
}> = ({ menus }) => {
  const router = useRouter();
  const BREAKPOINTS = { sm: 640, md: 768, lg: 1024, xl: 1280, xl2: 1536 };
  const { breakpoint, maxWidth, minWidth } = useBreakpoint(BREAKPOINTS, "sm");

  const onToggleLanguageClick = (newLocale: string) => {
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, asPath, { locale: newLocale });
  };

  const list = menus.map((menu, i) => {
    return (
      <li key={i}>
        <Link
          href={menu.path}
          className={`nav-item ${menu.enabled ? "" : "nav-item-disabled"}`}
        >
          {menu.title}
        </Link>
      </li>
    );
  });

  if (breakpoint === "md") {
    list.push(
      <li
        className="relative px-2 py-0 cursor-pointer nav-item group"
        key="three-dot"
      >
        <Icon icon="ph:dots-three-bold" width="24" />

        <div className="absolute left-0 hidden py-2 px-4 min-w-[100px] duration-500 text-sky-600 dark:text-white rounded-lg bg-zinc-100 dark:bg-zinc-800 top-9 group-hover:animate-in group-hover:fade-in group-hover:block">
          <ul>
            <div className="mb-2 text-sm font-normal text-zinc-400">
              Language
            </div>
            {router.locales?.map((localeName) => {
              return (
                <li
                  className={`px-2 py-1 transition-colors rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 ${router.locale === localeName ? "font-bold" : "font-normal"
                    }`}
                  key={localeName}
                  onClick={() => {
                    if (router.locale !== localeName)
                      onToggleLanguageClick(localeName);
                  }}
                >
                  {localeName.toUpperCase()}
                </li>
              );
            })}
            <div
              className="self-center block w-full h-px my-2 dark:bg-zinc-600 bg-zinc-200"
              key="divider-3"
            />
            <li className="flex items-center justify-between gap-10" key="theme-toggle">
              <div className="text-sm font-normal text-zinc-400">Theme</div>
              <ThemeToggleBtn />
            </li>
          </ul>
        </div>
      </li>,
    );
  } else {
    list.push(
      <>
        <div
          className="self-center block w-10 h-px md:w-px md:h-8 dark:bg-zinc-600"
          key="divider-1"
        />
        <li key="theme-btn">
          <ThemeToggleBtn />
        </li>
        <div
          className="self-center block w-10 h-px md:w-px md:h-8 dark:bg-zinc-600"
          key="divider-2"
        />
        <li key="i18n-select">
          <div className="relative px-2 cursor-pointer nav-item group">
            {router.locale?.toUpperCase()}
            <Icon icon="mdi:chevron-down" />

            <div className="absolute left-0 hidden p-2 min-w-[100px] duration-500 text-sky-600 dark:text-white rounded-lg bg-zinc-100 dark:bg-zinc-800 top-9 group-hover:animate-in group-hover:fade-in group-hover:block">
              <ul>
                {router.locales?.map((localeName) => {
                  return (
                    <li
                      className={`px-2 py-1 transition-colors rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 ${router.locale === localeName
                          ? "font-bold"
                          : "font-normal"
                        }`}
                      key={localeName}
                      onClick={() => onToggleLanguageClick(localeName)}
                    >
                      {localeName.toUpperCase()}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </li>
      </>,
    );
  }

  return list;
};

const Navbar: React.FC<{
  menus: { title: string; path: string; enabled: boolean }[];
}> = ({ menus }) => {
  const [{ x, y }, scrollTo] = useWindowScroll();
  const [show, setShow] = useState(false);

  const classes = [
    "fixed top-0 z-20 flex w-full h-16 px-10 transition-colors border-b",
    y && y > 0
      ? `dark:border-zinc-700 border-zinc-200 bg-white/20 backdrop-blur-md dark:bg-zinc-800/20`
      : "border-transparent bg-transparent",
  ];

  return (
    <nav className={classes.join(" ")}>
      {/* nav for small screen */}
      {show ? (
        <div
          className="fixed inset-0 z-[70] grid w-screen h-screen bg-white/80 dark:bg-zinc-900/80 backdrop-blur-lg place-items-center animate-in slide-in-from-right"
          id="small-screen-nav-backdrop"
        >
          <div
            className="flex flex-col items-center justify-center gap-4"
            id="small-screen-nav"
          >
            <button
              className="grid p-2 transition rounded-lg text-sky-800 dark:text-white hover:bg-sky-100 dark:hover:bg-sky-200/10 hover:text-sky-500 dark:hover:text-sky-300 place-items-center"
              onClick={() => setShow(false)}
            >
              <Icon icon="mdi:close" width="24" />
            </button>

            <img src="/favicon.svg" alt="logo" className="w-6 h-6" />
            <ul className="flex flex-col items-center gap-4">
              <MenuList menus={menus} />
            </ul>
          </div>
        </div>
      ) : null}

      <div className="flex items-center justify-between w-full mx-auto max-w-7xl">
        <div className="flex items-center gap-4">
          <img src="/favicon.svg" alt="logo" className="w-6 h-6" />
          <ul className="hidden gap-2 md:flex">
            <MenuList menus={menus} />
          </ul>
        </div>

        <div>
          <button
            className="relative w-[110px] h-[40px] rounded-xl overflow-hidden"
            onClick={() => window.open("/muhammad_aufa_rijal-cv.pdf")}
          >
            <div className="absolute inset-0 z-10 grid w-full h-full place-items-center">
              <div
                className="w-[100px] h-[20px] bg-sky-400 dark:bg-sky-600 blur-sm animate-spin"
                style={{ animationDuration: "10s" }}
              ></div>
            </div>

            <div className="absolute z-20 text-sky-400 bg-white w-[calc(100%-1px)] h-[calc(100%-2px)] top-[1px] left-[1px] rounded-xl flex items-center gap-2 text-sm justify-center font-semibold inset-0 dark:bg-zinc-900 border dark:border-zinc-800 hover:bg-zinc-800 transition">
              <Icon icon="line-md:download-loop" />
              Resume
            </div>
          </button>
        </div>

        <div className="block md:hidden">
          <button
            className="flex items-center justify-center w-10 h-10 transition rounded-lg hover:bg-sky-100 hover:text-sky-500 text-sky-800 dark:text-white dark:hover:bg-sky-100/10 dark:hover:text-sky-300"
            onClick={() => setShow(true)}
          >
            <Icon icon="game-icons:hamburger-menu" width="20" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

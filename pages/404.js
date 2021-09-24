import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Custom404() {
  const router = useRouter();
  const [timer, setTimer] = useState(3);

  useEffect(() => {
    // setTimeout(() => {
    //   router.push("/");
    // }, 5000);
    if (timer > 0) {
      setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
    } else router.push("/");
  }, [timer]);

  const bodyDiv = {
    height: "2000px",
    padding: "50px 100px",
    fontSize: "20px",
  };

  return (
    <>
      <Head>
        <title>Page Not Found</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="Oooops, this page has been deleted or does not exist."
        ></meta>
      </Head>
      <div style={bodyDiv}>
        <h1>Ooooops..</h1>
        <h2>This page has been deleted or does not exist.</h2>
        <h2>Redirecting to the homepage in {timer} seconds.</h2>
      </div>
    </>
  );
}

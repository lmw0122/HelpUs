import react, { FC } from "react";
import "../styles/globals.css";
import "../styles/scroll.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";

import Head from "next/head";
import Script from "next/script";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

// import CustomFont from "../public/GowunDodum-Regular.ttf";

declare global {
  interface Window {
    kakao: any;
  }
}

const MyApp: FC = ({ Component, pageProps }: AppProps) => {
  const theme = createTheme({
    typography: {
      // fontFamily: "Gowun Dodum",
      // fontFamily: "Noto Serif KR",
      fontFamily: "Noto Sans KR",
    },
    palette: {
      primary: {
        main: "#5B321E",
      },
    },
  });

  // const theme = createTheme();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Head>
        <title>HELP:US</title>
        <link rel="favicon" href="/favicon.ico" />
        {/* <link
          href="https://fonts.googleapis.com/css2?family=Gowun+Dodum&display=swap"
          rel="stylesheet"
        ></link> */}
      </Head>
      <Script
        src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
        strategy="beforeInteractive"
      />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
};

export default MyApp;

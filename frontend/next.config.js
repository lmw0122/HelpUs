/** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// }

// module.exports = nextConfig

// proxy
module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/ocr",
        destination: "https://bec8udp05h.apigw.ntruss.com/custom/v1/15684/b2ab54fd83e5770a4f755bd8d556a8b0815ad072db3cd9bae4a86827b995edee/general",
      },
      {
        source: "/9082/:path*",
        destination: 'http://k6c106.p.ssafy.io:9082/:path*',
      },
      {
        source: "/9080/:path*",
        destination: 'http://k6c106.p.ssafy.io:9080/:path*',
      },
      {
        source: "/9081/:path*",
        destination: 'http://k6c106.p.ssafy.io:9081/:path*',
      },
      {
        source: "/8000/:path*",
        destination: 'http://k6c106.p.ssafy.io:8000/:path*',
      },
    ];
  },
  images: {
    domains: ['c106-helpus.s3.ap-northeast-2.amazonaws.com'],
  }
};



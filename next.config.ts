import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
   images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.imgur.com",
      },
       {
        protocol: "https",
        hostname: "placehold.co",
      },
          {
        protocol: "https",
        hostname: "placeimg.com",
      },
             {
        protocol: "https",
        hostname: "pravatar.cc",
      },
                   {
        protocol: "https",
        hostname: "pravatar.cc",
      },
                        {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
                         {
        protocol: "https",
        hostname: "eduport.webestica.com",
      },
                            {
        protocol: "https",
        hostname: "media.istockphoto.com",
      },
                               {
        protocol: "https",
        hostname: "api.escuelajs.co",
      },
                                     {
        protocol: "https",
        hostname: "img.freepik.com",
      },
                                      {
        protocol: "https",
        hostname: "img.com",
      },
                                         {
        protocol: "https",
        hostname: "www.hola.com",
      },
    ],
  },
};

export default nextConfig;

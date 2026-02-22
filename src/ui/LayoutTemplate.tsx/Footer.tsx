import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <section className="w-full bg-[#E9E7E2] pt-10">
      <div className="mx-auto px-4 sm:px-8">
        <div className="rounded-4xl overflow-hidden bg-[#4E67FF]  ">
          <div className="bg-[#4E67FF] px-4 sm:px-8 lg:px-12 py-12 flex flex-col gap-6 md:flex-row items-start justify-between ">
            <div className="max-w-full md:max-w-62 lg:max-w-md">
              <h3 className="text-white font-extrabold text-3xl leading-[1.05] tracking-wide uppercase">
                JOIN OUR KICKSPLUS <br /> CLUB &amp; GET 15% OFF
              </h3>

              <p className="text-white/80 text-sm mt-4">
                Sign up for free! Join the community.
              </p>

              <div className="mt-6 flex items-center gap-3">
                <div className="h-10 w-60 rounded-md border border-white/85 bg-white/10 px-4 flex items-center">
                  <input
                    type="email"
                    placeholder="Email address"
                    className="w-full bg-transparent outline-none text-white placeholder:text-white/55 text-sm"
                  />
                </div>

                <button className="h-10 px-5 rounded-md cursor-pointer bg-[#1b1b1b] text-white text-xs font-semibold">
                  SUBMIT
                </button>
              </div>
            </div>
            <div className="flex items-start gap-2 justify-start mt-2 pr-2">
              <div className="text-white font-extrabold text-6xl md:text-7xl lg:text-8xl tracking-tight leading-none">
                KICKS
              </div>
              <div className=" flex justify-center items-center w-4 h-4 rounded-full mt-4 bg-[#FFB100]">
                <div className=" text-[13px] text-blue-500 font-bold">+</div>
              </div>
            </div>
          </div>
          <div className="bg-[#242424] px-12 pt-10 pb-8 relative rounded-4xl">
            <div className="grid grid-cols-12 gap-10 relative z-10 pb-40">
              <div className="col-span-12 md:col-span-5">
                <h4 className="text-[#F6A21A] text-xl font-extrabold mb-3">
                  About us
                </h4>
                <p className="text-white/80 text-sm leading-relaxed max-w-90">
                  We are the biggest hyperstore in the universe. <br />
                  We got you all cover with our exclusive collections and latest
                  drops.
                </p>
              </div>
              <div className="col-span-6 md:col-span-3">
                <h4 className="text-[#F6A21A] text-base font-extrabold mb-3">
                  Categories
                </h4>
                <ul className="space-y-2 text-white/85 text-sm">
                  <li>Runners</li>
                  <li>Sneakers</li>
                  <li>Basketball</li>
                  <li>Outdoor</li>
                  <li>Golf</li>
                  <li>Hiking</li>
                </ul>
              </div>

              <div className="col-span-6 md:col-span-2">
                <h4 className="text-[#F6A21A] text-base font-extrabold mb-3">
                  Company
                </h4>
                <ul className="space-y-2 text-white/85 text-sm">
                  <li>About</li>
                  <li>Contact</li>
                  <li>Blogs</li>
                </ul>
              </div>

              <div className="col-span-12 md:col-span-2">
                <h4 className="text-[#F6A21A] text-base font-extrabold mb-3">
                  Follow us
                </h4>
                <div className="flex items-center gap-4 text-white/90">
                  <button
                    className="hover:opacity-80 transition cursor-pointer"
                    aria-label="Facebook"
                  >
                    <Facebook size={18} />
                  </button>
                  <button
                    className="hover:opacity-80 transition cursor-pointer"
                    aria-label="Instagram"
                  >
                    <Instagram size={18} />
                  </button>
                  <button
                    className="hover:opacity-80 transition cursor-pointer"
                    aria-label="Twitter"
                  >
                    <Twitter size={18} />
                  </button>
                  <button
                    className="hover:opacity-80 transition cursor-pointer"
                    aria-label="TikTok"
                  >
                    <span className="inline-block w-4.5 h-4.5 rounded-full cursor-pointer bg-white/85" />
                  </button>
                </div>
              </div>
            </div>
            <div className="absolute left-0 right-0 bottom-0 mt-30 overflow-hidden pointer-events-none">
              <div className="text-white font-extrabold tracking-tight leading-none text-[220px] md:text-[280px] translate-y-[30%]  text-center opacity-100">
                KICKS
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#E9E7E2] py-3 text-center text-xs text-[#2a2a2a]">
          © All rights reserved
        </div>
      </div>
    </section>
  );
}

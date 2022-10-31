/*eslint-disable*/
import React from "react";
//import { HiMoon, HiSun } from "react-icons/hi";

// components
import Clock from "../components/Clock";
import Unsplash from "../components/Unsplash";
import SearchBox from "../components/Search";
import LunarPhase from "../components/LunarPhase";
import WeatherBox from "../components/Weather";
import Toggle from "../components/ThemeToggle";
import ThemeProvider from "../components/ThemeContext";
import Windy from "../components/Windy";


// assets
import desert from "../assets/img/desert.mp4"
import { RiStockLine, RiNewspaperLine } from "react-icons/ri";


export default function Index() {
  return (
    <>
      <section className="theme-pastel bg-light dark:bg-dim min-h-screen flex items-center justify-center pt-10 pb-10 font-helvetica">
        <div className="grid xl:grid-cols-7 md:grid-cols-5 sm:grid-cols-3 xs:grid-cols-2 gap-y-6 gap-x-6 grid-flow-row-dense content-center">

          {/* row 1 */}
          <div className="overflow-hidden rounded-xl col-span-1 row-span-2 h-80 w-36 shadow-4xl dark:shadow-none">
            <div className="sticky rounded-xl overflow-hidden h-80 w-36 border-0 dark:border-4 dark:border-pale">
              <video className="relative object-cover min-h-full max-w-xl -left-12" src={desert} type="video/mp4" autoPlay muted loop />
            </div>
          </div>
          <div className="rounded-xl col-span-1 h-36 w-36 shadow-4xl dark:shadow-none">
            <div className="sticky rounded-xl overflow-hidden h-36 w-36 border-0 dark:border-4 dark:border-pale">
              <video className="relative object-cover min-h-full max-w-sm right-48" src={desert} type="video/mp4" autoPlay muted loop />
            </div>
          </div>
          <div className="bg-dim text-black rounded-xl col-span-2 h-36 w-80 shadow-4xl dark:shadow-none border-0 dark:border-4 dark:border-pale"><SearchBox /></div>
          <div className="bg-dim rounded-xl col-span-1 h-36 w-36 shadow-4xl dark:shadow-none border-0 dark:border-4 dark:border-pale overflow-y-auto">
            <ul className=" text-left text-light theme-pastel:text-readable m-0 pl-5 pt-1 before:block before:absolute left-0 w-1 h-3 border-solid border-teal-600 relative list-none mb-2">
              <li className="font-black text-lg underline underline-offset-4 decoration-2 decoration-light text-center">news</li>
              <li className=""><a href="https://news.ycombinator.com/">hacker news</a></li>
              <li><a href="https://medium.com">medium</a></li>
              <li><a href="https://12ft.io">12ft</a></li>
            </ul>
          </div>
          <div className="bg-light text-black rounded-xl col-span-1 h-36 w-36 shadow-4xl dark:shadow-none"><Unsplash /></div>
          <div className="bg-accent2 dark:bg-accent1 text-black rounded-xl col-span-1 h-36 w-36 shadow-4xl dark:shadow-none border-0 dark:border-4 dark:border-pale"><WeatherBox /></div>
          {/* row 2 */}
          <div className="bg-light text-black rounded-xl col-span-1 h-36 w-36 shadow-4xl dark:shadow-none"><Unsplash /></div>
          <div className="bg-dim text-black rounded-xl col-span-1 h-36 w-36 shadow-4xl dark:shadow-none border-0 dark:border-4 dark:border-pale overflow-y-auto">
            <ul className=" text-left text-light theme-pastel:text-readable m-0 pl-5 pt-1 before:block before:absolute left-0 w-1 h-3 border-solid border-teal-600 relative list-none mb-2">
              <li className="font-black text-lg underline underline-offset-4 decoration-2 decoration-light text-center">work</li>
              <li><a href="https://stackoverflow.com">stackoverflow</a></li>
              <li><a href="https://github.com">github</a></li>
              <li><a href="https://gist.github.com/timothypholmes">gists</a></li>
            </ul>
          </div>
          <div className="overflow-hidden rounded-xl col-span-3 row-span-2 h-80 shadow-4xl dark:shadow-none ">
            <Windy />
          </div>
          <div className="bg-light text-black rounded-xl col-span-1 h-36 w-36 shadow-4xl dark:shadow-none"><Unsplash /></div>

          {/* row 3 */}
          <div className="bg-dim text-black rounded-xl col-span-1 h-36 w-36 shadow-4xl dark:shadow-none border-0 dark:border-4 dark:border-pale overflow-y-auto">
            <ul className=" text-left text-light theme-pastel:text-readable m-0 pl-5 pt-1 before:block before:absolute left-0 w-1 h-3 border-solid border-teal-600 relative list-none mb-2">
              <li className="font-black text-lg underline underline-offset-4 decoration-2 decoration-light text-center">finance</li>
              <li><a href="https://secure.tdameritrade.com/">tdameritrade</a></li>
              <li><a href="https://tradingeconomics.com/calendar">calendar</a></li>
              <li><a href="https://finviz.com">screener</a></li>
            </ul>
          </div>
          <div className="bg-dim theme-pastel:bg-moon rounded-xl col-span-2 row-span-2 shadow-4xl dark:shadow-none border-0 dark:border-4 dark:border-pale aspect-w-1 aspect-h-1"><LunarPhase /></div>
          <div className="bg-dim text-black rounded-xl col-span-1 h-36 w-36 shadow-4xl dark:shadow-none border-0 dark:border-4 dark:border-pale overflow-y-auto">
            <ul className=" text-left text-light theme-pastel:text-readable m-0 pl-5 pt-1 before:block before:absolute left-0 w-1 h-3 border-solid border-teal-600 relative list-none mb-2">
              <li className="font-black text-lg underline underline-offset-4 decoration-2 decoration-light text-center scroll-smooth">social</li>
              <li><a href="https://www.reddit.com">reddit</a></li>
              <li><a href="https://www.youtube.com">youtube</a></li>
              <li><a href="https://www.linkedin.com">linkedin</a></li>
              <li><a href="https://twitter.com/home">twitter</a></li>
            </ul>
          </div>

          {/* row 4 */}
          <div className="bg-dim rounded-xl col-span-1 h-36 w-36 shadow-4xl dark:shadow-none border-0 dark:border-4 dark:border-pale overflow-y-auto">
            <ul className=" text-left text-light theme-pastel:text-readable m-0 pl-5 pt-1 before:block before:absolute left-0 w-1 h-3 border-solid border-teal-600 relative list-none mb-2">
              <li className="font-black text-lg underline underline-offset-4 decoration-2 decoration-light text-center">other</li>
              <li><a href="https://www.reddit.com/r/startpages/">r/startpages</a></li>
              <li><a href="https://www.mercari.com">mercari</a></li>
              <li><a href="https://www.google.com/maps/">maps</a></li>
            </ul>
          </div>
          <div className="bg-light text-black rounded-xl col-span-1 h-36 w-36 shadow-4xl dark:shadow-none"><Unsplash /></div>
          <div className="flex items-center justify-center bg-dim text-white rounded-xl col-span-1 h-36 w-36 shadow-4xl dark:shadow-none border-0 dark:border-4 dark:border-pale">
            <ThemeProvider>
              <Toggle className="theme-pastel theme-nord theme-shine" />
            </ThemeProvider>
          </div>
          <div className="text-black rounded-xl col-span-1 h-36 w-36 shadow-4xl dark:shadow-none"><Unsplash /></div>
          <div className="bg-accent4 dark:bg-accent3 text-black rounded-xl col-span-1 h-36 w-36 shadow-4xl dark:shadow-none border-0 dark:border-4 dark:border-pale"><Clock /></div>

          {/* row 5 */}
          {/*
          <div className="bg-light text-black rounded-xl col-span-1  h-36 w-36 "></div>
          <div className="bg-light text-black rounded-xl col-span-1  h-36 w-36 ">02</div>
          <div className="bg-light text-black rounded-xl col-span-1  h-36 w-36 ">05</div>
          <div className="bg-light text-black rounded-xl col-span-1  h-36 w-36 "></div>
          <div className="bg-light text-black rounded-xl col-span-2  h-36 w-36 ">02</div>
          <div className="bg-light text-black rounded-xl col-span-1  h-36 w-36 ">05</div>
          */}

        </div>
      </section>
    </>
  );
}

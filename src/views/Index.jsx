/*eslint-disable*/
import React from "react";
//import { HiMoon, HiSun } from "react-icons/hi";

// components
import ClockTile from "../components/Clock";
import { Unsplash, UnsplashProvider } from "../components/Unsplash";
import SearchBox from "../components/Search";
import LunarPhase from "../components/LunarPhase";
import { DarkModeToggle, ThemeToggle } from "../components/Toggle";
import { DarkModeProvider, ThemeProvider } from "../components/ThemeContext";
import WeatherCard from "../components/WeatherCard";
import MiniCalendar from "../components/MiniCalendar";


// assets
import desert from "../assets/img/desert.mp4"

export default function Index() {
  return (
    <>
      <section className="bg-light dark:bg-dim min-h-screen flex items-center justify-center pt-10 pb-10 font-helvetica">
        <UnsplashProvider>
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
              <ul className="text-left [&>*]:font-serif text-light theme-pastel:text-readable m-0 pl-5 pt-1 before:block before:absolute left-0 w-1 h-3 border-solid border-teal-600 relative list-none mb-2">
                <li className="font-black text-lg underline underline-offset-4 decoration-2 decoration-light text-center">homelab</li>
                <li><a href="https://hypervisor.sorsa.cloud">hypervisor</a></li>
                <li><a href="https://router.sorsa.cloud">router</a></li>
                <li><a href="http://nitrogen.sorsa.cloud:32400">plex</a></li>
                <li><a href="https://hass.opcode.xyz">hass</a></li>
              </ul>
            </div>
            <div className="bg-light text-black rounded-xl col-span-1 h-36 w-36 shadow-4xl dark:shadow-none"><Unsplash /></div>
            <div className="bg-dim text-black rounded-xl col-span-1 h-36 w-36 shadow-4xl dark:shadow-none border-0 dark:border-4 dark:border-pale overflow-y-auto">
              <ul className="text-left [&>*]:font-serif text-light theme-pastel:text-readable m-0 pl-5 pt-1 before:block before:absolute left-0 w-1 h-3 border-solid border-teal-600 relative list-none mb-2">
                <li className="font-black text-lg underline underline-offset-4 decoration-2 decoration-light text-center">comms</li>
                <li><a href="https://gmail.com">gmail</a></li>
                <li><a href="https:/outlook.office.com">outlook</a></li>
                <li><a href="https://libera.chat/">libera.chat</a></li>
              </ul>
            </div>
            {/* row 2 */}
            <div className="bg-light text-black rounded-xl col-span-1 h-36 w-36 shadow-4xl dark:shadow-none"><Unsplash /></div>
            <div className="bg-accent4 dark:bg-accent3 text-black rounded-full col-span-1 h-36 w-36 shadow-4xl dark:shadow-none border-0 dark:border-4 dark:border-pale"><ClockTile /></div>
            <div className="bg-dim text-light rounded-xl overflow-hidden rounded-xl col-span-3 row-span-2 h-80 shadow-4xl dark:shadow-none border-0 dark:border-4 dark:border-pale">
              <WeatherCard />
            </div>
            <div className="bg-light text-black rounded-xl col-span-1 h-36 w-36 shadow-4xl dark:shadow-none"><Unsplash /></div>

            {/* row 3 */}
            <div className="bg-dim text-black rounded-xl col-span-1 h-36 w-36 shadow-4xl dark:shadow-none border-0 dark:border-4 dark:border-pale overflow-y-auto">
              <ul className="text-left [&>*]:font-serif text-light theme-pastel:text-readable m-0 pl-5 pt-1 before:block before:absolute left-0 w-1 h-3 border-solid border-teal-600 relative list-none mb-2">
                <li className="font-black text-lg underline underline-offset-4 decoration-2 decoration-light text-center">linux</li>
                <li><a href="https://search.nixos.org/packages">nixpkgs</a></li>
                <li><a href="https://awesomewm.org/apidoc">awesome</a></li>
                <li><a href="https://hydra.nixos.org/">hydra</a></li>
              </ul>
            </div>
            <div className="bg-dim theme-pastel:bg-moon rounded-xl col-span-2 row-span-2 shadow-4xl dark:shadow-none border-0 dark:border-4 dark:border-pale aspect-w-1 aspect-h-1"><LunarPhase /></div>
            <div className="bg-dim text-black rounded-xl col-span-1 h-36 w-36 shadow-4xl dark:shadow-none border-0 dark:border-4 dark:border-pale overflow-y-auto">
              <ul className="text-left [&>*]:font-serif text-light theme-pastel:text-readable m-0 pl-5 pt-1 before:block before:absolute left-0 w-1 h-3 border-solid border-teal-600 relative list-none mb-2">
                <li className="font-black text-lg underline underline-offset-4 decoration-2 decoration-light text-center scroll-smooth">genshin</li>
                <li><a href="https://genshin-impact-map.appsample.com">map</a></li>
                <li><a href="https://frzyc.github.io/genshin-optimizer">optimizer</a></li>
                <li><a href="https://paimon.moe/">paimon.moe</a></li>
                <li><a href="https://docs.google.com/spreadsheets/u/0/d/1T6pAFnkcnuEm3UWVzwBqOnv24DBM-ix2dSzlsvy9hPA">furniture</a></li>
              </ul>
            </div>

            {/* row 4 */}
            <div className="bg-dim rounded-xl col-span-1 h-36 w-36 shadow-4xl dark:shadow-none border-0 dark:border-4 dark:border-pale overflow-y-auto">
              <ul className=" text-left [&>*]:font-serif text-light theme-pastel:text-readable m-0 pl-5 pt-1 before:block before:absolute left-0 w-1 h-3 border-solid border-teal-600 relative list-none mb-2">
                <li className="font-black text-lg underline underline-offset-4 decoration-2 decoration-light text-center">other</li>
                <li><a href="https://www.google.com/maps/">maps</a></li>
              </ul>
            </div>
            <div className="bg-light text-black rounded-xl col-span-1 h-36 w-36 shadow-4xl dark:shadow-none"><Unsplash /></div>
            <div className="flex items-center justify-center bg-dim text-white rounded-xl col-span-1 h-36 w-36 shadow-4xl dark:shadow-none border-0 dark:border-4 dark:border-pale">
              <DarkModeProvider>
                <DarkModeToggle />
              </DarkModeProvider>
              <ThemeProvider>
                <ThemeToggle className="theme-pastel theme-nord theme-shine" />
              </ThemeProvider>
            </div>
            <div className="text-black rounded-xl col-span-1 h-36 w-36 shadow-4xl dark:shadow-none"><Unsplash /></div>
            <div className="bg-accent2 dark:bg-accent1 text-black rounded-xl col-span-1 h-36 w-36 shadow-4xl dark:shadow-none border-0 dark:border-4 dark:border-pale"><MiniCalendar /></div>

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
        </UnsplashProvider>
      </section>
    </>
  );
}

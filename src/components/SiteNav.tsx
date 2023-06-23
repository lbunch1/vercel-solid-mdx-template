import { A } from "solid-start";
import { Show, For, createEffect, createSignal } from "solid-js";
import "./SiteNav.css";
import { siteMap } from "./siteMap";

import { bars, xMark, lightIcon, darkIcon } from "./icons";

const htmlElement = document.querySelector("html")

function setTheme() {
  if (htmlClassList.contains("dark")) {
    htmlElement.setAttribute("data-theme", "dark");
    window.localStorage.removeItem("theme");
  } else {
    htmlClassList.add("dark");
    window.localStorage.setItem("theme", "dark");
  }
}


export default function({ home }: Object) {

  const [showMenu, setShowMenu] = createSignal(false);
  const [lightMode, setLightMode] = createSignal(true);

  function toggleTheme(theme: String) {

    if (theme === "dark") {
      htmlElement?.setAttribute("data-theme", "dark");
      setLightMode(false);
      window.localStorage.setItem("theme", "dark");
    } else if (theme === "light") {
      htmlElement?.setAttribute("data-theme", "light")
      setLightMode(true);
      window.localStorage.setItem("theme", "light");
    }
  }

  createEffect(() => {
    if (!window.localStorage.getItem("theme")) {
      (window.matchMedia('(prefers-color-scheme: dark)').matches) ? toggleTheme("dark") : toggleTheme("light")
    } else {
      toggleTheme(window.localStorage.getItem("theme"));
    }
  });



  return (
    <>

      <div class="nav-wrapper">
        <button class="icon open-nav" onClick={() => setShowMenu(!showMenu())} >{bars}</button>
        <A href="/"><h1>Logo</h1></A>
        <nav classList={{ show: showMenu() }}>
          <button class="icon close-nav" onClick={() => setShowMenu(!showMenu())} >{xMark}</button>
          <ul onClick={() => setShowMenu(!showMenu())}>

            <Show when={home} >
              <li>
                <A href="/">Home</A>
              </li>
            </Show>

            <For each={siteMap}>{(page) =>
              <li>
                <A href={page.path}>{page.title}</A>
              </li>
            }
            </For>
          </ul>
        </nav>
        <Show when={lightMode()} fallback={<button class="icon toggle-theme" onClick={() => toggleTheme("light")}>{darkIcon}</button>}>
          <button class="icon toggle-theme" onClick={() => toggleTheme("dark")}>{lightIcon}</button>
        </Show>
      </div>
    </>
  )
}

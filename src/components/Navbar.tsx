import { useLocation, A } from "@solidjs/router";
import { createSignal, createEffect, For } from "solid-js";
import { NAV_LINKS, SERVER_INFO } from "../constants";

export default function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = createSignal(false);

  createEffect(() => {
    location.pathname;
    setIsOpen(false);
  });

  return (
    <header class="sticky top-0 z-50 h-16 w-full border-b border-[#22242a] bg-[#16171b] shadow-2xl font-sans select-none">
      <div class="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6">
        
        <A href="/" class="flex items-center gap-3 group">
          <div class="flex h-9 w-9 items-center justify-center overflow-hidden rounded bg-[#111215] border border-[#2c2f36] group-hover:border-[#a100ed]/60 transition-colors shadow-inner">
            <img 
              src={SERVER_INFO.logoSrc} 
              alt={`${SERVER_INFO.name}`} 
              class="h-full w-full object-cover" 
            />
          </div>
          <span class="text-sm font-bold uppercase tracking-wider text-white">
            {SERVER_INFO.name}
          </span>
        </A>

        <nav class="hidden md:flex items-center gap-2">
          <For each={NAV_LINKS}>
            {(link) =>
              link.external ? (
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="px-4 py-2 text-xs font-semibold tracking-wider text-[#8a8f9d] hover:text-white hover:bg-[#1b1c21] rounded transition-colors flex items-center gap-1.5"
                >
                  <span>{link.label}</span>
                  <i class="bx bx-link-external text-sm"></i>
                </a>
              ) : (
                <A
                  href={link.href}
                  class={`px-4 py-2 text-xs font-semibold tracking-wider rounded transition-colors ${
                    location.pathname === link.href
                      ? "bg-[#1f2127] text-white border border-[#2c2f36]"
                      : "text-[#8a8f9d] hover:text-white hover:bg-[#1b1c21]"
                  }`}
                >
                  {link.label}
                </A>
              )
            }
          </For>
        </nav>

        <button
          onClick={() => setIsOpen(!isOpen())}
          aria-label="Toggle Navigation Menu"
          class="flex md:hidden items-center justify-center h-10 w-10 rounded-lg bg-[#111215] border border-[#22242a] text-[#8a8f9d] hover:text-white active:scale-95 transition-all z-50"
        >
          <i class={`bx ${isOpen() ? "bx-x text-2xl text-white" : "bx-menu text-2xl"}`}></i>
        </button>

      </div>

      <div
        onClick={() => setIsOpen(false)}
        class={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isOpen() ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      <aside
        class={`fixed top-0 right-0 z-40 h-screen w-72 bg-[#141519] border-l border-[#22242a] pt-20 p-6 flex flex-col justify-between transition-transform duration-300 ease-in-out md:hidden ${
          isOpen() ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div class="space-y-6">
          <div class="text-[10px] font-bold uppercase tracking-widest text-[#a100ed]">
            Menu Navigation
          </div>

          <nav class="flex flex-col gap-2">
            <For each={NAV_LINKS}>
              {(link) =>
                link.external ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex items-center justify-between px-4 py-3 text-xs font-semibold tracking-wider text-[#8a8f9d] hover:text-white hover:bg-[#1b1c21] border border-transparent rounded-lg transition-all"
                  >
                    <span>{link.label}</span>
                    <i class="bx bx-link-external text-base text-[#8a8f9d]"></i>
                  </a>
                ) : (
                  <A
                    href={link.href}
                    class={`flex items-center justify-between px-4 py-3 text-xs font-semibold tracking-wider rounded-lg transition-all ${
                      location.pathname === link.href
                        ? "bg-[#1f2127] text-white border border-[#2c2f36] shadow-sm"
                        : "text-[#8a8f9d] hover:text-white hover:bg-[#1b1c21] border border-transparent"
                    }`}
                  >
                    <span>{link.label}</span>
                    {location.pathname === link.href && (
                      <span class="h-1.5 w-1.5 rounded-full bg-[#b800ff]"></span>
                    )}
                  </A>
                )
              }
            </For>
          </nav>
        </div>

        <div class="space-y-3 pt-6 border-t border-[#22242a]">
          <a
            href={SERVER_INFO.connectUrl}
            target="_blank"
            rel="noopener noreferrer"
            class="flex w-full items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold tracking-wider uppercase rounded-lg bg-[#a100ed] hover:bg-[#b800ff] text-white transition-colors shadow-lg shadow-[#a100ed]/20"
          >
            <i class="bx bxs-joystick text-base"></i>
            Connect FiveM
          </a>
          <a
            href={SERVER_INFO.discordUrl}
            target="_blank"
            rel="noopener noreferrer"
            class="flex w-full items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold tracking-wider uppercase rounded-lg bg-[#111215] border border-[#2c2f36] text-[#8a8f9d] hover:text-white transition-colors"
          >
            <i class="bx bxl-discord-alt text-base"></i>
            Discord
          </a>
        </div>
      </aside>
    </header>
  );
}
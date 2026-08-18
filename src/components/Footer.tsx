import { For, createSignal } from "solid-js";
import { A } from "@solidjs/router";
import { SERVER_INFO, FOOTER_SECTIONS } from "../constants";

export default function Footer() {
  const [openSection, setOpenSection] = createSignal<string | null>(null);

  const toggleSection = (title: string) => {
    setOpenSection(openSection() === title ? null : title);
  };

  return (
    <footer class="w-full border-t border-[#22242a] bg-[#16171b] font-sans text-white select-none">
      <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
        <div class="grid grid-cols-1 gap-y-6 sm:grid-cols-2 md:grid-cols-4 sm:gap-x-4">
          <div class="space-y-3 text-center sm:text-left">
            <span class="text-xl font-extrabold tracking-wider uppercase text-white block">
              {SERVER_INFO.name}
            </span>
            <p class="text-xs text-[#8a8f9d] leading-relaxed max-w-xs mx-auto sm:mx-0">
              {SERVER_INFO.spiel1}
            </p>
          </div>

          <div class="col-span-1 sm:contents divide-y divide-[#22242a] sm:divide-y-0 border-t border-b border-[#22242a] sm:border-0">
            <For each={FOOTER_SECTIONS}>
              {(section) => (
                <div class="py-3 sm:py-0">
                  <button
                    onClick={() => toggleSection(section.title)}
                    class="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-white sm:pointer-events-none"
                  >
                    <span>{section.title}</span>
                    <span class="sm:hidden">
                      <i
                        class={`bx bx-chevron-down text-base text-[#8a8f9d] transition-transform duration-200 block ${
                          openSection() === section.title ? "rotate-180" : ""
                        }`}
                      />
                    </span>
                  </button>
                  <div
                    class={`grid transition-all duration-200 ease-in-out sm:block ${
                      openSection() === section.title
                        ? "grid-rows-[1fr] opacity-100 mt-3"
                        : "grid-rows-[0fr] opacity-0 sm:opacity-100 sm:mt-3"
                    }`}
                  >
                    <div class="overflow-hidden sm:overflow-visible">
                      <ul class="space-y-2.5 sm:space-y-3 text-xs text-[#8a8f9d]">
                        <For each={section.links}>
                          {(link) => (
                            <li>
                              {link.external ? (
                                <a
                                  href={link.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  class={`transition-colors inline-flex items-center gap-1.5 py-1 ${
                                    link.highlight
                                      ? "hover:text-[#b800ff]"
                                      : "hover:text-white"
                                  }`}
                                >
                                  {link.icon && <i class={`${link.icon} text-sm`}></i>}
                                  {link.label}
                                </a>
                              ) : (
                                <A
                                  href={link.href}
                                  class="hover:text-white transition-colors inline-flex items-center gap-1.5 py-1"
                                >
                                  {link.icon && <i class={`${link.icon} text-sm`}></i>}
                                  {link.label}
                                </A>
                              )}
                            </li>
                          )}
                        </For>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </For>
          </div>
        </div>

        <div class="mt-8 border-t border-[#22242a] pt-6 flex flex-col items-center text-center sm:flex-row sm:justify-between sm:text-left gap-2 sm:gap-3 text-xs text-[#8a8f9d]">
          <p>
            © {new Date().getFullYear()} <span class="text-white font-semibold">{SERVER_INFO.name}</span>. All rights reserved.
          </p>
          <p class="text-[11px]"> 
            Not affiliated with Rockstar Games, Take-Two Interactive, or Cfx.re.
          </p>
        </div>
      </div>
    </footer>
  );
}
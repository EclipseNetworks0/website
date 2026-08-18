import { For } from "solid-js";
import { A } from "@solidjs/router";
import { SERVER_INFO, FOOTER_SECTIONS } from "../constants";

export default function Footer() {
  return (
    <footer class="w-full border-t border-[#22242a] bg-[#16171b] font-sans text-white select-none">
      <div class="mx-auto max-w-7xl px-6 py-12">
        <div class="grid grid-cols-1 gap-8 md:grid-cols-4">
          
          <div class="space-y-4 md:col-span-1">
            <div class="flex items-center gap-2">
              <span class="text-xl font-extrabold tracking-wider uppercase text-white">
                {SERVER_INFO.name}
              </span>
            </div>
            <p class="text-xs text-[#8a8f9d] leading-relaxed max-w-xs">
              {SERVER_INFO.spiel1}
            </p>
          </div>

          <For each={FOOTER_SECTIONS}>
            {(section) => (
              <div>
                <h3 class="text-xs font-bold uppercase tracking-wider text-white">
                  {section.title}
                </h3>
                <ul class="mt-4 space-y-2.5 text-xs text-[#8a8f9d]">
                  <For each={section.links}>
                    {(link) => (
                      <li>
                        {link.external ? (
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            class={`transition-colors inline-flex items-center gap-1.5 ${
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
                            class="hover:text-white transition-colors inline-flex items-center gap-1.5"
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
            )}
          </For>

        </div>

        <div class="mt-12 border-t border-[#22242a] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8a8f9d]">
          <p>
            © {new Date().getFullYear()} <span class="text-white font-semibold">{SERVER_INFO.name}</span>. All rights reserved.
          </p>
          <p class="text-[11px]"> 
            Not affiliated with Rockstar Games, Take-Two Interactive, or Cfx.re.  {/* TLDR: PLEASE DON'T FUCKING SUE ME TAKE-TWO*/}
          </p>
        </div>
      </div>
    </footer>
  );
}
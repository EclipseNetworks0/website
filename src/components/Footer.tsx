import { A } from "@solidjs/router";
import { SERVER_INFO } from "../constants";

export default function Footer() {
  return (
    <footer class="w-full border-t border-[#22242a] bg-[#16171b] font-sans text-white select-none">
      <div class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6">
        
        <p class="text-xs font-medium tracking-wide text-[#8a8f9d]">
          © {new Date().getFullYear()} <span class="text-white font-semibold">{SERVER_INFO.name}</span>. All rights reserved.
        </p>

        <div class="flex items-center gap-6 text-xs font-semibold uppercase tracking-wider text-[#8a8f9d]">
          <a
            href={SERVER_INFO.connectUrl}
            target="_blank"
            rel="noopener noreferrer"
            class="hover:text-[#b800ff] transition-colors"
          >
            Connect
          </a>
          <a
            href={SERVER_INFO.discordUrl}
            target="_blank"
            rel="noopener noreferrer"
            class="hover:text-white transition-colors"
          >
            Discord
          </a>
        </div>

      </div>
    </footer>
  );
}
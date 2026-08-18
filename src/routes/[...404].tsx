import { A } from "@solidjs/router";

export default function NotFound() {
  return (
    <main class="min-h-[calc(100vh-4rem)] w-full bg-[#111215] font-sans text-white select-none">
      <div class="w-full min-h-[calc(100vh-4rem)] bg-[#16171b] border-b border-[#22242a] p-8 shadow-2xl flex flex-col items-center justify-center text-center">

        <h1 class="text-3xl font-semibold tracking-wide text-white uppercase sm:text-5xl">
          Page Not Found
        </h1>
        
        <p class="mt-4 text-xs sm:text-sm font-medium tracking-wide text-[#8a8f9d]">
          Uhm.. where you goin'!?!?
        </p>

        <div class="mt-8 flex justify-center">
          <A
            href="/"
            class="px-6 py-2.5 text-xs font-semibold tracking-wider uppercase rounded bg-[#a100ed] hover:bg-[#b800ff] text-white transition-colors shadow-lg shadow-[#a100ed]/20"
          >
            Return Home
          </A>
        </div>

      </div>
    </main>
  );
}
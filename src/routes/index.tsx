import { For, createResource, Show } from "solid-js";
import { SERVER_INFO } from "../constants";
import Community from "../components/Community";

const fetchContributors = async () => {
  const res = await fetch(
    "https://api.github.com/repos/EclipseNetworks0/website/contributors"
  );
  if (!res.ok) return [];
  return res.json();
};

export default function Home() {
  const [contributors] = createResource(fetchContributors);

  return (
    <main class="min-h-screen w-full bg-[#111215] font-sans text-white select-none">
      <section class="relative w-full border-b border-[#22242a] bg-[#16171b] px-6 py-20 sm:py-28 shadow-2xl flex flex-col items-center text-center overflow-hidden">
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#a100ed]/10 blur-[120px] pointer-events-none rounded-full" />

        <h1 class="text-4xl sm:text-6xl font-extrabold tracking-wide text-white uppercase max-w-4xl leading-tight">
          Welcome To<br />
          <span class="text-[#b800ff]">{SERVER_INFO.name}</span>
        </h1>

        <p class="mt-4 text-sm sm:text-base font-medium text-[#8a8f9d] max-w-2xl leading-relaxed">
          An Australian semi-serious FiveM roleplay server where community and enjoyment come first!
        </p>

        <div class="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href={SERVER_INFO.connectUrl}
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-2 px-6 py-3 text-xs font-bold tracking-wider uppercase rounded-lg bg-[#a100ed] hover:bg-[#b800ff] text-white transition-all shadow-lg shadow-[#a100ed]/25 hover:scale-[1.02]"
          >
            <i class="bx bxs-joystick text-lg"></i>
            Connect Server
          </a>
          <a
            href={SERVER_INFO.discordUrl}
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-2 px-6 py-3 text-xs font-bold tracking-wider uppercase rounded-lg bg-[#111215] hover:bg-[#1f2127] text-gray-300 transition-all border border-[#2c2f36] hover:scale-[1.02]"
          >
            <i class="bx bxl-discord-alt text-lg"></i>
            Join Discord
          </a>
        </div>
      </section>

      <Community />

      {/* TODO: Make this a component like <Community /> */}
      <section class="max-w-7xl mx-auto px-6 py-20">
        <div class="text-center mb-12">
          <h2 class="text-2xl sm:text-3xl font-bold uppercase tracking-wider text-white">
            Website Contributors
          </h2>
          <p class="text-xs sm:text-sm text-[#8a8f9d] mt-2">
            Meet the developers building and maintaining this website!
          </p>
        </div>

        <Show
          when={!contributors.loading}
          fallback={
            <div class="flex justify-center text-[#8a8f9d] text-xs">
              Loading...
            </div>
          }
        >
          <div class="flex flex-wrap justify-center gap-6">
            <For each={contributors()}>
              {(user) => (
                <a
                  href={user.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center gap-3 p-3 pr-5 rounded-xl bg-[#16171b] border border-[#22242a] hover:border-[#a100ed]/50 transition-all hover:scale-105 group"
                >
                  <img
                    src={user.avatar_url}
                    alt={user.login}
                    class="h-10 w-10 rounded-full border border-[#2c2f36]"
                  />
                  <div class="text-left">
                    <div class="text-xs font-bold text-white group-hover:text-[#b800ff] transition-colors">
                      {user.login}
                    </div>
                    <div class="text-[10px] text-[#8a8f9d]">
                      {user.contributions}{" "}
                      {user.contributions === 1 ? "commit" : "commits"}
                    </div>
                  </div>
                </a>
              )}
            </For>
          </div>
        </Show>
      </section>
    </main>
  );
}
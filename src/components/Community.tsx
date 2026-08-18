import { For, createResource, Show, createSignal } from "solid-js";

const fetchDiscordData = async () => {
  const res = await fetch("https://eclipse.asraye.com/api/discord");
  if (!res.ok) return { supporters: [], staff: [] };
  return res.json();
};

export default function Community() {
  const [discordData] = createResource(fetchDiscordData);
  const [activeTab, setActiveTab] = createSignal("supporters");
  const [showAllMembers, setShowAllMembers] = createSignal(false);
  const [showTooltip, setShowTooltip] = createSignal(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-emerald-500 shadow-emerald-500/50";
      case "dnd":
        return "bg-rose-500 shadow-rose-500/50";
      case "idle":
        return "bg-amber-500 shadow-amber-500/50";
      default:
        return "bg-gray-500 shadow-gray-500/50";
    }
  };

  const currentMembers = () => discordData()?.[activeTab()] || [];

  const visibleMembers = () => {
    const members = currentMembers();
    return showAllMembers() ? members : members.slice(0, 8);
  };

  return (
    <section class="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-16 border-b border-[#22242a] text-white select-none">
      <div class="text-center mb-6 sm:mb-10">
        <h2 class="text-xl sm:text-3xl font-bold uppercase tracking-wider text-white">
          Community
        </h2>
        <div class="flex items-center justify-center gap-2 mt-2 flex-wrap">
          <p class="text-xs sm:text-sm text-[#8a8f9d]">
            Meet our server supporters and staff team!
          </p>

          <div class="relative flex items-center group">
            <button
              onClick={() => setShowTooltip(!showTooltip())}
              aria-label="Discord sync info"
              class="p-2 -m-2 sm:p-1 sm:m-0 text-[#8a8f9d] hover:text-white transition-colors min-h-[44px] min-w-[44px] sm:min-h-0 sm:min-w-0 flex items-center justify-center"
            >
              <i class="bx bx-info-circle text-base cursor-pointer" />
            </button>

            <div
              class={`absolute left-1/2 -translate-x-1/2 bottom-full mb-2 flex-col items-center z-20 w-max max-w-xs pointer-events-none transition-all ${
                showTooltip() ? "flex" : "hidden sm:group-hover:flex"
              }`}
            >
              <div class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#16171b] border border-[#22242a] shadow-xl text-[11px] text-[#8a8f9d]">
                <i class="bx bxl-discord text-[#5865F2] text-sm shrink-0" />
                <span>Status & custom status are synced directly from Discord</span>
              </div>
              <div class="w-2 h-2 -mt-1 rotate-45 bg-[#16171b] border-r border-b border-[#22242a]" />
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-center mb-6 sm:mb-12">
        <div class="grid grid-cols-2 bg-[#16171b] p-1.5 rounded-xl border border-[#22242a] shadow-inner w-full max-w-xs sm:w-auto sm:flex">
          <button
            onClick={() => {
              setActiveTab("supporters");
              setShowAllMembers(false);
            }}
            class={`py-3 sm:py-2.5 px-6 sm:px-8 text-xs font-bold uppercase tracking-wider rounded-lg transition-all text-center min-h-[44px] sm:min-h-0 ${
              activeTab() === "supporters"
                ? "bg-[#a100ed] text-white shadow-lg shadow-[#a100ed]/30"
                : "text-[#8a8f9d] hover:text-white"
            }`}
          >
            Supporters
          </button>
          <button
            onClick={() => {
              setActiveTab("staff");
              setShowAllMembers(false);
            }}
            class={`py-3 sm:py-2.5 px-6 sm:px-8 text-xs font-bold uppercase tracking-wider rounded-lg transition-all text-center min-h-[44px] sm:min-h-0 ${
              activeTab() === "staff"
                ? "bg-[#a100ed] text-white shadow-lg shadow-[#a100ed]/30"
                : "text-[#8a8f9d] hover:text-white"
            }`}
          >
            Staff
          </button>
        </div>
      </div>

      <Show
        when={!discordData.loading}
        fallback={
          <div class="flex items-center justify-center text-[#8a8f9d] text-xs py-10 gap-2">
            <i class="bx bx-loader-alt animate-spin text-lg text-[#a100ed]" />
            <span>Loading...</span>
          </div>
        }
      >
        <div class="relative">
          <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
            <For each={visibleMembers()}>
              {(member) => {
                const ext = member.avatar?.startsWith("a_") ? "gif" : "png";
                const avatarUrl = `https://cdn.discordapp.com/avatars/${member.id}/${member.avatar}.${ext}`;

                return (
                  <div class="relative flex flex-col items-center p-3.5 sm:p-5 rounded-2xl bg-[#16171b] border border-[#22242a] hover:border-[#a100ed]/50 active:scale-[0.98] sm:active:scale-100 sm:hover:-translate-y-1 sm:hover:shadow-xl sm:hover:shadow-[#a100ed]/5 transition-all duration-200 overflow-hidden group">
                    <div
                      class="absolute top-0 left-0 right-0 h-1"
                      style={{ "background-color": member.color }}
                    />

                    <div class="relative mb-2 sm:mb-3 mt-1">
                      <img
                        src={avatarUrl}
                        alt={member.name}
                        class="h-14 w-14 sm:h-16 sm:w-16 rounded-full border-2 border-[#2c2f36] object-cover shadow-md group-hover:border-[#a100ed]/50 transition-colors"
                        loading="lazy"
                      />
                      <span
                        class={`absolute bottom-0.5 right-0.5 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border-2 border-[#16171b] shadow-sm ${getStatusColor(
                          member.status
                        )}`}
                      />
                    </div>

                    <div class="w-full text-center min-w-0">
                      <div class="text-xs sm:text-sm font-bold text-white truncate px-1">
                        {member.name}
                      </div>

                      <div
                        class="text-[10px] sm:text-xs font-semibold uppercase tracking-wider mt-0.5 truncate"
                        style={{ color: member.color }}
                      >
                        {member.rank}
                      </div>

                      <Show when={member.custom_status}>
                        <div class="text-[10px] sm:text-[11px] text-[#8a8f9d] italic truncate mt-1.5 sm:mt-2 px-1.5 sm:px-2 py-1 rounded-md bg-[#111215]/60 border border-[#22242a]">
                          "{member.custom_status}"
                        </div>
                      </Show>
                    </div>
                  </div>
                );
              }}
            </For>
          </div>

          <Show when={currentMembers().length > 8}>
            <div
              class={`flex flex-col items-center justify-end transition-all duration-300 ${
                !showAllMembers()
                  ? "absolute bottom-0 left-0 right-0 h-32 sm:h-40 bg-gradient-to-t from-[#111215] via-[#111215]/80 to-transparent backdrop-blur-[1px] pointer-events-none"
                  : "mt-8"
              }`}
            >
              <button
                onClick={() => setShowAllMembers(!showAllMembers())}
                aria-label={showAllMembers() ? "Show less" : "Show more"}
                class="pointer-events-auto flex items-center justify-center gap-2 px-4 py-2 sm:w-10 sm:h-10 min-h-[44px] sm:min-h-0 rounded-full bg-[#16171b] hover:bg-[#1f2127] active:bg-[#252830] text-white text-xs border border-[#22242a] hover:border-[#a100ed]/50 shadow-xl transition-all duration-200 hover:scale-105 group mb-2"
              >
                <span class="sm:hidden font-semibold">
                  {showAllMembers() ? "Show Less" : "Show More"}
                </span>
                <i
                  class={`bx bx-chevron-down text-lg sm:text-xl text-[#8a8f9d] group-hover:text-white transition-transform duration-300 ${
                    showAllMembers() ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>
            </div>
          </Show>
        </div>
      </Show>
    </section>
  );
}
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
    <section class="max-w-7xl mx-auto px-6 py-16 border-b border-[#22242a]">
      <div class="text-center mb-10">
        <h2 class="text-2xl sm:text-3xl font-bold uppercase tracking-wider text-white">
          Community
        </h2>
        <div class="flex items-center justify-center gap-2 mt-2">
          <p class="text-xs sm:text-sm text-[#8a8f9d]">
            Meet our server supporters and staff team!
          </p>

          <div class="relative flex items-center group">
            <i class="bx bx-info-circle text-base text-[#8a8f9d] group-hover:text-white transition-colors cursor-pointer" />

            <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:flex flex-col items-center z-20 w-max pointer-events-none">
              <div class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#16171b] border border-[#22242a] shadow-xl text-[11px] text-[#8a8f9d]">
                <i class="bx bxl-discord text-[#5865F2] text-sm" />
                <span>Status & custom status are synced directly from Discord</span>
              </div>
              <div class="w-2 h-2 -mt-1 rotate-45 bg-[#16171b] border-r border-b border-[#22242a]" />
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-center mb-12">
        <div class="flex bg-[#16171b] p-1.5 rounded-xl border border-[#22242a] shadow-inner">
          <button
            onClick={() => {
              setActiveTab("supporters");
              setShowAllMembers(false);
            }}
            class={`px-8 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
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
            class={`px-8 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
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
          <div class="flex justify-center text-[#8a8f9d] text-xs py-10">
            Loading...
          </div>
        }
      >
        <div class="relative">
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            <For each={visibleMembers()}>
              {(member) => {
                const ext = member.avatar?.startsWith("a_") ? "gif" : "png";
                const avatarUrl = `https://cdn.discordapp.com/avatars/${member.id}/${member.avatar}.${ext}`;

                return (
                  <div class="relative flex flex-col items-center p-5 rounded-2xl bg-[#16171b] border border-[#22242a] hover:border-[#a100ed]/50 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#a100ed]/5 overflow-hidden group">
                    <div
                      class="absolute top-0 left-0 right-0 h-1"
                      style={{ "background-color": member.color }}
                    />

                    <div class="relative mb-3 mt-1">
                      <img
                        src={avatarUrl}
                        alt={member.name}
                        class="h-16 w-16 rounded-full border-2 border-[#2c2f36] object-cover shadow-md group-hover:border-[#a100ed]/50 transition-colors"
                      />
                      <span
                        class={`absolute bottom-0.5 right-0.5 w-4 h-4 rounded-full border-2 border-[#16171b] shadow-sm ${getStatusColor(
                          member.status
                        )}`}
                      />
                    </div>

                    <div class="w-full text-center min-w-0">
                      <div class="text-sm font-bold text-white truncate px-1">
                        {member.name}
                      </div>

                      <div
                        class="text-xs font-semibold uppercase tracking-wider mt-0.5"
                        style={{ color: member.color }}
                      >
                        {member.rank}
                      </div>

                      <Show when={member.custom_status}>
                        <div class="text-[11px] text-[#8a8f9d] italic truncate mt-2 px-2 py-1 rounded-md bg-[#111215]/60 border border-[#22242a]">
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
                  ? "absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#111215] via-[#111215]/80 to-transparent backdrop-blur-[1px] pointer-events-none"
                  : "mt-8"
              }`}
            >
              <button
                onClick={() => setShowAllMembers(!showAllMembers())}
                aria-label={showAllMembers() ? "Show less" : "Show more"}
                class="pointer-events-auto flex items-center justify-center w-10 h-10 rounded-full bg-[#16171b] hover:bg-[#1f2127] text-white border border-[#22242a] hover:border-[#a100ed]/50 shadow-xl transition-all duration-200 hover:scale-110 group mb-2"
              >
                <i
                  class={`bx bx-chevron-down text-xl text-[#8a8f9d] group-hover:text-white transition-transform duration-300 ${
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
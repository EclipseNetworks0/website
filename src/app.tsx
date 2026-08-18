import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import { MetaProvider, Title, Meta } from "@solidjs/meta";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
import "boxicons/css/boxicons.min.css";
import "./app.css";

export default function App() {
  return (
    <MetaProvider>
      <Title>Eclipse Networks</Title>
      <Meta name="description" content="An Australian semi-serious FiveM roleplay server where community and enjoyment come first!" />
      <Meta name="theme-color" content="#a100ed" />
      <Meta property="og:site_name" content="Eclipse Networks" />
      <Meta property="og:title" content="Eclipse Networks" />
      <Meta property="og:description" content="An Australian semi-serious FiveM roleplay server where community and enjoyment come first!" />
      <Meta property="og:type" content="website" />

      <Router
        root={(props) => (
          <div class="flex min-h-screen flex-col bg-[#111215]">
            <Navbar />
            <main class="flex-1">
              <Suspense>{props.children}</Suspense>
            </main>
            <Footer />
          </div>
        )}
      >
        <FileRoutes />
      </Router>
    </MetaProvider>
  );
}
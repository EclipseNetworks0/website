import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import { MetaProvider } from "@solidjs/meta";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
import "boxicons/css/boxicons.min.css";
import "./app.css";

export default function App() {
  return (
    <MetaProvider>
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
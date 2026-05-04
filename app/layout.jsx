import "./globals.css";
import NavBar from "./components/NavBar";
import Providers from "./components/Providers";

export const metadata = {
  title: "Movies",
  description: "Discover, favorite, and track watched movies.",
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark" style={{ colorScheme: "dark" }} suppressHydrationWarning>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var k="theme";var t=localStorage.getItem(k);if(t!=="light"&&t!=="dark"){t=window.matchMedia&&window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"}document.documentElement.dataset.theme=t;document.documentElement.style.colorScheme=t}catch(e){}})();`,
          }}
        />
        <Providers>
          <NavBar />
          <main className="mx-auto flex w-full max-w-[1400px] flex-1 flex-col p-4 md:p-8">{children}</main>
        </Providers>
      </body>
    </html>
  );
}


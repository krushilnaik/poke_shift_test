import classNames from "classnames";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Mooli&display=swap"
          rel="stylesheet"
        ></link>
      </head>
      <body
        className={classNames(
          // background
          "bg-gradient-to-tr from-rose-950 to-black text-white min-h-screen",
          // scrollbar
          "scrollbar-thin scrollbar-track-black scrollbar-thumb-slate-400 scrollbar-thumb-rounded-full"
        )}
      >
        {children}
      </body>
    </html>
  );
}

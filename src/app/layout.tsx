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
      <body className="bg-gradient-to-tr from-rose-950 to-black text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}

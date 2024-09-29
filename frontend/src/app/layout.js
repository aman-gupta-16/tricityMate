import Header from "@/components/Header";
import "./globals.css";

export const metadata = {
  title: "TricityMate",
  description: "Tourist Guide Web App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}

import Header from "@/components/Header";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext.js";

export const metadata = {
  title: "TricityMate",
  description: "Tourist Guide Web App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body>
        <AuthProvider>
          <Header />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

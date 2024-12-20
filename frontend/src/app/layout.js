import Header from "@/components/Header";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "@/components/Footer";

export const metadata = {
  title: "TricityMate",
  description: "Tourist Guide Web App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body>
        <AuthProvider>
          {/* <Header /> */}
          {children}
          <Footer />
          <ToastContainer />
        </AuthProvider>
      </body>
    </html>
  );
}

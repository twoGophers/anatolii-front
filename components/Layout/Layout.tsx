import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container">
      <Header />
      <div className="main">
        {children}
      </div>
      <Footer />
    </div>
  );
}

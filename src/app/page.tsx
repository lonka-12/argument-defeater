import MainTitle from "@/components/MainTitle";
import Navbar from "@/components/Navbar";
import PromoBanner from "@/components/PromoBanner";

export default function Home() {
  return (
    <div className="home-layout">
      <Navbar />
      <PromoBanner />
      <MainTitle />
    </div>
  );
}

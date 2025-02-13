import Hero from "@/components/blocks/Hero";
import { Navbar } from "@/components/blocks/Navbar";
import { Footer } from "@/components/blocks/Footer";
import Team from "@/components/blocks/Team";

const Landing: React.FC = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Team />
      <Footer />
    </>
  );
};

export default Landing;

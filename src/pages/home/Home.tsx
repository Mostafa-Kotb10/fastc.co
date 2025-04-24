import Header from "@/components/Header";
import Hero from "./Hero";
import StackedFeaturesSection from "./StackedFeaturesSection";
import TestimonialSection from "./TestimonialSection";
import FrequentlyAsked from "./FrequentlyAsked";
import Footer from "./Footer";

const Home = () => {
  return (
    <>
      <Header />
      <Hero />
      <StackedFeaturesSection />
      <TestimonialSection />
      <FrequentlyAsked />
      <Footer />
    </>
  );
};

export default Home;

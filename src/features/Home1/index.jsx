import Hero from "./Hero";
import PrefixHero from "./PrefixHero";
import SecondHero from "./SecondHero";
import ThirdHero from "./ThirdHero";
import FourthHero from "./FourthHero";
import FifthHero from "./FifthHero";
import SixthHero from "./SixthHero";
import Footer from "../../component/Reuseables/Footer";


const Home1 = () => {
    return(
      <>
          <Hero/>
          <PrefixHero/>
          <SecondHero/>
          <ThirdHero/>
          <FourthHero/>
          <FifthHero/>
          <SixthHero/>
          <Footer/>
      </>
    );
}
export default Home1;
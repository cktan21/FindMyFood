import HomePage from "@/components/blocks/HomePage";
import { RestaurantsProvider } from "@/context/RestaurantsContext";

const Home: React.FC = () => {
  return (
    <>
      <RestaurantsProvider>
       <HomePage />
      </RestaurantsProvider>
    </>
  );
};

export default Home;

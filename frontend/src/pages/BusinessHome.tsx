import BusinessHomePage from "@/components/blocks/BusinessHomePage";
import { RestaurantsProvider } from "@/context/RestaurantsContext";

const Home: React.FC = () => {
  return (
    <>
      <RestaurantsProvider>
        <BusinessHomePage />
      </RestaurantsProvider>
    </>
  );
};

export default Home;

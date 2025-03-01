import RestaurantsPage from "@/components/blocks/RestaurantsPage";
import { RestaurantsProvider } from "@/context/RestaurantsContext";

const Restaurants: React.FC = () => {
  return (
    <>
      <RestaurantsProvider>
        <RestaurantsPage />
      </RestaurantsProvider>
    </>
  );
};

export default Restaurants;

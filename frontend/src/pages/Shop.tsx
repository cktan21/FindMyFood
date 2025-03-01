import ShopPage from "@/components/blocks/ShopPage";
import { RestaurantsProvider } from "@/context/RestaurantsContext";

const Shop: React.FC = () => {
  return (
    <>
      <RestaurantsProvider>
       <ShopPage />
      </RestaurantsProvider>
    </>
  );
};

export default Shop;

import ProductPage from "@/components/blocks/ProductPage";
import { RestaurantsProvider } from "@/context/RestaurantsContext";

const Product: React.FC = () => {
  return (
    <>
      <RestaurantsProvider>
       <ProductPage />
      </RestaurantsProvider>
    </>
  );
};

export default Product;

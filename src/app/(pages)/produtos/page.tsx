import ProductsList from "@/components/ProductsList";

function Products() {
  return ( 
    <div className="p-2">
      <ProductsList viewMode="all" enableSearch/>
    </div>
   );
}

export default Products;
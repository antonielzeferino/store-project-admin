import PromotionalProducts from "@/components/ProductsList";

const Home = () => {
  return (
    <div>
      <main className="container py-4 px-2 mx-auto">
        <h2 className="text-2xl font-bold text-center mb-6">
          Produtos em Promoção
        </h2>
        <PromotionalProducts viewMode="promotions"/>
      </main>
    </div>
  );
};

export default Home;

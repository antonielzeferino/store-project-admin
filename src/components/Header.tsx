const Header = () => {
  return (
    <header className="bg-blue-600 text-white">
      <div className="container mx-auto flex flex-wrap justify-center sm:justify-between gap-x-5 items-center py-4 px-6">
        <h1 className="text-xl font-bold">
          <a href="/">Doce Essencia Admin</a>
        </h1>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <a
                href="/"
                className="hover:underline hover:text-yellow-300 transition-colors"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/create-product"
                className="hover:underline hover:text-yellow-300 transition-colors"
              >
                Adicionar Produtos
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;

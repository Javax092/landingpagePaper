import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]); // Inicializado como array vazio
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      // Ajustado para a rota correta do seu backend
      const response = await api.get("/produtos/listar");

      // Garante que pegamos um array independente da estrutura da resposta
      const data = Array.isArray(response.data)
        ? response.data
        : response.data?.data || [];

      setProducts(data);
      setError(null);
    } catch (err) {
      console.error("Erro ao buscar produtos:", err);
      setError("Não foi possível carregar as novidades.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const featuredProducts = useMemo(() => {
    if (!Array.isArray(products)) return [];
    // Pega os últimos 4 produtos cadastrados no Atlas
    return [...products].slice(-4).reverse();
  }, [products]);

  return (
    <div className="flex flex-col w-full bg-branco-neve">
      {/* --- HERO SECTION --- */}
      <section className="relative overflow-hidden bg-white pt-16 pb-24 md:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left flex flex-col justify-center">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-rosa-claro/10 text-rosa-claro mb-6 w-fit sm:mx-auto lg:mx-0 uppercase tracking-wider border border-rosa-claro/20">
                ✨ Feito à mão com amor em Manaus
              </span>
              <h1 className="text-4xl tracking-tight font-black text-gray-900 sm:text-6xl leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-pink-500 to-pink-400">
                  Papelaria que
                </span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-700 via-pink-600 to-pink-400 drop-shadow-sm">
                  inspira sua arte.
                </span>
              </h1>
              <p className="mt-6 text-lg text-gray-500 sm:text-xl leading-relaxed">
                Tudo para o seu bullet journal, scrapbooking e presentes
                personalizados. Transforme papel em memórias.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-4">
                <Link
                  to="/loja"
                  className="flex items-center justify-center px-8 py-4 text-base font-bold rounded-2xl text-white bg-rosa-claro hover:bg-pink-400 transition-all transform hover:scale-105 shadow-xl shadow-pink-100"
                >
                  Ver Coleção
                </Link>
                <button className="flex items-center justify-center px-8 py-4 border border-rosa-claro/20 text-base font-bold rounded-2xl text-rosa-claro bg-white hover:bg-rosa-claro/5 transition-all">
                  Encomendas
                </button>
              </div>

              <div className="mt-12 grid grid-cols-3 gap-8 border-t border-gray-100 pt-8">
                <StatItem value="+2k" label="Artes" />
                <StatItem value="100%" label="Artesanal" />
                <StatItem value="5.0" label="Avaliação" />
              </div>
            </div>

            <div className="mt-16 relative lg:mt-0 lg:col-span-6 flex items-center justify-center">
              <div className="relative w-full max-w-[500px] aspect-square rounded-[2rem] shadow-2xl overflow-hidden group border-4 border-white">
                <img
                  className="w-full h-full object-cover transform transition duration-1000 group-hover:scale-110"
                  src="http://localhost:5000/uploads/BrunaPaper.png"
                  alt="Artesanato Personalizado BrunaPaper"
                  // Fallback para caso o arquivo BrunaPaper.png não exista na pasta
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/500x500?text=ShopVision";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pink-900/40 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 text-white">
                  <p className="text-sm font-semibold uppercase tracking-widest text-rosa-claro mb-1">
                    Destaque do Mês
                  </p>
                  <p className="text-xl font-bold">
                    Personalize o seu dia-a-dia
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- GRID DE DESTAQUES --- */}
      <section className="py-24 bg-branco-neve">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-gray-800 tracking-tight">
              Recém Saídos do{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-pink-400">
                Ateliê
              </span>
            </h2>
            <div className="h-1.5 w-24 bg-gradient-to-r from-pink-500 to-rosa-claro mx-auto mt-4 rounded-full" />
          </header>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-[2.5rem] p-4 shadow-sm border border-rosa-claro/10"
                >
                  <div className="w-full aspect-square bg-gray-100 animate-pulse rounded-[2rem] mb-4" />
                  <div className="h-4 w-2/3 bg-gray-100 animate-pulse rounded mb-2" />
                  <div className="h-4 w-1/2 bg-gray-100 animate-pulse rounded" />
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="bg-pink-50/50 backdrop-blur-sm p-12 rounded-[3rem] text-center border border-rosa-claro/20">
              <p className="text-pink-600 font-bold text-lg mb-4">✨ {error}</p>
              <button
                onClick={fetchProducts}
                className="px-6 py-2 bg-white text-pink-600 rounded-full shadow-md hover:shadow-lg transition-all font-bold text-sm"
              >
                Tentar novamente
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product._id} // CORREÇÃO: Usando _id do MongoDB
                  product={{
                    ...product,
                    name: product.nome, // Mapeando para o componente entender
                    price: product.preco,
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* --- SEÇÃO DE BENEFÍCIOS --- */}
      <section className="bg-white py-24 border-t border-rosa-claro/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <BenefitCard
              icon="🎨"
              title="Criação Exclusiva"
              desc="Cada peça é única e produzida com técnicas de scrapbook."
            />
            <BenefitCard
              icon="🎁"
              title="Embalagem para Presente"
              desc="Enviamos tudo pronto para surpreender quem você ama."
            />
            <BenefitCard
              icon="💖"
              title="Apoie o Artesanal"
              desc="Produtos feitos à mão com materiais de alta qualidade."
            />
          </div>
        </div>
      </section>
    </div>
  );
};

/* --- SUB-COMPONENTES --- */
const StatItem = ({ value, label }) => (
  <div className="text-center lg:text-left">
    <p className="text-2xl font-black text-rosa-claro">{value}</p>
    <p className="text-xs uppercase tracking-widest font-bold text-gray-400 mt-1">
      {label}
    </p>
  </div>
);

const BenefitCard = ({ icon, title, desc }) => (
  <div className="flex flex-col items-center text-center p-6 bg-branco-neve/50 rounded-3xl hover:shadow-lg transition-shadow">
    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-sm border border-rosa-claro/10">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
    <p className="text-gray-500 leading-relaxed text-sm">{desc}</p>
  </div>
);

export default Home;

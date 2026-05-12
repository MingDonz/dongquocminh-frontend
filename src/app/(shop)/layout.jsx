import Footer from "@/components/shop/Footer";
import Header from "@/components/shop/Header";
import { CartProvider } from "@/context/CartContext";

export default function ShopLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <CartProvider>
        <Header />
        <main className="flex-1 py-8 w-full">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
        <Footer />
      </CartProvider>
    </div>
  );
} 
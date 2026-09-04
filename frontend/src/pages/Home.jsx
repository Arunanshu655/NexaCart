import { Link } from "react-router-dom";
import { ArrowRight, ShoppingBag, ShieldCheck, Headphones } from "lucide-react";

import { useAuth } from "../context/AuthContext";
// import Container from "../components/ui/Container";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

const Home = () => {
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="space-y-16">

      {/* Hero */}
      <section className="relative overflow-hidden rounded-[10px] bg-white px-6 py-16 shadow-sm sm:px-12 lg:px-20 lg:py-24">

        <div className="max-w-3xl">

          <p className="mb-4 text-sm font-medium text-[var(--primary)]">
            Welcome to {import.meta.env.VITE_BRAND_NAME}
          </p>

          <h1 className="text-4xl font-semibold tracking-tight text-[var(--text)] sm:text-5xl lg:text-6xl">
            {user
              ? `Welcome back, ${user.name}`
              : "Everything you need, in one place."
            }
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-[var(--muted)] sm:text-lg">
            Discover products, connect with sellers, manage your orders,
            and enjoy a seamless shopping experience.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">

            <Link to="/products">
              <Button>
                Explore Products
                <ArrowRight size={17} className="ml-2" />
              </Button>
            </Link>

            {!isAuthenticated && (
              <Link to="/register">
                <Button variant="outline">
                  Create Account
                </Button>
              </Link>
            )}

          </div>

        </div>

      </section>

      {/* Features */}
      <section>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold">
            Why {import.meta.env.VITE_BRAND_NAME}?
          </h2>

          <p className="mt-2 text-sm text-[var(--muted)]">
            Everything designed around a simple shopping experience.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

          <Card>
            <ShoppingBag
              size={28}
              className="text-[var(--primary)]"
            />

            <h3 className="mt-5 text-lg font-semibold">
              Easy Shopping
            </h3>

            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
              Browse products, manage your cart and place orders
              with just a few clicks.
            </p>
          </Card>

          <Card>
            <ShieldCheck
              size={28}
              className="text-[var(--primary)]"
            />

            <h3 className="mt-5 text-lg font-semibold">
              Secure Accounts
            </h3>

            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
              Authentication and authorization keep your account
              and shopping experience protected.
            </p>
          </Card>

          <Card>
            <Headphones
              size={28}
              className="text-[var(--primary)]"
            />

            <h3 className="mt-5 text-lg font-semibold">
              Seller & Support Chat
            </h3>

            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
              Connect with sellers and get support through
              realtime conversations.
            </p>
          </Card>

        </div>

      </section>

    </div>
  );
};

export default Home;
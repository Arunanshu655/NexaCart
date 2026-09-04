import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client/react";
import {
  ShoppingCart,
  MessageCircle,
  Package,
  Search,
  Menu,
  X,
  User,
  Store,
  LogOut,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import {GET_CART} from '../graphql/queries'
const Navbar = () => {
  const navigate = useNavigate();

  const { user, isAuthenticated, logout } = useAuth();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState("");

  const { data: cartData } = useQuery(GET_CART, {
    skip: !isAuthenticated,
    fetchPolicy: "cache-and-network",
  });

  const cartItems = cartData?.cart?.items || [];

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleLogout = () => {
    logout();
    setMobileOpen(false);
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (!search.trim()) return;

    navigate(`/products?search=${encodeURIComponent(search.trim())}`);
    setSearch("");
    setMobileOpen(false);
  };

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-2 text-sm font-medium transition-colors duration-200 ${
      isActive
        ? "text-[var(--primary)]"
        : "text-[var(--text)] hover:text-[var(--primary)]"
    }`;

  return (
    <nav
      className="
        sticky top-0 z-50
        w-full
        border-b border-[var(--border)]
        bg-white/85
        backdrop-blur-xl
      "
    >
      <div
        className="
          max-w-7xl mx-auto
          h-[72px]
          px-4 sm:px-6 lg:px-8
          flex items-center justify-between
        "
      >
        {/* Logo */}
        <Link
          to="/"
          className="
            text-2xl font-semibold
            tracking-tight
            text-[var(--primary)]
            shrink-0
          "
        >
          {import.meta.env.VITE_BRAND_NAME}
        </Link>

        {/* Desktop Search */}
        <form
          onSubmit={handleSearch}
          className="
            hidden md:flex
            items-center
            w-full max-w-md
            mx-8
          "
        >
          <div className="relative w-full">
            <Search
              size={18}
              className="
                absolute left-4 top-1/2
                -translate-y-1/2
                text-[var(--muted)]
              "
            />

            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
                w-full
                rounded-full
                border border-[var(--border)]
                bg-[var(--background)]
                py-2.5 pl-11 pr-4
                text-sm
                outline-none
                transition-all duration-200
                focus:border-[var(--primary)]
                focus:ring-2
                focus:ring-blue-100
              "
            />
          </div>
        </form>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6">

          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>

          <NavLink to="/products" className={navLinkClass}>
            Products
          </NavLink>

          {isAuthenticated && (
            <>
              <NavLink to="/orders" className={navLinkClass}>
                <Package size={17} />
                Orders
              </NavLink>

              <NavLink to="/chat" className={navLinkClass}>
                <MessageCircle size={17} />
                Chat
              </NavLink>

              <NavLink to="/cart" className={navLinkClass}>
                <div className="relative">
                  <ShoppingCart size={19} />

                  {cartCount > 0 && (
                    <span
                      className="
                        absolute -top-2 -right-2
                        min-w-4 h-4
                        px-1
                        flex items-center justify-center
                        rounded-full
                        bg-[var(--danger)]
                        text-white
                        text-[10px]
                        font-semibold
                      "
                    >
                      {cartCount > 99 ? "99+" : cartCount}
                    </span>
                  )}
                </div>

                Cart
              </NavLink>

              {user?.role === "seller" && (
                <NavLink to="/dashboard" className={navLinkClass}>
                  <Store size={17} />
                  Dashboard
                </NavLink>
              )}
            </>
          )}

        </div>

        {/* Desktop User Section */}
        <div className="hidden lg:flex items-center gap-3 ml-6">

          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className="
                  rounded-full
                  px-5 py-2
                  text-sm font-medium
                  text-[var(--text)]
                  hover:bg-gray-100
                  transition-all duration-200
                "
              >
                Login
              </Link>

              <Link
                to="/register"
                className="
                  rounded-full
                  bg-[var(--primary)]
                  px-5 py-2
                  text-sm font-medium
                  text-white
                  hover:bg-[var(--primary-hover)]
                  transition-all duration-200
                "
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <div
                className="
                  flex items-center gap-2
                  rounded-full
                  bg-[var(--background)]
                  px-3 py-2
                "
              >
                <div
                  className="
                    h-8 w-8
                    rounded-full
                    bg-[var(--primary)]
                    text-white
                    flex items-center justify-center
                  "
                >
                  <User size={16} />
                </div>

                <div className="max-w-[120px]">
                  <p className="text-xs text-[var(--muted)]">
                    Welcome
                  </p>

                  <p className="text-sm font-medium truncate">
                    {user?.name}
                  </p>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="
                  flex items-center gap-2
                  rounded-full
                  border border-[var(--border)]
                  px-4 py-2
                  text-sm
                  hover:bg-gray-100
                  transition-all duration-200
                "
              >
                <LogOut size={16} />
                Logout
              </button>
            </>
          )}

        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="
            lg:hidden
            rounded-full
            p-2
            hover:bg-gray-100
            transition-all duration-200
          "
        >
          {mobileOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className="
            lg:hidden
            border-t border-[var(--border)]
            bg-white
            px-4 py-5
          "
        >

          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="mb-5">
            <div className="relative">
              <Search
                size={18}
                className="
                  absolute left-4 top-1/2
                  -translate-y-1/2
                  text-[var(--muted)]
                "
              />

              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="
                  w-full
                  rounded-full
                  border border-[var(--border)]
                  bg-[var(--background)]
                  py-3 pl-11 pr-4
                  outline-none
                  focus:border-[var(--primary)]
                "
              />
            </div>
          </form>

          <div className="flex flex-col gap-2">

            <NavLink
              to="/"
              onClick={() => setMobileOpen(false)}
              className={navLinkClass}
            >
              Home
            </NavLink>

            <NavLink
              to="/products"
              onClick={() => setMobileOpen(false)}
              className={navLinkClass}
            >
              Products
            </NavLink>

            {isAuthenticated && (
              <>
                <NavLink
                  to="/cart"
                  onClick={() => setMobileOpen(false)}
                  className={navLinkClass}
                >
                  <ShoppingCart size={17} />
                  Cart ({cartCount})
                </NavLink>

                <NavLink
                  to="/orders"
                  onClick={() => setMobileOpen(false)}
                  className={navLinkClass}
                >
                  <Package size={17} />
                  Orders
                </NavLink>

                <NavLink
                  to="/chat"
                  onClick={() => setMobileOpen(false)}
                  className={navLinkClass}
                >
                  <MessageCircle size={17} />
                  Chat
                </NavLink>

                {user?.role === "seller" && (
                  <NavLink
                    to="/dashboard"
                    onClick={() => setMobileOpen(false)}
                    className={navLinkClass}
                  >
                    <Store size={17} />
                    Dashboard
                  </NavLink>
                )}

                <button
                  onClick={handleLogout}
                  className="
                    mt-2
                    flex items-center gap-2
                    rounded-full
                    border border-[var(--border)]
                    px-4 py-2.5
                    text-sm
                    hover:bg-gray-100
                  "
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </>
            )}

            {!isAuthenticated && (
              <div className="flex gap-3 mt-3">

                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="
                    flex-1
                    text-center
                    rounded-full
                    border border-[var(--border)]
                    py-2.5
                  "
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={() => setMobileOpen(false)}
                  className="
                    flex-1
                    text-center
                    rounded-full
                    bg-[var(--primary)]
                    text-white
                    py-2.5
                  "
                >
                  Register
                </Link>

              </div>
            )}

          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
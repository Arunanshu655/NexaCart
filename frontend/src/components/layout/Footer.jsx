import {
  GitBranchIcon,
    Link2Icon,
  Mail,
  ShoppingBag,
} from "lucide-react";



const Footer = () => {
  return (
    <footer className="mt-auto w-full border-t border-[var(--border)] bg-white">

      <div className="w-full px-4 py-10 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--primary)] text-white">
                <ShoppingBag size={18} />
              </div>

              <h2 className="text-xl font-semibold text-[var(--text)]">
                NexaCart
              </h2>
            </div>

            <p className="mt-4 max-w-xs text-sm leading-6 text-[var(--muted)]">
              A modern ecommerce platform for seamless shopping,
              seller interaction, and real-time support.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold">
              Explore
            </h3>

            <div className="mt-4 flex flex-col gap-3 text-sm text-[var(--muted)]">
              <a
                href="/"
                className="transition-colors hover:text-[var(--primary)]"
              >
                Home
              </a>

              <a
                href="/products"
                className="transition-colors hover:text-[var(--primary)]"
              >
                Products
              </a>

              <a
                href="/orders"
                className="transition-colors hover:text-[var(--primary)]"
              >
                Orders
              </a>

              <a
                href="/chat"
                className="transition-colors hover:text-[var(--primary)]"
              >
                Chat
              </a>
            </div>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-sm font-semibold">
              Account
            </h3>

            <div className="mt-4 flex flex-col gap-3 text-sm text-[var(--muted)]">
              <a
                href="/login"
                className="transition-colors hover:text-[var(--primary)]"
              >
                Login
              </a>

              <a
                href="/register"
                className="transition-colors hover:text-[var(--primary)]"
              >
                Register
              </a>

              <a
                href="/cart"
                className="transition-colors hover:text-[var(--primary)]"
              >
                Cart
              </a>
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm font-semibold">
              Connect
            </h3>

            <div className="mt-4 flex gap-3">

              <a
                href="#"
                aria-label="GitHub"
                className="
                  flex h-10 w-10 items-center justify-center
                  rounded-full
                  border border-[var(--border)]
                  text-[var(--muted)]
                  transition-all duration-200
                  hover:-translate-y-0.5
                  hover:border-[var(--primary)]
                  hover:text-[var(--primary)]
                "
              >
                <GitBranchIcon size={18} />
              </a>

              <a
                href="#"
                aria-label="LinkedIn"
                className="
                  flex h-10 w-10 items-center justify-center
                  rounded-full
                  border border-[var(--border)]
                  text-[var(--muted)]
                  transition-all duration-200
                  hover:-translate-y-0.5
                  hover:border-[var(--primary)]
                  hover:text-[var(--primary)]
                "
              >
                <Link2Icon size={18} />
              </a>

              <a
                href="#"
                aria-label="Email"
                className="
                  flex h-10 w-10 items-center justify-center
                  rounded-full
                  border border-[var(--border)]
                  text-[var(--muted)]
                  transition-all duration-200
                  hover:-translate-y-0.5
                  hover:border-[var(--primary)]
                  hover:text-[var(--primary)]
                "
              >
                <Mail size={18} />
              </a>

            </div>
          </div>

        </div>

        {/* Bottom */}
        <div
          className="
            mt-10
            flex flex-col gap-3
            border-t border-[var(--border)]
            pt-6
            text-sm text-[var(--muted)]
            sm:flex-row sm:items-center sm:justify-between
          "
        >
          <p>
            © {new Date().getFullYear()} NexaCart. All rights reserved.
          </p>

          <p>
            Built with MERN + GraphQL
          </p>
        </div>

      </div>

    </footer>
  );
};

export default Footer;
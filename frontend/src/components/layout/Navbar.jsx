const Navbar = () => {

    return (

        <nav
            className="
                fixed
                top-0
                left-0
                right-0
                h-[72px]
                bg-white
                border-b
                border-[var(--border)]
                flex
                items-center
                justify-center
                z-50
            "
        >

            <h2 className="text-2xl font-semibold text-[var(--primary)]">

                ShopSphere

            </h2>

        </nav>

    );

};

export default Navbar;
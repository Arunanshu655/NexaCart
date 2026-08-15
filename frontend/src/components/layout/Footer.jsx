const Footer = () => {

    return (

        <footer
            className="
                bg-white
                border-t
                border-[var(--border)]
                py-6
                text-center
                text-sm
                text-[var(--muted)]
            "
        >

            © {new Date().getFullYear()} NexaCart.
            All Rights Reserved.

        </footer>

    );

};

export default Footer;
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const MainLayout = ({ children }) => {

    return (

        <div className="min-h-screen flex flex-col bg-[var(--background)]">

            <Navbar />

            <main className="flex-1 pt-[72px]">

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                    {children}

                </div>

            </main>

            <Footer />

        </div>

    );

};

export default MainLayout;
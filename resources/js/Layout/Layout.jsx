import { Link } from '@inertiajs/react';

export default function Layout({ children }) {
    return (
        <div className="min-h-screen flex flex-col">
            <header className="bg-gray-800 text-white p-4">
                <nav className="flex space-x-4">
                    <Link href="/" className="hover:text-gray-400">Home</Link>
                    <Link href="/about" className="hover:text-gray-400">About</Link>
                    <Link href="/contact" className="hover:text-gray-400">Contact</Link>
                </nav>
            </header>

            <main className="flex-1 p-4">
                {children}
            </main>

            <footer className="bg-gray-800 text-white p-4 text-center">
                &copy; 2024 MyApp
            </footer>
        </div>
    );
}
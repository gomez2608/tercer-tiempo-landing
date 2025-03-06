
export default function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="w-full p-4 text-center bg-white shadow-md mt-10">
            <p>© {currentYear} Tercer tiempo. All rights reserved.</p>
        </footer>
    );
}
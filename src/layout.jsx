import NavBar from "./components/nav";
import { ProtectedRoute } from "./routes/ProtectedRoute";

export default function Layout({ children }) {
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow"><ProtectedRoute /></main>
            <NavBar />
        </div>
    );
}

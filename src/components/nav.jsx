import { Button } from "@/components/ui/button";
import { useAuth } from "@/authProvider";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function NavBar(){
    
    const { token,setToken }=useAuth();
    const decoded=token ? jwtDecode(token) : {};
    const {name,email}=decoded;
    const navigate = useNavigate();

    const handleLogout = () => {
        setToken(null);
        navigate("/", { replace: true });
    };


    return (
        <div className="fixed bottom-0 left-0 w-full p-4 flex justify-between items-center bg-white">
            <div>
                <p className="text-sm">Logged in as {name} ({email})</p>
            </div>
            <Button onClick={handleLogout} className="hover:bg-red-600">
                Logout
            </Button>
        </div>
    );

}
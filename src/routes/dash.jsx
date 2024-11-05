//import { Helmet } from "react-helmet"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"
import { ChevronRightIcon } from "@primer/octicons-react"
import { Link } from "react-router-dom"
import { jwtDecode } from "jwt-decode"; 
import { useAuth } from "@/authProvider";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";


export default function Dashboard(){

    const auth = useAuth();
    const { setToken }=useAuth();
    const navigate = useNavigate();
    const decoded = jwtDecode(auth.token);
    const { name } = decoded;

    const handleLogout = () => {
        setToken(null); // Set token to null
        navigate("/", { replace: true });
    };

    return (
        <div className="p-10 text-lg">
            <HelmetProvider>
                <Helmet>
                    <title>Dashboard | PDEU Hostels</title>
                </Helmet>
            </HelmetProvider>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator/>
                </BreadcrumbList>
            </Breadcrumb>
            <h1 className="text-5xl font-bold font-uberMove mt-5">Welcome {name}</h1>
            <div className="mt-2 ml-5">
                <p className="font-uberText mt-5">Go To : </p>
                <Link className="underline text-black" to='/docUpload'>Document Upload<ChevronRightIcon className="mx-2 size-5"/></Link>
                <Link className="text-gray-500" to='/roomSelect'>Room Selection</Link>
            </div>
            <Button onClick={handleLogout} className="mt-20">Logout</Button>


        </div>
    )
}
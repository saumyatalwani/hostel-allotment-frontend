import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"
import { Helmet, HelmetProvider } from 'react-helmet-async'; 
import { useAuth } from "@/authProvider";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";

export default function Batch(){
    const auth = useAuth();
    const navigate = useNavigate();

    const decoded = jwtDecode(auth.token);
    var { role } = decoded;

    useEffect(() => {
        if (role !== 'admin') {
          navigate('/dashboard',{ replace: true });
        }
      }, [role, navigate]);

    return (<>
        <div className="p-10 text-lg">
        <HelmetProvider>
                <Helmet>
                    <title>Dashboard | PDEU Hostels</title>
                </Helmet>
            </HelmetProvider>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink to="/admin">Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator/>
                    <BreadcrumbItem>
                        <BreadcrumbLink to="/batchAssign">Assign Batches</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator/>
                </BreadcrumbList>
            </Breadcrumb>
            <h1 className="text-5xl font-bold font-uberMove mt-5">Assign Batches</h1>
        </div>

    </>)

}
//import { Helmet } from "react-helmet"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"
import { Link } from "react-router-dom"
import { jwtDecode } from "jwt-decode"; 
import { useAuth } from "@/authProvider";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


export default function AdminDashboard(){

    const auth = useAuth();

    const navigate = useNavigate();
    
    const decoded = jwtDecode(auth.token);
    var { name,role } = decoded;

    useEffect(() => {
        if (role !== 'admin') {
          navigate('/dashboard',{ replace: true });
        }
      }, [role, navigate]);

    return (
        <div className="p-10 text-lg h-screen">
            <HelmetProvider>
                <Helmet>
                    <title>Dashboard | PDEU Hostels</title>
                </Helmet>
            </HelmetProvider>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink to="/dashboard">Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator/>
                </BreadcrumbList>
            </Breadcrumb>
            <h1 className="text-5xl font-bold font-uberMove mt-5">Welcome {name}</h1>
            <p className="font-uberText font-bold mt-5 text-2xl">Quick Links</p>
            <div className="mt-2 ml-5">
                
                <Link className="font-uberText my-5 underline" to={'/batchAssign'}>Assign Batches</Link><br/>
                <Link className="font-uberText my-5 underline" to={'/blockGender'}>Assign Blocks</Link><br/>
                <Link className="font-uberText my-5 underline" to={'/users'}>Users</Link><br/>
                <Link className="font-uberText my-5 underline" to={'/hostelID'}>Hostel ID Details</Link><br/>
                <Link className="font-uberText my-5 underline" to={'/complaints'}>Complaints</Link><br/>

                
            </div>
        </div>
    )
}
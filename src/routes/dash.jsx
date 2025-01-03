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
import clsx from 'clsx';

import { useEffect } from "react";


export default function Dashboard(){

    const auth = useAuth();
    const navigate = useNavigate();
    
    const decoded = jwtDecode(auth.token);
    var { name,status,role } = decoded;

    useEffect(() => {
        if (role == 'admin') {
          navigate('/admin',{ replace: true });
        }
      }, [role, navigate]);

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
                        <BreadcrumbLink to="/dashboard">Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator/>
                </BreadcrumbList>
            </Breadcrumb>
            <h1 className="text-5xl font-bold font-uberMove mt-5">Welcome {name}</h1>
            <div className="mt-2 ml-5">
                <p className="font-uberText mt-5">Go To : </p>
                <Link className={clsx(
                    status==='docVerify' && "underline text-black",
                    status!=='docVerify' && "text-gray-500")} to={status==='docVerify'?'/upload':null}>Document Upload<ChevronRightIcon className="mx-2 size-5"/></Link>
                <Link className={clsx(
                    status==='selectRoom' && "underline text-black",
                    status!=='selectRoom' && "text-gray-500")} to={status==='selectRoom'?'/roomSelect':null}>Room Selection</Link>
            </div>

            <p className="font-uberText font-bold mt-5 text-2xl">Quick Links</p>
            <div className="mt-2 ml-5">
                
                <Link className="font-uberText my-5 underline" to='/idForm'>Hostel ID Form</Link><br/>
                <Link className="font-uberText my-5 underline" to='/complaintForm'>Complaint Form</Link><br/>
            </div>
        </div>
    )
}
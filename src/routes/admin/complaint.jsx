import { useState, useEffect } from "react";
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useAuth } from "@/authProvider";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import axios from "axios";

export default function ComplaintDetails() {
    const auth = useAuth();
    const navigate = useNavigate();
    const [complaints, setComplaints] = useState([]);

    const config = {
        headers: { 
          'Authorization': `Bearer ${auth.token}`,
        }
      };

    const backendURL = import.meta.env.VITE_BACKEND_URL
    
    useEffect(() => {
        const fetchData = async () => {
            try{
                const fetchedData=await axios.get(`${backendURL}/api/complaint`,config)
                setComplaints(fetchedData.data);
            } catch (e){
                console.log(e);
            }
        };
        fetchData();
    }, []);

    async function handleResolve(e) {
        const data = {
            "id": e.target.value
        };
        
        try {
            const fetchedData = await axios.put(`${backendURL}/api/complaint`, data, config);
            setComplaints(fetchedData.data);
        } catch (error) {
            console.error(error);
        }
    }

    const decoded = jwtDecode(auth.token);
    const { role } = decoded;

    useEffect(() => {
        if (role !== 'admin') {
            navigate('/dashboard', { replace: true });
        }
    }, [role, navigate]);

    return (
        <>
            <div className="p-10 text-lg">
                <HelmetProvider>
                    <Helmet>
                        <title>Complaint Details | PDEU Hostels</title>
                    </Helmet>
                </HelmetProvider>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink to="/admin">Dashboard</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink to="/complaintDetails">Complaint Details</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                    </BreadcrumbList>
                </Breadcrumb>
                <h1 className="text-5xl font-bold font-uberMove my-5">Complaint Details</h1>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Phone Number</TableHead>
                            <TableHead>Block</TableHead>
                            <TableHead>Room No</TableHead>
                            <TableHead>Complaint Type</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Mark Resolved</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {complaints.map((complaint, index) => (
                            <TableRow key={index}>
                                <TableCell>{complaint.Full_Name}</TableCell>
                                <TableCell>{complaint.phoneNo}</TableCell>
                                <TableCell>{complaint.block_no}</TableCell>
                                <TableCell>{complaint.room_no}</TableCell>
                                <TableCell>{complaint.complaintType}</TableCell>
                                <TableCell>{complaint.description}</TableCell>
                                <TableCell>{complaint.status}</TableCell>
                                <TableCell>{complaint.status=='Pending' ?
                                    <Button value={complaint.complaintID} onClick={handleResolve}>Mark as Resolved</Button> :
                                    null}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    );
}

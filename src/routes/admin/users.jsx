import { useState, useEffect } from "react";
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useAuth } from "@/authProvider";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"
import axios from "axios";


export default function UserDisplay() {
    const auth = useAuth();
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const config = {
        headers: { 
          'Authorization': `Bearer ${auth.token}`,
        }
      };
    const backendURL = import.meta.env.VITE_BACKEND_URL;
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${backendURL}/api/users`, config);
                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching data:",error);
            }
        };
        fetchData();
    }, [config]);

    const handleFileDownload = (fileBlob, type) => {
        // Check if the fileBlob is a base64 string (without the 'data:' prefix)
        if (typeof fileBlob === "string") {
            // Decode the base64 string into binary data
            const byteString = atob(fileBlob);  // atob decodes the base64 string into binary data
    
            // Create an array buffer and populate it with the decoded data
            const arrayBuffer = new ArrayBuffer(byteString.length);
            const uintArray = new Uint8Array(arrayBuffer);
    
            for (let i = 0; i < byteString.length; i++) {
                uintArray[i] = byteString.charCodeAt(i);
            }
    
            // Create a Blob from the array buffer, assuming it's a PDF
            const fileType = type || "application/pdf";  // Default to PDF if type is not provided
            fileBlob = new Blob([uintArray], { type: fileType });
        }
    
        // Create a download link for the Blob
        const url = URL.createObjectURL(fileBlob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `download.${type}`;  // Set the file name and extension based on type
        link.click();
    
        // Clean up
        URL.revokeObjectURL(url);
    };
    
    
    

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
                        <title>User List | PDEU Hostels</title>
                    </Helmet>
                </HelmetProvider>
                <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink to="/admin">Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator/>
                    <BreadcrumbItem>
                        <BreadcrumbLink to="/users">User List</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator/>
                </BreadcrumbList>
            </Breadcrumb>
                <h1 className="text-5xl font-bold font-uberMove my-5">User List</h1>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Email</TableHead>
                            <TableHead>Full Name</TableHead>
                            <TableHead>Roll No</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Gender</TableHead>
                            <TableHead>Hostel</TableHead>
                            <TableHead>Block</TableHead>
                            <TableHead>Room No.</TableHead>
                            <TableHead>Fee Receipt</TableHead>
                            <TableHead>Passport Photo</TableHead>
                            <TableHead>Allotment Letter</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user, index) => (
                            <TableRow key={index}>
                                <TableCell>{user.Email}</TableCell>
                                <TableCell>{user.Full_Name}</TableCell>
                                <TableCell>{user.rollNo}</TableCell>
                                <TableCell>{user.Status}</TableCell>
                                <TableCell>{user.gender}</TableCell>
                                <TableCell>{user.hostel}</TableCell>
                                <TableCell>{user.block_no}</TableCell>
                                <TableCell>{user.room_no}</TableCell>
                                <TableCell>
                                    <Button onClick={() => handleFileDownload(user.fee_receipt, "pdf")}>
                                        Download
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <Button onClick={() => handleFileDownload(user.passport_photo, "jpg")}>
                                        Download
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <Button onClick={() => handleFileDownload(user.allotment_letter, "pdf")}>
                                        Download
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    );
}

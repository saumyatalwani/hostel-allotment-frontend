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

export default function IdDetails() {
    const auth = useAuth();
    const navigate = useNavigate();
    const [students, setStudents] = useState([]);
    
    const config = {
        headers: { 
          'Authorization': `Bearer ${auth.token}`,
        }
      };

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

    const backendURL = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        const fetchData = async () => {
            try{
                const fetchedData=await axios.get(`${backendURL}/api/idForm`,config);
                setStudents(fetchedData.data);
            } catch(e){
                console.log(e);
            }
        };
        fetchData();
    }, [config]);

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
                        <title>Hostel ID Details | PDEU Hostels</title>
                    </Helmet>
                </HelmetProvider>
                <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink to="/admin">Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator/>
                    <BreadcrumbItem>
                        <BreadcrumbLink to="/hostelID">Hostel ID Details</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator/>
                </BreadcrumbList>
            </Breadcrumb>
                <h1 className="text-5xl font-bold font-uberMove my-5">Hostel ID Details</h1>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Roll No</TableHead>
                            <TableHead>Block</TableHead>
                            <TableHead>Room No</TableHead>
                            <TableHead>Hostel</TableHead>
                            <TableHead>Student Phone No</TableHead>
                            <TableHead>Parent Phone No</TableHead>
                            <TableHead>Residential Address</TableHead>
                            <TableHead>Passport Photo</TableHead>{/* Added Passport Photo column */}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {students.map((student) => (
                            <TableRow key={student.rollNo}>
                                <TableCell>{student.Full_Name}</TableCell>
                                <TableCell>{student.rollNo}</TableCell>
                                <TableCell>{student.block_no}</TableCell>
                                <TableCell>{student.room_no}</TableCell>
                                <TableCell>{student.hostel_type}</TableCell>
                                <TableCell>{student.student_no}</TableCell>
                                <TableCell>{student.parent_no}</TableCell>
                                <TableCell>{student.residential_address}</TableCell>
                                <TableCell><Button onClick={() => handleFileDownload(student.passport_photo, "jpg")}>Download</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    );
}

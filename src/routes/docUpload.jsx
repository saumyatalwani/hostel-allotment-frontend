import { Helmet, HelmetProvider } from 'react-helmet-async';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useAuth } from '@/authProvider';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


export default function DocumentUpload() {
  const auth = useAuth();
  const {setToken} = useAuth();
  const decoded = jwtDecode(auth.token)
  const {email,status,rollNo,role} = decoded
  const navigate = useNavigate();

  useEffect(() => {
    if (status !== 'docVerify') {
      navigate('/dashboard',{ replace: true });
    }
  }, [status, navigate]);

  useEffect(() => {
    if (role == 'admin') {
      navigate('/admin',{ replace: true });
    }
  }, [role, navigate]);

  const { handleSubmit, register } = useForm();
  const [uploadStatus, setUploadStatus] = useState(null);
  const [feeRecieptBlob, setFeeRecieptBlob] = useState(null);
  const [allotmentLetterBlob, setAllotmentLetterBlob] = useState(null);
  const [passportPhotoBlob, setPassportPhotoBlob] = useState(null);

  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const handleFeeRecieptChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      const reader = new FileReader();
  
      reader.onloadend = () => {
        const base64String = reader.result.split(',')[1]; // Extract base64 part from data URL
        setFeeRecieptBlob(base64String); // Store the base64 string
      };
  
      reader.readAsDataURL(file); // Convert file to data URL (Base64 encoding)
    } else {
      alert("Please select a valid PDF file.");
    }
  };
  

  const handleAllotmentLetterChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      const reader = new FileReader();
  
      reader.onloadend = () => {
        const base64String = reader.result.split(',')[1]; // Extract base64 part from data URL
        setAllotmentLetterBlob(base64String); // Store the base64 string
      };
  
      reader.readAsDataURL(file); // Convert file to data URL (Base64 encoding)
    } else {
      alert("Please select a valid PDF file.");
    }
  };

  const handlePassportPhotoChange = (event) => {
    const file = event.target.files[0];
    
    if (file && file.type.startsWith("image/")) { // Check if it's an image
      const reader = new FileReader();
  
      reader.onloadend = () => {
        const base64String = reader.result.split(',')[1]; // Extract base64 part from data URL
        setPassportPhotoBlob(base64String); // Store the base64 string
      };
  
      reader.readAsDataURL(file); // Convert file to data URL (Base64 encoding)
    } else {
      alert("Please select a valid image file."); // Alert for non-image file
    }
  };


  const onSubmit = async (data) => {
    try {

      const batch = {
        'batch': Number(rollNo.slice(0,2)),
        'degree': rollNo.slice(2,3)
      }

      const config = {
        headers: { 
          'Authorization': `Bearer ${auth.token}`,
          'Content-Type': 'application/json',
        }
      };

      try{
        const fetchData = await axios.get(`${backendURL}/api/getHostelBatch?batch=${batch.batch}&degree=${batch.degree}`,config)

        const docData={
          "rollno":rollNo,
          "hostel":fetchData.data.hostel,
          "email":email,
          "fee_receipt":feeRecieptBlob,
          "allotment_letter":allotmentLetterBlob,
          "passport_photo":passportPhotoBlob
        }

        try{
          const response = await axios.post(`${backendURL}/api/uploadDocs`, docData);
          if (response.status === 200) {
            setToken(response.data.access_token);
            setUploadStatus({ type: 'success', message: "Documents uploaded successfully!" });
          }
        } catch(e){
          console.log(e.response.data);
          setUploadStatus({ type: 'error', message: msg})
        }
       
      } catch(e){
        var msg = e.response.data.message
        setUploadStatus({ type: 'error', message: msg})
      }

      
    } catch (error) {
      console.error("Error during upload:", error); // Log any upload errors
    }
    
  };

  return (
    <div className="p-10 text-lg">
      <HelmetProvider>
        <Helmet>
          <title>Document Upload | PDEU Hostels</title>
        </Helmet>
      </HelmetProvider>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink to="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink to="/upload">Document Upload</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex h-[90vh] justify-center items-center">
        <Card className="w-full max-w-lg">
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle className="text-2xl">Upload Documents</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Fee Receipt</label>
                  <Input type="file" accept="application/pdf" {...register("fee_receipt")} onChange={handleFeeRecieptChange} />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Passport Photo</label>
                  <Input type="file" accept="image/jpeg, image/jpg" {...register("passport_photo")} onChange={handlePassportPhotoChange} />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Allotment Letter</label>
                  <Input type="file" accept="application/pdf" {...register("allotment_letter")} onChange={handleAllotmentLetterChange}/>
                </div>
              </div>
            </CardContent>
            <CardFooter>
            <div className='w-full'>
              <Button type="submit" className="w-full">Upload Documents</Button>
              {uploadStatus && (<Alert variant={uploadStatus.type === 'success' ? 'positive' : 'destructive'} className="mt-5">
                <AlertTitle>{uploadStatus.type === 'success' ? 'Success' : 'Error'}</AlertTitle>
                <AlertDescription>{uploadStatus.message ? uploadStatus.message : "Some Error Occured"}</AlertDescription>
              </Alert> )}
            </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
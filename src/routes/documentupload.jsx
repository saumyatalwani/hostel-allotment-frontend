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

export default function DocumentUpload() {
  const { handleSubmit, register } = useForm();
  const [uploadStatus, setUploadStatus] = useState(null);

  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("fee_receipt", data.fee_receipt[0]);
      formData.append("passport_photo", data.passport_photo[0]);
      formData.append("allotment_letter", data.allotment_letter[0]);

      const response = await axios.post(`${backendURL}/api/upload_documents.php`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 200) {
        setUploadStatus({ type: 'success', message: "Documents uploaded successfully!" });
      }
    } catch (error) {
      setUploadStatus({ type: 'error', message: "Failed to upload documents. Please try again." });
    }
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <HelmetProvider>
        <Helmet>
          <title>Document Upload | PDEU Hostels</title>
        </Helmet>
      </HelmetProvider>
      <Card className="w-full max-w-lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle className="text-2xl">Upload Documents</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Fee Receipt</label>
                <Input type="file" {...register("fee_receipt", { required: true })} />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Passport Photo</label>
                <Input type="file" {...register("passport_photo", { required: true })} />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Allotment Letter</label>
                <Input type="file" {...register("allotment_letter", { required: true })} />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">Upload Documents</Button>
          </CardFooter>
        </form>
        {uploadStatus && (
          <div className="mt-4">
            <Alert variant={uploadStatus.type === 'success' ? 'positive' : 'destructive'}>
              <AlertTitle>{uploadStatus.type === 'success' ? 'Success' : 'Error'}</AlertTitle>
              <AlertDescription>{uploadStatus.message}</AlertDescription>
            </Alert>
          </div>
        )}
      </Card>
    </div>
  );
}

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/authProvider";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useEffect } from "react";

export default function ComplaintForm() {
  const form = useForm({
    defaultValues: {
      complaintType: '',
      description: '',
      phoneNo: '',
    }
  });

  const navigate=useNavigate();

  const {token}=useAuth();
  const {email,role,status}=jwtDecode(token);

  useEffect(() => {
    if (role == 'admin') {
      navigate('/admin',{ replace: true });
    }
  }, [role, navigate]);

  useEffect(() => {
    if (status !== 'RoomSelected') {
      navigate('/dashboard',{ replace: true });
    }
  }, [status, navigate]);

  const config = {
    headers: { 
      'Authorization': `Bearer ${token}`,
    }
  };

  const backendURL = import.meta.env.VITE_BACKEND_URL;

  async function handleSubmit(values) {
    values['email']=email
    try{

    const post = await axios.post(`${backendURL}/api/complaint`,values,config);

    if(post.status==200){
      navigate('/dashboard')
    }} catch (e){
      console.log(e);
    }
  }

  return (
    <div className="p-10 text-lg">
    <HelmetProvider>
        <Helmet>
          <title>Complaint Form | PDEU Hostels</title>
        </Helmet>
      </HelmetProvider>
    <Breadcrumb>
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink to="/dashboard">Dashboard</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink to="/complaintForm">Complaint Form</BreadcrumbLink>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>

    
    <div className="flex h-[80vh] justify-center items-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Complaint Form</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              
              <FormField
                control={form.control}
                name="phoneNo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Information</FormLabel>
                    <FormControl>
                      <Input id="contactInfo" placeholder="Enter phone number" {...field} required className="p-2" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="complaintType"
                render={({ field }) => (
                  <FormItem className="mt-2">
                    <FormLabel className="mb-2">Complaint Type</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Complaint Type" required className="p-2 mt-2" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                              <SelectItem value="Electric">Electric</SelectItem>
                              <SelectItem value="Plumbing">Plumbing</SelectItem>
                              <SelectItem value="Carpentry">Carpentry</SelectItem>
                              <SelectItem value="AC">AC</SelectItem>
                              <SelectItem value="Cleaning">Cleaning</SelectItem>
                          </SelectContent>
                        </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                
                name="description"
                render={({ field }) => (
                  <FormItem className="mt-2">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <>
                        <br/>
                        <Textarea placeholder="Describe your problem" {...field} required className="p-2" />
                      </>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <CardFooter>
                <Button className="w-full mt-6" type="submit">Submit</Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  </div>
  );
}

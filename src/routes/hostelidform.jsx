import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useAuth } from "@/authProvider";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { jwtDecode } from "jwt-decode";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";



export default function HostelIDForm() {

  const {token}=useAuth();
  const {email,role,status}=jwtDecode(token);
  const navigate=useNavigate();

  const config = {
    headers: { 
      'Authorization': `Bearer ${token}`,
    }
  };

  useEffect(() => {
    if (role == 'admin') {
      navigate('/admin',{ replace: true });
    }
  }, [role, navigate]);

  useEffect(() => {
    if (status !== 'RoomSelected') {
      navigate('/dashboard',{ replace: true });
    }
  }, [role, navigate]);

  const backendURL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const checkFilled = async () => {
        try {
            const response = await axios.get(`${backendURL}/api/checkFilled`, config);
            if(response.status==200){
              navigate('/dashboard');
            }
        } catch (error) {
            //console.log(error);
        }
    };
    checkFilled();
}, [config]);

  const form = useForm({
    defaultValues: {
      studentPhone: '',
      address: '',
      parentPhone: ''
    }
  });

  async function handleSubmit(values) {
    //console.log("Form values submitted:", values);
    values['email']=email;

    try{
      const res = await axios.post(`${backendURL}/api/idForm`,values,config);

      if(res.status==200){
        navigate('/dashboard');
      }
    } catch(e){
      console.log(e);
  }

  }

  return (
    <div className="p-10 text-lg">
    <HelmetProvider>
        <Helmet>
          <title>Hostel ID Form | PDEU Hostels</title>
        </Helmet>
      </HelmetProvider>
    <Breadcrumb>
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink to="/dashboard">Dashboard</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink to="/idForm">Hostel ID Form</BreadcrumbLink>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
    <div className="flex h-[80vh] justify-center items-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Hostel ID Form</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <FormField
                control={form.control}
                name="studentPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Student Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="123-456-7890" {...field} required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Residential Address</FormLabel>
                    <FormControl>
                      <Input placeholder="123 Main St, City" {...field} required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
              control={form.control}
              name="parentPhone"
              render={({ field }) => (
              <FormItem className="mb-4"> {/* Add margin bottom */}
              <FormLabel>Parents' Phone Number</FormLabel>
             <FormControl>
            <Input id="parent_no" placeholder="987-654-3210" {...field} required />
            </FormControl>
            <FormMessage />
        </FormItem>
         )}
        />

              <CardFooter className="mt=4">
                <Button className="w-full" type="submit">Submit</Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
    </div>
  );
}

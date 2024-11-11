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
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import { useForm } from "react-hook-form";
  import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import axios from "axios";



export default function Batch(){
    const auth = useAuth();
    const navigate = useNavigate();
    
    const [BatchData,setBatchData]=useState([]);

    const form=useForm({
        defaultValues: {
          batch: '',
        }
      });

      const config = {
        headers: { 
          'Authorization': `Bearer ${auth.token}`,
        }
      };

      const backendURL = import.meta.env.VITE_BACKEND_URL;

      useEffect(() => {
        const fetchBatchData = async () => {
            try {
                const response = await axios.get(`${backendURL}/api/HostelBatch`, config);
                setBatchData(response.data);
            } catch (error) {
                console.error("Error fetching batch data:", error);
            }
        };
        fetchBatchData();
    }, [config]);

    const [showForm, setShowForm] = useState(false);

    const onSubmit = async(data) => {

        try{
            const res = await axios.post(`${backendURL}/api/HostelBatch`,data,config);
            setBatchData(res.data);
        } catch(e){
            console.log(e);
        }

    }

    const decoded = jwtDecode(auth.token);
    var { role } = decoded;

    useEffect(() => {
        if (role !== 'admin') {
          navigate('/dashboard',{ replace: true });
        }
      }, [role, navigate]);

      const handleAddClick = () => {
        setShowForm(!showForm);
    };

    return (<>
        <div className="p-10 text-lg">
        <HelmetProvider>
                <Helmet>
                    <title>Assign Batches | PDEU Hostels</title>
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
            <h1 className="text-5xl font-bold font-uberMove my-5">Assign Batches</h1>

            
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Batch</TableHead>
                            <TableHead>Hostel</TableHead>
                            <TableHead>Degree</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {BatchData.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>{item.batch}</TableCell>
                                <TableCell>{item.hostel}</TableCell>
                                <TableCell>{item.degree}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Button onClick={handleAddClick} className="mt-6 mb-4">
                        {showForm ? "Done" : "Add Batch"}
                </Button>
                {showForm && (
                <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="mb-6 p-4 border rounded bg-gray-100">
                    <div className="mb-4">
                    <FormField
                        control={form.control}
                        name="batch"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel className="block text-gray-700">Batch</FormLabel>
                            <FormControl>
                                <Input
                                required
                                className="w-[180px]"
                                placeholder="Enter Batch"
                                {...field}
                                />
                            </FormControl>
                            </FormItem>
                        )}
                        />

                    </div>
                    
                    <div className="mb-4">
                    <FormField
                        control={form.control}
                        name="hostel"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel className="block text-gray-700">Hostel</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Hostel" />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="Highrise">Highrise</SelectItem>
                                    <SelectItem value="UG">UG</SelectItem>
                                </SelectContent>
                            </Select>
                            </FormItem>
                        )}
                        />
                    </div>

                    <div className="mb-4">
                        
                   
                    <FormField
                        control={form.control}
                        name="degree"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel className="block text-gray-700">Degree</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Degree" />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                <SelectItem value="B">Bachelors</SelectItem>
                                <SelectItem value="M">Masters</SelectItem>
                                </SelectContent>
                            </Select>
                            </FormItem>
                        )}
                        />
                         </div>
                    <Button type="submit">Submit</Button>
                </form>
                </Form>
            )}
            
        </div>

    </>)

}
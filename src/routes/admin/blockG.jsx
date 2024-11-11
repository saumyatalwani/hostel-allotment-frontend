import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useAuth } from "@/authProvider";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import axios from "axios";

export default function BlockAssignment() {
    const auth = useAuth();
    const navigate = useNavigate();
    const form = useForm({
        defaultValues: {
            block_no: '',
            hostel_type: '',
            gender: '',
        },
    });

    const [block,setBlock]=useState([]);
    const config = {
        headers: { 
          'Authorization': `Bearer ${auth.token}`,
        }
      };

      const backendURL = import.meta.env.VITE_BACKEND_URL;

      useEffect(() => {
        const fetchBatchData = async () => {
            try {
                const response = await axios.get(`${backendURL}/api/HostelGender`, config);
                setBlock(response.data);
            } catch (error) {
                console.error("Error fetching batch data:", error);
            }
        };
        fetchBatchData();
    }, [config]);

    const [showForm, setShowForm] = useState(false);

    const onSubmit = async(data) => {
        
        try{
            const res = await axios.post(`${backendURL}/api/HostelGender`,data,config);
            setBlock(res.data);
        } catch(e){
            console.log(e);
        }
    };

    const decoded = jwtDecode(auth.token);
    var { role } = decoded;

    useEffect(() => {
        if (role !== 'admin') {
            navigate('/dashboard', { replace: true });
        }
    }, [role, navigate]);

    const handleAddClick = () => {
        setShowForm(!showForm);
    };

    return (
        <>
            <div className="p-10 text-lg">
                <HelmetProvider>
                    <Helmet>
                        <title>Assign Blocks | PDEU Hostels</title>
                    </Helmet>
                </HelmetProvider>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink to="/admin">Dashboard</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink to="/blockAssign">Assign Blocks</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                    </BreadcrumbList>
                </Breadcrumb>
                <h1 className="text-5xl font-bold font-uberMove my-5">Assign Blocks</h1>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Block No.</TableHead>
                            <TableHead>Hostel Type</TableHead>
                            <TableHead>Gender</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {block.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>{item.block_no}</TableCell>
                                <TableCell>{item.hostel_type}</TableCell>
                                <TableCell>{item.gender}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Button onClick={handleAddClick} className="mt-6 mb-4">
                    {showForm ? "Done" : "Add Block"}
                </Button>
                {showForm && (
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="mb-6 p-4 border rounded bg-gray-100">
                            <div className="mb-4">
                                <FormField
                                    control={form.control}
                                    name="block_no"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="block text-gray-700">Block No.</FormLabel>
                                            <FormControl>
                                                <Input
                                                    required
                                                    className="w-[180px]"
                                                    placeholder="Enter Block No."
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
                                    name="hostel_type"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="block text-gray-700">Hostel Type</FormLabel>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="w-[180px]">
                                                        <SelectValue placeholder="Hostel Type" />
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
                                    name="gender"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="block text-gray-700">Gender</FormLabel>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="w-[180px]">
                                                        <SelectValue placeholder="Gender" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="male">Male</SelectItem>
                                                    <SelectItem value="female">Female</SelectItem>
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
        </>
    );
}

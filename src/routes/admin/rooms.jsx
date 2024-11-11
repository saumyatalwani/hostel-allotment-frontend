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
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { useForm } from "react-hook-form";

export default function RoomDetails() {
    const auth = useAuth();
    const navigate = useNavigate();
    const [rooms, setRooms] = useState([]);
    const form=useForm({
        defaultValues: {
          room_no: '',
          block_no:''
        }
      });

    const config = {
        headers: { 
          'Authorization': `Bearer ${auth.token}`,
        }
      };
    
    const [showForm, setShowForm] = useState(false);

    const handleAddClick = () => {
        setShowForm(!showForm);
    };

    const backendURL = import.meta.env.VITE_BACKEND_URL;
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedData = await axios.get(`${backendURL}/api/rooms`, config);
                setRooms(fetchedData.data);
            } catch (e) {
                console.log(e);
            }
        };
        fetchData();
    }, []);


    async function handleAddRoom(values) {
        try {
            const response = await axios.post(`${backendURL}/api/rooms`, values, config);
            setRooms(response.data);
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
                        <title>Room Details | PDEU Hostels</title>
                    </Helmet>
                </HelmetProvider>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink to="/admin">Dashboard</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink to="/roomDetails">Room Details</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                    </BreadcrumbList>
                </Breadcrumb>
                <h1 className="text-5xl font-bold font-uberMove my-5">Room Details</h1>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Room No</TableHead>
                            <TableHead>Block No</TableHead>
                            <TableHead>Hostel Type</TableHead>
                            <TableHead>Bed 1</TableHead>
                            <TableHead>Bed 2</TableHead>
                            <TableHead>Bed 3</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {rooms.map((room, index) => (
                            <TableRow key={index}>
                                <TableCell>{room.room_no}</TableCell>
                                <TableCell>{room.block_no}</TableCell>
                                <TableCell>{room.hostel_type}</TableCell>
                                <TableCell>{room.bed1 ? `Occupied by ${room.bed1}` : 'Available'}</TableCell>
                                <TableCell>{room.bed2 ? `Occupied by ${room.bed2}` : 'Available'}</TableCell>
                                <TableCell>{room.bed3 ? `Occupied by ${room.bed3}` : 'Available'}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <Button onClick={handleAddClick} className="mt-6 mb-4">
                    {showForm ? "Done" : "Add Room"}
                </Button>
                <div className="mt-5">

                </div>
                { showForm && (
                <Form {...form}>
                <form onSubmit={form.handleSubmit(handleAddRoom)} className="mb-6 p-4 border rounded bg-gray-100">
                    <div className="mb-4">
                    <FormField
                        control={form.control}
                        name="room_no"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel className="block text-gray-700">Room No.</FormLabel>
                            <FormControl>
                                <Input
                                required
                                className="w-[180px]"
                                placeholder="Enter Room No."
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
                    <Button type="submit">Submit</Button>
                </form>
                </Form>)}
            </div>
        </>
    );
}
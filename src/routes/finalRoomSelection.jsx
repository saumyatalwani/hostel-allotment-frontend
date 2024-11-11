import { Helmet, HelmetProvider } from 'react-helmet-async';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"

import {useLocation, useNavigate} from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/authProvider';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { useEffect, useState } from 'react';
import InvalidAlert from '@/components/InvalidAlert';

export default function FinalSelect(){

    const auth=useAuth();
    const {setToken}=useAuth();
    const location = useLocation();
    const {status,rollNo,role}=jwtDecode(auth.token);
    const navigate=useNavigate();

    
    useEffect(() => {
        if (status !== 'selectRoom') {
          navigate('/dashboard',{ replace: true });
        }
      }, [status, navigate]);
      
      useEffect(() => {
        if (role == 'admin') {
          navigate('/admin',{ replace: true });
        }
      }, [role, navigate]);

    const { handleSubmit, register } = useForm();

    const backendURL = import.meta.env.VITE_BACKEND_URL;

    const [error,setError]=useState(null);


    async function onSubmit(data){
        const submitData={
            "roomNo":location.state.room,
            "hostel":location.state.hostel,
            "block":location.state.block,
            "bed1":location.state.bedSelected == 'bed1' ? rollNo : "",
            "bed2":location.state.bedSelected == 'bed2' ? rollNo : "",
            "bed3":location.state.bedSelected == 'bed3' ? rollNo : ""
        }

        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                console.log(key);
                submitData[key]=data[key]
            }
        }

        console.log(submitData);
        const config = {
            headers: {
              'Authorization': `Bearer ${auth.token}`,
            },
          };
        try{
        const req = await axios.put(`${backendURL}/api/SelectRoom`,submitData,config);
        console.log(req);
        if(req.status==200){
            setToken(req.data.access_token);
        }
        }catch(e){
            console.log(e);
            const err={
                'message':e.response.data.message,
                'title':'Error!'
            }
            setError(err);

        }

        

    }

    return( <>
     <div className="p-10 text-lg font-uberText">
        <HelmetProvider>
            <Helmet>
                <title>Finalize Room | PDEU Hostels</title>
            </Helmet>
        </HelmetProvider>

        <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink to="/dashboard">Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator/>
                    <BreadcrumbItem>
                        <BreadcrumbLink to="/roomSelect">Room Selection</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator/>
                    <BreadcrumbItem>
                        <BreadcrumbLink to="/roomSelect">Finalize Room</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator/>
                </BreadcrumbList>
        </Breadcrumb>

        <h1 className="text-5xl font-bold font-uberMove mt-5">Finalize Room</h1>

        <h2 className="text-2xl mt-5">Selected Room : {location.state.block}-{location.state.room}</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className='mt-2'>
        {
            location.state.bedSelected !== 'bed1' && location.state.bedStatus.bed1=='free' ? 
            <div className='mt-2'>
                <p>Do you have a room mate?</p>
                <Input type='text' placeholder="Room Mate 1 Roll No." className="w-[20vw]" {...register("bed1")}></Input>
                <p className='text-sm'>If no leave blank</p>
            </div> :
            <div className='mt-2'>
                <p>Bed 1 occupied by {(location.state.bedSelected=='bed1' && 'You') || location.state.bedOccupant.bed1  }</p>
            </div>
        }
        {
            location.state.bedSelected !== 'bed2' && location.state.bedStatus.bed2=='free' ? 
            <div className='mt-2'>
                <p>Do you have a room mate?</p>
                <Input type='text' placeholder="Room Mate 2 Roll No." className="w-[20vw]" {...register("bed2")}></Input>
                <p className='text-sm'>If no leave blank</p>
            </div> :
            <div className='mt-2'>
                <p>Bed 2 occupied by {(location.state.bedSelected=='bed2' && 'You') || location.state.bedOccupant.bed2 }</p>
            </div>
        }
        {
            location.state.bedSelected !== 'bed3' && location.state.bedStatus.bed3=='free' ? 
            <div className='mt-2'>
                <p>Do you have a room mate?</p>
                <Input type='text' placeholder="Room Mate 3 Roll No." className="w-[20vw]" {...register("bed3")}></Input>
                <p className='text-sm'>If no leave blank</p>
            </div> :
            <div className='mt-2'>
                <p>Bed 3 occupied by {(location.state.bedSelected=='bed3' && 'You') || location.state.bedOccupant.bed3  }</p>
            </div>
        }
        </div>
        <Button type="submit" className="mt-5">Submit</Button>
    </form>

    {
        error ? 
        <InvalidAlert title={error.title} description={error.message} className="mt-5 w-[20vw]"/> :
        null
    }

     </div>

    </> )
}
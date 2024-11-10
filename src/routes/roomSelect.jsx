import { Helmet, HelmetProvider } from 'react-helmet-async';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"
import { Link, useNavigate } from "react-router-dom"
import BlockFloorCard from "@/components/BlockFloorCard"
import RoomCard from "@/components/RoomCard"
import axios from 'axios';
import { useAuth } from '@/authProvider';
import { useState,useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@primer/octicons-react';
import { jwtDecode } from 'jwt-decode';

export default function RoomSelect(){

    const auth = useAuth();
    const backendURL = import.meta.env.VITE_BACKEND_URL;
    const [blocks, setBlocks] = useState([]);
    const [selectedBlock, setSelectedBlock] = useState(null); // Store selected block
    const [rooms, setRooms] = useState([]); // Store fetched rooms
    const decoded = jwtDecode(auth.token)
    const navigate = useNavigate();
    const { status,rollNo } = decoded;
    const [reserved, setReserved] = useState(null);

    useEffect(() => {
        if (status !== 'selectRoom') {
          navigate('/dashboard',{ replace: true });
        }
      }, [status, navigate]);
    
      useEffect(() => {
        const fetchReservedData = async () => {
          try {
            const config = {
              headers: {
                'Authorization': `Bearer ${auth.token}`,
              },
            };
    
            const response = await axios.get(`${backendURL}/api/getReserved`, config);
            setReserved(response.data); // Update the reserved data state
          } catch (error) {
            console.error('Error fetching reserved data:', error);
          }
        };
    
        fetchReservedData();
      }, [auth.token, backendURL]);
  
    useEffect(() => {
      const fetchBlocks = async () => {
        try {
          const config = {
            headers: {
              'Authorization': `Bearer ${auth.token}`,
            },
          };
          const response = await axios.get(`${backendURL}/api/getHostelGender`, config);
          setBlocks(response.data); // Save data to state
          //console.log(response.data);
        } catch (error) {
          console.error("Error fetching blocks:", error);
        }
      };
  
      fetchBlocks();
    }, [auth.token, backendURL]); // Dependencies

    const fetchRooms = async (blockNo) => {
        try {
          const config = {
            headers: {
              'Authorization': `Bearer ${auth.token}`,
            },
          };
          const response = await axios.get(`${backendURL}/api/getAllRooms?block=${blockNo}`, config);
          setRooms(response.data); // Set rooms data to display RoomCards
          setSelectedBlock(blockNo); // Update selected block
          //(response.data);
        } catch (error) {
          console.error("Error fetching rooms:", error);
        }
      };

    console.log(reserved);

    return (
        <div className="p-10 text-lg font-uberText">
        <HelmetProvider>
            <Helmet>
                <title>Room Selection | PDEU Hostels</title>
            </Helmet>
        </HelmetProvider>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator/>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/roomSelect">Room Selection</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator/>
                </BreadcrumbList>
            </Breadcrumb>
            { reserved==null ?
            <div>
            {selectedBlock ? <h2 className='mt-2 mb-2 cursor-pointer' onClick={() => setSelectedBlock(null)}><ChevronLeftIcon className='size-5'/>Back</h2> : null}
            <h1 className="text-5xl font-bold font-uberMove mt-5">Select a {selectedBlock ? 'Room' : 'Block'}</h1>
            { selectedBlock ? null : 
            <div className="mt-5 ml-5">
            {blocks.map((block) => (
                <BlockFloorCard
                    key={block.block_no} // Ensure each item has a unique key, like `block.id`
                    floorNo={block.block_no} // Pass block_no from each block object
                    type="Block"
                    occupiedCap={null}
                    onClick={() => fetchRooms(block.block_no)} // Set occupiedCap as needed
                />
      ))}
      </div>}
                {/*<RoomCard roomNo={601}/>*/}
                {selectedBlock && (
        <div className="mt-5 ml-5 flex flex-wrap">
          {rooms.length > 0 ? (
            rooms.map((room) => (
              <RoomCard key={room.room_no} roomNo={room.room_no} block={room.block_no} hostel={room.hostel_type}
              bed1={room.bed1==null || room.bed1=='' ? 'free' : room.bed1.startsWith('r') ? 'reserved' : 'booked'} 
              bed2={room.bed2==null || room.bed2=='' ? 'free' : room.bed2.startsWith('r') ? 'reserved' : 'booked'}
              bed3={room.bed3==null || room.bed3=='' ? 'free' : room.bed3.startsWith('r') ? 'reserved' : 'booked'}
              bed1Title={room.bed1}  bed2Title={room.bed2}  bed3Title={room.bed3}
              />
            ))
          ) : (
            <p>No rooms available for this block.</p>
          )}
          
        </div>
      )}

            

      </div>: 
    
    <div>
        <h1 className="text-5xl font-bold font-uberMove mt-5">You have a Room Reserved For You</h1>
        <h2 className="text-2xl mt-5 cursor-pointer" onClick={() => navigate('/finalize', { state: {
                'room':reserved.room_no,
                'bedSelected':reserved.bed1=='r'+rollNo ? 'bed1' : (reserved.bed2=='r'+rollNo ? 'bed2' : 'bed3'),
                'bedStatus': {
                    'bed1': reserved.bed1==null || reserved.bed1=='' ? 'free' : reserved.bed1.startsWith('r') ? 'reserved' : 'booked',
                    'bed2': reserved.bed2==null || reserved.bed2=='' ? 'free' : reserved.bed2.startsWith('r') ? 'reserved' : 'booked',
                    'bed3': reserved.bed3==null || reserved.bed3=='' ? 'free' : reserved.bed3.startsWith('r') ? 'reserved' : 'booked'
                },
                'bedOccupant' : {
                    'bed1': reserved.bed1 ? reserved.bed1.startsWith('r') ? reserved.bed1.slice(1):reserved.bed1 : reserved.bed1,
                    'bed2' : reserved.bed2 ? reserved.bed2.startsWith('r') ? reserved.bed2.slice(1):reserved.bed2 : reserved.bed2,
                    'bed3' : reserved.bed3 ? reserved.bed3.startsWith('r') ? reserved.bed3.slice(1):reserved.bed3 : reserved.bed3
                },
                'block' : reserved.block_no,
                'hostel' : reserved.hostel_type
            }
        })}>Click Here to Proceed <ChevronRightIcon className='size-7'/></h2>

        
    </div> }


</div>)}
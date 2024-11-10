import {
    Card,
    CardContent,
    CardTitle,
  } from "@/components/ui/card"
import BedIcon from "@/components/bedIcon"
import clsx from "clsx";  
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function RoomCard(props){

    const navigate = useNavigate();

    const handleRedirect = (selectedBed) => {
        navigate('/finalize', { state: {
                'room':props.roomNo,
                'bedSelected':selectedBed,
                'bedStatus': {
                    'bed1': props.bed1,
                    'bed2': props.bed2,
                    'bed3': props.bed3
                },
                'bedOccupant' : {
                    'bed1': props.bed1Title,
                    'bed2' : props.bed2Title,
                    'bed3' : props.bed3Title
                },
                'block' : props.block,
                'hostel' : props.hostel
            }
        });
    };
    


    return (
        <>
            <Card className="p-5 w-[20vw] mt-2 mr-2">
                    <CardTitle className="text-2xl">
                        {props.block}-{props.roomNo}
                    </CardTitle>
                    <CardContent className="mt-5 flex">
                            <BedIcon className={clsx(
                                props.bed1=='free'&& "fill-green-400 hover:fill-green-600 cursor-pointer",
                                props.bed1=='reserved'&& "fill-yellow-400",
                                props.bed1=='booked'&& "fill-red-500"
                            ,'mr-2 cursor-pointer')} title={props.bed1Title} 
                            onClick={() => {
                                        if (props.bed1 === 'free') {
                                            handleRedirect('bed1');
                                        }
                                    }}/>
                            <BedIcon className={clsx(
                                props.bed2=='free'&& "fill-green-400 hover:fill-green-600 cursor-pointer",
                                props.bed2=='reserved'&& "fill-yellow-400",
                                props.bed2=='booked'&& "fill-red-500"
                            ,'mr-2 cursor-pointer')} title={props.bed2Title}
                            onClick={() => {
                                        if (props.bed2 === 'free') {
                                            handleRedirect('bed2');
                                        }
                                    }}
                            />
                            <BedIcon className={clsx(
                                props.bed3=='free'&& "fill-green-400 hover:fill-green-600 cursor-pointer",
                                props.bed3=='reserved'&& "fill-yellow-400",
                                props.bed3=='booked'&& "fill-red-500"
                            ,'mr-2')} title={props.bed3Title} onClick={() => {
                                        if (props.bed3 === 'free') {
                                            handleRedirect('bed3');
                                        }
                                    }}/>
                    </CardContent>
                </Card>
        </>
    )
}
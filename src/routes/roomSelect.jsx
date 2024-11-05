import { Helmet } from "react-helmet"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"
import { Link } from "react-router-dom"
import FloorCard from "@/components/FloorCard"
import RoomCard from "@/components/RoomCard"

export default function RoomSelect(){

    return (
        <div className="p-10 text-lg font-uberText">
            <Helmet>
                <title>Room Selection | PDEU Hostels</title>
            </Helmet>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <Link to="/dashboard"><BreadcrumbLink>Dashboard</BreadcrumbLink></Link>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator/>
                    <BreadcrumbItem>
                        <Link to="/roomSelect"><BreadcrumbLink>Room Selection</BreadcrumbLink></Link>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator/>
                </BreadcrumbList>
            </Breadcrumb>
            <h1 className="text-5xl font-bold font-uberMove mt-5">Select a Room</h1>
            <div className="mt-5 ml-5">
                <FloorCard floorNo={11} occupiedCap={55}/>
                <RoomCard roomNo={601}/>

            </div>


        </div>
    )


}
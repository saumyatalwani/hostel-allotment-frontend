import {
    Card,
    CardContent,
    CardTitle,
  } from "@/components/ui/card"
  import BedIcon from "@/components/bedIcon"  


export default function RoomCard(props){


    return (
        <>
            <Card className="p-5 w-[20vw] mt-2">
                    <CardTitle className="text-2xl">
                        {props.roomNo}
                    </CardTitle>
                    <CardContent className="mt-5 flex">
                            <BedIcon className="mr-2 fill-green-400 hover:fill-green-600"/>
                            <BedIcon className="mr-2 fill-red-500"/>
                            <BedIcon className="mr-2 fill-yellow-400"/>
                    </CardContent>
                </Card>
        </>
    )
}
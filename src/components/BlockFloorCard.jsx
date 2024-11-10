import { Card,CardContent,CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function BlockFloorCard(props){

    return (
        <div onClick={props.onClick}>
            <Card className="p-5 w-[20vw] mt-2 cursor-pointer">
                    <CardTitle className="text-2xl">
                        {props.floorNo} {props.type}
                    </CardTitle>
                    <CardContent className="mt-5">
                        {props.occupiedCap ?
                        <>
                        <h1 className="mb-2 text-md ">{props.occupiedCap}% Full</h1>
                        <Progress value={props.occupiedCap}/> </> : null}
                    </CardContent>
                </Card>
        </div>
    )
}
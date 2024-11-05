import { Card,CardContent,CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function FloorCard(props){

    return (
        <>
            <Card className="p-5 w-[20vw] mt-2">
                    <CardTitle className="text-2xl">
                        {props.floorNo} Floor
                    </CardTitle>
                    <CardContent className="mt-5">
                        <h1 className="mb-2 text-md ">{props.occupiedCap}% Full</h1>
                        <Progress value={props.occupiedCap}/>
                    </CardContent>
                </Card>
        </>
    )
}
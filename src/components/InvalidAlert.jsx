import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function InvalidAlert({title,description,className}){
    return(
      
      <Alert variant="destructive" className={className}>
          <AlertTitle>{title}</AlertTitle>
          <AlertDescription>
          {description}
          </AlertDescription>
      </Alert>
     
    )
  }
  
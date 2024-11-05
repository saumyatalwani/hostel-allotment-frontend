import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
//import { Label } from "@/components/ui/label"
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../authProvider";
import axios from "axios"
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useState } from "react";




export const description =
  "A simple login form with email and password. The submit button says 'Sign in'."


function InvalidAlert(){
  return(
    
    <Alert variant="destructive">
        <AlertTitle>Invalid Credentials</AlertTitle>
        <AlertDescription>
          Check username or password
        </AlertDescription>
    </Alert>
   
  )
}


export function LoginForm() {

  const { setToken } = useAuth();
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const form = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const backendURL = import.meta.env.VITE_BACKEND_URL

  async function handleLogin(values){
    const {email,password}= values;
    
    const data = {
      'username':email,
      'password':password
    }
    const url = backendURL+'/api/login.php'
    try{
    const res = await axios.post(url,data,{
      headers:{
        'Content-Type':'application/json'
      }
    });
    if(res.status==200){
      setToken(res.data.access_token);
      navigate("/dashboard", { replace: true });
    }
  } catch (e){
    if(e.status==401){
      //alert("invalid");
      setShowAlert(true);
    }
    //console.log(e.status)
  }
    
  };

  return (
    <div className="flex h-screen justify-center items-center">
    <HelmetProvider>
      <Helmet>
        <title>Log In | PDEU Hostels</title>
      </Helmet>
    </HelmetProvider>
    <Card className="w-full max-w-sm">
    <Form {...form}>
    <form onSubmit={form.handleSubmit(handleLogin)}>
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
      <div className="grid gap-2">
        {/*
          <Label htmlFor="email"></Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
          */
        }
          <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input id="email" placeholder="m@example.com" required {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
        <div className="grid gap-2">
        {/*
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" required />
          */
        }
          <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input id="password" type="password" required {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" type="submit">Sign in</Button>
      </CardFooter>
      </form>
      </Form>        
    </Card>
    
    {
      showAlert ?
    <div className="mt-5">
       <InvalidAlert />
    </div> : null
    }
    </div>
  )
}

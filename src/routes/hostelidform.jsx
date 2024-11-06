import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useState } from "react";

export default function HostelIDForm() {
  const form = useForm({
    defaultValues: {
      studentPhone: '',
      address: '',
      parentPhone: ''
    }
  });

  async function handleSubmit(values) {
    console.log("Form values submitted:", values);
    // Handle the form submission here (e.g., send to backend)
  }

  return (
    <div className="flex h-screen justify-center items-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Hostel ID Form</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <FormField
                control={form.control}
                name="studentPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Student Phone Number</FormLabel>
                    <FormControl>
                      <Input id="studentPhone" placeholder="123-456-7890" {...field} required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Residential Address</FormLabel>
                    <FormControl>
                      <Input id="address" placeholder="123 Main St, City" {...field} required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
              control={form.control}
              name="parentPhone"
              render={({ field }) => (
              <FormItem className="mb-4"> {/* Add margin bottom */}
              <FormLabel>Parents' Phone Number</FormLabel>
             <FormControl>
            <Input id="parentPhone" placeholder="987-654-3210" {...field} required />
            </FormControl>
            <FormMessage />
        </FormItem>
         )}
        />

              <CardFooter className="mt=4">
                <Button className="w-full" type="submit">Submit</Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

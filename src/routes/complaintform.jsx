import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";

export default function ComplaintForm() {
  const form = useForm({
    defaultValues: {
      name: '',
      complaintType: '',
      complaintDetails: '',
      contactInfo: '',
    }
  });

  async function handleSubmit(values) {
    console.log("Form values submitted:", values);
    // Handle form submission (e.g., send to backend)
  }

  return (
    <div className="flex h-screen justify-center items-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Complaint Form</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6"> {/* Increased gap for spacing */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>

              {/* Name Field */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input id="name" placeholder="Enter your name" {...field} required className="p-2" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Complaint Type Dropdown */}
              <FormField
                control={form.control}
                name="complaintType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mb-2">Complaint Type</FormLabel>
                    <FormControl>
                      <select id="complaintType" {...field} required className="border p-2 w-full rounded">
                        <option value="">Select a complaint type</option>
                        <option value="electric">Electric</option>
                        <option value="plumbing">Plumbing</option>
                        <option value="carpentry">Carpentry</option>
                        <option value="ac">AC</option>
                        <option value="cleaning">Cleaning</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Contact Information (Phone Number) */}
              <FormField
                control={form.control}
                name="contactInfo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Information</FormLabel>
                    <FormControl>
                      <Input id="contactInfo" placeholder="Enter phone number" {...field} required className="p-2" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <CardFooter>
                <Button className="w-full mt-6" type="submit">Submit</Button> {/* Added margin-top */}
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

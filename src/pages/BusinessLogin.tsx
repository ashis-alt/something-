import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Validation schemas
const signInSchema = z.object({
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  otp: z.string().min(6, "OTP must be 6 digits"),
  licenseNumber: z.string().min(1, "License number is required"),
});

const signUpSchema = z.object({
  businessName: z.string().min(1, "Business name is required"),
  licenseNumber: z.string().min(1, "License number is required"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  otp: z.string().min(6, "OTP must be 6 digits"),
});

const BusinessLogin = () => {
  const navigate = useNavigate();
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [activeTab, setActiveTab] = useState("signin");

  const signInForm = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      phoneNumber: "",
      otp: "",
      licenseNumber: "",
    },
  });

  const signUpForm = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      businessName: "",
      licenseNumber: "",
      phoneNumber: "",
      otp: "",
    },
  });

  const handleSendOtp = (phoneNumber: string) => {
    // In a real app, this would make an API call to send OTP
    toast.success(`OTP sent to ${phoneNumber}`);
    setIsOtpSent(true);
  };

  const onSignIn = (values: z.infer<typeof signInSchema>) => {
    // In a real app, this would verify OTP and license number with backend
    console.log("Sign in values:", values);
    toast.success("Signed in successfully!");
    navigate(`/business-profile/${values.licenseNumber}`);
  };

  const onSignUp = (values: z.infer<typeof signUpSchema>) => {
    // In a real app, this would create a new business account
    console.log("Sign up values:", values);
    toast.success("Account created successfully!");
    navigate(`/business-profile/${values.licenseNumber}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4">
      <div className="max-w-md mx-auto pt-8">
        <Card className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="signin">
              <Form {...signInForm}>
                <form onSubmit={signInForm.handleSubmit(onSignIn)} className="space-y-4">
                  <FormField
                    control={signInForm.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <div className="flex gap-2">
                          <FormControl>
                            <Input {...field} type="tel" placeholder="Enter phone number" />
                          </FormControl>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => handleSendOtp(field.value)}
                          >
                            Send OTP
                          </Button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {isOtpSent && (
                    <FormField
                      control={signInForm.control}
                      name="otp"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>OTP</FormLabel>
                          <FormControl>
                            <Input {...field} type="text" placeholder="Enter OTP" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={signInForm.control}
                    name="licenseNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>FSSAI License Number</FormLabel>
                        <FormControl>
                          <Input {...field} type="text" placeholder="Enter license number" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full">
                    Sign In
                  </Button>
                </form>
              </Form>
            </TabsContent>

            <TabsContent value="signup">
              <Form {...signUpForm}>
                <form onSubmit={signUpForm.handleSubmit(onSignUp)} className="space-y-4">
                  <FormField
                    control={signUpForm.control}
                    name="businessName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Name</FormLabel>
                        <FormControl>
                          <Input {...field} type="text" placeholder="Enter business name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={signUpForm.control}
                    name="licenseNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>FSSAI License Number</FormLabel>
                        <FormControl>
                          <Input {...field} type="text" placeholder="Enter license number" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={signUpForm.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <div className="flex gap-2">
                          <FormControl>
                            <Input {...field} type="tel" placeholder="Enter phone number" />
                          </FormControl>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => handleSendOtp(field.value)}
                          >
                            Send OTP
                          </Button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {isOtpSent && (
                    <FormField
                      control={signUpForm.control}
                      name="otp"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>OTP</FormLabel>
                          <FormControl>
                            <Input {...field} type="text" placeholder="Enter OTP" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <Button type="submit" className="w-full">
                    Sign Up
                  </Button>
                </form>
              </Form>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default BusinessLogin;
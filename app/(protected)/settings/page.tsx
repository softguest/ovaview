"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition, useState } from "react";
import { useSession } from "next-auth/react";

import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SettingsSchema } from "@/schemas";
import {
  Card,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { settings } from "@/actions/settings";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCurrentUser } from "@/hooks/use-current-user";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { UserRole } from "@prisma/client";

const SettingsPage = () => {
  const user = useCurrentUser();

  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      image: user?.image || undefined,
      firstName: user?.firstName || undefined,
      middleName: user?.middleName || undefined,
      lastName: user?.lastName || undefined,
      gender: user?.gender || undefined,
      bloodGroup: user?.bloodGroup || undefined,
      dateOfBirth: user?.dateOfBirth || undefined,
      telePhone: user?.telePhone || undefined,

      // Address 
      currentAddress : user?.currentAddress  || undefined,
      cityName : user?.cityName   || undefined,
      country : user?.country  || undefined,
      pinCode : user?.pinCode  || undefined,

      // If account is a student accoun? then display  parent datails 
      parentFirstName: user?.parentFirstName || undefined,
      parentMiddleName : user?.parentMiddleName  || undefined,
      parentLastName: user?.parentLastName || undefined,
      parentGender: user?.parentGender || undefined,
      parentDateOfBirth: user?.parentDateOfBirth || undefined,
      parentBloodGroup: user?.parentBloodGroup || undefined,
      parentTelePhone: user?.parentTelePhone || undefined,
      parentEmail: user?.parentEmail || undefined,
      parentEducation: user?.parentEducation || undefined,
      parentProfession: user?.parentProfession|| undefined,

      // Account Information
      email: user?.email || undefined,
      password: undefined,
      newPassword: undefined,
      role: user?.role || undefined,
      isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined,
      
      typeOfIdentificationCard: user?.typeOfIdentificationCard || undefined,
      identificationCardNumber: user?.identificationCardNumber || undefined,
      identificationFile: user?.identificationFile || undefined,
    }
  });

  const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
    startTransition(() => {
      settings(values)
        .then((data) => {
          if (data.error) {
            setError(data.error);
          }

          if (data.success) {
            update();
            setSuccess(data.success);
          }
        })
        .catch(() => setError("Something went wrong!"));
    });
  }

  return ( 
    <div className="w-full md:px-32">
      <Card className="w-full">
        <CardHeader>
          <p className="text-2xl font-semibold text-center">
            ⚙️ Settings.
          </p>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form 
              className="space-y-6" 
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name:</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="First Name"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="middleName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Middle Name:</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Middle Name"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name:</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Last Name"
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="dateOfBirth"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>dateOfBirth</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            // placeholder="john.doe@example.com"
                            type="date"
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                />
                <FormField
                  control={form.control}
                  name="bloodGroup"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Blood Group</FormLabel>
                      <Select
                        disabled={isPending}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Blood Group" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="O +">
                              O +
                          </SelectItem>
                          <SelectItem value="O -">
                              O -
                          </SelectItem>
                          <SelectItem value="A +">
                              A +
                          </SelectItem>
                          <SelectItem value="A -">
                              A -
                          </SelectItem>
                          <SelectItem value="B +">
                              B +
                          </SelectItem>
                          <SelectItem value="B -">
                              B -
                          </SelectItem>
                          <SelectItem value="AB +">
                              AB + 
                          </SelectItem>
                          <SelectItem value="AB -">
                              AB - 
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <Select
                        disabled={isPending}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="MALE">
                            Male
                          </SelectItem>
                          <SelectItem value="FEMALE">
                            Female
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                    control={form.control}
                    name="telePhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>TelePhone</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            // placeholder="+237"
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                />  

                {/* Address  */}
                <FormField
                    control={form.control}
                    name="currentAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Address:</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            // placeholder="+237"
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="cityName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City Name:</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="City Name"
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country:</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Country"
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="pinCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pin Code:</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="pinCode"
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                />     

                {/* Account Information */}
                {user?.isOAuth === false && (
                  <>
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="john.doe@example.com"
                              type="email"
                              disabled={isPending}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="******"
                              type="password"
                              disabled={isPending}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>New Password</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="******"
                              type="password"
                              disabled={isPending}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}

              {/* If account is a student accoun? then display  parent datails  */}
                <FormField
                    control={form.control}
                    name="parentFirstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Parent First Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Parent First Name"
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="parentMiddleName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Parent Middle Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Parent Middle Name"
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="parentLastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Parent Last Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Parent Last Name"
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                />
                <FormField
                  control={form.control}
                  name="parentGender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Parent Gender</FormLabel>
                      <Select
                        disabled={isPending}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="MALE">
                            Male
                          </SelectItem>
                          <SelectItem value="FEMALE">
                            Female
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                    control={form.control}
                    name="parentDateOfBirth"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Parent Date Of Birth</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="parentDateOfBirth"
                            type="date"
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                />
                 <FormField
                  control={form.control}
                  name="parentBloodGroup"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Parent Blood Groups</FormLabel>
                      <Select
                        disabled={isPending}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Blood Group" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="O +">
                              O +
                          </SelectItem>
                          <SelectItem value="O -">
                              O -
                          </SelectItem>
                          <SelectItem value="A +">
                              A +
                          </SelectItem>
                          <SelectItem value="A -">
                              A -
                          </SelectItem>
                          <SelectItem value="B +">
                              B +
                          </SelectItem>
                          <SelectItem value="B -">
                              B -
                          </SelectItem>
                          <SelectItem value="AB +">
                              AB + 
                          </SelectItem>
                          <SelectItem value="AB -">
                              AB - 
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                    control={form.control}
                    name="parentTelePhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Parent Telephone</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Parent Telephone"
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="parentEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Parent Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Parent Email"
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="parentEducation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Parent Education</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Parent Education"
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="parentProfession"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Parent Profession</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Parent Profession"
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                />
                <FormField
                  control={form.control}
                  name="typeOfIdentificationCard"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type Of Identification Card</FormLabel>
                      <Select
                        disabled={isPending}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a Document" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="National Identification Card">
                              National Identification Card
                          </SelectItem>
                          <SelectItem value="Passport">
                              Passport
                          </SelectItem>
                          <SelectItem value="Drivers Licience">
                              Drivers Licience 
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                    control={form.control}
                    name="identificationCardNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Identification Card Number</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="identification Card Number"
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                />
                {/* This will be a file upload field  */}
                <FormField
                    control={form.control}
                    name="identificationFile"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Identification File</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Identification File "
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                />
                {/* the next section will be a file display section of the first   */}
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <Select
                        disabled={isPending}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value={UserRole.STUDENT}>
                            Student
                          </SelectItem>
                          <SelectItem value={UserRole.USER}>
                            User
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {user?.isOAuth === false && (
                  <FormField
                    control={form.control}
                    name="isTwoFactorEnabled"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                          <FormLabel>Two Factor Authentication</FormLabel>
                          <FormDescription>
                            Enable two factor authentication for your account
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            disabled={isPending}
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                )}
              </div>
              <FormError message={error} />
              <FormSuccess message={success} />
              <Button
                disabled={isPending}
                type="submit"
              >
                Save
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
    
   );
}
 
export default SettingsPage;
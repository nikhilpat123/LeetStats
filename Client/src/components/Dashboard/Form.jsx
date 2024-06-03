import { useState } from "react";
/* eslint-disable no-unused-vars */
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import service from "@/Appwrite/config";
import FileSubmit from "../Dashboard/FileSubmit";
import { Query } from "appwrite"

const Form = () => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      studentName: "",
      userName: "",
    },
  });
  const [loading, setLoading] = useState(false);

  const userData = useSelector((state) => state.auth.userData);
  const [error, setError] = useState("");

  const submitStudent = async (data) => {
    try {
      setLoading(true);
      const student = await service.listStudents([Query.equal("userId",[userData.$id]),Query.equal("studentUsername",[data.userName])]);
      if (student.documents.length!=0) {setError("Student with userName already exists");return}
      await service.addStudent(data.studentName, data.userName, userData.$id);
      setError("")
      setLoading(false);
      window.location.reload();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild >
        <Menu className="w-4 h-4 sm:h-6 sm:w-6" />
      </SheetTrigger>
      <SheetContent side="left" >
        <Card className="my-6 w-full">
          <CardHeader>
            <CardTitle className="text-base sm:text-2xl">
              Add Students Data
            </CardTitle>
            <CardDescription className="text-sm sm:text-base">
              Add from a excel file which contains name and username of students
              or enter manually.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FileSubmit />
          </CardContent>
          <h1 className="flex justify-center">OR</h1>
          <CardContent>
            {error && (
              <p className="text-red-500 text-sm sm:text-base text-center">
                {error}
              </p>
            )}
            <form
              onSubmit={handleSubmit(submitStudent)}
              className="grid w-full max-w-sm items-center gap-3"
            >
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                id="name"
                placeholder="Name"
                {...register("studentName", { required: true })}
              />
              <Label htmlFor="username">Username</Label>
              <Input
                type="text"
                id="username"
                placeholder="LeetCode Username"
                {...register("userName", { required: true })}
              />
              <Button type="submit">Add</Button>
            </form>
          </CardContent>
        </Card>
      </SheetContent>
    </Sheet>
  );
};

export default Form;

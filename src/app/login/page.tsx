"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuthStore, type UserRole } from "@/store/auth-store";
import {
  GraduationCap,
  UserCircle,
  Users,
  ShieldCheck,
  ArrowLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";

const loginSchema = z.object({
  email: z.string().email("યોગ્ય ઈમેલ દાખલ કરો"),
  password: z.string().min(6, "પાસવર્ડ ઓછામાં ઓછો 6 અક્ષરોનો હોવો જોઈએ"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const roles: {
  value: UserRole;
  label: string;
  labelGu: string;
  icon: React.ReactNode;
  color: string;
}[] = [
  {
    value: "student",
    label: "Student",
    labelGu: "વિદ્યાર્થી",
    icon: <UserCircle className="w-6 h-6" />,
    color: "from-blue-500 to-cyan-500",
  },
  {
    value: "teacher",
    label: "Teacher",
    labelGu: "શિક્ષક",
    icon: <Users className="w-6 h-6" />,
    color: "from-purple-500 to-pink-500",
  },
  {
    value: "admin",
    label: "Admin",
    labelGu: "વહીવટકર્તા",
    icon: <ShieldCheck className="w-6 h-6" />,
    color: "from-orange-500 to-red-500",
  },
];

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedRole, setSelectedRole] = useState<UserRole>("student");
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { login } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      await login(data.email, data.password, selectedRole);

      // Route based on role
      if (selectedRole === "student") {
        router.push("/dashboard/student");
      } else if (selectedRole === "teacher") {
        router.push("/dashboard/teacher");
      } else {
        router.push("/dashboard/admin");
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => router.push("/")}
          className="mb-4 font-gujarati"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          પાછા જાઓ
        </Button>

        <Card className="shadow-2xl border-0">
          <CardHeader className="space-y-4 text-center pb-8">
            <div className="flex justify-center">
              <div className="bg-gradient-to-br from-blue-600 to-purple-700 p-4 rounded-2xl shadow-lg">
                <GraduationCap className="w-12 h-12 text-white" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              GayanSetu.AI
            </CardTitle>
            <CardDescription className="text-base font-gujarati">
              તમારા એકાઉન્ટમાં પ્રવેશ કરો
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Role Selection */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-gray-700 font-gujarati">
                તમારી ભૂમિકા પસંદ કરો
              </Label>
              <div className="grid grid-cols-3 gap-3">
                {roles.map((role) => (
                  <button
                    key={role.value}
                    type="button"
                    onClick={() => setSelectedRole(role.value)}
                    className={cn(
                      "flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-md",
                      selectedRole === role.value
                        ? `bg-gradient-to-br ${role.color} text-white border-transparent shadow-lg scale-105`
                        : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                    )}
                  >
                    <div className="mb-2">{role.icon}</div>
                    <span className="text-xs font-medium font-gujarati">
                      {role.labelGu}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="font-gujarati">
                  ઈમેલ
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="તમારો ઈમેલ દાખલ કરો"
                  {...register("email")}
                  className="h-11 font-gujarati"
                />
                {errors.email && (
                  <p className="text-sm text-red-500 font-gujarati">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="font-gujarati">
                  પાસવર્ડ
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="તમારો પાસવર્ડ દાખલ કરો"
                  {...register("password")}
                  className="h-11 font-gujarati"
                />
                {errors.password && (
                  <p className="text-sm text-red-500 font-gujarati">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full h-11 text-base font-medium bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 font-gujarati"
                disabled={isLoading}
              >
                {isLoading ? "લૉગિન થઈ રહ્યું છે..." : "લૉગિન કરો"}
              </Button>
            </form>

            <div className="text-center space-y-2">
              <button className="text-sm text-blue-600 hover:underline font-gujarati">
                પાસવર્ડ ભૂલી ગયા?
              </button>
              <p className="text-sm text-gray-600 font-gujarati">
                નવા વપરાશકર્તા છો?{" "}
                <button className="text-blue-600 hover:underline font-medium">
                  સાઇન અપ કરો
                </button>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Demo Credentials */}
        <Card className="mt-4 bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <p className="text-xs text-gray-600 font-gujarati text-center">
              <strong>ડેમો એકાઉન્ટ:</strong> કોઈપણ ઈમેલ અને પાસવર્ડ (6+ અક્ષરો)
              વાપરો
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
          <div className="text-center">Loading...</div>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}

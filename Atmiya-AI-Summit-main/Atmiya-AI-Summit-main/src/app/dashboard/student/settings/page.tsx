"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "@/store/auth-store";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Settings,
  User,
  Mail,
  Lock,
  Bell,
  Globe,
  Moon,
  Sun,
  Camera,
  Save,
} from "lucide-react";

export default function SettingsPage() {
  const { user, setUser } = useAuthStore();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [language, setLanguage] = useState("gu");
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleSaveProfile = () => {
    if (user) {
      setUser({ ...user, name, email });
    }
    // Show success toast
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50/30">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2.5 rounded-xl shadow-md">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 font-gujarati">
                સેટિંગ્સ
              </h1>
              <p className="text-sm text-gray-600 font-gujarati">
                તમારી પ્રોફાઇલ અને પસંદગીઓ વ્યવસ્થિત કરો
              </p>
            </div>
          </div>
        </div>
      </div>

      <ScrollArea className="px-6 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Profile Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-gujarati">
                  પ્રોફાઇલ માહિતી
                </CardTitle>
                <CardDescription className="font-gujarati">
                  તમારી અંગત માહિતી અપડેટ કરો
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar Upload */}
                <div className="flex items-center gap-6">
                  <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-2xl font-semibold">
                      {user?.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <Button variant="outline" className="font-gujarati">
                      <Camera className="w-4 h-4 mr-2" />
                      ફોટો બદલો
                    </Button>
                    <p className="text-xs text-gray-500 font-gujarati">
                      JPG, PNG અથવા GIF (મહત્તમ 2MB)
                    </p>
                  </div>
                </div>

                <Separator />

                {/* Name */}
                <div className="space-y-2">
                  <Label
                    htmlFor="name"
                    className="font-gujarati flex items-center gap-2"
                  >
                    <User className="w-4 h-4" />
                    નામ
                  </Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-11 font-gujarati"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="font-gujarati flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    ઈમેલ
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11"
                  />
                </div>

                {/* Save Button */}
                <div className="flex justify-end">
                  <Button
                    onClick={handleSaveProfile}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 font-gujarati"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    સાચવો
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Password Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-gujarati">
                  પાસવર્ડ બદલો
                </CardTitle>
                <CardDescription className="font-gujarati">
                  તમારો પાસવર્ડ સુરક્ષિત રાખો
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="current-password"
                    className="font-gujarati flex items-center gap-2"
                  >
                    <Lock className="w-4 h-4" />
                    વર્તમાન પાસવર્ડ
                  </Label>
                  <Input
                    id="current-password"
                    type="password"
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="new-password" className="font-gujarati">
                    નવો પાસવર્ડ
                  </Label>
                  <Input id="new-password" type="password" className="h-11" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password" className="font-gujarati">
                    પાસવર્ડ પુષ્ટિ કરો
                  </Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    className="h-11"
                  />
                </div>

                <div className="flex justify-end">
                  <Button variant="outline" className="font-gujarati">
                    પાસવર્ડ અપડેટ કરો
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Preferences Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-gujarati">પસંદગીઓ</CardTitle>
                <CardDescription className="font-gujarati">
                  તમારા એપ્લિકેશન અનુભવને વ્યક્તિગત કરો
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Language */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                      <Globe className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 font-gujarati">
                        ભાષા
                      </p>
                      <p className="text-sm text-gray-600 font-gujarati">
                        ઈન્ટરફેસ ભાષા પસંદ કરો
                      </p>
                    </div>
                  </div>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="h-10 px-4 rounded-lg border border-gray-200 bg-white font-gujarati"
                  >
                    <option value="gu">ગુજરાતી</option>
                    <option value="en">English</option>
                  </select>
                </div>

                <Separator />

                {/* Notifications */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center">
                      <Bell className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 font-gujarati">
                        સૂચનાઓ
                      </p>
                      <p className="text-sm text-gray-600 font-gujarati">
                        નવી સામગ્રી માટે સૂચનાઓ મેળવો
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setNotifications(!notifications)}
                    className={`relative w-14 h-7 rounded-full transition-colors ${
                      notifications ? "bg-blue-600" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full transition-transform ${
                        notifications ? "translate-x-7" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>

                <Separator />

                {/* Dark Mode */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                      {darkMode ? (
                        <Moon className="w-5 h-5 text-gray-600" />
                      ) : (
                        <Sun className="w-5 h-5 text-gray-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 font-gujarati">
                        ડાર્ક મોડ
                      </p>
                      <p className="text-sm text-gray-600 font-gujarati">
                        ડાર્ક થીમ સક્રિય કરો
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className={`relative w-14 h-7 rounded-full transition-colors ${
                      darkMode ? "bg-gray-700" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full transition-transform ${
                        darkMode ? "translate-x-7" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Account Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-purple-50">
              <CardHeader>
                <CardTitle className="text-xl font-gujarati">
                  તમારી પ્રગતિ
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-white rounded-xl">
                    <p className="text-3xl font-bold text-blue-600">12</p>
                    <p className="text-sm text-gray-600 font-gujarati">
                      પાઠો પૂર્ણ
                    </p>
                  </div>
                  <div className="text-center p-4 bg-white rounded-xl">
                    <p className="text-3xl font-bold text-green-600">85%</p>
                    <p className="text-sm text-gray-600 font-gujarati">
                      સરેરાશ સ્કોર
                    </p>
                  </div>
                  <div className="text-center p-4 bg-white rounded-xl">
                    <p className="text-3xl font-bold text-purple-600">7</p>
                    <p className="text-sm text-gray-600 font-gujarati">
                      દિવસો સક્રિય
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </ScrollArea>
    </div>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Settings,
  User,
  Bell,
  Palette,
  Shield,
  Languages,
  Save,
  KeyRound,
  Mail,
  Phone,
  School,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function TeacherSettingsPage() {
  // Profile settings
  const [name, setName] = useState("શ્રી રાજેશ પટેલ");
  const [email, setEmail] = useState("rajesh.patel@school.edu");
  const [phone, setPhone] = useState("+91 98765 43210");
  const [subject, setSubject] = useState("mathematics");
  
  // Preferences
  const [language, setLanguage] = useState("gujarati");
  const [theme, setTheme] = useState("light");
  const [notifications, setNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  
  const handleSaveProfile = () => {
    // Save profile logic
    alert("પ્રોફાઇલ સાચવ્યું!");
  };

  const handleSavePreferences = () => {
    // Save preferences logic
    alert("સેટિંગ્સ સાચવ્યા!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-slate-50/30 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4"
        >
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center shadow-lg">
            <Settings className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 font-gujarati">
              સેટિંગ્સ
            </h1>
            <p className="text-gray-600 font-gujarati">
              તમારી પ્રોફાઇલ અને પસંદગીઓ મેનેજ કરો
            </p>
          </div>
        </motion.div>

        {/* Profile Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-gujarati">
                <User className="w-5 h-5 text-blue-600" />
                પ્રોફાઇલ માહિતી
              </CardTitle>
              <CardDescription className="font-gujarati">
                તમારી વ્યક્તિગત માહિતી અપડેટ કરો
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                  {name.charAt(0)}
                </div>
                <div>
                  <Button variant="outline" size="sm" className="font-gujarati">
                    ફોટો બદલો
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="font-gujarati">પૂરું નામ</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="font-gujarati"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="font-gujarati">ઇમેઇલ</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="font-gujarati">ફોન નંબર</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="font-gujarati">મુખ્ય વિષય</Label>
                  <div className="relative">
                    <School className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 z-10" />
                    <Select value={subject} onValueChange={setSubject}>
                      <SelectTrigger className="pl-10 font-gujarati">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mathematics" className="font-gujarati">ગણિત</SelectItem>
                        <SelectItem value="science" className="font-gujarati">વિજ્ઞાન</SelectItem>
                        <SelectItem value="gujarati" className="font-gujarati">ગુજરાતી</SelectItem>
                        <SelectItem value="english" className="font-gujarati">અંગ્રેજી</SelectItem>
                        <SelectItem value="social_science" className="font-gujarati">સામાજિક વિજ્ઞાન</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Button onClick={handleSaveProfile} className="font-gujarati">
                <Save className="w-4 h-4 mr-2" />
                પ્રોફાઇલ સાચવો
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Preferences */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-gujarati">
                <Palette className="w-5 h-5 text-purple-600" />
                પસંદગીઓ
              </CardTitle>
              <CardDescription className="font-gujarati">
                એપ્લિકેશન સેટિંગ્સ કસ્ટમાઇઝ કરો
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="font-gujarati">ભાષા</Label>
                  <div className="relative">
                    <Languages className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 z-10" />
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger className="pl-10 font-gujarati">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gujarati" className="font-gujarati">ગુજરાતી</SelectItem>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="hindi">हिंदी</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="font-gujarati">થીમ</Label>
                  <Select value={theme} onValueChange={setTheme}>
                    <SelectTrigger className="font-gujarati">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light" className="font-gujarati">લાઇટ</SelectItem>
                      <SelectItem value="dark" className="font-gujarati">ડાર્ક</SelectItem>
                      <SelectItem value="system" className="font-gujarati">સિસ્ટમ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="font-gujarati">પુશ નોટિફિકેશન</Label>
                    <p className="text-sm text-gray-500 font-gujarati">
                      એપમાં નોટિફિકેશન મેળવો
                    </p>
                  </div>
                  <Switch
                    checked={notifications}
                    onCheckedChange={setNotifications}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="font-gujarati">ઇમેઇલ નોટિફિકેશન</Label>
                    <p className="text-sm text-gray-500 font-gujarati">
                      ઇમેઇલ દ્વારા અપડેટ્સ મેળવો
                    </p>
                  </div>
                  <Switch
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="font-gujarati">ઓટો સેવ</Label>
                    <p className="text-sm text-gray-500 font-gujarati">
                      કાર્ય આપોઆપ સાચવો
                    </p>
                  </div>
                  <Switch
                    checked={autoSave}
                    onCheckedChange={setAutoSave}
                  />
                </div>
              </div>

              <Button onClick={handleSavePreferences} className="font-gujarati">
                <Save className="w-4 h-4 mr-2" />
                સેટિંગ્સ સાચવો
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Security */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-gujarati">
                <Shield className="w-5 h-5 text-green-600" />
                સુરક્ષા
              </CardTitle>
              <CardDescription className="font-gujarati">
                તમારા એકાઉન્ટની સુરક્ષા મેનેજ કરો
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <KeyRound className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="font-medium font-gujarati">પાસવર્ડ</p>
                    <p className="text-sm text-gray-500 font-gujarati">
                      છેલ્લે 30 દિવસ પહેલા બદલ્યો
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="font-gujarati">
                  બદલો
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="font-medium font-gujarati">Two-Factor Authentication</p>
                    <p className="text-sm text-gray-500 font-gujarati">
                      વધારાની સુરક્ષા માટે
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="font-gujarati">
                  સેટઅપ
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

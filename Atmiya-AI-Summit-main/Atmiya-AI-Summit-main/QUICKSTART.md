# 🚀 Quick Start Guide

## Installation

### Option 1: Using PowerShell Script (Recommended)

```powershell
.\start.ps1
```

### Option 2: Manual Installation

```bash
# Install dependencies
npm install

# Install additional package
npm install tailwindcss-animate

# Start development server
npm run dev
```

## Access the Application

1. Open your browser
2. Navigate to `http://localhost:3000`
3. You'll see the animated landing page

## Login

1. Click "લૉગિન" (Login) or "શરૂ કરો" (Get Started)
2. Select your role: Student (વિદ્યાર્થી), Teacher (શિક્ષક), or Admin (વહીવટકર્તા)
3. Enter any email and password (minimum 6 characters)
4. Click "લૉગિન કરો" (Login)

## Explore Student Dashboard

After login, you'll be redirected to the student dashboard with these features:

### 1. AI ને પૂછો (Ask AI)

- Chat interface with AI in Gujarati
- Type your questions and get instant responses
- Save important messages to notes

### 2. શીખો (Learn)

- Browse AI-generated lessons
- Click "શરૂ કરો" (Start) to view lesson content
- Complete lessons and track progress

### 3. નોંધો (Notes)

- View all your saved messages
- Access conversation history
- Copy and share notes

### 4. અભ્યાસ (Practice)

- Take interactive quizzes
- Multiple choice questions
- Instant feedback on answers
- Track your score

### 5. સેટિંગ્સ (Settings)

- Update profile information
- Change password
- Adjust preferences
- View progress statistics

## Features Highlights

✅ Fully responsive design (mobile, tablet, desktop)
✅ Gujarati-first UI with beautiful typography
✅ Smooth animations and transitions
✅ Modern, clean interface
✅ Real-time state management
✅ Form validation
✅ Persistent authentication
✅ Role-based access control

## Development Features

- Hot Module Replacement (HMR)
- TypeScript type checking
- ESLint code quality
- Tailwind CSS IntelliSense
- Auto-save functionality

## Troubleshooting

### Port 3000 is already in use

```bash
# Kill the process using port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use a different port
npm run dev -- -p 3001
```

### Dependency errors

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build errors

```bash
# Clean build cache
rm -rf .next
npm run build
```

## Production Build

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- Zustand
- React Hook Form
- Zod
- Framer Motion
- Lucide React

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Next Steps

1. Explore all dashboard features
2. Try different roles (Student/Teacher/Admin)
3. Test responsive design on mobile
4. Check accessibility features
5. Review code structure

Enjoy learning with GayanSetu.AI! 🎓

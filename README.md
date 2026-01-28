# GayanSetu.AI - ગુજરાતી શિક્ષણ પ્લેટફોર્મ

Production-grade Generative AI education platform focused on Gujarati language students.

## 🚀 Features

### Landing Page

- Animated logo with gradient effects
- Clean, modern design with Gujarati-first UI
- Smooth transitions and micro-animations
- Responsive design for all devices

### Authentication

- Role-based login (Student, Teacher, Admin)
- Form validation with Zod
- Persistent authentication with Zustand
- Beautiful role selection UI

### Student Dashboard

- **Ask AI**: Gujarati prompt input with AI chat interface
- **Learn**: AI-generated lessons with rich content display
- **Notes/History**: View and manage conversation history
- **Practice**: Interactive Q&A and MCQ with instant feedback
- **Settings/Profile**: User profile management and preferences

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + CSS Variables
- **UI Components**: shadcn/ui
- **State Management**: Zustand
- **Forms**: React Hook Form
- **Validation**: Zod
- **Animations**: Framer Motion
- **Icons**: Lucide React

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🎨 Design System

### Colors

- Primary: Blue (#2563EB) to Purple (#9333EA) gradient
- Secondary: Gray shades for text and backgrounds
- Success: Green (#10B981)
- Error: Red (#EF4444)
- Warning: Orange (#F59E0B)

### Typography

- Main Font: Inter (Latin)
- Gujarati Font: Noto Sans Gujarati
- Fluid typography with responsive scaling

### Spacing

- Base unit: 4px (0.25rem)
- Consistent spacing scale: 4, 8, 12, 16, 24, 32, 48, 64px

## 🌐 Routes

- `/` - Landing page
- `/login` - Authentication page
- `/dashboard/student` - Student dashboard (redirects to Ask AI)
- `/dashboard/student/ask-ai` - AI chat interface
- `/dashboard/student/learn` - Learning modules
- `/dashboard/student/notes` - Notes and history
- `/dashboard/student/practice` - Practice exercises
- `/dashboard/student/settings` - User settings

## 🔐 Demo Credentials

Use any email and password (6+ characters) to login. The role determines which dashboard you'll see.

## 📱 Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## ♿ Accessibility

- WCAG 2.1 AA compliant
- Semantic HTML structure
- Keyboard navigation support
- Screen reader friendly
- High contrast ratios
- Focus indicators

## 🏗 Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── dashboard/
│   │   └── student/       # Student dashboard pages
│   ├── login/             # Authentication
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Landing page
│   └── globals.css        # Global styles
├── components/
│   └── ui/                # shadcn/ui components
├── lib/
│   └── utils.ts           # Utility functions
└── store/                 # Zustand stores
    ├── auth-store.ts      # Authentication state
    └── dashboard-store.ts # Dashboard state
```

## 🎯 Key Features

### Gujarati-First Design

- All UI text in Gujarati with English fallbacks
- Proper Gujarati font rendering
- Cultural design elements

### AI-Powered Learning

- Natural language processing in Gujarati
- Personalized learning paths
- Interactive practice sessions

### Modern UX Patterns

- Skeleton loading states
- Optimistic UI updates
- Smooth page transitions
- Micro-interactions

### Performance Optimized

- Code splitting
- Lazy loading
- Image optimization
- Fast page loads

## 🔄 State Management

### Auth Store

- User authentication
- Role-based access control
- Persistent sessions

### Dashboard Store

- AI chat messages
- Learning lessons
- Practice questions
- Saved notes

## 📝 Future Enhancements

- Real AI backend integration
- Voice input/output in Gujarati
- Offline mode support
- Progress tracking and analytics
- Teacher and Admin dashboards
- Mobile app (React Native)

## 📄 License

Private - All rights reserved

## 👨‍💻 Developer

Built with ❤️ for Gujarati students

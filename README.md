# FinTrakk 💰

A modern, responsive personal financial tracking application built with Next.js 15 and React 19. Track your expenses, set budgets, visualize spending patterns, and achieve your financial goals with an intuitive and beautiful interface.

![FinTrakk Dashboard](https://img.shields.io/badge/Next.js-15.2.4-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 📊 **Comprehensive Dashboard**
- Real-time financial overview with key metrics
- Interactive charts and visualizations
- Quick access to recent transactions
- Budget progress tracking

### 💳 **Transaction Management**
- Add, edit, and categorize transactions
- Bulk transaction operations
- Smart categorization with custom categories
- Transaction history with advanced filtering

### 🎯 **Budget & Goals**
- Set monthly budgets by category
- Track spending against budgets
- Create and monitor financial goals
- Progress visualization with charts

### 📈 **Advanced Analytics**
- Spending pattern analysis
- Category-wise expense breakdown
- Monthly/yearly trend comparisons
- Interactive charts using Recharts

### 🎨 **Modern UI/UX**
- Responsive design for all devices
- Dark/light theme support
- Smooth animations with Framer Motion
- Accessible components with Radix UI

### 🔧 **Developer Experience**
- TypeScript for type safety
- ESLint configuration
- Modern React patterns (hooks, context)
- Component-driven architecture

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/fintrakk.git
   cd fintrakk
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Start the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |

## 🏗️ Tech Stack

### Frontend Framework
- **Next.js 15** - React framework with App Router
- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development

### Styling & UI
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icons
- **Framer Motion** - Smooth animations

### Data Visualization
- **Recharts** - Composable charting library
- **React Hook Form** - Performant forms
- **Zod** - TypeScript-first schema validation

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

## 📁 Project Structure

```
fintrakk/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── loading.tsx        # Loading component
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── layout/           # Layout components
│   ├── pages/            # Page-specific components
│   └── providers/        # Context providers
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── public/               # Static assets
└── styles/               # Additional styles
```

## 🎯 Key Components

### Core Features
- **Dashboard** - Financial overview and metrics
- **Transaction History** - Complete transaction management
- **Analytics** - Spending analysis and trends
- **Budgets & Goals** - Budget tracking and goal setting
- **Profile & Settings** - User preferences and configuration

### UI Components
- **Responsive Navigation** - Mobile-friendly navigation
- **Modal System** - Transaction and settings modals
- **Chart Components** - Data visualization
- **Form Components** - Validated input forms
- **Theme System** - Dark/light mode support

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file in the root directory:

```env
# Add your environment variables here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Tailwind Configuration
The project uses a custom Tailwind configuration with:
- Custom color palette
- Animation utilities
- Responsive breakpoints
- Component variants

## 📱 Responsive Design

FinTrakk is fully responsive and optimized for:
- **Desktop** - Full-featured dashboard experience
- **Tablet** - Touch-friendly interface
- **Mobile** - Streamlined mobile navigation

## 🎨 Customization

### Themes
- Built-in dark/light theme support
- Customizable color schemes
- Smooth theme transitions

### Components
- Modular component architecture
- Easy to extend and customize
- Consistent design system

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Radix UI](https://www.radix-ui.com/) for accessible components
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Recharts](https://recharts.org/) for beautiful charts
- [Framer Motion](https://www.framer.com/motion/) for smooth animations

## 📞 Support

If you have any questions or need help:
- Open an [issue](https://github.com/yourusername/fintrakk/issues)
- Check the [documentation](https://github.com/yourusername/fintrakk/wiki)

---

**Built with ❤️ using Next.js, React, and TypeScript**

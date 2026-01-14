# 🌤️ Weather Forecast App

A beautiful, modern weather forecast application built with React, TypeScript, and Vite.

## ✨ Features

- 🔍 Search weather by city name
- 🌡️ Display current temperature with beautiful gradients
- 📊 Show detailed weather information (feels like, humidity, wind speed, pressure)
- 🎨 Modern, responsive design with smooth animations
- ⚡ Fast and lightweight using Vite
- 📱 Mobile-friendly interface
- 🎭 Beautiful UI with gradient backgrounds and glassmorphism effects

## 🚀 Getting Started

### Prerequisites

- Node.js (v20.19+ or v22.12+)
- npm or yarn
- OpenWeatherMap API key (free)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd kiro-app
```

2. Install dependencies:
```bash
npm install
```

3. Get your free API key:
   - Visit [OpenWeatherMap](https://openweathermap.org/api)
   - Sign up for a free account
   - Generate an API key

4. Add your API key:
   - Open `src/App.tsx`
   - Replace `YOUR_API_KEY_HERE` with your actual API key

5. Start the development server:
```bash
npm run dev
```

6. Open your browser and visit the URL shown in the terminal (usually `http://localhost:5173`)

## 🛠️ Built With

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **OpenWeatherMap API** - Weather data
- **CSS3** - Styling with modern features (gradients, animations, grid)

## 📦 Project Structure

```
src/
├── components/
│   ├── SearchBar.tsx       # Search input component
│   ├── SearchBar.css
│   ├── WeatherCard.tsx     # Weather display component
│   └── WeatherCard.css
├── types/
│   └── weather.ts          # TypeScript interfaces
├── App.tsx                 # Main app component
├── App.css
├── main.tsx               # App entry point
└── index.css              # Global styles
```

## 🎨 Design Features

- Gradient backgrounds with purple/pink theme
- Glassmorphism effects on cards
- Smooth animations and transitions
- Hover effects on interactive elements
- Loading states with spinner
- Error handling with beautiful error messages
- Responsive grid layout for weather details

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌐 Deploying to GitHub Pages

1. Update `vite.config.ts` with your repo name:
```typescript
export default defineConfig({
  base: '/your-repo-name/',
  // ...
})
```

2. Build and deploy:
```bash
npm run build
git add dist -f
git commit -m "Deploy to GitHub Pages"
git subtree push --prefix dist origin gh-pages
```

## 📄 License

MIT License - feel free to use this project for learning or personal use.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👨‍💻 Author

Built with ❤️ using React and TypeScript

// App.tsx

import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { DemoPage } from './pages/DemoPage';
import { UploadPage } from './pages/UploadPage';
import { ResultsPage } from './pages/ResultsPage';
import { DashboardPage } from './pages/DashboardPage';
import { ArrowRight } from 'lucide-react';

// Layout component that conditionally shows header/footer
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard';

  // Dashboard has its own header, so we render it without the app chrome
  if (isDashboard) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      {/* Header */}
      <header className="bg-cream/80 backdrop-blur-md border-b border-warm-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-8 lg:px-16 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-charcoal rounded-xl flex items-center justify-center">
                <span className="text-lime font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-semibold text-charcoal">SecondView</span>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <Link
                to="/"
                className="text-warm-gray-500 hover:text-charcoal transition-colors font-medium"
              >
                Home
              </Link>
              <Link
                to="/demo"
                className="text-warm-gray-500 hover:text-charcoal transition-colors font-medium"
              >
                Demo
              </Link>
              <Link
                to="/upload"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-charcoal text-white rounded-full font-medium hover:bg-warm-gray-800 transition-all group"
              >
                Get Started
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </nav>

            {/* Mobile menu button */}
            <button className="md:hidden p-2 text-charcoal">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-charcoal text-white">
        <div className="max-w-7xl mx-auto px-8 lg:px-16 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                  <span className="text-lime font-bold text-lg">S</span>
                </div>
                <span className="text-xl font-semibold">SecondView</span>
              </div>
              <p className="text-warm-gray-400 max-w-sm leading-relaxed">
                AI-powered blood test analysis that helps you understand your health in plain English.
              </p>
            </div>

            {/* Links */}
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-3 text-warm-gray-400">
                <li>
                  <Link to="/demo" className="hover:text-white transition-colors">
                    Demo
                  </Link>
                </li>
                <li>
                  <Link to="/upload" className="hover:text-white transition-colors">
                    Upload Test
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-3 text-warm-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-12 pt-8 border-t border-warm-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-warm-gray-500 text-sm">
              © 2024 SecondView. All rights reserved.
            </p>
            <p className="text-warm-gray-500 text-sm text-center md:text-right">
              For educational purposes only. Not medical advice. Always consult your doctor.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/demo" element={<DemoPage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

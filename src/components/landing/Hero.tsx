// components/landing/Hero.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Zap, Lock } from 'lucide-react';

const FuturisticHeart: React.FC = () => {
  return (
    <div className="relative w-full max-w-md aspect-square">
      {/* Ambient glow background */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl animate-pulse" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-48 h-48 bg-green-400/30 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>

      {/* Main heart container */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          viewBox="0 0 100 100"
          className="w-56 h-56 lg:w-64 lg:h-64"
          style={{ filter: 'drop-shadow(0 0 20px rgba(16, 185, 129, 0.5))' }}
        >
          {/* Outer glow heart */}
          <path
            d="M50 88 C20 60 10 40 10 30 C10 15 25 10 35 10 C42 10 48 15 50 20 C52 15 58 10 65 10 C75 10 90 15 90 30 C90 40 80 60 50 88Z"
            fill="none"
            stroke="rgba(16, 185, 129, 0.3)"
            strokeWidth="4"
            className="animate-pulse"
          />

          {/* Main heart outline with draw animation */}
          <path
            d="M50 88 C20 60 10 40 10 30 C10 15 25 10 35 10 C42 10 48 15 50 20 C52 15 58 10 65 10 C75 10 90 15 90 30 C90 40 80 60 50 88Z"
            fill="none"
            stroke="url(#heartGradient)"
            strokeWidth="2"
            strokeLinecap="round"
            style={{
              strokeDasharray: 300,
              animation: 'drawHeart 3s ease-in-out infinite',
            }}
          />

          {/* Inner circuit lines */}
          <g className="animate-pulse" style={{ animationDuration: '2s' }}>
            <path
              d="M50 75 L50 45 M40 55 L60 55"
              fill="none"
              stroke="rgba(16, 185, 129, 0.6)"
              strokeWidth="1"
              strokeLinecap="round"
            />
            <circle cx="50" cy="45" r="3" fill="rgba(16, 185, 129, 0.8)" />
            <circle cx="40" cy="55" r="2" fill="rgba(16, 185, 129, 0.6)" />
            <circle cx="60" cy="55" r="2" fill="rgba(16, 185, 129, 0.6)" />
          </g>

          {/* Heartbeat pulse ring */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="rgba(16, 185, 129, 0.4)"
            strokeWidth="1"
            style={{
              animation: 'pulseRing 1.5s ease-out infinite',
              transformOrigin: 'center',
            }}
          />
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="rgba(16, 185, 129, 0.2)"
            strokeWidth="1"
            style={{
              animation: 'pulseRing 1.5s ease-out infinite',
              animationDelay: '0.3s',
              transformOrigin: 'center',
            }}
          />

          {/* ECG line */}
          <path
            d="M10 50 L30 50 L35 50 L38 35 L42 65 L46 40 L50 55 L54 50 L90 50"
            fill="none"
            stroke="url(#ecgGradient)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              strokeDasharray: 200,
              animation: 'ecgLine 2s linear infinite',
            }}
          />

          {/* Gradients */}
          <defs>
            <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="50%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
            <linearGradient id="ecgGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor="#10b981" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-emerald-400 rounded-full"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
              animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
              opacity: 0.6,
            }}
          />
        ))}
      </div>

      {/* Scan line effect */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden rounded-full"
        style={{
          background: 'linear-gradient(transparent 50%, rgba(16, 185, 129, 0.03) 50%)',
          backgroundSize: '100% 4px',
        }}
      />

      {/* CSS Keyframes */}
      <style>{`
        @keyframes drawHeart {
          0% { stroke-dashoffset: 300; opacity: 0.3; }
          50% { stroke-dashoffset: 0; opacity: 1; }
          100% { stroke-dashoffset: -300; opacity: 0.3; }
        }
        @keyframes pulseRing {
          0% { transform: scale(0.8); opacity: 1; }
          100% { transform: scale(1.4); opacity: 0; }
        }
        @keyframes ecgLine {
          0% { stroke-dashoffset: 200; }
          100% { stroke-dashoffset: -200; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.6; }
          50% { transform: translateY(-20px) scale(1.2); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export const Hero: React.FC = () => {
  return (
    <section className="min-h-[90vh] bg-cream flex items-center relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-warm-white to-cream" />

      <div className="max-w-7xl mx-auto px-8 lg:px-16 py-20 lg:py-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Copy */}
          <div className="flex flex-col">
            {/* Social proof badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-warm-gray-100 rounded-full w-fit mb-8">
              <span className="w-2 h-2 bg-lime rounded-full animate-pulse" />
              <span className="text-sm text-warm-gray-600 font-medium">
                Trusted by 10,000+ users
              </span>
            </div>

            {/* Main headline */}
            <h1 className="text-5xl lg:text-7xl font-semibold text-charcoal leading-[1.1] mb-6 tracking-tight">
              Understand your
              <br />
              <span className="text-warm-gray-400">blood tests.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl lg:text-2xl text-warm-gray-500 mb-10 max-w-lg leading-relaxed">
              AI-powered analysis that explains your biomarkers in plain English—like a doctor would.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/upload"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-charcoal text-white rounded-full text-lg font-medium hover:bg-warm-gray-800 transition-all group"
              >
                Get Started
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/demo"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent text-charcoal rounded-full text-lg font-medium border-2 border-warm-gray-200 hover:border-warm-gray-300 hover:bg-warm-gray-50 transition-all"
              >
                View Demo
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center gap-6 mt-12 pt-8 border-t border-warm-gray-200">
              <TrustBadge icon={<Shield className="w-4 h-4" />} text="Private & Secure" />
              <TrustBadge icon={<Zap className="w-4 h-4" />} text="Results in 2 min" />
              <TrustBadge icon={<Lock className="w-4 h-4" />} text="HIPAA Compliant" />
            </div>
          </div>

          {/* Right: Futuristic Heart Animation in Bento Box */}
          <div className="relative">
            {/* Bento box container */}
            <div className="bg-gradient-to-br from-charcoal via-gray-900 to-charcoal rounded-3xl p-8 lg:p-12 border border-gray-700/50 shadow-2xl shadow-black/20 overflow-hidden">
              {/* Subtle grid pattern overlay */}
              <div
                className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                }}
              />

              {/* Corner accents */}
              <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-emerald-500/30 rounded-tl-lg" />
              <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-emerald-500/30 rounded-tr-lg" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-emerald-500/30 rounded-bl-lg" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-emerald-500/30 rounded-br-lg" />

              {/* Heart animation */}
              <div className="relative flex items-center justify-center min-h-[350px] lg:min-h-[400px]">
                <FuturisticHeart />
              </div>

              {/* Bottom label */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-xs text-emerald-400 font-medium tracking-wide uppercase">Live Analysis</span>
              </div>
            </div>

            {/* Floating glow behind the box */}
            <div className="absolute -inset-4 bg-emerald-500/10 rounded-3xl blur-2xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
};

interface TrustBadgeProps {
  icon: React.ReactNode;
  text: string;
}

const TrustBadge: React.FC<TrustBadgeProps> = ({ icon, text }) => (
  <div className="flex items-center gap-2 text-warm-gray-500">
    {icon}
    <span className="text-sm font-medium">{text}</span>
  </div>
);


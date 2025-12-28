// pages/SignUpPage.tsx
// Email sign up page

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';

export const SignUpPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const { signUp } = useAuth();
  const navigate = useNavigate();

  const validatePassword = (password: string) => {
    if (password.length < 6) {
      return 'Password must be at least 6 characters';
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    setLoading(true);

    const { error: signUpError } = await signUp(email, password);

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    // Show success message - Supabase may require email confirmation
    setSuccess(true);
    setLoading(false);

    // If email confirmation is disabled in Supabase, redirect to onboarding
    setTimeout(() => {
      navigate('/onboarding');
    }, 1500);
  };

  if (success) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-semibold text-charcoal mb-2">
            Account Created!
          </h1>
          <p className="text-warm-gray-500 mb-6">
            Redirecting you to complete your profile...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-charcoal mb-2">
            Create your account
          </h1>
          <p className="text-warm-gray-500">
            Start understanding your blood tests today
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Error message */}
          {error && (
            <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-2">
              Email address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-warm-gray-400" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-white border border-warm-gray-200 rounded-xl text-charcoal placeholder-warm-gray-400 focus:outline-none focus:ring-2 focus:ring-charcoal/20 focus:border-charcoal transition-all"
                placeholder="you@example.com"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-charcoal mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-warm-gray-400" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-white border border-warm-gray-200 rounded-xl text-charcoal placeholder-warm-gray-400 focus:outline-none focus:ring-2 focus:ring-charcoal/20 focus:border-charcoal transition-all"
                placeholder="At least 6 characters"
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-charcoal mb-2">
              Confirm password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-warm-gray-400" />
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-white border border-warm-gray-200 rounded-xl text-charcoal placeholder-warm-gray-400 focus:outline-none focus:ring-2 focus:ring-charcoal/20 focus:border-charcoal transition-all"
                placeholder="Confirm your password"
              />
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-charcoal text-white rounded-xl font-medium hover:bg-warm-gray-800 disabled:bg-warm-gray-300 disabled:cursor-not-allowed transition-all group"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Create Account
                <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              </>
            )}
          </button>
        </form>

        {/* Sign in link */}
        <p className="text-center text-warm-gray-500 mt-6">
          Already have an account?{' '}
          <Link to="/signin" className="text-charcoal font-medium hover:underline">
            Sign in
          </Link>
        </p>

        {/* Terms */}
        <p className="text-center text-xs text-warm-gray-400 mt-6">
          By signing up, you agree to our{' '}
          <a href="#" className="underline hover:text-warm-gray-600">Terms of Service</a>
          {' '}and{' '}
          <a href="#" className="underline hover:text-warm-gray-600">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
};

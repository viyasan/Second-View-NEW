// pages/OnboardingPage.tsx
// Profile onboarding page - collect name, age, sex

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Calendar, Users, ArrowRight, AlertCircle } from 'lucide-react';

type Sex = 'male' | 'female' | 'other' | 'prefer_not_to_say';

export const OnboardingPage: React.FC = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [sex, setSex] = useState<Sex | ''>('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { user, profile, updateProfile, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/signup');
    }
  }, [user, authLoading, navigate]);

  // Skip if already onboarded
  useEffect(() => {
    if (profile?.onboarding_completed) {
      navigate('/upload');
    }
  }, [profile, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }

    if (!age || parseInt(age) < 1 || parseInt(age) > 120) {
      setError('Please enter a valid age');
      return;
    }

    if (!sex) {
      setError('Please select an option');
      return;
    }

    setLoading(true);

    const { error: updateError } = await updateProfile({
      name: name.trim(),
      age: parseInt(age),
      sex: sex as Sex,
      onboarding_completed: true,
    });

    if (updateError) {
      setError(updateError.message);
      setLoading(false);
      return;
    }

    // Redirect to upload page
    navigate('/upload');
  };

  if (authLoading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-charcoal/30 border-t-charcoal rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-lime/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <User className="w-8 h-8 text-charcoal" />
          </div>
          <h1 className="text-3xl font-semibold text-charcoal mb-2">
            Let's get to know you
          </h1>
          <p className="text-warm-gray-500">
            This helps us personalize your health insights
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Error message */}
          {error && (
            <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-charcoal mb-2">
              What's your name?
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-warm-gray-400" />
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-white border border-warm-gray-200 rounded-xl text-charcoal placeholder-warm-gray-400 focus:outline-none focus:ring-2 focus:ring-charcoal/20 focus:border-charcoal transition-all"
                placeholder="Enter your name"
              />
            </div>
          </div>

          {/* Age */}
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-charcoal mb-2">
              How old are you?
            </label>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-warm-gray-400" />
              <input
                id="age"
                type="number"
                min="1"
                max="120"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-white border border-warm-gray-200 rounded-xl text-charcoal placeholder-warm-gray-400 focus:outline-none focus:ring-2 focus:ring-charcoal/20 focus:border-charcoal transition-all"
                placeholder="Enter your age"
              />
            </div>
          </div>

          {/* Sex */}
          <div>
            <label className="block text-sm font-medium text-charcoal mb-3">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-warm-gray-400" />
                What's your biological sex?
              </div>
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: 'male', label: 'Male' },
                { value: 'female', label: 'Female' },
                { value: 'other', label: 'Other' },
                { value: 'prefer_not_to_say', label: 'Prefer not to say' },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setSex(option.value as Sex)}
                  className={`
                    px-4 py-3 rounded-xl text-sm font-medium border-2 transition-all
                    ${sex === option.value
                      ? 'border-charcoal bg-charcoal text-white'
                      : 'border-warm-gray-200 bg-white text-charcoal hover:border-warm-gray-300'
                    }
                  `}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <p className="text-xs text-warm-gray-400 mt-2">
              This helps us provide accurate reference ranges for your biomarkers
            </p>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-charcoal text-white rounded-xl font-medium hover:bg-warm-gray-800 disabled:bg-warm-gray-300 disabled:cursor-not-allowed transition-all group mt-8"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Continue to Upload
                <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              </>
            )}
          </button>
        </form>

        {/* Privacy note */}
        <p className="text-center text-xs text-warm-gray-400 mt-6">
          Your information is private and secure. We never share your data.
        </p>
      </div>
    </div>
  );
};

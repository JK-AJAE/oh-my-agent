'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Auth logic delegated to backend — out of scope for this MVP page
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-spark-50 to-white">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">
        {/* Brand */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-spark-500">
            Worldcraft <span aria-hidden="true">✨</span>
          </h1>
          <p className="text-gray-500 mt-2">Welcome back, builder!</p>
        </div>

        {/* Login form */}
        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          <div>
            <label
              htmlFor="login-email"
              className="block text-sm font-bold text-gray-600 mb-1"
            >
              Email
            </label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-spark-300 focus:border-spark-400 text-lg transition"
              placeholder="your@email.com"
              autoComplete="email"
              required
              aria-required="true"
            />
          </div>

          <div>
            <label
              htmlFor="login-password"
              className="block text-sm font-bold text-gray-600 mb-1"
            >
              Password
            </label>
            <input
              id="login-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-spark-300 focus:border-spark-400 text-lg transition"
              placeholder="••••••••"
              autoComplete="current-password"
              required
              aria-required="true"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-spark-400 to-sunset-400 text-white rounded-xl font-bold text-lg hover:opacity-90 hover:scale-[1.02] transition-all duration-150 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-spark-300"
          >
            Let&apos;s Go! <span aria-hidden="true">🚀</span>
          </button>
        </form>

        {/* Sign-up link */}
        <p className="text-center text-sm text-gray-500 mt-6">
          New here?{' '}
          <Link
            href="/onboarding"
            className="text-spark-500 font-bold hover:underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-spark-300 rounded"
          >
            Start Creating
          </Link>
        </p>
      </div>
    </div>
  );
}

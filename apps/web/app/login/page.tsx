"use client";

import { useState } from "react";
import Link from "next/link";
import api from "../../lib/axios";
import { loginSchema, type LoginFormData } from "@repo/zod";
import { Outfit } from "next/font/google";
import { Sparkles, Mail, Lock, Eye, EyeOff, AlertCircle, LogIn, CheckCircle2 } from "lucide-react";

const outfit = Outfit({ subsets: ["latin"], weight: ['300', '400', '500', '600', '700', '800'] });

type FieldErrors = Partial<Record<keyof LoginFormData, string>>;

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="flex items-center gap-1.5 text-xs text-red-500 mt-1.5 pl-1">
      <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
      {message}
    </p>
  );
}

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [otp, setOtp] = useState("");
  const [formData, setFormData] = useState<LoginFormData>({ email: "", password: "" });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const validateField = (name: keyof LoginFormData, value: string) => {
    const result = loginSchema.shape[name].safeParse(value);
    setFieldErrors((prev) => ({
      ...prev,
      [name]: result.success ? undefined : result.error.errors[0]?.message,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    const result = loginSchema.safeParse(formData);
    if (!result.success) {
      const errors: FieldErrors = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof LoginFormData;
        if (!errors[field]) errors[field] = err.message;
      });
      setFieldErrors(errors);
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/auth/login", formData);
      if (res.data.success) {
        setStep(2);
      } else {
        setServerError(res.data.message || "Login failed. Please try again.");
      }
    } catch (error: any) {
      const message = error.response?.data?.message || "Network error. Please check your connection and try again.";
      setServerError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setServerError("Please enter a valid 6-digit OTP.");
      return;
    }

    setLoading(true);
    setServerError(null);
    try {
      const res = await api.post("/auth/verify-login", {
        email: formData.email,
        otp,
      });
      if (res.data.success) {
        window.location.href = "/dashboard";
      } else {
        setServerError(res.data.message || "Invalid OTP. Please try again.");
      }
    } catch (error: any) {
      const message = error.response?.data?.message || "Verification failed. Please try again.";
      setServerError(message);
    } finally {
      setLoading(false);
    }
  };

  const inputBase =
    "w-full bg-[#FAFAFC] border rounded-2xl text-[#1A1A2E] placeholder-[#8E8E9F] py-4 text-sm focus:outline-none transition-all duration-300";

  const inputClass = (field: keyof LoginFormData) =>
    `${inputBase} ${fieldErrors[field] ? "border-red-300 focus:border-red-500 focus:bg-white" : "border-slate-200 hover:border-slate-300 focus:border-[#FF8C8C] focus:bg-white"}`;

  return (
    <div className={`min-h-screen bg-[#FAFAFC] flex flex-col items-center justify-center p-4 py-12 relative overflow-hidden font-sans ${outfit.className}`}>
      
      {/* Decorative Blobs */}
      <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-[#FF8C8C]/20 blur-[100px] pointer-events-none rounded-full" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[300px] h-[300px] bg-[#FFF3B0]/30 blur-[100px] pointer-events-none rounded-full" />
      <div className="absolute top-[20%] left-[-10%] w-[250px] h-[250px] bg-[#5E8F8B]/20 blur-[100px] pointer-events-none rounded-full" />

      <div className="w-full max-w-md relative z-10 flex flex-col items-center">
        
        {/* Brand */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-[#FF8C8C] rounded-2xl flex items-center justify-center text-white shadow-sm">
            <Sparkles className="w-6 h-6" />
          </div>
          <span className="text-3xl font-bold text-[#1A1A2E] tracking-tight">
            SupportSutra
          </span>
        </div>

        {/* Card */}
        <div className="w-full bg-white rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 lg:p-10 border border-slate-100">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-[#1A1A2E]">Welcome Back</h1>
            <p className="text-[#8E8E9F] text-sm mt-2 font-medium">Log in to continue your wellness journey</p>
          </div>

          {serverError && (
            <div className="flex items-start gap-3 bg-red-50 border border-red-100 rounded-2xl p-4 mb-6">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-600 font-medium">{serverError}</p>
            </div>
          )}

          {step === 1 ? (
            <div className="space-y-5">
              {/* Email */}
              <div>
                <label htmlFor="login-email" className="block text-xs font-bold text-[#8E8E9F] uppercase tracking-wider mb-2 pl-2">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <Mail className={`w-5 h-5 ${fieldErrors.email ? "text-red-400" : "text-[#D0D0E0]"}`} />
                  </div>
                  <input
                    id="login-email"
                    type="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (fieldErrors.email) validateField("email", e.target.value);
                    }}
                    onBlur={(e) => validateField("email", e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSubmit(e as any)}
                    placeholder="you@example.com"
                    className={`${inputClass("email")} pl-12 pr-4`}
                    aria-describedby={fieldErrors.email ? "email-error" : undefined}
                    aria-invalid={!!fieldErrors.email}
                  />
                </div>
                <FieldError message={fieldErrors.email} />
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-2 pl-2 pr-1">
                  <label htmlFor="login-password" className="block text-xs font-bold text-[#8E8E9F] uppercase tracking-wider">
                    Password
                  </label>
                  <Link href="/forgot-password" className="text-xs font-bold text-[#FF8C8C] hover:text-[#ff7373] transition-colors">
                    Forgot?
                  </Link>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <Lock className={`w-5 h-5 ${fieldErrors.password ? "text-red-400" : "text-[#D0D0E0]"}`} />
                  </div>
                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={formData.password}
                    onChange={(e) => {
                      setFormData({ ...formData, password: e.target.value });
                      if (fieldErrors.password) validateField("password", e.target.value);
                    }}
                    onBlur={(e) => validateField("password", e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSubmit(e as any)}
                    placeholder="Enter your password"
                    className={`${inputClass("password")} pl-12 pr-12`}
                    aria-describedby={fieldErrors.password ? "password-error" : undefined}
                    aria-invalid={!!fieldErrors.password}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-4 flex items-center text-[#D0D0E0] hover:text-[#1A1A2E] transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                <FieldError message={fieldErrors.password} />
              </div>

              {/* Submit */}
              <button
                id="login-submit"
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-[#1A1A2E] text-white rounded-2xl font-bold py-4 text-sm transition-all duration-300 hover:bg-[#2A2A4A] hover:shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed mt-2 flex items-center justify-center gap-2 group"
              >
                {loading ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <LogIn className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="text-center mb-4">
                <p className="text-[#8E8E9F] text-sm font-medium">
                  We've sent a 6-digit code to <span className="text-[#1A1A2E] font-bold">{formData.email}</span>
                </p>
              </div>
              
              <div>
                <label htmlFor="login-otp" className="block text-xs font-bold text-[#8E8E9F] uppercase tracking-wider mb-2 pl-2">
                  Verification Code
                </label>
                <input
                  id="login-otp"
                  type="text"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  onKeyDown={(e) => e.key === "Enter" && handleVerifyOtp(e as any)}
                  placeholder="000000"
                  className={`${inputBase} text-center text-2xl tracking-[0.5em] font-bold h-20 border-slate-200 hover:border-slate-300 focus:border-[#FF8C8C] focus:bg-white`}
                  autoFocus
                />
              </div>

              <button
                id="otp-submit"
                type="button"
                onClick={handleVerifyOtp}
                disabled={loading || otp.length !== 6}
                className="w-full bg-[#1A1A2E] text-white rounded-2xl font-bold py-4 text-sm transition-all duration-300 hover:bg-[#2A2A4A] hover:shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed mt-2 flex items-center justify-center gap-2 group"
              >
                {loading ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Verifying...
                  </>
                ) : (
                  <>
                    Verify & Sign In
                    <CheckCircle2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full text-[#8E8E9F] text-xs font-bold uppercase tracking-widest hover:text-[#1A1A2E] transition-colors"
              >
                Back to Login
              </button>
            </div>
          )}

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-slate-100" />
            <span className="text-xs text-[#8E8E9F] font-bold tracking-widest uppercase">Or</span>
            <div className="flex-1 h-px bg-slate-100" />
          </div>

          {/* Google */}
          <button
            id="login-google"
            type="button"
            className="w-full flex items-center justify-center gap-3 bg-white border-2 border-slate-100 rounded-2xl py-3.5 text-sm font-bold text-[#1A1A2E] hover:bg-slate-50 hover:border-slate-200 transition-all duration-300"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
          </button>
        </div>

        <p className="text-[#8E8E9F] mt-8 text-center font-medium">
          New to SupportSutra?{" "}
          <Link href="/register" className="text-[#1A1A2E] font-bold hover:text-[#FF8C8C] transition-colors underline decoration-2 underline-offset-4 decoration-[#FF8C8C]/30 hover:decoration-[#FF8C8C]">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}

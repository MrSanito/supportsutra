"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import api from "../../lib/axios";
import { registerSchema, type RegisterFormData } from "@repo/zod";
import { Outfit } from "next/font/google";
import { Sparkles, Mail, Lock, Eye, EyeOff, AlertCircle, Phone, User as UserIcon, CheckCircle2, ChevronRight, Camera } from "lucide-react";
import toast from "react-hot-toast";
import { useAppContext } from "../context/AppContext";

const outfit = Outfit({ subsets: ["latin"], weight: ['300', '400', '500', '600', '700', '800'] });

type FieldErrors = Partial<Record<keyof RegisterFormData, string>>;

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="flex items-center gap-1.5 text-xs text-red-500 mt-1.5 pl-1">
      <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
      {message}
    </p>
  );
}

const inputBase =
  "w-full bg-[#FAFAFC] border rounded-2xl text-[#1A1A2E] placeholder-[#8E8E9F] py-4 text-sm focus:outline-none transition-all duration-300";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    agreeTerms: false as boolean,
  });

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatarPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handlePasswordChange = (val: string) => {
    setFormData({ ...formData, password: val });
    let s = 0;
    if (val.length >= 8) s++;
    if (/[A-Z]/.test(val)) s++;
    if (/[0-9]/.test(val)) s++;
    if (/[^A-Za-z0-9]/.test(val)) s++;
    setPasswordStrength(s);
    if (fieldErrors.password) validateField("password", val);
  };

  const validateField = (name: keyof Omit<RegisterFormData, "agreeTerms">, value: string) => {
    const result = registerSchema.shape[name].safeParse(value);
    setFieldErrors((prev) => ({
      ...prev,
      [name]: result.success ? undefined : (result.error.errors[0]?.message ?? undefined),
    }));
  };

  const inputClass = (field: keyof Omit<RegisterFormData, "agreeTerms">) =>
    `${inputBase} ${fieldErrors[field] ? "border-red-300 focus:border-red-500 focus:bg-white" : "border-slate-200 hover:border-slate-300 focus:border-[#5E8F8B] focus:bg-white"}`;

  const strengthColors = ["", "#EF4444", "#F59E0B", "#22C55E", "#10B981"];
  const strengthLabels = ["", "Weak", "Fair", "Good", "Strong"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Registration form submitted");
    setServerError(null);

    const payload = { ...formData, agreeTerms: formData.agreeTerms as true };
    const result = registerSchema.safeParse(payload);

    if (!result.success) {
      console.log("Validation failed:", result.error.format());
      const errors: FieldErrors = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof RegisterFormData;
        if (!errors[field]) errors[field] = err.message;
      });
      setFieldErrors(errors);
      const first = result.error.errors[0]?.path[0] as string;
      document.getElementById(`register-${first}`)?.focus();
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/auth/register", formData);
      if (res.data.success) {
        localStorage.setItem("email", formData.email)
        setIsSuccess(true);
      } else {
        setServerError(res.data.message || "Registration failed.");
      }
    } catch (error: any) {
      const message = error.response?.data?.message || "Network error. Please check your connection and try again.";
      setServerError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen bg-[#FAFAFC] flex flex-col items-center justify-center p-4 py-12 relative overflow-hidden font-sans ${outfit.className}`}>
      
      {/* Decorative Blobs */}
      <div className="absolute top-[-10%] left-[-5%] w-[400px] h-[400px] bg-[#5E8F8B]/15 blur-[100px] pointer-events-none rounded-full" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[300px] h-[300px] bg-[#FFF3B0]/25 blur-[100px] pointer-events-none rounded-full" />
      <div className="absolute top-[20%] right-[-10%] w-[250px] h-[250px] bg-[#FF8C8C]/15 blur-[100px] pointer-events-none rounded-full" />

      <div className="w-full max-w-xl relative z-10 flex flex-col items-center">
        
        {/* Brand */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-[#5E8F8B] rounded-2xl flex items-center justify-center text-white shadow-sm">
            <Sparkles className="w-6 h-6" />
          </div>
          <span className="text-3xl font-bold text-[#1A1A2E] tracking-tight">
            SupportSutra
          </span>
        </div>

        <div className="w-full bg-white rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 lg:p-10 border border-slate-100">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-[#1A1A2E]">Create Account</h1>
            <p className="text-[#8E8E9F] text-sm mt-2 font-medium">Join us and start your wellness journey</p>
          </div>

          {isSuccess ? (
            <div className="flex flex-col items-center justify-center bg-[#E8F3F1] rounded-3xl p-8 mb-2 text-center">
              <div className="w-16 h-16 bg-white text-[#5E8F8B] rounded-2xl shadow-sm flex items-center justify-center mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-bold text-[#1A1A2E] mb-2">Registration Successful!</h2>
              <p className="text-[#5E8F8B] text-sm mb-8 font-medium">
                Please check your email to verify your account.
              </p>
              <Link
                href="/login"
                className="w-full bg-[#1A1A2E] text-white rounded-2xl font-bold py-4 text-sm transition-all duration-300 hover:bg-[#2A2A4A] hover:shadow-lg flex items-center justify-center"
              >
                Proceed to Login
              </Link>
            </div>
          ) : (
            <>
              {serverError && (
                <div className="flex items-start gap-3 bg-red-50 border border-red-100 rounded-2xl p-4 mb-6">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-600 font-medium">{serverError}</p>
                </div>
              )}

              {/* Google */}
              <button
                id="register-google"
                type="button"
                onClick={() => toast.error("Coming Soon")}
                className="w-full flex items-center justify-center gap-3 bg-white border-2 border-slate-100 rounded-2xl py-3.5 text-sm font-bold text-[#1A1A2E] hover:bg-slate-50 hover:border-slate-200 transition-all duration-300 mb-6"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Sign up with Google
              </button>

              {/* Divider */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 h-px bg-slate-100" />
                <span className="text-xs text-[#8E8E9F] font-bold tracking-widest uppercase">Or</span>
                <div className="flex-1 h-px bg-slate-100" />
              </div>

              <div className="space-y-5">
                {/* Profile Picture */}
                <div className="flex items-center gap-5 p-4 bg-[#FAFAFC] border border-slate-100 rounded-2xl hover:border-[#5E8F8B]/50 transition-colors cursor-pointer group" onClick={() => fileInputRef.current?.click()}>
                  <div className="w-16 h-16 bg-white border-2 border-dashed border-[#D0D0E0] rounded-full overflow-hidden flex-shrink-0 relative flex items-center justify-center group-hover:border-[#5E8F8B] transition-colors">
                    {avatarPreview ? (
                      <Image src={avatarPreview} alt="Profile" fill className="object-cover" />
                    ) : (
                      <Camera className="w-6 h-6 text-[#D0D0E0] group-hover:text-[#5E8F8B] transition-colors" />
                    )}
                  </div>
                  <div>
                    <span className="text-sm font-bold text-[#1A1A2E] group-hover:text-[#5E8F8B] transition-colors block">
                      {avatarPreview ? "Change photo" : "Upload profile photo"}
                    </span>
                    <p className="text-xs text-[#8E8E9F] mt-1 font-medium">JPG, PNG or GIF · Optional</p>
                  </div>
                  <input ref={fileInputRef} id="avatar-input" type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
                </div>

                {/* First & Last Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="register-firstName" className="block text-xs font-bold text-[#8E8E9F] uppercase tracking-wider mb-2 pl-2">
                      First Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                        <UserIcon className={`w-5 h-5 ${fieldErrors.firstName ? "text-red-400" : "text-[#D0D0E0]"}`} />
                      </div>
                      <input
                        id="register-firstName"
                        type="text"
                        autoComplete="given-name"
                        value={formData.firstName}
                        onChange={(e) => {
                          setFormData({ ...formData, firstName: e.target.value });
                          if (fieldErrors.firstName) validateField("firstName", e.target.value);
                        }}
                        onBlur={(e) => validateField("firstName", e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSubmit(e as any)}
                        placeholder="Aarav"
                        className={`${inputClass("firstName")} pl-12 pr-4`}
                        aria-invalid={!!fieldErrors.firstName}
                      />
                    </div>
                    <FieldError message={fieldErrors.firstName} />
                  </div>
                  <div>
                    <label htmlFor="register-lastName" className="block text-xs font-bold text-[#8E8E9F] uppercase tracking-wider mb-2 pl-2">
                      Last Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                        <UserIcon className={`w-5 h-5 ${fieldErrors.lastName ? "text-red-400" : "text-[#D0D0E0]"}`} />
                      </div>
                      <input
                        id="register-lastName"
                        type="text"
                        autoComplete="family-name"
                        value={formData.lastName}
                        onChange={(e) => {
                          setFormData({ ...formData, lastName: e.target.value });
                          if (fieldErrors.lastName) validateField("lastName", e.target.value);
                        }}
                        onBlur={(e) => validateField("lastName", e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSubmit(e as any)}
                        placeholder="Sharma"
                        className={`${inputClass("lastName")} pl-12 pr-4`}
                        aria-invalid={!!fieldErrors.lastName}
                      />
                    </div>
                    <FieldError message={fieldErrors.lastName} />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="register-email" className="block text-xs font-bold text-[#8E8E9F] uppercase tracking-wider mb-2 pl-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                      <Mail className={`w-5 h-5 ${fieldErrors.email ? "text-red-400" : "text-[#D0D0E0]"}`} />
                    </div>
                    <input
                      id="register-email"
                      type="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (fieldErrors.email) validateField("email", e.target.value);
                      }}
                      onBlur={(e) => validateField("email", e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSubmit(e as any)}
                      placeholder="aarav@example.com"
                      className={`${inputClass("email")} pl-12 pr-4`}
                      aria-invalid={!!fieldErrors.email}
                    />
                  </div>
                  <FieldError message={fieldErrors.email} />
                </div>

                {/* Indian Phone */}
                <div>
                  <label htmlFor="register-phone" className="block text-xs font-bold text-[#8E8E9F] uppercase tracking-wider mb-2 pl-2">
                    Mobile Number
                  </label>
                  <div className={`flex rounded-2xl border ${fieldErrors.phone ? "border-red-300 focus-within:border-red-500 bg-white" : "border-slate-200 hover:border-slate-300 focus-within:border-[#5E8F8B] bg-[#FAFAFC] focus-within:bg-white"} transition-all duration-300 overflow-hidden`}>
                    <div className="flex items-center gap-2 px-4 py-4 border-r border-slate-200 bg-slate-50 flex-shrink-0">
                      <span className="text-sm">🇮🇳</span>
                      <span className="text-sm font-bold text-[#1A1A2E]">+91</span>
                    </div>
                    <div className="relative flex-1">
                      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                        <Phone className={`w-5 h-5 ${fieldErrors.phone ? "text-red-400" : "text-[#D0D0E0]"}`} />
                      </div>
                      <input
                        id="register-phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, "").slice(0, 10);
                          setFormData({ ...formData, phone: val });
                          if (fieldErrors.phone) validateField("phone", val);
                        }}
                        onBlur={(e) => validateField("phone", e.target.value.replace(/\D/g, ""))}
                        onKeyDown={(e) => e.key === "Enter" && handleSubmit(e as any)}
                        placeholder="98765 43210"
                        maxLength={10}
                        className="w-full bg-transparent text-[#1A1A2E] placeholder-[#8E8E9F] py-4 pl-12 pr-4 text-sm focus:outline-none"
                        aria-invalid={!!fieldErrors.phone}
                      />
                    </div>
                  </div>
                  <FieldError message={fieldErrors.phone} />
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="register-password" className="block text-xs font-bold text-[#8E8E9F] uppercase tracking-wider mb-2 pl-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                      <Lock className={`w-5 h-5 ${fieldErrors.password ? "text-red-400" : "text-[#D0D0E0]"}`} />
                    </div>
                    <input
                      id="register-password"
                      type={showPassword ? "text" : "password"}
                      minLength={8}
                      value={formData.password}
                      onChange={(e) => handlePasswordChange(e.target.value)}
                      onBlur={(e) => validateField("password", e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSubmit(e as any)}
                      placeholder="Min. 8 characters"
                      className={`${inputClass("password")} pl-12 pr-12`}
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

                  {/* Strength bar */}
                  {formData.password && (
                    <div className="mt-3 px-1 space-y-2">
                      <div className="flex gap-1.5">
                        {[1, 2, 3, 4].map((lvl) => (
                          <div
                            key={lvl}
                            className="flex-1 h-1.5 rounded-full transition-all duration-300"
                            style={{ backgroundColor: passwordStrength >= lvl ? strengthColors[passwordStrength] : "#E5E5EA" }}
                          />
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-3">
                          {[
                            { label: "8+ chars", ok: formData.password.length >= 8 },
                            { label: "Uppercase", ok: /[A-Z]/.test(formData.password) },
                            { label: "Number", ok: /[0-9]/.test(formData.password) },
                            { label: "Symbol", ok: /[^A-Za-z0-9]/.test(formData.password) },
                          ].map(({ label, ok }) => (
                            <span key={label} className={`text-[10px] font-bold uppercase tracking-wider transition-colors ${ok ? "text-[#22C55E]" : "text-[#8E8E9F]"}`}>
                              {ok ? "✓" : "·"} {label}
                            </span>
                          ))}
                        </div>
                        {passwordStrength > 0 && (
                          <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: strengthColors[passwordStrength] }}>
                            {strengthLabels[passwordStrength]}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                  <FieldError message={fieldErrors.password} />
                </div>

                {/* Terms */}
                <div className="pt-2">
                  <div className="flex items-start gap-3">
                    <button
                      type="button"
                      id="register-agreeTerms"
                      onClick={() => {
                        const next = !formData.agreeTerms;
                        setFormData({ ...formData, agreeTerms: next });
                        if (fieldErrors.agreeTerms && next) {
                          setFieldErrors((prev) => ({ ...prev, agreeTerms: undefined }));
                        }
                      }}
                      className={`mt-1 w-5 h-5 rounded-md border-2 flex-shrink-0 transition-all duration-300 flex items-center justify-center ${
                        fieldErrors.agreeTerms
                          ? "border-red-400 bg-red-50"
                          : formData.agreeTerms
                          ? "bg-[#5E8F8B] border-[#5E8F8B]"
                          : "border-[#D0D0E0] bg-white hover:border-[#5E8F8B]"
                      }`}
                      aria-checked={formData.agreeTerms}
                      role="checkbox"
                    >
                      {formData.agreeTerms && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                    </button>
                    <p className="text-sm text-[#8E8E9F] font-medium leading-relaxed">
                      I agree to the{" "}
                      <Link href="/terms" className="text-[#1A1A2E] font-bold hover:text-[#5E8F8B] transition-colors underline decoration-2 underline-offset-4 decoration-[#5E8F8B]/30 hover:decoration-[#5E8F8B]">Terms of Service</Link>
                      {" "}and{" "}
                      <Link href="/privacy" className="text-[#1A1A2E] font-bold hover:text-[#5E8F8B] transition-colors underline decoration-2 underline-offset-4 decoration-[#5E8F8B]/30 hover:decoration-[#5E8F8B]">Privacy Policy</Link>
                    </p>
                  </div>
                  <FieldError message={fieldErrors.agreeTerms} />
                </div>

                {/* Submit */}
                <button
                  id="register-submit"
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full bg-[#1A1A2E] text-white rounded-2xl font-bold py-4 text-sm transition-all duration-300 hover:bg-[#2A2A4A] hover:shadow-lg active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6 group"
                >
                  {loading ? (
                    <>
                      <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Creating account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </>
          )}
        </div>

        <p className="text-[#8E8E9F] mt-8 text-center font-medium">
          Already have an account?{" "}
          <Link href="/login" className="text-[#1A1A2E] font-bold hover:text-[#5E8F8B] transition-colors underline decoration-2 underline-offset-4 decoration-[#5E8F8B]/30 hover:decoration-[#5E8F8B]">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

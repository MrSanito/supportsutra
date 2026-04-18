"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import api from "../../lib/axios.ts";



import { registerSchema, type RegisterFormData } from "@repo/zod";

type FieldErrors = Partial<Record<keyof RegisterFormData, string>>;

/* ── Inline error component ── */
function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="flex items-center gap-1.5 text-xs text-[#F87171] mt-1.5 pl-0.5">
      <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      {message}
    </p>
  );
}

const inputBase =
  "w-full bg-[#06080F] border text-white placeholder-[#1F2937] py-3.5 text-sm focus:outline-none transition-all duration-150";

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
    `${inputBase} ${fieldErrors[field] ? "border-[#F87171] focus:border-[#F87171] bg-[#0F0608]" : "border-[#111827] hover:border-[#1A2333] focus:border-[#6366F1] focus:bg-[#08090F]"}`;

  const strengthColors = ["", "#EF4444", "#F59E0B", "#22C55E", "#10B981"];
  const strengthLabels = ["", "Weak", "Fair", "Good", "Strong"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    const payload = { ...formData, agreeTerms: formData.agreeTerms as true };
    const result = registerSchema.safeParse(payload);

    if (!result.success) {
      const errors: FieldErrors = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof RegisterFormData;
        if (!errors[field]) errors[field] = err.message;
      });
      setFieldErrors(errors);
      // Scroll to first error
      const first = result.error.errors[0]?.path[0] as string;
      document.getElementById(`register-${first}`)?.focus();
      return;
    }

    setLoading(true);
    try {
      console.log("Submitting registration data:", result.data);
      const res = await api.post("/auth/register", result.data);
      
      console.log("Registration response:", res.data);
      
      if (res.data.success) {
        console.log("Registration successful check!");
        localStorage.setItem("email", formData.email)
        setIsSuccess(true);
      } else {
        setServerError(res.data.message || "Registration failed. Please try again.");
      }
    } catch (error: any) {
      console.error("Registration error:", error);
      const message = error.response?.data?.message || "Network error. Please check your connection and try again.";
      setServerError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020408] flex items-center justify-center p-4 py-12 relative overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: "linear-gradient(#818CF8 1px, transparent 1px), linear-gradient(to right, #818CF8 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-[#6366F1]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[300px] h-[300px] bg-[#8B5CF6]/4 blur-[100px] pointer-events-none" />

      <div className="w-full max-w-lg relative z-10">
        {/* Brand */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="w-10 h-10 bg-[#6366F1] flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <span className="text-2xl font-bold text-white tracking-tight">
            Support<span className="text-[#818CF8]">Sutra</span>
          </span>
        </div>

        <div className="bg-[#030509] border border-[#0F1623] p-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-black text-white tracking-tight">Create account</h1>
            <p className="text-[#4B5563] text-sm mt-1.5">Fill in your details to get started</p>
          </div>

          {/* Success message */}
          {isSuccess && (
            <div className="flex flex-col items-center justify-center bg-[#0A1A0F] border border-[#10B981]/30 p-8 mb-6 text-center">
              <div className="w-12 h-12 bg-[#10B981] rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-white mb-2">Registration Successful!</h2>
              <p className="text-[#10B981] text-sm mb-6">
                Please check your email to verify your account.
              </p>
              <Link
                href="/login"
                className="w-full bg-[#10B981] text-white font-bold py-3 text-sm tracking-wide transition-all duration-150 hover:bg-[#059669]"
              >
                Proceed to Login
              </Link>
            </div>
          )}

          {!isSuccess && (
            <>
          {/* Server error banner */}
          {serverError && (
            <div className="flex items-start gap-3 bg-[#1A0A0A] border border-[#F87171]/30 p-4 mb-6">
              <svg className="w-5 h-5 text-[#F87171] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18A2 2 0 003.58 21h16.84a2 2 0 001.76-2.94L13.71 3.86a2 2 0 00-3.42 0z" />
              </svg>
              <p className="text-sm text-[#F87171]">{serverError}</p>
            </div>
          )}

          {/* Google */}
          <button
            id="register-google"
            type="button"
            className="w-full flex items-center justify-center gap-3 bg-[#08090E] border border-[#1A2035] py-3.5 text-sm font-medium text-[#9CA3AF] hover:bg-[#0D1120] hover:border-[#252D45] hover:text-white transition-all duration-150 mb-6"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Sign up with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-[#0F1623]" />
            <span className="text-xs text-[#374151] font-medium tracking-widest uppercase">or</span>
            <div className="flex-1 h-px bg-[#0F1623]" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Profile Picture */}
            <div className="flex items-center gap-5 p-4 bg-[#06080F] border border-[#111827] hover:border-[#1A2333] transition-colors">
              <button
                type="button"
                id="avatar-upload-btn"
                onClick={() => fileInputRef.current?.click()}
                className="w-16 h-16 overflow-hidden border border-[#1A2035] bg-[#08090E] hover:border-[#6366F1] transition-colors flex-shrink-0 relative flex items-center justify-center"
                aria-label="Upload profile picture"
              >
                {avatarPreview ? (
                  <Image src={avatarPreview} alt="Profile" fill className="object-cover" />
                ) : (
                  <svg className="w-7 h-7 text-[#1F2937]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                )}
              </button>
              <div>
                <button type="button" onClick={() => fileInputRef.current?.click()} className="text-sm font-semibold text-[#6366F1] hover:text-[#818CF8] transition-colors block">
                  {avatarPreview ? "Change photo" : "Upload profile photo"}
                </button>
                <p className="text-xs text-[#374151] mt-1">JPG, PNG or GIF · Optional</p>
              </div>
              <input ref={fileInputRef} id="avatar-input" type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
            </div>

            {/* First & Last Name */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="register-firstName" className="block text-xs font-semibold text-[#6B7280] uppercase tracking-widest mb-2">
                  First Name
                </label>
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
                  placeholder="Aarav"
                  className={`${inputClass("firstName")} px-4`}
                  aria-invalid={!!fieldErrors.firstName}
                />
                <FieldError message={fieldErrors.firstName} />
              </div>
              <div>
                <label htmlFor="register-lastName" className="block text-xs font-semibold text-[#6B7280] uppercase tracking-widest mb-2">
                  Last Name
                </label>
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
                  placeholder="Sharma"
                  className={`${inputClass("lastName")} px-4`}
                  aria-invalid={!!fieldErrors.lastName}
                />
                <FieldError message={fieldErrors.lastName} />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="register-email" className="block text-xs font-semibold text-[#6B7280] uppercase tracking-widest mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <svg className={`w-4 h-4 ${fieldErrors.email ? "text-[#F87171]/70" : "text-[#374151]"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
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
                  placeholder="aarav@example.com"
                  className={`${inputClass("email")} pl-11 pr-4`}
                  aria-invalid={!!fieldErrors.email}
                />
                {fieldErrors.email && (
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                    <svg className="w-4 h-4 text-[#F87171]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                )}
              </div>
              <FieldError message={fieldErrors.email} />
            </div>

            {/* Indian Phone */}
            <div>
              <label htmlFor="register-phone" className="block text-xs font-semibold text-[#6B7280] uppercase tracking-widest mb-2">
                Mobile Number
              </label>
              <div className={`flex border ${fieldErrors.phone ? "border-[#F87171] bg-[#0F0608]" : "border-[#111827] hover:border-[#1A2333] focus-within:border-[#6366F1]"} transition-all duration-150 bg-[#06080F]`}>
                <div className="flex items-center gap-2 px-4 py-3.5 border-r border-[#111827] bg-[#040609] flex-shrink-0">
                  <span className="text-sm">🇮🇳</span>
                  <span className="text-sm font-semibold text-[#6B7280]">+91</span>
                </div>
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <svg className={`w-4 h-4 ${fieldErrors.phone ? "text-[#F87171]/70" : "text-[#374151]"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
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
                    placeholder="98765 43210"
                    maxLength={10}
                    className="w-full bg-transparent text-white placeholder-[#1F2937] py-3.5 pl-11 pr-4 text-sm focus:outline-none"
                    aria-invalid={!!fieldErrors.phone}
                  />
                </div>
              </div>
              <FieldError message={fieldErrors.phone} />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="register-password" className="block text-xs font-semibold text-[#6B7280] uppercase tracking-widest mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <svg className={`w-4 h-4 ${fieldErrors.password ? "text-[#F87171]/70" : "text-[#374151]"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  id="register-password"
                  type={showPassword ? "text" : "password"}
                  minLength={8}
                  value={formData.password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  onBlur={(e) => validateField("password", e.target.value)}
                  placeholder="Min. 8 characters"
                  className={`${inputClass("password")} pl-11 pr-11`}
                  aria-invalid={!!fieldErrors.password}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-4 flex items-center text-[#374151] hover:text-[#6366F1] transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>

              {/* Strength bar */}
              {formData.password && (
                <div className="mt-2.5 space-y-1.5">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((lvl) => (
                      <div
                        key={lvl}
                        className="flex-1 h-0.5 transition-all duration-300"
                        style={{ backgroundColor: passwordStrength >= lvl ? strengthColors[passwordStrength] : "#111827" }}
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
                        <span key={label} className={`text-xs transition-colors ${ok ? "text-[#22C55E]" : "text-[#1F2937]"}`}>
                          {ok ? "✓" : "·"} {label}
                        </span>
                      ))}
                    </div>
                    {passwordStrength > 0 && (
                      <span className="text-xs font-medium" style={{ color: strengthColors[passwordStrength] }}>
                        {strengthLabels[passwordStrength]}
                      </span>
                    )}
                  </div>
                </div>
              )}
              <FieldError message={fieldErrors.password} />
            </div>

            {/* Terms */}
            <div className="space-y-1">
              <div className="flex items-start gap-3 pt-2">
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
                  className={`mt-0.5 w-4 h-4 border flex-shrink-0 transition-all duration-150 flex items-center justify-center ${
                    fieldErrors.agreeTerms
                      ? "border-[#F87171] bg-[#0F0608]"
                      : formData.agreeTerms
                      ? "bg-[#6366F1] border-[#6366F1]"
                      : "border-[#1F2937] bg-[#06080F] hover:border-[#374151]"
                  }`}
                  aria-checked={formData.agreeTerms}
                  role="checkbox"
                >
                  {formData.agreeTerms && (
                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3.5} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
                <p className="text-xs text-[#374151] leading-relaxed">
                  I agree to the{" "}
                  <Link href="/terms" className="text-[#6366F1] hover:text-[#818CF8] transition-colors">Terms of Service</Link>
                  {" "}and{" "}
                  <Link href="/privacy" className="text-[#6366F1] hover:text-[#818CF8] transition-colors">Privacy Policy</Link>
                </p>
              </div>
              <FieldError message={fieldErrors.agreeTerms} />
            </div>

            {/* Submit */}
            <button
              id="register-submit"
              type="submit"
              disabled={loading}
              className="w-full bg-[#6366F1] text-white font-bold py-3.5 text-sm tracking-wide transition-all duration-150 hover:bg-[#5558E3] active:bg-[#4B4DD6] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
            >
              {loading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Creating account...
                </>
              ) : (
                <>
                  Create Account
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </>
              )}
            </button>
          </form>
            </>
          )}
        </div>

        <p className="text-sm text-[#374151] mt-8 text-center">
          Already have an account?{" "}
          <Link href="/login" className="text-[#818CF8] hover:text-white font-semibold transition-colors">
            Sign in
          </Link>
        </p>

        <div className="flex items-center justify-center gap-2 mt-8">
          <svg className="w-3.5 h-3.5 text-[#1F2937]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span className="text-xs text-[#1F2937]">256-bit SSL encrypted · Data never sold</span>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import api from "../../../lib/axios";
import { DoctorProfileSchema, type DoctorProfileData } from "@repo/zod";
import { Outfit } from "next/font/google";
import { Sparkles, Stethoscope, Award, Clock, FileText, DollarSign, AlertCircle, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";

const outfit = Outfit({ subsets: ["latin"], weight: ['300', '400', '500', '600', '700', '800'] });

type FieldErrors = Partial<Record<keyof DoctorProfileData, string>>;

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="flex items-center gap-1.5 text-xs text-red-500 mt-1.5 pl-1">
      <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
      {message}
    </p>
  );
}

export default function DoctorOnboardingPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<Partial<DoctorProfileData>>({
    specialization: "",
    licenseNumber: "",
    experienceYears: 0,
    bio: "",
    consultationFee: 0,
    availableFrom: "09:00",
    availableTo: "17:00",
  });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const validateField = (name: keyof DoctorProfileData, value: any) => {
    const result = DoctorProfileSchema.shape[name].safeParse(value);
    setFieldErrors((prev) => ({
      ...prev,
      [name]: result.success ? undefined : result.error.errors[0]?.message,
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const parsedValue = name === "experienceYears" || name === "consultationFee" ? Number(value) : value;
    
    setFormData((prev) => ({
      ...prev,
      [name]: parsedValue,
    }));
    
    validateField(name as keyof DoctorProfileData, parsedValue);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    const result = DoctorProfileSchema.safeParse(formData);
    if (!result.success) {
      const errors: FieldErrors = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof DoctorProfileData;
        if (!errors[field]) errors[field] = err.message;
      });
      setFieldErrors(errors);
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/doctor/profile", formData);
      if (res.data.success) {
        toast.success("Doctor profile updated successfully!");
        router.push("/dashboard");
      } else {
        setServerError(res.data.message || "Failed to save profile. Please try again.");
      }
    } catch (error: any) {
      const message = error.response?.data?.error || error.response?.data?.message || "Network error. Please check your connection and try again.";
      setServerError(message);
    } finally {
      setLoading(false);
    }
  };

  const inputBase =
    "w-full bg-[#FAFAFC] border rounded-2xl text-[#1A1A2E] placeholder-[#8E8E9F] py-4 text-sm focus:outline-none transition-all duration-300";

  const inputClass = (field: keyof DoctorProfileData) =>
    `${inputBase} ${fieldErrors[field] ? "border-red-300 focus:border-red-500 focus:bg-white" : "border-slate-200 hover:border-slate-300 focus:border-[#FF8C8C] focus:bg-white"}`;

  return (
    <div className={`min-h-screen bg-[#FAFAFC] flex flex-col items-center justify-center p-4 py-12 relative overflow-hidden font-sans ${outfit.className}`}>
      
      {/* Decorative Blobs */}
      <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-[#FF8C8C]/20 blur-[100px] pointer-events-none rounded-full animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[300px] h-[300px] bg-[#FFF3B0]/30 blur-[100px] pointer-events-none rounded-full animate-pulse" />
      <div className="absolute top-[20%] left-[-10%] w-[250px] h-[250px] bg-[#5E8F8B]/20 blur-[100px] pointer-events-none rounded-full animate-pulse" />

      <div className="w-full max-w-2xl relative z-10 flex flex-col items-center">
        
        {/* Brand */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-[#FF8C8C] rounded-2xl flex items-center justify-center text-white shadow-sm">
            <Stethoscope className="w-6 h-6" />
          </div>
          <span className="text-3xl font-bold text-[#1A1A2E] tracking-tight">
            SupportSutra
          </span>
        </div>

        {/* Card */}
        <div className="w-full bg-white rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 lg:p-10 border border-slate-100">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-[#1A1A2E]">Doctor Onboarding</h1>
            <p className="text-[#8E8E9F] text-sm mt-2 font-medium">Complete your professional wellness profile</p>
          </div>

          {serverError && (
            <div className="flex items-start gap-3 bg-red-50 border border-red-100 rounded-2xl p-4 mb-6">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-600 font-medium">{serverError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Specialization & License */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="specialization" className="block text-xs font-bold text-[#8E8E9F] uppercase tracking-wider mb-2 pl-2">
                  Specialization
                </label>
                <div className="relative">
                  <select
                    id="specialization"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                    className={`${inputBase} ${fieldErrors.specialization ? "border-red-300 focus:border-red-500 focus:bg-white" : "border-slate-200 hover:border-slate-300 focus:border-[#FF8C8C] focus:bg-white"} px-4`}
                    aria-invalid={!!fieldErrors.specialization}
                  >
                    <option value="" disabled>Select specialization</option>
                    <option value="Physician">Physician</option>
                    <option value="Psychiatrist">Psychiatrist</option>
                  </select>
                </div>   
                <FieldError message={fieldErrors.specialization} />
              </div>

              <div>
                <label htmlFor="licenseNumber" className="block text-xs font-bold text-[#8E8E9F] uppercase tracking-wider mb-2 pl-2">
                  License Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <Award className="w-5 h-5 text-[#D0D0E0]" />
                  </div>
                  <input
                    id="licenseNumber"
                    name="licenseNumber"
                    type="text"
                    value={formData.licenseNumber}
                    onChange={handleChange}
                    placeholder="REG-12345"
                    className={`${inputClass("licenseNumber")} pl-12 pr-4`}
                  />
                </div>
                <FieldError message={fieldErrors.licenseNumber} />
              </div>
            </div>

            {/* Experience & Fees */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="experienceYears" className="block text-xs font-bold text-[#8E8E9F] uppercase tracking-wider mb-2 pl-2">
                  Experience (Years)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <Award className="w-5 h-5 text-[#D0D0E0]" />
                  </div>
                  <input
                    id="experienceYears"
                    name="experienceYears"
                    type="number"
                    min="0"
                    value={formData.experienceYears || ""}
                    onChange={handleChange}
                    placeholder="5"
                    className={`${inputClass("experienceYears")} pl-12 pr-4`}
                  />
                </div>
                <FieldError message={fieldErrors.experienceYears} />
              </div>

              <div>
                <label htmlFor="consultationFee" className="block text-xs font-bold text-[#8E8E9F] uppercase tracking-wider mb-2 pl-2">
                  Consultation Fee ($)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <DollarSign className="w-5 h-5 text-[#D0D0E0]" />
                  </div>
                  <input
                    id="consultationFee"
                    name="consultationFee"
                    type="number"
                    min="0"
                    value={formData.consultationFee || ""}
                    onChange={handleChange}
                    placeholder="50"
                    className={`${inputClass("consultationFee")} pl-12 pr-4`}
                  />
                </div>
                <FieldError message={fieldErrors.consultationFee} />
              </div>
            </div>

            {/* Availability */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="availableFrom" className="block text-xs font-bold text-[#8E8E9F] uppercase tracking-wider mb-2 pl-2">
                  Available From
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <Clock className="w-5 h-5 text-[#D0D0E0]" />
                  </div>
                  <input
                    id="availableFrom"
                    name="availableFrom"
                    type="time"
                    value={formData.availableFrom}
                    onChange={handleChange}
                    className={`${inputClass("availableFrom")} pl-12 pr-4`}
                  />
                </div>
                <FieldError message={fieldErrors.availableFrom} />
              </div>

              <div>
                <label htmlFor="availableTo" className="block text-xs font-bold text-[#8E8E9F] uppercase tracking-wider mb-2 pl-2">
                  Available To
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <Clock className="w-5 h-5 text-[#D0D0E0]" />
                  </div>
                  <input
                    id="availableTo"
                    name="availableTo"
                    type="time"
                    value={formData.availableTo}
                    onChange={handleChange}
                    className={`${inputClass("availableTo")} pl-12 pr-4`}
                  />
                </div>
                <FieldError message={fieldErrors.availableTo} />
              </div>
            </div>

            {/* Bio */}
            <div>
              <label htmlFor="bio" className="block text-xs font-bold text-[#8E8E9F] uppercase tracking-wider mb-2 pl-2">
                Professional Bio
              </label>
              <div className="relative">
                <div className="absolute top-4 left-4 pointer-events-none">
                  <FileText className="w-5 h-5 text-[#D0D0E0]" />
                </div>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Share your medical expertise and clinical background..."
                  maxLength={1000}
                  className={`${inputClass("bio")} pl-12 pr-4 h-32 leading-relaxed resize-none`}
                />
              </div>
              <div className="flex justify-between items-center mt-1.5 px-1">
                <FieldError message={fieldErrors.bio} />
                <span className="text-[10px] font-bold text-[#8E8E9F] tracking-wider uppercase ml-auto">
                  {formData.bio?.length || 0}/1000
                </span>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1A1A2E] text-white rounded-2xl font-bold py-4 text-sm transition-all duration-300 hover:bg-[#2A2A4A] hover:shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed mt-2 flex items-center justify-center gap-2 group"
            >
              {loading ? (
                <>
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Saving Profile...
                </>
              ) : (
                <>
                  Complete Onboarding
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-[#8E8E9F] mt-8 text-center font-medium">
          Not a healthcare professional?{" "}
          <Link href="/dashboard" className="text-[#1A1A2E] font-bold hover:text-[#FF8C8C] transition-colors underline decoration-2 underline-offset-4 decoration-[#FF8C8C]/30 hover:decoration-[#FF8C8C]">
            Go back to Dashboard
          </Link>
        </p>
      </div>
    </div>
  );
}

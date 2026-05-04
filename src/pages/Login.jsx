import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router";
import { useDispatch } from "react-redux";
import { login as loginService, getCurrentUser } from "../services/auth.service.js";
import { addUser } from "../store/userSlice.js";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const handleLogin = async (data) => {
    try {
      setLoading(true);
      setServerError(null);
      const session = await loginService(data);
      if (session.success) {
        const response = await getCurrentUser();
        dispatch(addUser(response.data.user));
        navigate("/dashboard");
      }
    } catch (error) {
      setServerError(error.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-dm min-h-screen bg-[#030303] flex items-center justify-center relative overflow-hidden">
      {/* Mesh Gradient Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-violet-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/20 rounded-full blur-[120px] animate-pulse [animation-delay:2s]" />
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-indigo-600/10 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      </div>

      {/* Card Container */}
      <div className="relative z-10 w-full max-w-90 mx-4">
        {/* Glow Effect behind card */}
        <div className="absolute -inset-1 bg-linear-to-r from-violet-600 to-indigo-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />

        <div className="relative bg-black/40 border border-white/10 rounded-2xl p-5 md:p-6 backdrop-blur-2xl shadow-2xl overflow-hidden">
          {/* Top Decorative Line */}
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-violet-500 to-transparent opacity-50" />

          {/* Logo & Header - Horizontal Layout */}
          <div className="flex items-center gap-4 mb-5">
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/30 shrink-0 relative group">
              <div className="absolute inset-0 bg-white/20 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300" />
              <svg width="22" height="22" viewBox="0 0 18 18" fill="none" className="relative z-10">
                <path
                  d="M9 2L15 5.5V12.5L9 16L3 12.5V5.5L9 2Z"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <path d="M9 6L12 7.5V11L9 12.5L6 11V7.5L9 6Z" fill="white" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">Welcome back</h1>
              <p className="text-gray-500 text-[11px] font-medium">Continue to your dashboard</p>
            </div>
          </div>

          {/* Server Error */}
          {serverError && (
            <div className="mb-4 animate-error rounded-xl border border-red-500/20 bg-red-500/5 p-2.5 text-xs text-red-200 flex items-center gap-2">
              <svg
                width="14"
                height="14"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="text-red-500 shrink-0"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <p className="font-medium">{serverError}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(handleLogin)} className="space-y-3.5">
            {/* Email Field */}
            <div className="space-y-1 group">
              <div className="flex items-center justify-between ml-1">
                <label className="block text-[10px] font-bold text-gray-500 tracking-widest uppercase transition-colors group-focus-within:text-violet-400">
                  Email
                </label>
              </div>
              <div className="relative">
                <div
                  className={`absolute inset-0 bg-violet-500/10 rounded-xl blur-md transition-opacity duration-300 ${focused === "email" ? "opacity-100" : "opacity-0"}`}
                />
                <div
                  className={`relative rounded-xl border transition-all duration-300 ${
                    errors.email
                      ? "border-red-500/30 bg-red-500/5"
                      : focused === "email"
                        ? "border-violet-500/50 bg-white/5"
                        : "border-white/5 bg-white/5 hover:border-white/10"
                  }`}
                >
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    <svg
                      width="16"
                      height="16"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      />
                    </svg>
                  </div>
                  <input
                    type="email"
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused(null)}
                    placeholder="name@exampley.com"
                    className="w-full bg-transparent pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none rounded-xl"
                    {...register("email", {
                      required: {
                        value: true,
                        message: "Email is required",
                      },
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Please enter a valid email address",
                      },
                    })}
                  />
                </div>
              </div>
              {errors.email && (
                <p className="text-[10px] text-red-400 ml-1 font-semibold">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-1 group">
              <div className="flex items-center justify-between ml-1">
                <label className="block text-[10px] font-bold text-gray-500 tracking-widest uppercase transition-colors group-focus-within:text-violet-400">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  size="sm"
                  className="text-[10px] font-bold text-violet-400 hover:text-violet-300 uppercase"
                >
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <div
                  className={`absolute inset-0 bg-violet-500/10 rounded-xl blur-md transition-opacity duration-300 ${focused === "password" ? "opacity-100" : "opacity-0"}`}
                />
                <div
                  className={`relative rounded-xl border transition-all duration-300 ${
                    errors.password
                      ? "border-red-500/30 bg-red-500/5"
                      : focused === "password"
                        ? "border-violet-500/50 bg-white/5"
                        : "border-white/5 bg-white/5 hover:border-white/10"
                  }`}
                >
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    <svg
                      width="16"
                      height="16"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    onFocus={() => setFocused("password")}
                    onBlur={() => setFocused(null)}
                    placeholder="••••••••"
                    className="w-full bg-transparent pl-10 pr-10 py-2.5 text-sm text-white placeholder-gray-600 outline-none rounded-xl"
                    {...register("password", {
                      required: {
                        value: true,
                        message: "Password is required",
                      },
                      minLength: {
                        value: 6,
                        message: "Min 6 characters required",
                      },
                      maxLength: {
                        value: 16,
                        message: "Max 16 characters allowed",
                      },
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors cursor-pointer"
                  >
                    <svg
                      width="18"
                      height="18"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {showPassword ? (
                        <>
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                          <line x1="1" y1="1" x2="23" y2="23" />
                        </>
                      ) : (
                        <>
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </>
                      )}
                    </svg>
                  </button>
                </div>
              </div>
              {errors.password && (
                <p className="text-[10px] text-red-400 ml-1 font-semibold">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full relative group overflow-hidden rounded-xl py-2.5 text-sm font-bold text-white transition-all duration-300 disabled:opacity-70 active:scale-[0.98] cursor-pointer mt-1"
              style={{
                background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
                boxShadow: "0 8px 25px -10px rgba(124, 58, 237, 0.4)",
              }}
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <div className="relative flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      />
                    </svg>
                    <span>Signing in...</span>
                  </>
                ) : (
                  <span>Sign In</span>
                )}
              </div>
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-4">
            <div className="flex-1 h-px bg-white/5" />
            <span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">or</span>
            <div className="flex-1 h-px bg-white/5" />
          </div>

          {/* Social Login */}
          <button className="w-full flex items-center justify-center gap-2.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl px-4 py-2.5 text-sm text-white font-bold transition-all duration-300 cursor-pointer active:scale-[0.98]">
            <svg width="16" height="16" viewBox="0 0 18 18">
              <path
                d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
                fill="#4285F4"
              />
              <path
                d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"
                fill="#34A853"
              />
              <path
                d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z"
                fill="#FBBC05"
              />
              <path
                d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.961L3.964 7.293C4.672 5.163 6.656 3.58 9 3.58z"
                fill="#EA4335"
              />
            </svg>
            <span className="text-xs transition-colors">Continue with Google</span>
          </button>

          {/* Footer */}
          <div className="mt-5 text-center">
            <p className="text-gray-500 text-[11px] font-medium">
              New here?{" "}
              <Link
                to="/signup"
                className="text-white hover:text-violet-400 transition-colors font-bold ml-1"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>

        {/* Support Link */}
        <p className="text-center mt-5 text-[9px] text-gray-700 font-bold uppercase tracking-[0.2em]">
          Secured by <span className="text-gray-500">MyTeam Auth</span>
        </p>
      </div>
    </div>
  );
}

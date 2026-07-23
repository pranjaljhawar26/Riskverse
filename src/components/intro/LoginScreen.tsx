import { useGame } from "@/data/store";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Lock, User, Shield, ChevronRight } from "lucide-react";
import dummyData from "@/data/users.json";

const ROLES = ["CEO", "CRO", "CFO", "Treasurer", "Head of Risk"];

export function LoginScreen() {
  const introDone = useGame((s) => s.introDone);
  const loginDone = useGame((s) => s.loginDone);
  const finishLogin = useGame((s) => s.finishLogin);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(ROLES[0]);
  const [isSigningUp, setIsSigningUp] = useState(false);

  // If intro isn't done, or login is already done, don't show this.
  if (!introDone || loginDone) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSigningUp) {
      alert("Sign up is restricted to newly appointed executives only. Please contact IT.");
      setIsSigningUp(false);
      return;
    }
    if (!email || !password || !role) {
      alert("Please fill in all fields.");
      return;
    }

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    const validUser = dummyData.users.find(
      (u) => u.email === trimmedEmail && u.password === trimmedPassword && u.role === role
    );

    if (!validUser) {
      alert("Authentication Failed: Invalid Email, Password, or Role mismatch.");
      return;
    }

    finishLogin(role, trimmedEmail);
  };

  return (
    <AnimatePresence>
      <motion.div
        key="login"
        className="absolute inset-0 z-[75] flex items-center justify-center overflow-hidden bg-navy-950 before:absolute before:inset-0 before:bg-[url('/noise.svg')] before:opacity-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Background elements */}
        <div className="absolute top-1/4 left-1/4 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-500/10 blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 h-[600px] w-[600px] translate-x-1/4 translate-y-1/4 rounded-full bg-blue-500/10 blur-[120px]" />

        <motion.div
          className="relative z-10 w-full max-w-md"
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          <div className="overflow-hidden rounded-2xl border border-gold-400/20 bg-navy-900/60 p-8 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-xl">
            <div className="mb-8 text-center">
              <h2 className="mb-2 font-serif text-3xl font-semibold tracking-wide text-gold-100">
                {isSigningUp ? "Executive Enrollment" : "Authentication"}
              </h2>
              <p className="font-display text-xs tracking-[0.2em] text-gold-400/70">
                SECURE WAR ROOM ACCESS
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email Address */}
              <div className="space-y-1.5">
                <label className="ml-1 font-display text-[10px] tracking-wider text-slate-400">
                  EMAIL ADDRESS
                </label>
                <div className="relative flex items-center">
                  <div className="absolute left-3 text-gold-400/60">
                    <User size={18} />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. 1234@db.com"
                    className="w-full rounded-lg border border-slate-700 bg-navy-950/50 py-3 pl-10 pr-4 text-sm text-slate-200 placeholder:text-slate-600 focus:border-gold-400/50 focus:bg-navy-950 focus:outline-none focus:ring-1 focus:ring-gold-400/50 transition-all"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="ml-1 font-display text-[10px] tracking-wider text-slate-400">
                  PASSWORD
                </label>
                <div className="relative flex items-center">
                  <div className="absolute left-3 text-gold-400/60">
                    <Lock size={18} />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-lg border border-slate-700 bg-navy-950/50 py-3 pl-10 pr-4 text-sm text-slate-200 placeholder:text-slate-600 focus:border-gold-400/50 focus:bg-navy-950 focus:outline-none focus:ring-1 focus:ring-gold-400/50 transition-all"
                    required
                  />
                </div>
              </div>

              {/* Role Selection */}
              <div className="space-y-1.5">
                <label className="ml-1 font-display text-[10px] tracking-wider text-slate-400">
                  DESIGNATED ROLE
                </label>
                <div className="relative flex items-center">
                  <div className="absolute left-3 text-gold-400/60">
                    <Shield size={18} />
                  </div>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full appearance-none rounded-lg border border-slate-700 bg-navy-950/50 py-3 pl-10 pr-4 text-sm text-slate-200 focus:border-gold-400/50 focus:bg-navy-950 focus:outline-none focus:ring-1 focus:ring-gold-400/50 transition-all"
                    required
                  >
                    {ROLES.map((r) => (
                      <option key={r} value={r} className="bg-navy-900">
                        {r}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="group relative mt-4 flex w-full items-center justify-center gap-2 overflow-hidden rounded-lg bg-gradient-to-r from-gold-600 to-gold-400 py-3.5 font-display text-xs font-semibold tracking-widest text-navy-950 transition-all hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(255,179,71,0.3)] active:scale-[0.98]"
              >
                <span className="relative z-10">
                  {isSigningUp ? "REQUEST ACCESS" : "AUTHORIZE ENTRY"}
                </span>
                <ChevronRight size={16} className="relative z-10 transition-transform group-hover:translate-x-1" />
                <div className="absolute inset-0 z-0 bg-white/20 opacity-0 transition-opacity group-hover:opacity-100" />
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => setIsSigningUp(!isSigningUp)}
                className="font-display text-[10px] tracking-wider text-slate-500 hover:text-gold-300 transition-colors"
              >
                {isSigningUp
                  ? "ALREADY ENROLLED? LOGIN HERE"
                  : "NEW EXECUTIVE? SIGN UP"}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

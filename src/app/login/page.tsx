"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import "../../styles/login.css";
import { useToast } from "../../hooks/use-toast";
import { Button } from "../../components/ui/button";
import { useRouter } from "next/navigation";

import { Eye, EyeOff } from "lucide-react"; // 👁 Toggle icons

export default function Login() {
  const { toast } = useToast();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateEmail = (v: string) => /\S+@\S+\.\S+/.test(v);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      return toast({
        title: "Missing Information",
        description: "Email and password are required.",
        variant: "destructive",
      });
    }

    if (!validateEmail(email)) {
      return toast({
        title: "Invalid Email",
        description: "Enter a valid email.",
        variant: "destructive",
      });
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);

      toast({
        title: "Login Successful 🎉",
        description: "Redirecting...",
      });

      router.push("/dashboard");
    }, 1200);
  };

  return (
    <div className="login-page">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="login-card"
      >
        {/* TITLE */}
        <h2 className="login-title">
          <span className="pacifico text-[--color-primary] premium-glow-soft">
            Welcome Back
          </span>
        </h2>

        <p className="login-sub">Login to access your workspace.</p>

        {/* FORM */}
        <form className="login-form" onSubmit={handleLogin}>
          {/* EMAIL */}
          <label>Email</label>
          <input
            type="email"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />

          {/* PASSWORD + EYE */}
          <label>Password</label>
          <div className="password-wrapper">
            <input
              type={showPass ? "text" : "password"}
              className="login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />

            <div
              className="password-toggle"
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? (
                <EyeOff className="eye-icon" />
              ) : (
                <Eye className="eye-icon" />
              )}
            </div>
          </div>

          {/* BUTTON */}
          <Button
            type="submit"
            variant="default"
            className="w-full mt-2 py-3 text-base font-medium"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Login"}
          </Button>
        </form>

        {/* FORGOT PASSWORD */}
        <p className="forgot-text">Forgot Password?  
          <span className="coming-soon"> Coming Soon</span>
        </p>
      </motion.div>
    </div>
  );
}

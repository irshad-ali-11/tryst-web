
import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { addUser } from "../redux/slices/userSlice";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [emailId, setEmailId] = useState("duaa@gmail.com");
  const [password, setPassword] = useState("Duaa@123");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setError("");
      setLoading(true);

      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );

      dispatch(addUser(res?.data?.user));
      navigate("/");
    } catch (error) {
      setError(
        error?.response?.data?.message || "Something went wrong"
      );
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen overflow-hidden bg-slate-950 flex items-center justify-center px-4">

      {/* Login Card */}
      <div
        className="
          w-full max-w-md
          bg-slate-900
          border border-slate-800
          rounded-3xl
          shadow-2xl shadow-violet-950/40
          p-6 sm:p-8
          animate-[fadeIn_.5s_ease-out]
        "
      >
        {/* Logo */}
        <div className="text-center mb-6">
          <div
            className="
              mx-auto mb-4
              flex h-14 w-14 items-center justify-center
              rounded-2xl
              bg-gradient-to-br from-violet-500 to-indigo-600
              text-white text-2xl font-bold
              shadow-lg shadow-violet-500/30
            "
          >
            ♡
          </div>

          <h1 className="text-3xl font-bold text-white">
            Welcome Back
          </h1>

          <p className="text-sm text-slate-400 mt-2">
            Login to continue to your account
          </p>
        </div>

        {/* Form */}
        <div className="space-y-4">

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Email Address
            </label>

            <input
              type="email"
              placeholder="you@example.com"
              className="
                w-full h-12
                px-4
                rounded-xl
                bg-slate-800
                border border-slate-700
                text-white
                placeholder:text-slate-500
                outline-none
                transition-all duration-200
                focus:border-violet-500
                focus:ring-2
                focus:ring-violet-500/20
              "
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              className="
                w-full h-12
                px-4
                rounded-xl
                bg-slate-800
                border border-slate-700
                text-white
                placeholder:text-slate-500
                outline-none
                transition-all duration-200
                focus:border-violet-500
                focus:ring-2
                focus:ring-violet-500/20
              "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Error */}
          {error && (
            <div
              className="
                px-4 py-3
                rounded-xl
                bg-red-500/10
                border border-red-500/20
                text-red-400
                text-sm
                animate-[shake_.3s_ease-in-out]
              "
            >
              {error}
            </div>
          )}

          {/* Login Button */}
          <button
            className="
              w-full h-12
              rounded-xl
              bg-gradient-to-r
              from-violet-600
              to-indigo-600
              text-white
              font-semibold
              shadow-lg shadow-violet-600/20
              transition-all duration-200
              hover:from-violet-500
              hover:to-indigo-500
              hover:scale-[1.01]
              active:scale-[0.98]
              disabled:opacity-60
              disabled:cursor-not-allowed
            "
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="loading loading-spinner loading-sm"></span>
                Logging in...
              </span>
            ) : (
              "Login"
            )}
          </button>
        </div>

        {/* Signup */}
        <p className="text-center text-sm text-slate-400 mt-6">
          Don't have an account?{" "}
          <span
            className="
              text-violet-400
              font-semibold
              cursor-pointer
              hover:text-violet-300
              hover:underline
              transition-colors
            "
            onClick={() => navigate("/signup")}
          >
            Create one
          </span>
        </p>
      </div>

      
    </div>
  );
};

export default Login;


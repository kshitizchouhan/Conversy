import { useState } from "react";
import { Volleyball } from "lucide-react";
import { Link } from "react-router";
import useLogin from "../hooks/useLogin";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const { isPending, error, loginMutation } = useLogin();

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation(loginData);
  };

  return (
    <div className="min-h-screen bg-[#f6f7fb] flex items-center justify-center px-4">
      <div className="relative w-full max-w-6xl grid lg:grid-cols-2 gap-10">

        {/* LEFT — FORM BUBBLE */}
        <div className="bg-white rounded-[2.5rem] p-8 sm:p-10 shadow-xl border border-black/5">

          {/* LOGO */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
              <Volleyball className="text-emerald-500" />
            </div>
            <span className="text-3xl font-extrabold tracking-tight text-emerald-600">
              Conversy
            </span>
          </div>

          <h1 className="text-3xl text-gray-700 sm:text-4xl font-extrabold leading-tight">
            Welcome back 👋
          </h1>
          <p className="text-gray-500 mt-2 mb-6">
            Sign in and continue chatting without borders.
          </p>

          {error && (
            <div className="mb-4 rounded-2xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
              {error.response.data.message}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email address"
              className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200
                         text-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              value={loginData.email}
              onChange={(e) =>
                setLoginData({ ...loginData, email: e.target.value })
              }
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200
                         text-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
              required
            />

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-emerald-500 text-white font-bold text-lg
                         hover:bg-emerald-600 active:scale-95 transition"
              disabled={isPending}
            >
              {isPending ? "Signing in…" : "Sign in 🚀"}
            </button>
          </form>

          <p className="text-sm text-center mt-6 text-gray-500">
            New here?{" "}
            <Link to="/signup" className="text-emerald-600 font-semibold">
              Create an account
            </Link>
          </p>
        </div>

        {/* RIGHT — PLAYFUL BRAND SIDE */}
        <div className="hidden lg:flex flex-col items-center justify-center relative">

          {/* FLOATING BLOBS */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-emerald-200 rounded-full blur-3xl opacity-60" />
          <div className="absolute bottom-10 right-0 w-48 h-48 bg-sky-200 rounded-full blur-3xl opacity-60" />

          {/* CONTENT */}
          <div className="relative bg-white rounded-[2.5rem] p-10 shadow-lg text-center max-w-md">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center">
                <Volleyball className="size-10 text-emerald-500" />
              </div>
            </div>

            <h2 className="text-2xl text-gray-700 font-extrabold">
              Conversations feel better here ✨
            </h2>
            <p className="text-gray-500 mt-2">
              Practice real conversations, make friends worldwide, and grow
              naturally — together.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

"use client"
import { useState } from "react"
import { Eye, EyeOff, Lock, Mail, User, Phone } from "lucide-react"
import { FaFacebook, FaGoogle, FaGithub, FaLinkedin } from "react-icons/fa6"
import { signIn } from "next-auth/react"

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [name, setName] = useState("")

  // Sign Up
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  // Sign In
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: signupName,
        email: signupEmail,
        password: signupPassword,
      }),
    });

    const data = await response.json();

    alert(data.message);

    if (response.ok) {
      setSignupName("");
      setSignupEmail("");
      setSignupPassword("");

      // Switch back to Sign In panel
      setIsSignUp(false);
    }
  };



  const handleLogin = async (e) => {
  e.preventDefault();

  const result = await signIn("credentials", {
    email: loginEmail,
    password: loginPassword,
    redirect: false,
  });

  if (result?.error) {
    alert("Invalid email or password");
    return;
  }

  alert("Login successful!");

  // Clear the form
  setLoginEmail("");
  setLoginPassword("");

  // Redirect to your homepage
  window.location.href = "/";
};

  return (
    <>
      <style jsx global>{`
        @keyframes showPanel {
          0%, 49.99% { opacity: 0; z-index: 1; }
          50%, 100% { opacity: 1; z-index: 5; }
        }
        .animate-show-panel {
          animation: showPanel 0.6s ease-in-out;
        }
      `}</style>

      <div className="min-h-screen bg-white flex flex-col justify-center items-center p-4 relative overflow-hidden font-sans z-10">

        <div className="relative bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-neutral-100 overflow-hidden w-full max-w-4xl min-h-[600px] transition-all duration-300">

          <div className={`absolute top-0 h-full w-full md:w-1/2 transition-all duration-600 ease-in-out left-0 ${isSignUp
            ? "md:translate-x-full opacity-100 z-50 animate-show-panel block"
            : "opacity-0 z-10 pointer-events-none md:pointer-events-auto hidden"
            } md:block`}>
            <form onSubmit={handleSignup} className="bg-white flex items-center justify-center flex-col px-8 sm:px-14 h-full text-center py-8">
              <h1 className="text-3xl font-extrabold text-neutral-900 tracking-tight mb-2">Create Account</h1>

              <div className="flex gap-3 my-4">
                <button type="button"
                  onClick={() => signIn("google", { callbackUrl: "/" })}
                  aria-label="Google" className="w-10 h-10 border border-neutral-200 rounded-full flex items-center justify-center text-neutral-700 hover:border-orange-500 hover:bg-orange-500 hover:text-white transition duration-300 cursor-pointer">
                  <FaGoogle size={18} />
                </button>
                <button type="button" aria-label="Facebook" className="w-10 h-10 border border-neutral-200 rounded-full flex items-center justify-center text-neutral-700 hover:border-orange-500 hover:bg-orange-500 hover:text-white transition duration-300 cursor-pointer">
                  <FaFacebook size={18} />
                </button>
                <button type="button" aria-label="LinkedIn" className="w-10 h-10 border border-neutral-200 rounded-full flex items-center justify-center text-neutral-700 hover:border-orange-500 hover:bg-orange-500 hover:text-white transition duration-300 cursor-pointer">
                  <FaLinkedin size={18} />
                </button>
              </div>

              <span className="text-xs text-neutral-400 mb-4 uppercase tracking-wider">or use your email for registration</span>

              <div className="w-full flex flex-col gap-3">
                <div className="relative w-full">
                  <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    required
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-transparent bg-neutral-100 focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition duration-300 text-sm outline-none text-neutral-900"
                  />
                </div>

                <div className="relative w-full">
                  <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    required
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-transparent bg-neutral-100 focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition duration-300 text-sm outline-none text-neutral-900"
                  />
                </div>


                <div className="relative w-full">
                  <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    required
                    className="w-full pl-11 pr-10 py-3 rounded-xl border border-transparent bg-neutral-100 focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition duration-300 text-sm outline-none text-neutral-900"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-orange-500 transition duration-200"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="mt-6 w-full py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl text-sm uppercase tracking-wider shadow-lg shadow-orange-500/20 active:scale-[0.98] transition duration-200 cursor-pointer"
              >
                Sign Up
              </button>

              {/* sign in feild */}
              <div className="md:hidden mt-6 text-sm text-neutral-500">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setIsSignUp(false)}
                  className="text-orange-500 font-bold hover:underline cursor-pointer"
                >
                  Sign In
                </button>
              </div>
            </form>
          </div>

          <div className={`absolute top-0 h-full w-full md:w-1/2 transition-all duration-600 ease-in-out left-0 z-20 ${isSignUp
            ? "translate-x-full opacity-0 pointer-events-none md:pointer-events-auto hidden"
            : "opacity-100 block"
            } md:block`}>
            <form onSubmit={handleLogin} className="bg-white flex items-center justify-center flex-col px-8 sm:px-14 h-full text-center py-8">
              <h1 className="text-3xl font-extrabold text-neutral-900 tracking-tight mb-2">Sign In</h1>

              <div className="flex gap-3 my-4">
                <button type="button"
                  onClick={() => signIn("google", { callbackUrl: "/" })}
                  aria-label="Google" className="w-10 h-10 border border-neutral-200 rounded-full flex items-center justify-center text-neutral-700 hover:border-orange-500 hover:bg-orange-500 hover:text-white transition duration-300 cursor-pointer">
                  <FaGoogle size={18} />
                </button>
                <button type="button" aria-label="Facebook" className="w-10 h-10 border border-neutral-200 rounded-full flex items-center justify-center text-neutral-700 hover:border-orange-500 hover:bg-orange-500 hover:text-white transition duration-300 cursor-pointer">
                  <FaFacebook size={18} />
                </button>
                <button type="button" aria-label="LinkedIn" className="w-10 h-10 border border-neutral-200 rounded-full flex items-center justify-center text-neutral-700 hover:border-orange-500 hover:bg-orange-500 hover:text-white transition duration-300 cursor-pointer">
                  <FaLinkedin size={18} />
                </button>
              </div>

              <span className="text-xs text-neutral-400 mb-4 uppercase tracking-wider">or use your account</span>

              <div className="w-full flex flex-col gap-3">
                <div className="relative w-full">
                  <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-transparent bg-neutral-100 focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition duration-300 text-sm outline-none text-neutral-900"
                  />
                </div>

                <div className="relative w-full">
                  <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                    className="w-full pl-11 pr-10 py-3 rounded-xl border border-transparent bg-neutral-100 focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition duration-300 text-sm outline-none text-neutral-900"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-orange-500 transition duration-200"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <a href="#" className="text-xs text-neutral-400 hover:text-orange-500 transition duration-200 my-4 block self-end">
                Forgot your password?
              </a>

              <button
                type="submit"
                className="w-full py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl text-sm uppercase tracking-wider shadow-lg shadow-orange-500/20 active:scale-[0.98] transition duration-200 cursor-pointer"
              >
                Sign In
              </button>

              <div className="md:hidden mt-6 text-sm text-neutral-500">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => setIsSignUp(true)}
                  className="text-orange-500 font-bold hover:underline cursor-pointer"
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>

          <div className={`hidden md:block absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-600 ease-in-out z-40 ${isSignUp ? "-translate-x-full" : ""
            }`}>
            <div className={`relative bg-gradient-to-br from-orange-500 to-orange-600 text-white left-[-100%] h-full w-[200%] transition-transform duration-600 ease-in-out ${isSignUp ? "translate-x-1/2" : "translate-x-0"
              }`}>

              <div className={`absolute top-0 left-0 w-1/2 h-full flex flex-col justify-center items-center p-12 text-center transition-transform duration-600 ease-in-out ${isSignUp ? "translate-x-0" : "-translate-x-[20%]"
                }`}>
                <h2 className="text-3xl font-extrabold tracking-tight">Welcome Back!</h2>
                <p className="text-sm text-orange-50 font-light mt-4 mb-8 max-w-xs leading-relaxed">
                  Stay connected by logging in with your credentials and continue your experience.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSignUp(false)}
                  className="border-2 border-white hover:bg-white/10 text-white px-10 py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition duration-300 active:scale-[0.98] cursor-pointer"
                >
                  Sign In
                </button>
              </div>

              <div className={`absolute top-0 right-0 w-1/2 h-full flex flex-col justify-center items-center p-12 text-center transition-transform duration-600 ease-in-out ${isSignUp ? "translate-x-[20%]" : "translate-x-0"
                }`}>
                <h2 className="text-3xl font-extrabold tracking-tight">Hey There!</h2>
                <p className="text-sm text-orange-50 font-light mt-4 mb-8 max-w-xs leading-relaxed">
                  Begin your amazing journey by creating an account with us today.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSignUp(true)}
                  className="border-2 border-white hover:bg-white/10 text-white px-10 py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition duration-300 active:scale-[0.98] cursor-pointer"
                >
                  Sign Up
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </>
  )
}
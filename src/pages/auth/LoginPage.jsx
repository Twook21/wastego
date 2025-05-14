import { useState, useContext, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import ThemeContext from "../../context/ThemeContext";
import Logo from "../../assets/logo.png";

function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);
  const audioRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // User accounts and corresponding redirect paths
    const userAccounts = [
      {
        email: "admin@wastego.com",
        password: "admin123",
        path: "/ecohive/dashboard",
      },
      {
        email: "admin@ecocentral.com",
        password: "admineco123",
        path: "/ecocentral/dashboard",
      },
    ];

    // Check if credentials match any account
    const user = userAccounts.find(
      (account) => account.email === email && account.password === password
    );

    if (user) {
      navigate(user.path);
    } else {
      setError("Email atau password salah");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3; // Volume 30%
    }
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col justify-center py-6 px-4 sm:py-12 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Music */}
      <audio ref={audioRef} autoPlay loop>
        <source src="/images/background/musik.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/images/background/gunung.webm" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Login Content */}
      <div className="relative z-10 mx-auto w-full max-w-xs sm:max-w-md">
        <h2 className="text-center text-2xl sm:text-3xl font-extrabold text-white">
          Log In Now
        </h2>
      </div>

      <div className="relative z-10 mt-4 sm:mt-8 mx-auto w-full max-w-xs sm:max-w-md">
        <div className="backdrop-blur-md bg-white/30 dark:bg-gray-900/30 py-6 sm:py-8 px-4 shadow-lg rounded-lg sm:rounded-lg sm:px-10 border border-white/20">
          {error && (
            <div className="mb-4 p-2 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-200 rounded-md text-sm text-center">
              {error}
            </div>
          )}

          <div className="flex justify-center">
            <img src={Logo} alt="Logo WasteGO" className="h-8 w-auto mb-6" />
          </div>

          <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white"
              >
                Email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300/50 dark:border-gray-600/50 rounded-md 
                  bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm
                  text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
                  focus:outline-none focus:ring-teal-500 focus:border-teal-500 dark:focus:ring-lime-400 dark:focus:border-lime-400"
                  placeholder="admin@wastego.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300/50 dark:border-gray-600/50 rounded-md
                  bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm
                  text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
                  focus:outline-none focus:ring-teal-500 focus:border-teal-500 dark:focus:ring-lime-400 dark:focus:border-lime-400"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-800 hover:text-gray-600 dark:text-white dark:hover:text-gray-300 focus:outline-none"
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7A9.97 9.97 0 014.02 8.971m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-lime-500 hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-600 transition-colors duration-200"
              >
                Login
              </button>
              <h1 className="mt-3 text-white text-xs sm:text-sm text-shadow-lg text-center">
                Belum punya akun?{" "}
                <span>
                  <Link
                    to="/register"
                    className="text-lime-300 hover:text-lime-400"
                  >
                    Daftar Disini!
                  </Link>
                </span>
              </h1>
            </div>
          </form>

          {/* Back to Home Button */}
          <div className="mt-4 sm:mt-6">
            <Link
              to="/"
              className="w-full flex justify-center py-2 px-4 border border-white/30 rounded-md shadow-sm text-sm font-medium text-white bg-transparent hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/30 transition-colors duration-200"
            >
              Back to Home
            </Link>
          </div>
        </div>

        {/* Copyright Notice */}
        <div className="mt-4 sm:mt-8 text-center text-xs text-white/70">
          © {new Date().getFullYear()} WasteGo. Hak Cipta Dilindungi.
        </div>
      </div>
    </div>
  );
}

export default AdminLoginPage;
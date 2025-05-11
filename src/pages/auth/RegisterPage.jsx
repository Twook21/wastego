import { useState, useContext, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import ThemeContext from "../../context/ThemeContext";
// Corrected import path - adjust based on your actual file structure
import Logo from '../../assets/logo.png';

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);
  const audioRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (password !== confirmPassword) {
      setError("Password tidak cocok");
      return;
    }

    if (password.length < 6) {
      setError("Password minimal 6 karakter");
      return;
    }

    // Demo registration logic (replace with actual authentication)
    // Here you would typically call an API to register the user
    console.log("Registering user:", { name, email, password });
    
    // Simulate successful registration
    navigate("/admin/login");
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3; // Volume 30%
    }
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 overflow-hidden">
      <audio ref={audioRef} autoPlay loop>
        <source src="/images/background/musik.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* VIDEO BACKGROUND */}
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

      {/* KONTEN REGISTER */}
      <div className="relative z-10 sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-white">
          Daftar Akun
        </h2>
      </div>

      <div className="relative z-10 mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        {/* Blurred minimalist form */}
        <div className="backdrop-blur-md bg-white/30 dark:bg-gray-900/30 py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 border border-white/20">
          {error && (
            <div className="mb-4 p-2 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-200 rounded-md text-sm text-center">
              {error}
            </div>
          )}

          <div className="flex justify-center">
            <img 
              src={Logo} 
              alt="Logo WasteGO" 
              className="h-8 w-auto mb-8"
            />
          </div>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-white"
              >
                Nama Lengkap
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300/50 dark:border-gray-600/50 rounded-md 
                  bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm
                  text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
                  focus:outline-none focus:ring-teal-500 focus:border-teal-500 dark:focus:ring-lime-400 dark:focus:border-lime-400"
                  placeholder="Masukkan nama lengkap"
                />
              </div>
            </div>

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
                  placeholder="email@example.com"
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
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300/50 dark:border-gray-600/50 rounded-md
                  bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm
                  text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
                  focus:outline-none focus:ring-teal-500 focus:border-teal-500 dark:focus:ring-lime-400 dark:focus:border-lime-400"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-white"
              >
                Konfirmasi Password
              </label>
              <div className="mt-1">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300/50 dark:border-gray-600/50 rounded-md
                  bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm
                  text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
                  focus:outline-none focus:ring-teal-500 focus:border-teal-500 dark:focus:ring-lime-400 dark:focus:border-lime-400"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-lime-500 hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-600 transition-colors duration-200"
              >
                Daftar
              </button>
              <h1 className="mt-3 text-white text-sm text-shadow-lg text-right">Sudah punya akun? <span><Link to="/admin/login" className="text-lime-300 hover:text-lime-400">Login Disini!</Link></span></h1>
            </div>
          </form>
          
          {/* Back to Home Button */}
          <div className="mt-6">
            <Link
              to="/"
              className="w-full flex justify-center py-2 px-4 border border-white/30 rounded-md shadow-sm text-sm font-medium text-white bg-transparent hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/30 transition-colors duration-200"
            >
              Back to Home
            </Link>
          </div>
        </div>
        
        {/* Copyright Notice */}
        <div className="mt-8 text-center text-xs text-white/70">
          © {new Date().getFullYear()} WasteGo. Hak Cipta Dilindungi.
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
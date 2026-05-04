import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "./services/auth.service.js";
import { addUser } from "./store/userSlice.js";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        setLoading(true);
        const res = await getCurrentUser();
        if (res.success) {
          dispatch(addUser(res.data.user));
          navigate("/dashboard");
        }
      } catch (error) {
        console.error(error.message);
        // Only navigate to login if we're not already on a public route like /signup
        const publicRoutes = ["/login", "/signup", "/forgot-password"];
        if (!publicRoutes.includes(window.location.pathname)) {
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, [dispatch, navigate]);

  return (
    <main className="bg-[#0a0a0f] min-h-screen">
      {loading ? (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#0a0a0f] z-50">
          <div className="w-16 h-16 relative">
            <div className="absolute inset-0 border-4 border-violet-500/20 rounded-full" />
            <div className="absolute inset-0 border-4 border-violet-500 border-t-transparent rounded-full animate-spin" />
          </div>
          <div className="mt-6 flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-violet-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
            <div className="w-1.5 h-1.5 bg-violet-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
            <div className="w-1.5 h-1.5 bg-violet-500 rounded-full animate-bounce" />
          </div>
        </div>
      ) : (
        <Outlet />
      )}
    </main>
  );
}

export default App;

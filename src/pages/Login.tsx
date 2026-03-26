import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { User, Lock, ArrowRight } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Login = () => {
  // Changed state name to 'email' to match your Backend Model
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);
  
  try {
    const response = await fetch("http://localhost:9000/fraud-auth/login", { 
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // Must match the 'email' field in your FraudAnalyst Python model
      body: JSON.stringify({ email: email, password: password }), 
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("fraud_token", data.access_token);
      toast({
        title: "Access Granted",
        description: `Authenticated as ${email}`,
      });
      navigate("/dashboard"); 
    } else {
      // THE SAFETY FIX: Prevents white screen by ensuring we only pass a string to toast
      const errorMsg = typeof data.detail === "string" ? data.detail : "Invalid Analyst Credentials";
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: errorMsg,
      });
    }
  } catch (error) {
    toast({
      variant: "destructive",
      title: "System Error",
      description: "Backend server (Port 9000) is offline.",
    });
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f4f7f9] p-4 font-sans">
      <div className="w-full max-w-[400px] space-y-8 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        
        {/* Branding Section */}
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 text-[#00aeef]">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
               <path d="M12 2L4.5 20.29L5.21 21L12 18L18.79 21L19.5 20.29L12 2Z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-[#1e293b]">Fraud Detection Team</h1>
          <p className="text-sm text-gray-500 font-medium tracking-tight">Secure Access Gateway</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-4">
            {/* Email Field - Updated to match FraudAnalyst */}
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input 
                type="email" 
                placeholder="analyst@barclays.com" 
                className="pl-11 h-12 bg-gray-50 border-gray-200 focus:bg-white transition-all rounded-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input 
                type="password" 
                placeholder="••••••••" 
                className="pl-11 h-12 bg-gray-50 border-gray-200 focus:bg-white transition-all rounded-lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <Checkbox id="remember" />
              <label htmlFor="remember" className="text-gray-600 cursor-pointer select-none">Remember me</label>
            </div>
            <button type="button" className="text-[#00aeef] hover:underline font-medium">
              Forgot password?
            </button>
          </div>

          <Button 
            type="submit" 
            className="w-full h-12 bg-[#00aeef] hover:bg-[#0096ce] text-white font-bold text-lg rounded-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            disabled={isLoading}
          >
            {isLoading ? "Verifying..." : (
              <>
                Secure Login <ArrowRight className="w-5 h-5" />
              </>
            )}
          </Button>
        </form>

        <p className="text-[10px] text-center text-gray-400 uppercase tracking-widest leading-relaxed">
          Internal Use Only. Unauthorized access is strictly prohibited and monitored.
        </p>
      </div>
    </div>
  );
};

export default Login;

import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import barclaysLogo from "@/assets/barclays-logo.png";

interface NavbarProps {
  selectedDepartment: string;
  onDepartmentChange: (dept: string) => void;
  departments: string[];
}

const Navbar = ({ selectedDepartment, onDepartmentChange, departments }: NavbarProps) => {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-primary px-6 py-3 flex items-center justify-between rounded-2xl"
    >
      <div className="flex items-center gap-4">
        <img src={barclaysLogo} alt="Barclays Logo" className="h-24 brightness-0 invert object-contain" />
        <div className="h-8 w-px bg-primary-foreground/30" />
        <div>
          <h1 className="text-lg font-bold text-primary-foreground tracking-tight">Fraud Detection Dashboard</h1>
          <p className="text-xs text-primary-foreground/70">Real-time monitoring & analytics</p>
        </div>
      </div>

      <div className="relative flex items-center gap-2">
        <label className="text-xs font-medium text-primary-foreground/80">Filter by Department:</label>
        <div className="relative">
          <select
            value={selectedDepartment}
            onChange={(e) => onDepartmentChange(e.target.value)}
            className="bg-primary-foreground text-foreground outline-none cursor-pointer appearance-none pl-4 pr-9 py-2 rounded-xl text-sm font-medium shadow-sm border-none focus:ring-2 focus:ring-primary-foreground/50"
          >
            {departments.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
          <ChevronDown className="w-4 h-4 text-muted-foreground absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;

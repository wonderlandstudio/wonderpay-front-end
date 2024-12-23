import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { 
  Home,
  Receipt, 
  ArrowUpRight,
  Sparkles,
  Users, 
  Settings,
  FilePlus,
  ArrowDownRight,
  LogOut
} from "lucide-react";
import { useSettings } from '@/contexts/SettingsContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Bill Pay', href: '/dashboard/bill-pay', icon: ArrowUpRight },
  { name: 'Receivables', href: '/receivables', icon: ArrowDownRight },
  { name: 'Create Invoice', href: '/dashboard/bill-pay/generate', icon: FilePlus },
  { name: 'WonderPay Capital', href: '/capital', icon: Sparkles },
  { name: 'Clients & Vendors', href: '/clients', icon: Users },
  { name: 'Settings', href: '/dashboard/organization-settings', icon: Settings },
];

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { settings } = useSettings();
  const { toast } = useToast();

  const handleOrgClick = () => {
    navigate('/dashboard/organization-settings');
  };

  const handleSignOut = () => {
    // Clear local storage
    localStorage.clear();
    
    // Clear session storage
    sessionStorage.clear();
    
    // Show toast notification
    toast({
      title: "Signed out successfully",
      description: "You have been logged out of your account.",
    });
    
    // Redirect to landing page after a short delay to ensure the toast is visible
    setTimeout(() => {
      navigate('/', { replace: true });
    }, 500);
  };

  return (
    <div className="flex h-full w-64 flex-col backdrop-blur-md bg-white/50">
      <div className="flex flex-col flex-1 p-4">
        <div 
          onClick={handleOrgClick}
          className="flex items-center gap-2 px-2 mb-8 cursor-pointer hover:bg-black/5 rounded-lg transition-colors py-2"
        >
          <div 
            className="w-3 h-3 rounded-sm" 
            style={{ backgroundColor: settings.brandColor }}
          />
          <span className="font-medium text-gray-900 font-inter">{settings.displayName}</span>
        </div>
        <nav className="flex flex-col gap-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:bg-black/5 font-inter",
                  isActive && "bg-gray-100/50 backdrop-blur-sm text-gray-900 font-medium"
                )}
              >
                <Icon className="h-[18px] w-[18px] stroke-[1.5px]" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      
      {/* Sign Out Button */}
      <div className="p-4 mt-auto border-t border-gray-100">
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-500 hover:text-gray-900 hover:bg-black/5"
          onClick={handleSignOut}
        >
          <LogOut className="mr-2 h-[18px] w-[18px] stroke-[1.5px]" />
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
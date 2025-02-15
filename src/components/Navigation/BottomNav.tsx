import React from 'react';
import { Home, Trophy, Wallet, Clock, User } from 'lucide-react';

interface NavItem {
  icon: React.ReactNode;
  label: string;
  page: string;
}

interface BottomNavProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const navItems: NavItem[] = [
  {
    icon: <Home className="w-6 h-6" />,
    label: 'Home',
    page: 'home'
  },
  {
    icon: <Trophy className="w-6 h-6" />,
    label: 'Earn',
    page: 'earn'
  },
  {
    icon: <Wallet className="w-6 h-6" />,
    label: 'Spend',
    page: 'spend'
  },
  {
    icon: <Clock className="w-6 h-6" />,
    label: 'History',
    page: 'history'
  },
  {
    icon: <User className="w-6 h-6" />,
    label: 'Profile',
    page: 'profile'
  }
];

const BottomNav: React.FC<BottomNavProps> = ({ currentPage, onNavigate }) => {
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200">
      <div className="flex justify-around items-center p-2">
        {navItems.map((item) => (
          <button
            key={item.page}
            onClick={() => onNavigate(item.page)}
            className={`flex flex-col items-center p-1 min-w-[64px] ${
              currentPage === item.page ? 'text-red-600' : 'text-gray-600'
            }`}
            aria-label={item.label}
            role="tab"
            aria-selected={currentPage === item.page}
          >
            {item.icon}
            <span className="text-xs mt-1">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { signOut, getUser } from '@/lib/auth'; // ✅ Import authentication functions
import { Bell, Home, BarChart2, MapPin, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import HeaderMenu from '@/components/shared/HeaderMenu';

type Role = 'volunteer' | 'coordinator' | 'investor';

interface NavButtonProps {
  icon: React.ReactNode;
  label: string;
  path: string;
  active: boolean;
}

const NavButton: React.FC<NavButtonProps> = ({ icon, label, path, active }) => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(`/investor${path ? `/${path}` : ''}`)}
      className={`flex flex-col items-center p-1 ${
        active ? 'text-red-600' : 'text-gray-600'
      }`}
    >
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </button>
  );
};

interface InvestorLayoutProps {
  children: React.ReactNode;
}

const InvestorDashboardLayout: React.FC<InvestorLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [currentRole, setCurrentRole] = useState<Role>('investor');
  const [loading, setLoading] = useState(true);

  // ✅ Check if user is authenticated, redirect if not
  useEffect(() => {
    async function checkAuth() {
      const user = await getUser();
      if (!user) {
        router.push('/login'); // Redirect to login if no user is authenticated
      } else {
        setLoading(false);
      }
    }
    checkAuth();
  }, [router]);

  // ✅ Handle Logout
  const handleLogout = async () => {
    await signOut();
    router.push('/login'); // Redirect to login after logout
  };

  const handleEditProfile = () => {
    router.push('/investor/settings');
  };

  const handleRoleChange = (role: Role) => {
    const roleRoutes: Record<Role, string> = {
      volunteer: '/volunteer',
      coordinator: '/coordinator',
      investor: '/investor'
    };

    setCurrentRole(role);
    router.push(roleRoutes[role]);
  };

  const getPageTitle = () => {
    switch (pathname) {
      case '/investor':
        return 'Community Impact';
      case '/investor/metrics':
        return 'Impact Metrics';
      case '/investor/community':
        return 'Community Overview';
      case '/investor/events':
        return 'Event Analytics';
      default:
        return 'Community Impact';
    }
  };

  const navItems = [
    {
      icon: <Home className="w-6 h-6" />,
      label: 'Home',
      path: '',
      pathname: '/investor'
    },
    {
      icon: <BarChart2 className="w-6 h-6" />,
      label: 'Metrics',
      path: 'metrics',
      pathname: '/investor/metrics'
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      label: 'Community',
      path: 'community',
      pathname: '/investor/community'
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      label: 'Events',
      path: 'events',
      pathname: '/investor/events'
    }
  ];

  // ✅ Show loading state while checking authentication
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-red-600 to-red-800 p-4 text-white">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">{getPageTitle()}</h1>
            <p className="text-sm opacity-90">Dashboard Overview</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-white hover:bg-red-700">
              <Bell className="w-6 h-6" />
            </Button>
            <HeaderMenu
              onLogout={handleLogout} // ✅ Logout now properly calls signOut()
              onEditProfile={handleEditProfile}
              onRoleChange={handleRoleChange}
              currentRole={currentRole}
            />
          </div>
        </div>
      </header>
      
      <main className="p-4 pb-20">
        {children}
      </main>
      
      <nav className="fixed bottom-0 w-full bg-white border-t border-gray-200">
        <div className="flex justify-around p-2">
          {navItems.map((item) => (
            <NavButton
              key={item.path}
              icon={item.icon}
              label={item.label}
              path={item.path}
              active={pathname === item.pathname}
            />
          ))}
        </div>
      </nav>
    </div>
  );
};

export default InvestorDashboardLayout;

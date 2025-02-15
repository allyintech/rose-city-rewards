'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { signOut, getUser } from '@/lib/auth';
import { Bell, Home, Calendar, Store, Clock } from 'lucide-react';
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
      onClick={() => router.push(`/coordinator${path ? `/${path}` : ''}`)}
      className={`flex flex-col items-center p-1 ${
        active ? 'text-red-600' : 'text-gray-600'
      }`}
    >
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </button>
  );
};

interface LayoutProps {
  children: React.ReactNode;
}

const CoordinatorLayout: React.FC<LayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [currentRole, setCurrentRole] = useState<Role>('coordinator');
  const [loading, setLoading] = useState(true);

  // Check if user is authenticated, redirect if not
  useEffect(() => {
    async function checkAuth() {
      const user = await getUser();
      if (!user) {
        router.push('/login');
      } else {
        setLoading(false);
      }
    }
    checkAuth();
  }, [router]);

  // Handle logout
  const handleLogout = async () => {
    await signOut();
    router.push('/login');
  };

  const handleEditProfile = () => {
    router.push('/profile/settings');
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
      case '/coordinator':
      case '/coordinator/':
        return 'Coordinator Dashboard';
      case '/coordinator/events':
        return 'Events';
      case '/coordinator/businesses':
        return 'Partner Businesses';
      case '/coordinator/history':
        return 'Redemption History';
      default:
        return 'Coordinator Dashboard';
    }
  };

  // Show loading state while checking authentication
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
          <h1 className="text-xl font-bold">{getPageTitle()}</h1>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-white hover:bg-red-700">
              <Bell className="w-6 h-6" />
            </Button>
            <HeaderMenu
              onLogout={handleLogout}
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
          <NavButton 
            icon={<Home className="w-6 h-6" />} 
            label="Home" 
            path=""
            active={pathname === '/coordinator' || pathname === '/coordinator/'} 
          />
          <NavButton 
            icon={<Calendar className="w-6 h-6" />} 
            label="Events" 
            path="events"
            active={pathname === '/coordinator/events'} 
          />
          <NavButton 
            icon={<Store className="w-6 h-6" />} 
            label="Businesses" 
            path="businesses"
            active={pathname === '/coordinator/businesses'} 
          />
          <NavButton 
            icon={<Clock className="w-6 h-6" />} 
            label="History" 
            path="history"
            active={pathname === '/coordinator/history'} 
          />
        </div>
      </nav>
    </div>
  );
};

export default CoordinatorLayout;

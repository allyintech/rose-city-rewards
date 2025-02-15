'use client'

import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { User, LogOut, Settings } from 'lucide-react';

type Role = 'volunteer' | 'coordinator' | 'investor';

interface HeaderMenuProps {
  onLogout: () => void;
  onEditProfile: () => void;
  onRoleChange: (role: Role) => void;
  currentRole: Role;
}

const HeaderMenu: React.FC<HeaderMenuProps> = ({
  onLogout,
  onEditProfile,
  onRoleChange,
  currentRole
}) => {
  // Get the roles that should be available to switch to based on current role
  const getAvailableRoles = (current: Role): Role[] => {
    switch (current) {
      case 'volunteer':
        return ['coordinator', 'investor'];
      case 'coordinator':
        return ['volunteer', 'investor'];
      case 'investor':
        return ['volunteer', 'coordinator'];
      default:
        return [];
    }
  };

  const availableRoles = getAvailableRoles(currentRole);

  // Helper function to format role name for display
  const formatRoleName = (role: Role): string => {
    return role.charAt(0).toUpperCase() + role.slice(1);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="text-white hover:bg-red-700">
          <User className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={onEditProfile}>
          <Settings className="mr-2 h-4 w-4" />
          <span>Profile Settings</span>
        </DropdownMenuItem>
        
        {availableRoles.map(role => (
          <DropdownMenuItem 
            key={role} 
            onClick={() => onRoleChange(role)}
          >
            Switch to {formatRoleName(role)}
          </DropdownMenuItem>
        ))}

        <DropdownMenuItem onClick={onLogout} className="text-red-600">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default HeaderMenu;
'use client'

import React from 'react';
import Link from 'next/link';

interface NavButtonProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  href: string;
}

const NavButton: React.FC<NavButtonProps> = ({ icon, label, active, href }) => {
  return (
    <Link
      href={href}
      className={`flex flex-col items-center p-1 ${
        active ? 'text-red-600' : 'text-gray-600'
      }`}
    >
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </Link>
  );
};

export default NavButton;
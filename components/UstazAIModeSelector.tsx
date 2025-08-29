'use client';

import { useState } from 'react';
import { BookOpen, Users, GraduationCap, Crown, User } from 'lucide-react';

export type UserType = 'beginners' | 'kids' | 'muallaf' | 'senior' | 'professional';

interface UstazAIModeSelectorProps {
  selectedUserType: UserType | null;
  onUserTypeChange: (userType: UserType | null) => void;
  isEnabled: boolean;
  onToggle: (enabled: boolean) => void;
}

const USER_TYPES = [
  {
    id: 'beginners' as UserType,
    name: 'Beginners',
    description: 'New to Islamic studies',
    icon: BookOpen,
    color: 'bg-green-100 text-green-700'
  },
  {
    id: 'kids' as UserType,
    name: 'Children',
    description: 'Age-appropriate learning',
    icon: Users,
    color: 'bg-blue-100 text-blue-700'
  },
  {
    id: 'muallaf' as UserType,
    name: 'New Muslims',
    description: 'Recently converted',
    icon: GraduationCap,
    color: 'bg-purple-100 text-purple-700'
  },
  {
    id: 'senior' as UserType,
    name: 'Scholars',
    description: 'Advanced Islamic knowledge',
    icon: Crown,
    color: 'bg-yellow-100 text-yellow-700'
  },
  {
    id: 'professional' as UserType,
    name: 'Professionals',
    description: 'Islamic guidance for work/life',
    icon: User,
    color: 'bg-red-100 text-red-700'
  }
];

export default function UstazAIModeSelector({
  selectedUserType,
  onUserTypeChange,
  isEnabled,
  onToggle
}: UstazAIModeSelectorProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative">
      {/* Toggle Button */}
      <button
        onClick={() => onToggle(!isEnabled)}
        className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
          isEnabled
            ? 'bg-green-600 text-white shadow-lg'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        <div className="w-5 h-5">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L13.09 8.26L22 9.27L17.77 13.14L19.18 21.02L12 17.77L4.82 21.02L6.23 13.14L2 9.27L10.91 8.26L12 2Z"/>
          </svg>
        </div>
        <span className="text-sm font-medium">
          {isEnabled ? 'USTAZ AI' : 'Standard AI'}
        </span>
      </button>

      {/* User Type Selector */}
      {isEnabled && (
        <div className="mt-3 space-y-2">
          <div className="text-xs text-gray-500 font-medium uppercase tracking-wide">
            Select Learning Level
          </div>

          <div className="grid grid-cols-1 gap-2">
            {USER_TYPES.map((userType) => {
              const Icon = userType.icon;
              const isSelected = selectedUserType === userType.id;

              return (
                <button
                  key={userType.id}
                  onClick={() => onUserTypeChange(userType.id)}
                  className={`flex items-center space-x-3 p-3 rounded-lg border-2 transition-all duration-200 text-left ${
                    isSelected
                      ? 'border-green-500 bg-green-50 shadow-sm'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${userType.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className={`text-sm font-medium ${
                      isSelected ? 'text-green-900' : 'text-gray-900'
                    }`}>
                      {userType.name}
                    </div>
                    <div className={`text-xs ${
                      isSelected ? 'text-green-600' : 'text-gray-500'
                    }`}>
                      {userType.description}
                    </div>
                  </div>

                  {isSelected && (
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Cost Information */}
          {selectedUserType && (
            <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="text-xs text-blue-800">
                <div className="font-medium mb-1">💰 Cost Optimization Active</div>
                <div className="text-blue-600">
                  Ultra-budget model selected for {USER_TYPES.find(t => t.id === selectedUserType)?.name}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

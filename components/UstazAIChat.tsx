'use client';

import { useState, useEffect } from 'react';
import { Chat } from '../app/components/chat';
import { UstazAIModeSelector, UserType } from '../app/components/ustaz-ai-mode-selector';

export function UstazAIChat() {
  const [isUstazAIMode, setIsUstazAIMode] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState<UserType | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  // Check for stored user session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('ustaz_user');
    const storedSession = localStorage.getItem('ustaz_session');

    if (storedUser && storedSession) {
      try {
        const userData = JSON.parse(storedUser);
        setUserId(userData.id);
        setSelectedUserType(userData.userType);
        setIsUstazAIMode(true);
      } catch (error) {
        console.error('Failed to parse stored user data:', error);
        // Clear corrupted data
        localStorage.removeItem('ustaz_user');
        localStorage.removeItem('ustaz_session');
      }
    }
  }, []);

  const handleUserTypeChange = (userType: UserType | null) => {
    setSelectedUserType(userType);

    // If user type is cleared, disable USTAZ AI mode
    if (!userType) {
      setIsUstazAIMode(false);
    }
  };

  const handleModeToggle = (enabled: boolean) => {
    setIsUstazAIMode(enabled);

    // If disabling USTAZ AI mode, clear user type
    if (!enabled) {
      setSelectedUserType(null);
      setUserId(null);
      // Clear stored session
      localStorage.removeItem('ustaz_user');
      localStorage.removeItem('ustaz_session');
    }
  };

  return (
    <div className="relative h-full">
      {/* USTAZ AI Mode Selector - positioned in top right */}
      <div className="absolute top-4 right-4 z-50">
        <UstazAIModeSelector
          ustazAIMode={isUstazAIMode}
          userType={selectedUserType}
          userId={userId}
          onModeChange={handleModeToggle}
          onUserTypeChange={handleUserTypeChange}
          onUserIdChange={setUserId}
        />
      </div>

      {/* Main Chat Interface */}
      <div className="h-full">
        <Chat
          ustazAIMode={isUstazAIMode}
          userType={selectedUserType || undefined}
          userId={userId || undefined}
        />
      </div>

      {/* USTAZ AI Welcome Overlay */}
      {isUstazAIMode && selectedUserType && (
        <div className="absolute bottom-4 left-4 z-40 max-w-sm">
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 shadow-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-green-800">
                USTAZ AI Active
              </span>
            </div>
            <p className="text-xs text-green-600 mt-1">
              Personalized Islamic learning with budget-optimized AI models
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

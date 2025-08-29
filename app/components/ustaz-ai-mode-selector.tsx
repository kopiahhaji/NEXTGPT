import React, { useState } from 'react';
import { BookOpen, Users, GraduationCap, Heart, Crown, User } from 'lucide-react';
import styles from './ustaz-ai-mode-selector.module.scss';

export type UserType = 'beginners' | 'kids' | 'muallaf' | 'senior' | 'professional';

interface UserTypeOption {
  value: UserType;
  label: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const userTypeOptions: UserTypeOption[] = [
  {
    value: 'beginners',
    label: 'Beginners',
    description: 'New to Islamic studies',
    icon: <BookOpen size={20} />,
    color: '#10B981'
  },
  {
    value: 'kids',
    label: 'Kids',
    description: 'Children learning Islam',
    icon: <Users size={20} />,
    color: '#F59E0B'
  },
  {
    value: 'muallaf',
    label: 'Muallaf',
    description: 'New converts to Islam',
    icon: <Heart size={20} />,
    color: '#EF4444'
  },
  {
    value: 'senior',
    label: 'Senior',
    description: 'Advanced Islamic scholars',
    icon: <GraduationCap size={20} />,
    color: '#8B5CF6'
  },
  {
    value: 'professional',
    label: 'Professional',
    description: 'Islamic professionals',
    icon: <Crown size={20} />,
    color: '#06B6D4'
  }
];

interface UstazAIModeSelectorProps {
  ustazAIMode: boolean;
  userType: UserType | null;
  userId: string | null;
  onModeChange: (enabled: boolean) => void;
  onUserTypeChange: (userType: UserType) => void;
  onUserIdChange: (userId: string) => void;
}

export function UstazAIModeSelector({
  ustazAIMode,
  userType,
  userId,
  onModeChange,
  onUserTypeChange,
  onUserIdChange
}: UstazAIModeSelectorProps) {
  const [showUserTypeSelector, setShowUserTypeSelector] = useState(false);
  const [tempUserId, setTempUserId] = useState(userId || '');

  const handleModeToggle = () => {
    if (ustazAIMode) {
      // Turning off USTAZ AI mode
      onModeChange(false);
    } else {
      // Turning on USTAZ AI mode - show user type selector
      setShowUserTypeSelector(true);
    }
  };

  const handleUserTypeSelect = (selectedUserType: UserType) => {
    onUserTypeChange(selectedUserType);
    onModeChange(true);
    setShowUserTypeSelector(false);
  };

  const handleUserIdSubmit = () => {
    if (tempUserId.trim()) {
      onUserIdChange(tempUserId.trim());
    }
  };

  const selectedUserTypeOption = userTypeOptions.find(option => option.value === userType);

  return (
    <div className={styles['ustaz-ai-selector']}>
      {/* Mode Toggle Button */}
      <button
        className={`${styles['mode-toggle']} ${ustazAIMode ? styles['active'] : ''}`}
        onClick={handleModeToggle}
        title={ustazAIMode ? 'Disable USTAZ AI Mode' : 'Enable USTAZ AI Mode'}
      >
        <BookOpen size={16} />
        <span>USTAZ AI</span>
        {ustazAIMode && (
          <div className={styles['active-indicator']} />
        )}
      </button>

      {/* User Type Display */}
      {ustazAIMode && selectedUserTypeOption && (
        <div className={styles['user-type-display']}>
          <div
            className={styles['user-type-badge']}
            style={{ backgroundColor: selectedUserTypeOption.color }}
          >
            {selectedUserTypeOption.icon}
            <span>{selectedUserTypeOption.label}</span>
          </div>
        </div>
      )}

      {/* User ID Input */}
      {ustazAIMode && (
        <div className={styles['user-id-input']}>
          <input
            type="text"
            placeholder="Enter User ID"
            value={tempUserId}
            onChange={(e) => setTempUserId(e.target.value)}
            onBlur={handleUserIdSubmit}
            onKeyPress={(e) => e.key === 'Enter' && handleUserIdSubmit()}
            className={styles['user-id-field']}
          />
          <User size={14} />
        </div>
      )}

      {/* User Type Selector Modal */}
      {showUserTypeSelector && (
        <div className={styles['modal-overlay']} onClick={() => setShowUserTypeSelector(false)}>
          <div className={styles['modal-content']} onClick={(e) => e.stopPropagation()}>
            <h3 className={styles['modal-title']}>Select Your Learning Level</h3>
            <p className={styles['modal-description']}>
              Choose the option that best describes your Islamic knowledge level
            </p>

            <div className={styles['user-type-grid']}>
              {userTypeOptions.map((option) => (
                <button
                  key={option.value}
                  className={styles['user-type-option']}
                  onClick={() => handleUserTypeSelect(option.value)}
                >
                  <div
                    className={styles['option-icon']}
                    style={{ color: option.color }}
                  >
                    {option.icon}
                  </div>
                  <div className={styles['option-content']}>
                    <h4 className={styles['option-title']}>{option.label}</h4>
                    <p className={styles['option-description']}>{option.description}</p>
                  </div>
                </button>
              ))}
            </div>

            <button
              className={styles['cancel-button']}
              onClick={() => setShowUserTypeSelector(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

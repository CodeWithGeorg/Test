import React from 'react';

/**
 * Avatar Component
 * User profile image or initials display
 */
export default function Avatar({
  src,
  alt = 'Avatar',
  name,
  size = 'medium',
  rounded = true,
  className = '',
}) {
  const sizeClasses = {
    small: 'w-8 h-8 text-xs',
    medium: 'w-10 h-10 text-sm',
    large: 'w-12 h-12 text-base',
    xlarge: 'w-16 h-16 text-lg',
  };

  const roundedClass = rounded ? 'rounded-full' : 'rounded';

  // Get initials from name
  const getInitials = (name) => {
    if (!name) return '?';
    const parts = name.trim().split(' ');
    if (parts.length === 1) {
      return parts[0].charAt(0).toUpperCase();
    }
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  };

  // Generate a consistent color based on name
  const getColorFromName = (name) => {
    if (!name) return 'bg-gray-500';
    const colors = [
      'bg-red-500',
      'bg-orange-500',
      'bg-yellow-500',
      'bg-green-500',
      'bg-teal-500',
      'bg-blue-500',
      'bg-indigo-500',
      'bg-purple-500',
      'bg-pink-500',
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={`${sizeClasses[size]} ${roundedClass} object-cover ${className}`}
      />
    );
  }

  const initials = getInitials(name);
  const bgColor = getColorFromName(name);

  return (
    <div
      className={`${sizeClasses[size]} ${roundedClass} ${bgColor} flex items-center justify-center text-white font-medium ${className}`}
      alt={alt}
    >
      {initials}
    </div>
  );
}

/**
 * Avatar Group Component
 * Display multiple avatars in a group with overlap
 */
export function AvatarGroup({
  avatars = [],
  max = 4,
  size = 'medium',
  className = '',
}) {
  const visibleAvatars = avatars.slice(0, max);
  const remainingCount = avatars.length - max;

  const sizeClasses = {
    small: 'w-6 h-6 text-xs -ml-2',
    medium: 'w-8 h-8 text-xs -ml-2',
    large: 'w-10 h-10 text-sm -ml-3',
    xlarge: 'w-12 h-12 text-base -ml-4',
  };

  return (
    <div className={`flex items-center ${className}`}>
      {visibleAvatars.map((avatar, index) => (
        <div
          key={index}
          className={`${sizeClasses[size]} ${index === 0 ? '' : 'border-2 border-white'}`}
        >
          <Avatar
            src={avatar.src}
            name={avatar.name}
            size={size}
          />
        </div>
      ))}
      
      {remainingCount > 0 && (
        <div
          className={`${sizeClasses[size]} bg-gray-500 flex items-center justify-center text-white rounded-full border-2 border-white`}
        >
          +{remainingCount}
        </div>
      )}
    </div>
  );
}

/**
 * Avatar with Status Indicator
 */
export function AvatarWithStatus({
  src,
  name,
  status = 'offline',
  size = 'medium',
  showStatus = true,
  className = '',
}) {
  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-gray-400',
    busy: 'bg-red-500',
    away: 'bg-yellow-500',
  };

  const statusSizes = {
    small: 'w-2 h-2',
    medium: 'w-2.5 h-2.5',
    large: 'w-3 h-3',
    xlarge: 'w-4 h-4',
  };

  return (
    <div className={`relative inline-block ${className}`}>
      <Avatar src={src} name={name} size={size} />
      
      {showStatus && (
        <span
          className={`absolute bottom-0 right-0 ${statusSizes[size]} ${statusColors[status]} rounded-full border-2 border-white`}
        />
      )}
    </div>
  );
}

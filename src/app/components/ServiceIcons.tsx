import React from 'react';

interface ServiceIconProps {
  className?: string;
  style?: React.CSSProperties;
}

export const ConsultancyIcon: React.FC<ServiceIconProps> = ({ className = "", style }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
    style={style}
  >
    <path 
      d="M12 2C13.1046 2 14 2.89543 14 4C14 5.10457 13.1046 6 12 6C10.8954 6 10 5.10457 10 4C10 2.89543 10.8954 2 12 2Z" 
      fill="currentColor"
    />
    <path 
      d="M12 8C15.3137 8 18 10.6863 18 14V16C18 17.1046 17.1046 18 16 18H8C6.89543 18 6 17.1046 6 16V14C6 10.6863 8.68629 8 12 8Z" 
      fill="currentColor"
    />
    <path 
      d="M9 20C9 19.4477 9.44772 19 10 19H14C14.5523 19 15 19.4477 15 20V21C15 21.5523 14.5523 22 14 22H10C9.44772 22 9 21.5523 9 21V20Z" 
      fill="currentColor"
    />
    <circle cx="12" cy="12" r="2" fill="white" fillOpacity="0.9"/>
    <path 
      d="M10.5 12L11.5 13L13.5 11" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

export const MaintenanceIcon: React.FC<ServiceIconProps> = ({ className = "", style }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
    style={style}
  >
    <path 
      d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" 
      fill="currentColor"
    />
    <circle cx="12" cy="12" r="3" fill="white" fillOpacity="0.9"/>
    <path 
      d="M10 12H14" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round"
    />
    <path 
      d="M12 10V14" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round"
    />
  </svg>
);

interface ServiceTypeIconProps {
  type: 'consultoria' | 'manutencao';
  className?: string;
  style?: React.CSSProperties;
}

export const ServiceTypeIcon: React.FC<ServiceTypeIconProps> = ({ type, className, style }) => {
  return type === 'consultoria' ? (
    <ConsultancyIcon className={className} style={style} />
  ) : (
    <MaintenanceIcon className={className} style={style} />
  );
};
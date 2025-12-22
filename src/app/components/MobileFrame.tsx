import { ReactNode } from 'react';

interface MobileFrameProps {
  children: ReactNode;
  background?: 'dark' | 'light' | 'beige';
}

export function MobileFrame({ children, background = 'light' }: MobileFrameProps) {
  const getBackgroundColor = () => {
    switch (background) {
      case 'dark':
        return '#0D332B';
      case 'beige':
        return '#DFD8B5';
      default:
        return '#F9F7F4';
    }
  };

  return (
    <div 
      className="flex justify-center items-center min-h-screen p-4"
      style={{ 
        background: 'linear-gradient(135deg, #F9F7F4 0%, #F5F5F0 100%)'
      }}
    >
      <div 
        className="w-full max-w-sm h-[800px] rounded-[2.5rem] relative"
        style={{ 
          backgroundColor: getBackgroundColor(),
          boxShadow: '0 25px 60px rgba(45, 42, 38, 0.15), 0 12px 24px rgba(45, 42, 38, 0.08)'
        }}
      >
        <div className="h-full overflow-y-auto overflow-x-hidden rounded-[2.5rem]">
          {children}
        </div>
      </div>
    </div>
  );
}
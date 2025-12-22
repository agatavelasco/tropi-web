import { Users, Calendar, Settings, Home } from 'lucide-react';

interface BottomNavigationProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
}

export function BottomNavigation({ currentScreen, onNavigate }: BottomNavigationProps) {
  const navItems = [
    { id: 'home', icon: Home, label: 'Home', active: true },
    { id: 'client-list', icon: Users, label: 'Clientes', active: true },
    { id: 'calendar', icon: Calendar, label: 'Agenda', active: false },
    { id: 'settings', icon: Settings, label: 'Config', active: false }
  ];

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 bg-white px-6 py-4 z-[9999]"
      style={{ 
        borderTop: '1px solid rgba(45, 42, 38, 0.08)',
        boxShadow: '0 -4px 20px rgba(45, 42, 38, 0.06)',
        borderBottomLeftRadius: '2.5rem',
        borderBottomRightRadius: '2.5rem'
      }}
    >
      <div className="flex justify-around items-center max-w-sm mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id || 
            (item.id === 'client-list' && ['client-list', 'client-form', 'client-detail', 'service-form', 'service-detail'].includes(currentScreen)) ||
            (item.id === 'home' && currentScreen === 'home');
          
          return (
            <button
              key={item.id}
              onClick={() => item.active && onNavigate(item.id)}
              className={`flex flex-col items-center py-3 px-4 min-w-0 rounded-2xl transition-all duration-300 ${
                !item.active ? 'opacity-50' : isActive 
                  ? 'shadow-sm scale-105' 
                  : 'hover:bg-gray-50 hover:scale-102 active:scale-95'
              }`}
              disabled={!item.active}
              style={{
                backgroundColor: isActive && item.active ? 'rgba(61, 89, 25, 0.1)' : 'transparent'
              }}
            >
              <Icon 
                size={22} 
                className="mb-2"
                style={{ 
                  color: item.active 
                    ? (isActive ? '#3D5919' : '#8B8680') 
                    : '#ADB5BD' 
                }}
              />
              <span 
                className={`text-xs font-medium ${isActive && item.active ? 'font-semibold' : ''}`}
                style={{ 
                  color: item.active 
                    ? (isActive ? '#3D5919' : '#8B8680') 
                    : '#ADB5BD' 
                }}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
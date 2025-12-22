import React from 'react';
import { ChevronRight } from 'lucide-react';
import { ServiceTypeIcon } from './ServiceIcons';

interface ServiceCardProps {
  id: string;
  type: 'consultoria' | 'manutencao';
  service: string;
  client: string;
  date: string;
  onNavigate: (screen: string, id?: string) => void;
  showChevron?: boolean;
  showClient?: boolean;
}

export function ServiceCard({ 
  id, 
  type, 
  service, 
  client, 
  date, 
  onNavigate, 
  showChevron = true,
  showClient = true 
}: ServiceCardProps) {
  return (
    <div
      key={id}
      onClick={() => onNavigate('service-detail', id)}
      className="p-5 rounded-2xl cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
      style={{ 
        backgroundColor: '#ffffff',
        boxShadow: '0 2px 12px rgba(45, 42, 38, 0.06)',
        filter: 'drop-shadow(0 1px 3px rgba(45, 42, 38, 0.03))'
      }}
    >
      <div className="flex items-center space-x-4">
        <div 
          className="w-12 h-12 rounded-2xl flex items-center justify-center"
          style={{ backgroundColor: type === 'consultoria' ? '#3D5919' : '#8C9A3F' }}
        >
          <ServiceTypeIcon 
            type={type}
            className="w-6 h-6 text-white"
          />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold" style={{ color: '#2D2A26' }}>
            {service}
          </h3>
          <p className="text-sm mt-1" style={{ color: '#8B8680' }}>
            {showClient ? `${client} • ${date}` : `${type === 'consultoria' ? 'Consultoria' : 'Manutenção'} • ${date}`}
          </p>
        </div>
        {showChevron && (
          <ChevronRight className="h-5 w-5" style={{ color: '#8B8680' }} />
        )}
      </div>
    </div>
  );
}
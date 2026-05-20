import React, { useState } from 'react';
import { X, FileText, Shield, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLegalNotifications } from '@/hooks/useLegalNotifications';

const LegalNotificationBanner = () => {
  const { notifications, hasUnread, markAsRead, removeNotification } = useLegalNotifications();
  const [isVisible, setIsVisible] = useState(hasUnread);

  if (!isVisible || !hasUnread) return null;

  const unreadNotifications = notifications.filter(n => !n.read);
  const latestNotification = unreadNotifications[0]; // Mostra a mais recente

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleViewDocument = () => {
    markAsRead(latestNotification.id);
    setIsVisible(false);
  };

  const getIcon = (type: string) => {
    return type === 'privacy' ? <Shield className="w-5 h-5" /> : <FileText className="w-5 h-5" />;
  };

  const getLink = (type: string) => {
    return type === 'privacy' ? '/politica-privacidade' : '/termos-uso';
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Bell className="w-5 h-5 text-blue-200" />
              <span className="font-semibold text-sm font-inter">Atualização Importante</span>
            </div>
            <div className="flex items-center space-x-2">
              {getIcon(latestNotification.type)}
              <span className="text-sm font-inter font-light">
                {latestNotification.message}
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Link
              to={getLink(latestNotification.type)}
              onClick={handleViewDocument}
              className="bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-50 transition-colors font-inter"
            >
              Ver Documento
            </Link>
            <button
              onClick={handleClose}
              className="text-blue-200 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalNotificationBanner;

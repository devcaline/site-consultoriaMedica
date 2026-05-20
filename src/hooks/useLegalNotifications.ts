import { useState, useEffect } from 'react';
import { getCurrentVersion } from '@/utils/legalVersions';

interface LegalNotification {
  id: string;
  type: 'privacy' | 'terms';
  version: string;
  date: string;
  message: string;
  read: boolean;
}

const STORAGE_KEY = 'storm_legal_notifications';

export const useLegalNotifications = () => {
  const [notifications, setNotifications] = useState<LegalNotification[]>([]);
  const [hasUnread, setHasUnread] = useState(false);

  // Carrega notificações do localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setNotifications(parsed);
        setHasUnread(parsed.some((n: LegalNotification) => !n.read));
      } catch (error) {
        console.error('Erro ao carregar notificações:', error);
      }
    }
  }, []);

  // Verifica por atualizações quando o componente monta
  useEffect(() => {
    const currentPrivacyVersion = getCurrentVersion('privacy');
    const currentTermsVersion = getCurrentVersion('terms');
    
    const existingNotifications = notifications;
    const newNotifications: LegalNotification[] = [];

    // Verifica se já existe notificação para a versão atual da política de privacidade
    const hasPrivacyNotification = existingNotifications.some(
      n => n.type === 'privacy' && n.version === currentPrivacyVersion
    );

    if (!hasPrivacyNotification) {
      newNotifications.push({
        id: `privacy-${currentPrivacyVersion}`,
        type: 'privacy',
        version: currentPrivacyVersion,
        date: new Date().toISOString(),
        message: `Nova versão da Política de Privacidade (v${currentPrivacyVersion}) disponível`,
        read: false
      });
    }

    // Verifica se já existe notificação para a versão atual dos termos
    const hasTermsNotification = existingNotifications.some(
      n => n.type === 'terms' && n.version === currentTermsVersion
    );

    if (!hasTermsNotification) {
      newNotifications.push({
        id: `terms-${currentTermsVersion}`,
        type: 'terms',
        version: currentTermsVersion,
        date: new Date().toISOString(),
        message: `Nova versão dos Termos de Uso (v${currentTermsVersion}) disponível`,
        read: false
      });
    }

    if (newNotifications.length > 0) {
      const updatedNotifications = [...existingNotifications, ...newNotifications];
      setNotifications(updatedNotifications);
      setHasUnread(true);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedNotifications));
    }
  }, [notifications]);

  // Verifica se há novas versões
  const checkForUpdates = () => {
    const currentPrivacyVersion = getCurrentVersion('privacy');
    const currentTermsVersion = getCurrentVersion('terms');
    
    const existingNotifications = notifications;
    const newNotifications: LegalNotification[] = [];

    // Verifica se já existe notificação para a versão atual da política de privacidade
    const hasPrivacyNotification = existingNotifications.some(
      n => n.type === 'privacy' && n.version === currentPrivacyVersion
    );

    if (!hasPrivacyNotification) {
      newNotifications.push({
        id: `privacy-${currentPrivacyVersion}`,
        type: 'privacy',
        version: currentPrivacyVersion,
        date: new Date().toISOString(),
        message: `Nova versão da Política de Privacidade (v${currentPrivacyVersion}) disponível`,
        read: false
      });
    }

    // Verifica se já existe notificação para a versão atual dos termos
    const hasTermsNotification = existingNotifications.some(
      n => n.type === 'terms' && n.version === currentTermsVersion
    );

    if (!hasTermsNotification) {
      newNotifications.push({
        id: `terms-${currentTermsVersion}`,
        type: 'terms',
        version: currentTermsVersion,
        date: new Date().toISOString(),
        message: `Nova versão dos Termos de Uso (v${currentTermsVersion}) disponível`,
        read: false
      });
    }

    if (newNotifications.length > 0) {
      const updatedNotifications = [...existingNotifications, ...newNotifications];
      setNotifications(updatedNotifications);
      setHasUnread(true);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedNotifications));
    }
  };

  // Marca notificação como lida
  const markAsRead = (id: string) => {
    const updated = notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    );
    setNotifications(updated);
    setHasUnread(updated.some(n => !n.read));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  // Marca todas como lidas
  const markAllAsRead = () => {
    const updated = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updated);
    setHasUnread(false);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  // Remove notificação
  const removeNotification = (id: string) => {
    const updated = notifications.filter(n => n.id !== id);
    setNotifications(updated);
    setHasUnread(updated.some(n => !n.read));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  return {
    notifications,
    hasUnread,
    checkForUpdates,
    markAsRead,
    markAllAsRead,
    removeNotification
  };
};

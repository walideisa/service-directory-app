import { useState, useCallback } from 'react';
import { ChatMessage, Place } from '../types';
import { generateId } from '../utils/helpers';

export const useChat = (places: Place[]) => {
  const [showChat, setShowChat] = useState(false);
  const [isChatMinimized, setIsChatMinimized] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      type: 'bot',
      content: 'مرحباً! أنا مساعدك الذكي 🤖 يمكنني مساعدتك في العثور على الأماكن والخدمات في مدينة 15 مايو. اسألني عن أي شيء!',
      timestamp: new Date()
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const toggleChat = useCallback(() => {
    setShowChat(prev => !prev);
    if (isChatMinimized) {
      setIsChatMinimized(false);
    }
  }, [isChatMinimized]);

  const minimizeChat = useCallback(() => {
    setIsChatMinimized(true);
  }, []);

  const maximizeChat = useCallback(() => {
    setIsChatMinimized(false);
  }, []);

  const sendMessage = useCallback((message: string) => {
    if (!message.trim()) return;

    // إضافة رسالة المستخدم
    const userMessage: ChatMessage = {
      id: `user_${generateId()}`,
      type: 'user',
      content: message.trim(),
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');
    setIsTyping(true);

    // محاكاة الذكاء الاصطناعي
    setTimeout(() => {
      const botResponse = generateBotResponse(message, places);
      const botMessage: ChatMessage = {
        id: `bot_${generateId()}`,
        type: 'bot',
        content: botResponse,
        timestamp: new Date()
      };

      setChatMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  }, [places]);

  return {
    showChat,
    isChatMinimized,
    chatMessages,
    chatInput,
    isTyping,
    setChatInput,
    toggleChat,
    minimizeChat,
    maximizeChat,
    sendMessage
  };
};

// دالة توليد رد الذكاء الاصطناعي
const generateBotResponse = (userMessage: string, places: Place[]): string => {
  const message = userMessage.toLowerCase();

  if (message.includes('مول') || message.includes('تسوق')) {
    const malls = places.filter(p => p.category === 'mall');
    return `يوجد ${malls.length} مولات في مدينة 15 مايو:\n${malls.map(mall => `• ${mall.name}`).join('\n')}`;
  }

  if (message.includes('مطعم') || message.includes('أكل')) {
    const restaurants = places.filter(p => p.category === 'restaurant');
    return `يوجد ${restaurants.length} مطاعم في مدينة 15 مايو:\n${restaurants.map(restaurant => `• ${restaurant.name}`).join('\n')}`;
  }

  if (message.includes('مستشفى') || message.includes('علاج')) {
    const hospitals = places.filter(p => p.category === 'hospital');
    return `يوجد ${hospitals.length} مستشفيات في مدينة 15 مايو:\n${hospitals.map(hospital => `• ${hospital.name}`).join('\n')}`;
  }

  if (message.includes('بنك') || message.includes('صراف')) {
    const banks = places.filter(p => p.category === 'bank');
    return `يوجد ${banks.length} بنوك في مدينة 15 مايو:\n${banks.map(bank => `• ${bank.name}`).join('\n')}`;
  }

  if (message.includes('سوق') || message.includes('خضار')) {
    const markets = places.filter(p => p.category === 'market');
    return `يوجد ${markets.length} أسواق في مدينة 15 مايو:\n${markets.map(market => `• ${market.name}`).join('\n')}`;
  }

  if (message.includes('ساعات') || message.includes('مواعيد')) {
    return 'يمكنك رؤية مواعيد العمل لأي مكان من خلال النقر على تفاصيل المكان 🕐';
  }

  if (message.includes('هاتف') || message.includes('تليفون')) {
    return 'يمكنك رؤية أرقام الهاتف لأي مكان من خلال النقر على تفاصيل المكان 📞';
  }

  // رد عام
  return 'يمكنني مساعدتك في العثور على المولات، المطاعم، المستشفيات، البنوك، والأسواق في مدينة 15 مايو. اسأل عن نوع المكان الذي تبحث عنه! 🏙️';
};
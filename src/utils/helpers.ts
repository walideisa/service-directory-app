import { Place, SearchFilters } from '../types';

// دالة البحث والفلترة
export const filterPlaces = (places: Place[], filters: SearchFilters): Place[] => {
  return places
    .filter(place => place.isVisible)
    .filter(place => {
      const matchesSearch = place.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        place.address.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        place.description.toLowerCase().includes(filters.searchTerm.toLowerCase());

      const matchesCategory = filters.selectedCategory === 'all' || place.category === filters.selectedCategory;

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (filters.sortBy) {
        case 'likes':
          return b.likes - a.likes;
        case 'category':
          return a.category.localeCompare(b.category);
        default:
          return a.name.localeCompare(b.name);
      }
    });
};

// دالة تنسيق التوقيت
export const formatTimeAgo = (date: Date): string => {
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

  if (diffInMinutes < 1) return 'الآن';
  if (diffInMinutes < 60) return `منذ ${diffInMinutes} دقيقة`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `منذ ${diffInHours} ساعة`;

  const diffInDays = Math.floor(diffInHours / 24);
  return `منذ ${diffInDays} يوم`;
};

// دالة توليد ID جديد
export const generateId = (): number => {
  return Date.now() + Math.floor(Math.random() * 1000);
};

// دالة التحقق من صحة رقم الهاتف
export const validatePhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^(\+20|0)?[0-9]{8,11}$/;
  return phoneRegex.test(phone.replace(/\s+/g, ''));
};

// دالة تنظيف النص
export const sanitizeText = (text: string): string => {
  return text.trim().replace(/\s+/g, ' ');
};
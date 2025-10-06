// أنواع البيانات الأساسية للتطبيق

export interface Place {
  id: number;
  name: string;
  category: string;
  likes: number;
  address: string;
  phone: string;
  hours: string;
  image: string;
  services: string[];
  description: string;
  isVisible: boolean;
  customCategoryData?: {
    name: string;
    icon: string;
  };
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
  visible: boolean;
}

export interface SearchFilters {
  searchTerm: string;
  selectedCategory: string;
  sortBy: string;
}

export interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

export interface PlaceFormData {
  name: string;
  category: string;
  address: string;
  phone: string;
  hours: string;
  description: string;
  services: string[];
  image?: string;
  customCategory?: {
    name: string;
    icon: string;
  };
}

export type ViewType = 'search' | 'manage' | 'categories';
export type SortType = 'name' | 'likes' | 'category';
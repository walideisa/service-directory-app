import { useState, useCallback } from 'react';
import { Place, PlaceFormData } from '../types';
import { initialPlaces } from '../data/places';
import { generateId, sanitizeText } from '../utils/helpers';

export const usePlaces = () => {
  const [places, setPlaces] = useState<Place[]>(initialPlaces);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [likes, setLikes] = useState<{[key: number]: boolean}>({});

  // إضافة مكان جديد
  const addPlace = useCallback((formData: PlaceFormData) => {
    const newPlace: Place = {
      id: generateId(),
      name: sanitizeText(formData.name),
      category: formData.category,
      address: sanitizeText(formData.address),
      phone: formData.phone,
      hours: formData.hours,
      description: sanitizeText(formData.description),
      services: formData.services.map(service => sanitizeText(service)),
      image: formData.image || 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400',
      likes: 0,
      isVisible: true,
      customCategoryData: formData.customCategory
    };

    setPlaces(prev => [...prev, newPlace]);
    return newPlace;
  }, []);

  // تحديث مكان
  const updatePlace = useCallback((id: number, formData: Partial<PlaceFormData>) => {
    setPlaces(prev => prev.map(place =>
      place.id === id
        ? {
            ...place,
            ...formData,
            name: formData.name ? sanitizeText(formData.name) : place.name,
            address: formData.address ? sanitizeText(formData.address) : place.address,
            description: formData.description ? sanitizeText(formData.description) : place.description,
            services: formData.services ? formData.services.map(service => sanitizeText(service)) : place.services
          }
        : place
    ));
  }, []);

  // حذف مكان
  const deletePlace = useCallback((id: number) => {
    setPlaces(prev => prev.filter(place => place.id !== id));
    setFavorites(prev => prev.filter(favId => favId !== id));
  }, []);

  // تبديل حالة الإعجاب
  const toggleLike = useCallback((id: number) => {
    setLikes(prev => ({ ...prev, [id]: !prev[id] }));
    setPlaces(prev => prev.map(place =>
      place.id === id
        ? { ...place, likes: likes[id] ? place.likes - 1 : place.likes + 1 }
        : place
    ));
  }, [likes]);

  // إضافة/إزالة من المفضلة
  const toggleFavorite = useCallback((id: number) => {
    setFavorites(prev =>
      prev.includes(id)
        ? prev.filter(favId => favId !== id)
        : [...prev, id]
    );
  }, []);

  // تبديل رؤية المكان
  const toggleVisibility = useCallback((id: number) => {
    setPlaces(prev => prev.map(place =>
      place.id === id
        ? { ...place, isVisible: !place.isVisible }
        : place
    ));
  }, []);

  return {
    places,
    favorites,
    likes,
    addPlace,
    updatePlace,
    deletePlace,
    toggleLike,
    toggleFavorite,
    toggleVisibility
  };
};
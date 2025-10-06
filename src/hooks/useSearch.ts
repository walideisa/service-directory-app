import { useState, useMemo } from 'react';
import { Place, SearchFilters } from '../types';
import { filterPlaces } from '../utils/helpers';

export const useSearch = (places: Place[]) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState<'name' | 'likes' | 'category'>('name');

  const filters: SearchFilters = {
    searchTerm,
    selectedCategory,
    sortBy
  };

  const filteredPlaces = useMemo(() => {
    return filterPlaces(places, filters);
  }, [places, searchTerm, selectedCategory, sortBy]);

  const clearSearch = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSortBy('name');
  };

  return {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    filteredPlaces,
    clearSearch
  };
};
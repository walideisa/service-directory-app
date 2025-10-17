import React, { useState, useEffect } from 'react';
import { Upload, X, Plus } from 'lucide-react';

// Types
interface Place {
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
  type?: string;
  appointmentSettings?: any;
}

interface PlaceFormData {
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
  type?: string;
  products?: Array<{name: string, price: string, description: string}>;
  appointmentSettings?: any;
}

interface PlaceFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: PlaceFormData) => void;
  editingPlace?: Place | null;
  categories: { [key: string]: { name: string; icon: string; isVisible: boolean } };
  uploadedImage: string | null;
  setUploadedImage: (image: string | null) => void;
}

export const PlaceForm: React.FC<PlaceFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  editingPlace,
  categories,
  uploadedImage,
  setUploadedImage
}) => {
  const [formData, setFormData] = useState<PlaceFormData>({
    name: '',
    category: '',
    address: '',
    phone: '',
    hours: '',
    description: '',
    services: [],
    image: '',
    customCategory: undefined,
    type: 'حجورات'
  });

  const [showCustomCategory, setShowCustomCategory] = useState(false);
  const [customCategoryName, setCustomCategoryName] = useState('');
  const [customCategoryIcon, setCustomCategoryIcon] = useState('🏢');

  // Services management
  const [currentService, setCurrentService] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  // Products management (for طلبات type)
  const [currentProduct, setCurrentProduct] = useState({ name: '', price: '', description: '' });
  const [selectedProducts, setSelectedProducts] = useState<Array<{name: string, price: string, description: string}>>([]);

  // Appointment settings (for حجورات type)
  const [appointmentSettings, setAppointmentSettings] = useState({
    sessionDuration: '30',
    consultationFee: '',
    availableDays: [] as string[],
    startTime: '09:00',
    endTime: '17:00',
    maxConcurrentBookings: '1'
  });

  // Services functions
  const addService = () => {
    if (currentService.trim() && !selectedServices.includes(currentService.trim())) {
      setSelectedServices([...selectedServices, currentService.trim()]);
      setCurrentService('');
    }
  };

  const removeService = (serviceToRemove: string) => {
    setSelectedServices(selectedServices.filter(service => service !== serviceToRemove));
  };

  const handleServiceKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addService();
    }
  };

  // Products functions
  const addProduct = () => {
    if (currentProduct.name.trim() && currentProduct.price.trim()) {
      setSelectedProducts([...selectedProducts, { ...currentProduct }]);
      setCurrentProduct({ name: '', price: '', description: '' });
    }
  };

  const removeProduct = (index: number) => {
    setSelectedProducts(selectedProducts.filter((_, i) => i !== index));
  };

  // Appointment functions
  const toggleAvailableDay = (day: string) => {
    setAppointmentSettings(prev => ({
      ...prev,
      availableDays: prev.availableDays.includes(day)
        ? prev.availableDays.filter(d => d !== day)
        : [...prev.availableDays, day]
    }));
  };

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      if (editingPlace) {
        // Fill form with existing place data
        setFormData({
          name: editingPlace.name,
          category: editingPlace.category,
          address: editingPlace.address,
          phone: editingPlace.phone,
          hours: editingPlace.hours,
          description: editingPlace.description,
          services: editingPlace.services,
          image: editingPlace.image,
          customCategory: editingPlace.customCategoryData,
          type: editingPlace.type || 'حجورات'
        });
        setUploadedImage(editingPlace.image);
        setSelectedServices(editingPlace.services);
      } else {
        // Reset form for new place
        setFormData({
          name: '',
          category: '',
          address: '',
          phone: '',
          hours: '',
          description: '',
          services: [],
          image: '',
          customCategory: undefined,
          type: 'حجورات'
        });
        setUploadedImage(null);
        setSelectedServices([]);
        setSelectedProducts([]);
        setCurrentProduct({ name: '', price: '', description: '' });
        setAppointmentSettings({
          sessionDuration: '30',
          consultationFee: '',
          availableDays: [],
          startTime: '09:00',
          endTime: '17:00',
          maxConcurrentBookings: '1'
        });
      }
      setShowCustomCategory(false);
      setCustomCategoryName('');
      setCustomCategoryIcon('🏢');
      setCurrentService('');
    }
  }, [isOpen, editingPlace, setUploadedImage]);

  const parseHours = (hours: string) => {
    if (!hours || !hours.includes(' - ')) {
      return { startTime: '09:00', endTime: '22:00' };
    }

    const [start, end] = hours.split(' - ');

    // Convert Arabic time format to 24-hour format
    const convertToTime24 = (timeStr: string) => {
      const cleanTime = timeStr.trim();

      // Handle Arabic format like "9:00 ص", "12:00 م", or "1:00 ظ"
      if (cleanTime.includes('ص') || cleanTime.includes('م') || cleanTime.includes('ظ')) {
        const isPM = cleanTime.includes('م') || cleanTime.includes('ظ');
        const timeOnly = cleanTime.replace(/[صمظ\s]/g, '');

        if (timeOnly.includes(':')) {
          let [hours, minutes] = timeOnly.split(':');
          let hour = parseInt(hours);

          // Convert to 24-hour format
          if (isPM && hour !== 12) {
            hour += 12;
          } else if (!isPM && hour === 12) {
            hour = 0;
          }

          return `${hour.toString().padStart(2, '0')}:${minutes.padStart(2, '0')}`;
        }
      }

      // If already in HH:MM format, return as is
      if (/^\d{1,2}:\d{2}$/.test(cleanTime)) {
        const [h, m] = cleanTime.split(':');
        return `${h.padStart(2, '0')}:${m}`;
      }

      // Default fallback
      return cleanTime.includes('ص') ? '09:00' : '22:00';
    };

    return {
      startTime: convertToTime24(start),
      endTime: convertToTime24(end)
    };
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setUploadedImage(result);
        setFormData(prev => ({ ...prev, image: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim()) {
      alert('اسم المكان مطلوب');
      return;
    }

    if (!formData.category) {
      alert('الفئة مطلوبة');
      return;
    }

    if (!formData.phone || formData.phone.length !== 11 || !/^[0-9]{11}$/.test(formData.phone)) {
      alert('يجب أن يكون رقم الهاتف صحيح (أرقام فقط)');
      return;
    }

    let finalFormData = { ...formData };

    // Use selectedServices instead of formData.services
    finalFormData.services = selectedServices;

    // Add products if type is طلبات
    if (formData.type === 'طلبات') {
      finalFormData.products = selectedProducts;
    }

    // Add appointment settings if type is حجورات
    if (formData.type === 'حجورات') {
      finalFormData.appointmentSettings = appointmentSettings;
    }

    // Handle custom category
    if (formData.category === 'other' && customCategoryName) {
      finalFormData.customCategory = {
        name: customCategoryName,
        icon: customCategoryIcon
      };
    }

    // Use uploaded image or default
    if (!finalFormData.image) {
      finalFormData.image = uploadedImage || 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400';
    }

    onSubmit(finalFormData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[95vh] overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 flex justify-between items-center">
          <div>
            <h3 className="text-2xl font-bold">
              {editingPlace ? 'تعديل الخدمة' : 'إضافة خدمة جديدة'}
            </h3>
            <p className="text-blue-100 mt-1">
              {editingPlace ? 'قم بتعديل بيانات الخدمة أدناه' : 'أضف خدمة جديدة لدليل الخدمات'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-full transition-all"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="max-h-[calc(95vh-120px)] overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* اسم المكان */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                اسم المكان *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              />
            </div>

            {/* الفئة */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                الفئة *
              </label>
              <select
                value={formData.category}
                onChange={(e) => {
                  setFormData({ ...formData, category: e.target.value });
                  setShowCustomCategory(e.target.value === 'other');
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              >
                <option value="">اختر الفئة</option>
                {Object.entries(categories).map(([key, category]) => (
                  <option key={key} value={key}>
                    {category.icon} {category.name}
                  </option>
                ))}
                <option value="other">أخرى (فئة جديدة)</option>
              </select>
            </div>

            {/* فئة مخصصة */}
            {showCustomCategory && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-3">إضافة فئة جديدة</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <input
                      type="text"
                      placeholder="اسم الفئة الجديدة"
                      value={customCategoryName}
                      onChange={(e) => setCustomCategoryName(e.target.value)}
                      className="w-full px-3 py-2 border border-blue-300 rounded-md"
                    />
                  </div>
                  <div>
                    <select
                      value={customCategoryIcon}
                      onChange={(e) => setCustomCategoryIcon(e.target.value)}
                      className="w-full px-3 py-2 border border-blue-300 rounded-md"
                    >
                      <option value="🏢">🏢 مبنى</option>
                      <option value="🎯">🎯 خدمة</option>
                      <option value="🔧">🔧 صيانة</option>
                      <option value="📚">📚 تعليم</option>
                      <option value="🎨">🎨 فن</option>
                      <option value="🏃">🏃 رياضة</option>
                      <option value="🛒">🛒 تسوق</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* النوع */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                النوع *
              </label>
              <select
                value={formData.type || 'حجورات'}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              >
                <option value="حجورات">حجورات</option>
                <option value="طلبات">طلبات</option>
              </select>
            </div>

            {/* العنوان */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                العنوان *
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              />
            </div>

            {/* رقم الهاتف */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                رقم الهاتف *
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 11);
                  setFormData({ ...formData, phone: value });
                }}
                pattern="[0-9]{11}"
                maxLength={11}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              />
            </div>

            {/* مواعيد العمل */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                مواعيد العمل
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">وقت الفتح</label>
                  <input
                    type="time"
                    value={parseHours(formData.hours).startTime}
                    onChange={(e) => {
                      const { endTime } = parseHours(formData.hours);
                      const hours = `${e.target.value} - ${endTime}`;
                      setFormData({ ...formData, hours });
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">وقت الإغلاق</label>
                  <input
                    type="time"
                    value={parseHours(formData.hours).endTime}
                    onChange={(e) => {
                      const { startTime } = parseHours(formData.hours);
                      const hours = `${startTime} - ${e.target.value}`;
                      setFormData({ ...formData, hours });
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>

            {/* الوصف */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                الوصف
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* الخدمات */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                الخدمات المتاحة
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={currentService}
                  onChange={(e) => setCurrentService(e.target.value)}
                  onKeyPress={handleServiceKeyPress}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="أضف خدمة جديدة..."
                />
                <button
                  type="button"
                  onClick={addService}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              {selectedServices.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedServices.map((service, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                    >
                      {service}
                      <button
                        type="button"
                        onClick={() => removeService(service)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* المنتجات - للمحلات فقط */}
            {formData.type === 'طلبات' && (
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  المنتجات المتاحة
                </label>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <input
                      type="text"
                      value={currentProduct.name}
                      onChange={(e) => setCurrentProduct({...currentProduct, name: e.target.value})}
                      className="px-3 py-2 border border-green-300 rounded-md"
                      placeholder="اسم المنتج"
                    />
                    <input
                      type="text"
                      value={currentProduct.price}
                      onChange={(e) => setCurrentProduct({...currentProduct, price: e.target.value})}
                      className="px-3 py-2 border border-green-300 rounded-md"
                      placeholder="السعر (جنيه)"
                    />
                    <input
                      type="text"
                      value={currentProduct.description}
                      onChange={(e) => setCurrentProduct({...currentProduct, description: e.target.value})}
                      className="px-3 py-2 border border-green-300 rounded-md"
                      placeholder="وصف المنتج (اختياري)"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={addProduct}
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
                  >
                    <Plus className="w-4 h-4 inline ml-2" />
                    إضافة منتج
                  </button>
                  {selectedProducts.length > 0 && (
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {selectedProducts.map((product, index) => (
                        <div key={index} className="bg-white p-3 rounded-md border border-green-300 flex justify-between items-start">
                          <div>
                            <h4 className="font-medium text-green-800">{product.name}</h4>
                            <p className="text-green-600 font-bold">{product.price} جنيه</p>
                            {product.description && <p className="text-sm text-gray-600">{product.description}</p>}
                          </div>
                          <button
                            type="button"
                            onClick={() => removeProduct(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* إعدادات المواعيد - للحجورات فقط */}
            {formData.type === 'حجورات' && (
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  إعدادات حجز المواعيد
                </label>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-blue-800 mb-2">
                        مدة الموعد (بالدقائق)
                      </label>
                      <select
                        value={appointmentSettings.sessionDuration}
                        onChange={(e) => setAppointmentSettings({...appointmentSettings, sessionDuration: e.target.value})}
                        className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="15">15 دقيقة</option>
                        <option value="30">30 دقيقة</option>
                        <option value="45">45 دقيقة</option>
                        <option value="60">60 دقيقة</option>
                        <option value="90">90 دقيقة</option>
                        <option value="120">120 دقيقة</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-blue-800 mb-2">
                        سعر الخدمة (جنيه)
                      </label>
                      <input
                        type="text"
                        value={appointmentSettings.consultationFee}
                        onChange={(e) => setAppointmentSettings({...appointmentSettings, consultationFee: e.target.value})}
                        className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="مثال: 200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-blue-800 mb-2">
                        عدد المواعيد المتاحة
                      </label>
                      <select
                        value={appointmentSettings.maxConcurrentBookings}
                        onChange={(e) => setAppointmentSettings({...appointmentSettings, maxConcurrentBookings: e.target.value})}
                        className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="1">موعد واحد</option>
                        <option value="2">موعدان</option>
                        <option value="3">3 مواعيد</option>
                        <option value="4">4 مواعيد</option>
                        <option value="5">5 مواعيد</option>
                        <option value="10">10 مواعيد</option>
                        <option value="15">15 موعد</option>
                        <option value="20">20 موعد</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-blue-800 mb-2">
                      الأيام المتاحة للحجز
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'].map((day) => (
                        <label key={day} className="flex items-center space-x-2 space-x-reverse">
                          <input
                            type="checkbox"
                            checked={appointmentSettings.availableDays.includes(day)}
                            onChange={() => toggleAvailableDay(day)}
                            className="rounded border-blue-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm text-blue-800">{day}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-blue-800 mb-2">
                        بداية العمل
                      </label>
                      <input
                        type="time"
                        value={appointmentSettings.startTime}
                        onChange={(e) => setAppointmentSettings({...appointmentSettings, startTime: e.target.value})}
                        className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-blue-800 mb-2">
                        نهاية العمل
                      </label>
                      <input
                        type="time"
                        value={appointmentSettings.endTime}
                        onChange={(e) => setAppointmentSettings({...appointmentSettings, endTime: e.target.value})}
                        className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* الصورة */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                صورة المكان
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                {uploadedImage ? (
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <img
                        src={uploadedImage}
                        alt="معاينة الصورة"
                        className="w-24 h-24 object-cover rounded-lg border-2 border-gray-200 shadow-sm"
                      />
                    </div>
                    <div className="flex-1 text-right">
                      <p className="text-green-600 font-medium">تم رفع الصورة بنجاح</p>
                      <button
                        type="button"
                        onClick={() => setUploadedImage(null)}
                        className="text-red-500 text-sm hover:underline mt-1"
                      >
                        إزالة الصورة
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">اختر صورة للمكان</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 cursor-pointer inline-block"
                    >
                      اختيار صورة
                    </label>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* أزرار التحكم */}
          <div className="border-t p-6 bg-gray-50 flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 font-medium transition-all"
            >
              {editingPlace ? 'تحديث الخدمة' : 'إضافة الخدمة'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-400 font-medium transition-all"
            >
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
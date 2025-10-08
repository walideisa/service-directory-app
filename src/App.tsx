import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, ThumbsUp, Phone, Clock, Filter, Heart, Settings, Plus, Edit2, Trash2, Save, X, Upload, Eye, EyeOff, ChevronRight, List, Folder, Info, MessageCircle, Send, Bot, User, Minimize2, Maximize2, Calendar, Minus } from 'lucide-react';
import { PlaceForm } from './components/PlaceForm';
import './App.css';

const App = () => {
  const places = [
    {
      id: 1,
      name: 'كارفور مول C3',
      category: 'mall',
      likes: 287,
      address: 'مول C3، المجاورة الثالثة، مدينة 15 مايو',
      phone: '16789',
      hours: '9:00 ص - 12:00 ص',
      image: 'https://images.unsplash.com/photo-1555529902-de4e0750ea48?w=400',
      services: ['مواقف مجانية', 'فروع كارفور', 'مطاعم ومقاهي', 'صراف آلي'],
      description: 'مول تجاري شامل يضم كارفور وعدد كبير من المحلات التجارية والمطاعم',
      isVisible: true
    },
    {
      id: 2,
      name: 'ميجا مول مدينة 15 مايو',
      category: 'mall',
      likes: 156,
      address: 'القطعة 22، المجاورة الثالثة، مركز المدينة',
      phone: '02-38951200',
      hours: '10:00 ص - 11:00 م',
      image: 'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=400',
      services: ['سينما', 'منطقة ألعاب أطفال', 'فود كورت', 'محلات الملابس'],
      description: 'مجمع تجاري متكامل يضم العديد من المتاجر ومنطقة ترفيهية',
      isVisible: true
    },
    {
      id: 3,
      name: 'مطعم باك باك',
      category: 'restaurant',
      likes: 178,
      address: 'المجاورة الثالثة، كمباوند وسط البلد',
      phone: '02-38951400',
      hours: '1:00 ظ - 12:00 ص',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400',
      services: ['دليفري', 'وجبات سريعة', 'تيك اواي', 'عروض عائلية'],
      description: 'مطعم متخصص في الوجبات السريعة والبرجر',
      isVisible: true
    },
    {
      id: 4,
      name: 'سوق 15 مايو الجديد',
      category: 'market',
      likes: 145,
      address: 'جنوب مدينة 15 مايو، بجوار الطريق الدائري',
      phone: '02-38951600',
      hours: '5:00 ص - 8:00 م',
      image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=400',
      services: ['خضار وفاكهة', 'أسماك طازجة', 'تجارة جملة', 'أسعار منافسة'],
      description: 'أكبر سوق جملة للخضراوات والفاكهة والأسماك جنوب القاهرة',
      isVisible: true
    },
    {
      id: 5,
      name: 'مستشفى 15 مايو العام',
      category: 'hospital',
      likes: 234,
      address: 'المجاورة الأولى، مدينة 15 مايو',
      phone: '02-38951700',
      hours: '24 ساعة',
      image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=400',
      services: ['طوارئ 24 ساعة', 'عيادات خارجية', 'معامل تحاليل', 'صيدلية'],
      description: 'المستشفى الحكومي الرئيسي بمدينة 15 مايو',
      isVisible: true
    },
    {
      id: 6,
      name: 'بنك الإسكندرية - فرع 15 مايو',
      category: 'bank',
      likes: 98,
      address: 'المجاورة الثالثة، حي رجال الأعمال',
      phone: '16247',
      hours: '8:30 ص - 3:30 م',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400',
      services: ['حسابات جارية', 'قروض', 'صراف آلي', 'تحويلات'],
      description: 'فرع البنك الرئيسي لخدمة سكان مدينة 15 مايو',
      isVisible: true
    },
    {
      id: 7,
      name: 'عيادة د. أحمد محمود - طب الأطفال',
      category: 'hospital',
      likes: 156,
      address: 'المجاورة الثانية، مدينة 15 مايو',
      phone: '01234567890',
      hours: '9:00 ص - 5:00 م',
      image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400',
      services: ['فحص الأطفال', 'التطعيمات', 'متابعة النمو', 'استشارات طبية'],
      description: 'عيادة متخصصة في طب الأطفال مع خدمة حجز المواعيد الإلكترونية',
      isVisible: true,
      type: 'حجورات',
      appointmentSettings: {
        sessionDuration: '30',
        consultationFee: '200',
        availableDays: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس'],
        startTime: '09:00',
        endTime: '17:00',
        maxConcurrentBookings: '1'
      }
    },
    {
      id: 8,
      name: 'صالون روز للسيدات',
      category: 'mall',
      likes: 89,
      address: 'المجاورة الأولى، مدينة 15 مايو',
      phone: '01098765432',
      hours: '10:00 ص - 8:00 م',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400',
      services: ['قص وتصفيف', 'صبغة', 'عناية بالشعر', 'مكياج'],
      description: 'صالون متخصص في تجميل السيدات مع إمكانية حجز المواعيد مسبقاً',
      isVisible: true,
      type: 'حجورات',
      appointmentSettings: {
        sessionDuration: '60',
        consultationFee: '150',
        availableDays: ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس'],
        startTime: '10:00',
        endTime: '20:00',
        maxConcurrentBookings: '3'
      }
    },
    {
      id: 9,
      name: 'كيدز لاند - منطقة ألعاب الأطفال',
      category: 'mall',
      likes: 178,
      address: 'المجاورة الثالثة، مدينة 15 مايو',
      phone: '01123456789',
      hours: '2:00 م - 10:00 م',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400',
      services: ['ألعاب تفاعلية', 'حفلات أطفال', 'ورش تعليمية', 'مراقبة مؤهلة'],
      description: 'منطقة ألعاب آمنة للأطفال مع إمكانية حجز جلسات لعب أو تنظيم حفلات',
      isVisible: true,
      type: 'حجورات',
      appointmentSettings: {
        sessionDuration: '90',
        consultationFee: '80',
        availableDays: ['الخميس', 'الجمعة', 'السبت', 'الأحد'],
        startTime: '14:00',
        endTime: '22:00',
        maxConcurrentBookings: '10'
      }
    }
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [likes, setLikes] = useState<{[key: number]: boolean}>({});
  const [selectedPlace, setSelectedPlace] = useState<any>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [currentView, setCurrentView] = useState('search');
  const [sortBy, setSortBy] = useState('name');
  const [managedPlaces, setManagedPlaces] = useState(places);
  const [editingPlace, setEditingPlace] = useState<any>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [editUploadedImage, setEditUploadedImage] = useState<string | null>(null);
  const [managedCategories, setManagedCategories] = useState({
    all: { name: 'الكل', icon: '🏪', isVisible: true },
    mall: { name: 'مولات', icon: '🛍️', isVisible: true },
    restaurant: { name: 'مطاعم', icon: '🍽️', isVisible: true },
    market: { name: 'أسواق', icon: '🛒', isVisible: true },
    hospital: { name: 'مستشفيات', icon: '🏥', isVisible: true },
    bank: { name: 'بنوك', icon: '🏦', isVisible: true }
  });
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [settingsView, setSettingsView] = useState('main');
  const [serviceFilterCategory, setServiceFilterCategory] = useState('all');
  const [serviceFilterStatus, setServiceFilterStatus] = useState('all');
  const [serviceSearchTerm, setServiceSearchTerm] = useState('');
  const [showServiceFilters, setShowServiceFilters] = useState(false);
  const [categorySearchTerm, setCategorySearchTerm] = useState('');
  const [showSubmissionSuccess, setShowSubmissionSuccess] = useState(false);
  const [currentService, setCurrentService] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [showCustomCategory, setShowCustomCategory] = useState(false);
  const [customCategoryName, setCustomCategoryName] = useState('');
  const [selectedServiceType, setSelectedServiceType] = useState('حجورات');
  const [currentProduct, setCurrentProduct] = useState({ name: '', price: '', description: '' });
  const [selectedProducts, setSelectedProducts] = useState<Array<{name: string, price: string, description: string}>>([]);

  // Appointments management (for حجورات type)
  const [appointmentSettings, setAppointmentSettings] = useState({
    sessionDuration: '30', // minutes
    consultationFee: '',
    availableDays: [] as string[],
    startTime: '09:00',
    endTime: '17:00',
    maxConcurrentBookings: '1' // number of bookings allowed at the same time
  });
  const [showEditCustomCategory, setShowEditCustomCategory] = useState(false);
  const [editCustomCategoryName, setEditCustomCategoryName] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{id: number, text: string, isBot: boolean, timestamp: Date}>>([
    {
      id: 1,
      text: 'مرحباً! أنا مساعدك الذكي في دليل خدمات مدينة 15 مايو. كيف يمكنني مساعدتك اليوم؟',
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Appointment booking states
  const [showAppointmentBooking, setShowAppointmentBooking] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [appointmentForm, setAppointmentForm] = useState({
    patientName: '',
    patientPhone: '',
    patientAge: '',
    appointmentReason: ''
  });
  const [selectedAppointments, setSelectedAppointments] = useState<Array<{date: string, timeSlot: string}>>([]);
  const [showMultipleBookings, setShowMultipleBookings] = useState(false);
  const [isChatMinimized, setIsChatMinimized] = useState(false);
  const chatMessagesRef = useRef<HTMLDivElement>(null);

  const categories = managedCategories;

  const filteredPlaces = managedPlaces.filter(place => {
    const matchesSearch = place.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || place.category === selectedCategory;
    const isVisible = place.isVisible !== false;
    return matchesSearch && matchesCategory && isVisible;
  }).sort((a, b) => {
    if (sortBy === 'likes') return (b.likes + (likes[b.id] ? 1 : 0)) - (a.likes + (likes[a.id] ? 1 : 0));
    return a.name.localeCompare(b.name);
  });

  const favoritesList = managedPlaces.filter(place => favorites.includes(place.id) && place.isVisible !== false);

  const toggleFavorite = (placeId: number) => {
    setFavorites(prev =>
      prev.includes(placeId)
        ? prev.filter(id => id !== placeId)
        : [...prev, placeId]
    );
  };

  const toggleLike = (placeId: number) => {
    setLikes(prev => ({
      ...prev,
      [placeId]: !prev[placeId]
    }));
  };


  const handleDeletePlace = (placeId: number) => {
    if (window.confirm('هل أنت متأكد من حذف هذه الخدمة؟')) {
      setManagedPlaces(prev => prev.filter(p => p.id !== placeId));
    }
  };

  const handleEditPlace = (place: any) => {
    setEditingPlace({...place});
    setShowAddForm(true);
  };

  const handleSaveEdit = () => {
    if (!editingPlace.phone || editingPlace.phone.length !== 11 || !/^[0-9]{11}$/.test(editingPlace.phone)) {
      alert('يجب أن يكون رقم الهاتف 11 رقم بالضبط (أرقام فقط)');
      return;
    }

    let finalEditingPlace = {...editingPlace};

    // إذا تم اختيار فئة جديدة
    if (editingPlace.category === 'other' && editCustomCategoryName) {
      const categoryKey = editCustomCategoryName.toLowerCase().replace(/\s+/g, '_').replace(/[^\w_]/g, '');

      // إضافة الفئة الجديدة
      setManagedCategories(prev => ({
        ...prev,
        [categoryKey]: {
          name: editCustomCategoryName,
          icon: '🏪',
          isVisible: true
        }
      }));

      finalEditingPlace.category = categoryKey;
      alert(`تم تحديث الخدمة وإضافة فئة "${editCustomCategoryName}" الجديدة`);
    }

    setManagedPlaces(prev => prev.map(p =>
      p.id === editingPlace.id ? finalEditingPlace : p
    ));
    setEditingPlace(null);
    setShowEditCustomCategory(false);
    setEditCustomCategoryName('');
  };

  const handleFormSubmit = (formData: any) => {
    if (editingPlace) {
      // تحديث خدمة موجودة
      setManagedPlaces(prev => prev.map(p =>
        p.id === editingPlace.id ? { ...p, ...formData } : p
      ));
    } else {
      // إضافة خدمة جديدة
      const newId = Math.max(...managedPlaces.map(p => p.id)) + 1;
      setManagedPlaces(prev => [...prev, { ...formData, id: newId, likes: 0, isVisible: true }]);
    }

    // إعادة تعيين النموذج
    setShowAddForm(false);
    setEditingPlace(null);
    setUploadedImage(null);
  };

  const handleFormClose = () => {
    setShowAddForm(false);
    setEditingPlace(null);
    setUploadedImage(null);
  };

  const addService = () => {
    if (currentService.trim() && !selectedServices.includes(currentService.trim())) {
      setSelectedServices([...selectedServices, currentService.trim()]);
      setCurrentService('');
    }
  };

  const removeService = (serviceToRemove: string) => {
    setSelectedServices(selectedServices.filter(service => service !== serviceToRemove));
  };

  const addProduct = () => {
    if (currentProduct.name.trim() && currentProduct.price.trim()) {
      setSelectedProducts([...selectedProducts, { ...currentProduct }]);
      setCurrentProduct({ name: '', price: '', description: '' });
    }
  };

  const removeProduct = (index: number) => {
    setSelectedProducts(selectedProducts.filter((_, i) => i !== index));
  };

  // Appointments functions
  const toggleAvailableDay = (day: string) => {
    setAppointmentSettings(prev => ({
      ...prev,
      availableDays: prev.availableDays.includes(day)
        ? prev.availableDays.filter(d => d !== day)
        : [...prev.availableDays, day]
    }));
  };

  const generateTimeSlots = (appointmentSettings: any) => {
    if (!appointmentSettings) return [];

    const { startTime, endTime, sessionDuration } = appointmentSettings;
    const slots = [];
    const start = new Date(`2024-01-01 ${startTime}`);
    const end = new Date(`2024-01-01 ${endTime}`);
    const durationMs = parseInt(sessionDuration) * 60 * 1000;

    let current = new Date(start);
    while (current < end) {
      const timeString = current.toLocaleTimeString('ar-EG', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });
      slots.push(timeString);
      current = new Date(current.getTime() + durationMs);
    }

    return slots;
  };

  const getNextAvailableDates = (appointmentSettings: any) => {
    if (!appointmentSettings || !appointmentSettings.availableDays.length) return [];

    const dates = [];
    const today = new Date();
    const dayNames = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];

    for (let i = 1; i <= 14; i++) { // Next 14 days
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dayName = dayNames[date.getDay()];

      if (appointmentSettings.availableDays.includes(dayName)) {
        dates.push({
          date: date.toISOString().split('T')[0],
          dayName: dayName,
          displayDate: date.toLocaleDateString('ar-EG')
        });
      }
    }

    return dates.slice(0, 7); // Show next 7 available dates
  };

  // Multiple appointments functions
  const addAppointmentToList = () => {
    if (!selectedDate || !selectedTimeSlot) {
      alert('يرجى اختيار التاريخ والوقت أولاً');
      return;
    }

    // Check if this appointment already exists
    const exists = selectedAppointments.some(
      app => app.date === selectedDate && app.timeSlot === selectedTimeSlot
    );

    if (exists) {
      alert('هذا الموعد مضاف بالفعل');
      return;
    }

    setSelectedAppointments(prev => [...prev, { date: selectedDate, timeSlot: selectedTimeSlot }]);
    setSelectedDate('');
    setSelectedTimeSlot('');
  };

  const removeAppointmentFromList = (index: number) => {
    setSelectedAppointments(prev => prev.filter((_, i) => i !== index));
  };

  const handleAppointmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if using multiple bookings or single booking
    const appointmentsToBook = showMultipleBookings ? selectedAppointments :
      (selectedDate && selectedTimeSlot ? [{ date: selectedDate, timeSlot: selectedTimeSlot }] : []);

    if (appointmentsToBook.length === 0) {
      alert('يرجى اختيار موعد واحد على الأقل');
      return;
    }

    if (!appointmentForm.patientName || !appointmentForm.patientPhone) {
      alert('يرجى إدخال الاسم ورقم الهاتف');
      return;
    }

    if (appointmentForm.patientPhone.length !== 11) {
      alert('يجب أن يكون رقم الهاتف 11 رقم');
      return;
    }

    // Create appointment summary
    const appointmentsList = appointmentsToBook.map(app =>
      `📅 ${new Date(app.date).toLocaleDateString('ar-EG')} - ⏰ ${app.timeSlot}`
    ).join('\n');

    const totalCost = appointmentsToBook.length * parseInt(selectedPlace?.appointmentSettings?.consultationFee || '0');

    // Here you would typically save the appointments to a database
    alert(`تم حجز ${appointmentsToBook.length} موعد بنجاح!

${appointmentsList}

👤 الاسم: ${appointmentForm.patientName}
📞 الهاتف: ${appointmentForm.patientPhone}
💰 إجمالي التكلفة: ${totalCost} جنيه

سيتم التواصل معك لتأكيد المواعيد`);

    // Reset form
    setShowAppointmentBooking(false);
    setShowMultipleBookings(false);
    setSelectedDate('');
    setSelectedTimeSlot('');
    setSelectedAppointments([]);
    setAppointmentForm({
      patientName: '',
      patientPhone: '',
      patientAge: '',
      appointmentReason: ''
    });
  };

  const handleServiceKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addService();
    }
  };

  const handleSubmitServiceForReview = (newPlace: any) => {
    const newId = Math.max(...managedPlaces.map(p => p.id)) + 1;
    setManagedPlaces(prev => [...prev, {
      ...newPlace,
      id: newId,
      likes: 0,
      isVisible: false,
      isPending: true,
      submittedAt: new Date().toISOString()
    }]);
    setCurrentView('search');
    setUploadedImage(null);
    setShowSubmissionSuccess(true);
    setTimeout(() => setShowSubmissionSuccess(false), 5000);
  };

  const sendSMSNotification = (phoneNumber: string, serviceName: string) => {
    // محاكاة إرسال SMS
    console.log(`SMS sent to ${phoneNumber}: تم نشر خدمة "${serviceName}" بنجاح في دليل خدمات مدينة 15 مايو`);

    // في التطبيق الحقيقي، هنا سنستخدم خدمة SMS API مثل Twilio أو أي خدمة أخرى
    // مثال:
    // fetch('/api/send-sms', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     to: phoneNumber,
    //     message: `تم نشر خدمة "${serviceName}" بنجاح في دليل خدمات مدينة 15 مايو`
    //   })
    // });
  };

  const toggleVisibility = (placeId: number) => {
    setManagedPlaces(prev => prev.map(p =>
      p.id === placeId ? { ...p, isVisible: !p.isVisible } : p
    ));
  };

  const handleAddCategory = (categoryData: any) => {
    const categoryKey = categoryData.key.toLowerCase().replace(/\s+/g, '_');
    setManagedCategories(prev => ({
      ...prev,
      [categoryKey]: { name: categoryData.name, icon: categoryData.icon, isVisible: true }
    }));
    setShowCategoryForm(false);
  };

  const handleEditCategory = (key: string) => {
    if (key === 'all') {
      alert('لا يمكن تعديل فئة "الكل"');
      return;
    }
    setEditingCategory({ key, ...managedCategories[key] });
  };

  const handleSaveCategoryEdit = () => {
    setManagedCategories(prev => ({
      ...prev,
      [editingCategory.key]: {
        name: editingCategory.name,
        icon: editingCategory.icon,
        isVisible: prev[editingCategory.key].isVisible
      }
    }));
    setEditingCategory(null);
  };

  const handleDeleteCategory = (key: string) => {
    if (key === 'all') {
      alert('لا يمكن حذف فئة "الكل"');
      return;
    }

    const hasPlaces = managedPlaces.some(p => p.category === key);
    if (hasPlaces) {
      alert('لا يمكن حذف هذه الفئة لأنها تحتوي على خدمات.');
      return;
    }

    if (window.confirm('هل أنت متأكد من حذف هذه الفئة؟')) {
      const newCategories = { ...managedCategories };
      delete newCategories[key];
      setManagedCategories(newCategories);
      if (selectedCategory === key) {
        setSelectedCategory('all');
      }
    }
  };

  const toggleCategoryVisibility = (key: string) => {
    if (key === 'all') {
      alert('لا يمكن إخفاء فئة "الكل"');
      return;
    }

    setManagedCategories(prev => ({
      ...prev,
      [key]: { ...prev[key], isVisible: !prev[key].isVisible }
    }));
  };

  const parseHours = (hours: string) => {
    if (!hours || !hours.includes(' - ')) {
      return { startTime: '', endTime: '' };
    }
    const [startTime, endTime] = hours.split(' - ');
    return { startTime: startTime.trim(), endTime: endTime.trim() };
  };

  const handleImageUpload = (e: any, isEdit = false) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (isEdit) {
          setEditUploadedImage(reader.result as string);
          setEditingPlace({...editingPlace, image: reader.result});
        } else {
          setUploadedImage(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const getClaudeAIResponse = async (userMessage: string): Promise<string> => {
    try {
      // نصوص ومحتوى خاص بالبيانات المحلية
      const localContext = `
أنت مساعد ذكي لدليل خدمات مدينة 15 مايو في مصر. لديك معلومات عن الخدمات التالية:

المولات:
- كارفور مول C3: مول C3، المجاورة الثالثة، مدينة 15 مايو، هاتف: 16789، الساعات: 9:00 ص - 12:00 ص
- ميجا مول مدينة 15 مايو: القطعة 22، المجاورة الثالثة، مركز المدينة، هاتف: 02-38951200، الساعات: 10:00 ص - 11:00 م

المطاعم:
- مطعم باك باك: المجاورة الثالثة، كمباوند وسط البلد، هاتف: 02-38951400، الساعات: 1:00 ظ - 12:00 ص

الأسواق:
- سوق 15 مايو الجديد: جنوب مدينة 15 مايو، بجوار الطريق الدائري، هاتف: 02-38951600، الساعات: 5:00 ص - 8:00 م

المستشفيات:
- مستشفى 15 مايو العام: المجاورة الأولى، مدينة 15 مايو، هاتف: 02-38951700، ساعات: 24 ساعة

البنوك:
- بنك الإسكندرية - فرع 15 مايو: المجاورة الثالثة، حي رجال الأعمال، هاتف: 16247، الساعات: 8:30 ص - 3:30 م

استخدم هذه المعلومات للإجابة على أسئلة المستخدمين بطريقة مفيدة ودقيقة. إذا سأل المستخدم عن خدمة غير موجودة في القائمة، أعلمه بأنها غير متوفرة حالياً في قاعدة البيانات.
`;

      // محاكاة Claude AI مع الذكاء المحلي المحسن
      const message = userMessage.toLowerCase();

      // البحث الذكي عن الخدمات
      if (message.includes('بحث') || message.includes('ابحث') || message.includes('أين') || message.includes('فين')) {
        const searchTerms = message.split(' ');
        const matchingPlaces = managedPlaces.filter(place =>
          searchTerms.some(term =>
            place.name.toLowerCase().includes(term) ||
            place.description.toLowerCase().includes(term) ||
            place.address.toLowerCase().includes(term) ||
            place.services.some(service => service.toLowerCase().includes(term))
          )
        );

        if (matchingPlaces.length > 0) {
          const place = matchingPlaces[0];
          return `🏢 وجدت "${place.name}"
📍 العنوان: ${place.address}
📞 الهاتف: [اضغط للاتصال](tel:${place.phone.replace(/[\s-]/g, '')}) ${place.phone}
⏰ ساعات العمل: ${place.hours}
✨ الخدمات: ${place.services.slice(0, 3).join('، ')}

هل تريد معلومات أكثر عن هذا المكان؟`;
        } else {
          return 'عذراً، لم أجد ما تبحث عنه. جرب البحث بكلمات أخرى أو اسأل عن الخدمات المتاحة: المولات، المطاعم، المستشفيات، البنوك، أو الأسواق.';
        }
      }

      // معلومات مفصلة عن الفئات
      if (message.includes('مول') || message.includes('تسوق') || message.includes('شراء')) {
        const malls = managedPlaces.filter(p => p.category === 'mall' && p.isVisible !== false);
        return `🛍️ المولات المتاحة في مدينة 15 مايو (${malls.length} مول):

${malls.map(mall => `• ${mall.name}
   📍 ${mall.address}
   📞 [اتصل الآن](tel:${mall.phone.replace(/[\s-]/g, '')}) ${mall.phone}`).join('\n\n')}

هل تريد تفاصيل أكثر عن مول معين؟`;
      }

      // البحث في جميع الفئات (بما في ذلك الفئات الجديدة)
      const allCategories = Object.keys(managedCategories).filter(key => key !== 'all');
      for (const categoryKey of allCategories) {
        const category = managedCategories[categoryKey];
        if (message.includes(category.name.toLowerCase())) {
          const places = managedPlaces.filter(p => p.category === categoryKey && p.isVisible !== false);
          return `${category.icon} ${category.name} المتاحة في مدينة 15 مايو (${places.length} خدمة):

${places.map(place => `• ${place.name}
   📍 ${place.address}
   📞 [اتصل الآن](tel:${place.phone.replace(/[\s-]/g, '')}) ${place.phone}`).join('\n\n')}

هل تريد تفاصيل أكثر عن أي منها؟`;
        }
      }

      if (message.includes('مطعم') || message.includes('أكل') || message.includes('طعام')) {
        const restaurants = managedPlaces.filter(p => p.category === 'restaurant');
        return `🍽️ المطاعم المتاحة في مدينة 15 مايو (${restaurants.length} مطعم):

${restaurants.map(restaurant => `• ${restaurant.name}
   📍 ${restaurant.address}
   📞 [اتصل للطلب](tel:${restaurant.phone.replace(/[\s-]/g, '')}) ${restaurant.phone}
   ⏰ ${restaurant.hours}`).join('\n\n')}

أي مطعم يهمك أكثر؟`;
      }

      if (message.includes('مستشفى') || message.includes('طبيب') || message.includes('علاج') || message.includes('صحة')) {
        const hospitals = managedPlaces.filter(p => p.category === 'hospital');
        return `🏥 المستشفيات المتاحة في مدينة 15 مايو (${hospitals.length} مستشفى):

${hospitals.map(hospital => `• ${hospital.name}
   📍 ${hospital.address}
   📞 [اتصل فوراً](tel:${hospital.phone.replace(/[\s-]/g, '')}) ${hospital.phone}
   ⏰ ${hospital.hours}
   🩺 الخدمات: ${hospital.services.join('، ')}`).join('\n\n')}

هل تحتاج معلومات عن خدمة طبية معينة؟`;
      }

      if (message.includes('بنك') || message.includes('صراف') || message.includes('فلوس') || message.includes('حساب')) {
        const banks = managedPlaces.filter(p => p.category === 'bank');
        return `🏦 البنوك المتاحة في مدينة 15 مايو (${banks.length} بنك):

${banks.map(bank => `• ${bank.name}
   📍 ${bank.address}
   📞 [اتصل بالفرع](tel:${bank.phone.replace(/[\s-]/g, '')}) ${bank.phone}
   ⏰ ${bank.hours}
   💳 الخدمات: ${bank.services.join('، ')}`).join('\n\n')}

أي خدمة مصرفية تحتاجها؟`;
      }

      if (message.includes('سوق') || message.includes('خضار') || message.includes('فاكهة') || message.includes('سمك')) {
        const markets = managedPlaces.filter(p => p.category === 'market');
        return `🛒 الأسواق المتاحة في مدينة 15 مايو (${markets.length} سوق):

${markets.map(market => `• ${market.name}
   📍 ${market.address}
   📞 [اتصل بالسوق](tel:${market.phone.replace(/[\s-]/g, '')}) ${market.phone}
   ⏰ ${market.hours}
   🥬 المتوفر: ${market.services.join('، ')}`).join('\n\n')}

هل تبحث عن منتج معين؟`;
      }

      // ردود ذكية على الاستفسارات العامة
      if (message.includes('مساعدة') || message.includes('ساعدني') || message.includes('help')) {
        return `🤖 أهلاً! أنا مساعدك الذكي في دليل خدمات مدينة 15 مايو

يمكنني مساعدتك في:
🔍 البحث عن الخدمات والأماكن
📍 معرفة العناوين وأرقام الهواتف
⏰ معرفة ساعات العمل
🗺️ الحصول على الاتجاهات

جرب أن تسأل:
• "أين أقرب مطعم؟"
• "أريد معلومات عن المولات"
• "ابحث عن مستشفى"
• "أين يوجد بنك؟"`;
      }

      if (message.includes('شكرا') || message.includes('شكراً') || message.includes('thanks')) {
        return '😊 العفو! سعيد جداً لمساعدتك. إذا احتجت أي معلومات أخرى عن خدمات مدينة 15 مايو، أنا هنا دائماً!';
      }

      if (message.includes('وقت') || message.includes('ساعة') || message.includes('متى')) {
        return `🕐 معلومات أوقات العمل:

🛍️ المولات: عادة من 9-10 صباحاً حتى 11-12 منتصف الليل
🍽️ المطاعم: أوقات متنوعة، أغلبها من الظهر حتى منتصف الليل
🏥 المستشفيات: 24 ساعة (الطوارئ)
🏦 البنوك: من 8:30 صباحاً حتى 3:30 عصراً
🛒 الأسواق: من الفجر (5 ص) حتى المساء (8 م)

أي مكان محدد تريد معرفة أوقات عمله؟`;
      }

      // الرد الافتراضي الذكي
      return `🤔 لم أفهم طلبك تماماً، لكن يمكنني مساعدتك!

جرب أن تسأل بطريقة أخرى، مثل:
• "أين يوجد [اسم المكان]؟"
• "أريد معلومات عن [نوع الخدمة]"
• "ابحث عن [ما تحتاجه]"

أو اختر من الخدمات المتاحة: المولات، المطاعم، المستشفيات، البنوك، الأسواق`;

    } catch (error) {
      return 'عذراً، حدث خطأ تقني. الرجاء المحاولة مرة أخرى.';
    }
  };

  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;

    const userMessageText = chatInput;
    const newMessage = {
      id: chatMessages.length + 1,
      text: userMessageText,
      isBot: false,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, newMessage]);
    setChatInput('');
    setIsTyping(true);

    try {
      // الحصول على رد ذكي من AI
      const response = await getClaudeAIResponse(userMessageText);

      // تأخير واقعي للرد
      setTimeout(() => {
        const botResponse = {
          id: chatMessages.length + 2,
          text: response,
          isBot: true,
          timestamp: new Date()
        };
        setChatMessages(prev => [...prev, botResponse]);
        setIsTyping(false);
      }, 1000 + Math.random() * 1500);
    } catch (error) {
      setTimeout(() => {
        const errorResponse = {
          id: chatMessages.length + 2,
          text: 'عذراً، حدث خطأ في الاتصال. الرجاء المحاولة مرة أخرى.',
          isBot: true,
          timestamp: new Date()
        };
        setChatMessages(prev => [...prev, errorResponse]);
        setIsTyping(false);
      }, 1000);
    }
  };

  // التمرير التلقائي للأسفل عند إضافة رسائل جديدة
  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [chatMessages, isTyping]);

  // تحويل النص إلى روابط قابلة للنقر
  const renderMessageWithLinks = (text: string) => {
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(text)) !== null) {
      // إضافة النص قبل الرابط
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index));
      }

      // إضافة الرابط
      const linkText = match[1];
      const linkUrl = match[2];
      parts.push(
        <a
          key={match.index}
          href={linkUrl}
          className="text-blue-600 underline hover:text-blue-800 font-medium"
          onClick={(e) => {
            e.preventDefault();
            window.location.href = linkUrl;
          }}
        >
          {linkText}
        </a>
      );

      lastIndex = linkRegex.lastIndex;
    }

    // إضافة النص المتبقي
    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }

    return parts.length > 0 ? parts : text;
  };

  const PlaceCard = ({ place }: { place: any }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <img
          src={place.image}
          alt={place.name}
          className="w-full h-48 object-cover"
        />
        <button
          onClick={() => toggleFavorite(place.id)}
          className="absolute top-2 right-2 p-2 rounded-full bg-white shadow-md hover:bg-red-50"
        >
          <Heart
            className={`w-5 h-5 ${
              favorites.includes(place.id)
                ? 'text-red-500 fill-current'
                : 'text-gray-400'
            }`}
          />
        </button>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800">{place.name}</h3>
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
            {categories[place.category]?.name}
          </span>
        </div>

        <div className="flex items-center mb-2">
          <button
            onClick={() => toggleLike(place.id)}
            className="flex items-center gap-1 hover:bg-gray-100 p-1 rounded"
          >
            <ThumbsUp
              className={`w-4 h-4 ${
                likes[place.id] ? 'text-blue-500 fill-current' : 'text-gray-400'
              }`}
            />
            <span className="text-sm text-gray-600">
              {place.likes + (likes[place.id] ? 1 : 0)}
            </span>
          </button>
        </div>

        <div className="flex items-start mb-2">
          <MapPin className="w-4 h-4 text-gray-500 mt-0.5 ml-1" />
          <p className="text-sm text-gray-600">{place.address}</p>
        </div>

        <div className="flex items-center mb-3">
          <Clock className="w-4 h-4 text-gray-500 ml-1" />
          <p className="text-sm text-gray-600">{place.hours}</p>
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {place.services.slice(0, 2).map((service: string, index: number) => (
            <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
              {service}
            </span>
          ))}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => {
              setSelectedPlace(place);
              setShowDetails(true);
            }}
            className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600"
          >
            عرض التفاصيل
          </button>
          <a
            href={`tel:${place.phone.replace(/[\s-]/g, '')}`}
            onClick={(e) => e.stopPropagation()}
            className="bg-green-500 text-white px-4 py-2 rounded-md text-sm hover:bg-green-600 flex items-center justify-center"
          >
            <Phone className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-2">دليل خدمات مدينة 15 مايو الشامل</h1>
          <p className="text-blue-100 text-sm mb-4">اكتشف جميع الخدمات والأماكن المهمة في مدينتك بسهولة</p>

          <div className="relative mb-4">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="ابحث عن خدمة أو مكان..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-10 pl-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
            />
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-4 pb-20">
        {currentView === 'search' && (
          <>
            <div className="mb-6 overflow-x-auto">
              <div className="flex gap-2 pb-2">
                {Object.entries(categories).filter(([key, category]) =>
                  key === 'all' || category.isVisible !== false
                ).map(([key, category]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedCategory(key)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                      selectedCategory === key
                        ? 'bg-blue-500 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span>{category.icon}</span>
                    <span className="text-sm">{category.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4 text-gray-600">
              <p>عدد النتائج المتطابقة مع البحث: {filteredPlaces.length} من إجمالي {managedPlaces.filter(p => p.isVisible !== false).length} خدمة متاحة</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPlaces.map(place => (
                <PlaceCard key={place.id} place={place} />
              ))}
            </div>
          </>
        )}

        {currentView === 'favorites' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-4">الأماكن والخدمات المفضلة لديك</h2>
            {favoritesList.length === 0 ? (
              <div className="text-center py-12">
                <Heart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">لا توجد أماكن مفضلة حتى الآن</h3>
                <p className="text-gray-500">أضف الأماكن والخدمات التي تعجبك إلى قائمة المفضلات لسهولة الوصول إليها لاحقاً</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoritesList.map(place => (
                  <PlaceCard key={place.id} place={place} />
                ))}
              </div>
            )}
          </div>
        )}


        {currentView === 'settings' && settingsView === 'main' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-6">إعدادات وإدارة النظام</h2>

            <div className="space-y-3">
              <button
                onClick={() => setSettingsView('categories')}
                className="w-full bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <Folder className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="text-right">
                    <h3 className="font-semibold text-lg">إدارة فئات الخدمات</h3>
                    <p className="text-sm text-gray-500">
                      إضافة وتعديل وحذف فئات الخدمات المختلفة (إجمالي {Object.keys(managedCategories).length - 1} فئة نشطة)
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-6 h-6 text-gray-400" />
              </button>

              <button
                onClick={() => setSettingsView('services')}
                className="w-full bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <List className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-right">
                    <h3 className="font-semibold text-lg">إدارة قاعدة بيانات الخدمات</h3>
                    <p className="text-sm text-gray-500">
                      إضافة وتعديل وحذف ومراجعة جميع الخدمات والأماكن (إجمالي {managedPlaces.length} خدمة مسجلة)
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-6 h-6 text-gray-400" />
              </button>

              <button
                onClick={() => setSettingsView('about')}
                className="w-full bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <Info className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="text-right">
                    <h3 className="font-semibold text-lg">معلومات تفصيلية عن النظام</h3>
                    <p className="text-sm text-gray-500">
                      عرض معلومات التطبيق والإصدار الحالي والميزات المتاحة
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-6 h-6 text-gray-400" />
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mt-6">
              <h3 className="text-xl font-semibold mb-4">إحصائيات شاملة للنظام</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <div className="text-3xl font-bold text-blue-600">{managedPlaces.length}</div>
                  <div className="text-sm text-gray-600 mt-1">إجمالي الخدمات المسجلة</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <div className="text-3xl font-bold text-green-600">{managedPlaces.filter(p => p.isVisible !== false).length}</div>
                  <div className="text-sm text-gray-600 mt-1">خدمات نشطة ومتاحة</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg text-center">
                  <div className="text-3xl font-bold text-purple-600">{Object.keys(managedCategories).length - 1}</div>
                  <div className="text-sm text-gray-600 mt-1">فئات الخدمات المتاحة</div>
                </div>
                <div className="bg-red-50 p-4 rounded-lg text-center">
                  <div className="text-3xl font-bold text-red-600">{favorites.length}</div>
                  <div className="text-sm text-gray-600 mt-1">الأماكن المفضلة</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentView === 'settings' && settingsView === 'categories' && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <button
                onClick={() => setSettingsView('main')}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                ← رجوع
              </button>
              <h2 className="text-2xl font-bold">إدارة الفئات</h2>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="البحث في الفئات..."
                    value={categorySearchTerm}
                    onChange={(e) => setCategorySearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <button
                  onClick={() => setShowCategoryForm(true)}
                  className="bg-purple-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-purple-600"
                >
                  <Plus className="w-5 h-5" />
                  إضافة فئة جديدة
                </button>
              </div>

              <div className="mb-4 text-sm text-gray-600">
                عرض {Object.entries(managedCategories).filter(([key, category]) => {
                  if (key === 'all') return false;
                  return category.name.toLowerCase().includes(categorySearchTerm.toLowerCase()) ||
                         key.toLowerCase().includes(categorySearchTerm.toLowerCase());
                }).length} من {Object.keys(managedCategories).length - 1} فئة
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {Object.entries(managedCategories).filter(([key, category]) => {
                  if (key === 'all') return false;
                  if (!categorySearchTerm) return true;
                  return category.name.toLowerCase().includes(categorySearchTerm.toLowerCase()) ||
                         key.toLowerCase().includes(categorySearchTerm.toLowerCase());
                }).map(([key, category]) => (
                  <div key={key} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{category.icon}</span>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold">{category.name}</h4>
                            {category.isVisible === false && (
                              <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                                مخفية
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-500">
                            {key === 'all' ? 'جميع الفئات' : `${managedPlaces.filter(p => p.category === key).length} خدمة`}
                          </p>
                        </div>
                      </div>
                      {key !== 'all' && (
                        <div className="flex gap-1">
                          <button
                            onClick={() => toggleCategoryVisibility(key)}
                            className={`p-1 rounded ${
                              category.isVisible === false
                                ? 'text-green-600 hover:text-green-800'
                                : 'text-gray-600 hover:text-gray-800'
                            }`}
                            title={category.isVisible === false ? 'إظهار' : 'إخفاء'}
                          >
                            {category.isVisible === false ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                          </button>
                          <button
                            onClick={() => handleEditCategory(key)}
                            className="text-blue-600 hover:text-blue-800 p-1"
                            title="تعديل"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteCategory(key)}
                            className="text-red-600 hover:text-red-800 p-1"
                            title="حذف"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {categorySearchTerm && Object.entries(managedCategories).filter(([key, category]) => {
                if (key === 'all') return false;
                return category.name.toLowerCase().includes(categorySearchTerm.toLowerCase()) ||
                       key.toLowerCase().includes(categorySearchTerm.toLowerCase());
              }).length === 0 && (
                <div className="text-center py-8">
                  <div className="text-gray-400 mb-2">
                    <Search className="w-12 h-12 mx-auto" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-1">لا توجد نتائج</h3>
                  <p className="text-gray-500">لم يتم العثور على فئات تتطابق مع البحث "{categorySearchTerm}"</p>
                </div>
              )}

              <div className="mt-4 text-sm text-gray-600">
                إجمالي الفئات: {Object.keys(managedCategories).length - 1}
              </div>
            </div>
          </div>
        )}

        {currentView === 'settings' && settingsView === 'services' && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <button
                onClick={() => setSettingsView('main')}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                ← رجوع
              </button>
              <h2 className="text-2xl font-bold">إدارة الخدمات</h2>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="البحث في الخدمات..."
                    value={serviceSearchTerm}
                    onChange={(e) => setServiceSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex gap-2">
                  <select
                    value={serviceFilterCategory}
                    onChange={(e) => setServiceFilterCategory(e.target.value)}
                    className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">جميع الفئات</option>
                    {Object.entries(managedCategories).filter(([key]) => key !== 'all').map(([key, category]) => (
                      <option key={key} value={key}>{category.name}</option>
                    ))}
                  </select>
                  <select
                    value={serviceFilterStatus}
                    onChange={(e) => setServiceFilterStatus(e.target.value)}
                    className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">جميع الحالات</option>
                    <option value="visible">ظاهرة</option>
                    <option value="hidden">مخفية</option>
                    <option value="pending">قيد المراجعة</option>
                  </select>
                  <button
                    onClick={() => {
                      setEditingPlace(null);
                      setShowAddForm(true);
                    }}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600"
                  >
                    <Plus className="w-5 h-5" />
                    إضافة خدمة
                  </button>
                </div>
              </div>

              <div className="mb-4 text-sm text-gray-600">
                عرض {managedPlaces.filter(place => {
                  const matchesCategory = serviceFilterCategory === 'all' || place.category === serviceFilterCategory;
                  const matchesStatus =
                    serviceFilterStatus === 'all' ||
                    (serviceFilterStatus === 'visible' && place.isVisible !== false && !place.isPending) ||
                    (serviceFilterStatus === 'hidden' && place.isVisible === false && !place.isPending) ||
                    (serviceFilterStatus === 'pending' && place.isPending);
                  const matchesSearch =
                    place.name.toLowerCase().includes(serviceSearchTerm.toLowerCase()) ||
                    place.phone.toLowerCase().includes(serviceSearchTerm.toLowerCase());
                  return matchesCategory && matchesStatus && matchesSearch;
                }).length} من {managedPlaces.length} خدمة
              </div>

              <div className="space-y-3">
                {managedPlaces.filter(place => {
                  const matchesCategory = serviceFilterCategory === 'all' || place.category === serviceFilterCategory;
                  const matchesStatus =
                    serviceFilterStatus === 'all' ||
                    (serviceFilterStatus === 'visible' && place.isVisible !== false && !place.isPending) ||
                    (serviceFilterStatus === 'hidden' && place.isVisible === false && !place.isPending) ||
                    (serviceFilterStatus === 'pending' && place.isPending);
                  const matchesSearch =
                    place.name.toLowerCase().includes(serviceSearchTerm.toLowerCase()) ||
                    place.phone.toLowerCase().includes(serviceSearchTerm.toLowerCase());
                  return matchesCategory && matchesStatus && matchesSearch;
                }).map(place => (
                  <div key={place.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <img
                          src={place.image}
                          alt={place.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-lg">{place.name}</h4>
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                              {managedCategories[place.category]?.name || (place.customCategoryData ? place.customCategoryData.name : place.category)}
                            </span>
                            {place.customCategoryData && (
                              <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                                فئة جديدة
                              </span>
                            )}
                            {place.isPending && (
                              <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                                قيد المراجعة
                              </span>
                            )}
                            {place.isVisible === false && !place.isPending && (
                              <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                                مخفية
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-gray-600 mb-2">
                            <div className="flex items-center gap-1 mb-1">
                              <MapPin className="w-4 h-4" />
                              <span>{place.address}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Phone className="w-4 h-4" />
                              <span>{place.phone}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <ThumbsUp className="w-4 h-4" />
                            <span>{place.likes} إعجاب</span>
                          </div>
                          {place.submittedAt && (
                            <div className="text-xs text-gray-400 mt-1">
                              تم التقديم: {new Date(place.submittedAt).toLocaleDateString('ar-EG')}
                              {place.submitterMobile && (
                                <div className="text-xs text-green-600 mt-1">
                                  📱 رقم التواصل: {place.submitterMobile}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {place.isPending ? (
                          <>
                            <button
                              onClick={() => {
                                // إضافة الفئة الجديدة إذا كانت موجودة
                                if (place.customCategoryData) {
                                  setManagedCategories(prev => ({
                                    ...prev,
                                    [place.customCategoryData.key]: {
                                      name: place.customCategoryData.name,
                                      icon: place.customCategoryData.icon,
                                      isVisible: true
                                    }
                                  }));
                                }

                                setManagedPlaces(prev => prev.map(p =>
                                  p.id === place.id ? { ...p, isPending: false, isVisible: true } : p
                                ));

                                // إرسال إشعار SMS إذا كان رقم الموبايل متوفر
                                if (place.submitterMobile) {
                                  sendSMSNotification(place.submitterMobile, place.name);
                                  const categoryNote = place.customCategoryData ? ` وتم إضافة فئة "${place.customCategoryData.name}" الجديدة` : '';
                                  alert(`تم نشر الخدمة وإرسال إشعار SMS إلى ${place.submitterMobile}${categoryNote}`);
                                } else {
                                  const categoryNote = place.customCategoryData ? ` وتم إضافة فئة "${place.customCategoryData.name}" الجديدة` : '';
                                  alert(`تم نشر الخدمة بنجاح${categoryNote}`);
                                }
                              }}
                              className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200"
                              title="موافقة ونشر"
                            >
                              <Save className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleEditPlace(place)}
                              className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
                              title="تعديل قبل النشر"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeletePlace(place.id)}
                              className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                              title="رفض وحذف"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => toggleVisibility(place.id)}
                              className={`p-2 rounded-lg ${
                                place.isVisible === false
                                  ? 'bg-green-100 text-green-600 hover:bg-green-200'
                                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                              }`}
                              title={place.isVisible === false ? 'إظهار' : 'إخفاء'}
                            >
                              {place.isVisible === false ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                            </button>
                            <button
                              onClick={() => handleEditPlace(place)}
                              className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
                              title="تعديل"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeletePlace(place.id)}
                              className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                              title="حذف"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {currentView === 'settings' && settingsView === 'about' && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <button
                onClick={() => setSettingsView('main')}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                ← رجوع
              </button>
              <h2 className="text-2xl font-bold">معلومات عن النظام</h2>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">🏪</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">دليل خدمات مدينة 15 مايو</h3>
                <p className="text-gray-600">الإصدار 1.0.0</p>
              </div>

              <div className="space-y-4">
                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-2">عن التطبيق</h4>
                  <p className="text-gray-600 text-sm">
                    دليل شامل لجميع الخدمات والأماكن المهمة في مدينة 15 مايو، يتيح للمواطنين العثور على الخدمات بسهولة ومعرفة معلومات التواصل والمواقع.
                  </p>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-2">الميزات</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• البحث السريع في الخدمات</li>
                    <li>• التصفية حسب الفئات</li>
                    <li>• إضافة الأماكن للمفضلة</li>
                    <li>• عرض المواقع على الخريطة</li>
                    <li>• إدارة الخدمات والفئات</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentView === 'add-service' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6 text-center">تقديم طلب إضافة خدمة جديدة للمراجعة</h2>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">إرشادات تقديم الطلب:</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• املأ جميع البيانات المطلوبة بدقة وصحة</li>
                <li>• سيتم مراجعة طلبك من قبل الإدارة قبل النشر</li>
                <li>• تأكد من صحة رقم الهاتف وساعات العمل</li>
                <li>• أضف وصفاً مفصلاً عن الخدمة ومميزاتها</li>
                <li>📱 أضف رقم موبايلك لتلقي إشعار عند قبول الطلب</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                const phone = formData.get('phone') as string;

                if (!phone || phone.length !== 11 || !/^[0-9]{11}$/.test(phone)) {
                  alert('يجب أن يكون رقم الهاتف 11 رقم بالضبط (أرقام فقط)');
                  return;
                }

                const startTime = formData.get('startTime') as string;
                const endTime = formData.get('endTime') as string;
                const hours = `${startTime} - ${endTime}`;

                const submitterMobile = formData.get('submitterMobile') as string;
                const selectedCategory = formData.get('category') as string;
                const customCategory = formData.get('customCategory') as string;

                let finalCategory = selectedCategory;
                let customCategoryData = null;

                if (selectedCategory === 'other' && customCategory) {
                  // إنشاء مفتاح فريد للفئة الجديدة
                  const categoryKey = customCategory.toLowerCase().replace(/\s+/g, '_').replace(/[^\w_]/g, '');
                  finalCategory = categoryKey;
                  customCategoryData = {
                    key: categoryKey,
                    name: customCategory,
                    icon: '🏪' // أيقونة افتراضية
                  };
                }

                const serviceType = formData.get('type') as string || 'حجورات';

                const newPlace = {
                  name: formData.get('name') as string,
                  category: finalCategory,
                  address: formData.get('address') as string,
                  phone: phone,
                  hours: hours,
                  description: formData.get('description') as string,
                  image: uploadedImage || 'https://images.unsplash.com/photo-1555529902-de4e0750ea48?w=400',
                  services: selectedServices,
                  submitterMobile: submitterMobile && submitterMobile.length === 11 ? submitterMobile : null,
                  customCategoryData: customCategoryData,
                  type: serviceType,
                  products: serviceType === 'طلبات' ? selectedProducts : undefined,
                  appointmentSettings: serviceType === 'حجورات' ? appointmentSettings : undefined
                };
                handleSubmitServiceForReview(newPlace);
                setShowCustomCategory(false);
                setCustomCategoryName('');
                setSelectedServices([]);
                setCurrentService('');
                setSelectedProducts([]);
                setCurrentProduct({ name: '', price: '', description: '' });
                setSelectedServiceType('حجورات');
                setAppointmentSettings({
                  sessionDuration: '30',
                  consultationFee: '',
                  availableDays: [],
                  startTime: '09:00',
                  endTime: '17:00',
                  maxConcurrentBookings: '1'
                });
              }}>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      اسم الخدمة *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="مثال: مطعم الأسرة السعيدة"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      الفئة *
                    </label>
                    <select
                      name="category"
                      required
                      onChange={(e) => {
                        if (e.target.value === 'other') {
                          setShowCustomCategory(true);
                        } else {
                          setShowCustomCategory(false);
                          setCustomCategoryName('');
                        }
                      }}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      <option value="">اختر الفئة</option>
                      {Object.entries(managedCategories).filter(([key]) => key !== 'all').map(([key, category]) => (
                        <option key={key} value={key}>{category.name}</option>
                      ))}
                      <option value="other">أخرى (اكتب فئة جديدة)</option>
                    </select>
                    {showCustomCategory && (
                      <div className="mt-3">
                        <input
                          type="text"
                          name="customCategory"
                          value={customCategoryName}
                          onChange={(e) => setCustomCategoryName(e.target.value)}
                          placeholder="اكتب اسم الفئة الجديدة"
                          className="w-full px-3 py-2 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                          required={showCustomCategory}
                        />
                        <p className="text-xs text-orange-600 mt-1">
                          سيتم مراجعة الفئة الجديدة وإضافتها عند الموافقة على الطلب
                        </p>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      النوع *
                    </label>
                    <select
                      name="type"
                      required
                      value={selectedServiceType}
                      onChange={(e) => setSelectedServiceType(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      <option value="حجورات">حجورات</option>
                      <option value="طلبات">طلبات</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      العنوان *
                    </label>
                    <input
                      type="text"
                      name="address"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="مثال: المجاورة الثالثة، مدينة 15 مايو"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      رقم هاتف الخدمة *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      pattern="[0-9]{11}"
                      maxLength={11}
                      inputMode="numeric"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="مثال: 01234567890"
                      title="يجب أن يكون رقم الهاتف 11 رقم بالضبط"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ساعات العمل *
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">وقت الفتح</label>
                        <input
                          type="time"
                          name="startTime"
                          required
                          defaultValue="09:00"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder="09:00"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">وقت الإغلاق</label>
                        <input
                          type="time"
                          name="endTime"
                          required
                          defaultValue="22:00"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder="22:00"
                        />
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      مثال: من 9:00 صباحاً إلى 10:00 مساءً
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      وصف الخدمة *
                    </label>
                    <textarea
                      name="description"
                      required
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="اكتب وصفاً مفصلاً عن الخدمة والمميزات التي تقدمها..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      الخدمات المتاحة
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={currentService}
                        onChange={(e) => setCurrentService(e.target.value)}
                        onKeyPress={handleServiceKeyPress}
                        className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="اكتب اسم الخدمة واضغط إضافة"
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
                              className="text-blue-600 hover:text-blue-800 transition-colors"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}

                    <input
                      type="hidden"
                      name="services"
                      value={selectedServices.join(', ')}
                    />
                  </div>

                  {/* قسم المنتجات - يظهر فقط عند اختيار "طلبات" */}
                  {selectedServiceType === 'طلبات' && (
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        المنتجات المتاحة
                      </label>
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <input
                            type="text"
                            value={currentProduct.name}
                            onChange={(e) => setCurrentProduct({...currentProduct, name: e.target.value})}
                            className="px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="اسم المنتج"
                          />
                          <input
                            type="text"
                            value={currentProduct.price}
                            onChange={(e) => setCurrentProduct({...currentProduct, price: e.target.value})}
                            className="px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="السعر (جنيه)"
                          />
                          <input
                            type="text"
                            value={currentProduct.description}
                            onChange={(e) => setCurrentProduct({...currentProduct, description: e.target.value})}
                            className="px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
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

                  {/* قسم إعدادات المواعيد - يظهر فقط عند اختيار "حجورات" */}
                  {selectedServiceType === 'حجورات' && (
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
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

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      صورة الخدمة (اختياري)
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, false)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    {uploadedImage && (
                      <div className="mt-3">
                        <p className="text-sm text-gray-600 mb-2">معاينة الصورة:</p>
                        <img src={uploadedImage} alt="معاينة" className="w-32 h-32 object-cover rounded-lg border" />
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      رقم موبايلك (اختياري)
                    </label>
                    <input
                      type="tel"
                      name="submitterMobile"
                      pattern="[0-9]{11}"
                      maxLength={11}
                      inputMode="numeric"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="مثال: 01234567890"
                      title="لإرسال إشعار عند قبول الطلب"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      سنرسل لك رسالة نصية عند قبول ونشر طلبك
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t">
                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="flex-1 bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                    >
                      <Plus className="w-5 h-5" />
                      تقديم طلب إضافة الخدمة
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setCurrentView('search');
                        setUploadedImage(null);
                      }}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      إلغاء
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="max-w-4xl mx-auto flex justify-around">
          <button
            onClick={() => setCurrentView('search')}
            className={`flex flex-col items-center gap-1 ${
              currentView === 'search' ? 'text-blue-500' : 'text-gray-500'
            }`}
          >
            <Search className="w-6 h-6" />
            <span className="text-xs">بحث وتصفح</span>
          </button>

          <button
            onClick={() => setCurrentView('add-service')}
            className={`flex flex-col items-center gap-1 ${
              currentView === 'add-service' ? 'text-green-500' : 'text-gray-500'
            }`}
          >
            <Plus className="w-6 h-6" />
            <span className="text-xs">إضافة خدمة</span>
          </button>

          <button
            onClick={() => setCurrentView('favorites')}
            className={`flex flex-col items-center gap-1 ${
              currentView === 'favorites' ? 'text-blue-500' : 'text-gray-500'
            }`}
          >
            <Heart className="w-6 h-6" />
            <span className="text-xs">المفضلات</span>
          </button>


          <button
            onClick={() => setCurrentView('settings')}
            className={`flex flex-col items-center gap-1 ${
              currentView === 'settings' ? 'text-blue-500' : 'text-gray-500'
            }`}
          >
            <Settings className="w-6 h-6" />
            <span className="text-xs">الإعدادات</span>
          </button>
        </div>
      </nav>

      {showDetails && selectedPlace && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
              <h2 className="text-xl font-bold">{selectedPlace.name}</h2>
              <button
                onClick={() => setShowDetails(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-4">
              <img
                src={selectedPlace.image}
                alt={selectedPlace.name}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">الوصف</h3>
                  <p className="text-gray-700">{selectedPlace.description}</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">العنوان</h3>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
                    <p className="text-gray-700">{selectedPlace.address}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">الهاتف</h3>
                  <div className="flex items-center gap-2">
                    <Phone className="w-5 h-5 text-gray-500" />
                    <a href={`tel:${selectedPlace.phone}`} className="text-blue-600 hover:underline">
                      {selectedPlace.phone}
                    </a>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">ساعات العمل</h3>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-gray-500" />
                    <p className="text-gray-700">{selectedPlace.hours}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">الخدمات المتاحة</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedPlace.services.map((service: string, index: number) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Appointment booking for حجورات services */}
                {selectedPlace.type === 'حجورات' && selectedPlace.appointmentSettings && (
                  <div className="mb-4">
                    <h3 className="font-semibold mb-2">حجز موعد</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="mb-4">
                        <p className="text-sm text-gray-600">سعر الخدمة: {selectedPlace.appointmentSettings.consultationFee} جنيه</p>
                        <p className="text-sm text-gray-600">مدة الموعد: {selectedPlace.appointmentSettings.sessionDuration} دقيقة</p>
                        <p className="text-sm text-gray-600">عدد المواعيد المتاحة: {selectedPlace.appointmentSettings.maxConcurrentBookings} في نفس الوقت</p>
                      </div>

                      {!showAppointmentBooking ? (
                        <button
                          onClick={() => setShowAppointmentBooking(true)}
                          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 flex items-center justify-center gap-2"
                        >
                          <Calendar className="w-5 h-5" />
                          احجز موعد
                        </button>
                      ) : (
                        <div className="space-y-4">
                          {/* Multiple bookings toggle */}
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700">نوع الحجز</span>
                            <div className="flex gap-2">
                              <button
                                onClick={() => setShowMultipleBookings(false)}
                                className={`px-3 py-1 text-xs rounded-full ${
                                  !showMultipleBookings
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                              >
                                موعد واحد
                              </button>
                              <button
                                onClick={() => setShowMultipleBookings(true)}
                                className={`px-3 py-1 text-xs rounded-full ${
                                  showMultipleBookings
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                              >
                                مواعيد متعددة
                              </button>
                            </div>
                          </div>

                          {/* Date selection */}
                          <div>
                            <label className="block text-sm font-medium text-gray-600 mb-2">اختر التاريخ</label>
                            <div className="grid grid-cols-2 gap-2">
                              {getNextAvailableDates(selectedPlace.appointmentSettings).map((date) => (
                                <button
                                  key={date}
                                  onClick={() => setSelectedDate(date)}
                                  className={`p-2 text-sm rounded-lg border ${
                                    selectedDate === date
                                      ? 'bg-blue-500 text-white border-blue-500'
                                      : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300'
                                  }`}
                                >
                                  {new Date(date).toLocaleDateString('ar-EG', {
                                    weekday: 'short',
                                    month: 'short',
                                    day: 'numeric'
                                  })}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Time slot selection */}
                          {selectedDate && (
                            <div>
                              <label className="block text-sm font-medium text-gray-600 mb-2">اختر الوقت</label>
                              <div className="grid grid-cols-3 gap-2">
                                {generateTimeSlots(selectedPlace.appointmentSettings).map((timeSlot) => (
                                  <button
                                    key={timeSlot}
                                    onClick={() => setSelectedTimeSlot(timeSlot)}
                                    className={`p-2 text-sm rounded-lg border ${
                                      selectedTimeSlot === timeSlot
                                        ? 'bg-blue-500 text-white border-blue-500'
                                        : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300'
                                    }`}
                                  >
                                    {timeSlot}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Add to list button for multiple bookings */}
                          {showMultipleBookings && selectedDate && selectedTimeSlot && (
                            <div className="text-center">
                              <button
                                onClick={addAppointmentToList}
                                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex items-center justify-center gap-2 mx-auto"
                              >
                                <Plus className="w-4 h-4" />
                                إضافة إلى القائمة
                              </button>
                            </div>
                          )}

                          {/* Selected appointments list */}
                          {showMultipleBookings && selectedAppointments.length > 0 && (
                            <div>
                              <h4 className="font-medium text-gray-800 mb-2">المواعيد المحددة ({selectedAppointments.length})</h4>
                              <div className="space-y-2 max-h-32 overflow-y-auto">
                                {selectedAppointments.map((appointment, index) => (
                                  <div key={index} className="flex items-center justify-between bg-blue-50 p-2 rounded-lg">
                                    <span className="text-sm">
                                      📅 {new Date(appointment.date).toLocaleDateString('ar-EG')} - ⏰ {appointment.timeSlot}
                                    </span>
                                    <button
                                      onClick={() => removeAppointmentFromList(index)}
                                      className="text-red-500 hover:text-red-700"
                                    >
                                      <Minus className="w-4 h-4" />
                                    </button>
                                  </div>
                                ))}
                              </div>
                              <p className="text-xs text-gray-500 mt-2">
                                💰 إجمالي التكلفة: {selectedAppointments.length * parseInt(selectedPlace.appointmentSettings.consultationFee)} جنيه
                              </p>
                            </div>
                          )}

                          {/* Patient information form */}
                          {((showMultipleBookings && selectedAppointments.length > 0) || (!showMultipleBookings && selectedDate && selectedTimeSlot)) && (
                            <div className="space-y-3">
                              <h4 className="font-medium text-gray-800">بيانات الحجز</h4>
                              <input
                                type="text"
                                placeholder="الاسم الكامل"
                                value={appointmentForm.patientName}
                                onChange={(e) => setAppointmentForm({...appointmentForm, patientName: e.target.value})}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                              <input
                                type="tel"
                                placeholder="رقم الهاتف"
                                value={appointmentForm.patientPhone}
                                onChange={(e) => {
                                  const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 11);
                                  setAppointmentForm({...appointmentForm, patientPhone: value});
                                }}
                                pattern="[0-9]{11}"
                                maxLength={11}
                                inputMode="numeric"
                                title="يجب أن يكون رقم الهاتف 11 رقم بالضبط"
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                              <input
                                type="text"
                                placeholder="العمر (اختياري)"
                                value={appointmentForm.patientAge}
                                onChange={(e) => setAppointmentForm({...appointmentForm, patientAge: e.target.value})}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                              <textarea
                                placeholder="تفاصيل إضافية (اختياري)"
                                value={appointmentForm.appointmentReason}
                                onChange={(e) => setAppointmentForm({...appointmentForm, appointmentReason: e.target.value})}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                rows={3}
                              />

                              <div className="flex gap-2">
                                <button
                                  onClick={handleAppointmentSubmit}
                                  disabled={!appointmentForm.patientName || !appointmentForm.patientPhone}
                                  className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                                >
                                  {showMultipleBookings
                                    ? `تأكيد حجز ${selectedAppointments.length} مواعيد`
                                    : 'تأكيد الحجز'
                                  }
                                </button>
                                <button
                                  onClick={() => {
                                    setShowAppointmentBooking(false);
                                    setShowMultipleBookings(false);
                                    setSelectedDate('');
                                    setSelectedTimeSlot('');
                                    setSelectedAppointments([]);
                                    setAppointmentForm({
                                      patientName: '',
                                      patientPhone: '',
                                      patientAge: '',
                                      appointmentReason: ''
                                    });
                                  }}
                                  className="px-4 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400"
                                >
                                  إلغاء
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  <a
                    href={`tel:${selectedPlace.phone}`}
                    className="flex-1 bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 flex items-center justify-center gap-2"
                  >
                    <Phone className="w-5 h-5" />
                    اتصال
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* نموذج إضافة فئة جديدة */}
      {showCategoryForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">إضافة فئة جديدة</h3>
                <button
                  onClick={() => setShowCategoryForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                const categoryData = {
                  key: formData.get('key') as string,
                  name: formData.get('name') as string,
                  icon: formData.get('icon') as string
                };
                handleAddCategory(categoryData);
              }}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      مفتاح الفئة (بالإنجليزية)
                    </label>
                    <input
                      type="text"
                      name="key"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="مثال: pharmacy"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      اسم الفئة
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="مثال: صيدليات"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      الأيقونة (إيموجي)
                    </label>
                    <input
                      type="text"
                      name="icon"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="مثال: 💊"
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    type="submit"
                    className="flex-1 bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600"
                  >
                    إضافة
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCategoryForm(false)}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
                  >
                    إلغاء
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* نموذج تعديل فئة */}
      {editingCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">تعديل فئة</h3>
                <button
                  onClick={() => setEditingCategory(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    اسم الفئة
                  </label>
                  <input
                    type="text"
                    value={editingCategory.name}
                    onChange={(e) => setEditingCategory({...editingCategory, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    الأيقونة (إيموجي)
                  </label>
                  <input
                    type="text"
                    value={editingCategory.icon}
                    onChange={(e) => setEditingCategory({...editingCategory, icon: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleSaveCategoryEdit}
                  className="flex-1 bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600"
                >
                  حفظ
                </button>
                <button
                  onClick={() => setEditingCategory(null)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
                >
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* نموذج إضافة/تعديل خدمة */}
      <PlaceForm
        isOpen={showAddForm}
        onClose={handleFormClose}
        onSubmit={handleFormSubmit}
        editingPlace={editingPlace}
        categories={managedCategories}
        uploadedImage={uploadedImage}
        setUploadedImage={setUploadedImage}
      />

      {/* Fallback - temp comment */}
      {false && showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
              <h3 className="text-xl font-bold">إضافة خدمة جديدة</h3>
              <button
                onClick={() => {
                  setShowAddForm(false);
                  setUploadedImage(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                const phone = formData.get('phone') as string;

                if (!phone || phone.length !== 11 || !/^[0-9]{11}$/.test(phone)) {
                  alert('يجب أن يكون رقم الهاتف 11 رقم بالضبط (أرقام فقط)');
                  return;
                }

                const startTime = formData.get('startTime') as string;
                const endTime = formData.get('endTime') as string;
                const hours = `${startTime} - ${endTime}`;

                const selectedCategory = formData.get('category') as string;
                const adminCustomCategory = formData.get('adminCustomCategory') as string;

                let finalCategory = selectedCategory;

                // إذا تم اختيار فئة جديدة
                if (selectedCategory === 'other' && adminCustomCategory) {
                  const categoryKey = adminCustomCategory.toLowerCase().replace(/\s+/g, '_').replace(/[^\w_]/g, '');

                  // إضافة الفئة الجديدة
                  setManagedCategories(prev => ({
                    ...prev,
                    [categoryKey]: {
                      name: adminCustomCategory,
                      icon: '🏪',
                      isVisible: true
                    }
                  }));

                  finalCategory = categoryKey;
                }

                const newPlace = {
                  name: formData.get('name') as string,
                  category: finalCategory,
                  address: formData.get('address') as string,
                  phone: phone,
                  hours: hours,
                  description: formData.get('description') as string,
                  image: uploadedImage || 'https://images.unsplash.com/photo-1555529902-de4e0750ea48?w=400',
                  services: selectedServices
                };
                handleAddPlace(newPlace);
                setShowEditCustomCategory(false);
                setEditCustomCategoryName('');
                setSelectedServices([]);
                setCurrentService('');
              }}>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      اسم الخدمة
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      الفئة
                    </label>
                    <select
                      name="category"
                      required
                      onChange={(e) => {
                        if (e.target.value === 'other') {
                          setShowEditCustomCategory(true);
                        } else {
                          setShowEditCustomCategory(false);
                          setEditCustomCategoryName('');
                        }
                      }}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      <option value="">اختر الفئة</option>
                      {Object.entries(managedCategories).filter(([key]) => key !== 'all').map(([key, category]) => (
                        <option key={key} value={key}>{category.name}</option>
                      ))}
                      <option value="other">أخرى (إضافة فئة جديدة)</option>
                    </select>
                    {showEditCustomCategory && (
                      <div className="mt-3">
                        <input
                          type="text"
                          name="adminCustomCategory"
                          value={editCustomCategoryName}
                          onChange={(e) => setEditCustomCategoryName(e.target.value)}
                          placeholder="اكتب اسم الفئة الجديدة"
                          className="w-full px-3 py-2 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                          required={showEditCustomCategory}
                        />
                        <p className="text-xs text-orange-600 mt-1">
                          سيتم إضافة الفئة الجديدة فوراً عند الحفظ
                        </p>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      العنوان
                    </label>
                    <input
                      type="text"
                      name="address"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      رقم الهاتف
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      pattern="[0-9]{11}"
                      maxLength={11}
                      inputMode="numeric"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="مثال: 01234567890"
                      title="يجب أن يكون رقم الهاتف 11 رقم بالضبط"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ساعات العمل
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">وقت الفتح</label>
                        <input
                          type="time"
                          name="startTime"
                          required
                          defaultValue="09:00"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder="09:00"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">وقت الإغلاق</label>
                        <input
                          type="time"
                          name="endTime"
                          required
                          defaultValue="22:00"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder="22:00"
                        />
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      مثال: من 9:00 صباحاً إلى 10:00 مساءً
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      الوصف
                    </label>
                    <textarea
                      name="description"
                      required
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      الخدمات المتاحة
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={currentService}
                        onChange={(e) => setCurrentService(e.target.value)}
                        onKeyPress={handleServiceKeyPress}
                        className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="اكتب اسم الخدمة واضغط إضافة"
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
                              className="text-blue-600 hover:text-blue-800 transition-colors"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}

                    <input
                      type="hidden"
                      name="services"
                      value={selectedServices.join(', ')}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      صورة الخدمة
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, false)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    {uploadedImage && (
                      <div className="mt-2">
                        <img src={uploadedImage} alt="معاينة" className="w-32 h-32 object-cover rounded-lg" />
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                  >
                    إضافة الخدمة
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddForm(false);
                      setUploadedImage(null);
                    }}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
                  >
                    إلغاء
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Removed - using unified PlaceForm */}
      {false && editingPlace && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[95vh] overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold">تعديل ومراجعة الخدمة</h3>
                <p className="text-blue-100 text-sm mt-1">قم بتعديل بيانات الخدمة أو قبول/رفض الفئة المقترحة</p>
              </div>
              <button
                onClick={() => {
                  setEditingPlace(null);
                  setEditUploadedImage(null);
                  setShowEditCustomCategory(false);
                  setEditCustomCategoryName('');
                }}
                className="text-white hover:text-gray-200 p-2 rounded-lg hover:bg-white hover:bg-opacity-20"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            </div>

            <div className="max-h-[calc(95vh-120px)] overflow-y-auto">
              {/* قسم الفئة المقترحة */}
              {editingPlace.customCategoryData && (
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 m-6 mb-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-orange-100 p-3 rounded-full">
                      <Folder className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-orange-800">فئة جديدة مقترحة</h4>
                      <p className="text-orange-600 text-sm">المستخدم اقترح إضافة فئة جديدة</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4 mb-4">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">{editingPlace.customCategoryData.icon}</span>
                      <div>
                        <p className="font-semibold text-gray-800">{editingPlace.customCategoryData.name}</p>
                        <p className="text-sm text-gray-500">الفئة المقترحة من المستخدم</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        // قبول الفئة الجديدة
                        const categoryKey = editingPlace.customCategoryData.key;
                        setManagedCategories(prev => ({
                          ...prev,
                          [categoryKey]: {
                            name: editingPlace.customCategoryData.name,
                            icon: editingPlace.customCategoryData.icon,
                            isVisible: true
                          }
                        }));
                        setEditingPlace({
                          ...editingPlace,
                          category: categoryKey,
                          customCategoryData: null
                        });
                        alert(`تم قبول الفئة الجديدة "${editingPlace.customCategoryData.name}"`);
                      }}
                      className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 flex items-center justify-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      قبول الفئة الجديدة
                    </button>
                    <button
                      onClick={() => {
                        setEditingPlace({
                          ...editingPlace,
                          category: 'restaurant', // فئة افتراضية
                          customCategoryData: null
                        });
                        alert('تم رفض الفئة المقترحة وتحويلها إلى مطعم');
                      }}
                      className="flex-1 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 flex items-center justify-center gap-2"
                    >
                      <X className="w-4 h-4" />
                      رفض واختيار فئة أخرى
                    </button>
                  </div>
                </div>
              )}

              <div className="p-6 pt-2">
                <h4 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">بيانات الخدمة</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    اسم الخدمة
                  </label>
                  <input
                    type="text"
                    value={editingPlace.name}
                    onChange={(e) => setEditingPlace({...editingPlace, name: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    الفئة
                  </label>
                  <select
                    value={editingPlace.category}
                    onChange={(e) => {
                      if (e.target.value === 'other') {
                        setShowEditCustomCategory(true);
                        setEditingPlace({...editingPlace, category: 'other'});
                      } else {
                        setShowEditCustomCategory(false);
                        setEditCustomCategoryName('');
                        setEditingPlace({...editingPlace, category: e.target.value});
                      }
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    {Object.entries(managedCategories).filter(([key]) => key !== 'all').map(([key, category]) => (
                      <option key={key} value={key}>{category.name}</option>
                    ))}
                    <option value="other">أخرى (إضافة فئة جديدة)</option>
                  </select>
                  {showEditCustomCategory && (
                    <div className="mt-3">
                      <input
                        type="text"
                        value={editCustomCategoryName}
                        onChange={(e) => setEditCustomCategoryName(e.target.value)}
                        placeholder="اكتب اسم الفئة الجديدة"
                        className="w-full px-3 py-2 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required={showEditCustomCategory}
                      />
                      <p className="text-xs text-orange-600 mt-1">
                        سيتم إضافة الفئة الجديدة عند الحفظ
                      </p>
                    </div>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    العنوان
                  </label>
                  <input
                    type="text"
                    value={editingPlace.address}
                    onChange={(e) => setEditingPlace({...editingPlace, address: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    رقم الهاتف
                  </label>
                  <input
                    type="tel"
                    value={editingPlace.phone}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 11);
                      setEditingPlace({...editingPlace, phone: value});
                    }}
                    pattern="[0-9]{11}"
                    maxLength={11}
                    inputMode="numeric"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="مثال: 01234567890"
                    title="يجب أن يكون رقم الهاتف 11 رقم بالضبط (أرقام فقط)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ساعات العمل
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">وقت الفتح</label>
                      <input
                        type="time"
                        value={parseHours(editingPlace.hours).startTime}
                        onChange={(e) => {
                          const { endTime } = parseHours(editingPlace.hours);
                          const hours = `${e.target.value} - ${endTime}`;
                          setEditingPlace({...editingPlace, hours});
                        }}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="09:00"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">وقت الإغلاق</label>
                      <input
                        type="time"
                        value={parseHours(editingPlace.hours).endTime}
                        onChange={(e) => {
                          const { startTime } = parseHours(editingPlace.hours);
                          const hours = `${startTime} - ${e.target.value}`;
                          setEditingPlace({...editingPlace, hours});
                        }}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="22:00"
                      />
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    مثال: من 9:00 صباحاً إلى 10:00 مساءً
                  </p>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    الوصف
                  </label>
                  <textarea
                    value={editingPlace.description}
                    onChange={(e) => setEditingPlace({...editingPlace, description: e.target.value})}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    الخدمات المتاحة (مفصولة بفواصل)
                  </label>
                  <input
                    type="text"
                    value={editingPlace.services.join(', ')}
                    onChange={(e) => setEditingPlace({...editingPlace, services: e.target.value.split(',').map(s => s.trim()).filter(s => s)})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    صورة الخدمة
                  </label>
                  <div className="bg-gray-50 rounded-lg p-4 border-2 border-dashed border-gray-300">
                    <div className="flex items-center gap-6">
                      <div className="relative">
                        <img
                          src={editUploadedImage || editingPlace.image}
                          alt={editingPlace.name}
                          className="w-24 h-24 object-cover rounded-lg border-2 border-gray-200 shadow-sm"
                        />
                        <div className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                          📷
                        </div>
                      </div>
                      <div className="flex-1">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, true)}
                          className="block w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-6 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all"
                        />
                        <p className="mt-2 text-sm text-gray-500">PNG, JPG حتى 10MB • يُفضل 400×300 بكسل</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="sticky bottom-0 bg-white border-t p-6 mt-6 flex gap-3">
                <button
                  onClick={handleSaveEdit}
                  className="flex-1 bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 flex items-center justify-center gap-2 font-semibold"
                >
                  <Save className="w-5 h-5" />
                  حفظ جميع التعديلات
                </button>
                <button
                  onClick={() => {
                    setEditingPlace(null);
                    setEditUploadedImage(null);
                    setShowEditCustomCategory(false);
                    setEditCustomCategoryName('');
                  }}
                  className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-lg hover:bg-gray-600 flex items-center justify-center gap-2 font-semibold"
                >
                  <X className="w-5 h-5" />
                  إلغاء التعديل
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* رسالة نجاح تقديم الطلب */}
      {showSubmissionSuccess && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 animate-bounce">
            <div className="bg-white text-green-500 rounded-full p-1">
              <Save className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold">تم تقديم طلبك بنجاح!</h3>
              <p className="text-sm opacity-90">سيتم مراجعة الخدمة ونشرها قريباً</p>
              <p className="text-xs opacity-75 mt-1">📱 سنرسل لك إشعار SMS عند الموافقة</p>
            </div>
          </div>
        </div>
      )}

      {/* زر فتح الشات */}
      {!showChat && (
        <button
          onClick={() => setShowChat(true)}
          className="fixed bottom-24 left-4 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition-colors z-40 animate-pulse"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* نافذة الشات */}
      {showChat &&
        <div className={`fixed ${isChatMinimized ? 'bottom-4 left-4 w-80 h-16' : 'bottom-4 left-4 w-80 h-96'} bg-white rounded-lg shadow-2xl border z-50 flex flex-col transition-all duration-300`}>
          {/* رأس الشات */}
          <div className="bg-blue-500 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5" />
              <span className="font-semibold">المساعد الذكي</span>
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setIsChatMinimized(!isChatMinimized)}
                className="p-1 hover:bg-blue-600 rounded"
              >
                {isChatMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setShowChat(false)}
                className="p-1 hover:bg-blue-600 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {!isChatMinimized && (
            <>
              {/* منطقة الرسائل */}
              <div ref={chatMessagesRef} className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50">
                {chatMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start gap-2 ${message.isBot ? '' : 'flex-row-reverse'}`}
                  >
                    <div className={`p-2 rounded-full ${message.isBot ? 'bg-blue-100 text-blue-600' : 'bg-gray-200 text-gray-600'}`}>
                      {message.isBot ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                    </div>
                    <div
                      className={`max-w-64 p-3 rounded-lg text-sm ${
                        message.isBot
                          ? 'bg-white border text-gray-800'
                          : 'bg-blue-500 text-white'
                      }`}
                      style={{ whiteSpace: 'pre-line' }}
                    >
                      {message.isBot ? renderMessageWithLinks(message.text) : message.text}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex items-start gap-2">
                    <div className="p-2 rounded-full bg-blue-100 text-blue-600">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="bg-white border p-3 rounded-lg text-sm">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* منطقة إدخال الرسائل */}
              <div className="p-3 border-t bg-white rounded-b-lg">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="اكتب رسالتك هنا..."
                    className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    disabled={isTyping}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!chatInput.trim() || isTyping}
                    className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-xs text-gray-500 mt-2 text-center">
                  مدعوم بالذكاء الاصطناعي 🤖 • جرب: "أين أقرب مطعم؟"
                </div>
              </div>
            </>
          )}
        </div>
      }
    </div>
  );
};

export default App;
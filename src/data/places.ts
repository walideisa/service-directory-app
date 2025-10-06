import { Place } from '../types';

export const initialPlaces: Place[] = [
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
  }
];

export const initialCategories = {
  mall: { name: 'مولات تجارية', icon: '🛍️', visible: true },
  restaurant: { name: 'مطاعم', icon: '🍽️', visible: true },
  hospital: { name: 'مستشفيات', icon: '🏥', visible: true },
  bank: { name: 'بنوك', icon: '🏦', visible: true },
  market: { name: 'أسواق', icon: '🛒', visible: true },
  gas: { name: 'محطات وقود', icon: '⛽', visible: true },
  pharmacy: { name: 'صيدليات', icon: '💊', visible: true },
  school: { name: 'مدارس', icon: '🏫', visible: true },
  mosque: { name: 'مساجد', icon: '🕌', visible: true },
  coffee: { name: 'مقاهي', icon: '☕', visible: true }
};
import React, { useState, useEffect, useId } from 'react';
import { 
  Phone, MapPin, Clock, Star, Shield, Wrench, Truck, 
  Settings, Key, Image as ImageIcon, Plus, Trash2, Edit3, 
  Check, X, LogOut, Lock, Calendar, MessageSquare, DollarSign,
  ChevronRight, AlertCircle, RefreshCw, Upload, CheckCircle2, User,
  Navigation, Award, Compass, ExternalLink, ChevronDown, Filter,
  PhoneCall, ShieldCheck, Car, HelpCircle, Eye
} from 'lucide-react';

// Authentic Generated Brand Assets
const BRAND_LOGO = '/src/assets/images/one_stop_towing_logo_1790679301242.jpg';
const HERO_IMAGE = '/src/assets/images/hero_tow_truck_1790679253151.jpg';

export interface ServicePrice {
  id: string;
  name: string;
  category: 'towing' | 'roadside' | 'heavy';
  basePrice: number;
  perMile: number;
  description: string;
  typicalResponse: string;
}

export interface GalleryPhoto {
  id: string;
  url: string;
  caption: string;
  tag: string;
}

export interface CustomerReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  serviceUsed?: string;
  status: 'approved' | 'pending';
}

export interface DispatchOrder {
  id: string;
  name: string;
  phone: string;
  location: string;
  destination?: string;
  serviceType: string;
  serviceName: string;
  estimatedMiles: number;
  vehicleInfo?: string;
  notes?: string;
  totalCost: number;
  status: 'Pending' | 'Dispatched' | 'Completed' | 'Cancelled';
  createdAt: string;
}

const INITIAL_PRICING: ServicePrice[] = [
  { 
    id: 'flatbed', 
    name: 'Standard Flatbed Towing', 
    category: 'towing',
    basePrice: 85, 
    perMile: 4.5, 
    description: 'Damage-free rollback transport for passenger cars, SUVs, and light trucks up to 10 miles base radius.',
    typicalResponse: '20 - 35 mins'
  },
  { 
    id: 'heavy', 
    name: 'Heavy Duty & Commercial Towing', 
    category: 'heavy',
    basePrice: 150, 
    perMile: 7.0, 
    description: 'Commercial rigs, RVs, motorhomes, semi-cabs, buses, and heavy construction machinery transport.',
    typicalResponse: '30 - 45 mins'
  },
  { 
    id: 'jumpstart', 
    name: 'Battery Jump Start', 
    category: 'roadside',
    basePrice: 55, 
    perMile: 0, 
    description: 'High-amperage 12V/24V booster jump start with charging system diagnostic test on the spot.',
    typicalResponse: '15 - 30 mins'
  },
  { 
    id: 'lockout', 
    name: 'Emergency Vehicle Lockout', 
    category: 'roadside',
    basePrice: 65, 
    perMile: 0, 
    description: 'Non-destructive specialized door entry using professional soft-wedge & long-reach precision tools.',
    typicalResponse: '15 - 30 mins'
  },
  { 
    id: 'fuel', 
    name: 'Emergency Fuel Delivery', 
    category: 'roadside',
    basePrice: 50, 
    perMile: 0, 
    description: 'Immediate delivery of up to 3 gallons regular unleaded or premium diesel directly to your location.',
    typicalResponse: '20 - 35 mins'
  },
  { 
    id: 'tire', 
    name: 'Flat Tire Change & Air Assistance', 
    category: 'roadside',
    basePrice: 60, 
    perMile: 0, 
    description: 'Rapid on-site spare installation, high-torque lug tightening, and tire pressure check.',
    typicalResponse: '20 - 35 mins'
  }
];

const INITIAL_PHOTOS: GalleryPhoto[] = [
  { 
    id: '1', 
    url: '/src/assets/images/hero_tow_truck_1790679253151.jpg', 
    caption: 'Modern Rollback Tow Truck on Garrett County mountain highway',
    tag: 'Flatbed'
  },
  { 
    id: '2', 
    url: '/src/assets/images/towing_heavy_duty_1790679266916.jpg', 
    caption: 'Commercial Heavy-Duty Wrecker Recovery in Western Maryland',
    tag: 'Heavy Duty'
  },
  { 
    id: '3', 
    url: '/src/assets/images/towing_flatbed_recovery_1790679278577.jpg', 
    caption: 'Precision Wheel-Lift & Strapping for Damage-Free Transport',
    tag: 'Transport'
  },
  { 
    id: '4', 
    url: '/src/assets/images/roadside_service_assist_1790679289216.jpg', 
    caption: 'Fast Roadside Diagnostic, Jump Start & Safety Support',
    tag: 'Roadside'
  }
];

const INITIAL_REVIEWS: CustomerReview[] = [
  { 
    id: '1', 
    author: 'Stephanie T.', 
    rating: 5, 
    date: '3 weeks ago', 
    comment: 'It was 5:30pm on a snowy Sunday near Deep Creek Lake, kudos to them for answering right away and towing us to safety! Driver was courteous and careful with our vehicle.', 
    serviceUsed: 'Standard Flatbed Towing',
    status: 'approved' 
  },
  { 
    id: '2', 
    author: 'Timothy Keller', 
    rating: 5, 
    date: '2 months ago', 
    comment: 'My alternator died coming up Route 219 on a trip from Wisconsin. The driver showed up within 25 minutes, loaded the car seamlessly, and recommended an honest local repair shop.', 
    serviceUsed: 'Standard Flatbed Towing',
    status: 'approved' 
  },
  { 
    id: '3', 
    author: 'Robinne Gray', 
    rating: 5, 
    date: '3 months ago', 
    comment: 'Nobody wants to break down on holiday weekend, but One Stop Towing was prompt, fair with their pricing, and had top tier equipment. Will always call them first.', 
    serviceUsed: 'Emergency Fuel Delivery',
    status: 'approved' 
  },
  { 
    id: '4', 
    author: 'Mark Henderson', 
    rating: 5, 
    date: '4 months ago', 
    comment: 'Dead battery in the winter freezing temperatures outside McHenry. Tech arrived fast, got the truck running in two minutes flat. Highly recommend!', 
    serviceUsed: 'Battery Jump Start',
    status: 'approved' 
  }
];

const INITIAL_ORDERS: DispatchOrder[] = [
  {
    id: 'ORD-78102',
    name: 'David Miller',
    phone: '(301) 555-8291',
    location: 'Route 219 & Glendale Rd, Oakland, MD',
    destination: 'Oakland Auto Service, 3rd St',
    serviceType: 'flatbed',
    serviceName: 'Standard Flatbed Towing',
    estimatedMiles: 12,
    vehicleInfo: '2021 Ford F-150 (Silver)',
    notes: 'Flat left front tire and broken control arm.',
    totalCost: 139.00,
    status: 'Dispatched',
    createdAt: 'Today, 2:15 PM'
  },
  {
    id: 'ORD-78099',
    name: 'Amanda Clark',
    phone: '(240) 555-3814',
    location: 'Deep Creek Lake State Park entrance',
    destination: 'Home residence in Mountain Lake Park',
    serviceType: 'jumpstart',
    serviceName: 'Battery Jump Start',
    estimatedMiles: 0,
    vehicleInfo: '2019 Subaru Outback',
    notes: 'Headlights left on during hiking trip.',
    totalCost: 55.00,
    status: 'Completed',
    createdAt: 'Today, 11:30 AM'
  }
];

export default function App() {
  // Persistent State
  const [logo, setLogo] = useState<string>(() => localStorage.getItem('ost_logo') || BRAND_LOGO);
  const [managerPin, setManagerPin] = useState<string>(() => localStorage.getItem('ost_pin') || '1234');
  const [pricing, setPricing] = useState<ServicePrice[]>(() => {
    const saved = localStorage.getItem('ost_pricing');
    return saved ? JSON.parse(saved) : INITIAL_PRICING;
  });
  const [photos, setPhotos] = useState<GalleryPhoto[]>(() => {
    const saved = localStorage.getItem('ost_photos');
    return saved ? JSON.parse(saved) : INITIAL_PHOTOS;
  });
  const [reviews, setReviews] = useState<CustomerReview[]>(() => {
    const saved = localStorage.getItem('ost_reviews');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });
  const [orders, setOrders] = useState<DispatchOrder[]>(() => {
    const saved = localStorage.getItem('ost_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  // UI state
  const [isManagerOpen, setIsManagerOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [activeTab, setActiveTab] = useState<'orders' | 'pricing' | 'photos' | 'reviews' | 'pin'>('orders');
  const [activePhotoModal, setActivePhotoModal] = useState<GalleryPhoto | null>(null);
  const [serviceFilter, setServiceFilter] = useState<'all' | 'towing' | 'roadside' | 'heavy'>('all');
  const [orderStatusFilter, setOrderStatusFilter] = useState<'all' | 'Pending' | 'Dispatched' | 'Completed' | 'Cancelled'>('all');

  // Customer order form state
  const [orderForm, setOrderForm] = useState({
    name: '',
    phone: '',
    location: '',
    destination: '',
    serviceType: 'flatbed',
    estimatedMiles: 8,
    vehicleInfo: '',
    notes: ''
  });
  const [orderSubmittedAlert, setOrderSubmittedAlert] = useState<{ id: string; total: number } | null>(null);

  // Review form state
  const [reviewForm, setReviewForm] = useState({
    author: '',
    rating: 5,
    serviceUsed: 'Standard Flatbed Towing',
    comment: ''
  });
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Manager state inputs
  const [newPin, setNewPin] = useState('');
  const [pinChangeSuccess, setPinChangeSuccess] = useState(false);
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);
  const [tempBasePrice, setTempBasePrice] = useState<number>(0);
  const [tempPerMile, setTempPerMile] = useState<number>(0);

  // New photo input
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  const [newPhotoCaption, setNewPhotoCaption] = useState('');
  const [newPhotoTag, setNewPhotoTag] = useState('Towing');

  // Sync to LocalStorage
  useEffect(() => { localStorage.setItem('ost_logo', logo); }, [logo]);
  useEffect(() => { localStorage.setItem('ost_pin', managerPin); }, [managerPin]);
  useEffect(() => { localStorage.setItem('ost_pricing', JSON.stringify(pricing)); }, [pricing]);
  useEffect(() => { localStorage.setItem('ost_photos', JSON.stringify(photos)); }, [photos]);
  useEffect(() => { localStorage.setItem('ost_reviews', JSON.stringify(reviews)); }, [reviews]);
  useEffect(() => { localStorage.setItem('ost_orders', JSON.stringify(orders)); }, [orders]);

  // Selected Service for Quote Calculation
  const selectedService = pricing.find(p => p.id === orderForm.serviceType) || pricing[0];
  const calculatedTotal = selectedService 
    ? selectedService.basePrice + (selectedService.perMile > 0 ? orderForm.estimatedMiles * selectedService.perMile : 0)
    : 0;

  // Handle Login to Manager Panel
  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === managerPin) {
      setIsAuthenticated(true);
      setPinError('');
      setPinInput('');
    } else {
      setPinError('Incorrect PIN code. Default is 1234.');
    }
  };

  // Change PIN handler
  const handlePinChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPin.trim().length >= 4) {
      setManagerPin(newPin.trim());
      setNewPin('');
      setPinChangeSuccess(true);
      setTimeout(() => setPinChangeSuccess(false), 3500);
    }
  };

  // Submit Towing Order from Customer Form
  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderForm.name || !orderForm.phone || !orderForm.location) return;

    const newOrder: DispatchOrder = {
      id: 'ORD-' + Math.floor(10000 + Math.random() * 90000),
      name: orderForm.name,
      phone: orderForm.phone,
      location: orderForm.location,
      destination: orderForm.destination || 'Requested drop-off / TBD',
      serviceType: orderForm.serviceType,
      serviceName: selectedService ? selectedService.name : 'Emergency Towing',
      estimatedMiles: selectedService?.perMile > 0 ? orderForm.estimatedMiles : 0,
      vehicleInfo: orderForm.vehicleInfo || 'Passenger Vehicle',
      notes: orderForm.notes,
      totalCost: calculatedTotal,
      status: 'Pending',
      createdAt: 'Just now'
    };

    setOrders(prev => [newOrder, ...prev]);
    setOrderSubmittedAlert({ id: newOrder.id, total: newOrder.totalCost });
    
    // Clear form
    setOrderForm({
      name: '',
      phone: '',
      location: '',
      destination: '',
      serviceType: 'flatbed',
      estimatedMiles: 8,
      vehicleInfo: '',
      notes: ''
    });

    // Auto-scroll to confirmation or alert
    setTimeout(() => {
      window.scrollTo({ top: 380, behavior: 'smooth' });
    }, 100);
  };

  // Submit Customer Review
  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewForm.author.trim() || !reviewForm.comment.trim()) return;

    const newRev: CustomerReview = {
      id: Date.now().toString(),
      author: reviewForm.author.trim(),
      rating: Number(reviewForm.rating),
      serviceUsed: reviewForm.serviceUsed,
      comment: reviewForm.comment.trim(),
      date: 'Today',
      status: 'approved'
    };

    setReviews(prev => [newRev, ...prev]);
    setReviewSubmitted(true);
    setReviewForm({ author: '', rating: 5, serviceUsed: 'Standard Flatbed Towing', comment: '' });
    setTimeout(() => setReviewSubmitted(false), 5000);
  };

  // Manager Price Updates
  const startEditPrice = (item: ServicePrice) => {
    setEditingPriceId(item.id);
    setTempBasePrice(item.basePrice);
    setTempPerMile(item.perMile);
  };

  const saveEditPrice = (id: string) => {
    setPricing(prev => prev.map(p => {
      if (p.id === id) {
        return {
          ...p,
          basePrice: Math.max(0, tempBasePrice),
          perMile: Math.max(0, tempPerMile)
        };
      }
      return p;
    }));
    setEditingPriceId(null);
  };

  // Manager Photo Operations
  const handleAddPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhotoUrl.trim()) return;

    const newP: GalleryPhoto = {
      id: Date.now().toString(),
      url: newPhotoUrl.trim(),
      caption: newPhotoCaption.trim() || 'One Stop Towing Operations',
      tag: newPhotoTag || 'Towing'
    };

    setPhotos(prev => [newP, ...prev]);
    setNewPhotoUrl('');
    setNewPhotoCaption('');
  };

  const handleDeletePhoto = (id: string) => {
    setPhotos(prev => prev.filter(p => p.id !== id));
  };

  // Manager Order Status Updates
  const handleUpdateOrderStatus = (orderId: string, status: DispatchOrder['status']) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
  };

  const handleDeleteOrder = (orderId: string) => {
    setOrders(prev => prev.filter(o => o.id !== orderId));
  };

  // Filtered Services
  const displayedServices = pricing.filter(s => {
    if (serviceFilter === 'all') return true;
    return s.category === serviceFilter;
  });

  // Filtered Orders for Manager
  const displayedOrders = orders.filter(o => {
    if (orderStatusFilter === 'all') return true;
    return o.status === orderStatusFilter;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col selection:bg-amber-500 selection:text-slate-950">
      
      {/* TOP EMERGENCY ANNOUNCEMENT BANNER */}
      <aside aria-label="Emergency Dispatch Status" className="bg-amber-950 text-amber-200 border-b border-amber-900/60 px-4 py-2 text-xs font-medium">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-semibold text-white">24/7 Rapid Mountain Dispatch</span>
            <span className="text-amber-300/80">Serving Oakland, Deep Creek Lake & Garrett County, MD</span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="hidden sm:inline text-amber-300/80">Average response time: 20-30 mins</span>
            <a href="tel:+13013342262" className="text-amber-400 hover:text-white font-bold flex items-center gap-1">
              <Phone className="w-3.5 h-3.5" />
              <span>(301) 334-2262</span>
            </a>
          </div>
        </div>
      </aside>

      {/* TOP NAVIGATION BAR (Strict 3-Zone Contract) */}
      <header className="sticky top-0 z-40 bg-slate-900 text-white border-b border-slate-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          
          {/* Zone 1: Single text element wordmark with authentic emblem */}
          <a href="#" className="flex items-center gap-3 group focus:outline-none">
            <img 
              src={logo} 
              alt="One Stop Towing" 
              referrerPolicy="no-referrer"
              className="h-10 w-10 rounded-full object-cover border border-amber-500/40 bg-slate-950 shadow" 
              onError={(e) => {
                // Fallback to stylized SVG avatar if image cannot load
                (e.currentTarget as HTMLImageElement).src = BRAND_LOGO;
              }}
            />
            <div className="flex flex-col">
              <span className="text-lg font-extrabold tracking-tight text-white group-hover:text-amber-400 transition-colors uppercase leading-none">
                One Stop Towing
              </span>
              <span className="text-[11px] font-semibold text-amber-400/90 tracking-wider uppercase mt-0.5">
                &amp; Transport LLC
              </span>
            </div>
          </a>

          {/* Zone 2: 4-6 clean text navigation links with subtle hover underlines */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#services" className="hover:text-amber-400 transition-colors py-1">Services &amp; Rates</a>
            <a href="#dispatch-quote" className="hover:text-amber-400 transition-colors py-1">Dispatch Quote</a>
            <a href="#fleet" className="hover:text-amber-400 transition-colors py-1">Fleet Operations</a>
            <a href="#coverage" className="hover:text-amber-400 transition-colors py-1">Garrett Co. Service Area</a>
            <a href="#reviews" className="hover:text-amber-400 transition-colors py-1">Customer Reviews</a>
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-3">
            <a 
              href="tel:+13013342262" 
              className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 px-4 py-2.5 rounded-lg text-sm font-extrabold shadow-sm transition-all whitespace-nowrap"
            >
              <PhoneCall className="w-4 h-4 fill-slate-950 shrink-0" />
              <span>(301) 334-2262</span>
            </a>

            <button 
              onClick={() => setIsManagerOpen(true)}
              className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white px-3 py-2.5 rounded-lg text-xs font-medium border border-slate-700 transition-colors whitespace-nowrap"
              title="Open Manager Dispatch Control Panel"
            >
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Manager Portal</span>
            </button>
          </div>

        </div>
      </header>

      {/* HERO SECTION WITH DISPATCH QUOTE CALCULATOR */}
      <section className="relative bg-slate-950 text-white overflow-hidden py-12 md:py-20 border-b border-slate-800">
        
        {/* Cinematic Backdrop Image with Dark Scrim */}
        <div className="absolute inset-0 z-0">
          <img 
            src={HERO_IMAGE} 
            alt="One Stop Towing Fleet on Maryland Mountain Road" 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-25 filter brightness-75 scale-105 transform motion-safe:transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-900/80" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Proposition & Mountain Roadside Authority */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Unboxed Metadata (Zero-Pill Rule) */}
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 tracking-wide uppercase">
                <span>Oakland, MD</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span>Garrett County</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span className="flex items-center gap-1 text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span> 24/7 Immediate Response
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight text-balance">
                Heavy Duty, Flatbed &amp; Emergency Towing When You Need It Most
              </h1>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
                Stuck on Route 219, around Deep Creek Lake, or in the mountains? One Stop Towing &amp; Transport LLC provides fast, damage-free rollback towing, lockouts, jump starts, and commercial wrecker service 24 hours a day.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a 
                  href="tel:+13013342262" 
                  className="flex items-center justify-center gap-3 bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 font-black px-7 py-4 rounded-xl text-base shadow-xl transition-all"
                >
                  <Phone className="w-5 h-5 fill-slate-950" />
                  <span>Call Emergency Dispatch</span>
                </a>
                
                <a 
                  href="#dispatch-quote" 
                  className="flex items-center justify-center gap-2 bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold px-6 py-4 rounded-xl text-base transition-colors"
                >
                  <span>Instant Tow Quote Calculator</span>
                  <ChevronDown className="w-4 h-4 text-amber-400" />
                </a>
              </div>

              {/* Trust Indicators (Quiet unboxed inline typography) */}
              <div className="pt-4 border-t border-slate-800/80 grid grid-cols-3 gap-4 text-xs text-slate-400">
                <div>
                  <div className="text-white font-extrabold text-lg tabular-nums">4.3 / 5.0</div>
                  <div className="text-slate-400 mt-0.5">29+ Local Reviews</div>
                </div>
                <div>
                  <div className="text-white font-extrabold text-lg tabular-nums">24 / 7 / 365</div>
                  <div className="text-slate-400 mt-0.5">Always On Duty</div>
                </div>
                <div>
                  <div className="text-white font-extrabold text-lg">Garrett County</div>
                  <div className="text-slate-400 mt-0.5">Local Mountain Rigs</div>
                </div>
              </div>

            </div>

            {/* Right Column: Interactive Dispatch Request & Live ROQ Calculator */}
            <div id="dispatch-quote" className="lg:col-span-5 bg-slate-900/95 border border-slate-700/80 rounded-2xl p-6 sm:p-7 shadow-2xl backdrop-blur">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
                <div>
                  <h2 className="text-lg font-extrabold text-white">Instant Service Dispatch</h2>
                  <p className="text-xs text-slate-400 mt-0.5">Transparent Rate on Quotation (ROQ)</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">Live Estimate</span>
                  <div className="text-2xl font-black text-amber-400 tabular-nums">
                    ${calculatedTotal.toFixed(2)}
                  </div>
                </div>
              </div>

              {/* Alert upon submission */}
              {orderSubmittedAlert && (
                <div className="mb-5 bg-emerald-950/80 border border-emerald-500/60 rounded-xl p-4 text-xs text-emerald-200 space-y-1">
                  <div className="flex items-center gap-2 font-bold text-emerald-400 text-sm">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                    <span>Towing Request #{orderSubmittedAlert.id} Logged!</span>
                  </div>
                  <p>Our Oakland dispatcher has received your location and will call your phone number immediately. Keep your phone line open.</p>
                </div>
              )}

              <form onSubmit={handleOrderSubmit} className="space-y-4">
                
                {/* Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Your Name *</label>
                    <input 
                      type="text" 
                      required 
                      value={orderForm.name} 
                      onChange={e => setOrderForm({...orderForm, name: e.target.value})}
                      placeholder="e.g. John Doe" 
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Phone Number *</label>
                    <input 
                      type="tel" 
                      required 
                      value={orderForm.phone} 
                      onChange={e => setOrderForm({...orderForm, phone: e.target.value})}
                      placeholder="e.g. (301) 555-0199" 
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500" 
                    />
                  </div>
                </div>

                {/* Pickup Location */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Current Breakdown Location *</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      required 
                      value={orderForm.location} 
                      onChange={e => setOrderForm({...orderForm, location: e.target.value})}
                      placeholder="e.g. Route 219 North near Deep Creek or Oakland" 
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-8 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500" 
                    />
                    <MapPin className="w-3.5 h-3.5 text-amber-400 absolute left-2.5 top-2.5 pointer-events-none" />
                  </div>
                </div>

                {/* Service Selection */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Service Required</label>
                  <select 
                    value={orderForm.serviceType} 
                    onChange={e => setOrderForm({...orderForm, serviceType: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  >
                    {pricing.map(p => (
                      <option key={p.id} value={p.id}>
                        {p.name} — Base ${p.basePrice.toFixed(2)} {p.perMile > 0 ? `(+ $${p.perMile.toFixed(2)}/mi)` : '(Flat fee)'}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Mileage Range Slider if per-mile fee applies */}
                {selectedService && selectedService.perMile > 0 && (
                  <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-300">Estimated Tow Distance:</span>
                      <span className="font-extrabold text-amber-400 tabular-nums">{orderForm.estimatedMiles} Miles</span>
                    </div>
                    <input 
                      type="range" 
                      min="1" 
                      max="80" 
                      step="1"
                      value={orderForm.estimatedMiles} 
                      onChange={e => setOrderForm({...orderForm, estimatedMiles: Number(e.target.value)})}
                      className="w-full accent-amber-500 bg-slate-800 rounded-lg h-2 cursor-pointer" 
                    />
                    <div className="flex justify-between text-[11px] text-slate-500 pt-1">
                      <button type="button" onClick={() => setOrderForm({...orderForm, estimatedMiles: 5})} className="hover:text-amber-400">5 mi (Local)</button>
                      <button type="button" onClick={() => setOrderForm({...orderForm, estimatedMiles: 15})} className="hover:text-amber-400">15 mi (County)</button>
                      <button type="button" onClick={() => setOrderForm({...orderForm, estimatedMiles: 30})} className="hover:text-amber-400">30 mi (Highway)</button>
                      <button type="button" onClick={() => setOrderForm({...orderForm, estimatedMiles: 60})} className="hover:text-amber-400">60+ mi</button>
                    </div>
                  </div>
                )}

                {/* Vehicle Make/Model & Optional Note */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Vehicle Info (Optional)</label>
                    <input 
                      type="text" 
                      value={orderForm.vehicleInfo} 
                      onChange={e => setOrderForm({...orderForm, vehicleInfo: e.target.value})}
                      placeholder="e.g. 2018 Chevy Silverado" 
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Drop-off Destination (Optional)</label>
                    <input 
                      type="text" 
                      value={orderForm.destination} 
                      onChange={e => setOrderForm({...orderForm, destination: e.target.value})}
                      placeholder="e.g. Dealership or Home" 
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500" 
                    />
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-2">
                  <button 
                    type="submit" 
                    className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 active:scale-[0.99] text-slate-950 font-black py-3 px-4 rounded-xl text-sm shadow-md transition-all cursor-pointer"
                  >
                    <span>Dispatch Tow Rig Now</span>
                    <span className="tabular-nums font-mono">(${calculatedTotal.toFixed(2)})</span>
                  </button>
                  <p className="text-[11px] text-center text-slate-400 mt-2">
                    No upfront credit card required. Driver accepts Cash, Card &amp; Insurance Reimbursements.
                  </p>
                </div>

              </form>
            </div>

          </div>
        </div>
      </section>

      {/* QUICK VALUE PROPOSITIONS & DOMAIN PROOFS */}
      <section className="bg-slate-900 border-b border-slate-800 text-slate-300 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-white text-xs font-bold uppercase tracking-wider">Fast Response</h4>
                <p className="text-[11px] text-slate-400">Units positioned across Garrett Co.</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-white text-xs font-bold uppercase tracking-wider">Modern Flatbeds</h4>
                <p className="text-[11px] text-slate-400">Soft-strap damage-free transport</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-white text-xs font-bold uppercase tracking-wider">Licensed &amp; Insured</h4>
                <p className="text-[11px] text-slate-400">Maryland DOT Compliant LLC</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                <DollarSign className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-white text-xs font-bold uppercase tracking-wider">No Hidden Fees</h4>
                <p className="text-[11px] text-slate-400">Transparent Rate On Quotation</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES & PRICING (ROQ) SECTION */}
      <section id="services" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-1">
              Transparent Pricing Grid
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
              Services &amp; Standard Rates
            </h2>
            <p className="text-slate-600 text-sm mt-2 max-w-2xl">
              All rates are live and managed directly by our Oakland dispatch office. No surge pricing, hidden gate fees, or hookup penalties.
            </p>
          </div>

          {/* Interactive Category Filter (Allowed interactive buttons) */}
          <div className="flex items-center p-1 bg-slate-200/80 rounded-xl border border-slate-300 shrink-0">
            <button 
              onClick={() => setServiceFilter('all')} 
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${serviceFilter === 'all' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
            >
              All Services
            </button>
            <button 
              onClick={() => setServiceFilter('towing')} 
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${serviceFilter === 'towing' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Standard Tow
            </button>
            <button 
              onClick={() => setServiceFilter('roadside')} 
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${serviceFilter === 'roadside' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Roadside
            </button>
            <button 
              onClick={() => setServiceFilter('heavy')} 
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${serviceFilter === 'heavy' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Heavy Duty
            </button>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedServices.map((item) => (
            <div 
              key={item.id} 
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
                    {item.category === 'heavy' ? <Truck className="w-6 h-6" /> : item.category === 'roadside' ? <Wrench className="w-6 h-6" /> : <Car className="w-6 h-6" />}
                  </div>
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    <span>ETA: {item.typicalResponse}</span>
                  </span>
                </div>

                <h3 className="font-bold text-lg text-slate-900 mb-2">{item.name}</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-6">{item.description}</p>
              </div>

              <div className="border-t border-slate-100 pt-4">
                <div className="flex items-baseline justify-between mb-3">
                  <div>
                    <span className="text-2xl font-black text-slate-900 tabular-nums">${item.basePrice.toFixed(2)}</span>
                    <span className="text-xs text-slate-500 ml-1">Base Fee</span>
                  </div>
                  {item.perMile > 0 ? (
                    <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-1 rounded border border-amber-200/60 tabular-nums">
                      +${item.perMile.toFixed(2)} / mile
                    </span>
                  ) : (
                    <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-1 rounded border border-emerald-200/60">
                      Flat Rate
                    </span>
                  )}
                </div>

                <button 
                  onClick={() => {
                    setOrderForm(prev => ({ ...prev, serviceType: item.id }));
                    const el = document.getElementById('dispatch-quote');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full bg-slate-900 hover:bg-slate-800 active:scale-95 text-white font-bold text-xs py-2.5 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Select &amp; Estimate</span>
                  <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* FLEET & OPERATIONS GALLERY */}
      <section id="fleet" className="py-16 md:py-24 bg-slate-100 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-amber-800 mb-1">
                Equipment &amp; Recovery Rigs
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
                Garrett County Fleet Operations
              </h2>
              <p className="text-slate-600 text-sm mt-1">
                Equipped for steep mountain inclines, icy conditions, and heavy transport throughout Western Maryland.
              </p>
            </div>
            
            <span className="text-xs text-slate-500 mt-4 md:mt-0">
              Showing {photos.length} fleet recovery operations
            </span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {photos.map((photo) => (
              <div 
                key={photo.id} 
                onClick={() => setActivePhotoModal(photo)}
                className="group relative rounded-2xl overflow-hidden bg-slate-900 shadow-sm hover:shadow-xl transition-all cursor-pointer aspect-4/3"
              >
                <img 
                  src={photo.url} 
                  alt={photo.caption} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    // Safe fallback container
                    (e.currentTarget as HTMLImageElement).src = HERO_IMAGE;
                  }}
                />
                
                {/* Measured Contrast Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent flex flex-col justify-end p-4">
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider mb-1">
                    {photo.tag || 'Fleet'}
                  </span>
                  <p className="text-white text-xs font-medium leading-snug line-clamp-2">
                    {photo.caption}
                  </p>
                  <div className="flex items-center gap-1 text-[11px] text-slate-300 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Eye className="w-3 h-3 text-amber-400" />
                    <span>Click to inspect</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SERVICE AREA & GARRETT COUNTY COVERAGE */}
      <section id="coverage" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 border border-slate-800 shadow-xl grid md:grid-cols-12 gap-8 items-center">
          
          <div className="md:col-span-7 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 tracking-wide uppercase">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>Garrett County, MD &amp; Tri-State Mountain Corridors</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white">
              Based at 23 N 4th St, Oakland MD — Fast Highway &amp; Mountain Dispatch
            </h2>
            
            <p className="text-slate-300 text-sm leading-relaxed">
              We know Western Maryland mountain roads. Whether you're stuck in winter ice along Route 219, need a long-distance tow down I-68, or require assistance on lakeside secondary roads, our drivers are familiar with every turn in Garrett County.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                <span>Oakland, MD</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                <span>Deep Creek Lake</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                <span>McHenry, MD</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                <span>Mountain Lake Park</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                <span>Loch Lynn Heights</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                <span>Accident, MD</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                <span>Friendsville, MD</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                <span>Grantsville, MD</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                <span>US-219 &amp; I-68 Routes</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-5 bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Compass className="w-4 h-4 text-amber-400" />
              <span>Direct Emergency Contact</span>
            </h3>
            
            <div className="space-y-3 text-xs text-slate-300">
              <div>
                <span className="text-slate-500 block">Physical Dispatch Address:</span>
                <span className="font-semibold text-white">23 N 4th St, Oakland, MD 21550</span>
              </div>
              <div>
                <span className="text-slate-500 block">24-Hour Telephone:</span>
                <a href="tel:+13013342262" className="text-amber-400 font-extrabold text-sm hover:underline">
                  +1 (301) 334-2262
                </a>
              </div>
              <div>
                <span className="text-slate-500 block">Operating Schedule:</span>
                <span className="text-emerald-400 font-semibold">Open 24 Hours / 7 Days a Week / 365 Days</span>
              </div>
            </div>

            <a 
              href="https://maps.google.com/?q=23+N+4th+St,+Oakland,+MD+21550" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-semibold pt-2"
            >
              <span>View Location in Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>
      </section>

      {/* CUSTOMER REVIEWS & TESTIMONIALS */}
      <section id="reviews" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* Left Column: Overall Score & Review Submission */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-amber-800 mb-1">
                Verified Local Feedback
              </div>
              <h2 className="text-3xl font-black text-slate-900">
                Customer Testimonials
              </h2>
              
              <div className="flex items-center gap-3 mt-3">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-500" />
                  ))}
                </div>
                <span className="text-lg font-black text-slate-900 tabular-nums">4.3 / 5.0</span>
                <span className="text-xs text-slate-500">· 29+ Google Reviews</span>
              </div>
              
              <p className="text-slate-600 text-xs mt-2 leading-relaxed">
                Read real accounts from stranded drivers, local residents, and visitors who relied on One Stop Towing.
              </p>
            </div>

            {/* Leave a Guest Review Form */}
            <form onSubmit={handleReviewSubmit} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-amber-600" />
                <span>Submit Your Experience</span>
              </h3>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Your Full Name *</label>
                <input 
                  type="text" 
                  required 
                  value={reviewForm.author} 
                  onChange={e => setReviewForm({...reviewForm, author: e.target.value})}
                  placeholder="e.g. Robinne G." 
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none" 
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Rating</label>
                  <select 
                    value={reviewForm.rating} 
                    onChange={e => setReviewForm({...reviewForm, rating: Number(e.target.value)})}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  >
                    <option value={5}>5 Stars - Excellent</option>
                    <option value={4}>4 Stars - Good</option>
                    <option value={3}>3 Stars - Average</option>
                    <option value={2}>2 Stars - Poor</option>
                    <option value={1}>1 Star - Very Poor</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Service Received</label>
                  <select 
                    value={reviewForm.serviceUsed} 
                    onChange={e => setReviewForm({...reviewForm, serviceUsed: e.target.value})}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  >
                    {pricing.map(p => (
                      <option key={p.id} value={p.name}>{p.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Your Comments *</label>
                <textarea 
                  required 
                  rows={3} 
                  value={reviewForm.comment} 
                  onChange={e => setReviewForm({...reviewForm, comment: e.target.value})}
                  placeholder="How was the response time and driver courtesy?" 
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none" 
                />
              </div>

              <button 
                type="submit" 
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-lg text-xs transition-colors"
              >
                Post Review
              </button>

              {reviewSubmitted && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-2.5 rounded-lg text-xs flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Thank you! Your feedback has been published.</span>
                </div>
              )}
            </form>

          </div>

          {/* Right Column: Review List */}
          <div className="lg:col-span-7 space-y-4">
            {reviews.filter(r => r.status === 'approved').map((rev) => (
              <div key={rev.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-xs">
                      {rev.author.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{rev.author}</h4>
                      {rev.serviceUsed && (
                        <p className="text-[11px] text-slate-500">{rev.serviceUsed}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex text-amber-500 justify-end">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                      ))}
                    </div>
                    <span className="text-[11px] text-slate-400 mt-0.5 inline-block">{rev.date}</span>
                  </div>
                </div>

                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
                  "{rev.comment}"
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="mt-auto bg-slate-950 text-slate-400 py-14 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-12 gap-8 mb-10">
            
            {/* Col 1: Brand & Identity */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <img 
                  src={logo} 
                  alt="One Stop Towing" 
                  referrerPolicy="no-referrer"
                  className="h-10 w-10 rounded-full object-cover border border-amber-500/40 bg-slate-900" 
                />
                <div>
                  <span className="text-white font-black text-base uppercase block">One Stop Towing</span>
                  <span className="text-xs text-amber-400 font-semibold block">&amp; Transport LLC</span>
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                Premier 24-hour towing and roadside recovery operations based in Oakland, Maryland. Serving Garrett County mountain highways, Deep Creek Lake, and US-219.
              </p>
            </div>

            {/* Col 2: Services Quick Links */}
            <div className="md:col-span-3 space-y-2">
              <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-2">Capabilities</h4>
              <ul className="space-y-1.5 text-xs">
                <li><a href="#services" className="hover:text-amber-400 transition-colors">Flatbed Rollback Towing</a></li>
                <li><a href="#services" className="hover:text-amber-400 transition-colors">Heavy Duty Commercial Transport</a></li>
                <li><a href="#services" className="hover:text-amber-400 transition-colors">Battery Jump Starts &amp; Diagnostics</a></li>
                <li><a href="#services" className="hover:text-amber-400 transition-colors">Damage-Free Vehicle Lockouts</a></li>
                <li><a href="#services" className="hover:text-amber-400 transition-colors">Emergency Fuel Delivery</a></li>
              </ul>
            </div>

            {/* Col 3: Contact & Manager Portal Action */}
            <div className="md:col-span-4 space-y-4">
              <h4 className="text-white text-xs font-bold uppercase tracking-wider">Garrett County Office</h4>
              <div className="text-xs space-y-1 text-slate-300">
                <p>23 N 4th St, Oakland, MD 21550</p>
                <p>24/7 Telephone: <a href="tel:+13013342262" className="text-amber-400 font-bold hover:underline">(301) 334-2262</a></p>
                <p>Hours: Open 24/7/365</p>
              </div>

              <div>
                <button 
                  onClick={() => setIsManagerOpen(true)}
                  className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white px-4 py-2 rounded-lg text-xs border border-slate-700 transition-colors"
                >
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Manager Control Panel</span>
                </button>
              </div>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <p>© {new Date().getFullYear()} One Stop Towing &amp; Transport LLC. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <span>Licensed &amp; Insured in MD</span>
              <span aria-hidden="true">·</span>
              <span>USDOT Compliant</span>
            </div>
          </div>
        </div>
      </footer>

      {/* FULL PHOTO LIGHTBOX MODAL */}
      {activePhotoModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActivePhotoModal(null)}
        >
          <div 
            className="bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl relative"
            onClick={e => e.stopPropagation()}
          >
            <button 
              onClick={() => setActivePhotoModal(null)}
              className="absolute top-3 right-3 bg-slate-950/80 hover:bg-slate-800 text-white p-2 rounded-full z-10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="aspect-16/9 w-full bg-black">
              <img 
                src={activePhotoModal.url} 
                alt={activePhotoModal.caption} 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="p-4 bg-slate-950 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                  {activePhotoModal.tag}
                </span>
                <p className="text-white text-xs sm:text-sm font-medium mt-0.5">
                  {activePhotoModal.caption}
                </p>
              </div>
              <button 
                onClick={() => setActivePhotoModal(null)}
                className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MANAGER CONTROL PANEL OVERLAY */}
      {isManagerOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 text-white rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
            
            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
                  <Settings className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-white">Manager Dispatch Console</h3>
                  <p className="text-[11px] text-slate-400">One Stop Towing &amp; Transport LLC &bull; Oakland MD</p>
                </div>
              </div>
              <button 
                onClick={() => setIsManagerOpen(false)} 
                className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content: Login or Dashboard */}
            {!isAuthenticated ? (
              <div className="p-8 sm:p-12 max-w-md mx-auto w-full text-center space-y-6">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto border border-amber-500/20">
                  <Key className="w-7 h-7" />
                </div>
                
                <div>
                  <h4 className="text-xl font-bold text-white mb-1">Enter Manager Security PIN</h4>
                  <p className="text-slate-400 text-xs">
                    Access live dispatch orders, ROQ price tables, photo gallery &amp; customer logs.
                  </p>
                  <p className="text-[11px] text-amber-400/90 font-mono mt-1">Default PIN: 1234</p>
                </div>

                <form onSubmit={handlePinSubmit} className="space-y-4">
                  <div>
                    <input 
                      type="password" 
                      maxLength={8} 
                      autoFocus
                      value={pinInput} 
                      onChange={e => setPinInput(e.target.value)} 
                      placeholder="••••" 
                      className="w-full text-center text-3xl font-mono tracking-widest bg-slate-950 border border-slate-700 rounded-xl py-3 text-white focus:outline-none focus:border-amber-500"
                    />
                    {pinError && <p className="text-xs text-rose-400 font-medium mt-2">{pinError}</p>}
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black py-3 rounded-xl transition-all cursor-pointer shadow-lg text-sm"
                  >
                    Unlock Manager Panel
                  </button>
                </form>
              </div>
            ) : (
              <div className="flex flex-col flex-1 overflow-hidden">
                
                {/* Manager Navigation Bar */}
                <div className="flex border-b border-slate-800 bg-slate-950 px-2 overflow-x-auto">
                  <button 
                    onClick={() => setActiveTab('orders')} 
                    className={`px-4 py-3 text-xs font-bold flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors ${activeTab === 'orders' ? 'border-amber-500 text-amber-400 bg-slate-900/60' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
                  >
                    <Truck className="w-4 h-4" />
                    <span>Orders &amp; Dispatch ({orders.length})</span>
                  </button>

                  <button 
                    onClick={() => setActiveTab('pricing')} 
                    className={`px-4 py-3 text-xs font-bold flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors ${activeTab === 'pricing' ? 'border-amber-500 text-amber-400 bg-slate-900/60' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
                  >
                    <DollarSign className="w-4 h-4" />
                    <span>Rates / ROQ Pricing</span>
                  </button>

                  <button 
                    onClick={() => setActiveTab('photos')} 
                    className={`px-4 py-3 text-xs font-bold flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors ${activeTab === 'photos' ? 'border-amber-500 text-amber-400 bg-slate-900/60' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
                  >
                    <ImageIcon className="w-4 h-4" />
                    <span>Fleet Gallery ({photos.length})</span>
                  </button>

                  <button 
                    onClick={() => setActiveTab('reviews')} 
                    className={`px-4 py-3 text-xs font-bold flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors ${activeTab === 'reviews' ? 'border-amber-500 text-amber-400 bg-slate-900/60' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Reviews Moderation</span>
                  </button>

                  <button 
                    onClick={() => setActiveTab('pin')} 
                    className={`px-4 py-3 text-xs font-bold flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors ${activeTab === 'pin' ? 'border-amber-500 text-amber-400 bg-slate-900/60' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
                  >
                    <Key className="w-4 h-4" />
                    <span>Security PIN</span>
                  </button>

                  <div className="ml-auto flex items-center pr-2">
                    <button 
                      onClick={() => setIsAuthenticated(false)} 
                      className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-slate-800 transition-colors"
                      title="Lock console"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Lock</span>
                    </button>
                  </div>
                </div>

                {/* Tab Content Area */}
                <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
                  
                  {/* TAB 1: ORDERS / DISPATCH */}
                  {activeTab === 'orders' && (
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                          <h4 className="text-sm font-extrabold text-white">Customer Towing &amp; Roadside Dispatch Orders</h4>
                          <p className="text-xs text-slate-400">Live requests logged through the web quote calculator</p>
                        </div>

                        {/* Order Status Filters */}
                        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
                          {(['all', 'Pending', 'Dispatched', 'Completed', 'Cancelled'] as const).map(st => (
                            <button
                              key={st}
                              onClick={() => setOrderStatusFilter(st)}
                              className={`px-2.5 py-1 text-[11px] font-semibold rounded ${orderStatusFilter === st ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
                            >
                              {st === 'all' ? 'All' : st}
                            </button>
                          ))}
                        </div>
                      </div>

                      {displayedOrders.length === 0 ? (
                        <div className="bg-slate-950 border border-slate-800 rounded-xl p-8 text-center text-xs text-slate-500">
                          No orders match the selected filter.
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {displayedOrders.map((ord) => (
                            <div 
                              key={ord.id} 
                              className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4"
                            >
                              <div className="space-y-1.5">
                                <div className="flex items-center gap-3">
                                  <span className="font-mono text-xs font-bold text-amber-400">{ord.id}</span>
                                  <span className="text-[11px] text-slate-400">{ord.createdAt}</span>
                                  <span className={`text-[10px] uppercase font-black px-2 py-0.5 rounded ${
                                    ord.status === 'Completed' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                                    ord.status === 'Dispatched' ? 'bg-blue-950 text-blue-400 border border-blue-800' :
                                    ord.status === 'Cancelled' ? 'bg-rose-950 text-rose-400 border border-rose-800' :
                                    'bg-amber-950 text-amber-400 border border-amber-800'
                                  }`}>
                                    {ord.status}
                                  </span>
                                </div>

                                <div className="text-sm font-bold text-white flex items-center gap-2">
                                  <span>{ord.name}</span>
                                  <span aria-hidden="true" className="text-slate-600">&bull;</span>
                                  <a href={`tel:${ord.phone}`} className="text-amber-400 hover:underline flex items-center gap-1 font-semibold text-xs">
                                    <Phone className="w-3 h-3" />
                                    <span>{ord.phone}</span>
                                  </a>
                                </div>

                                <div className="text-xs text-slate-300">
                                  <span className="text-slate-400">Pickup:</span> {ord.location} 
                                  {ord.destination && ord.destination !== 'Requested drop-off / TBD' && (
                                    <> &rarr; <span className="text-slate-400">Dropoff:</span> {ord.destination}</>
                                  )}
                                </div>

                                <div className="text-[11px] text-slate-400">
                                  Service: <span className="text-white font-medium">{ord.serviceName}</span>
                                  {ord.estimatedMiles > 0 && <span> ({ord.estimatedMiles} miles)</span>}
                                  {ord.vehicleInfo && <span> &bull; Vehicle: {ord.vehicleInfo}</span>}
                                </div>

                                {ord.notes && (
                                  <div className="text-[11px] text-amber-200/80 bg-amber-950/40 p-2 rounded border border-amber-900/40">
                                    Note: {ord.notes}
                                  </div>
                                )}
                              </div>

                              {/* Controls */}
                              <div className="flex items-center gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-800">
                                <div className="text-right mr-2">
                                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Quote</div>
                                  <div className="text-lg font-black text-amber-400 tabular-nums">
                                    ${ord.totalCost.toFixed(2)}
                                  </div>
                                </div>

                                <select 
                                  value={ord.status} 
                                  onChange={(e) => handleUpdateOrderStatus(ord.id, e.target.value as DispatchOrder['status'])}
                                  className="bg-slate-900 border border-slate-700 text-xs text-white rounded-lg p-2 focus:outline-none focus:border-amber-500"
                                >
                                  <option value="Pending">Pending</option>
                                  <option value="Dispatched">Dispatched</option>
                                  <option value="Completed">Completed</option>
                                  <option value="Cancelled">Cancelled</option>
                                </select>

                                <button 
                                  onClick={() => handleDeleteOrder(ord.id)} 
                                  className="text-slate-400 hover:text-rose-400 p-2 rounded hover:bg-slate-900 transition-colors"
                                  title="Delete order record"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* TAB 2: ROQ PRICING EDIT */}
                  {activeTab === 'pricing' && (
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-extrabold text-white">Rate on Quotation (ROQ) Pricing Engine</h4>
                        <p className="text-xs text-slate-400">
                          Changes update instantly across customer pricing cards and the live dispatch quote calculator.
                        </p>
                      </div>

                      <div className="grid gap-3">
                        {pricing.map((p) => (
                          <div 
                            key={p.id} 
                            className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                          >
                            <div className="max-w-md">
                              <div className="text-sm font-bold text-white">{p.name}</div>
                              <div className="text-xs text-slate-400 mt-0.5">{p.description}</div>
                              <div className="text-[11px] text-amber-400 mt-1">Typical ETA: {p.typicalResponse}</div>
                            </div>

                            <div className="flex items-center gap-3">
                              {editingPriceId === p.id ? (
                                <div className="flex items-center gap-2 bg-slate-900 p-2 rounded-lg border border-slate-700">
                                  <div>
                                    <span className="text-[10px] text-slate-400 block">Base $</span>
                                    <input 
                                      type="number" 
                                      value={tempBasePrice}
                                      onChange={e => setTempBasePrice(parseFloat(e.target.value) || 0)}
                                      className="w-20 bg-slate-950 border border-slate-700 px-2 py-1 text-xs text-white rounded"
                                    />
                                  </div>
                                  <div>
                                    <span className="text-[10px] text-slate-400 block">Per Mile $</span>
                                    <input 
                                      type="number" 
                                      step="0.5"
                                      value={tempPerMile}
                                      onChange={e => setTempPerMile(parseFloat(e.target.value) || 0)}
                                      className="w-20 bg-slate-950 border border-slate-700 px-2 py-1 text-xs text-white rounded"
                                    />
                                  </div>
                                  <button 
                                    onClick={() => saveEditPrice(p.id)}
                                    className="bg-emerald-600 hover:bg-emerald-500 text-white p-2 rounded font-bold transition-colors mt-3"
                                    title="Save changes"
                                  >
                                    <Check className="w-4 h-4" />
                                  </button>
                                  <button 
                                    onClick={() => setEditingPriceId(null)}
                                    className="bg-slate-800 hover:bg-slate-700 text-slate-300 p-2 rounded font-bold transition-colors mt-3"
                                    title="Cancel"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                </div>
                              ) : (
                                <>
                                  <div className="text-right">
                                    <div className="text-sm text-amber-400 font-extrabold tabular-nums">
                                      ${p.basePrice.toFixed(2)} Base
                                    </div>
                                    <div className="text-[11px] text-slate-400 tabular-nums">
                                      {p.perMile > 0 ? `+$${p.perMile.toFixed(2)}/mile` : 'Flat Rate'}
                                    </div>
                                  </div>
                                  <button 
                                    onClick={() => startEditPrice(p)} 
                                    className="bg-slate-800 hover:bg-slate-700 p-2 rounded-lg text-slate-300 hover:text-white transition-colors"
                                    title="Edit price rates"
                                  >
                                    <Edit3 className="w-4 h-4" />
                                  </button>
                                </>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TAB 3: PHOTOS */}
                  {activeTab === 'photos' && (
                    <div className="space-y-6">
                      <form onSubmit={handleAddPhoto} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                        <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                          Add New Fleet Operation Photo
                        </h4>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <input 
                            type="url" 
                            required 
                            placeholder="Image URL (https://...)" 
                            value={newPhotoUrl} 
                            onChange={e => setNewPhotoUrl(e.target.value)}
                            className="sm:col-span-2 bg-slate-900 border border-slate-700 px-3 py-2 text-xs text-white rounded-lg focus:outline-none focus:border-amber-500" 
                          />
                          <input 
                            type="text" 
                            placeholder="Tag (e.g. Heavy Duty)" 
                            value={newPhotoTag} 
                            onChange={e => setNewPhotoTag(e.target.value)}
                            className="bg-slate-900 border border-slate-700 px-3 py-2 text-xs text-white rounded-lg focus:outline-none focus:border-amber-500" 
                          />
                        </div>

                        <div className="flex gap-3">
                          <input 
                            type="text" 
                            placeholder="Caption describing equipment or operation location" 
                            value={newPhotoCaption} 
                            onChange={e => setNewPhotoCaption(e.target.value)}
                            className="flex-1 bg-slate-900 border border-slate-700 px-3 py-2 text-xs text-white rounded-lg focus:outline-none focus:border-amber-500" 
                          />
                          <button 
                            type="submit" 
                            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2 rounded-lg text-xs transition-colors shrink-0"
                          >
                            Add to Gallery
                          </button>
                        </div>
                      </form>

                      <div>
                        <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                          Current Gallery Images ({photos.length})
                        </h5>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          {photos.map((p) => (
                            <div key={p.id} className="relative group bg-slate-950 rounded-xl overflow-hidden border border-slate-800 aspect-video">
                              <img src={p.url} alt={p.caption} className="h-full w-full object-cover" />
                              <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2 text-center">
                                <p className="text-[10px] text-white line-clamp-2">{p.caption}</p>
                              </div>
                              <button 
                                onClick={() => handleDeletePhoto(p.id)} 
                                className="absolute top-1.5 right-1.5 bg-rose-600 hover:bg-rose-500 text-white p-1 rounded-full shadow"
                                title="Remove photo"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 4: REVIEWS MODERATION */}
                  {activeTab === 'reviews' && (
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-extrabold text-white">Customer Reviews Moderation</h4>
                        <p className="text-xs text-slate-400">Manage public testimonial visibility</p>
                      </div>

                      <div className="space-y-3">
                        {reviews.map((r) => (
                          <div key={r.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between gap-4">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-sm text-white">{r.author}</span>
                                <span className="text-amber-400 text-xs font-bold">★ {r.rating}/5</span>
                                <span className="text-[11px] text-slate-500">· {r.date}</span>
                              </div>
                              <p className="text-xs text-slate-300 mt-1">"{r.comment}"</p>
                            </div>

                            <button 
                              onClick={() => setReviews(reviews.filter(x => x.id !== r.id))}
                              className="text-slate-400 hover:text-rose-400 p-2 rounded hover:bg-slate-900 transition-colors shrink-0"
                              title="Delete review"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TAB 5: SECURITY PIN */}
                  {activeTab === 'pin' && (
                    <div className="max-w-md space-y-4">
                      <div>
                        <h4 className="text-sm font-extrabold text-white">Manager Security PIN</h4>
                        <p className="text-xs text-slate-400">Change the passcode required to access this control panel.</p>
                      </div>

                      <form onSubmit={handlePinChange} className="space-y-4 bg-slate-950 p-5 rounded-xl border border-slate-800">
                        <div>
                          <label className="block text-xs text-slate-400 mb-1">New PIN Code (min 4 digits)</label>
                          <input 
                            type="password" 
                            maxLength={8} 
                            required
                            value={newPin} 
                            onChange={e => setNewPin(e.target.value)} 
                            placeholder="Enter new PIN" 
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-amber-500"
                          />
                        </div>

                        <button 
                          type="submit" 
                          className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2.5 rounded-lg text-xs transition-colors cursor-pointer"
                        >
                          Update Security PIN
                        </button>

                        {pinChangeSuccess && (
                          <div className="bg-emerald-950/60 border border-emerald-500/60 text-emerald-300 p-2 rounded text-xs flex items-center gap-1.5">
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Security PIN updated successfully!</span>
                          </div>
                        )}
                      </form>

                      {/* Reset to defaults helper */}
                      <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 text-xs text-slate-400 space-y-2">
                        <span className="font-semibold text-slate-300 block">Restore Default Rates:</span>
                        <p className="text-[11px]">If you ever want to reset prices and fleet photos back to initial defaults:</p>
                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm("Reset all rates and gallery photos to default settings?")) {
                              setPricing(INITIAL_PRICING);
                              setPhotos(INITIAL_PHOTOS);
                              localStorage.removeItem('ost_pricing');
                              localStorage.removeItem('ost_photos');
                            }
                          }}
                          className="text-xs text-amber-400 hover:text-amber-300 font-semibold underline"
                        >
                          Reset to Initial Oakland Rates &amp; Gallery
                        </button>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}

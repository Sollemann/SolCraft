import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { InteractiveShoeAnatomy } from './components/InteractiveShoeAnatomy';
import { MaterialShowcase } from './components/MaterialShowcase';
import { BeforeAfterGallery } from './components/BeforeAfterGallery';
import { PickupDeliverySection } from './components/PickupDeliverySection';
import { WhatsAppShowcaseSection } from './components/WhatsAppShowcaseSection';
import { BookingWizard } from './components/BookingWizard';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminDashboard } from './components/AdminDashboard';
import { Footer } from './components/Footer';

import { INITIAL_SAMPLE_ORDERS } from './data/sampleOrders';
import { DamageItem, PremiumMaterial, RepairOrder } from './types/shoe';

export default function App() {
  const [orders, setOrders] = useState<RepairOrder[]>(() => {
    const saved = localStorage.getItem('solcraft_orders');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_SAMPLE_ORDERS;
      }
    }
    return INITIAL_SAMPLE_ORDERS;
  });

  const [selectedDamages, setSelectedDamages] = useState<DamageItem[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<PremiumMaterial[]>([]);
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState<boolean>(false);
  const [activeTrackingCode, setActiveTrackingCode] = useState<string>('SC-88341');

  // Admin authentication state
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('solcraft_admin_session') === 'true';
  });
  const [adminEmail, setAdminEmail] = useState<string>('50zarwtn50@gmail.com');
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState<boolean>(false);

  // Sync orders to localStorage whenever updated
  useEffect(() => {
    try {
      localStorage.setItem('solcraft_orders', JSON.stringify(orders));
    } catch (e) {
      // ignore
    }
  }, [orders]);

  // Listen for hidden admin access via shortcut (Ctrl+Shift+A or Cmd+Shift+A) or URL param
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        if (isAdminLoggedIn) {
          setIsAdminLoggedIn(true);
        } else {
          setIsAdminLoginOpen(true);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Check URL query param ?admin=true or hash #admin
    if (
      window.location.search.includes('admin') ||
      window.location.hash.includes('admin')
    ) {
      if (!isAdminLoggedIn) {
        setIsAdminLoginOpen(true);
      }
    }

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAdminLoggedIn]);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectDamageForBooking = (damage: DamageItem) => {
    if (selectedDamages.some((d) => d.id === damage.id)) {
      setSelectedDamages(selectedDamages.filter((d) => d.id !== damage.id));
    } else {
      setSelectedDamages([...selectedDamages, damage]);
    }
    // Open booking modal with preselected damage
    setIsBookingOpen(true);
  };

  const handleToggleMaterialAddon = (mat: PremiumMaterial) => {
    if (selectedMaterials.some((m) => m.id === mat.id)) {
      setSelectedMaterials(selectedMaterials.filter((m) => m.id !== mat.id));
    } else {
      setSelectedMaterials([...selectedMaterials, mat]);
    }
  };

  const handleOrderCreated = (newOrder: RepairOrder) => {
    setOrders([newOrder, ...orders]);
    setActiveTrackingCode(newOrder.trackingCode);
  };

  const handleUpdateOrder = (updatedOrder: RepairOrder) => {
    setOrders(orders.map((o) => (o.id === updatedOrder.id ? updatedOrder : o)));
  };

  const handleAddNewManualOrder = (newOrder: RepairOrder) => {
    setOrders([newOrder, ...orders]);
  };

  const handleLoginSuccess = (email: string) => {
    setAdminEmail(email);
    setIsAdminLoggedIn(true);
    localStorage.setItem('solcraft_admin_session', 'true');
  };

  const handleLogoutAdmin = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('solcraft_admin_session');
    // clean url hash if present
    if (window.location.hash.includes('admin')) {
      window.history.replaceState(null, '', window.location.pathname);
    }
  };

  // If Admin is currently logged in, show the full Admin Dashboard
  if (isAdminLoggedIn) {
    return (
      <AdminDashboard
        orders={orders}
        onUpdateOrder={handleUpdateOrder}
        onAddNewOrder={handleAddNewManualOrder}
        onLogout={handleLogoutAdmin}
        adminEmail={adminEmail}
      />
    );
  }

  // Public Facing Application
  return (
    <div className="min-h-screen bg-[#0E0F12] text-[#E5E5E2] font-sans antialiased flex flex-col selection:bg-[#D4A373] selection:text-[#0E0F12]">
      {/* Top Bar Navigation (Clean public navigation - no admin link shown) */}
      <Navbar
        onNavigate={scrollToSection}
        onOpenBooking={() => setIsBookingOpen(true)}
        onOpenTracking={() => setIsTrackingOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onStartDiagnostic={() => scrollToSection('diagnosa-anatomi')}
          onOpenBooking={() => setIsBookingOpen(true)}
          onOpenTracking={() => setIsTrackingOpen(true)}
        />

        {/* 1. Interactive Shoe Anatomy & Clinical Damage Diagnostics per Part */}
        <InteractiveShoeAnatomy
          onSelectDamageForBooking={handleSelectDamageForBooking}
          selectedDamagesList={selectedDamages}
        />

        {/* 2. Premium Materials Showcase & Durability Guarantees */}
        <MaterialShowcase
          onToggleMaterialAddon={handleToggleMaterialAddon}
          selectedMaterialsList={selectedMaterials}
        />

        {/* 3. Before & After Case Studies & Restoration Craftsmanship */}
        <BeforeAfterGallery />

        {/* 4. Safe Pickup & Delivery Logistics with Tamper-Evident Safety Boxes */}
        <PickupDeliverySection
          onOpenBooking={() => setIsBookingOpen(true)}
          onOpenTracking={() => setIsTrackingOpen(true)}
        />

        {/* 5. Real-Time WhatsApp Direct Notifications Experience */}
        <WhatsAppShowcaseSection
          onOpenTracking={() => setIsTrackingOpen(true)}
          onOpenBooking={() => setIsBookingOpen(true)}
        />
      </main>

      {/* Footer with Discreet Staff Access Trigger */}
      <Footer
        onNavigate={scrollToSection}
        onOpenBooking={() => setIsBookingOpen(true)}
        onOpenTracking={() => setIsTrackingOpen(true)}
        onOpenAdminLogin={() => setIsAdminLoginOpen(true)}
      />

      {/* Online Booking Wizard Modal */}
      <BookingWizard
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        onOrderCreated={handleOrderCreated}
        preselectedDamages={selectedDamages}
      />

      {/* Real-time Order Tracking & WhatsApp Timeline Modal */}
      <OrderTrackingModal
        isOpen={isTrackingOpen}
        onClose={() => setIsTrackingOpen(false)}
        orders={orders}
        selectedTrackingCode={activeTrackingCode}
      />

      {/* Discreet Admin Login Modal (Triggerable via Footer lock button, shortcut Ctrl+Shift+A, or ?admin=true) */}
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}

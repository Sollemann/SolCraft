export type ShoePartId =
  | 'outsole'
  | 'midsole'
  | 'upper'
  | 'insole'
  | 'heel'
  | 'toecap'
  | 'lining_stitching'
  | 'hardware_eyelet'
  | 'tongue_collar'
  | 'deep_care_patina';

export type ShoeCategory =
  | 'sneakers'
  | 'leather_boots'
  | 'dress_shoes'
  | 'running_performance'
  | 'luxury_heels';

export type DamageSeverity = 'ringan' | 'sedang' | 'berat' | 'kritis';

export interface DamageItem {
  id: string;
  partId: ShoePartId;
  title: string;
  subtitle: string;
  description: string;
  symptoms: string[];
  severity: DamageSeverity;
  estimatedCost: number; // in IDR
  estimatedDuration: string; // e.g. "2-3 Hari"
  recommendedMaterials: string[];
  restorationTechnique: string;
  shoeCompatibility: ShoeCategory[];
  warrantyMonths: number;
}

export interface PremiumMaterial {
  id: string;
  name: string;
  category: 'sol' | 'perekat' | 'jahitan' | 'perawatan' | 'cushion' | 'hardware';
  brand: string;
  origin: string; // e.g. "Italia", "Inggris", "Jerman", "Prancis", "Amerika Serikat"
  tagline: string;
  description: string;
  priceAddon: number;
  warrantyPeriod: string;
  durabilityRating: number; // 1-10
  keyAdvantages: string[];
  idealFor: string;
}

export type PickupMethod =
  | 'solcraft_courier'
  | 'instant_courier'
  | 'national_expedition'
  | 'atelier_dropoff';

export type PaymentMethod =
  | 'qris'
  | 'va_bca'
  | 'va_mandiri'
  | 'va_bri'
  | 'credit_card'
  | 'split_qc';

export type OrderStatusStep =
  | 'booking_confirmed'
  | 'pickup_scheduled'
  | 'courier_picked_up'
  | 'arrived_atelier'
  | 'visual_inspection'
  | 'cobbler_repair'
  | 'qc_passed'
  | 'secure_packaging'
  | 'delivered';

export interface TimelineEvent {
  step: OrderStatusStep;
  title: string;
  description: string;
  timestamp: string;
  completed: boolean;
  cobblerNote?: string;
  mediaUrl?: string;
}

export interface RepairOrder {
  id: string;
  trackingCode: string;
  customerName: string;
  phoneNumber: string;
  whatsappNumber: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  notes: string;
  shoeBrandModel: string;
  shoeCategory: ShoeCategory;
  shoeColor: string;
  selectedDamages: DamageItem[];
  selectedMaterials: PremiumMaterial[];
  pickupMethod: PickupMethod;
  pickupDate: string;
  pickupTimeSlot: string;
  paymentMethod: PaymentMethod;
  paymentStatus: 'pending' | 'dp_paid' | 'paid';
  totalPrice: number;
  createdAt: string;
  currentStatus: OrderStatusStep;
  timeline: TimelineEvent[];
  whatsappNotificationsEnabled: boolean;
  customerPhotos?: string[];
  mapsUrl?: string;
  locationPin?: {
    lat: number;
    lng: number;
    addressDetail?: string;
  };
}

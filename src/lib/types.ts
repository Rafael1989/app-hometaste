// ============================================
// USER & AUTH TYPES
// ============================================

export type UserRole = 'customer' | 'chef' | 'delivery';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  role: UserRole;
  location: {
    address: string;
    lat: number;
    lng: number;
    city: string;
    state: string;
  };
  createdAt: Date;
}

export interface Chef extends User {
  role: 'chef';
  rating: number;
  totalReviews: number;
  totalOrders: number;
  acceptsEatIn: boolean;
  bio?: string;
  specialties: string[];
}

export interface DeliveryPerson extends User {
  role: 'delivery';
  rating: number;
  totalDeliveries: number;
  vehicleType: 'bike' | 'motorcycle' | 'car';
  isAvailable: boolean;
  totalEarnings: number;
}

export interface Customer extends User {
  role: 'customer';
  favoriteChefs: string[];
  orderHistory: string[];
}

// ============================================
// DISH TYPES
// ============================================

export interface Dish {
  id: string;
  chefId: string;
  chef: {
    id: string;
    name: string;
    avatar: string;
    rating: number;
    totalReviews: number;
    location: string;
    distance: number;
  };
  name: string;
  description: string;
  price: number;
  photo: string;
  category: string;
  availableDate: string;
  availableTime: string;
  eatInAvailable: boolean;
  deliveryAvailable: boolean;
  preparationTime: number;
  isActive: boolean;
  createdAt: Date;
}

export type DishCategory = 
  | 'Brasileira' 
  | 'Italiana' 
  | 'Asiática' 
  | 'Vegetariana' 
  | 'Sobremesas'
  | 'Mexicana'
  | 'Árabe';

// ============================================
// ORDER TYPES
// ============================================

export type DeliveryOption = 'delivery' | 'eat-in';

export type OrderStatus = 
  | 'pending'       // Aguardando aceitação da cozinheira
  | 'accepted'      // Aceito pela cozinheira
  | 'preparing'     // Em preparo
  | 'ready'         // Pronto para entrega/retirada
  | 'delivering'    // Em rota de entrega
  | 'completed'     // Entregue/Concluído
  | 'cancelled';    // Cancelado

export interface Order {
  id: string;
  customerId: string;
  customer: {
    name: string;
    phone: string;
    avatar?: string;
    location: {
      address: string;
      lat: number;
      lng: number;
    };
  };
  dishId: string;
  dish: Dish;
  chefId: string;
  deliveryOption: DeliveryOption;
  status: OrderStatus;
  quantity: number;
  totalPrice: number;
  
  // Delivery info
  deliveryPersonId?: string;
  deliveryPerson?: {
    name: string;
    phone: string;
    avatar?: string;
    vehicleType: string;
  };
  
  // Payment
  paymentMethod: 'card' | 'pix' | 'cash';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  
  // Timestamps
  createdAt: Date;
  acceptedAt?: Date;
  readyAt?: Date;
  deliveredAt?: Date;
  
  // Notes
  customerNotes?: string;
  chefNotes?: string;
}

// ============================================
// DELIVERY TYPES
// ============================================

export interface DeliveryTask {
  id: string;
  orderId: string;
  order: Order;
  deliveryPersonId?: string;
  status: 'available' | 'accepted' | 'picking_up' | 'in_transit' | 'delivered';
  pickupLocation: {
    address: string;
    lat: number;
    lng: number;
  };
  deliveryLocation: {
    address: string;
    lat: number;
    lng: number;
  };
  distance: number; // em km
  estimatedTime: number; // em minutos
  deliveryFee: number;
  acceptedAt?: Date;
  pickedUpAt?: Date;
  deliveredAt?: Date;
}

// ============================================
// REVIEW TYPES
// ============================================

export interface Review {
  id: string;
  orderId: string;
  customerId: string;
  customer: {
    name: string;
    avatar?: string;
  };
  targetType: 'chef' | 'delivery';
  targetId: string;
  rating: number; // 1-5
  comment?: string;
  photos?: string[];
  createdAt: Date;
}

// ============================================
// NOTIFICATION TYPES
// ============================================

export interface Notification {
  id: string;
  userId: string;
  type: 'order' | 'delivery' | 'review' | 'system';
  title: string;
  message: string;
  read: boolean;
  actionUrl?: string;
  createdAt: Date;
}

// ============================================
// STATS TYPES
// ============================================

export interface ChefStats {
  totalOrders: number;
  totalEarnings: number;
  averageRating: number;
  totalReviews: number;
  activeOrders: number;
  completedToday: number;
}

export interface DeliveryStats {
  totalDeliveries: number;
  totalEarnings: number;
  averageRating: number;
  availableDeliveries: number;
  completedToday: number;
  distanceTraveled: number;
}

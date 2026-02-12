export type OrderStatus = 'Pending' | 'In Progress' | 'Ready';

export type ItemType = 'Shirt' | 'Pant' | 'Kurta' | 'Suit' | 'Blazer' | 'Sherwani' | 'Other';

export interface UpperBodyMeasurements {
  length: string;
  chest: string;
  waist: string;
  seat: string;
  front: string;
  shoulder: string;
  fullHandCuff: string;
  halfHandLength: string;
  collar: string;
  cutFront: string;
  style: string;
}

export interface LowerBodyMeasurements {
  length: string;
  bottom: string;
  thigh: string;
  knee: string;
  seat: string;
  mode: string;
  frontRiseBackRise: string;
  bottomWidth: string;
  waistHeight: string;
}

export interface LocalOrder {
  id: string; // Local UUID
  orderId: string; // Display ID
  
  // Customer Details
  customerName: string;
  mobileNumber: string;
  address: string;
  
  // Order Details
  itemType: ItemType;
  quantity: number;
  orderDate: string;
  deliveryDate: string;
  totalAmount: number;
  paidAmount: number;
  remainingAmount: number;
  status: OrderStatus;
  
  // Measurements
  upperBody: UpperBodyMeasurements;
  lowerBody: LowerBodyMeasurements;
  
  // Sync metadata
  syncStatus: 'pending' | 'synced' | 'error';
  lastModified: number;
  backendId?: bigint;
  pendingDelete?: boolean; // Tombstone flag for deleted orders
  lastSyncError?: string;
}

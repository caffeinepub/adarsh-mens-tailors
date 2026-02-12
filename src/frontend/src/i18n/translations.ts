export type Language = 'en' | 'mr';

export const translations = {
  en: {
    // App Header
    appName: 'Adarsh Mens Tailors',
    appSubtitle: 'Order Management',
    signOut: 'Sign Out',
    
    // Login Screen
    loginTitle: 'Adarsh Mens Tailors',
    loginDescription: 'Admin access required to manage orders',
    signInButton: 'Sign in as Admin',
    signingIn: 'Signing in...',
    loginFooter: 'This app is for authorized administrators only',
    
    // Access Denied Screen
    accessDeniedTitle: 'Access Denied',
    accessDeniedDescription: "You don't have permission to access this application",
    accessDeniedMessage1: 'This application is restricted to authorized administrators only.',
    accessDeniedMessage2: 'Please contact the system administrator if you believe you should have access.',
    
    // Orders List Page
    searchPlaceholder: 'Search by name, mobile, or order ID...',
    filterStatus: 'Filter status',
    allOrders: 'All Orders',
    newOrder: 'New Order',
    loadingOrders: 'Loading orders...',
    noOrdersFound: 'No orders found',
    adjustFilters: 'Try adjusting your search or filters',
    createFirstOrder: 'Create your first order to get started',
    createFirstOrderButton: 'Create First Order',
    
    // Order Status
    statusPending: 'Pending',
    statusInProgress: 'In Progress',
    statusReady: 'Ready',
    
    // Order Card
    delivery: 'Delivery',
    remaining: 'Remaining',
    editOrder: 'Edit Order',
    
    // Order Editor Dialog
    editOrderTitle: 'Edit Order',
    newOrderTitle: 'New Order',
    saveOrder: 'Save Order',
    cancel: 'Cancel',
    delete: 'Delete',
    deleteOrderTitle: 'Delete Order?',
    deleteOrderMessage: 'This will permanently delete the order for {name}. This action cannot be undone.',
    customerNameRequired: 'Customer name is required',
    mobileNumberRequired: 'Mobile number is required',
    orderUpdated: 'Order updated successfully',
    orderCreated: 'Order created successfully',
    orderDeleted: 'Order deleted successfully',
    
    // Customer Details Section
    customerDetails: 'Customer Details',
    customerName: 'Customer Name',
    mobileNumber: 'Mobile Number',
    address: 'Address',
    optional: '(Optional)',
    enterCustomerName: 'Enter customer name',
    enterMobileNumber: 'Enter mobile number',
    enterAddress: 'Enter customer address',
    
    // Order Details Section
    orderDetails: 'Order Details',
    orderId: 'Order ID',
    itemType: 'Item Type',
    quantity: 'Quantity',
    orderDate: 'Order Date',
    deliveryDate: 'Delivery Date',
    orderStatus: 'Order Status',
    totalAmount: 'Total Amount',
    paidAmount: 'Paid Amount',
    remainingAmount: 'Remaining Amount',
    
    // Item Types
    itemShirt: 'Shirt',
    itemPant: 'Pant',
    itemKurta: 'Kurta',
    itemSuit: 'Suit',
    itemBlazer: 'Blazer',
    itemSherwani: 'Sherwani',
    itemOther: 'Other',
    
    // Measurements Section
    measurements: 'Measurements',
    upperBodyMeasurements: 'Upper Body Measurements',
    lowerBodyMeasurements: 'Lower Body Measurements',
    length: 'Length',
    chest: 'Chest',
    waist: 'Waist',
    seat: 'Seat',
    front: 'Front',
    shoulder: 'Shoulder',
    fullHandCuff: 'Full Hand + Cuff',
    halfHandLength: 'Half Hand Length',
    collar: 'Collar',
    cutFront: 'Cut Front',
    style: 'Style',
    bottom: 'Bottom',
    thigh: 'Thigh',
    knee: 'Knee',
    mode: 'Mode',
    frontRiseBackRise: 'Front Rise / Back Rise',
    bottomWidth: 'Bottom Width',
    waistHeight: 'Waist Height',
    
    // Ready Message Modal
    orderReady: 'Order Ready!',
    orderReadyDescription: 'The order status has been changed to Ready. You can now notify the customer.',
    messagePreview: 'Message Preview:',
    copyMessage: 'Copy Message',
    copied: 'Copied!',
    openWhatsApp: 'Open WhatsApp',
    close: 'Close',
    whatsAppDisabled: 'WhatsApp option disabled: No mobile number provided',
    messageCopied: 'Message copied to clipboard',
    copyFailed: 'Failed to copy message',
    
    // WhatsApp Action
    sendWhatsApp: 'Send WhatsApp',
    mobileRequired: 'Mobile number required',
    whatsAppTooltip: 'Send order ready message via WhatsApp',
    
    // Language
    english: 'English',
    marathi: 'Marathi',
    
    // Sync Status
    syncOffline: 'Offline',
    syncOnline: 'Online',
    syncSyncing: 'Syncing',
    syncError: 'Sync Error',
    syncOfflineTooltip: 'Working offline - changes will sync when online',
    syncOnlineTooltip: 'Connected and synced',
    syncErrorTooltip: 'Sync failed - will retry when online',
  },
  mr: {
    // App Header
    appName: 'आदर्श मेन्स टेलर्स',
    appSubtitle: 'ऑर्डर व्यवस्थापन',
    signOut: 'साइन आउट',
    
    // Login Screen
    loginTitle: 'आदर्श मेन्स टेलर्स',
    loginDescription: 'ऑर्डर व्यवस्थापित करण्यासाठी प्रशासक प्रवेश आवश्यक',
    signInButton: 'प्रशासक म्हणून साइन इन करा',
    signingIn: 'साइन इन करत आहे...',
    loginFooter: 'हा अॅप फक्त अधिकृत प्रशासकांसाठी आहे',
    
    // Access Denied Screen
    accessDeniedTitle: 'प्रवेश नाकारला',
    accessDeniedDescription: 'तुम्हाला या अॅप्लिकेशनमध्ये प्रवेश करण्याची परवानगी नाही',
    accessDeniedMessage1: 'हा अॅप्लिकेशन फक्त अधिकृत प्रशासकांसाठी मर्यादित आहे.',
    accessDeniedMessage2: 'तुम्हाला प्रवेश असावा असे तुम्हाला वाटत असल्यास कृपया सिस्टम प्रशासकाशी संपर्क साधा.',
    
    // Orders List Page
    searchPlaceholder: 'नाव, मोबाइल किंवा ऑर्डर आयडीने शोधा...',
    filterStatus: 'स्थिती फिल्टर करा',
    allOrders: 'सर्व ऑर्डर',
    newOrder: 'नवीन ऑर्डर',
    loadingOrders: 'ऑर्डर लोड करत आहे...',
    noOrdersFound: 'कोणतेही ऑर्डर सापडले नाहीत',
    adjustFilters: 'तुमचा शोध किंवा फिल्टर समायोजित करून पहा',
    createFirstOrder: 'सुरू करण्यासाठी तुमचा पहिला ऑर्डर तयार करा',
    createFirstOrderButton: 'पहिला ऑर्डर तयार करा',
    
    // Order Status
    statusPending: 'प्रलंबित',
    statusInProgress: 'प्रगतीपथावर',
    statusReady: 'तयार',
    
    // Order Card
    delivery: 'वितरण',
    remaining: 'शिल्लक',
    editOrder: 'ऑर्डर संपादित करा',
    
    // Order Editor Dialog
    editOrderTitle: 'ऑर्डर संपादित करा',
    newOrderTitle: 'नवीन ऑर्डर',
    saveOrder: 'ऑर्डर जतन करा',
    cancel: 'रद्द करा',
    delete: 'हटवा',
    deleteOrderTitle: 'ऑर्डर हटवायचा?',
    deleteOrderMessage: '{name} साठी ऑर्डर कायमचा हटवला जाईल. ही क्रिया पूर्ववत केली जाऊ शकत नाही.',
    customerNameRequired: 'ग्राहकाचे नाव आवश्यक आहे',
    mobileNumberRequired: 'मोबाइल नंबर आवश्यक आहे',
    orderUpdated: 'ऑर्डर यशस्वीरित्या अपडेट केला',
    orderCreated: 'ऑर्डर यशस्वीरित्या तयार केला',
    orderDeleted: 'ऑर्डर यशस्वीरित्या हटवला',
    
    // Customer Details Section
    customerDetails: 'ग्राहक तपशील',
    customerName: 'ग्राहकाचे नाव',
    mobileNumber: 'मोबाइल नंबर',
    address: 'पत्ता',
    optional: '(पर्यायी)',
    enterCustomerName: 'ग्राहकाचे नाव प्रविष्ट करा',
    enterMobileNumber: 'मोबाइल नंबर प्रविष्ट करा',
    enterAddress: 'ग्राहकाचा पत्ता प्रविष्ट करा',
    
    // Order Details Section
    orderDetails: 'ऑर्डर तपशील',
    orderId: 'ऑर्डर आयडी',
    itemType: 'वस्तूचा प्रकार',
    quantity: 'प्रमाण',
    orderDate: 'ऑर्डर तारीख',
    deliveryDate: 'वितरण तारीख',
    orderStatus: 'ऑर्डर स्थिती',
    totalAmount: 'एकूण रक्कम',
    paidAmount: 'भरलेली रक्कम',
    remainingAmount: 'शिल्लक रक्कम',
    
    // Item Types
    itemShirt: 'शर्ट',
    itemPant: 'पॅन्ट',
    itemKurta: 'कुर्ता',
    itemSuit: 'सूट',
    itemBlazer: 'ब्लेझर',
    itemSherwani: 'शेरवानी',
    itemOther: 'इतर',
    
    // Measurements Section
    measurements: 'मापे',
    upperBodyMeasurements: 'वरच्या शरीराची मापे',
    lowerBodyMeasurements: 'खालच्या शरीराची मापे',
    length: 'लांबी',
    chest: 'छाती',
    waist: 'कंबर',
    seat: 'सीट',
    front: 'समोर',
    shoulder: 'खांदा',
    fullHandCuff: 'पूर्ण हात + कफ',
    halfHandLength: 'अर्धा हात लांबी',
    collar: 'कॉलर',
    cutFront: 'कट फ्रंट',
    style: 'शैली',
    bottom: 'तळ',
    thigh: 'मांडी',
    knee: 'गुडघा',
    mode: 'मोड',
    frontRiseBackRise: 'फ्रंट राइज / बॅक राइज',
    bottomWidth: 'तळाची रुंदी',
    waistHeight: 'कंबरेची उंची',
    
    // Ready Message Modal
    orderReady: 'ऑर्डर तयार!',
    orderReadyDescription: 'ऑर्डर स्थिती तयार मध्ये बदलली आहे. आता तुम्ही ग्राहकाला सूचित करू शकता.',
    messagePreview: 'संदेश पूर्वावलोकन:',
    copyMessage: 'संदेश कॉपी करा',
    copied: 'कॉपी केले!',
    openWhatsApp: 'व्हाट्सअॅप उघडा',
    close: 'बंद करा',
    whatsAppDisabled: 'व्हाट्सअॅप पर्याय अक्षम: मोबाइल नंबर प्रदान केला नाही',
    messageCopied: 'संदेश क्लिपबोर्डवर कॉपी केला',
    copyFailed: 'संदेश कॉपी करण्यात अयशस्वी',
    
    // WhatsApp Action
    sendWhatsApp: 'व्हाट्सअॅप पाठवा',
    mobileRequired: 'मोबाइल नंबर आवश्यक आहे',
    whatsAppTooltip: 'व्हाट्सअॅपद्वारे ऑर्डर तयार संदेश पाठवा',
    
    // Language
    english: 'इंग्रजी',
    marathi: 'मराठी',
    
    // Sync Status
    syncOffline: 'ऑफलाइन',
    syncOnline: 'ऑनलाइन',
    syncSyncing: 'समक्रमित करत आहे',
    syncError: 'समक्रमण त्रुटी',
    syncOfflineTooltip: 'ऑफलाइन काम करत आहे - ऑनलाइन असताना बदल समक्रमित होतील',
    syncOnlineTooltip: 'कनेक्ट केलेले आणि समक्रमित',
    syncErrorTooltip: 'समक्रमण अयशस्वी - ऑनलाइन असताना पुन्हा प्रयत्न करेल',
  },
} as const;

export type TranslationKey = keyof typeof translations.en;

export function getTranslation(
  language: Language,
  key: TranslationKey,
  replacements?: Record<string, string>
): string {
  const text = translations[language][key];
  if (!replacements) return text;
  return replaceVariables(text, replacements);
}

export function replaceVariables(text: string, variables: Record<string, string>): string {
  return text.replace(/\{(\w+)\}/g, (match, key) => variables[key] || match);
}

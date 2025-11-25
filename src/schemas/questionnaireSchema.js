import { z } from 'zod'

// Helper for optional string that can be empty
const optionalString = z.string().optional().or(z.literal(''))

// Helper for optional array
const optionalArray = z.array(z.string()).optional().default([])

export const questionnaireSchema = z.object({
  // ============================================
  // STEP 1: Basic Contact Information (Required)
  // ============================================
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  companyName: z.string().min(1, 'Company/Project name is required'),
  phoneNumber: optionalString,
  position: optionalString,

  // ============================================
  // STEP 2: Business Overview (Optional)
  // ============================================
  industry: optionalString,
  businessDescription: optionalString, // What does your business do?
  targetAudience: optionalString, // Who are your ideal customers?
  targetAudienceTechLevel: z.enum(['non-technical', 'somewhat-technical', 'technical', 'mixed']).optional(),
  problemSolved: optionalString, // What problem does this website solve?
  uniqueSellingPoints: optionalString, // What makes you different?
  competitors: optionalArray, // List competitor websites
  businessGoals: optionalArray, // What do you want to achieve?
  primaryCTAs: optionalArray, // Top 3 actions visitors should take

  // ============================================
  // STEP 3: Website Inspiration (Optional)
  // ============================================
  referenceWebsites: z.array(z.object({
    url: z.string(),
    whatYouLike: z.string().optional()
  })).optional().default([]),

  dislikedWebsites: z.array(z.object({
    url: z.string(),
    whatYouDislike: z.string().optional()
  })).optional().default([]),

  designKeywords: optionalArray, // e.g., "modern", "playful", "professional"
  avoidKeywords: optionalArray, // What to avoid: "boring", "cluttered"

  // ============================================
  // STEP 4: Design Preferences (Optional)
  // ============================================
  websiteType: z.enum([
    'corporate',
    'ecommerce',
    'portfolio',
    'saas',
    'landing-page',
    'blog',
    'marketplace',
    'booking-service',
    'directory',
    'membership',
    'custom'
  ]).optional(),

  colorPreference: z.enum([
    'minimal-dark',
    'minimal-light',
    'corporate-blue',
    'nature-green',
    'energetic-warm',
    'luxury-gold',
    'tech-purple',
    'healthcare-teal',
    'creative-gradient',
    'custom'
  ]).optional(),

  customColors: z.object({
    primary: optionalString,
    secondary: optionalString,
    accent: optionalString
  }).optional(),

  layoutStyle: z.enum([
    'clean-minimal',
    'bold-creative',
    'classic-traditional',
    'modern-asymmetric',
    'magazine-editorial',
    'card-based',
    'full-width-immersive'
  ]).optional(),

  typographyStyle: z.enum([
    'modern-sans',
    'elegant-serif',
    'playful-rounded',
    'bold-display',
    'mixed-pairing',
    'monospace-tech'
  ]).optional(),

  animationLevel: z.enum([
    'none',
    'subtle',
    'moderate',
    'rich'
  ]).optional(),

  themeMode: z.enum([
    'light-only',
    'dark-only',
    'both-toggle',
    'system-preference'
  ]).optional(),

  // ============================================
  // STEP 5: Pages & Structure (Optional)
  // ============================================
  pages: z.array(z.object({
    name: z.string(),
    description: z.string().optional(),
    priority: z.enum(['must-have', 'nice-to-have', 'maybe']).optional()
  })).optional().default([]),

  // Quick page selection
  commonPages: optionalArray, // ['home', 'about', 'services', 'contact', etc.]

  estimatedPageCount: z.enum([
    '1-5',
    '6-10',
    '11-20',
    '20-plus'
  ]).optional(),

  // ============================================
  // STEP 6: Features & Functionality (Optional)
  // ============================================
  features: optionalArray, // Selected from predefined list
  customFeatures: optionalString, // Any custom functionality described

  // E-commerce specific
  ecommerceDetails: z.object({
    productCount: z.enum(['1-10', '11-50', '51-200', '200-plus']).optional(),
    hasInventory: z.boolean().optional(),
    paymentMethods: optionalArray,
    shippingNeeds: optionalString,
    hasDigitalProducts: z.boolean().optional()
  }).optional(),

  // Booking specific
  bookingDetails: z.object({
    bookingType: z.enum(['appointments', 'reservations', 'classes', 'rentals', 'other']).optional(),
    needsCalendarSync: z.boolean().optional(),
    needsPaymentUpfront: z.boolean().optional()
  }).optional(),

  // Integrations
  integrations: optionalArray, // ['google-analytics', 'mailchimp', 'stripe', etc.]
  customIntegrations: optionalString,

  // ============================================
  // STEP 7: Content & Assets (Optional)
  // ============================================
  hasLogo: z.enum(['yes', 'no', 'need-new']).optional(),
  logoFile: optionalString, // URL or file reference

  hasBrandGuidelines: z.boolean().optional(),
  brandGuidelinesFile: optionalString,

  hasContent: z.enum([
    'yes-all-ready',
    'yes-needs-editing',
    'partial',
    'no-need-help'
  ]).optional(),

  hasImages: z.enum([
    'yes-professional',
    'yes-needs-editing',
    'need-stock',
    'need-photoshoot'
  ]).optional(),

  contentNotes: optionalString,

  // Existing website
  existingWebsite: optionalString,
  whatToKeep: optionalString, // What do you like about current site
  whatToChange: optionalString, // What needs improvement

  // ============================================
  // STEP 8: Technical Requirements (Optional)
  // ============================================
  hostingPreference: z.enum([
    'you-handle',
    'have-hosting',
    'need-recommendation',
    'dont-know'
  ]).optional(),

  domainStatus: z.enum([
    'have-domain',
    'need-domain',
    'need-help-choosing'
  ]).optional(),

  domainName: optionalString,

  cmsPreference: z.enum([
    'easy-drag-drop',
    'wordpress',
    'custom-built',
    'no-preference'
  ]).optional(),

  techStackPreference: z.enum([
    'react-next',
    'vue-nuxt',
    'wordpress',
    'webflow',
    'shopify',
    'custom',
    'you-decide'
  ]).optional(),

  expectedMonthlyVisitors: z.enum([
    'under-1k',
    '1k-10k',
    '10k-50k',
    '50k-100k',
    '100k-plus',
    'dont-know'
  ]).optional(),

  mobileVsDesktop: z.enum([
    'mobile-first',
    'desktop-first',
    'equal-priority',
    'dont-know'
  ]).optional(),

  needsOffline: z.boolean().optional(),
  apiRequirements: optionalString, // Internal or external APIs needed

  needsMultiLanguage: z.boolean().optional(),
  languages: optionalArray,

  accessibilityRequirements: z.boolean().optional(),

  // ============================================
  // SEO & Performance (Optional)
  // ============================================
  targetKeywords: optionalArray,
  competitorsToOutrank: optionalArray,
  performanceExpectations: z.enum([
    'standard',
    'fast',
    'blazing-fast',
    'dont-know'
  ]).optional(),
  needsCoreWebVitals: z.boolean().optional(),

  // ============================================
  // STEP 9: Project Scope (Optional)
  // ============================================
  projectDescription: optionalString, // General vision

  mockupCount: z.number().min(1).max(5).optional(),

  timeline: z.enum([
    'urgent',
    '2-4-weeks',
    '1-2-months',
    '2-3-months',
    'flexible'
  ]).optional(),

  budget: z.enum([
    'under-5k',
    '5k-10k',
    '10k-25k',
    '25k-50k',
    '50k-100k',
    '100k-plus',
    'discuss'
  ]).optional(),

  // Launch & Maintenance
  hasHardDeadline: z.boolean().optional(),
  deadlineDate: optionalString,
  phasedLaunchOk: z.boolean().optional(),
  maintenancePlan: z.enum([
    'self-maintain',
    'need-ongoing-support',
    'monthly-retainer',
    'as-needed',
    'discuss'
  ]).optional(),
  analyticsNeeds: optionalArray, // GA4, Mixpanel, custom dashboards
  futureFeatures: optionalString, // Planned future additions

  // ============================================
  // STEP 10: Additional Information (Optional)
  // ============================================
  howDidYouHear: z.enum([
    'google',
    'social-media',
    'referral',
    'portfolio',
    'other'
  ]).optional(),

  referralSource: optionalString,

  additionalNotes: optionalString,

  // Communication preferences
  preferredContact: z.enum([
    'email',
    'phone',
    'whatsapp',
    'video-call'
  ]).optional(),

  bestTimeToContact: optionalString,
  timezone: optionalString,
})

// Export field groups for form steps
export const FORM_STEPS = [
  {
    id: 1,
    title: 'Contact Info',
    subtitle: 'How can we reach you?',
    icon: 'user',
    fields: ['fullName', 'email', 'companyName', 'phoneNumber'],
    required: ['fullName', 'email', 'companyName']
  },
  {
    id: 2,
    title: 'Your Business',
    subtitle: 'Tell us about what you do',
    icon: 'briefcase',
    fields: ['industry', 'businessDescription', 'targetAudience', 'uniqueSellingPoints', 'competitors', 'businessGoals']
  },
  {
    id: 3,
    title: 'Inspiration',
    subtitle: 'Websites you love',
    icon: 'sparkles',
    fields: ['referenceWebsites', 'designKeywords', 'avoidKeywords']
  },
  {
    id: 4,
    title: 'Design Style',
    subtitle: 'Your visual preferences',
    icon: 'palette',
    fields: ['websiteType', 'colorPreference', 'customColors', 'layoutStyle', 'typographyStyle', 'animationLevel']
  },
  {
    id: 5,
    title: 'Pages',
    subtitle: 'What sections do you need?',
    icon: 'layout',
    fields: ['commonPages', 'pages', 'estimatedPageCount']
  },
  {
    id: 6,
    title: 'Features',
    subtitle: 'Functionality you need',
    icon: 'cog',
    fields: ['features', 'customFeatures', 'ecommerceDetails', 'bookingDetails', 'integrations', 'customIntegrations']
  },
  {
    id: 7,
    title: 'Content',
    subtitle: 'Your assets & materials',
    icon: 'image',
    fields: ['hasLogo', 'hasBrandGuidelines', 'hasContent', 'hasImages', 'contentNotes', 'existingWebsite', 'whatToKeep', 'whatToChange']
  },
  {
    id: 8,
    title: 'Technical',
    subtitle: 'Hosting & setup',
    icon: 'server',
    fields: ['hostingPreference', 'domainStatus', 'domainName', 'cmsPreference', 'needsMultiLanguage', 'languages', 'accessibilityRequirements']
  },
  {
    id: 9,
    title: 'Budget & Timeline',
    subtitle: 'Scope of your project',
    icon: 'calendar',
    fields: ['projectDescription', 'mockupCount', 'timeline', 'budget']
  },
  {
    id: 10,
    title: 'Final Details',
    subtitle: 'Anything else?',
    icon: 'check',
    fields: ['howDidYouHear', 'referralSource', 'additionalNotes', 'preferredContact', 'bestTimeToContact', 'timezone']
  }
]

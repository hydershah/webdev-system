// Common pages that clients typically need
export const COMMON_PAGES = [
  { id: 'home', label: 'Home Page', description: 'Your main landing page', icon: '🏠' },
  { id: 'about', label: 'About Us', description: 'Company story & team', icon: '👥' },
  { id: 'services', label: 'Services', description: 'What you offer', icon: '🛠️' },
  { id: 'products', label: 'Products', description: 'Product catalog/listings', icon: '📦' },
  { id: 'portfolio', label: 'Portfolio/Work', description: 'Showcase your projects', icon: '🎨' },
  { id: 'testimonials', label: 'Testimonials', description: 'Client reviews & success stories', icon: '⭐' },
  { id: 'blog', label: 'Blog/News', description: 'Articles & updates', icon: '📰' },
  { id: 'contact', label: 'Contact', description: 'Contact form & info', icon: '📧' },
  { id: 'faq', label: 'FAQ', description: 'Frequently asked questions', icon: '❓' },
  { id: 'pricing', label: 'Pricing', description: 'Pricing plans & packages', icon: '💰' },
  { id: 'team', label: 'Team', description: 'Team member profiles', icon: '👨‍👩‍👧‍👦' },
  { id: 'careers', label: 'Careers', description: 'Job openings & culture', icon: '💼' },
  { id: 'gallery', label: 'Gallery', description: 'Photo/video gallery', icon: '🖼️' },
  { id: 'events', label: 'Events', description: 'Upcoming events calendar', icon: '📅' },
  { id: 'booking', label: 'Booking/Appointments', description: 'Schedule appointments', icon: '🗓️' },
  { id: 'shop', label: 'Online Shop', description: 'E-commerce store', icon: '🛒' },
  { id: 'login', label: 'Login/Account', description: 'User accounts & dashboard', icon: '🔐' },
  { id: 'terms', label: 'Terms & Privacy', description: 'Legal pages', icon: '📜' },
  { id: 'locations', label: 'Locations', description: 'Store/office locations', icon: '📍' },
  { id: 'partners', label: 'Partners/Clients', description: 'Logos & partnerships', icon: '🤝' },
]

// Website features & functionality
export const FEATURES = [
  // Essential
  { id: 'contact-form', label: 'Contact Form', category: 'essential', description: 'Let visitors reach you' },
  { id: 'mobile-responsive', label: 'Mobile Responsive', category: 'essential', description: 'Works on all devices' },
  { id: 'seo-optimized', label: 'SEO Optimization', category: 'essential', description: 'Rank better on Google' },
  { id: 'ssl-security', label: 'SSL Security', category: 'essential', description: 'Secure HTTPS connection' },

  // Content
  { id: 'blog-system', label: 'Blog System', category: 'content', description: 'Publish articles & news' },
  { id: 'image-gallery', label: 'Image Gallery', category: 'content', description: 'Photo galleries with lightbox' },
  { id: 'video-embed', label: 'Video Integration', category: 'content', description: 'YouTube/Vimeo embeds' },
  { id: 'testimonials', label: 'Testimonials Section', category: 'content', description: 'Client reviews display' },
  { id: 'portfolio-gallery', label: 'Portfolio Gallery', category: 'content', description: 'Showcase your work' },

  // Engagement
  { id: 'newsletter', label: 'Newsletter Signup', category: 'engagement', description: 'Collect email subscribers' },
  { id: 'live-chat', label: 'Live Chat Widget', category: 'engagement', description: 'Chat with visitors in real-time' },
  { id: 'social-feed', label: 'Social Media Feed', category: 'engagement', description: 'Display Instagram/Twitter' },
  { id: 'social-sharing', label: 'Social Sharing Buttons', category: 'engagement', description: 'Share content easily' },
  { id: 'comments', label: 'Comments System', category: 'engagement', description: 'User comments on posts' },
  { id: 'reviews', label: 'Review System', category: 'engagement', description: 'Collect & display reviews' },

  // E-commerce
  { id: 'shopping-cart', label: 'Shopping Cart', category: 'ecommerce', description: 'Product cart functionality' },
  { id: 'payment-gateway', label: 'Payment Processing', category: 'ecommerce', description: 'Accept online payments' },
  { id: 'inventory', label: 'Inventory Management', category: 'ecommerce', description: 'Track stock levels' },
  { id: 'product-search', label: 'Product Search & Filter', category: 'ecommerce', description: 'Find products easily' },
  { id: 'wishlist', label: 'Wishlist', category: 'ecommerce', description: 'Save favorite products' },
  { id: 'order-tracking', label: 'Order Tracking', category: 'ecommerce', description: 'Track shipments' },
  { id: 'coupons', label: 'Discount Codes', category: 'ecommerce', description: 'Promotional coupons' },

  // Booking & Scheduling
  { id: 'appointment-booking', label: 'Appointment Booking', category: 'booking', description: 'Schedule appointments' },
  { id: 'calendar-sync', label: 'Calendar Sync', category: 'booking', description: 'Sync with Google/Outlook' },
  { id: 'online-payments', label: 'Online Deposits', category: 'booking', description: 'Collect booking payments' },
  { id: 'availability-calendar', label: 'Availability Calendar', category: 'booking', description: 'Show available times' },
  { id: 'table-reservations', label: 'Table Reservations', category: 'booking', description: 'Restaurant bookings' },

  // User Accounts
  { id: 'user-registration', label: 'User Registration', category: 'accounts', description: 'Create user accounts' },
  { id: 'member-dashboard', label: 'Member Dashboard', category: 'accounts', description: 'User profile area' },
  { id: 'membership-tiers', label: 'Membership Levels', category: 'accounts', description: 'Different access tiers' },
  { id: 'protected-content', label: 'Protected Content', category: 'accounts', description: 'Members-only pages' },

  // Advanced
  { id: 'search', label: 'Site Search', category: 'advanced', description: 'Search entire website' },
  { id: 'multi-language', label: 'Multi-Language', category: 'advanced', description: 'Multiple languages' },
  { id: 'dark-mode', label: 'Dark Mode Toggle', category: 'advanced', description: 'Light/dark theme switch' },
  { id: 'animations', label: 'Page Animations', category: 'advanced', description: 'Scroll & hover effects' },
  { id: 'parallax', label: 'Parallax Effects', category: 'advanced', description: 'Depth scrolling effects' },
  { id: 'maps', label: 'Interactive Maps', category: 'advanced', description: 'Google Maps integration' },
  { id: 'forms-advanced', label: 'Advanced Forms', category: 'advanced', description: 'Multi-step, conditional' },
  { id: 'file-downloads', label: 'File Downloads', category: 'advanced', description: 'Downloadable resources' },
  { id: 'pdf-viewer', label: 'PDF Viewer', category: 'advanced', description: 'View documents inline' },
]

// Third-party integrations
export const INTEGRATIONS = [
  // Analytics
  { id: 'google-analytics', label: 'Google Analytics', category: 'analytics', icon: '📊' },
  { id: 'facebook-pixel', label: 'Facebook Pixel', category: 'analytics', icon: '📊' },
  { id: 'hotjar', label: 'Hotjar', category: 'analytics', icon: '🔥' },
  { id: 'mixpanel', label: 'Mixpanel', category: 'analytics', icon: '📈' },

  // Email Marketing
  { id: 'mailchimp', label: 'Mailchimp', category: 'email', icon: '📧' },
  { id: 'klaviyo', label: 'Klaviyo', category: 'email', icon: '📧' },
  { id: 'convertkit', label: 'ConvertKit', category: 'email', icon: '📧' },
  { id: 'hubspot', label: 'HubSpot', category: 'email', icon: '🔶' },

  // Payment
  { id: 'stripe', label: 'Stripe', category: 'payment', icon: '💳' },
  { id: 'paypal', label: 'PayPal', category: 'payment', icon: '💳' },
  { id: 'square', label: 'Square', category: 'payment', icon: '💳' },
  { id: 'apple-pay', label: 'Apple Pay', category: 'payment', icon: '🍎' },
  { id: 'google-pay', label: 'Google Pay', category: 'payment', icon: '🔵' },

  // CRM
  { id: 'salesforce', label: 'Salesforce', category: 'crm', icon: '☁️' },
  { id: 'hubspot-crm', label: 'HubSpot CRM', category: 'crm', icon: '🔶' },
  { id: 'zoho', label: 'Zoho CRM', category: 'crm', icon: '📋' },

  // Social
  { id: 'instagram', label: 'Instagram Feed', category: 'social', icon: '📷' },
  { id: 'facebook', label: 'Facebook', category: 'social', icon: '👤' },
  { id: 'twitter', label: 'Twitter/X', category: 'social', icon: '🐦' },
  { id: 'linkedin', label: 'LinkedIn', category: 'social', icon: '💼' },
  { id: 'youtube', label: 'YouTube', category: 'social', icon: '▶️' },
  { id: 'tiktok', label: 'TikTok', category: 'social', icon: '🎵' },

  // Chat & Support
  { id: 'intercom', label: 'Intercom', category: 'chat', icon: '💬' },
  { id: 'zendesk', label: 'Zendesk', category: 'chat', icon: '🎫' },
  { id: 'freshdesk', label: 'Freshdesk', category: 'chat', icon: '🎫' },
  { id: 'crisp', label: 'Crisp Chat', category: 'chat', icon: '💬' },
  { id: 'whatsapp', label: 'WhatsApp Business', category: 'chat', icon: '💬' },

  // Booking
  { id: 'calendly', label: 'Calendly', category: 'booking', icon: '📅' },
  { id: 'acuity', label: 'Acuity Scheduling', category: 'booking', icon: '📅' },
  { id: 'simplybook', label: 'SimplyBook', category: 'booking', icon: '📅' },

  // Shipping
  { id: 'shippo', label: 'Shippo', category: 'shipping', icon: '📦' },
  { id: 'shipstation', label: 'ShipStation', category: 'shipping', icon: '📦' },

  // Other
  { id: 'google-maps', label: 'Google Maps', category: 'other', icon: '🗺️' },
  { id: 'recaptcha', label: 'reCAPTCHA', category: 'other', icon: '🤖' },
  { id: 'cloudflare', label: 'Cloudflare', category: 'other', icon: '☁️' },
]

// Design style keywords
export const DESIGN_KEYWORDS = [
  // Mood
  { id: 'modern', label: 'Modern', category: 'mood' },
  { id: 'classic', label: 'Classic', category: 'mood' },
  { id: 'minimalist', label: 'Minimalist', category: 'mood' },
  { id: 'bold', label: 'Bold', category: 'mood' },
  { id: 'elegant', label: 'Elegant', category: 'mood' },
  { id: 'playful', label: 'Playful', category: 'mood' },
  { id: 'professional', label: 'Professional', category: 'mood' },
  { id: 'friendly', label: 'Friendly', category: 'mood' },
  { id: 'luxurious', label: 'Luxurious', category: 'mood' },
  { id: 'edgy', label: 'Edgy', category: 'mood' },
  { id: 'clean', label: 'Clean', category: 'mood' },
  { id: 'creative', label: 'Creative', category: 'mood' },
  { id: 'corporate', label: 'Corporate', category: 'mood' },
  { id: 'youthful', label: 'Youthful', category: 'mood' },
  { id: 'sophisticated', label: 'Sophisticated', category: 'mood' },
  { id: 'warm', label: 'Warm', category: 'mood' },
  { id: 'cool', label: 'Cool', category: 'mood' },
  { id: 'trustworthy', label: 'Trustworthy', category: 'mood' },
  { id: 'innovative', label: 'Innovative', category: 'mood' },
  { id: 'approachable', label: 'Approachable', category: 'mood' },
]

// Website type options with descriptions
export const WEBSITE_TYPES = [
  { id: 'corporate', label: 'Corporate / Business', icon: '🏢', description: 'Professional company website' },
  { id: 'ecommerce', label: 'E-Commerce / Online Store', icon: '🛒', description: 'Sell products online' },
  { id: 'portfolio', label: 'Portfolio / Creative', icon: '🎨', description: 'Showcase your work' },
  { id: 'saas', label: 'SaaS / Web App', icon: '💻', description: 'Software product website' },
  { id: 'landing-page', label: 'Landing Page', icon: '📄', description: 'Single page for campaigns' },
  { id: 'blog', label: 'Blog / Magazine', icon: '📰', description: 'Content-focused site' },
  { id: 'marketplace', label: 'Marketplace', icon: '🏪', description: 'Multi-vendor platform' },
  { id: 'booking-service', label: 'Booking / Service', icon: '📅', description: 'Appointment scheduling' },
  { id: 'directory', label: 'Directory / Listings', icon: '📋', description: 'Business/resource listings' },
  { id: 'membership', label: 'Membership / Community', icon: '👥', description: 'Members-only content' },
  { id: 'custom', label: 'Custom / Other', icon: '⚡', description: 'Something unique' },
]

// Color scheme options
export const COLOR_SCHEMES = [
  { id: 'minimal-dark', label: 'Minimal Dark', colors: ['#1a1a1a', '#333333', '#666666'], description: 'Sleek & sophisticated' },
  { id: 'minimal-light', label: 'Minimal Light', colors: ['#ffffff', '#f5f5f5', '#e0e0e0'], description: 'Clean & airy' },
  { id: 'corporate-blue', label: 'Corporate Blue', colors: ['#1e3a5f', '#2563eb', '#60a5fa'], description: 'Professional & trustworthy' },
  { id: 'nature-green', label: 'Nature Green', colors: ['#166534', '#22c55e', '#86efac'], description: 'Fresh & organic' },
  { id: 'energetic-warm', label: 'Energetic Warm', colors: ['#ea580c', '#f97316', '#fbbf24'], description: 'Bold & vibrant' },
  { id: 'luxury-gold', label: 'Luxury Gold', colors: ['#78350f', '#d97706', '#fcd34d'], description: 'Premium & elegant' },
  { id: 'tech-purple', label: 'Tech Purple', colors: ['#581c87', '#9333ea', '#c084fc'], description: 'Modern & innovative' },
  { id: 'healthcare-teal', label: 'Healthcare Teal', colors: ['#134e4a', '#14b8a6', '#5eead4'], description: 'Calm & caring' },
  { id: 'creative-gradient', label: 'Creative Gradient', colors: ['#7c3aed', '#ec4899', '#f97316'], description: 'Eye-catching & unique' },
  { id: 'custom', label: 'Custom Colors', colors: ['#cccccc', '#999999', '#666666'], description: 'I have specific colors' },
]

// Layout style options
export const LAYOUT_STYLES = [
  { id: 'clean-minimal', label: 'Clean & Minimal', description: 'Lots of whitespace, simple layouts' },
  { id: 'bold-creative', label: 'Bold & Creative', description: 'Unique layouts, overlapping elements' },
  { id: 'classic-traditional', label: 'Classic Traditional', description: 'Standard grid, familiar patterns' },
  { id: 'modern-asymmetric', label: 'Modern Asymmetric', description: 'Off-center, dynamic compositions' },
  { id: 'magazine-editorial', label: 'Magazine Editorial', description: 'Content-rich, article-focused' },
  { id: 'card-based', label: 'Card-Based', description: 'Content in organized cards' },
  { id: 'full-width-immersive', label: 'Full-Width Immersive', description: 'Edge-to-edge, visual impact' },
]

// Typography style options
export const TYPOGRAPHY_STYLES = [
  { id: 'modern-sans', label: 'Modern Sans-Serif', description: 'Clean, contemporary feel', example: 'Inter, Poppins' },
  { id: 'elegant-serif', label: 'Elegant Serif', description: 'Sophisticated, editorial', example: 'Playfair, Merriweather' },
  { id: 'playful-rounded', label: 'Playful & Rounded', description: 'Friendly, approachable', example: 'Nunito, Quicksand' },
  { id: 'bold-display', label: 'Bold Display', description: 'Strong headlines, impactful', example: 'Oswald, Bebas Neue' },
  { id: 'mixed-pairing', label: 'Mixed Pairing', description: 'Serif + Sans combo', example: 'Playfair + Lato' },
  { id: 'monospace-tech', label: 'Monospace Tech', description: 'Developer, technical vibe', example: 'JetBrains Mono, Fira Code' },
]

// Business goals options
export const BUSINESS_GOALS = [
  { id: 'generate-leads', label: 'Generate more leads/inquiries' },
  { id: 'sell-online', label: 'Sell products/services online' },
  { id: 'brand-awareness', label: 'Build brand awareness' },
  { id: 'showcase-work', label: 'Showcase portfolio/work' },
  { id: 'inform-educate', label: 'Inform & educate visitors' },
  { id: 'build-community', label: 'Build a community' },
  { id: 'customer-support', label: 'Provide customer support' },
  { id: 'automate-bookings', label: 'Automate bookings/appointments' },
  { id: 'establish-credibility', label: 'Establish credibility/trust' },
  { id: 'attract-talent', label: 'Attract employees/talent' },
]

// Primary CTAs - what visitors should do
export const PRIMARY_CTAS = [
  { id: 'contact-us', label: 'Contact us / Get in touch' },
  { id: 'request-quote', label: 'Request a quote' },
  { id: 'book-appointment', label: 'Book an appointment' },
  { id: 'make-purchase', label: 'Make a purchase' },
  { id: 'sign-up', label: 'Sign up / Create account' },
  { id: 'download', label: 'Download resource' },
  { id: 'subscribe', label: 'Subscribe to newsletter' },
  { id: 'call-now', label: 'Call now' },
  { id: 'learn-more', label: 'Learn more / Read content' },
  { id: 'watch-demo', label: 'Watch demo / video' },
  { id: 'free-trial', label: 'Start free trial' },
  { id: 'get-directions', label: 'Get directions / Visit location' },
]

// Tech stack options
export const TECH_STACKS = [
  { id: 'react-next', label: 'React / Next.js', desc: 'Modern, fast, scalable' },
  { id: 'vue-nuxt', label: 'Vue / Nuxt.js', desc: 'Approachable, versatile' },
  { id: 'wordpress', label: 'WordPress', desc: 'Popular, lots of plugins' },
  { id: 'webflow', label: 'Webflow', desc: 'Visual, no-code friendly' },
  { id: 'shopify', label: 'Shopify', desc: 'E-commerce focused' },
  { id: 'custom', label: 'Custom / Other', desc: 'Specific requirements' },
  { id: 'you-decide', label: 'You decide', desc: 'Trust your recommendation' },
]

// Analytics options
export const ANALYTICS_OPTIONS = [
  { id: 'google-analytics', label: 'Google Analytics 4' },
  { id: 'mixpanel', label: 'Mixpanel' },
  { id: 'hotjar', label: 'Hotjar / Heatmaps' },
  { id: 'custom-dashboard', label: 'Custom reporting dashboard' },
  { id: 'conversion-tracking', label: 'Conversion tracking' },
  { id: 'ecommerce-analytics', label: 'E-commerce analytics' },
  { id: 'search-console', label: 'Google Search Console' },
]

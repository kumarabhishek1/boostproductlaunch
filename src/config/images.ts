// Image configuration and paths
export const IMAGES = {
  // Header/Logo
  logo: '/images/logo/product-hunt-logo.png',
  
  // Hero Section
  productGrid: {
    defaultProduct: '/images/products/default-product.jpg',
    products: Array.from({ length: 24 }, (_, i) => `/images/products/product-${i + 1}.jpg`)
  },
  
  // Success Stories
  successStories: {
    techStartupPro: '/images/success-stories/tech-startup-pro.jpg',
    devFlow: '/images/success-stories/dev-flow.jpg',
    aiWriter: '/images/success-stories/ai-writer.jpg',
    cloudStack: '/images/success-stories/cloud-stack.jpg',
    marketMaster: '/images/success-stories/market-master.jpg',
    designPro: '/images/success-stories/design-pro.jpg',
    codeMaster: '/images/success-stories/code-master.jpg',
    dataFlow: '/images/success-stories/data-flow.jpg',
    cloudMaster: '/images/success-stories/cloud-master.jpg',
    analyticsPro: '/images/success-stories/analytics-pro.jpg',
    devTools: '/images/success-stories/dev-tools.jpg',
    teamFlow: '/images/success-stories/team-flow.jpg'
  },
  
  // Services Section
  services: {
    communities: '/images/services/communities.jpg',
    social: '/images/services/social.jpg',
    newsletter: '/images/services/newsletter.jpg'
  }
};

// Create the directory structure
export const IMAGE_DIRECTORIES = [
  '/images',
  '/images/logo',
  '/images/products',
  '/images/success-stories',
  '/images/services'
];
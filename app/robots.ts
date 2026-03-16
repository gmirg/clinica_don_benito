import type { MetadataRoute } from 'next';

const appStage = process.env.APP_STAGE || 'staging';
const siteUrl = process.env.SITE_URL || 'https://staging.example.com';
const isProduction = appStage === 'production';

export default function robots(): MetadataRoute.Robots {
  if (!isProduction) {
    return {
      rules: {
        userAgent: '*',
        disallow: '/'
      }
    };
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/'
    },
    sitemap: `${siteUrl.replace(/\/$/, '')}/sitemap.xml`
  };
}

// src/config/shopify.js

// 🚨 החלף את הערכים הבאים בפרטים האמיתיים שלך מ-Shopify!
export const SHOPIFY_STORE_DOMAIN = "your-store-name.myshopify.com"; 
export const SHOPIFY_ACCESS_TOKEN = "shpat_your_private_api_token"; 
export const SHOPIFY_API_VERSION = "2024-07"; // ודא שזו הגרסה העדכנית

export const SHOPIFY_GRAPHQL_ENDPOINT = `https://${SHOPIFY_STORE_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;
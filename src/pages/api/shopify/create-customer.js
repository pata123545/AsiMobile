// pages/api/shopify/create-customer.js

import { SHOPIFY_STORE_DOMAIN, SHOPIFY_ACCESS_TOKEN } from '@/config/shopify';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { email, password, firstName, lastName } = req.body;

    const query = `
        mutation customerCreate($input: CustomerInput!) {
            customerCreate(input: $input) {
                customer {
                    id
                    email
                }
                userErrors {
                    field
                    message
                }
            }
        }
    `;

    try {
        const response = await fetch(
            `https://${SHOPIFY_STORE_DOMAIN}/admin/api/2024-07/graphql.json`, // שימוש ב-Admin API
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Shopify-Access-Token': SHOPIFY_ACCESS_TOKEN,
                },
                body: JSON.stringify({
                    query,
                    variables: {
                        input: {
                            email: email,
                            password: password, // שימו לב: סיסמה נדרשת ב-Admin API ליצירת לקוח
                            firstName: firstName || "משתמש",
                            lastName: lastName || "חדש",
                            // ניתן להוסיף כאן meta-fields לקישור ה-UID של Firebase
                        },
                    },
                }),
            }
        );

        const data = await response.json();

        if (data.data.customerCreate.userErrors.length > 0) {
            // טיפול בשגיאות שגיאת Shopify (כגון אימייל קיים)
            return res.status(400).json({ 
                error: 'Shopify Error', 
                details: data.data.customerCreate.userErrors 
            });
        }

        res.status(201).json({ 
            message: 'Shopify customer created successfully', 
            customer: data.data.customerCreate.customer 
        });

    } catch (error) {
        console.error('API Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
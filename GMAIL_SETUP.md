# Gmail API Integration Setup

This guide will help you set up the Gmail API integration for scanning subscription emails.

## Prerequisites

1. Google Cloud Console project with Gmail API enabled
2. OAuth 2.0 Client ID credentials
3. Supabase project with database access

## Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# Supabase Configuration (existing)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Gmail API Configuration (new)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/google/callback

# Next.js Configuration (new)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
```

## Google Cloud Console Setup

1. **Enable Gmail API**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Select your project
   - Navigate to "APIs & Services" > "Library"
   - Search for "Gmail API" and enable it

2. **Create OAuth 2.0 Credentials**:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth 2.0 Client ID"
   - Choose "Web application"
   - Add authorized redirect URIs:
     - `http://localhost:3000/api/auth/google/callback` (for development)
     - `https://yourdomain.com/api/auth/google/callback` (for production)

3. **Configure OAuth Consent Screen**:
   - Go to "APIs & Services" > "OAuth consent screen"
   - Fill in the required information
   - Add scopes:
     - `https://www.googleapis.com/auth/gmail.readonly`
     - `https://www.googleapis.com/auth/userinfo.email`
     - `https://www.googleapis.com/auth/userinfo.profile`

## Database Setup

Run the migration to create the `gmail_tokens` table:

```sql
-- The migration file is located at: supabase/migrations/001_create_gmail_tokens.sql
-- Run this in your Supabase SQL editor or via the CLI
```

## Features

### Gmail Connection
- Secure OAuth 2.0 authentication with Google
- Stores encrypted tokens in Supabase
- Automatic token refresh handling

### Email Scanning
- Searches for subscription-related emails using intelligent queries
- Extracts key information:
  - Service name
  - Billing amount
  - Next billing date
  - Email content snippets

### Smart Detection
The scanner looks for emails from:
- Billing departments (`billing@`, `noreply@`, `support@`, etc.)
- With subscription-related subjects
- Containing payment information
- With attachments (often invoices/receipts)

## Usage

1. **Connect Gmail**: Click "Connect Gmail" on the protected page
2. **Authorize Access**: Complete the Google OAuth flow
3. **Scan Emails**: Use the search functionality to find subscription emails
4. **Review Results**: View detected subscriptions with extracted details

## Security

- OAuth tokens are stored securely in Supabase
- Row-level security ensures users only access their own data
- Tokens are automatically refreshed when needed
- No email content is permanently stored, only metadata

## Troubleshooting

### Common Issues

1. **"Gmail not connected" error**:
   - Ensure OAuth flow completed successfully
   - Check that tokens are stored in the database
   - Verify environment variables are correct

2. **"Failed to scan emails" error**:
   - Check Gmail API quota limits
   - Verify OAuth scopes are correct
   - Ensure tokens haven't expired

3. **No emails found**:
   - Try different search queries
   - Check if emails match the detection criteria
   - Verify Gmail account has subscription emails

### Debug Mode

Enable debug logging by adding to your environment:
```env
DEBUG=gmail:*
```

## API Endpoints

- `GET /api/gmail/auth` - Get OAuth authorization URL
- `GET /api/auth/google/callback` - Handle OAuth callback
- `POST /api/gmail/scan` - Scan emails for subscriptions

## Next Steps

- Add email categorization
- Implement subscription tracking
- Add billing date reminders
- Export subscription data

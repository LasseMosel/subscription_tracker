import { NextRequest, NextResponse } from 'next/server';
import { GmailService } from '@/lib/gmail-service';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
    try {
        const { query, maxResults } = await request.json();

        console.log('Starting email scan with query:', query);

        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            console.log('No authenticated user found');
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        console.log('User authenticated:', user.id);

        // Get stored Gmail tokens
        const { data: tokens, error: tokenError } = await supabase
            .from('gmail_tokens')
            .select('*')
            .eq('user_id', user.id)
            .single();

        if (tokenError) {
            console.error('Token error:', tokenError);
            return NextResponse.json({ error: 'Gmail not connected' }, { status: 400 });
        }

        if (!tokens) {
            console.log('No tokens found for user');
            return NextResponse.json({ error: 'Gmail not connected' }, { status: 400 });
        }

        console.log('Tokens found, setting up Gmail service');

        const gmailService = new GmailService();
        gmailService.setCredentials({
            access_token: tokens.access_token,
            refresh_token: tokens.refresh_token,
            expiry_date: tokens.expiry_date
        });

        console.log('Searching for subscription emails...');
        const subscriptionEmails = await gmailService.searchSubscriptionEmails(
            query,
            maxResults || 50
        );

        console.log(`Found ${subscriptionEmails.length} subscription emails`);
        return NextResponse.json({ emails: subscriptionEmails });
    } catch (error) {
        console.error('Error scanning emails:', error);
        console.error('Error details:', {
            message: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : undefined
        });
        return NextResponse.json(
            { error: 'Failed to scan emails', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}

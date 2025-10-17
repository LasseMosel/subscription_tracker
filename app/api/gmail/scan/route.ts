import { NextRequest, NextResponse } from 'next/server';
import { GmailService } from '@/lib/gmail-service';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
    try {
        const { query, maxResults } = await request.json();

        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Get stored Gmail tokens
        const { data: tokens, error: tokenError } = await supabase
            .from('gmail_tokens')
            .select('*')
            .eq('user_id', user.id)
            .single();

        if (tokenError || !tokens) {
            return NextResponse.json({ error: 'Gmail not connected' }, { status: 400 });
        }

        const gmailService = new GmailService();
        gmailService.setCredentials({
            access_token: tokens.access_token,
            refresh_token: tokens.refresh_token,
            expiry_date: tokens.expiry_date
        });

        const subscriptionEmails = await gmailService.searchSubscriptionEmails(
            query,
            maxResults || 50
        );

        return NextResponse.json({ emails: subscriptionEmails });
    } catch (error) {
        console.error('Error scanning emails:', error);
        return NextResponse.json(
            { error: 'Failed to scan emails' },
            { status: 500 }
        );
    }
}

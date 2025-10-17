import { NextRequest, NextResponse } from 'next/server';
import { GmailService } from '@/lib/gmail-service';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const error = searchParams.get('error');

    if (error) {
        return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/protected?error=${error}`);
    }

    if (!code) {
        return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/protected?error=no_code`);
    }

    try {
        const gmailService = new GmailService();
        const tokens = await gmailService.getTokens(code);

        // Get user profile
        const userProfile = await gmailService.getUserProfile();

        // Store tokens in Supabase (you'll need to create a table for this)
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
            // Store Gmail tokens for the user
            const { error: dbError } = await supabase
                .from('gmail_tokens')
                .upsert({
                    user_id: user.id,
                    access_token: tokens.access_token,
                    refresh_token: tokens.refresh_token,
                    expiry_date: tokens.expiry_date,
                    gmail_email: userProfile.email
                });

            if (dbError) {
                console.error('Error storing tokens:', dbError);
                return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/protected?error=storage_failed`);
            }
        }

        return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/protected?gmail_connected=true`);
    } catch (error) {
        console.error('OAuth callback error:', error);
        return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/protected?error=oauth_failed`);
    }
}

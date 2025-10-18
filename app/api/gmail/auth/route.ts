import { NextResponse } from 'next/server';
import { GmailService } from '@/lib/gmail-service';

export async function GET() {
    try {
        const gmailService = new GmailService();
        const authUrl = gmailService.getAuthUrl();

        return NextResponse.json({ authUrl });
    } catch (error) {
        console.error('Error generating auth URL:', error);
        return NextResponse.json(
            { error: 'Failed to generate auth URL' },
            { status: 500 }
        );
    }
}

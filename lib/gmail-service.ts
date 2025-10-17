import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

export interface SubscriptionEmail {
    id: string;
    subject: string;
    sender: string;
    date: string;
    snippet: string;
    amount?: number;
    service?: string;
    nextBillingDate?: string;
}

export class GmailService {
    private oauth2Client: OAuth2Client;
    private gmail: any;

    constructor() {
        this.oauth2Client = new google.auth.OAuth2(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET,
            process.env.GOOGLE_REDIRECT_URI
        );
    }

    setCredentials(tokens: any) {
        this.oauth2Client.setCredentials(tokens);
        this.gmail = google.gmail({ version: 'v1', auth: this.oauth2Client });
    }

    getAuthUrl(): string {
        const scopes = [
            'https://www.googleapis.com/auth/gmail.readonly',
            'https://www.googleapis.com/auth/userinfo.email',
            'https://www.googleapis.com/auth/userinfo.profile'
        ];

        return this.oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: scopes,
            prompt: 'consent'
        });
    }

    async getTokens(code: string) {
        const { tokens } = await this.oauth2Client.getToken(code);
        this.oauth2Client.setCredentials(tokens);
        this.gmail = google.gmail({ version: 'v1', auth: this.oauth2Client });
        return tokens;
    }

    async searchSubscriptionEmails(query: string = '', maxResults: number = 50): Promise<SubscriptionEmail[]> {
        if (!this.gmail) {
            throw new Error('Gmail service not authenticated');
        }

        // Enhanced search query for subscription-related emails
        const subscriptionQuery = query ||
            'from:(billing@ OR noreply@ OR support@ OR subscription@ OR payment@ OR invoice@) ' +
            'subject:(subscription OR billing OR payment OR invoice OR receipt OR renewal OR charge) ' +
            'has:attachment';

        try {
            const response = await this.gmail.users.messages.list({
                userId: 'me',
                q: subscriptionQuery,
                maxResults: maxResults
            });

            const messages = response.data.messages || [];
            const subscriptionEmails: SubscriptionEmail[] = [];

            for (const message of messages) {
                try {
                    const email = await this.getEmailDetails(message.id);
                    if (email) {
                        subscriptionEmails.push(email);
                    }
                } catch (error) {
                    console.error(`Error fetching email ${message.id}:`, error);
                }
            }

            return subscriptionEmails;
        } catch (error) {
            console.error('Error searching emails:', error);
            throw error;
        }
    }

    private async getEmailDetails(messageId: string): Promise<SubscriptionEmail | null> {
        try {
            const response = await this.gmail.users.messages.get({
                userId: 'me',
                id: messageId,
                format: 'full'
            });

            const message = response.data;
            const headers = message.payload.headers;

            const subject = headers.find((h: any) => h.name === 'Subject')?.value || '';
            const sender = headers.find((h: any) => h.name === 'From')?.value || '';
            const date = headers.find((h: any) => h.name === 'Date')?.value || '';

            // Extract snippet from message
            const snippet = message.snippet || '';

            // Parse email content for subscription details
            const subscriptionDetails = this.parseSubscriptionDetails(subject, snippet, sender);

            return {
                id: messageId,
                subject,
                sender,
                date,
                snippet,
                ...subscriptionDetails
            };
        } catch (error) {
            console.error(`Error getting email details for ${messageId}:`, error);
            return null;
        }
    }

    private parseSubscriptionDetails(subject: string, snippet: string, sender: string): Partial<SubscriptionEmail> {
        const details: Partial<SubscriptionEmail> = {};

        // Extract service name from sender
        const serviceMatch = sender.match(/@([^.]+)\./);
        if (serviceMatch) {
            details.service = serviceMatch[1];
        }

        // Extract amount (look for currency patterns)
        const amountRegex = /\$(\d+(?:\.\d{2})?)|(\d+(?:\.\d{2})?)\s*(?:USD|dollars?)/i;
        const amountMatch = (subject + ' ' + snippet).match(amountRegex);
        if (amountMatch) {
            details.amount = parseFloat(amountMatch[1] || amountMatch[2]);
        }

        // Extract next billing date
        const dateRegex = /(?:next|renewal|billing).*?(?:date|on).*?(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4})/i;
        const dateMatch = (subject + ' ' + snippet).match(dateRegex);
        if (dateMatch) {
            details.nextBillingDate = dateMatch[1];
        }

        return details;
    }

    async getUserProfile() {
        if (!this.oauth2Client) {
            throw new Error('Not authenticated');
        }

        const oauth2 = google.oauth2({ version: 'v2', auth: this.oauth2Client });
        const response = await oauth2.userinfo.get();
        return response.data;
    }
}

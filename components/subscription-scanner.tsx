'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Mail, Calendar, DollarSign, Building } from 'lucide-react';
import { SubscriptionEmail } from '@/lib/gmail-service';

interface SubscriptionScannerProps {
    isGmailConnected: boolean;
}

export function SubscriptionScanner({ isGmailConnected }: SubscriptionScannerProps) {
    const [emails, setEmails] = useState<SubscriptionEmail[]>([]);
    const [isScanning, setIsScanning] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const handleScan = async () => {
        if (!isGmailConnected) return;

        setIsScanning(true);
        try {
            const response = await fetch('/api/gmail/scan', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: searchQuery,
                    maxResults: 50
                }),
            });

            const { emails: scannedEmails } = await response.json();
            setEmails(scannedEmails || []);
        } catch (error) {
            console.error('Error scanning emails:', error);
        } finally {
            setIsScanning(false);
        }
    };

    const formatDate = (dateString: string) => {
        try {
            return new Date(dateString).toLocaleDateString();
        } catch {
            return dateString;
        }
    };

    const formatAmount = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    return (
        <div className="w-full space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Search className="h-5 w-5" />
                        Scan for Subscriptions
                    </CardTitle>
                    <CardDescription>
                        Search your Gmail inbox for subscription-related emails
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-2">
                        <input
                            type="text"
                            placeholder="Search query (optional)"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="flex-1 min-w-0 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <Button
                            onClick={handleScan}
                            disabled={!isGmailConnected || isScanning}
                            className="sm:flex-shrink-0"
                        >
                            {isScanning ? 'Scanning...' : 'Scan Emails'}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {emails.length > 0 && (
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">
                        Found {emails.length} subscription-related emails
                    </h3>
                    <div className="grid gap-4">
                        {emails.map((email) => (
                            <Card key={email.id} className="hover:shadow-md transition-shadow">
                                <CardHeader className="pb-3">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <CardTitle className="text-base line-clamp-2">
                                                {email.subject}
                                            </CardTitle>
                                            <CardDescription className="flex items-center gap-2 mt-1">
                                                <Mail className="h-3 w-3" />
                                                {email.sender}
                                            </CardDescription>
                                        </div>
                                        <div className="flex flex-col items-end gap-1">
                                            {email.amount && (
                                                <Badge variant="secondary" className="flex items-center gap-1">
                                                    <DollarSign className="h-3 w-3" />
                                                    {formatAmount(email.amount)}
                                                </Badge>
                                            )}
                                            {email.service && (
                                                <Badge variant="outline" className="flex items-center gap-1">
                                                    <Building className="h-3 w-3" />
                                                    {email.service}
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="pt-0">
                                    <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                                        {email.snippet}
                                    </p>
                                    <div className="flex items-center justify-between text-xs text-gray-500">
                                        <span>{formatDate(email.date)}</span>
                                        {email.nextBillingDate && (
                                            <span className="flex items-center gap-1">
                                                <Calendar className="h-3 w-3" />
                                                Next: {email.nextBillingDate}
                                            </span>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

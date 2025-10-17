'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, CheckCircle, AlertCircle } from 'lucide-react';

interface GmailConnectionProps {
    isConnected: boolean;
    gmailEmail?: string;
}

export function GmailConnection({ isConnected, gmailEmail }: GmailConnectionProps) {
    const [isConnecting, setIsConnecting] = useState(false);

    const handleConnect = async () => {
        setIsConnecting(true);
        try {
            const response = await fetch('/api/gmail/auth');
            const { authUrl } = await response.json();

            if (authUrl) {
                window.location.href = authUrl;
            }
        } catch (error) {
            console.error('Error connecting Gmail:', error);
        } finally {
            setIsConnecting(false);
        }
    };

    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    Gmail Integration
                </CardTitle>
                <CardDescription>
                    Connect your Gmail account to automatically scan for subscription emails
                </CardDescription>
            </CardHeader>
            <CardContent>
                {isConnected ? (
                    <div className="flex items-center gap-2 text-green-600">
                        <CheckCircle className="h-4 w-4" />
                        <span>Connected to {gmailEmail}</span>
                    </div>
                ) : (
                    <Button
                        onClick={handleConnect}
                        disabled={isConnecting}
                        className="w-full"
                    >
                        {isConnecting ? 'Connecting...' : 'Connect Gmail'}
                    </Button>
                )}
            </CardContent>
        </Card>
    );
}

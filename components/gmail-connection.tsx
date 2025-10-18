'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Mail, RefreshCw } from 'lucide-react';
import { useState } from 'react';

interface GmailConnectionProps {
    isConnected: boolean;
    gmailEmail?: string;
}

export function GmailConnection({ isConnected, gmailEmail }: GmailConnectionProps) {
    const [isConnecting, setIsConnecting] = useState(false);
    const [isDisconnecting, setIsDisconnecting] = useState(false);

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

    const handleDisconnect = async () => {
        setIsDisconnecting(true);
        try {
            const response = await fetch('/api/gmail/disconnect', {
                method: 'DELETE'
            });

            if (response.ok) {
                // Refresh the page to update the connection status
                window.location.reload();
            }
        } catch (error) {
            console.error('Error disconnecting Gmail:', error);
        } finally {
            setIsDisconnecting(false);
        }
    };

    return (
        <Card className="w-full">
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
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-green-600">
                            <CheckCircle className="h-4 w-4" />
                            <span>Connected to {gmailEmail}</span>
                        </div>
                        <div className="flex gap-2">
                            <Button
                                onClick={handleDisconnect}
                                disabled={isDisconnecting}
                                variant="outline"
                                size="sm"
                                className="flex-1"
                            >
                                {isDisconnecting ? (
                                    <>
                                        <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                                        Disconnecting...
                                    </>
                                ) : (
                                    'Disconnect'
                                )}
                            </Button>
                            <Button
                                onClick={handleConnect}
                                disabled={isConnecting}
                                size="sm"
                                className="flex-1"
                            >
                                {isConnecting ? (
                                    <>
                                        <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                                        Reconnecting...
                                    </>
                                ) : (
                                    'Reconnect'
                                )}
                            </Button>
                        </div>
                    </div>
                ) : (
                    <Button
                        onClick={handleConnect}
                        disabled={isConnecting}
                        className="w-full"
                    >
                        {isConnecting ? (
                            <>
                                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                                Connecting...
                            </>
                        ) : (
                            'Connect Gmail'
                        )}
                    </Button>
                )}
            </CardContent>
        </Card>
    );
}

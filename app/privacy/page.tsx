export default function PrivacyPage() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

            <div className="prose max-w-none">
                <h2>Data Collection</h2>
                <p>
                    This application connects to your Gmail account to scan for subscription-related emails.
                    We only access emails that match subscription and billing criteria.
                </p>

                <h2>Data Storage</h2>
                <p>
                    OAuth tokens are stored securely in our database to maintain your Gmail connection.
                    Email content is not permanently stored - only metadata like sender, subject, and extracted billing information.
                </p>

                <h2>Data Usage</h2>
                <p>
                    The application uses your email data solely to identify and track subscription services
                    for personal finance management purposes.
                </p>

                <h2>Contact</h2>
                <p>
                    For questions about this privacy policy, please contact us at your-email@example.com
                </p>
            </div>
        </div>
    );
}

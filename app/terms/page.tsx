export default function TermsPage() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>

            <div className="prose max-w-none">
                <h2>Acceptance of Terms</h2>
                <p>
                    By using this application, you agree to be bound by these Terms of Service.
                </p>

                <h2>Service Description</h2>
                <p>
                    This application provides subscription tracking services by analyzing your Gmail inbox
                    for subscription-related emails and extracting billing information.
                </p>

                <h2>User Responsibilities</h2>
                <p>
                    You are responsible for maintaining the security of your Gmail account and ensuring
                    you have the right to grant access to your email data.
                </p>

                <h2>Limitation of Liability</h2>
                <p>
                    This service is provided as is without warranties. We are not responsible for
                    any issues arising from the use of this application.
                </p>

                <h2>Contact</h2>
                <p>
                    For questions about these terms, please contact us at your-email@example.com
                </p>
            </div>
        </div>
    );
}

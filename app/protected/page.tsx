import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { GmailConnection } from "@/components/gmail-connection";
import { SubscriptionScanner } from "@/components/subscription-scanner";
import { SpendingChart } from "@/components/spendingchart";
import { SubscriptionList } from "@/components/subscription-list";
import { SubscriptionOverview } from "@/components/subscription-overview";
import { UpcomingPayments } from "@/components/upcoming-payments";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getClaims();
  if (error || !data?.claims) {
    redirect("/auth/login");
  }

  // Check if Gmail is connected
  const { data: gmailTokens } = await supabase
    .from('gmail_tokens')
    .select('gmail_email')
    .eq('user_id', data.claims.sub)
    .single();

  const isGmailConnected = !!gmailTokens;
  const gmailEmail = gmailTokens?.gmail_email;

  return (
    <div className="flex-1 w-full flex flex-col gap-8 px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto">
      <div className="flex flex-col gap-8">
        <h2 className="font-bold text-xl sm:text-2xl">Subscription Scanner</h2>
        <UpcomingPayments />
        <SubscriptionOverview />
        <SpendingChart />
        <SubscriptionList />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <GmailConnection
            isConnected={isGmailConnected}
            gmailEmail={gmailEmail}
          />
          {isGmailConnected && (
            <SubscriptionScanner isGmailConnected={isGmailConnected} />
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2 items-start">
        <h2 className="font-bold text-xl sm:text-2xl mb-4">Your user details</h2>
        <pre className="text-xs font-mono p-3 rounded border max-h-32 overflow-auto w-full">
          {JSON.stringify(data.claims, null, 2)}
        </pre>
      </div>
    </div>
  );
}

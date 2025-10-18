import { AuthButton } from "@/components/auth-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import { createClient } from "@/lib/supabase/server";
import { hasEnvVars } from "@/lib/utils";
import { Mail, Search } from "lucide-react";

export async function Navbar() {
    const supabase = await createClient();

    const { data } = await supabase.auth.getClaims();
    const user = data?.claims;
    console.log("🚀 ~ Navbar ~ user:", user)

    return (
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
            <div className="w-full flex justify-between items-center px-10 py-3 text-sm">
                <div>
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                            <Search className="h-5 w-5 text-primary-foreground" />
                        </div>
                        <div>
                            <h1 className="text-sm font-semibold">Subscription Scanner</h1>
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                <Mail className="h-3 w-3" />
                                <span>{user?.email}</span>
                            </div>
                        </div>
                    </div>
                </div>
                {!hasEnvVars ? <EnvVarWarning /> : <AuthButton />}
            </div>
        </nav>
    );
}

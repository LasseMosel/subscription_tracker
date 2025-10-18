import { EnvVarWarning } from "@/components/env-var-warning";
import { AuthButton } from "@/components/auth-button";
import { hasEnvVars } from "@/lib/utils";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export async function Navbar() {
    const supabase = await createClient();

    const { data } = await supabase.auth.getClaims();
    const user = data?.claims;
    console.log("🚀 ~ Navbar ~ user:", user)

    return (
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
            <div className="w-full flex justify-between items-center px-10 py-3 text-sm">
                <div className="flex gap-5 items-center font-semibold">
                    <Link className="text-xl" href={"/"}>SUBSCRIPTION SCANNER</Link> {user?.email}
                </div>
                {!hasEnvVars ? <EnvVarWarning /> : <AuthButton />}
            </div>
        </nav>
    );
}

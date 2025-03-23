import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "./submit-button";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signIn = async (formData: FormData) => {
    "use server";
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect("/login?message=Utilizatorul nu a putut fi autentificat");
    }

    return redirect("/");
  };

  const signUp = async (formData: FormData) => {
    "use server";

    const origin = headers().get("origin");
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/login?message=Verifica emailul pentru a continua inregistrarea");
  };

  return (
    <div className="flex h-screen flex-col items-center bg-content2 w-screen px-8 justify-center gap-2">
      <form className="relative flex flex-col animate-in border-4 p-2 rounded-medium bg-content1 shadow-medium ring-8 ring-cyan-400 ring-opacity-50 w-full md:max-w-md justify-center gap-2 text-foreground
  before:absolute before:inset-0 before:rounded-medium before:border-4 before:border-cyan-400 before:blur-lg before:opacity-50 before:pointer-events-none">

      <label className="text-large" htmlFor="email">
          Email
        </label>
        <input
            className="rounded-md px-4 py-2 bg-cyan-100 border mb-6"
            name="email"
            placeholder="@ibm.ro/@student.upt.ro"
            required
        />
        <label className="text-large" htmlFor="password">
          Parola
        </label>
        <input
            className="rounded-md px-4 py-2 bg-cyan-100 border mb-6"
            type="password"
            name="password"
            placeholder="••••••••"
            required
        />
        <SubmitButton
            formAction={signIn}
            className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2"
            pendingText="Conectare..."
        >
          Conectare
        </SubmitButton>
        <SubmitButton
            formAction={signUp}
            className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2"
            pendingText="Inregistrare..."
        >
          Inregistrare
        </SubmitButton>
        {searchParams?.message && (
            <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
              {searchParams.message}
            </p>
        )}
      </form>
    </div>
  );
}

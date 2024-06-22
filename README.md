# Kit de pornire Next.js și Supabase

## Caracteristici

- Funcționează pe întreaga stivă [Next.js](https://nextjs.org)
  - App Router
  - Pages Router
  - Middleware
  - Client
  - Server
- Pachet `supabase-ssr` pentru configurarea autentificării Supabase cu cookie-uri
- Stilizare cu [Tailwind CSS](https://tailwindcss.com)
- Implementare opțională cu [integrarea Supabase și Vercel](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fnext.js%2Ftree%2Fcanary%2Fexamples%2Fwith-supabase&project-name=nextjs-with-supabase&repository-name=nextjs-with-supabase&demo-title=nextjs-with-supabase&demo-description=This%20starter%20configures%20Supabase%20Auth%20to%20use%20cookies%2C%20making%20the%20user's%20session%20available%20throughout%20the%20entire%20Next.js%20app%20-%20Client%20Components%2C%20Server%20Components%2C%20Route%20Handlers%2C%20Server%20Actions%20and%20Middleware.&demo-url=https%3A%2F%2Fdemo-nextjs-with-supabase.vercel.app%2F&external-id=https%3A%2F%2Fgithub.com%2Fvercel%2Fnext.js%2Ftree%2Fcanary%2Fexamples%2Fwith-supabase&demo-image=https%3A%2F%2Fdemo-nextjs-with-supabase.vercel.app%2Fopengraph-image.png&integration-ids=oac_VqOgBHqhEoFTPzGkPd7L0iH6)
  - Variabile de mediu atribuite automat proiectului Vercel

## Demo

Vizualizați un demo funcțional la [ibmnexus-monard2033s-projects.vercel.app](https://ibmnexus-monard2033s-projects.vercel.app).

## Implementare pe Vercel

Implementarea pe Vercel va ghida crearea unui cont și proiect Supabase. După instalarea integrării Supabase, toate variabilele de mediu relevante vor fi atribuite proiectului pentru o funcționare completă.

## Clonează și rulează local

1. Creați un proiect Supabase la [Supabase dashboard](https://database.new).

2. Creați o aplicație Next.js folosind comanda npx:

   ```bash
   npx create-next-app -e with-supabase
   ```

3. Navigați în directorul aplicației:

   ```bash
   cd nume-aplicație
   ```

4. Redenumiți `.env.local.example` în `.env.local` și actualizați următoarele valori:

   ```
   NEXT_PUBLIC_SUPABASE_URL=[INSERTAȚI URL PROIECT SUPABASE]
   NEXT_PUBLIC_SUPABASE_ANON_KEY=[INSERTAȚI CHEIA ANONIMĂ API SUPABASE]
   ```

5. Rulați serverul de dezvoltare local Next.js:

   ```bash
   npm run dev
   ```

Aplicația ar trebui să ruleze acum pe [localhost:3000](http://localhost:3000).


## Livrabilele Proiectului

Repository-ul proiectului poate fi găsit la [https://github.com/Monard2033/Licenta.git](https://github.com/Monard2033/Licenta.git).

- Codul sursă al aplicației
- Documentație despre arhitectura aplicației
- Instrucțiuni pentru configurarea mediului de dezvoltare

## Pașii de Compilare

1. Clonați repository-ul de pe GitHub:

   ```bash
   git clone https://github.com/Monard2033/Licenta.git
   cd Licenta
   ```

2. Instalați dependențele necesare:

   ```bash
   npm install
   ```

3. Configurați variabilele de mediu în `.env.local`.

4. Compilați aplicația:

   ```bash
   npm run build
   ```

## Pașii de Instalare și Lansare

1. Asigurați-vă că variabilele de mediu sunt setate în `.env.local`.

2. Porniți serverul de dezvoltare local:

   ```bash
   npm run dev
   ```

3. Accesați aplicația în browser la [http://localhost:3000](http://localhost:3000).

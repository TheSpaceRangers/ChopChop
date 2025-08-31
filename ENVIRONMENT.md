# Configuration de l'environnement

## Variables d'environnement requises

Pour que l'application fonctionne avec Supabase, vous devez créer un fichier `.env.local` à la racine du projet avec les variables suivantes :

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
# Clé publishable (anon) - libérée côté client
VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your_supabase_anon_key
```

## Comment obtenir ces valeurs

1. Créez un projet sur [Supabase](https://supabase.com)
2. Allez dans les paramètres du projet (Settings > API)
3. Copiez l'URL du projet et la clé anon/public
4. Collez ces valeurs dans votre fichier `.env`

## Structure de la base de données

L'application nécessite deux tables dans Supabase :

### Table `shopping_lists`

```sql
CREATE TABLE shopping_lists (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  user_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Table `shopping_items`

```sql
CREATE TABLE shopping_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  list_id UUID REFERENCES shopping_lists(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  quantity INTEGER DEFAULT 1,
  completed BOOLEAN DEFAULT FALSE,
  category TEXT DEFAULT 'Autres',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Sécurité

- Le fichier `.env` ne doit jamais être commité dans Git
- Utilisez des Row Level Security (RLS) dans Supabase pour sécuriser vos données
- La clé anon (publishable) est publique et peut être exposée côté client
- Pour le dev, l’app ouvre automatiquement une session anonyme (voir `ensureAuthSession`).

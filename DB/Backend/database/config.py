"""
Supabase client configuration.
Reads SUPABASE_URL and SUPABASE_ANON_KEY from environment / .env file.
"""

import os
from dotenv import load_dotenv
from supabase import create_client, Client

# Load .env from the same directory as this file
_env_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), '.env')
load_dotenv(_env_path)

SUPABASE_URL: str = os.environ.get('SUPABASE_URL', '').strip()
SUPABASE_ANON_KEY: str = os.environ.get('SUPABASE_ANON_KEY', '').strip()

if not SUPABASE_URL or not SUPABASE_ANON_KEY:
    raise RuntimeError(
        "Missing SUPABASE_URL or SUPABASE_ANON_KEY. "
        "Copy .env.example to .env and fill in your Supabase project credentials."
    )

supabase: Client = create_client(SUPABASE_URL, SUPABASE_ANON_KEY)

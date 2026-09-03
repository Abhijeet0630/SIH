from config import supabase

print("Checking states table...")
res = supabase.table('states').select('id', count='exact').limit(1).execute()
print("Count of states:", res.count)
print("Checking categories table...")
res = supabase.table('categories').select('id', count='exact').limit(1).execute()
print("Count of categories:", res.count)

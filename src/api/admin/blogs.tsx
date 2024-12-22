import { createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { data, error } = await supabaseAdmin.auth.admin.listUsers();
    if (error) {
      console.error('Error fetching users:', error.message);
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ users: data.users });
  } catch (err) {
    console.error('Unexpected Error:', err);
    return res.status(500).json({ error: 'Failed to fetch users.' });
  }
}

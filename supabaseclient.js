import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mfvdwtjasmktkateical.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1mdmR3dGphc21rdGthdGVpY2FsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk4NjIxNTIsImV4cCI6MjA1NTQzODE1Mn0.TtzWfNn1AlfoCEbKUYp26sZjO09VWP4aRQKpOjbxb74';  // Replace with your actual key

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
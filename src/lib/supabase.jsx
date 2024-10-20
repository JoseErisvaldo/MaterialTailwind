import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://cszkwzkgaeklahwnahhw.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzemt3emtnYWVrbGFod25haGh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg1MDU5MzAsImV4cCI6MjA0NDA4MTkzMH0.07nehBbhS7yNmA2HA4EjqRtACoSX-xUMKlxrQEn4kzY"
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase
import { createClient } from "@supabase/supabase-js"

const PROJECT_URL = "https://zsspgmkaxjwphmjggiad.supabase.co"
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpzc3BnbWtheGp3cGhtamdnaWFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njg1NjAwOTIsImV4cCI6MTk4NDEzNjA5Mn0.M7BPYPyXnlgJPcNyhu9Ub-lEctFvAAsak5SYAjeJGzE"
const supabase = createClient(PROJECT_URL, PUBLIC_KEY)

export function videoService() {
    return{
        getAllVideos() {
            return supabase.from("Videos")
                    .select("*")
        }
    }
}
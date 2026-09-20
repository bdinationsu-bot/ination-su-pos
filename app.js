// Supabase Cloud Config
const SUPABASE_URL = // SUPABASE_URL နဲ့ SUPABASE_KEY ကို တစ်ကြိမ်ပဲ ကြေညာပါ
if (typeof SUPABASE_URL === 'undefined') {
    var SUPABASE_URL = 'https://sroelnfsolkscsnhmzev.supabase.co';
    var SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNyb2VsbmZzb2xrc2NzbmhtemV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk3OTExOTUsImV4cCI6MjEwNTM2NzE5NX0.08YPxb91t228-dM6tLr2OATdsDcxFyINVnw15fkqeNM';
}

// Client ကို တစ်ကြိမ်သာ Initialize လုပ်ပါ
if (typeof supabaseClient === 'undefined') {
    var supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
}
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNyb2VsbmZzb2xrc2NzbmhtemV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk3OTExOTUsImV4cCI6MjEwNTM2NzE5NX0.08YPxb91t228-dM6tLr2OATdsDcxFyINVnw15fkqeNM';
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Cloud Database သို့ Data သိမ်းရန်
async function saveToCloud(key, data) {
    try {
        await supabaseClient
            .from('pos_data')
            .upsert({ id: key, content: data });
    } catch (err) {
        console.error('Error saving to cloud:', err);
    }
}

// Cloud Database မှ Data ပြန်ယူရန်
async function loadFromCloud(key) {
    try {
        const { data, error } = await supabaseClient
            .from('pos_data')
            .select('content')
            .eq('id', key)
            .maybeSingle();

        if (error || !data) return null;
        return data.content;
    } catch (err) {
        console.error('Error loading from cloud:', err);
        return null;
    }
}
// ===============================
// THAY URL VÀ ANON KEY TẠI ĐÂY
// ===============================
const SUPABASE_URL = "https://lrhppcbzghebhpgreyzt.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxyaHBwY2J6Z2hlYmhwZ3JleXp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQwNjU3MzEsImV4cCI6MjA3OTY0MTczMX0.JJFH4BzuEZ5cPU6ng_vHxziAbWMxwDPLCj2sOrdCxrQ";
// ===============================

const apiBase = SUPABASE_URL + "/rest/v1/messages";
const headers = {
  "apikey": SUPABASE_ANON_KEY,
  "Authorization": "Bearer " + SUPABASE_ANON_KEY,
  "Content-Type": "application/json",
  "Accept": "application/json"
};

// Escape HTML
function escapeHtml(s) {
  if (!s) return "";
  return s.replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
}

// Gửi lời chúc
async function submitMessage({ name, course, message }) {
  const body = JSON.stringify({ name, course, message });
  const res = await fetch(apiBase, { method: "POST", headers, body });
  if (!res.ok) {
    throw new Error(await res.text());
  }
}

// Lấy danh sách lời chúc
async function fetchMessagesRaw() {
  const res = await fetch(apiBase + "?select=name,course,message,created_at&order=created_at.desc", { headers });
  const text = await res.text();
  let data = [];
  try { data = JSON.parse(text); }
  catch (e) { throw new Error("Invalid JSON: " + text); }

  return data;
}

// Format 1 bản ghi
function renderRecord(r) {
  return `
    <div class="entry">
      <strong>${escapeHtml(r.name)}</strong> — <em>${escapeHtml(r.course)}</em>
      <div class="meta">${new Date(r.created_at).toLocaleString()}</div>
      <p>${escapeHtml(r.message)}</p>
    </div>
  `;
}

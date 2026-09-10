# Timy

Versi ini menghubungkan frontend Timy ke backend Node.js dan OpenAI API.

## Yang perlu dilakukan

1. Pastikan Node.js sudah terpasang.
2. Buka folder Timy di Terminal/Command Prompt.
3. Jalankan:
   npm install
4. Salin `.env.example` menjadi `.env`.
5. Isi `OPENAI_API_KEY` di `.env` dengan API key milikmu.
6. Jalankan:
   npm start
7. Buka:
   http://localhost:3000

API key hanya berada di backend melalui `.env`, bukan di Index.html.

Alur:
Browser → Backend → OpenAI API → Backend → Browser

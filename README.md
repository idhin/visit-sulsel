# 🏝️ Visit Sulsel

Platform pariwisata interaktif untuk Provinsi Sulawesi Selatan. Dibangun dengan Next.js 14+, Tailwind CSS, dan Framer Motion untuk memberikan pengalaman pengguna yang memukau.

![Visit Sulsel](https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=1200)

## ✨ Fitur Utama

### 🗺️ Destinasi Wisata
- Gallery destinasi dengan filter kategori (Alam, Pantai, Budaya)
- Detail halaman untuk setiap destinasi
- Image lightbox dan galeri foto
- Rating dan informasi lengkap

### 🍜 Kuliner Khas
- Showcase makanan khas Makassar dan Sulsel
- Kategori: Makanan Utama, Jajanan, Minuman
- Informasi harga dan lokasi terbaik

### 🎭 Budaya & Tradisi
- Profil 4 suku besar (Bugis, Makassar, Toraja, Mandar)
- Gallery tarian tradisional
- Timeline sejarah Sulawesi Selatan
- Kerajinan tangan khas

### 📅 Event & Festival
- Kalender event mendatang
- Countdown timer untuk event
- Filter berdasarkan kategori

### 🏨 Akomodasi
- Daftar hotel dan resort
- Filter berdasarkan tipe, lokasi, dan harga
- Sorting berdasarkan rating, harga, bintang

### 📋 Itinerary Builder
- Paket wisata siap pakai (3, 5, 7 hari)
- Interactive itinerary builder
- Estimasi budget calculator
- Detail aktivitas per hari

## 🎨 Desain

### Tema Visual
- **Warna Utama**: Deep Ocean (#0A2540) - Biru laut dalam
- **Aksen**: Gold (#D4AF37) - Emas tradisional
- **Aksen Sekunder**: Maroon (#8B1A1A) - Terinspirasi tenun Toraja
- **Background**: Cream (#FDF8F3) - Hangat dan elegan

### Tipografi
- **Heading**: Playfair Display (elegan, berkelas)
- **Body**: Plus Jakarta Sans (modern, mudah dibaca)

### Animasi
- Scroll reveal animations dengan Framer Motion
- Parallax effects pada hero sections
- Hover animations pada cards
- Page transitions yang smooth
- Staggered animations untuk list items

## 🚀 Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Language**: TypeScript

## 📦 Instalasi

```bash
# Clone repository
git clone https://github.com/yourusername/visitsulsel.git

# Masuk ke direktori
cd visitsulsel

# Install dependencies
npm install

# Jalankan development server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

## 🏗️ Struktur Proyek

```
visitsulsel/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Landing Page
│   ├── destinasi/         # Halaman Destinasi
│   ├── kuliner/           # Halaman Kuliner
│   ├── budaya/            # Halaman Budaya
│   ├── event/             # Halaman Event
│   ├── akomodasi/         # Halaman Akomodasi
│   └── itinerary/         # Halaman Itinerary
├── components/
│   ├── layout/            # Navbar, Footer
│   ├── home/              # Komponen Landing Page
│   ├── shared/            # Komponen Reusable
│   └── animations/        # Animation Wrappers
├── data/                  # JSON Data
│   ├── destinations.json
│   ├── culinary.json
│   ├── culture.json
│   ├── events.json
│   ├── accommodations.json
│   └── itineraries.json
└── lib/                   # Utilities
```

## 📱 Responsive Design

Website ini fully responsive dan dioptimalkan untuk:
- 📱 Mobile (320px+)
- 📱 Tablet (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Large Desktop (1280px+)

## 🔧 Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🐳 Docker Deployment

### Quick Start (Development/Testing)

```bash
# Build dan jalankan dengan Docker Compose
docker compose up -d --build

# Lihat logs
docker compose logs -f

# Stop
docker compose down
```

Akses aplikasi di http://localhost:3000

### Production dengan Nginx

```bash
# Gunakan docker-compose.prod.yml untuk production
docker compose -f docker-compose.prod.yml up -d --build
```

Akses aplikasi di http://localhost (port 80)

### Konfigurasi SSL/HTTPS

1. Letakkan sertifikat SSL di folder `nginx/ssl/`:
   - `fullchain.pem` - Sertifikat lengkap
   - `privkey.pem` - Private key

2. Edit `nginx/nginx.conf` dan uncomment bagian HTTPS server

3. Ganti `your-domain.com` dengan domain Anda

4. Restart container:
   ```bash
   docker compose -f docker-compose.prod.yml restart nginx
   ```

### Docker Commands

```bash
# Build image saja
docker build -t visitsulsel .

# Jalankan container manual
docker run -d -p 3000:3000 --name visitsulsel visitsulsel

# Lihat status containers
docker compose ps

# Rebuild tanpa cache
docker compose build --no-cache

# Hapus semua (termasuk volumes)
docker compose down -v --rmi all
```

## 📄 Lisensi

© 2026 Visit Sulsel - Provinsi Sulawesi Selatan

---

Dibuat dengan ❤️ untuk Sulawesi Selatan

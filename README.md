# MES — Hệ thống Quản lý Sản xuất Dây cáp

Ứng dụng PWA quản lý sản xuất dây cáp chạy hoàn toàn trên trình duyệt, không cần server backend.

## Tính năng

- **PO** — Quản lý đơn hàng sản xuất, theo dõi mục tiêu mét & trạng thái
- **BOM** — Định mức nguyên vật liệu theo từng mã Thành phẩm + công đoạn
- **Lệnh SX** — Gộp nhiều PO cùng quy cách vào 1 lệnh chạy chung
- **Giao dịch** — Sổ nhập liệu thực tế (xuất NVL, nhập/xuất BTP, nhập TP, phế)
- **Dashboard** — Tiến độ PO, tỷ lệ phế, hao hụt NVL KH/TT, xuất báo cáo Excel

## Cấu trúc file

```
mes-app/
├── index.html      ← App chính (React + logic toàn bộ trong 1 file)
├── manifest.json   ← PWA manifest
├── sw.js           ← Service Worker (offline support)
├── icons/
│   ├── icon-192.png
│   └── icon-512.png
└── README.md
```

## Cách deploy lên GitHub Pages

1. Tạo repository mới trên GitHub
2. Push toàn bộ thư mục này lên branch `main`
3. Vào **Settings → Pages → Source**: chọn `main` branch, thư mục `/ (root)`
4. GitHub Pages sẽ tự build và cấp URL dạng `https://username.github.io/repo-name`

```bash
git init
git add .
git commit -m "Initial MES App"
git branch -M main
git remote add origin https://github.com/username/mes-app.git
git push -u origin main
```

## Dữ liệu

Dữ liệu được lưu trong **localStorage** của trình duyệt — không gửi lên server. Để chuyển dữ liệu sang máy khác, dùng tính năng xuất Excel trên Dashboard.

## Công nghệ

- React 18 (UMD qua CDN)
- Babel Standalone (transpile JSX on-the-fly)
- SheetJS (xuất Excel)
- Lucide React (icons)
- Không cần build step, không cần Node.js

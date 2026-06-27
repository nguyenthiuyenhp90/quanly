# MES — Quản lý Sản xuất Dây cáp

PWA (Progressive Web App) chạy hoàn toàn trên trình duyệt, không cần server backend.  
Dữ liệu lưu trong **localStorage** của thiết bị.

## Tính năng
| Module | Mô tả |
|--------|-------|
| **PO** | Quản lý đơn hàng, theo dõi mục tiêu mét |
| **BOM** | Định mức NVL theo mã TP + công đoạn |
| **Lệnh SX** | Gộp nhiều PO cùng quy cách vào 1 lệnh |
| **Giao dịch** | Sổ nhập liệu thực tế hàng ngày |
| **Dashboard** | Tiến độ PO, phế liệu, hao hụt NVL, xuất Excel |

## Cấu trúc
```
├── index.html      ← Toàn bộ app (React pre-compiled, không cần Babel)
├── manifest.json   ← PWA manifest
├── sw.js           ← Service Worker (offline cache)
└── icons/          ← App icons 192×192 và 512×512
```

## Deploy GitHub Pages
```bash
git add -A
git commit -m "Update MES App v3"
git push
```
Sau đó: **Settings → Pages → Source: main / root**

## Yêu cầu
- Trình duyệt hiện đại (Chrome 90+, Safari 14+, Firefox 88+)
- Kết nối mạng lần đầu để tải React và XLSX từ CDN (~200KB)
- Các lần sau: chạy offline hoàn toàn nhờ Service Worker

# Vịt Nhỏ English 8 & 9

Website có hai tab English 8 và English 9. Hiện tại gồm 6 đề giữa kỳ lớp 8 và 1 đề khảo sát chất lượng đầu năm lớp 9; mỗi đề 25 câu, có chế độ luyện tập và làm bài test.

## Mở website trên GitHub Pages

Sau lần đẩy mã nguồn đầu tiên:

1. Mở repository `english-8-exams` trên GitHub.
2. Chọn **Settings** → **Pages**.
3. Trong **Build and deployment**, chọn **Source: GitHub Actions**.
4. Mở thẻ **Actions** và chờ quy trình **Deploy GitHub Pages** có dấu tích xanh.
5. Website sẽ ở địa chỉ: `https://VietDinh2904.github.io/english-8-exams/`.

Những lần sau, chỉ cần commit và push lên nhánh `main`; GitHub Actions sẽ tự cập nhật website.

## Chạy trên máy bằng VS Code

```powershell
npm install
npm run dev
```

## Kiểm tra riêng bản GitHub Pages

```powershell
npm run build:pages
npm run preview:pages
```

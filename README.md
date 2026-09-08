# Vịt Nhỏ English 8, 9 & 10

Website có ba tab English 8, English 9 và English 10. English 8 có 6 đề giữa kỳ. English 9 được chia rõ thành 1 mục ôn tập Unit 1–3, 1 đề khảo sát đầu năm và 7 đề giữa kỳ lấy từ bộ PDF Global Success; mỗi bài có 25 câu, không gồm phần nghe, có chế độ luyện tập và làm bài test.

English 10 hiện có đủ Unit 1–6, mỗi Unit 25 câu, bao quát từ vựng, ngữ pháp và phát âm/trọng âm theo Global Success. Câu hỏi được biên soạn lại theo các chủ điểm công khai, không sao chép nguyên văn ngân hàng bài tập.

Mục ôn tập English 9 được chọn lọc và biên soạn lại từ ba tài liệu VietJack người dùng đã cung cấp: đề giữa kỳ Bắc Ninh, đề cương ôn Unit 1–3 và tài liệu ngữ pháp Global Success 9. Bảy mục “Đề giữa kỳ” là một nhóm riêng, không nằm trong English 8.

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

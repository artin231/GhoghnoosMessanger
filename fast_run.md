## نصب وابستگی‌ها

ابتدا وابستگی‌های هر بخش را نصب کنید:

```bash
cd Back-end
npm install

cd ../Front-end
npm install

cd ..
npm install
```


> اگر هنگام نصب پکیج‌ها مشکلی داشتید، می‌توانید از mirror موردنظر خود برای نصب پکیج‌ها استفاده کنید.

در صورت نیاز، می‌توانید `nodemon` را برای هر بخش و `concurrently` را در ریشه‌ی پروژه نصب کنید:

```bash
cd Back-end
npm install --save-dev nodemon

cd ../Front-end
npm install --save-dev nodemon

cd ..
npm install --save-dev concurrently
```

و بعد این رو به فایل package.json داخل ریشه ی پروژه بخش scripts اضافه کنید : 

```JSON
"web": "concurrently \"npm run dev --prefix Back-end\" \"npm run dev --prefix Front-end\""
```

بعد توی package.json پوشه Back-end هم داخل بخش scripts این رو اضافه کنید : 

```JSON
"start": "node app.js",
"dev": "nodemon app.js",
```

---

سپس برای اجرای همزمان Front-end و Back-end، از ریشه‌ی پروژه اجرا کنید:

```bash
npm run web
```

با اجرای این دستور، سرور Front-end و Back-end همزمان اجرا می‌شوند.

---

اگه نشد، دیگه مشکل از پروژه نیست؛ یه جای کار رو اشتباه رفتید (:
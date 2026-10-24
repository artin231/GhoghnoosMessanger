
# Sign up

```
POST
```

```
http://127.0.0.1:8000/api/account/signup/
```

برای ثبت نام استفاده میشه 

```
درخواست کلاینت
	|
دیتا ولیدیشن
	|
چک کردن وجود داشتن
	|
هش کردن پسوورد
	|
برگردوندن جواب
```

نمونه درخواست کلاینت :‌

``` json
{
  "user_name": "nima4",
  "name_user": "Nima44",
  "user_password": "12345"
}
```

نمونه پاسخ موفق سرور :

``` json
{
  "message": "Account successfuly created .",
  "user": {
    "user_name": "nima4",
    "name_user": "Nima44"
  }
}
```

---

# Sign in

```
POST
```

```
http://127.0.0.1:8000/api/account/signin
```

برای ورود استفاده میشه

```
درخواست کلاینت
    |
دیتا ولیدیشن
    |
پیدا کردن کاربر
    |
بررسی پسوورد
    |
ساخت session
    |
برگردوندن جواب
```

نمونه درخواست کلاینت :

``` json
{
  "user_name": "nima2",
  "name_user": "Nima",
  "user_password": "12345"
}
```

نمونه پاسخ موفق سرور :‌

```json
{
  "message": "Login successful.",
  "user": {
    "user_name": "nima2",
    "name_user": "Nima"
  }
}
```

---

# Profile

```
GET
```

```
http://127.0.0.1:8000/api/account/profile/
```

برای دیدن پروفایل کاربر استفاده میشه.

```
درخواست کلاینت
    |
بررسی session
    |
گرفتن user_id از session
    |
پیدا کردن کاربر در دیتابیس
    |
برگردوندن اطلاعات پروفایل
```

اگر کاربر Login نکرده باشد، `requireAuth` درخواست را رد می‌کند.

نمونه ورودی:

```JSON
// هیچی
```

نمونه خروجی موفق سرور:

```JSON
{
  "user": {
    "id": 4,
    "user_name": "CR7",
    "name_user": "LM10"
  }
}
```

---

# Log out

```
POST
```

```
http://127.0.0.1:8000/api/account/logout/
```

برای خروج کاربر از حساب استفاده میشه.

```
درخواست کلاینت
    |
بررسی session
    |
از بین بردن session
    |
پاک کردن Cookie مربوط به session
    |
برگردوندن جواب
```

بعد از Logout، session کاربر از بین میره و درخواست‌های بعدی که نیاز به Login دارند، باید با خطای `401 Unauthorized` مواجه بشن.

نمونه ورودی:

```JSON
// هیچی
```

نمونه خروجی موفق سرور:

```JSON
{
  "message": "Logout successful."
}
```
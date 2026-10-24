
```shell
cd Back-end
npm install
npx prisma validate
npx prisma generate
touch .env
```

داخل فایل .env :

``` shell
PORT=8000

DB_URL=mysql://userName:password@host:port/name

DB_HOST=هاست دیتابیس
DB_USER=یوزر دیتابیس
DB_PASSWORD=رمز دیتابیس
DB_NAME=نام دیتابیس
CLIENT_URL=لینک کلاینت

SESSION_SECRET=یک چرت و ئرت طولانی شامل اعداد و کاراکتر ها بدون اسپیس
```

DB_URL بهش دقت کنید . اسم ها رو درست سر جاش بزارید 

داخل نرم افزار mySQL , XXAMP , WAMP یا هر چیز دیگه ایی این کويری رو وارد کنید : 

``` SQL
CREATE TABLE users (
	id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(20) NOT NULL,
    name_user VARCHAR(20) NOT NULL,
    user_password VARCHAR(255) NOT NULL
);

ALTER TABLE users
ADD COLUMN createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP;
```

و بعد اجرا کنید

### سپس دعا کنید سرور بالا بیاد 
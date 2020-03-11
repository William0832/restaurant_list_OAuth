# Restaurant List Auth

餐廳清單網站，連結資料庫並加入 CRUD、搜尋、排序、使用者認證、FB 登入功能

## Requirement

[Node.js](https://nodejs.org/en/)  
[mongodb](https://www.mongodb.com/)

## Packages

[express](https://expressjs.com/)  
[express-handlebars](https://www.npmjs.com/package/express-handlebars)  
[body-parser](https://www.npmjs.com/package/body-parser)  
[method-override](https://www.npmjs.com/package/method-override)  
[mongoose](https://mongoosejs.com/)  
[express-session](https://www.npmjs.com/package/express-session)  
[passport](http://www.passportjs.org/)  
[passport-local](http://www.passportjs.org/packages/passport-local/)  
[passport-facebook](http://www.passportjs.org/packages/passport-facebook/)  
[bcryptjs](https://www.npmjs.com/package/bcryptjs)  
[connect-flash](https://www.npmjs.com/package/connect-flash)  
[dotenv](https://www.npmjs.com/package/dotenv)

## 功能表

- 可由餐廳名稱、餐廳類別搜尋特定餐廳
- 點擊餐廳可顯示更多詳細資訊
- 點擊左上"我的餐廳清單"可返回首頁
- CRUD 功能
- 可依照地區、餐廳名稱、評分進行排序
- 註冊、登入(FB 登入)、登出功能

## 安裝操作

1. **下載專案**

```
git clone https://github.com/William0832/restaurant_list_refactoring.git
```

2. **由 Terminal 進入專案資料夾**

```
cd restaurant_list_refactoring
```

3. **安裝專案需求套件**

```
npm install
```

4. **新增 Database**

```
node ./models/seeds/seeder.js
```

5. **執行專案**

```
npm run dev
```

6. **檢視 Terminal 訊息：**

**App is listening on [localhost:3000](http://localhost:3000)**

**db connected!**

7. **測試用帳號:**

| Name  |             Email              | Password |
| :---: | :----------------------------: | :------: |
| user1 | user1<span>@example.com</span> | 12345678 |
| user2 | user2<span>@example.com</span> | 12345678 |

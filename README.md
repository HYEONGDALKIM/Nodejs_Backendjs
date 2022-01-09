# Nodejs_Backendjs

2021-11-16 course : 윤지수'Node.js

course : 윤지수'Node.js

1.  npm init >>> 설정

2.  npm install -s express

3.  자동으로 감지해서 수정해주는 - nodemon
    npm install nodemon --g // g는 global 어디서든 사용가능하게끔
4.  app.use(express.static('public'))
    static을 통해 경로 정리를 쉽게 할 수 있음.

5.  npm install body-parser --save // body-parser 다운
    post방식은 바디파서가 필요함
    get은 params으로 가능

6.  express 페이지 따라해보기

7.  ajax

8.  mysql >> npm install mysql >> code 추가

9.  라우팅 모듈화, 리팩토링, app.js 단순화

10. DB 데이터추가 / CRUD

11. 로그인폼 만들고 서버로 보냄, DB연결, POST로 회원가입

12. passport 다운

        npm install passport passport-local express-session connect-flash --save-dev

                    인증관련, 소셜이아닌 일반로그인처리, 세션관련처리, 에러메세지 리다이렉트 전달이 용이험

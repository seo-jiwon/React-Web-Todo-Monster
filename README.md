# :bulb: Todo Monster

> 프로젝트 기간 : 2022.10.19(수) ~ 2022.11.28(월)  
<div align="center">
<img width="276" alt="image" src="https://user-images.githubusercontent.com/59152019/221545579-89d010f8-21e3-4f6b-88c7-e744c44119e2.png">
</div>
<br/>

<b>Todo Monster는 할 일 완료 수에 따라 캐릭터가 성장하고, 팔로우 기능을 통해 친구들과 할 일을 공유하는 애플리케이션</b>
<details>
<summary>애플리케이션인데 왜 웹으로 제작되었나요?</summary>
<div markdown="1">
<br/>
유라클 회사와의 협업을 통해 <b>모피어스 모바일 소프트웨어 플랫폼을 이용</b>하여 <b>React로 제작한 웹을 모바일 애플리케이션 형식으로 변경</b>하는 프로젝트입니다.  <br/>
( 모바일 애플리케이션 형식으로 변경하는 파일은 따로 repository를 생성하였습니다. )<br/><br/>
+) 웹으로 확인하는 사용자를 위해 Todo 페이지 useMediaQuery Hook을 추가하여 모바일 크기에만 보여지도록 수정하였습니다.
</div>
</details>

<br/>

## :question: 프로젝트 계획 이유
- 기존 Todo 애플리케이션의 사용 지속성 부족
- 사용자 시각적 재미 요소를 위한 캐릭터 육성
- 카테고리별 할 일 관리 
- 애플리케이션 사용자끼리 할 일 공유
- 팔로우 기능을 통한 특정 인물에게 할 일 공유

<br/>

## :clipboard: 담당 업무 
> 페이지 구성 및 기능(DB 데이터 전송 및 가져오기 등)을 담당했습니다.  
1. Todo 페이지  
    팔로우 정보, 캐릭터 정보 update를 제외한 <b>캘린더, 날짜별 + 카테고리별 Todo CRUD, 사용자 프로필 update</b> 기능을 담당했습니다.
2. Side bar 
3. 회원가입 후 최초 1번 기본 카테고리 생성 (일반 카테고리)
4. Router 설정 및 Express 서버 구축
5. .dot 이용한 Mysql DB 연결

<br/>

## :link: 실행 방법

- 프로그램 실행
```
$ npm install
``` 
```
$ npm start
``` 
<br/>

- 서버 실행
```
$ cd server
```
```
$ node server.js
```

<br/>

## :file_folder: 개발 환경
<img src="https://img.shields.io/badge/Visual Studio Code-007ACC??style=flat-square&logo=Visual Studio Code&logoColor=white"/> <img src="https://img.shields.io/badge/Android Studio-3DDC84??style=flat-square&logo=Android Studio&logoColor=white"/> <img src="https://img.shields.io/badge/Postman-FF6C37??style=flat-square&logo=Postman&logoColor=white"/>

<br/>

## :hammer: 기술 스택
<img src="https://img.shields.io/badge/HTML5-E34F26??style=flat-square&logo=HTML5&logoColor=white"/> <img src="https://img.shields.io/badge/CSS3-1572B6??style=flat-square&logo=CSS3&logoColor=white"/> <img src="https://img.shields.io/badge/JavaScript-F7DF1E??style=flat-square&logo=JavaScript&logoColor=white"/> <img src="https://img.shields.io/badge/React-61DAFB??style=flat-square&logo=React&logoColor=white"/> <img src="https://img.shields.io/badge/MySQL-4479A1??style=flat-square&logo=MySQL&logoColor=white"/> <img src="https://img.shields.io/badge/Node.js-339933??style=flat-square&logo=Node.js&logoColor=white"/> <img src="https://img.shields.io/badge/styled-components-DB7093??style=flat-square&logo=styled-components&logoColor=white"/> 

<br/>

## :eyes: 기능 설명
기능|회원가입|로그인|캐릭터생성|
|------|---|---|---|
|화면|<p align="center"><img width="290" height="530" src="https://user-images.githubusercontent.com/59152019/205899133-95867b76-eabd-4ab6-bbd3-a88f5f7b7d12.gif"></p>|<p align="center"><img width="290" height="530" src="https://user-images.githubusercontent.com/59152019/205899160-a1b2f663-855b-4a79-a43e-060171b7c9fd.gif"></p>|<p align="center"><img width="290" height="530" src="https://user-images.githubusercontent.com/59152019/205899173-b88af825-6c6f-402a-ac6f-798e13f04cef.gif"></p>|
|설명|사용자는 회원가입 후 애플리케이션을 이용할 수 있다.|사용자는 로그인 시 기본으로 생성되는 카테고리를 확인할 수 있다.<br/> 사용자는 로그인 시 기본으로 설정된 이름(Me)을 확인할 수 있다.|사용자는 최초 1회 캐릭터를 생성할 수 있다.|

기능|할 일 추가|할 일 수정|할 일 삭제|
|--|--|------|---|
|화면|<p align="center"><img width="290" height="530" src="https://user-images.githubusercontent.com/59152019/205899190-fb582cee-9cc9-46ef-98fe-0e4b43fad0e6.gif">|<p align="center"><img width="290" height="530" src="https://user-images.githubusercontent.com/59152019/205899314-9051f95d-256a-421e-b1a1-3da7a6328a21.gif"></p>|<p align="center"><img width="290" height="530" src="https://user-images.githubusercontent.com/59152019/205900117-ca5d34b5-d127-48c6-b7b2-ea7c62749971.gif"></p>|
|설명|날짜별 할 일 추가를 할 수 있다.|점 3개 아이콘 클릭 시 모달창이 뜨고 할 일 수정을 할 수 있다.|점 3개 아이콘 클릭 시 모달창이 뜨고 할 일 삭제를 할 수 있다.|

기능|검색 및 둘러보기|팔로우|프로필|
|--|--|------|---|
|화면|<p align="center"><img width="290" height="530" src="https://user-images.githubusercontent.com/59152019/205899400-248f6f58-5c17-48c2-b559-83a9998871f3.gif"></p>|<p align="center"><img width="290" height="530" src="https://user-images.githubusercontent.com/59152019/205934819-6443d8ba-2302-4d91-81ac-9febb917c145.gif"></p>|<p align="center"><img width="290" height="530" src="https://user-images.githubusercontent.com/59152019/205899476-edb3fb6c-97b1-44c2-a954-028a3057f83c.gif"></p>|
|설명|검색 아이콘 클릭 시 본인을 포함한 전체 사용자의 전체공개로 설정된 할 일 목록을 볼 수 있다.<br/> 이메일 검색 시 사용자 검색이 가능하다.|본인을 제외한 다른 사용자 팔로잉이 가능하다.<br/> 사용자는 팔로워, 팔로잉 목록을 확인하고 다른 사용자의 할 일 페이지를 확인 할 수 있다.|사용자는 프로필 이름을 변경할 수 있다.|

기능|카테고리|비밀번호 재설정|로그아웃 및 계정 탈퇴|
|--|--|------|---|
|화면|<p align="center"><img width="290" height="530" src="https://user-images.githubusercontent.com/59152019/205899494-6a8c198e-7040-4dcf-bc43-e318a188c8ce.gif"></p>|<p align="center"><img width="290" height="530" src="https://user-images.githubusercontent.com/59152019/205899506-f1456657-7038-4714-8a9c-665362cfb818.gif"></p>|<p align="center"><img width="290" height="530" src="https://user-images.githubusercontent.com/59152019/205899518-8ca85145-aed4-4d2e-b59b-ba0e0fbc0a6b.gif"></p>|
|설명|사용자는 카테고리를 '전체공개', '일부공개', '나만보기' 조건을 통해 카테고리를 생성, 수정, 삭제할 수 있다.|사용자는 비밀번호를 조건에 맞게 수정할 수 있다.|사용자는 로그아웃 및 계정 탈퇴를 할 수 있다.|

<br/>
<br/>

## :page_facing_up: 테스트 환경
- Android Emulator Pixel 2 API 28
- 개발자 도구 Device Mode iPhone 12 Pro

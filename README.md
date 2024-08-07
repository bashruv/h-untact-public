<img src="https://github.com/user-attachments/assets/53c65df9-abf9-4966-a89c-0efed147341d" height="100" />

## 개요

2020 SVMHS DEPARTMENT OF MEDIA WEB EXHIBITION, H.Untact

2020년 - 2021년동안 진행된 H.Untact의 Next.js 리팩토링 버전입니다.
<br />
기존의 코드는 작품이 모두 로컬로 들어있고, 개인정보 포함등의 이유로 해당 코드만 공개하게 된 점, 양해바랍니다.

## 주요 리팩토링 내용

1. 로컬로 관리되던 이미지와 작품 목록 등을 PostgreSQL (Vercel Postgres) + S3 (Cloudflare R2)로 처리하도록 변경되었습니다.
2. 인포메이션 센터 페이지를 추가하여 전시 페이지를 위한 소통창구를 신설하였습니다.

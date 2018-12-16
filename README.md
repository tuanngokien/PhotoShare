# PhotoShare

Mạng xã hội chia sẻ ảnh

## Công nghệ sử dụng

- Front-end: ReactJS + Redux + Material UI
- Backend: Express.js
- Search engine: Elasticsearch
- Storage: Cloudinary, MySQL
- Google Auto Tagging, Rekognition Auto Tagging, Rekognition AI Moderation
- Facebook SDK

### Cài đặt
#####[Elasticsearch](https://www.elastic.co/guide/en/elasticsearch/reference/current/install-elasticsearch.html)
```bash
$ cd admin
$ python import_search.py
```

Sửa cấu hình kết nối DB tại ./config/config.json
#####Development
```bash
$ cd backend
$ npm install
$ npm start
```
```bash
$ cd frontend
$ npm install
$ npm start
```

#####Production
```bash
$ cd frontend 
$ npm build
$ cp -r build ../backend/frontend_build
$ cd ../backend
$ docker build . -t nkt/photoshare
$ docker run -d --network="host" nkt/photoshare
```

Và sử dụng PhotoShare tại http://localhost:3000
### [API](api.md)
- [api.md](api.md)

### Demo
Login             |  Landing page | Feed |
:-------------------------:|:-------------------------: |:-------------------------:
![Alt text](/screenshot/login.png "login")  |   ![Alt text 2](/screenshot/landing.png "landing") | ![Alt text 2](/screenshot/feed.png "feed")

Collections             |  People | Search |
:-------------------------:|:-------------------------: |:-------------------------:
![Alt text](/screenshot/collections.png "collections")  |   ![Alt text 2](/screenshot/people.png "people") | ![Alt text 2](/screenshot/search.png "search")

Profile Photos             |  Profile Albums | Post detail|
:-------------------------:|:-------------------------: |:-------------------------:
![Alt text](/screenshot/profile_photos.png "photos")  |   ![Alt text 2](/screenshot/profile_album.png "albums") | ![Alt text 2](/screenshot/post_detail.png "post detail")

## Thành viên

1. Đỗ Tuấn Anh - 16020831 - K61-C-CLC
2. Ngô Kiên Tuấn - 16021211 - K61-C-CLC
3. Nguyễn Minh Phương - 17020968 - K62-CQ-CF
4. Trần Mạnh Tùng - 16021226 - K61-C-CLC

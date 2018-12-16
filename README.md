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
Sửa cấu hình kết nối DB tại ./config/config.json
#####[Elasticsearch](https://www.elastic.co/guide/en/elasticsearch/reference/current/install-elasticsearch.html)
```bash
$ cd admin
$ python import_search.py
```
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
## Thành viên

1. Đỗ Tuấn Anh - 16020831 - K61-C-CLC
2. Ngô Kiên Tuấn - 16021211 - K61-C-CLC
3. Nguyễn Minh Phương - 17020968 - K62-CQ-CF
4. Trần Mạnh Tùng - 16021226 - K61-C-CLC

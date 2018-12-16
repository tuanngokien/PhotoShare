## PHOTOSHARE API

## **Authentication**

| Action        | URL           | Method  |Header| Body
| ------------- |:----------:| :-----:| :-----:|:-----:|
| Sign up      | /api/signup | POST |Content-Type:application/x-www-form-urlencoded|firstName, lastName, email, password|
| Login        | /api/login  | POST |Content-Type:application/x-www-form-urlencoded |email, password|

## **PHOTO - POST MANIPULATION**
##### *Required header* :
```Authorization: Bearer {access_token}```


| Action        | URL           | Method  |Header| Body | Note
| ------------- |:----------:| :-----:| :-----:|:-----:|:-----:|
| Feed         | /api/feed  | GET |||
| Get all user's posts| /api/{userId}/posts  | GET |Content-Type:application/x-www-form-urlencoded|type| ["recent", "popular"]||
| New post      | /api/posts | POST |Content-Type:multipart/form-data|photos||
| Post detail      | /api/posts/{postId} | GET ||||
| Delete post      | /api/posts/{postId} | DELETE ||||
| Get users liked post      | /api/posts/{postId}/likes | GET |Content-Type:application/x-www-form-urlencoded|||
| Like post      | /api/posts/{postId}/likes | POST ||||
| Unlike post      | /api/posts/{postId}/likes | DELETE ||||
| Comment post      | /api/posts/{postId}/comments | POST |Content-Type:application/x-www-form-urlencoded|text||
|Edit post comment| /api/posts/{postId}/comments/{commentId} | PATCH |Content-Type:application/x-www-form-urlencoded|text||
| Delete post comment      | /api/posts/{postId}/comments/{commentId} | DELETE ||||
| Update post privacy      | /api/posts/{postId}/privacy | PATCH |Content-Type:application/x-www-form-urlencoded|type|["1","2","3"] (PRIVATE, FRIEND, PUBLIC)|

## **EXPLORER**
##### *Required header* :
```Authorization: Bearer {access_token}```


| Action        | URL           | Method  |Header| Body | Note
| ------------- |:----------:| :-----:| :-----:|:-----:|:-----:|
| Collections         | /api/explorer/collections| GET |||
| Photos         | /api/explorer/photos| GET |||
| People         | /api/explorer/people| GET |||


## **USER - PROFILE UPDATE**
##### *Required header* :
```Authorization: Bearer {access_token}```

| Action        | URL           | Method  |Header| Body | Note
| ------------- |:----------:| :-----:| :-----:|:-----:|:-----:|
| Get user info        | /api/me | GET | ||
| User follow info      | /api/{userId}/follows | GET ||||
| Follow user      | /api/{userId}/follows | POST ||||
| Unfollow user      | /api/{userId}/follows | DELETE ||||
| Change avatar      | /api/profile/avatar | PATCH | Content-Type:application/x-www-form-urlencoded| public_id| Cloudinary image's public id|
| Change basic info      | /api/profile/basic | PATCH | Content-Type:application/x-www-form-urlencoded| email, first_name, last_name||
| Change password      | /api/profile/password| PATCH | Content-Type:application/x-www-form-urlencoded| current_password, new_password, re_new_password||


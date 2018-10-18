## PHOTOSHARE API

## **Authentication**

| Action        | URL           | Method  |Header| Body
| ------------- |:----------:| :-----:| :-----:|:-----:|
| Sign up      | /api/signup | POST |Content-Type:application/x-www-form-urlencoded|firstName, lastName, email, password|
| Login        | /api/login  | POST |Content-Type:application/x-www-form-urlencoded |email, password|
| Get user info        | /api/me | GET |Authorization: Bearer {access_token}, Content-Type:application/x-www-form-urlencoded ||

## **PHOTO - POST MANIPULATION**
##### *Required header* :
```Authorization: Bearer {access_token}```


| Action        | URL           | Method  |Header| Body
| ------------- |:----------:| :-----:| :-----:|:-----:|
| Get all user's posts        | /api/posts  | GET |Content-Type:multipart/form-data||
| New post      | /api/posts | POST |Content-Type:multipart/form-data|caption, images|
| Get post's liked users      | /api/posts/{postId}/likes | GET |Content-Type:multipart/form-data||
| Like post      | /api/posts/{postId}/likes | POST |Content-Type:multipart/form-data||
| Unlike post      | /api/posts/{postId}/likes | DELETE |Content-Type:multipart/form-data||
| Comment post      | /api/posts/{postId}/comments | POST |Content-Type:multipart/form-data|text|
| Edit post comment      | /api/posts/{postId}/comments | POST |Content-Type:multipart/form-data|text|
| Delete comment post      | /api/posts/{postId}/comments/{commentId} | DELETE |Content-Type:multipart/form-data||


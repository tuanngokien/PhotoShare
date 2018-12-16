from django.contrib import admin
from .models import Users, Follows, Comments, Phototags, Photos, Posts, Tags, Userpostlikes, Bookmarks, Albums

admin.site.site_title = 'PhotoShare Admin'
admin.site.site_header = 'PhotoShare Admin'


@admin.register(Users)
class UsersAdmin(admin.ModelAdmin):
    list_display = ["id", "email", "firstname", "lastname"]


@admin.register(Posts)
class PostsAdmin(admin.ModelAdmin):
    list_display = ["id", "userid", "privacy", "viewcount", "createdat", "updatedat"]


@admin.register(Tags)
class TagsAdmin(admin.ModelAdmin):
    list_display = ["id", "name"]


@admin.register(Follows)
class FollowsAdmin(admin.ModelAdmin):
    list_display = ["id", "follow_by", "follow_to", "createdat"]


@admin.register(Comments)
class CommentsAdmin(admin.ModelAdmin):
    list_display = ["id", "userid", "postid", "text"]


@admin.register(Photos)
class PhotosAdmin(admin.ModelAdmin):
    list_display = ("publicid", "width", "height", "originalimage", "postid")


@admin.register(Userpostlikes)
class UserPostLikes(admin.ModelAdmin):
    list_display = ["userid", "postid", "createdat"]


@admin.register(Bookmarks)
class BookmarkAdmins(admin.ModelAdmin):
    list_display = ["id", "bookmark_by", "post"]


admin.site.register(Phototags)
admin.site.register(Albums)

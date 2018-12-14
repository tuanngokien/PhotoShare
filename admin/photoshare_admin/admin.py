from django.contrib import admin
from .models import Users, Follows, Comments, Phototags, Photos, Posts, Tags, Userpostlikes, Bookmarks, Albums

admin.site.site_title = 'PhotoShare Admin'
admin.site.site_header = 'PhotoShare Admin'
admin.site.register(Users)
admin.site.register(Follows)
admin.site.register(Comments)
admin.site.register(Phototags)
admin.site.register(Photos)
admin.site.register(Posts)
admin.site.register(Tags)
admin.site.register(Userpostlikes)
admin.site.register(Bookmarks)
admin.site.register(Albums)

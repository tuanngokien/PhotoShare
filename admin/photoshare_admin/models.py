from django.db import models


class Bookmarks(models.Model):
    createdat = models.DateTimeField(db_column='createdAt')  # Field name made lowercase.
    updatedat = models.DateTimeField(db_column='updatedAt')  # Field name made lowercase.
    bookmark_by = models.ForeignKey('Users', models.DO_NOTHING, db_column='bookmark_by', blank=True, null=True)
    post = models.ForeignKey('Posts', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        verbose_name_plural = "bookmarks"
        db_table = 'Bookmarks'


class Comments(models.Model):
    text = models.CharField(max_length=255, blank=True, null=True)
    createdat = models.DateTimeField(db_column='createdAt')  # Field name made lowercase.
    updatedat = models.DateTimeField(db_column='updatedAt')  # Field name made lowercase.
    userid = models.ForeignKey('Users', models.DO_NOTHING, db_column='UserId')  # Field name made lowercase.
    postid = models.ForeignKey('Posts', models.DO_NOTHING, db_column='PostId')  # Field name made lowercase.

    class Meta:
        managed = False
        verbose_name_plural = "Comments"
        db_table = 'Comments'


class Phototags(models.Model):
    photoid = models.ForeignKey('Photos', models.DO_NOTHING, db_column='PhotoId', primary_key=True)  # Field name made lowercase.
    tagid = models.ForeignKey('Tags', models.DO_NOTHING, db_column='TagId')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'PhotoTags'
        verbose_name_plural = "PhotoTags"
        unique_together = (('photoid', 'tagid'),)


class Photos(models.Model):
    publicid = models.CharField(db_column='publicId', unique=True, max_length=255)  # Field name made lowercase.
    width = models.IntegerField()
    height = models.IntegerField()
    originalimage = models.CharField(db_column='originalImage', max_length=255)  # Field name made lowercase.
    postimage = models.CharField(db_column='postImage', max_length=255)  # Field name made lowercase.
    thumbnail = models.CharField(max_length=255)
    postid = models.ForeignKey('Posts', models.DO_NOTHING, db_column='PostId', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        verbose_name_plural = "Photos"
        db_table = 'Photos'


class Posts(models.Model):
    createdat = models.DateTimeField(db_column='createdAt')  # Field name made lowercase.
    updatedat = models.DateTimeField(db_column='updatedAt')  # Field name made lowercase.
    userid = models.ForeignKey('Users', models.DO_NOTHING, db_column='UserId')  # Field name made lowercase.
    privacy = models.CharField(max_length=1)
    viewcount = models.BigIntegerField(db_column='viewCount')  # Field name made lowercase.

    class Meta:
        managed = False
        verbose_name_plural = "Posts"
        db_table = 'Posts'

    def __str__(self):
        return str(self.id)

class Tags(models.Model):
    name = models.TextField()

    class Meta:
        managed = False
        verbose_name_plural = "Tags"
        db_table = 'Tags'


class Userpostlikes(models.Model):
    createdat = models.DateTimeField(db_column='createdAt')  # Field name made lowercase.
    updatedat = models.DateTimeField(db_column='updatedAt')  # Field name made lowercase.
    postid = models.ForeignKey(Posts, models.DO_NOTHING, db_column='PostId', primary_key=True)  # Field name made lowercase.
    userid = models.ForeignKey('Users', models.DO_NOTHING, db_column='UserId')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'UserPostLikes'
        verbose_name_plural = "UserPostLikes"
        unique_together = (('postid', 'userid'),)


class Users(models.Model):
    email = models.CharField(unique=True, max_length=30)
    password = models.CharField(max_length=255)
    firstname = models.CharField(db_column='firstName', max_length=30)  # Field name made lowercase.
    lastname = models.CharField(db_column='lastName', max_length=30)  # Field name made lowercase.
    createdat = models.DateTimeField(db_column='createdAt')  # Field name made lowercase.
    updatedat = models.DateTimeField(db_column='updatedAt')  # Field name made lowercase.
    avatar = models.TextField()

    class Meta:
        managed = False
        verbose_name_plural = "Users"
        db_table = 'Users'

    def __str__(self):
        return self.firstname + " " + self.lastname


class Follows(models.Model):
    createdat = models.DateTimeField(db_column='createdAt')  # Field name made lowercase.
    updatedat = models.DateTimeField(db_column='updatedAt')  # Field name made lowercase.
    follow_by = models.ForeignKey(Users, models.DO_NOTHING, db_column='follow_by', blank=True, null=True, related_name="following")
    follow_to = models.ForeignKey(Users, models.DO_NOTHING, db_column='follow_to', blank=True, null=True, related_name="follower")

    class Meta:
        managed = False
        verbose_name_plural = "Follows"
        db_table = 'follows'


class Albums(models.Model):
    class Meta:
        managed = False
        verbose_name_plural = "Albums"
        db_table = 'albums'

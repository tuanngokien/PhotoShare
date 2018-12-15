# Generated by Django 2.1.4 on 2018-12-14 10:09

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Bookmarks',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('createdat', models.DateTimeField(db_column='createdAt')),
                ('updatedat', models.DateTimeField(db_column='updatedAt')),
            ],
            options={
                'db_table': 'Bookmarks',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Comments',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.CharField(blank=True, max_length=255, null=True)),
                ('createdat', models.DateTimeField(db_column='createdAt')),
                ('updatedat', models.DateTimeField(db_column='updatedAt')),
            ],
            options={
                'db_table': 'Comments',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Follows',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('createdat', models.DateTimeField(db_column='createdAt')),
                ('updatedat', models.DateTimeField(db_column='updatedAt')),
            ],
            options={
                'db_table': 'follows',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Photos',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('publicid', models.CharField(db_column='publicId', max_length=255, unique=True)),
                ('width', models.IntegerField()),
                ('height', models.IntegerField()),
                ('originalimage', models.CharField(db_column='originalImage', max_length=255)),
                ('postimage', models.CharField(db_column='postImage', max_length=255)),
                ('thumbnail', models.CharField(max_length=255)),
            ],
            options={
                'db_table': 'Photos',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Posts',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('createdat', models.DateTimeField(db_column='createdAt')),
                ('updatedat', models.DateTimeField(db_column='updatedAt')),
                ('privacy', models.CharField(max_length=1)),
                ('viewcount', models.BigIntegerField(db_column='viewCount')),
            ],
            options={
                'db_table': 'Posts',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Tags',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.TextField()),
            ],
            options={
                'db_table': 'Tags',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Users',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.CharField(max_length=30, unique=True)),
                ('password', models.CharField(max_length=255)),
                ('firstname', models.CharField(db_column='firstName', max_length=30)),
                ('lastname', models.CharField(db_column='lastName', max_length=30)),
                ('createdat', models.DateTimeField(db_column='createdAt')),
                ('updatedat', models.DateTimeField(db_column='updatedAt')),
                ('avatar', models.TextField()),
            ],
            options={
                'db_table': 'Users',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Phototags',
            fields=[
                ('photoid', models.ForeignKey(db_column='PhotoId', on_delete=django.db.models.deletion.DO_NOTHING, primary_key=True, serialize=False, to='photoshare_admin.Photos')),
            ],
            options={
                'db_table': 'PhotoTags',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Userpostlikes',
            fields=[
                ('createdat', models.DateTimeField(db_column='createdAt')),
                ('updatedat', models.DateTimeField(db_column='updatedAt')),
                ('postid', models.ForeignKey(db_column='PostId', on_delete=django.db.models.deletion.DO_NOTHING, primary_key=True, serialize=False, to='photoshare_admin.Posts')),
            ],
            options={
                'db_table': 'UserPostLikes',
                'managed': False,
            },
        ),
    ]
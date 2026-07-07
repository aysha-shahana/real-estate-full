from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("my_app", "0038_alter_blog_category_alter_blog_featured_image_and_more"),
    ]

    operations = [
        migrations.SeparateDatabaseAndState(
            database_operations=[],
            state_operations=[
                migrations.AlterField(
                    model_name="blog",
                    name="category",
                    field=models.ForeignKey(
                        to="my_app.blogcategory",
                        on_delete=django.db.models.deletion.PROTECT,
                        related_name="blogs",
                    ),
                ),
            ],
        ),
    ]
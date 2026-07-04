from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("my_app", "0036_blogcategory"),
    ]

    operations = [
        migrations.AlterField(
            model_name="blog",
            name="category",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.PROTECT,
                related_name="blogs",
                to="my_app.blogcategory",
            ),
        ),
    ]
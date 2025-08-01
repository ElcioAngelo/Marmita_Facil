# Generated by Django 5.2.4 on 2025-07-29 02:07

import django.core.validators
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('marmitas', '0002_initial'),
        ('usuarios', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='restaurante',
            name='codigo',
            field=models.PositiveBigIntegerField(blank=True, null=True, unique=True, validators=[django.core.validators.MinValueValidator(100000), django.core.validators.MaxValueValidator(999999)]),
        ),
        migrations.AlterField(
            model_name='restaurante',
            name='marmita',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='marmitas.marmita'),
        ),
    ]

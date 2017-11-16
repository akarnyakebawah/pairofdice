from django.db import models
from uuid import uuid4
from autoslug import AutoSlugField


def header_directory_path(instance, filename):
    ext = filename.split('.')[-1]
    return "campaigns/{0}/{1}.{2}".format(instance.slug, "header", ext)


def twibbon_directory_path(instance, filename):
    ext = filename.split('.')[-1]
    return "campaigns/{0}/{1}.{2}".format(instance.slug, "twibbon", ext)


# IMPORTANT!
# Tambahin tags
# Sebelum prod, hapus file migrations biar rapi


    user = models.ForeignKey(User, related_name="campaigns",
                             on_delete=models.CASCADE)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.slug


def twibbon_item_directory_path(instance, filename):
    ext = filename.split('.')[-1]
    return "campaigns/{0}/{1}.{2}".format(instance.campaign.slug, uuid4().hex, ext)


class Twibbon(models.Model):
    user = models.ForeignKey(User, related_name="twibbons",
                             on_delete=models.CASCADE)
    campaign = models.ForeignKey(Campaign, related_name="twibbons",
                                 on_delete=models.CASCADE)
    img = models.ImageField(upload_to=twibbon_item_directory_path)
    caption = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

from django import forms

class Campaign(forms.Form):
    name = forms.CharField(max_length=100)
    hash_tag = forms.CharField(max_length=100)
    slug = AutoSlugField(populate_from="name", unique=True, primary_key=True)

    description = forms.CharField(blank=True)
    caption_template = forms.CharField(blank=True)

    header_img = forms.ImageField()
    twibbon_img = forms.ImageField()

    latitude = forms.FloatField(blank=True, null=True)
    longtitude = forms.FloatField(blank=True, null=True)
    city = forms.CharField(max_length=100)

    started_at = forms.DateTimeField(null=True)
    finished_at = forms.DateTimeField(null=True)
    created_at = forms.DateTimeField(auto_now_add=True)
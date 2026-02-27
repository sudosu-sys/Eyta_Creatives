from django.contrib import admin
from .models import *

@admin.register(HeroSection)
class HeroSectionAdmin(admin.ModelAdmin):
    list_display = ('tagline', 'title_preview')
    
    def title_preview(self, obj):
        return obj.title[:50] + "..." if len(obj.title) > 50 else obj.title
    
    # This prevents creating multiple Hero configurations if you only want one
    def has_add_permission(self, request):
        if HeroSection.objects.exists():
            return False
        return True

class ParagraphInline(admin.TabularInline):
    model = SubHeroParagraph
    extra = 1

class StatInline(admin.TabularInline):
    model = SubHeroStat
    extra = 1

@admin.register(SubHeroSection)
class SubHeroSectionAdmin(admin.ModelAdmin):
    inlines = [ParagraphInline, StatInline]

class VideoParagraphInline(admin.TabularInline):
    model = VideoSectionParagraph
    extra = 1

@admin.register(VideoSectionModel)
class VideoSectionModelAdmin(admin.ModelAdmin):
    inlines = [VideoParagraphInline]

@admin.register(ProductCategory)
class ProductCategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'order']

@admin.register(ProductItem)
class ProductItemAdmin(admin.ModelAdmin):
    list_display = ['name', 'price', 'category', 'order']

@admin.register(ProductsSectionModel)
class ProductsSectionModelAdmin(admin.ModelAdmin):
    pass

class FeatureItemInline(admin.TabularInline):
    model = FeatureItem
    extra = 4  # Opens up 4 blank rows by default since you have 4 features
    fields = ['icon', 'title', 'description', 'order']

@admin.register(FeaturesSectionModel)
class FeaturesSectionModelAdmin(admin.ModelAdmin):
    list_display = ['__str__']
    inlines = [FeatureItemInline]

from .models import BlogSectionModel, BlogPost

@admin.register(BlogSectionModel)
class BlogSectionModelAdmin(admin.ModelAdmin):
    list_display = ['__str__']

@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ['title', 'date', 'order']
    list_editable = ['order']

from .models import FAQSectionModel, FAQItem, AboutPane

# FAQ Admin Setup
class FAQItemInline(admin.TabularInline):
    model = FAQItem
    extra = 3
    fields = ['question', 'answer', 'order']

@admin.register(FAQSectionModel)
class FAQSectionModelAdmin(admin.ModelAdmin):
    list_display = ['__str__']
    inlines = [FAQItemInline]

# About Admin Setup
@admin.register(AboutPane)
class AboutPaneAdmin(admin.ModelAdmin):
    list_display = ['heading', 'tag', 'order']
    list_editable = ['order']

@admin.register(ContactSectionModel)
class ContactSectionModelAdmin(admin.ModelAdmin):
    list_display = ['__str__']

# Footer Admin setup
class SocialLinkInline(admin.TabularInline):
    model = SocialLink
    extra = 3

class LegalLinkInline(admin.TabularInline):
    model = LegalLink
    extra = 2

class FooterLinkGroupInline(admin.TabularInline):
    model = FooterLinkGroup
    extra = 2

@admin.register(FooterConfigModel)
class FooterConfigModelAdmin(admin.ModelAdmin):
    list_display = ['__str__']
    inlines = [SocialLinkInline, LegalLinkInline, FooterLinkGroupInline]
from rest_framework import serializers
from .models import HeroSection
from rest_framework import serializers
from .models import *

class HeroSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = HeroSection
        fields = '__all__'



class SubHeroParagraphSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubHeroParagraph
        fields = ['text']

class SubHeroStatSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubHeroStat
        fields = ['label', 'value', 'suffix']

class SubHeroSectionSerializer(serializers.ModelSerializer):
    # Flatten paragraphs to a simple list of strings to match your frontend
    bodyParagraphs = serializers.SerializerMethodField()
    stats = SubHeroStatSerializer(many=True, read_only=True)

    class Meta:
        model = SubHeroSection
        fields = ['tag', 'heading', 'bodyParagraphs', 'image1', 'image2', 'link_text', 'link_target', 'stats']

    def get_bodyParagraphs(self, obj):
        return [p.text for p in obj.paragraphs.all()]
    

class VideoSectionSerializer(serializers.ModelSerializer):
    bodyParagraphs = serializers.SerializerMethodField()
    backgroundImage = serializers.ImageField(source='background_image', read_only=True)
    # Map the new video field
    videoFile = serializers.FileField(source='video_file', read_only=True)
    ctaText = serializers.CharField(source='cta_text', read_only=True)
    ctaTarget = serializers.CharField(source='cta_target', read_only=True)

    class Meta:
        model = VideoSectionModel
        fields = ['tag', 'heading', 'bodyParagraphs', 'backgroundImage', 'videoFile', 'ctaText', 'ctaTarget']

    def get_bodyParagraphs(self, obj):
        return [p.text for p in obj.paragraphs.all()]

class ProductItemSerializer(serializers.ModelSerializer):
    # Flatten the category name to match your frontend interface
    category = serializers.CharField(source='category.name')
    
    class Meta:
        model = ProductItem
        fields = ['id', 'name', 'price', 'image', 'category']

class ProductsSectionSerializer(serializers.ModelSerializer):
    # Map snake_case to camelCase
    addToCartText = serializers.CharField(source='add_to_cart_text', read_only=True)
    addedToCartText = serializers.CharField(source='added_to_cart_text', read_only=True)
    viewAllText = serializers.CharField(source='view_all_text', read_only=True)
    
    categories = serializers.SerializerMethodField()
    products = serializers.SerializerMethodField()

    class Meta:
        model = ProductsSectionModel
        fields = ['tag', 'heading', 'description', 'addToCartText', 'addedToCartText', 'viewAllText', 'categories', 'products']

    def get_categories(self, obj):
        # Fetch ordered category names
        return [cat.name for cat in ProductCategory.objects.all()]
        
    def get_products(self, obj):
        products = ProductItem.objects.all()
        request = self.context.get('request')
        # Pass context so images get absolute URLs
        return ProductItemSerializer(products, many=True, context={'request': request}).data
    
class FeatureItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = FeatureItem
        fields = ['icon', 'title', 'description']

class FeaturesSectionSerializer(serializers.ModelSerializer):
    # This grabs all the related FeatureItems and nests them inside the 'features' array
    features = FeatureItemSerializer(many=True, read_only=True)

    class Meta:
        model = FeaturesSectionModel
        fields = ['features']

class BlogPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogPost
        fields = ['id', 'title', 'date', 'image', 'excerpt', 'content']

class BlogSectionSerializer(serializers.ModelSerializer):
    readMoreText = serializers.CharField(source='read_more_text', read_only=True)
    viewAllText = serializers.CharField(source='view_all_text', read_only=True)
    posts = serializers.SerializerMethodField()

    class Meta:
        model = BlogSectionModel
        fields = ['tag', 'heading', 'readMoreText', 'viewAllText', 'posts']

    def get_posts(self, obj):
        posts = BlogPost.objects.all()
        request = self.context.get('request')
        return BlogPostSerializer(posts, many=True, context={'request': request}).data
    
# FAQ Serializers
class FAQItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQItem
        fields = ['id', 'question', 'answer']

class FAQSectionSerializer(serializers.ModelSerializer):
    ctaText = serializers.CharField(source='cta_text', read_only=True)
    ctaTarget = serializers.CharField(source='cta_target', read_only=True)
    faqs = FAQItemSerializer(many=True, read_only=True)

    class Meta:
        model = FAQSectionModel
        fields = ['tag', 'heading', 'ctaText', 'ctaTarget', 'faqs']

# About Serializers
class AboutPaneSerializer(serializers.ModelSerializer):
    backgroundColor = serializers.CharField(source='background_color', read_only=True)
    textColor = serializers.CharField(source='text_color', read_only=True)

    class Meta:
        model = AboutPane
        fields = ['tag', 'heading', 'image', 'backgroundColor', 'textColor', 'quote', 'attribution', 'paragraphs']

# Contact Serializers
class ContactSectionSerializer(serializers.ModelSerializer):
    backgroundImage = serializers.ImageField(source='background_image', read_only=True)
    locationLabel = serializers.CharField(source='location_label', read_only=True)
    emailLabel = serializers.CharField(source='email_label', read_only=True)
    phoneLabel = serializers.CharField(source='phone_label', read_only=True)
    
    formFields = serializers.SerializerMethodField()
    submitText = serializers.CharField(source='submit_text', read_only=True)
    submittingText = serializers.CharField(source='submitting_text', read_only=True)
    submittedText = serializers.CharField(source='submitted_text', read_only=True)
    successMessage = serializers.CharField(source='success_message', read_only=True)

    class Meta:
        model = ContactSectionModel
        fields = [
            'heading', 'description', 'backgroundImage', 'location', 'locationLabel', 
            'email', 'emailLabel', 'phone', 'phoneLabel', 'formFields',
            'submitText', 'submittingText', 'submittedText', 'successMessage'
        ]

    def get_formFields(self, obj):
        return {
            "namePlaceholder": obj.name_placeholder,
            "emailPlaceholder": obj.email_placeholder,
            "messagePlaceholder": obj.message_placeholder,
        }

# Footer Serializers
class SocialLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialLink
        fields = ['icon', 'href', 'label']

class LegalLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = LegalLink
        fields = ['label', 'href']

class FooterLinkGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = FooterLinkGroup
        fields = ['title', 'links']

class FooterSectionSerializer(serializers.ModelSerializer):
    brandName = serializers.CharField(source='brand_name', read_only=True)
    brandDescription = serializers.CharField(source='brand_description', read_only=True)
    copyrightText = serializers.CharField(source='copyright_text', read_only=True)
    
    newsletterHeading = serializers.CharField(source='newsletter_heading', read_only=True)
    newsletterDescription = serializers.CharField(source='newsletter_description', read_only=True)
    newsletterPlaceholder = serializers.CharField(source='newsletter_placeholder', read_only=True)
    newsletterButtonText = serializers.CharField(source='newsletter_button_text', read_only=True)
    newsletterSuccessText = serializers.CharField(source='newsletter_success_text', read_only=True)

    socialLinks = SocialLinkSerializer(source='social_links', many=True, read_only=True)
    legalLinks = LegalLinkSerializer(source='legal_links', many=True, read_only=True)
    linkGroups = FooterLinkGroupSerializer(source='link_groups', many=True, read_only=True)

    class Meta:
        model = FooterConfigModel
        fields = [
            'brandName', 'brandDescription', 'copyrightText',
            'newsletterHeading', 'newsletterDescription', 'newsletterPlaceholder',
            'newsletterButtonText', 'newsletterSuccessText',
            'socialLinks', 'legalLinks', 'linkGroups'
        ]
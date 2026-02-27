from django.db import models

class HeroSection(models.Model):
    tagline = models.CharField(max_length=255, blank=True)
    title = models.TextField(help_text="Use newlines to separate lines of text")
    background_image = models.ImageField(upload_to='hero/')
    
    # Primary CTA
    cta_primary_text = models.CharField(max_length=100, blank=True)
    cta_primary_target = models.CharField(max_length=255, default="#products")
    
    # Secondary CTA
    cta_secondary_text = models.CharField(max_length=100, blank=True)
    cta_secondary_target = models.CharField(max_length=255, default="#contact")

    def __str__(self):
        return f"Hero Section - {self.tagline[:20]}"

    class Meta:
        verbose_name = "Hero Section"
        verbose_name_plural = "Hero Section"


class SubHeroSection(models.Model):
    tag = models.CharField(max_length=100, blank=True)
    heading = models.CharField(max_length=255)
    image1 = models.ImageField(upload_to='subhero/', blank=True, null=True)
    image2 = models.ImageField(upload_to='subhero/', blank=True, null=True)
    
    link_text = models.CharField(max_length=100, blank=True)
    link_target = models.CharField(max_length=255, default="#contact")

    def __str__(self):
        return f"SubHero - {self.heading[:30]}"

class SubHeroParagraph(models.Model):
    subhero = models.ForeignKey(SubHeroSection, related_name='paragraphs', on_delete=models.CASCADE)
    text = models.TextField()
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

class SubHeroStat(models.Model):
    subhero = models.ForeignKey(SubHeroSection, related_name='stats', on_delete=models.CASCADE)
    label = models.CharField(max_length=100)
    value = models.IntegerField()
    suffix = models.CharField(max_length=10, blank=True, help_text="e.g. +, %, k")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

class VideoSectionModel(models.Model):
    tag = models.CharField(max_length=100, blank=True)
    heading = models.CharField(max_length=255)
    # The thumbnail/poster image
    background_image = models.ImageField(upload_to='videosection/', blank=True, null=True)
    # The actual video file
    video_file = models.FileField(upload_to='videosection_videos/', blank=True, null=True, help_text="Upload the video to be played")
    
    cta_text = models.CharField(max_length=100, blank=True)
    cta_target = models.CharField(max_length=255, default="#contact")

    def __str__(self):
        return f"Video Section - {self.heading[:30]}"

class VideoSectionParagraph(models.Model):
    video_section = models.ForeignKey(VideoSectionModel, related_name='paragraphs', on_delete=models.CASCADE)
    text = models.TextField()
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

class ProductCategory(models.Model):
    name = models.CharField(max_length=100)
    order = models.PositiveIntegerField(default=0)
    
    class Meta:
        ordering = ['order']
        verbose_name_plural = "Product Categories"
        
    def __str__(self):
        return self.name

class ProductItem(models.Model):
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to='products/')
    category = models.ForeignKey(ProductCategory, on_delete=models.CASCADE, related_name='products')
    order = models.PositiveIntegerField(default=0)
    
    class Meta:
        ordering = ['order']
        
    def __str__(self):
        return self.name

class ProductsSectionModel(models.Model):
    tag = models.CharField(max_length=100, blank=True)
    heading = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    add_to_cart_text = models.CharField(max_length=100, default="Add to Cart")
    added_to_cart_text = models.CharField(max_length=100, default="Added")
    view_all_text = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return "Products Section Configuration"
    
class FeaturesSectionModel(models.Model):
    title = models.CharField(max_length=255, blank=True, help_text="Internal name for the section")

    def __str__(self):
        return self.title or "Features Section Configuration"

    class Meta:
        verbose_name = "Features Section"
        verbose_name_plural = "Features Section"

class FeatureItem(models.Model):
    ICON_CHOICES = [
        ('Truck', 'Truck'),
        ('ShieldCheck', 'Shield Check'),
        ('Leaf', 'Leaf'),
        ('Heart', 'Heart'),
    ]
    section = models.ForeignKey(FeaturesSectionModel, related_name='features', on_delete=models.CASCADE)
    icon = models.CharField(max_length=50, choices=ICON_CHOICES)
    title = models.CharField(max_length=255)
    description = models.TextField()
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.title
    
class BlogSectionModel(models.Model):
    tag = models.CharField(max_length=100, blank=True)
    heading = models.CharField(max_length=255)
    read_more_text = models.CharField(max_length=100, default="Read More")
    view_all_text = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return "Blog Section Configuration"

    class Meta:
        verbose_name = "Blog Section"
        verbose_name_plural = "Blog Section"

class BlogPost(models.Model):
    title = models.CharField(max_length=255)
    date = models.CharField(max_length=100, help_text="e.g. May 24, 2024")
    image = models.ImageField(upload_to='blog/')
    excerpt = models.TextField()
    content = models.TextField(help_text="The full article text for the modal popup")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.title
    
# ==========================================
# FAQ SECTION MODELS
# ==========================================
class FAQSectionModel(models.Model):
    tag = models.CharField(max_length=100, blank=True)
    heading = models.CharField(max_length=255)
    cta_text = models.CharField(max_length=100, blank=True, help_text="Text for the contact link")
    cta_target = models.CharField(max_length=255, default="#contact")

    def __str__(self):
        return "FAQ Section Configuration"

    class Meta:
        verbose_name = "FAQ Section"
        verbose_name_plural = "FAQ Section"

class FAQItem(models.Model):
    section = models.ForeignKey(FAQSectionModel, related_name='faqs', on_delete=models.CASCADE)
    question = models.CharField(max_length=255)
    answer = models.TextField()
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.question

# ==========================================
# ABOUT SECTION MODELS
# ==========================================
class AboutPane(models.Model):
    tag = models.CharField(max_length=100, blank=True)
    heading = models.CharField(max_length=255)
    image = models.ImageField(upload_to='about/')
    
    # Styling
    background_color = models.CharField(max_length=50, default="#ffffff", help_text="e.g. #ffffff or #8b6d4b")
    text_color = models.CharField(max_length=50, default="#000000", help_text="e.g. #000000 or #ffffff")
    
    # Content type: Either a quote OR paragraphs
    quote = models.TextField(blank=True, help_text="If provided, this pane will render as a quote block.")
    attribution = models.CharField(max_length=255, blank=True)
    
    # If using Django 3.1+, you can use models.JSONField. 
    # This expects a list of strings: ["Paragraph 1 text", "Paragraph 2 text"]
    paragraphs = models.JSONField(default=list, blank=True, help_text='Enter a JSON list of strings, e.g., ["Para 1", "Para 2"]')
    
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']
        verbose_name = "About Section Pane"
        verbose_name_plural = "About Section Panes"

    def __str__(self):
        return self.heading
    
# ==========================================
# CONTACT SECTION MODELS
# ==========================================
class ContactSectionModel(models.Model):
    heading = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    background_image = models.ImageField(upload_to='contact/', blank=True, null=True)
    
    # Contact Info
    location_label = models.CharField(max_length=100, default="Visit Us")
    location = models.CharField(max_length=255, blank=True)
    email_label = models.CharField(max_length=100, default="Email Us")
    email = models.EmailField(blank=True)
    phone_label = models.CharField(max_length=100, default="Call Us")
    phone = models.CharField(max_length=100, blank=True)
    
    # Form Configuration
    name_placeholder = models.CharField(max_length=100, default="Your Name")
    email_placeholder = models.CharField(max_length=100, default="Your Email")
    message_placeholder = models.CharField(max_length=100, default="Your Message")
    submit_text = models.CharField(max_length=100, default="Send Message")
    submitting_text = models.CharField(max_length=100, default="Sending...")
    submitted_text = models.CharField(max_length=100, default="Sent Successfully")
    success_message = models.CharField(max_length=255, default="Thank you! We will get back to you soon.")

    def __str__(self):
        return "Contact Section Configuration"

    class Meta:
        verbose_name = "Contact Section"
        verbose_name_plural = "Contact Section"

# ==========================================
# FOOTER SECTION MODELS
# ==========================================
class FooterConfigModel(models.Model):
    brand_name = models.CharField(max_length=255)
    brand_description = models.TextField()
    copyright_text = models.CharField(max_length=255)
    
    # Newsletter Config
    newsletter_heading = models.CharField(max_length=255, blank=True)
    newsletter_description = models.TextField(blank=True)
    newsletter_placeholder = models.CharField(max_length=100, default="Enter your email")
    newsletter_button_text = models.CharField(max_length=100, default="Subscribe")
    newsletter_success_text = models.CharField(max_length=100, default="Subscribed!")

    def __str__(self):
        return "Footer Configuration"

    class Meta:
        verbose_name = "Footer Section"
        verbose_name_plural = "Footer Section"

class SocialLink(models.Model):
    ICON_CHOICES = [('Instagram', 'Instagram'), ('Facebook', 'Facebook'), ('Twitter', 'Twitter')]
    footer = models.ForeignKey(FooterConfigModel, related_name='social_links', on_delete=models.CASCADE)
    icon = models.CharField(max_length=50, choices=ICON_CHOICES)
    label = models.CharField(max_length=100, help_text="e.g. Follow us on Instagram")
    href = models.CharField(max_length=255)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

class LegalLink(models.Model):
    footer = models.ForeignKey(FooterConfigModel, related_name='legal_links', on_delete=models.CASCADE)
    label = models.CharField(max_length=100)
    href = models.CharField(max_length=255)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

class FooterLinkGroup(models.Model):
    footer = models.ForeignKey(FooterConfigModel, related_name='link_groups', on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    # Using JSONField to store the list of links easily: [{"label": "Home", "href": "#home"}]
    links = models.JSONField(default=list, help_text='Format: [{"label": "Link Name", "href": "#target"}]')
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']
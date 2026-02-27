from django.urls import path
from . import views

urlpatterns = [
    path('hero/', views.hero_data, name='hero-data'),
    path('subhero/', views.subhero_data, name='subhero-data'),
    path('video-section/', views.video_section_data, name='video-section-data'),
    path('products-section/', views.products_section_data, name='products-section-data'),
    path('features-section/', views.features_section_data, name='features-section-data'),
    path('blog-section/', views.blog_section_data, name='blog-section-data'),
    path('faq-section/', views.faq_section_data, name='faq-section-data'),
    path('about-section/', views.about_section_data, name='about-section-data'),
    path('contact-section/', views.contact_section_data, name='contact-section-data'),
    path('footer-section/', views.footer_section_data, name='footer-section-data'),
]
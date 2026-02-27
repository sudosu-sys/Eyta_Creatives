from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import *
from .serializers import *

@api_view(['GET'])
def hero_data(request):
    hero = HeroSection.objects.first()
    if hero:
        serializer = HeroSectionSerializer(hero, context={'request': request})
        return Response(serializer.data)
    return Response({"error": "No hero content found"}, status=404)

@api_view(['GET'])
def subhero_data(request):
    subhero = SubHeroSection.objects.first()
    if subhero:
        serializer = SubHeroSectionSerializer(subhero, context={'request': request})
        return Response(serializer.data)
    return Response({"error": "No subhero content found"}, status=404)

@api_view(['GET'])
def video_section_data(request):
    section = VideoSectionModel.objects.first()
    if section:
        # Pass the request in the context so the ImageField builds a full absolute URL
        serializer = VideoSectionSerializer(section, context={'request': request})
        return Response(serializer.data)
    return Response({})



@api_view(['GET'])
def products_section_data(request):
    section = ProductsSectionModel.objects.first()
    if section:
        serializer = ProductsSectionSerializer(section, context={'request': request})
        return Response(serializer.data)
    return Response({})

@api_view(['GET'])
def features_section_data(request):
    section = FeaturesSectionModel.objects.first()
    if section:
        serializer = FeaturesSectionSerializer(section)
        return Response(serializer.data)
    return Response({})

@api_view(['GET'])
def blog_section_data(request):
    section = BlogSectionModel.objects.first()
    if section:
        serializer = BlogSectionSerializer(section, context={'request': request})
        return Response(serializer.data)
    return Response({})

@api_view(['GET'])
def faq_section_data(request):
    section = FAQSectionModel.objects.first()
    if section:
        serializer = FAQSectionSerializer(section)
        return Response(serializer.data)
    return Response({})

@api_view(['GET'])
def about_section_data(request):
    panes = AboutPane.objects.all()
    # Pass request context so images get absolute URLs
    serializer = AboutPaneSerializer(panes, many=True, context={'request': request})
    return Response(serializer.data)

@api_view(['GET'])
def contact_section_data(request):
    section = ContactSectionModel.objects.first()
    if section:
        serializer = ContactSectionSerializer(section, context={'request': request})
        return Response(serializer.data)
    return Response({})

@api_view(['GET'])
def footer_section_data(request):
    section = FooterConfigModel.objects.first()
    if section:
        serializer = FooterSectionSerializer(section)
        return Response(serializer.data)
    return Response({})
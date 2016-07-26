from django.shortcuts import render
from django.contrib.auth.models import User

# Create your views here.

def home(request):
    context = {
        'users': User.objects.all() 
    }
    return render(request, 'chat_homepage.html', context)

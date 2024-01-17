from django.shortcuts import render

# Create your views here.

def index(request, *args, **kwarg):
    return render(request, 'frontend/index.html')
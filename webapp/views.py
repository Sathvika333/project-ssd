from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login 


from django.contrib import messages

from webapp.models import UserProfile

# Create your views here.

from django.http import HttpResponse

def home(request):
    return render(request, 'Home.html')

def about(request):
    return render(request, 'about.html')




def signup_view(request):
    if request.method == 'POST':
        email = request.POST.get('regemail')
        password = request.POST.get('regpass')
        languages = request.POST.get('languages')  # Ensure this field exists in your form

        # Check if the user already exists
        if User.objects.filter(username=email).exists():
            messages.error(request, 'Email is already registered.')
            return redirect('signup')

        # Create the user with the email as the username
        user = User.objects.create_user(username=email, email=email)
        user.set_password(password)
        user.save()
        profile = UserProfile.objects.create(user =user,language=languages)
        profile.save()

        return render(request, 'signup_login.html',{"msg":'sigup successful'})

    return render(request, 'signup_login.html')


def login_view(request):
    if request.method == 'POST':
        email = request.POST['logemail']
        password = request.POST['pass']
        
        # Authenticate the user
        user = authenticate(request, username=email, password=password)
        if user is not None:
            login(request, user)
            # Redirect to the music discovery page after successful login
            return redirect('music_discovery')
        else:
            messages.error(request, 'Invalid email or password')
            return redirect('login')  # Redirect back to login if authentication fails

    return render(request, 'signup_login.html')

def music_discovery(request):
    user = request.user
    return render(request, 'main.html',{'user':user})# This is your music discovery HTML template


def arjit_playlist(request):
    return render(request,'arjit.html') 


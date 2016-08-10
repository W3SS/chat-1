from django.shortcuts import render, redirect, HttpResponse
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings

import json
import time

from chat.models import Message, Chat
from chat.utils import json_response, date_handler
from chat import constants


def home(request):
    if not request.user.is_authenticated():
        return redirect('/accounts/login')

    return render(request, 'index.html', {})


@csrf_exempt
def get_current_user_api(request):
    user = request.user

    context = {
        'user_id': user.id,
        'username': user.username
    }

    return json_response(context)


@csrf_exempt
def get_all_users_api(request):
    if not request.user.is_authenticated():
        return HttpResponse('You are not loged in')

    all_users = User.objects.all()
    users = list(all_users.exclude(username=request.user).values('username'))

    context = {
        'users': users
    }

    return json_response(context)


@csrf_exempt
def get_user_chats_api(request):
    if not request.user.is_authenticated():
        return HttpResponse('You are not loged in')

    user_chats = Chat.objects.filter(participants=request.user)

    chats = {}
    if user_chats:
        for user_chat in user_chats:
            chat_id = user_chat.id

            interlocutor = user_chat.participants.exclude(id=request.user.id).first()

            last_message = user_chat.messages.latest('timestamp')

            chat = {
                'chat_id': chat_id,
                'last_message': last_message.text,
                'last_message_sender_id': last_message.sender.id,
                'last_message_timestamp': last_message.timestamp,
                'last_message_is_read': last_message.is_read,
                'interlocutor_id': interlocutor.id,
                'interlocutor_username': interlocutor.username,
                'is_interlocutor_typing': False
            }

            chats[chat_id] = chat

    context = {
        'chats': chats
    }

    return json_response(context)


@csrf_exempt
def create_chat_api(request):
    if not request.user.is_authenticated():
        return HttpResponse('You are not loged in')

    username = request.GET.get('username')

    recipient = User.objects.get(username=username)

    chat = Chat.objects.filter(participants=recipient).filter(participants=request.user)
    if chat.exists():
        chat = chat.first()
        return json_response({'type': 'CHAT_ALREADY_EXISTS', 'chat_id': chat.id})

    chat = Chat.objects.create()
    chat.participants.add(request.user, recipient)
    initial_message = Message(text='{} started the conversation!'.format(request.user.username), sender=request.user)
    initial_message.save()
    chat.messages.add(initial_message)

    chat_info = {
        'chat_id': chat.id,
        'last_message': initial_message.text,
        'last_message_sender_id': request.user.id,
        'last_message_timestamp': initial_message.timestamp,
        'last_message_is_read': False,
        'interlocutor_id': recipient.id,
        'interlocutor_username': recipient.username,
        'is_interlocutor_typing': False
    }

    return json_response({'type': 'CHAT_NEW', 'chat': chat_info})


@csrf_exempt
def load_chat_messages_api(request):
    if not request.user.is_authenticated():
        return HttpResponse('You are not loged in')

    page_number = request.GET.get('page')
    chat_id = request.GET.get('chat_id')

    chat = Chat.objects.get(id=chat_id)
    chat_messages = list(chat.messages.all().values('text', 'sender__username', 'timestamp', 'is_read'))

    start = (int(page_number) - 1) * constants.MESSAGES_PAGE_SIZE
    end = int(page_number) * constants.MESSAGES_PAGE_SIZE

    chat_messages = chat_messages[start:end]

    hasMore = True
    if len(chat_messages) != constants.MESSAGES_PAGE_SIZE:
        hasMore = False

    context = {
        'chat_messages': chat_messages,
        'has_more_chat_messages': hasMore
    }

    return json_response(context)


@csrf_exempt
def send_message_api(request):
    api_key = request.POST.get('api_key')

    if api_key != settings.API_KEY:
        return json_response({'error': 'Please pass a correct API key.'})

    sender_id = request.POST.get('sender_id')
    sender = User.objects.get(id=sender_id)
    message_text = request.POST.get('message')

    message_instance = Message()
    message_instance.sender = sender
    message_instance.text = message_text
    message_instance.save()

    chat_id = request.POST.get('chat_id')
    chat = Chat.objects.get(id=chat_id)
    chat.messages.add(message_instance)

    return json_response({'status': 'ok'})


@csrf_exempt
def read_chat_message_api(request):
    reader_id = request.POST.get('reader_id')
    chat_id = request.POST.get('chat_id')

    reader = User.objects.get(id=reader_id)
    chat = Chat.objects.get(id=chat_id)

    unread_messages = chat.messages.filter(is_read=False).exclude(sender=reader)

    for message in unread_messages:
        message.is_read = True
        message.save()

    return json_response({'status': 'ok'})

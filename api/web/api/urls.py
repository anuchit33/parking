# api/urls.py

from django.conf.urls import url, include
from rest_framework.urlpatterns import format_suffix_patterns
from .views import *

urlpatterns = {
    url(r'^carlist_x/$', CreateView.as_view(), name="create"),
    url(r'^carlist/clear_all/$', ClearAllView.as_view(), name="clear_all"),
    url(r'^carlist/create/(?P<size>[0-9]+)/$', AutoCreateView.as_view(), name="auto_create"),
    url(r'^carlist/count/$', GetCountView.as_view(), name="get_count"),
}

urlpatterns = format_suffix_patterns(urlpatterns)
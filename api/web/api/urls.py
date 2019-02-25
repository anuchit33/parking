# api/urls.py

from django.conf.urls import url, include
from rest_framework.urlpatterns import format_suffix_patterns
from .views import CreateView,ClearAllView

urlpatterns = {
    url(r'^carlist/$', CreateView.as_view(), name="create"),
    url(r'^carlist/clear_all/$', ClearAllView.as_view(), name="clear_all"),
}

urlpatterns = format_suffix_patterns(urlpatterns)
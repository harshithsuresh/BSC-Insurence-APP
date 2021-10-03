
from django.urls import path
from insurence import views

urlpatterns=[
    path('getPremiumDetails/<int:pk>',views.getPremiumDetails,name='getPremiumDetails'),
    path('updatePremiumDetails/',views.updatePremiumDetails,name='updatePremiumDetails'),
    path('getPremiumCounts/',views.getPremiumCount,name='getPremiumCount'),
    path('uploadData/',views.uploadData,name='uploadData'),
]
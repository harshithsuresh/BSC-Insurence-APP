from django.contrib import admin
from insurence.models import premium,customer

#Display Details in Django admin console
class PremiumAdmin(admin.ModelAdmin):
    list_display=('premiumID','dateOfPurchage','premiumAmount','customerID','customerMaritalStatus')
admin.site.register(premium,PremiumAdmin)

class CustomerAdmin(admin.ModelAdmin):
    list_display=('customerID','fuel','vechileSegment','gender','region')
    list_filter=('fuel','vechileSegment','gender','region')
admin.site.register(customer,CustomerAdmin)



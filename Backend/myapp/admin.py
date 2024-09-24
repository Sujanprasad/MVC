from django.contrib import admin
from .models import *


admin.site.register(user)
admin.site.register(Registration)
admin.site.register(TodoItem)
admin.site.register(ProductUser)
admin.site.register(OTP)
admin.site.register(Product)

admin.site.register(ImageUpload)
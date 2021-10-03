from django.db import models


#Customer details Model
class customer(models.Model):
    customerID=models.IntegerField(primary_key=True)
    fuel=models.CharField(max_length=20)
    vechileSegment=models.CharField(max_length=10)   
    gender=models.CharField(max_length=10) 
    region=models.CharField(max_length=10)


#Premium details model
class premium(models.Model):
    premiumID=models.IntegerField(primary_key=True)
    customerID=models.ForeignKey(customer, on_delete=models.CASCADE,related_name="premiumList")
    dateOfPurchage=models.DateField()
    premiumAmount=models.IntegerField()    
    bodyInjuryLiability=models.IntegerField()
    personalInjuryProtection=models.IntegerField()
    propertyDamageLiability=models.IntegerField()
    collision=models.IntegerField()
    comprehensive=models.IntegerField()
    customerIncomeGroup=models.CharField(max_length=10)
    customerMaritalStatus=models.IntegerField()
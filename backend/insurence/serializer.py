
from rest_framework import serializers
from insurence.models import premium,customer

#Serializer for Premium model queryset
class PremiumSerializer(serializers.ModelSerializer):
    class Meta:
        model=premium
        fields='__all__'

#Serializer for customer model queryset with premium model queryset
class GetAllPrimiumSerializer(serializers.ModelSerializer):
    premiumList=PremiumSerializer(many=True,read_only=True)
    class Meta:
        model=customer
        fields='__all__'

#Serializer for customer model queryset
class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model=customer
        fields='__all__'

#Serializer for aggregate data of premium count for each month
class MonthCountSerializer(serializers.Serializer):
    count=serializers.CharField()
    month=serializers.DateField()

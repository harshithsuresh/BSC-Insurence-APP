
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from django.db.models.functions import TruncMonth
from django.db.models import Count

from insurence.models import premium,customer

from insurence.serializer import PremiumSerializer,GetAllPrimiumSerializer,CustomerSerializer,MonthCountSerializer

from datetime import datetime
import pandas as pd

@api_view(['GET'])
def getPremiumDetails(request,pk):
    try:
        #Get premium details based on premiumID
        premiumDetails = premium.objects.get(pk=pk)
        premiumSerializer=PremiumSerializer(premiumDetails)           
        customerSerializer=CustomerSerializer(customer.objects.get(pk=premiumSerializer.data['customerID']))
        serializer={'premiumList':[premiumSerializer.data]}
        serializer.update(customerSerializer.data)
        return Response(serializer)    
    except:            
        try:
            #Get premium details based on customerID
            print("aaaa")
            customerDetails = customer.objects.get(pk=pk)
            serializer = GetAllPrimiumSerializer(customerDetails)
            return Response(serializer.data)
        except Exception as e:
            #No details found
            return Response({'Details':'No Premium found'},status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def updatePremiumDetails(request):
    data=request.data
    try:
        #Updating customer details
        customer.objects.filter(customerID=data['customerID']).update(
            fuel=data['fuel'],    
            vechileSegment=data['vechileSegment'],
            gender=data['gender'],
            region=data['region']
        )
        #Updating premium details
        premium.objects.filter(premiumID=data['premiumID']).update(
            premiumAmount=data['premiumAmount'],
            bodyInjuryLiability=data['bodyInjuryLiability'],
            personalInjuryProtection=data['personalInjuryProtection'],
            propertyDamageLiability=data['propertyDamageLiability'],
            collision=data['collision'],
            comprehensive=data['comprehensive'],
            customerIncomeGroup=data['customerIncomeGroup'],
            customerMaritalStatus=data['customerMaritalStatus'],
        )
        message={'details':'Success'}
        #Success status.HTTP_200_OK
        return Response(message,status=status.HTTP_200_OK)
    except Exception as e:
        #Failed status.HTTP_500_INTERNAL_SERVER_ERROR
        message={'details':'Error Updating details'}
        return Response(message,status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def getPremiumCount(request):
    #Get premium count for each month
    regions=customer.objects.order_by('region').values('region').distinct()
    regionCount={}
    for region in regions:
        monthCount=(premium.objects.filter(customerID__region=region['region'])
                            .values('dateOfPurchage')
                            .annotate(month=TruncMonth('dateOfPurchage'))
                            .values('month').annotate(count=Count('customerID'))
                            .values('month', 'count'))
        regionCount[region['region']]=MonthCountSerializer(monthCount,many=True).data
    return Response(regionCount)

@api_view(['GET'])
def uploadData(request):
    #Uploading data from DB from local file
    dataSet=pd.read_csv("Data Set - Insurance Client.csv")    
    for index,row in dataSet.iterrows():
        try:
            #If customer details already exist,
            Customer=customer.objects.get(customerID=row['Customer_id'])
        except:
            #If customer details does not exist
            Customer=customer.objects.create(
                customerID = row['Customer_id'],
                fuel=row['Fuel'],
                vechileSegment=row['VEHICLE_SEGMENT'],
                gender=row['Customer_Gender'],
                region=row['Customer_Region']
            )
        try:
            Premium=premium.objects.get(premiumID=row['Policy_id'])
            print("Premium details exist")
            continue
        except:
            premium.objects.create(
                premiumID=row['Policy_id'],
                dateOfPurchage=datetime.strptime(row['Date of Purchase'],"%m/%d/%Y").strftime("%Y-%m-%d"),
                customerID=Customer,
                premiumAmount=row['Premium'],
                bodyInjuryLiability=row['bodily injury liability'],
                personalInjuryProtection=row[' personal injury protection'],
                propertyDamageLiability=row[' property damage liability'],
                collision=row[' collision'],
                comprehensive=row[' comprehensive'],
                customerIncomeGroup=row['Customer_Income group'],
                customerMaritalStatus=row['Customer_Marital_status']
            )
    message={'details':'Success'}
    #Success status.HTTP_200_OK
    return Response(message,status=status.HTTP_200_OK)
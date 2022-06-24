# BasketballPredictions
 
 This repo is the work of Team East creating the Basketball Prediction web application for Dod&Gy
 
 See Demo.MP4 to get a demonstration of the applicaiton if the live links are down!
 
 ## Website
 https://teameastangular.azurewebsites.net/
 
 ## API
 https://teameastbasketball.azurewebsites.net/
 
 ## C# Coding Standards
 https://docs.microsoft.com/en-us/dotnet/csharp/fundamentals/coding-style/coding-conventions
 
 
 
# Deployment
The latest build of the website and api can be found in the releases section of this repo. These builds are configured to work with the current Microsoft Azure Deployments.

# Custom Deployment

## Database
Download the BasketballDatabase.sql from the v1.0.0 release. Run on chosen MSSQL server.

## API
- Clone the repository and use the 'main' branch. Navigate to BasketballApi > DatabaseHandlers > DatabaseHandler.cs
- Change the Datasource, UserID, Password and InitialCatalog variables to the correct information of your own Database Connection.
- After the variables have been changed, run this command 'dotnet publish /p:Configuration=Release /p:EnvironmentName=Production'
- Navigate to BasketballApi > bin > Release > net5.0
- In this directory the 'publish' folder will be uploaded for deployment on the chosen server

## Website
- After the API has been deployed
- Clone the repository and use the 'main' branch. Navigate to BasketballApp > src > environments > environment.prod.ts
- Change the 'api_url" variable to be the URL of your API deployment
- After the variables have been changed, run this command 'ng build --configuration production'
- Navigate to BasketballApp > dist
- In this directory the 'basketball-app' folder will be uploaded for deployment on the chosen server

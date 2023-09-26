import * as Print from "expo-print";
import * as FileSystem from "expo-file-system";
import * as IntentLauncher from "expo-intent-launcher";
import { Platform } from "react-native";
import * as Sharing from "expo-sharing";
import { generateReportForStoresWithUserId } from "../../reports/storeReport";
import { logoBaseUrl } from "../globalConstants";
import Chart from "chart.js/auto";

//pass the userId without hardcoding here. maybe use helperContext to store the relevant storeId
export const CreateReport = async (stores) => {
  const userId = "12312312312".slice(-5);

  const { storeDetails } = await generateReportForStoresWithUserId(stores);

  function generateChartHTML(storeDetails) {
    return `
      <!-- Here is an example of a pie chart -->
      <div class="chart">
        <canvas id="pie-chart" width="400" height="300"></canvas>
      </div>

      <!-- Here is an example of a bar chart -->
      <div class="chart">
        <canvas id="bar-chart" width="400" height="300"></canvas>
      </div>

      <script>
        // Example Chart.js code for pie chart
        var pieChartCtx = document.getElementById('pie-chart').getContext('2d');
        var pieChartData = {
          labels: ${JSON.stringify(
            storeDetails.map((store) => store.storeName)
          )},
          datasets: [{
            data: ${JSON.stringify(
              storeDetails.map(
                (store) => store.featuredBrandsInfo.featuredBrandCount
              )
            )},
            backgroundColor: [
              'red',
              'orange',
              'yellow',
              'green',
              'blue',
              'purple'
            ]
          }]
        };
        new Chart(pieChartCtx, {
          type: 'pie',
          data: pieChartData,
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Percentage of Featured Brands in Each Store'
              }
            },
          },
        });

        // Example Chart.js code for bar chart
        var barChartCtx = document.getElementById('bar-chart').getContext('2d');
        var barChartData = {
          labels: ${JSON.stringify(
            storeDetails.map((store) => store.storeName)
          )},
          datasets: [{
            label: 'Number of Items',
            data: ${JSON.stringify(
              storeDetails.map((store) => store.numberOfItems)
            )},
            backgroundColor: 'blue'
          }]
        };
        new Chart(barChartCtx, {
          type: 'bar',
          data: barChartData,
          options: {
            responsive: true,
            plugins: {
              legend: {
                display: false
              },
              title: {
                display: true,
                text: 'Number of Items in Each Store'
              }
            },
            scales: {
              y: {
                beginAtZero: true
              }
            }
          },
        });
      </script>
    `;
  }

  const chartHtml = generateChartHTML(storeDetails);

  const pdf_html = `
  <html>
  <head>
    <style>
      body {
        font-family: Verdana, sans-serif;
        margin: 0;
        padding: 0;
      }
  
      .container {
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
      }
  
      .logo {
        display: block;
        margin: 20px;
        left: 0;
        top: 0;
        position: absolute;
        width: 50px;
        height: 50px;
      }
  
      .title {
        text-align: center;
        font-family: Arial, sans-serif;
        font-size: 24px;
        color: blue;
        margin: 40px 0;
      }
  
      .subtitle {
        text-align: left;
        font-family: Georgia, serif;
        font-size: 18px;
        color: green;
        margin: 20px 0;
      }
  
      .paragraph {
        text-align: justify;
        font-size: 14px;
        color: black;
        padding: 10px;
      }
  
      .table {
        border-collapse: collapse;
        width: 100%;
        border-radius: 10px;
      }
  
      .table th, .table td {
        border: 1px solid black;
        padding: 5px;
        text-align: left;
        border-radius: 5px;
      }
  
      .table th {
        background-color: dodgerblue;
        color: white;
      }
  
      .table tr:nth-child(odd) {
        background-color: #F0EFEF;
      }
  
      .table tr:nth-child(even) {
        background-color: white;
      }
  
      .chart {
        width: 400px;
        height: 300px;
      }
      
      /* You can use any chart library you like here */
      
    </style>
  </head>
  <body>
    <div class="container">
      <img src="${logoBaseUrl}" alt="Logo" class="logo">
  
      <h1 class="title">Store Report</h1>
  
      <h2 class="subtitle">Report for User ID ${userId}</h2>
  
      <p class="paragraph">This report summarizes the data of the stores owned by the user with ID ${userId}. It includes the number of stores, the number of items in each store, and the featured brands in each store.</p>
  
  
      
      <table class="table">
        <thead>
          <tr>
            <th>Store ID</th>
            <th>Store Name</th>
            <th>Registered Address</th>
            <th>Number of Items</th>
            <th>Featured Brands</th>
          </tr>
        </thead>
        <tbody>
          
          ${storeDetails
            .map(
              (store) => `
          <tr>
            <td>${store._id.slice(-5)}</td>
            <td>${store.storeName}</td>
            <td>${store.registeredAddress}</td>
            <td>${store.numberOfItems}</td>
            <td>${
              store.featuredBrandsInfo.featuredBrandCount
                ? store.featuredBrandsInfo.featuredBrands.join(", ")
                : "None"
            }</td>
          </tr>`
            )
            .join("")}
          
        </tbody>
      </table>
  
      
      <!-- You can add more tables or charts here -->
      
      <!-- Here is an example of a pie chart -->
      
      <div class="chart">
        
         
         <!-- Here is an example of using Chart.js -->
         
         ${chartHtml}
  
      
      <!-- You can add a footer here -->
      <p class="paragraph">This report was generated by Virtual Dressing Sense on ${new Date().toLocaleString()}.</p>
  
    </div>
  </body>
  </html>
    `;

  try {
    let options = {
      html: pdf_html,
      fileName: "Report",
      directory: "Downloads",
      base64: true,
    };
    let file = await Print.printToFileAsync(options);

    if (file.uri) {
      console.log("PDF Created");

      FileSystem.getContentUriAsync(file.uri).then((cUri) => {
        if (Platform.OS === "ios") {
          Sharing.shareAsync(cUri);
        } else {
          IntentLauncher.startActivityAsync("android.intent.action.VIEW", {
            data: cUri,
            flags: 1,
            type: "application/pdf",
          });
        }
      });
    } else {
      console.error("Report Creation Failed");
    }
  } catch (error) {
    console.error(error);
  }
};

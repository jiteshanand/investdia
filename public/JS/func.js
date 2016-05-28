// // function hidemenu(){
// //   $('.sidebar-toggle').click(function(){

// //                 if($(".title").is(":visible") == true)
// //                     {
// //                         $(".title").hide();
// //                         $(".main-sidebar").removeClass("title");
// //                         $(".main-sidebar").removeClass("profilename");
// //                      }
// //                 else
// //                     {
// //                         $(".main-sidebar").addClass("left-sidebar-expanded");
// //                         setTimeout(function(){$(".title").show();}, 300);
// //                     }
// //  });
// // }

// $(document).ready(function(){

//  setTimeout(function(){$(".landing-header").css("visibility","hidden");},15000);
//  setTimeout(function(){$("#loader").css("visibility","hidden");},15000);
//  setTimeout(function(){$(".right-main-content").css("visibility","visible");},17000);
//  setTimeout(function(){$(".right-move").css("visibility","visible");},15000);
//  setTimeout(function(){$(".active-img").css("visibility","visible");},15000);
//  setTimeout(function(){$(".landing-footer").css("visibility","visible");},15000);


// // ======================================== code for graph starts here ===============================================



// // $(".loading").hide();
// // $(".error").hide();

// // // Stock list array for autocomplete drop down list
// // var stockCodeList = [];
// // //var json = $.getJSON( "http://beepboop.com.au/stocks/stocks.json");
// // var json = [
// // {responseJSON:"IBM"},
// // {responseJSON:"GOOGL"}
// // ]
// // json.complete(function() {
// //   var stockCodes = json.responseJSON;
// //   for (var i = 0; i < stockCodes.length; i++) {
// //     stockCodeList.push(stockCodes[i]["Ticker"]);
// //   }
// //   console.log(stockCodeList);
// // });
// // var source = stockCodeList;
// // $("#stockCode").autocomplete({
// //         source: function (request, response) {
// //             var term = $.ui.autocomplete.escapeRegex(request.term)
// //                 , startsWithMatcher = new RegExp("^" + term, "i")
// //                 , startsWith = $.grep(source, function(value) {
// //                     return startsWithMatcher.test(value.label || value.value || value);
// //                 })
// //                 , containsMatcher = new RegExp(term, "i")
// //                 , contains = $.grep(source, function (value) {
// //                     return $.inArray(value, startsWith) < 0 && 
// //                         containsMatcher.test(value.label || value.value || value);
// //                 });
            
// //             response(startsWith.concat(contains));
// //         }
// //     });

// // function getValue() {
// //   stockCode = $("#stockCode").val().toUpperCase();
// //   getStockData(stockCode);
// // };

// // var organizationName;

// // function getStockData(stockCode) {

// // // Get stock data
// // var json = $.getJSON( "https://www.quandl.com/api/v1/datasets/GOOG/NSE_" + stockCode + ".json?collapse=daily", function() {
// //   console.log("success");
// //   })

// //   .fail(function() {
// //     $(".error").show();
// //   })

// //   .success(function() {
// //     $(".error").hide();
// //   });
  
// //   $(".loading").show();

// //   var price = [];

// //   var stockData, organization;
  
// // json.complete(function() {
// //   $(".loading").hide();
// //   console.log( "Stock price data complete." );
  
// //   stockData = json.responseJSON.data;
  
// //   organization = json.responseJSON.name;
// //   organization = organization.split("(");
// //   organizationName = organization[0].replace(/ /g, "%20"); // eg. Apple Inc.
// //   organizationCode = organization[1].replace(")", ""); // eg. AAPL
  
// //   console.log( stockData );
// //   console.log( organizationName );
// //   console.log( organizationCode );
  
// //   // Push closing price and date to price array
// //   for (var i = 0; i < stockData.length; i++) {
// //     price[i] = [];
// //     price[i].push(Date.parse(stockData[i][0]));
// //     price[i].push(stockData[i][4]);
// //   }
  
// //   // Reverse order to make information digestible by Highcharts
// //   price.reverse();
  
// //       // Create the chart
// //       $('#container').highcharts('StockChart', {
// //         chart: {
// //           events: {
// //             // On click function in chart
// //             click: function(event) {
// //               // Get x-axis date from click
// //               var articleDate = Highcharts.dateFormat('%Y-%m-%d', event.xAxis[0].value);
              
// //               // Make date digestible by Highcharts
// //               articleDate = articleDate.replace(/-/g, "");
              
// //               // Get articles with date
// //               getArticles(articleDate);
// //             }
// //           }
// //         },
// //         rangeSelector : {
// //           selected : 1,
// //           inputEnabled: $('#container').width() > 480
// //         },

// //         title : {
// //           text :  organization[0] + ' Stock Price'
// //         },

// //         series : [{
// //           name : organizationCode,
// //           data : price,
// //           tooltip: {
// //             valueDecimals: 2
// //           }
// //         }]
// //       });
  
// //   // Get today's date
// //   var d = new Date();

// //   var month = d.getMonth()+1;
// //   var day = d.getDate();

// //   var todaysDate = d.getFullYear() + 
// //       ((''+month).length<2 ? '0' : '') + month +
// //       ((''+day).length<2 ? '0' : '') + day;
  
// //   // Get all articles with today's date
// //   getArticles(todaysDate);
  
// // });
  
// // };

// // // Searches and gets articles from The New York Times based on 1: Organization (search) 2: Date
// // function getArticles(date) {
  
// //   // Get articles
// //   var articleJson = $.getJSON( "http://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + organizationName + "&begin_date=" + date + "&end_date=" + date + "&api-key=1978a642927f7f7aa19dae13031368b3:17:69577800");
// //   $(".loading").show();

// //   articleJson.complete(function() {
// //     // Delete existing article rows
// //     $('#table tr').not(function(){
// //       if ($(this).has('th').length){
// //         return true}}).remove();
// //     $(".loading").hide();
// //     console.log( "Articles complete." );
// //     var articles = articleJson.responseJSON.response.docs;
// //     console.log(articles);
    
// //     // Append articles to table with clickable row to article URL
// //     for (var i = 0; i < articles.length; i++) {
// //       article_para = articles[i].lead_paragraph;
// //       if(!article_para){
// //         article_para = "Click for more information.";
// //       };

// //       $('#table > tbody:last').append("<tr onclick='window.open(&quot;" + articles[i].web_url + "&quot;)'><td><b>" + articles[i].headline.main + "</b><br>" + article_para + "</td></tr>");
// //     }
    
// //     // If no articles were retrieved, notify user
// //     if (articles.length === 0) {
// //       $('#wat').html("No articles were found - click on the chart for another date.");
// //     } else {
// //       $('#date').html(formatPubDate(articles[0].pub_date) + ".");
// //       $('#wat').html("");
// //     }
// //   });
// // }

// // function formatPubDate(date) {
// //   date = date.split("T");
// //   return date[0];
// // }

// // getStockData("AAPL");


// // /**************************************************
// //  * Grid-light theme for Highcharts JS
// //  * @author Torstein Honsi
// //  */

// // // Load the fonts
// // Highcharts.createElement('link', {
// //    href: 'http://fonts.googleapis.com/css?family=Dosis:400,600',
// //    rel: 'stylesheet',
// //    type: 'text/css'
// // }, null, document.getElementsByTagName('head')[0]);

// // Highcharts.theme = {
// //    colors: ["#7cb5ec", "#f7a35c", "#90ee7e", "#7798BF", "#aaeeee", "#ff0066", "#eeaaee",
// //       "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"],
// //    chart: {
// //       backgroundColor: null,
// //       style: {
// //          fontFamily: "Open Sans"
// //       }
// //    },
// //    title: {
// //       style: {
// //          fontSize: '16px',
// //          fontWeight: 'bold',
// //          textTransform: 'uppercase'
// //       }
// //    },
// //    tooltip: {
// //       borderWidth: 0,
// //       backgroundColor: 'rgba(219,219,216,0.8)',
// //       shadow: false
// //    },
// //    legend: {
// //       itemStyle: {
// //          fontWeight: 'bold',
// //          fontSize: '13px'
// //       }
// //    },
// //    xAxis: {
// //       gridLineWidth: 1,
// //       labels: {
// //          style: {
// //             fontSize: '12px'
// //          }
// //       }
// //    },
// //    yAxis: {
// //       minorTickInterval: 'auto',
// //       title: {
// //          style: {
// //             textTransform: 'uppercase'
// //          }
// //       },
// //       labels: {
// //          style: {
// //             fontSize: '12px'
// //          }
// //       }
// //    },
// //    plotOptions: {
// //       candlestick: {
// //          lineColor: '#404048'
// //       }
// //    },


// //    // General
// //    background2: '#F0F0EA'
   
// // };

// // // Apply the theme
// // Highcharts.setOptions(Highcharts.theme);

// // // ========================================  code for graph ends here  ==============================================




//  });
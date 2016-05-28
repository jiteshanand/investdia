var lifeController = angular.module('lifeController',['ngOrderObjectBy','ui.bootstrap','highcharts-ng']);

 lifeController.controller('userinfo', ['$scope','$filter','$http', '$location','$route','$rootScope', '$routeParams', 'sortable','stocksearch', 'stockSocket','industrysearch',
 	function($scope,$filter,$http,$location,$route,$rootScope,$routeParams,sortable,stocksearch,stockSocket,industrysearch) 
 {

//   $scope.reverse_broker = false;
//   $scope.list_broker = false;

// 	// $http.get('JS/Data/users.json').success(function(data) {
// 	// 	$scope.users = data;
// 	// 	$scope.filterbroker = function() {
//  //  			for(var i = 0; i< data.length;++i){
//  //    			if(data[i].type === 'Broker'){
//  //      			return data[i].type;
//  //  				}
// 	// 		}
//  // 		};
// 	// });

// 	// $http.get('JS/Data/post.json').success(function(data) {
// 	// 	$scope.posts = data;
// 	// });

// 	// $http.get('JS/Data/comment.json').success(function(data) {
// 	// 	$scope.comments = data;
// 	// });



//     $scope.getstartedclick = function(){
//     	window.location = "/service";
//     };

//     $scope.getDatetime = function() {
//       return (new Date());
//     };

//     $scope.activeItemIndex = 100;
//     $scope.showItem = function(itemId) {
//     	$scope.activeItemIndex = itemId; 		
//        	$("div.cards").addClass("showing");
//     };

//     // $scope.toggleback=function(){
//     // 	if ($("div.cards").hasClass("showing"))
//     // 	{
//     // 	$("div.card.show").removeClass("show");
//     // 	$(".cards").removeClass("showing"); 
//     // 	}

//     // };
		
// // $http.get('/stock/'+$rootScope.tickersymbol).success(function(data){
// //     // console.log(data);
// //     $scope.graphdata = data;
// // })

 }]);

lifeController.controller('authController', function($scope,$rootScope,$http,$location,$route) {

    $scope.user  = {username:'',password:''};
    $scope.alert = '';

    $scope.login = function(user){
        
        $http.post('/signin', user).success(function(data) {
                $location.path('/login');
                $rootScope.loggeduser = data;
                $route.reload();
        }).error(function() {
             $scope.alert = 'Login failed,Please try again.';
                $location.path('/signin');
                    $route.reload();
        });
    };

    $scope.signup = function(user){
        $http.post('/signup', user).success(function(data) {
                $location.path('/signin');
                $scope.alert = data.alert;
                $route.reload();
             }).error(function() {
                    $scope.alert = 'Registration failed';
                    $location.path('/signup');
                    $route.reload();
            });
    };

    $scope.logout = function(){
        $http.get('/logout')
            .success(function() {
                $scope.loggeduser = {};
                $location.path('/signin');
            })
            .error(function() {
                $scope.alert = 'Logout failed'
            });
    };
});


//MF controller to display info regarding mutual funds
lifeController.controller('mfctrl',['$scope','$http','$route','$rootScope','$routeParams','sortable','mfsearch','$location', function($scope,$http,$route,$rootScope,$routeParams,sortable,mfsearch,$location) {

//=================================================================================
//$scope.rating = 4;
$scope.parseFloat = parseFloat;    

    $scope.getSelectedRating = function (rating) {
        console.log(rating);
    };
$scope.mftypes = ['Open Ended','Close Ended','Interval Fund'];
//$scope.mfcategory = ['Equity Funds','Debt Funds','Balanced Funds','Liquid Funds','Equity - Tax Saving Funds','Gold Funds','Hybrid-Multiple Assets Funds','International Funds'];
$scope.mfcategory = ['Income','Balanced','Liquid','Growth','ELSS','Money Market','Fund of Funds - Domestic','Fund of Funds - Overseas','Gold ETFs','Gilt','Other ETFs'];
$scope.crisilrating = ['1','2','3','4','5'];
$scope.managerexp = ['0-5 years','5-10 years','10-15 years','15-20 years','more than 20 years']
$scope.benchmark = ['Nifty50','Nifty100'];
$scope.familyunit = [{"id":"53","name":"Axis Mutual Fund"},{"id":"4","name":"Baroda Pioneer Mutual Fund"},{"id":"3","name":"Birla Sun Life Mutual Fund"},{"id":"59","name":"BNP Paribas Mutual Fund"},{"id":"46","name":"BOI AXA Mutual Fund"},{"id":"32","name":"Canara Robeco Mutual Fund"},{"id":"58","name":"DHFL Pramerica Mutual Fund"},{"id":"6","name":"DSP BlackRock Mutual Fund"},{"id":"47","name":"Edelweiss Mutual Fund"},{"id":"13","name":"Escorts Mutual Fund"},{"id":"27","name":"Franklin Templeton Mutual Fund"},{"id":"49","name":"Goldman Sachs Mutual Fund"},{"id":"9","name":"HDFC Mutual Fund"},{"id":"37","name":"HSBC Mutual Fund"},{"id":"20","name":"ICICI Prudential Mutual Fund"},{"id":"57","name":"IDBI Mutual Fund"},{"id":"48","name":"IDFC Mutual Fund"},{"id":"68","name":"IIFCL Mutual Fund (IDF)"},{"id":"62","name":"IIFL Mutual Fund"},{"id":"65","name":"IL&FS Mutual Fund (IDF)"},{"id":"63","name":"Indiabulls Mutual Fund"},{"id":"16","name":"JM Financial Mutual Fund"},{"id":"43","name":"JPMorgan Mutual Fund"},{"id":"17","name":"Kotak Mahindra Mutual Fund"},{"id":"56","name":"L&T Mutual Fund"},{"id":"18","name":"LIC NOMURA Mutual Fund"},{"id":"69","name":"Mahindra Mutual Fund"},{"id":"45","name":"Mirae Asset Mutual Fund"},{"id":"55","name":"Motilal Oswal Mutual Fund"},{"id":"54","name":"Peerless Mutual Fund"},{"id":"64","name":"PPFAS Mutual Fund"},{"id":"10","name":"PRINCIPAL Mutual Fund"},{"id":"41","name":"Quantum Mutual Fund"},{"id":"21","name":"Reliance Mutual Fund"},{"id":"42","name":"Religare Invesco Mutual Fund"},{"id":"35","name":"Sahara Mutual Fund"},{"id":"22","name":"SBI Mutual Fund"},{"id":"67","name":"Shriram Mutual Fund"},{"id":"66","name":"SREI Mutual Fund (IDF)"},{"id":"33","name":"Sundaram Mutual Fund"},{"id":"25","name":"Tata Mutual Fund"},{"id":"26","name":"Taurus Mutual Fund"},{"id":"61","name":"Union KBC Mutual Fund"},{"id":"28","name":"UTI Mutual Fund"}];
$scope.collapse = true;
$scope.search = {};

    $scope.IncludedFund = [];
    
    $scope.includeFund = function(id) {
        var i = $.inArray(id, $scope.IncludedFund);
        if (i > -1) {
            $scope.IncludedFund.splice(i, 1);
        } else {
            $scope.IncludedFund.push(id);
        }
    }

    $scope.fundFilter = function(fund) {
        if ($scope.IncludedFund.length > 0) {
            if ($.inArray(fund.amc_number, $scope.IncludedFund) < 0)
                return;
        }
        return fund;
    }

// =================================toggle the list===============================    


$scope.toggleGroup = function(group) {
    if ($scope.isGroupShown(group)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = group;
    }
  };
  $scope.isGroupShown = function(group) {
    return $scope.shownGroup === group;
  };

// =============================Function for graph ================================

$scope.chartconfig = function (price){
$scope.chartmf = {
  options: {
            // chart: {
            //     zoomType: 'x'
            // },
            rangeSelector: {
                enabled: true
            },
            navigator: {
                enabled: true
            }
        },
  // chart: {
  //       renderTo: 'container_detail',
  //       marginRight:30,
  //       marginTop:40,
  //       },
  // credits: {
  //       enabled: false
  //       },
  title : {
        text :  "Graphical representation"
        },
  xAxis: {
        type: 'datetime',
        ordinal: true
        },
         useHighStocks: true,
  // tooltip: {
  //       crosshairs: true,
  //       shared:true,
  //       useHTML:true,
  //       headerFormat: '<div class="tooltip-head"><span class="tooltip-head-text">{point.key}</span></div><table class="tooltip-body">',
  //       pointFormat: '<tr><td class="series-name"><span style="color:{point.color}">\u25CF </span>{series.name}: </td>' +
  //                    '<td class="series-data"><b>&nbsp;{point.y}</b></td><br></tr>',
  //       footerFormat: '</table>',
        
  //       followPointer:true,
  //       style: {
  //                 borderColor: '#999',
  //                 fontSize: 20,
  //                 borderRadius:5
  //               }
  //       },

  // scrollbar : {
  //       enabled : true
  //       },
series : [{
                name : 'AAPL',
                data : price,
                tooltip: {
                    valueDecimals: 2
                }
            }]
}
return $scope.chartmf;
}

// ===============================================================================


 $http.get('JS/Data/mf_scheme.json').success(function(data) {
  $scope.mf_schemes = data;
});
 $scope.limitmf = 3;
 $scope.search = { exp_min : '0', exp_max : '50' };
// ================================================================
$rootScope.nav_number=$routeParams.nav;

//industry search for the ticker symbol obtained from route param
$scope.getmfdetail = function(nav){   

$rootScope.mfrecord = '';
mfsearch.searchmf(nav).then(function(results){
$rootScope.mfrecord = results;
//$scope.selected_nav = $rootScope.mfrecord[0]._source.scheme_nav[0].nav_code;
});
}

$scope.percentagechange_1day = function(today,yester){
  $scope.changevalue = today-yester;
  $scope.percentsavings = ((today - yester) / yester) * 100;
}

// function to show mf data from database
$scope.showmfdata = function(code){   
    $http.post('/mf/'+$rootScope.nav_number+'/'+code).success(function(data) {  
    $scope.mfdata = data[0].values;
    $scope.today_nav = $scope.mfdata[$scope.mfdata.length-1].open;
    $scope.reported_date = $scope.mfdata[$scope.mfdata.length-1].date;
    $scope.yesterday_nav = $scope.mfdata[$scope.mfdata.length-2].open;
      if($scope.today_nav == undefined){
        $scope.today_nav = $scope.yesterday_nav;
        $scope.yesterday_nav = $scope.mfdata[$scope.mfdata.length-3].open;
        $scope.reported_date = $scope.mfdata[$scope.mfdata.length-2].date;
      }
     $scope.price = [];
      for (var i = 0; i < $scope.mfdata.length-2; i++) {
    $scope.price[i] = [];
    $scope.price[i].push(Date.parse($scope.mfdata[i].date));
    $scope.price[i].push($scope.mfdata[i].open);    
  }


// $scope.chart1 = new Highcharts.Chart($scope.chartoption1);


$scope.percentagechange_1day($scope.today_nav,$scope.yesterday_nav);
$scope.chartItem =  {
                    "chart": $scope.chartconfig($scope.price)
                    }
     }).error (function() {
     console.log("Data retrieval failed");

    });
}

}]);

lifeController.filter('exp_Range', function() {
  
    return function(items,lessthan,greaterthan) {
      var filteredAmount = [];
      angular.forEach(items, function(item){
        // console.log(lessthan);
        if(item.experience >= lessthan && item.experience <=  greaterthan){
        //console.log("here for :"+item.name+"and "+item.experience);
        filteredAmount.push(item);
      }
      });
      return filteredAmount.length>0 ? filteredAmount : items
    };
  });

lifeController.filter('risk_Range', function() {
  
    return function(items,lessthan,greaterthan) {
      var filteredAmount = [];
      angular.forEach(items, function(item){
        // console.log(lessthan);
        if(item.riskindex >= lessthan && item.riskindex <=  greaterthan){
        //console.log("here for :"+item.name+"and "+item.experience);
        filteredAmount.push(item);
      }
      });
      return filteredAmount.length>0 ? filteredAmount : items
    };
  });

// lifeController.filter('exp_Range', function() {
  
//     return function(items, lessthan,greaterthan) {
      
//        items = items.filter(function(item){
//          return item.experience >= lessthan && item.experience <=  greaterthan;
//         //console.log("here for :"+item.name+"and "+item.experience);
//       });
//       return items;
//     };
//   });

lifeController.filter('inception_Range', function() {
  
    return function(items,lessthan,greaterthan) {
      var filteredAmount = [];
      angular.forEach(items, function(item){
    
        if(item.inception >= lessthan && item.inception <=  greaterthan){
        //console.log("here for :"+item.name+"and "+item.experience);
        filteredAmount.push(item);
      }
      });
      return filteredAmount.length>0 ? filteredAmount : items
    };
  });
//firm controller to display info regarding brokerage firms
lifeController.controller('firmctrl',['$scope','$http','$route','$rootScope','sortable','$location', function($scope,$http,$route,$rootScope,sortable,$location) {

//=================================================================================
 $scope.broker_type = ['Full Service Broker','Discount Broker'];
 $scope.investment_type = ['Stocks','Options','Futures','Commodity','Mutual Funds','Bonds',"ETF's"];
// [{"id":"1","type":"Stocks"},{"id":"2","type":"Options"},{"id":"3","type":"Futures"},{"id":"4","type":"Commodity"},{"id":"5","type":"Mutual Funds"},{"id":"6","type":"Bonds"},{"id":"7","type":"ETF's"}];
$scope.product_feature = ['3 in 1 Account','Call and Trade','Automated Trading','SMS Alerts','Online Platform','Broker Assistance','Mobile App','Research Reports'];

// $scope.rating = 0;
    $scope.rating = 4;
        $scope.getSelectedRating = function (rating) {
        console.log(rating);
    }

// ================================================================



// ===============================================================================================
 $http.get('JS/Data/firms.json').success(function(data) {
  $scope.firms = data;
  sortable($scope,$scope.firms, 40, 'updated_at');
  
 });

 //  $http.get('JS/Data/firms.json').success(function(data) {
 //    $scope.brokers = data;  
 // });
$scope.IncludedFund = [];
   $scope.includeType = function(type) 
   {
      
        var i = $.inArray(type, $scope.IncludedFund);
        if (i > -1) {
            $scope.IncludedFund.splice(i, 1);
        } else {
            $scope.IncludedFund.push(type);
        }
        // console.log($scope.IncludedFund);
   };

$scope.IncludedFeature = [];
   $scope.includeFeature = function(feature) 
   {
      
        var i = $.inArray(feature, $scope.IncludedFeature);
        if (i > -1) {
            $scope.IncludedFeature.splice(i, 1);
        } else {
            $scope.IncludedFeature.push(feature);
        }
        // console.log($scope.IncludedFeature);
   };


    $scope.brokerFilter = function(broker) {
      var ret = [];

        if ($scope.IncludedFund.length > 0) {
          for (i=0;i<$scope.IncludedFund.length;i++)
          {
            var query = ($scope.IncludedFund[i]).toLowerCase();
          
            if(broker.broker_investment_type[query] == "Yes"){
              ret.push(broker);
            }
            else{
              return;
            }

          }
    }
    // console.log(ret);
    return ret;
  };


    $scope.featureFilter = function(feature) {
      var ret = [];

        if ($scope.IncludedFeature.length > 0) {
          for (i=0;i<$scope.IncludedFeature.length;i++)
          {
            var query = ($scope.IncludedFeature[i]).toLowerCase();
            if(feature.broker_feature[query] == "Yes"){
              ret.push(feature);
            }
            else{
              return;
            }

          }
    }
    return ret;
  };


}]);
//history controller to get yahoo finance historical data
lifeController.controller('historyctrl',['$scope','$http','$route','$rootScope','history','$location', function($scope,$http,$route,$rootScope,history,$location) {
    
$scope.startDate = '2015-02-10';
$scope.endDate = '2016-02-09';
$scope.gethistory = function(){  
  var nifty100 = ['ACC','ADANIPORTS','AMBUJACEM','APOLLOHOSP','ASHOKLEY','ASIANPAINT','AUROPHARMA','AXISBANK','BAJAJ-AUTO','BAJAJFINSV','BAJAJHLDNG','BANKBARODA','BANKINDIA','BHARATFORG','BHEL','BPCL','BHARTIARTL','INFRATEL','BOSCHLTD','BRITANNIA','CAIRN','CANBK','CIPLA','COALINDIA','COLPAL','CONCOR','CUMMINSIND','DABUR','DIVISLAB','DRREDDY','EICHERMOT','EXIDEIND','FEDERALBNK','GAIL','GSKCONS','GLAXO','GLENMARK','GODREJCP','GRASIM','HCLTECH','HDFCBANK','HEROMOTOCO','HINDALCO','HINDPETRO','HINDUNILVR','HDFC','ITC','ICICIBANK','IDEA','IBULHSGFIN','IOC','INDUSINDBK','INFY','JSWSTEEL','KOTAKBANK','LICHSGFIN','LT','LUPIN','MRF','M&M','M&MFIN','MARICO','MARUTI','MOTHERSUMI','NMDC','NTPC','ONGC','OIL','OFSS','PETRONET','PFC','POWERGRID','PNB','RELCAPITAL','RCOM','RELIANCE','RELINFRA','RECLTD','SRTRANSFIN','SIEMENS','SBIN','SAIL','SUNPHARMA','SUNDARMFIN','TATACHEM','TCS','TATAGLOBAL','TATAMOTORS','TATAPOWER','TATASTEEL','TECHM','TITAN','UPL','ULTRACEMCO','UBL','MCDOWELL-N','VEDL','WIPRO','YESBANK','ZEEL'];
  angular.forEach(nifty100, function(value) {
    $scope.symbol = value;
    var promise = history.getHistoricalDataWithQ($scope.symbol, $scope.startDate, $scope.endDate);
    promise.then(function(data) {
    $rootScope.historicalData = data;
    $http.post('/addhistory',$rootScope.historicalData).success(function(data) {
      console.log("Loading historical data");
    }).error (function() {
      console.log("Data load fail");
    });
    });
  });              
};

}]);

   // $http.post('/stock/:tickersymbol').success(function(data) {
lifeController.controller('stockdisplayctrl', ['$scope','$filter','$http', '$location','$route','$rootScope', '$routeParams', 'sortable','stocksearch', 'stockSocket','industrysearch',
  function($scope,$filter,$http,$location,$route,$rootScope,$routeParams,sortable,stocksearch,stockSocket,industrysearch) 
{

// ===============================================================================
  
  var indices = 'NSE:NIFTY,INDEXBOM:SENSEX,NSE:CNX100,NSE:CNXMIDCAP,INDEXBOM:BSE-MIDCAP,INDEXNASDAQ:.IXIC,INDEXDJX:DJI,INDEXSP:INX,SHA:000001,INDEXNIKKEI:NI225,INDEXHANGSENG:HSI,INDEXFTSE:UKX,INDEXDB:DAX,INDEXSTOXX:SX5E,NSE:BANKNIFTY,NSE:CNXIT,NSE:CNXPHARMA,NSE:CNXENERGY';
  // var currency = ['USDINR','EURINR','GBPINR','JPYINR','CNYINR','AUDINR'];
  var symbol='NSE:ACC,NSE:ADANIPORTS,NSE:AMBUJACEM,NSE:APOLLOHOSP,NSE:ASHOKLEY,NSE:ASIANPAINT,NSE:AUROPHARMA,NSE:AXISBANK,NSE:BAJAJ-AUTO,NSE:BAJAJFINSV,NSE:BAJAJHLDNG,NSE:BANKBARODA,NSE:BANKINDIA,NSE:BHARATFORG,NSE:BHEL,NSE:BPCL,NSE:BHARTIARTL,NSE:INFRATEL,NSE:BOSCHLTD,NSE:BRITANNIA,NSE:CAIRN,NSE:CANBK,NSE:CIPLA,NSE:COALINDIA,NSE:COLPAL,NSE:CONCOR,NSE:CUMMINSIND,NSE:DABUR,NSE:DIVISLAB,NSE:DRREDDY,NSE:EICHERMOT,NSE:EXIDEIND,NSE:FEDERALBNK,NSE:GAIL,NSE:GSKCONS,NSE:GLAXO,NSE:GLENMARK,NSE:GODREJCP,NSE:GRASIM,NSE:HCLTECH,NSE:HDFCBANK,NSE:HEROMOTOCO,NSE:HINDALCO,NSE:HINDPETRO,NSE:HINDUNILVR,NSE:HDFC,NSE:ITC,NSE:ICICIBANK,NSE:IDEA,NSE:IBULHSGFIN,NSE:IOC,NSE:INDUSINDBK,NSE:INFY,NSE:JSWSTEEL,NSE:KOTAKBANK,NSE:LICHSGFIN,NSE:LT,NSE:LUPIN,NSE:MRF,NSE:M%26M,NSE:M%26MFIN,NSE:MARICO,NSE:MARUTI,NSE:MOTHERSUMI,NSE:NMDC,NSE:NTPC,NSE:ONGC,NSE:OIL,NSE:OFSS,NSE:PETRONET,NSE:PFC,NSE:POWERGRID,NSE:PNB,NSE:RELCAPITAL,NSE:RCOM,NSE:RELIANCE,NSE:RELINFRA,NSE:RECLTD,NSE:SRTRANSFIN,NSE:SIEMENS,NSE:SBIN,NSE:SAIL,NSE:SUNPHARMA,NSE:SUNDARMFIN,NSE:TATACHEM,NSE:TCS,NSE:TATAGLOBAL,NSE:TATAMOTORS,NSE:TATAPOWER,NSE:TATASTEEL,NSE:TECHM,NSE:TITAN,NSE:UPL,NSE:ULTRACEMCO,NSE:UBL,NSE:MCDOWELL-N,NSE:VEDL,NSE:WIPRO,NSE:YESBANK,NSE:ZEEL';
  $scope.options = ['Top Gainers', 'Top Losers', 'Volume'];
  $scope.sectors = ['BANKS', 'ENERGY', 'IT','AUTOMOBILE', 'PHARMA', 'FMCG'];
  $scope.selection = $scope.options[0];
  $scope.sectorCateg = $scope.sectors[0];
  $scope.content = 'analysis';
// ===============================================================================

 // $rootScope.query = '';
 $scope.gridToggle = true;

 //getting ticker symbol from url
$rootScope.tickersymbol=$filter('uppercase')($routeParams.tickersymbol);

//searchthisstock function called from every page on click of search buttom
    $scope.searchthisstock = function(){  
       $rootScope.searchstock = $scope.search_stock;
       $location.path('/search',true);
       $route.reload(); 
    }

//showsearchresult function called from search page on page load
     $scope.showsearchresult = function(){    
        $rootScope.stocks = [];   
        stocksearch.searchstock($rootScope.searchstock).then(function(results){
            for(var number_stocks = 0;number_stocks < results.length; number_stocks++){
                $rootScope.stocks.push(results[number_stocks]);
            } 
             sortable($scope,$rootScope.stocks, 10, 'updated_at');
        });
     }
  


//initializing parsefloat to be used in html
$scope.parseFloat = parseFloat;

//code to get real time data of 100 stocks with socket.io
$rootScope.niftystocks = '';

stockSocket.emit('ticker',symbol);
stockSocket.on('quote',function(data){
  $rootScope.niftystocks = angular.fromJson(data.substring(3));
  
});  



// $scope.getelasticsymbol = function(e){
//     return e.t;
// };

// $scope.filterNameValue = function(e){
  
//     if(e.t == "SENSEX" || e.t == "NIFTY")
//     {
            
//            return e;
//     }
// };

//industry search for the ticker symbol obtained from route param
$scope.searchindustry = function(indussymbol){   


$scope.industrystock = '';
$rootScope.peers=[];
industrysearch.searchindustry(indussymbol).then(function(results){
$scope.industrystock = results;
$rootScope.industryinuse = $scope.industrystock[0]._source.industry;
$rootScope.nameinuse = $scope.industrystock[0]._source.name;
$rootScope.tweethandle = $scope.industrystock[0]._source.tweet;

industrysearch.searchpeers($scope.industrystock[0]._source.industry).then(function(results1){
  for(var number_stocks = 0;number_stocks < results1.length; number_stocks++){
         $rootScope.peers.push(results1[number_stocks]);
      }
  sortable($scope,$scope.peers, 25, 'updated_at');
    
//socket code for glassdoor api info
// stockSocket.emit('glassdoor',$rootScope.nameinuse);
// stockSocket.on('company',function(data){
//          // $rootScope.glassdoor = angular.fromJson(data);
// }); 

//socket code for google news feeds

stockSocket.emit('googlenews',$rootScope.nameinuse,$rootScope.tickersymbol);
stockSocket.emit('tweet',$rootScope.tweethandle);
stockSocket.on('newsfeed',function(data){
  $rootScope.googlenewsfeed = data;
});

stockSocket.on('newTweet',function(data){
  console.log(data);
  //console.log(data['statuses'][11]);
  $rootScope.tweets = data['statuses'];
  
});

});
});
}; 
$scope.searchindustry($rootScope.tickersymbol);
// ==================================================================================

function showIndex(){
stockSocket.emit('index',indices);
stockSocket.on('Index',function(data){
  $rootScope.allIndices = angular.fromJson(data.substring(3));
});
}

function showSector(){
stockSocket.emit('sector');
stockSocket.on('Sector',function(data){
  //console.log(data);
});
}

function showCurrency(){
stockSocket.emit('currency');
stockSocket.on('Currency',function(data){
  $rootScope.currencies = angular.fromJson(data).query.results.rate;
});
}

// $scope.getformatmoney = function(num){
//     var parts = num.split(",");
//     return parts.length > 1 ? (Math.round(parseInt(parts.join(""), 10) / Math.pow(1000, parts.length-1)) + " " + ["K", "M", "B"][parts.length-2]) : parts[0];

// };

$scope.getformatmoney = function(num)
{
  
 if (num!=undefined)
 {
      var abs = Math.abs(num);
      if (abs >= Math.pow(10, 12))
      {
        // # trillion
        num = (num / Math.pow(10, 12)).toFixed(1)+"T";
        return num;
      }
      else if (abs < Math.pow(10, 12) && abs >= Math.pow(10, 9))
      {
        // # billion
        num = (num / Math.pow(10, 9)).toFixed(1)+"B";
        return num;
      }
      else if(abs < Math.pow(10, 9) && abs >= Math.pow(10, 6))
      {
        // # million
        num = (num / Math.pow(10, 6)).toFixed(1)+"M";
        return num;
      }
      else if (abs < Math.pow(10, 6) && abs >= Math.pow(10, 3))
      {
        // # thousand
        num = (num / Math.pow(10, 3)).toFixed(1)+"K";
        return num;
      }
      else{
        return num;
      }
  }
  else{
    return num;
  }
};

$scope.strtonum = function(e){
  $scope.item = e.vo;
  // console.log("inval:" + $scope.item);
var test = '"' + $scope.item + '"';
var testval =0;
if (test.indexOf('M') > -1 ){
  test=test.replace("M","");
   test=test.replace(/\"/g,'');
  // console.log("test:" + test);
  testval = parseFloat(test);
  // console.log("testval:" + testval);
  e.vo = testval * 1000000;
  return e;
}
else{

test=test.replace(/\,/g,'');
test=test.replace(/\"/g,'');
e.vo=parseFloat(test);
return e;
 }
 return e;
};

// $scope.$watch('sectorCateg', function(newVal, oldVal){
//     switch(newVal){
//         case 'BANKS':
//             $scope.getStockData('CNX_BANK');
//             $scope.searchindustry('SBIN')
//             break;
//         case 'IT':
//             $scope.getStockData('CNX_IT');
//             $scope.searchindustry('INFY')
//             break;
//         case 'FMCG':
//             $scope.getStockData('CNX_FMCG');
//             $scope.searchindustry('TITAN');
//             break;
//         case 'PHARMA':
//             $scope.getStockData('CNX_PHARMA');
//             $scope.searchindustry('CIPLA');
//             break;
//          case 'ENERGY':
//             $scope.getStockData('CNX_ENERGY');
//             $scope.searchindustry('OIL');
//             break;
//     }
// });


$scope.getmapclass = function(e){

  if(e >=5.0){
    return 'map-card-bg-abv5';
  }
  else if (e >= 3.0 && e < 5.0) {
    return 'map-card-bg-30to5';
  }
  else if (e >= 1.5 && e < 3.0) {
    return 'map-card-bg-2to30';
  }
  else if (e > 0 && e < 1.5) {
    return 'map-card-bg-0to15';
  }
  else if(e <= -5.0){
    return 'map-card-bg-neg-abv5';
  }
  else if (e <= -3.0 && e > -5.0) {
    return 'map-card-bg-neg-30to5';
  }
  else if (e <= -1.5 && e > -3.0) {
    return 'map-card-bg-neg-2to30';
  }
  else if (e < 0 && e > -1.5) {
    return 'map-card-bg-neg-0to15';
  }
  else{
    return 'map-card-bg-at0';
  }
};

$scope.getnationalindex = function(e){
  if (e.e == 'NSE' || e.e == 'INDEXBOM' ) {
    return e;
  }
};

$scope.getglobalindex = function(e){
  if (e.e != 'NSE' && e.e != 'INDEXBOM' ) {
    return e;
  }
};


showIndex();
showCurrency();

// showSector();

//function for graph plot
$scope.getStockData = function(stockcode){    

$(".loading").show();
$scope.price = [];
$scope.Volume = [];
// Get stock data
$http.get( "https://www.quandl.com/api/v3/datasets/NSE/"+stockcode+".json?collapse=daily&auth_token=btDKk2UxAdXN4wxxxZgi").then(function(graphdata) {
    $(".error").hide(); 
    $(".loading").hide();
    
    $scope.stockData = graphdata.data.dataset.data;
  $scope.organizationName = graphdata.data.dataset.name;
  $scope.organizationCode = graphdata.data.dataset.dataset_code;
  
  // console.log($scope.stockData);
  // console.log($scope.organizationName);
  // console.log($scope.organizationCode);
  
   // Push closing price and date to price array
  for (var i = 0; i < $scope.stockData.length; i++) {
    $scope.price[i] = [];
    $scope.Volume[i] = [];
    $scope.price[i].push(Date.parse($scope.stockData[i][0]));
    $scope.price[i].push($scope.stockData[i][4]);
    $scope.Volume[i].push(Date.parse($scope.stockData[i][0]));
    $scope.Volume[i].push($scope.stockData[i][6]);
  }

// Reverse order to make information digestible by Highcharts
  $scope.price = $scope.price.reverse();
  $scope.Volume = $scope.Volume.reverse();
     // Create the chart

$scope.chartoption1 = {

  chart: {
        renderTo: 'container_detail',
        marginRight:30,
        marginTop:40,
        },
  credits: {
        enabled: false
        },
  title : {
        text :  $scope.organizationCode
        // text:""
        },
  xAxis: {
        type: 'datetime',
        ordinal: true
        },
  tooltip: {
        crosshairs: true,
        shared:true,
        useHTML:true,
        headerFormat: '<div class="tooltip-head"><span class="tooltip-head-text">{point.key}</span></div><table class="tooltip-body">',
        pointFormat: '<tr><td class="series-name"><span style="color:{point.color}">\u25CF </span>{series.name}: </td>' +
                     '<td class="series-data"><b>&nbsp;{point.y}</b></td><br></tr>',
        footerFormat: '</table>',
        
        followPointer:true,
        style: {
                  borderColor: '#999',
                  fontSize: 13,
                  borderRadius:5
                }
        },

  rangeSelector:{
        enabled:true,
        selected : 3
        },
  navigator : {
        enabled : true
        },
  scrollbar : {
        enabled : true
        },
  yAxis: [{
        labels: {
              align: 'right',
              x: -3
            },
        title: {
              text: 'Price'
            },
        height: '55%',
              lineWidth: 2
            }, 
            {
                labels: {
                    align: 'right',
                    x: -3
                },
                title: {
                    text: 'Volume'
                },
                top: '65%',
                height: '35%',
                offset: 0,
                lineWidth: 2
            }],

  series : [
        {
          // name : $scope.organizationCode,
          name:'Price',
          data : $scope.price,
          type: 'spline',
          tooltip: {
          valueDecimals: 2,
          valuePrefix: '<i class="fa fa-inr"></i>'
        },
        marker : {
                  enabled : true,
                  radius : 3
                },
        shadow : true
                },
        {
          type: 'column',
          name: 'Volume',
          data:$scope.Volume,
          yAxis: 1
        }
      ]

};

$scope.chartoption2 = {

  chart: {
        renderTo: 'container_sector',
        marginRight:30,
        marginTop:40,
        },
  credits: {
        enabled: false
        },
  title : {
        text :  $scope.organizationCode
        // text:""
        },
  xAxis: {
        type: 'datetime',
        ordinal: true
        },
  tooltip: {
        crosshairs: true,
        shared:true,
        useHTML:true,
        headerFormat: '<div class="tooltip-head"><span class="tooltip-head-text">{point.key}</span></div><table class="tooltip-body">',
        pointFormat: '<tr><td class="series-name"><span style="color:{point.color}">\u25CF </span>{series.name}: </td>' +
                     '<td class="series-data"><b>&nbsp;{point.y}</b></td><br></tr>',
        footerFormat: '</table>',
        
        followPointer:true,
        style: {
                  borderColor: '#999',
                  fontSize: 13,
                  borderRadius:5
                }
        },

  rangeSelector:{
        enabled:true,
        selected : 3
        },
  navigator : {
        enabled : true
        },
  scrollbar : {
        enabled : true
        },
  yAxis: [{
        labels: {
              align: 'right',
              x: -3
            },
        title: {
              text: 'Price'
            },
        height: '55%',
              lineWidth: 2
            }, 
            {
                labels: {
                    align: 'right',
                    x: -3
                },
                title: {
                    text: 'Volume'
                },
                top: '65%',
                height: '35%',
                offset: 0,
                lineWidth: 2
            }],

  series : [
        {
          // name : $scope.organizationCode,
          name:'Price',
          data : $scope.price,
          type: 'spline',
          tooltip: {
          valueDecimals: 2,
          valuePrefix: '<i class="fa fa-inr"></i>'
        },
        marker : {
                  enabled : true,
                  radius : 3
                },
        shadow : true
                },
        {
          type: 'column',
          name: 'Volume',
          data:$scope.Volume,
          yAxis: 1
        }
      ]

};
$scope.chart1 = new Highcharts.Chart($scope.chartoption1);
// $('#container').highcharts($scope.chartoption1);
$scope.chart2 = new Highcharts.Chart($scope.chartoption2);
// $('#container1').highcharts($scope.chartoption2);
 // $route.reload(); 
 // $scope.stockgraph.options.chart.events = {

 //        click: function (event) {
 //                         var articleDate = Highcharts.dateFormat('%Y-%m-%d', event.xAxis[0].value);
              
 //              // Make date digestible by Highcharts
 //              articleDate = articleDate.replace(/-/g, "");
              
 //              // Get articles with date
 //              // getArticles(articleDate);
 //        }
 //    }

      // Get today's date
  var d = new Date();

  var month = d.getMonth()+1;
  var day = d.getDate();

  var todaysDate = d.getFullYear() + 
      ((''+month).length<2 ? '0' : '') + month +
      ((''+day).length<2 ? '0' : '') + day;


},function(graphdata) {
          console.log("Request failed");
});

};

}]);


lifeController.controller('govtctrl',['$scope','$http','$route','$rootScope','sortable','$location', function($scope,$http,$route,$rootScope,sortable,$location) {

// ===============================================================================================
 $http.get('JS/Data/govt_schemes.json').success(function(data) {
    $scope.saving = data.saving_schemes;
    $scope.insurance = data.insurance_schemes;
});

}]);
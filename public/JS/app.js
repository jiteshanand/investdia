var ipfaan = angular.module('ipfaan', ['ngRoute','lifeController','services','ui.bootstrap','ngAnimate','elasticsearch']);

ipfaan.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider){
	$locationProvider.html5Mode(true);
	$routeProvider


	.when('/login',{
		templateUrl:"partials/login",
		controller:'userinfo',
	})
	.when('/history',{
		templateUrl:"partials/historical",
		controller:'historyctrl',
	})
	.when('/mf/:nav_number/:code',{
		templateUrl:"partials/nav",
		controller:'mfctrl',
	})
	.when('/addhistory',{
		templateUrl:"partials/historical",
		controller:'historyctrl',
	})
	.when('/',{
		templateUrl:"partials/home"
		
	})
	.when('/home',{
		templateUrl:"partials/home",
		
	})
	.when('/blog',{
		templateUrl:"/blog",
		
	})
	.when('/search',{
		templateUrl:"partials/search",
		controller:'stockdisplayctrl'
	})
	.when('/broker',{
		templateUrl:"partials/broker",
		
	})
	.when('/firms',{
		templateUrl:"partials/firms",
		controller:'firmctrl'
	})
	.when('/govt',{
		templateUrl:"partials/govt",
		controller:'govtctrl'
	})
	.when('/mf',{
		templateUrl:"partials/mf",
		controller:'mfctrl'
	})
	.when('/mf/:nav',{
		templateUrl:"partials/nav",
		controller:'mfctrl'
	})
	.when('/mf/:nav/:scheme',{
		templateUrl:"partials/nav",
		controller:'mfctrl'
	})
	.when('/#services',{
		templateUrl:"partials/home#services"
		
	})
	.when('/stockshome',{
		templateUrl:"partials/stockshome",
		controller:'stockdisplayctrl'
	})
	// .when('/stock/:tickersymbol',{
	// 	templateUrl:"partials/graphplot",
	// 	controller:'stockdisplayctrl'
	// })
	.when('/stock/:tickersymbol',{
		templateUrl:"partials/stockdetail",
		controller:'stockdisplayctrl'
	})
	.when('/stock/:tickersymbol/newsdetail',{
		templateUrl:"partials/newsdetail",
		controller:'stockdisplayctrl'
	})
	
	.when('/virtual',{
		templateUrl:"partials/member"
		
	})
	.when('/signin', {
 		templateUrl: '/partials/signin',
        controller: 'authController'
    })
    .when('/signup', {
        templateUrl: '/partials/signup',
        controller: 'authController'
    })
    .when('/userinfo',{
		templateUrl:"partials/userinfo",
		controller:'authController'
	})

	.otherwise({
		redirectTo:'/'
	});
	
}
]);

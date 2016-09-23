angular
	.module('PageBuilder', ['ngResource', 'ui.router'])
	.constant('API', 'http://localhost:3000/api')
	.config(MainRouter);

function MainRouter($stateProvider, $urlRouterProvider) {
	$stateProvider
        .state('newPage', {
            url: "/pages/new",
            templateUrl: "js/views/pages/new.html"
        })
        .state('indexPages', {
            url: "/pages",
            templateUrl: "js/views/pages/index.html"
        })
        .state('showPage', {
            url: "/pages/:id",
            templateUrl: "js/views/pages/show.html"
        })
        .state('home', {
            url: "/",
            templateUrl: "js/views/home/home.html"
        });
    $urlRouterProvider.otherwise("/");
}
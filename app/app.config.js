(function(){
  'use strict';
//IS thsichaneg hknjseff
    angular.module('selfService')
      .config(function ($mdThemingProvider, $mdIconProvider, $httpProvider, $translateProvider, TENANT_IDENTIFIER) {

          $mdThemingProvider
            .theme('default')
            .primaryPalette('blue', {
              'default': '600'
            })
            .accentPalette('pink', {
              'default': '500'
            })
            .warnPalette('defaultPrimary');

          $mdThemingProvider
            .theme('dark', 'default')
            .primaryPalette('defaultPrimary')
            .dark();

          $mdThemingProvider
            .theme('grey', 'default')
            .primaryPalette('grey');

          $mdThemingProvider
            .theme('custom', 'default')
            .primaryPalette('defaultPrimary', {
              'hue-1': '50'
          });

          $mdThemingProvider
            .definePalette('defaultPrimary', {
              '50':  '#FFFFFF',
              '100': 'rgb(255, 198, 197)',
              '200': '#E75753',
              '300': '#E75753',
              '400': '#E75753',
              '500': '#E75753',
              '600': '#E75753',
              '700': '#E75753',
              '800': '#E75753',
              '900': '#E75753',
              'A100': '#E75753',
              'A200': '#E75753',
              'A400': '#E75753',
              'A700': '#E75753'
            });

          $mdIconProvider
            .icon('user', 'assets/images/user.svg', 64);
          
          $httpProvider.defaults.useXDomain = true;
          //Set headers
          $httpProvider.defaults.headers.common['Content-Type'] = 'application/json; charset=utf-8';
          // Mifos set Tenant
          $httpProvider.defaults.headers.common['Fineract-Platform-TenantId'] = TENANT_IDENTIFIER;
          $httpProvider.interceptors.push('APIRequestInterceptor');

          var defaultLocale = 'en';
          $translateProvider
            .useStaticFilesLoader({
              prefix: 'global-translations/locale-',
              suffix: '.json'
            })
            .useLocalStorage()
            .useSanitizeValueStrategy('escape')
            .preferredLanguage(defaultLocale)
            .fallbackLanguage(defaultLocale);
        }
      )

      .run(['$rootScope', '$location', 'AuthService', function($rootScope, $location, AuthService) {
            $rootScope.$on('$locationChangeStart', function (event) {
                // redirect to login page if not logged in and trying to access a restricted page
                var restrictedPage = $.inArray($location.path(), ['/login', '/forgot', '/register', '/verify']) === -1;
                var loggedIn = AuthService.isAuthenticated();
                if (restrictedPage) {
                    if(!loggedIn) {
                        $location.path('/login');
                    }
                }
                else if(loggedIn) {
                    event.preventDefault();
                }
            });
      }])

})();

// Import the functions you need from the SDKs you need
var firebase = ("firebase/app");
var analytics = ("firebase/analytics");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyBiXsX-AlWYpHKZC-b0_zY0W5GKDltlkD4",
  authDomain: "mali-434814.firebaseapp.com",
  projectId: "mali-434814",
  storageBucket: "mali-434814.appspot.com",
  messagingSenderId: "355572689676",
  appId: "1:355572689676:web:3bef170b73fc3daa323729",
  measurementId: "G-TXZY5G9RK6"
};

// Initialize Firebase
var app = firebase.initializeApp(firebaseConfig);
analytics.getAnalytics(app);

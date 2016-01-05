'use strict'
window.isMobile = false;
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) then window.isMobile = true
lang = window.navigator.userLanguage || window.navigator.language

app = angular
.module('MyApp', [])

.run ['$rootScope', ($rootScope) ->
  if window.isMobile
    $rootScope.media = 'mobile'
  else
    $rootScope.media = 'desktop'
]
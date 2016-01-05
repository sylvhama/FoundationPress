(function() {
  'use strict';
  var app, lang;

  window.isMobile = false;

  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    window.isMobile = true;
  }

  lang = window.navigator.userLanguage || window.navigator.language;

  app = angular.module('MyApp', []).run([
    '$rootScope', function($rootScope) {
      if (window.isMobile) {
        return $rootScope.media = 'mobile';
      } else {
        return $rootScope.media = 'desktop';
      }
    }
  ]);

}).call(this);

(function() {
  'use strict';
  angular.module('MyApp').controller('exampleController', [
    '$scope', function($scope) {
      return $scope.msg = 'Hello World';
    }
  ]);

}).call(this);

(function() {
  'use strict';
  angular.module('MyApp').directive('scrollToTop', [
    function() {
      return {
        restrict: 'A',
        link: function(scope, element, attrs) {
          return $(element).on("click", function(event) {
            var $body, offset, offsetTop, verticalOffset;
            event.preventDefault();
            verticalOffset = typeof verticalOffset !== 'undefined' ? verticalOffset : 0;
            $body = $('body');
            offset = $body.offset();
            offsetTop = offset.top;
            return $('html, body').animate({
              scrollTop: offsetTop
            }, 500, 'linear');
          });
        }
      };
    }
  ]);

}).call(this);

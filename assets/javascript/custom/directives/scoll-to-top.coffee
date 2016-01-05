#Scroll to the top of the page on click.
'use strict'
angular.module('MyApp').directive 'scrollToTop', [() ->
  restrict: 'A'
  link: (scope, element, attrs) ->
    $(element).on "click", (event) ->
      event.preventDefault()
      verticalOffset = if typeof verticalOffset != 'undefined' then verticalOffset else 0
      $body = $('body')
      offset = $body.offset()
      offsetTop = offset.top
      $('html, body').animate { scrollTop: offsetTop }, 500, 'linear'
]
<?php
/**
 * Enqueue google fonts (by Sylvain)
 */
if ( ! function_exists( 'google_fonts' ) ) :
  function google_fonts() {
    $query_args = array(
      'family' => '',
      'subset' => ''
    );
    wp_enqueue_style( 'google_fonts', add_query_arg( $query_args, "//fonts.googleapis.com/css" ), array(), null );
  }
              
  add_action('wp_enqueue_scripts', 'google_fonts');
endif;
?>
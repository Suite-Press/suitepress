<?php
/**
 * Page template
 *
 * @package SuitePress
 */

get_header();
?>

   <div class="container">
       <div class="content">
           <?php
           while ( have_posts() ) :
               the_post();
               the_content(); // This will display the page content from Gutenberg
           endwhile;
           ?>
       </div>
   </div>

<?php
get_footer();

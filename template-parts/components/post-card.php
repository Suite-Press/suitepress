<?php
/**
 * Post Card
 *
 * Note: Should be called with The Loop
 *
 * @package SuitePress
 */

if ( empty( get_the_ID() ) ) {
    return null;
}

$post_permalink = get_the_permalink();
$post_title = get_the_title();
?>

<section id="post-<?php the_ID(); ?>" class="col-lg-4 col-md-6 col-sm-12 suitepress-posts-cards-container pb-3">
   <div class="suitepress-posts-cards">
       <header>
           <a href="<?php echo esc_url( $post_permalink ); ?>" class="block">
               <figure class="img-container">
                   <?php the_post_thumbnail( 'post-thumbnail', [ 'class' => 'absolute w-full h-full left-0 top-0 object-cover' ] ); ?>
               </figure>
           </a>
       </header>
       <div class="post-excerpt my-4">
           <a href="<?php echo esc_url( $post_permalink ); ?>" title="<?php echo esc_html( $post_title ); ?>">
               <?php the_title( '<h3 class="post-card-title">', '</h3>' ); ?>
           </a>
           <div class="entry-meta mb-3">
               <?php
               suitepress_posted_on();
               suitepress_posted_by();
               ?>
           </div>
           <div class="mb-4 truncate-4">
               <?php suitepress_the_excerpt( 40 ); ?>
           </div>
           <div class="entry-footer mt-4">
               <div class="read-more-entry-content d-flex aligncenter justify-content-between mt-3">
                   <?php  echo suitepress_excerpt_more();  ?>
                   <h4>
                       <?php sutiepress_reading_time(); ?>
                   </h4>
               </div>
           </div>
       </div>
   </div>
</section>
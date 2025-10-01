<?php
/**
 * Post Carousel
 *
 * @package SuitePress
 */
$args = [
    'posts_per_page'         => 5,
    'post_type'              => 'post',
    'update_post_meta_cache' => false,
    'update_post_term_cache' => false,
];

$post_query = new \WP_Query( $args );
?>
<section id="posts_carousel_home" class="posts-carousel-home">
    <div class="container">

        <div class="post-carousel-container">

           <div class="post-carousel-wrapper">

               <div class="sp-home-title">
                   How <span style="color: #008080">  WordPress Tutorials </span> Works?
                   <p>
                       WordPress tutorials guide you step-by-step through website creation,
                       covering themes, plugins, customization, and more. Learn at your pace
                       with detailed instructions to build professional, functional, and
                       engaging WordPress sites effortlessly
                   </p>
               </div>

               <div class="posts-carousel">
                   <?php
                   if ( $post_query->have_posts() ) :
                       while ( $post_query->have_posts() ) :
                           $post_query->the_post();
                           ?>
                           <div class="card">
                               <?php
                               if ( has_post_thumbnail() ) {
                                   the_post_custom_thumbnail(
                                       get_the_ID(),
                                       'featured-thumbnail',
                                       [
                                           'sizes' => '(max-width: 350px) 350px, 233px',
                                           'class' => 'w-100',
                                       ]
                                   );
                               } else {
                                   ?>
                                   <img src="https://via.placeholder.com/510x340" class="w-100" alt="Card image cap">
                                   <?php
                               }
                               ?>
                               <div class="card-body">
                                   <?php the_title( '<h3 class="card-title">', '</h3>' ); ?>
                                   <?php suitepress_the_excerpt('50'); ?>
                                   <a href="<?php echo esc_url( get_the_permalink() ); ?>" class="btn btn-primary">
                                       <?php esc_html_e( 'View More', 'suitepress' ); ?>
                                   </a>
                               </div>
                           </div>
                       <?php
                       endwhile;
                   else:
                       echo "No posts found, please add a new posts to previews";
                   endif;
                   wp_reset_postdata();
                   ?>
               </div>

           </div>

        </div>

    </div>
<section>

<?php
/**
 * Reusable Blog Card Template
 * Used for both blog archive and single post related posts
 *
 * @package SuitePress
 */
?>

<article id="post-<?php the_ID(); ?>" <?php post_class('sp-blog-card'); ?>>

    <!-- Featured Image -->
    <?php if ( has_post_thumbnail() ) : ?>
        <div class="sp-blog-card-image">
            <a href="<?php echo esc_url( get_permalink() ); ?>" class="sp-blog-image-link">
                <?php
                the_post_thumbnail('large', array(
                    'class' => 'sp-blog-thumbnail',
                    'alt' => esc_attr(get_the_title())
                ));
                ?>
                <div class="sp-blog-image-overlay"></div>
            </a>
        </div>
    <?php endif; ?>

    <!-- Card Content -->
    <div class="sp-blog-card-content">

        <!-- Title -->
        <h3 class="sp-blog-card-title">
            <a href="<?php echo esc_url( get_permalink() ); ?>" class="sp-blog-title-link">
                <?php echo wp_kses_post( get_the_title() ); ?>
            </a>
        </h3>

        <!-- Meta Information -->
        <div class="sp-blog-card-meta">
            <time class="sp-blog-date" datetime="<?php echo esc_attr( get_the_date( 'c' ) ); ?>">
                <?php echo esc_html( get_the_date() ); ?>
            </time>
            <span class="sp-meta-separator">•</span>
            <span class="sp-blog-author">
                <?php echo esc_html( get_the_author() ); ?>
            </span>
        </div>

        <!-- Excerpt -->
        <div class="sp-blog-card-excerpt">
            <?php
            echo wp_kses_post( suitepress_get_excerpt(25) );
            ?>
        </div>

        <!-- Card Footer -->
        <div class="sp-blog-card-footer">
            <div class="sp-read-more-col">
                <a href="<?php echo esc_url( get_permalink() ); ?>" class="sp-read-more-btn">
                    Read More
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                </a>
            </div>
            <div class="sp-reading-time-col">
                <span class="sp-reading-time"><?php echo esc_html( suitepress_get_reading_time() ); ?></span>
            </div>
        </div>

    </div>
</article>

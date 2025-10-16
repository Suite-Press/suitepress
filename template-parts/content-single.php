<?php
/**
 * Single Post Content Template
 *
 * @package SuitePress
 */
?>

<article id="post-<?php the_ID(); ?>" <?php post_class('sp-single-article'); ?>>

    <!-- Article Header -->
    <header class="sp-article-header">
        <?php get_template_part( 'template-parts/components/blog/entry-header' ); ?>
    </header>

    <!-- Article Meta -->
    <div class="sp-article-meta">
        <?php get_template_part( 'template-parts/components/blog/entry-meta' ); ?>
    </div>

    <!-- Article Content -->
    <div class="sp-article-content">
        <?php get_template_part( 'template-parts/components/blog/entry-content' ); ?>
    </div>

    <!-- Article Footer -->
    <footer class="sp-article-footer">
        <?php get_template_part( 'template-parts/components/blog/entry-footer' ); ?>
    </footer>

</article>

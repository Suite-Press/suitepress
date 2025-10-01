<?php
/**
 * Author Post Lists View Template
 *
 * @package SuitePress
 */
?>
<div class="col-md-8 col-lg-8 col-sm-12 search-result-content-container">
    <div>
        <?php while ( have_posts() ) {
            the_post(); ?>
            <div class="search-result-content mb-5">
                <div class="search-result-body">
                    <div class="author-info">
                        <a href="<?php echo esc_url( get_author_posts_url( get_the_author_meta( 'ID' ) ) ); ?>" class="author-link">
                            <?php echo get_avatar( get_the_author_meta( 'ID' ), 32 ); ?>
                            <h5><?php the_author(); ?></h5>
                        </a>
                    </div>
                    <h3 class="search-result-title">
                        <a href="<?php echo esc_url(get_the_permalink()); ?>">
                            <?php the_title(); ?>
                        </a>
                    </h3>
                    <?php suitepress_the_excerpt(60); ?>
                    <div class="date-and-info">
                        <h5 class="pt-2 pb-3"> Published <?php echo get_the_date(); ?> |
                            <?php sutiepress_reading_time() ?>
                        </h5>
                        <span class="share-trigger pt-2 pb-3"> ... </span>
                        <div class="share-options" style="display: none;">
                            <button
                                class="share-btn"
                                data-post-link="<?php echo esc_url(get_the_permalink()); ?>">
                                Share
                            </button>
                        </div>

                    </div>
                </div>
            </div>

        <?php } ?>

    </div>

    <?php suitepress_pagination(); ?>
</div>

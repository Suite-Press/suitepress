<?php
/**
 * Author Follow Cards
 *
 * @package SuitePress
 */


$author_email = get_the_author_meta( 'user_email' );
$has_avatar   = suitepress_has_gravatar( $author_email );
$avatar       = get_avatar( $author_email, 90, '', '', [ 'class'   => 'rounded-circle', 'default' => '404' ] );
?>
<div class="col-md-4 col-lg-4 col-sm-12">
    <div class="author-follow-card">

        <div class="author-info author-avatar d-flex align-items-center p-3">

            <div id="author-avatar">
                <a href="<?php echo esc_url( get_author_posts_url( get_the_author_meta( 'ID' ) ) ); ?>">
                <?php
                if ( ! empty( $has_avatar ) ) {
                    echo wp_kses_post( $avatar );
                } else {
                    printf(
                        '<span id="author-firstname" class="d-none">%1$s</span><span id="author-lastname" class="d-none">%2$s</span>
<div id="author-profile-img" style="width: 90px; height: 90px;" class="rounded-circle bg-secondary position-relative"><span class="h1 text-white inset-center"></span></div>',
                        esc_html( get_the_author_meta( 'first_name' ) ),
                        esc_html( get_the_author_meta( 'last_name' ) )
                    );
                }
                ?>
                </a>
            </div><!-- #author-avatar -->
            <div class="author-name-title pl-4">
                <h4> <a href="<?php echo esc_url( get_author_posts_url( get_the_author_meta( 'ID' ) ) ); ?>"> <?php the_author(); ?> </a> </h4>
                <h5>
                    <?php
                    $author_title = get_the_author_meta( 'author_title' );
                    echo ! empty( $author_title ) ? esc_html( $author_title ) : esc_html__( 'No title set', 'suitepress' );
                    ?>
                </h5>
            </div>

        </div>

        <div class="author-follows d-flex align-items-center pl-3 pr-3 justify-content-between">
            <div>
                <h4> Followers <br> <span id="followers-count"><?php echo esc_html( get_user_meta( get_the_author_meta( 'ID' ), 'followers_count', true ) ?: '0' ); ?></span></h4>
            </div>
            <div>
                <h4>Joined <br> <?php echo date( 'F j, Y', strtotime( get_the_author_meta( 'user_registered' ) ) ); ?></h4>
            </div>
        </div>

        <div class="author-follow-button">
            <a href="#" id="follow-button" data-author-id="<?php echo esc_attr( get_the_author_meta( 'ID' ) ); ?>">Follow</a>
            <a href="#" class="d-none" id="unfollow-button" data-author-id="<?php echo esc_attr( get_the_author_meta( 'ID' ) ); ?>">Unfollow</a>
        </div>

    </div>
</div>


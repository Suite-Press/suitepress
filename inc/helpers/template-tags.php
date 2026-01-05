<?php
/**
 * Template tags template
 *
 * @package SuitePress
 */
function get_the_post_custom_thumbnail( $post_id, $size = 'featured-thumbnail', $additional_attributes = [] ) {
    $custom_thumbnail = '';

    if ( null === $post_id ) {
        $post_id = get_the_ID();
    }

    if ( has_post_thumbnail( $post_id ) ) {

        $default_attributes = [
            'loading' => 'lazy'
        ];

        $attributes = array_merge( $additional_attributes, $default_attributes );

        $custom_thumbnail = wp_get_attachment_image(

            get_post_thumbnail_id( $post_id ),
            $size,
            false,
            $attributes

        );
    }

    return $custom_thumbnail;
}
function the_post_custom_thumbnail( $post_id, $size = 'featured-thumbnail', $additional_attributes = [] ) {
    echo get_the_post_custom_thumbnail( $post_id, $size, $additional_attributes );
}

function suitepress_posted_on() {

    $year                        = get_the_date( 'Y' );
    $month                       = get_the_date( 'n' );
    $day                         = get_the_date( 'j' );
    $post_date_archive_permalink = get_day_link( $year, $month, $day );

    $time_string = '<time class="entry-date published updated" datetime="%1$s">%2$s</time>';

    // Post is modified ( when post published time is not equal to post modified time )
    if ( get_the_time( 'U' ) !== get_the_modified_time( 'U' ) ) {
        $time_string = '<time class="entry-date published" datetime="%1$s">%2$s</time> <time class="updated" datetime="%3$s">%4$s</time>';
    }

    $time_string = sprintf( $time_string,
        esc_attr( get_the_date( DATE_W3C ) ),
        esc_attr( get_the_date() ),
        esc_attr( get_the_modified_date( DATE_W3C ) ),
        esc_attr( get_the_modified_date() )
    );

    $posted_on = sprintf(
        esc_html_x( 'Posted on %s', 'post date', 'suitepress' ),
        '<a href="' . esc_url( $post_date_archive_permalink ) . '" rel="bookmark">' . $time_string . '</a>'
    );

    echo '<span class="posted-on" style="color: rgb(0 128 128 / 53%) !important">' . $posted_on . '</span>';
}

function suitepress_posted_by() {
    $byline = sprintf(
        esc_html_x( ' by %s', 'post author', 'suitepress' ),
        '<span class="author vcard"><a href="' . esc_url( get_author_posts_url( get_the_author_meta( 'ID' ) ) ) . '">' . esc_html( get_the_author() ) . '</a></span>'
    );

    echo '<span class="byline text-secondary">' . $byline . '</span>';
}
function suitepress_the_excerpt( $trim_character_count = 0 ) {
    $post_ID = get_the_ID();

    if ( empty( $post_ID ) ) {
        return null;
    }

    if ( has_excerpt() || 0 === $trim_character_count ) {
        the_excerpt();

        return;
    }

    $excerpt = wp_html_excerpt( get_the_excerpt( $post_ID ), $trim_character_count, '...' );


    echo $excerpt;
}

function suitepress_excerpt_more( $more = '' ) {

    if ( ! is_single() ) {
        $more = sprintf( '<a class="suitepress-read-more text-white btn btn-info" href="%1$s">%2$s</a>',
            get_permalink( get_the_ID() ),
            __( 'Read more', 'suitepress' )
        );
    }

    return $more;
}

function suitepress_pagination(): void {
    $allowed_tags = [
        'span' => [
            'class' => []
        ],
        'a' => [
            'class' => [],
            'href' => [],
        ]
    ];

    $args = [
        'before_page_number' => '<span class="page-numbers">',
        'after_page_number' => '</span>',
        'prev_text' => __('Previous', 'suitepress'),
        'next_text' => __('Next', 'suitepress'),
        'type' => 'array'
    ];

    $pagination_links = paginate_links($args);

    if ($pagination_links) {
        printf(
            '<nav class="suitepress-pagination" aria-label="%s"><div class="page-numbers">%s</div></nav>',
            esc_attr__('Page navigation', 'suitepress'),
            wp_kses(implode('', $pagination_links), $allowed_tags)
        );
    }
}

function suitepress_has_gravatar( $user_email ) {

    $gravatar_url = get_avatar_url( $user_email );
    if ( suitepress_is_uploaded_via_wp_admin( $gravatar_url ) ) {
        return true;
    }
    $gravatar_url = sprintf( '%s&d=404', $gravatar_url );
    $headers = @get_headers( $gravatar_url );
    return preg_match( "|200|", $headers[0] );

}
function suitepress_is_uploaded_via_wp_admin( $gravatar_url ) {

    $parsed_url = wp_parse_url( $gravatar_url );
    $query_args = ! empty( $parsed_url['query'] ) ? $parsed_url['query'] : '';
    return empty( $query_args );

}
function sutiepress_reading_time(){
    // Calculate estimated reading time based on word count
    $word_count = str_word_count(wp_strip_all_tags(get_the_content()));
    $reading_time = ceil($word_count / 200); // reading speed is 200 wpm (assume)
    echo $reading_time . ' min read';
}

//New Code Added


function suitepress_get_excerpt($length = 25) {
    $excerpt = get_the_excerpt();

    if (empty($excerpt)) {
        $excerpt = wp_trim_words(get_the_content(), $length, '...');
    } else {
        $excerpt = wp_trim_words($excerpt, $length, '...');
    }

    return $excerpt;
}

/**
 * Calculate reading time
 */
function suitepress_get_reading_time() {
    $content = get_post_field('post_content');
    $word_count = str_word_count(strip_tags($content));
    $reading_time = ceil($word_count / 200); // 200 words per minute

    if (function_exists('sutiepress_reading_time')) {
        return sutiepress_reading_time();
    }

    return $reading_time . ' min read';
}

/**
 * Display blog grid
 */
function suitepress_display_blog_grid($query = null) {
    if (!$query) {
        global $wp_query;
        $query = $wp_query;
    }

    if ($query->have_posts()) :
        echo '<div class="sp-blog-grid">';

        while ($query->have_posts()) : $query->the_post();
            get_template_part('template-parts/content-blog-card');
        endwhile;

        echo '</div>';

        wp_reset_postdata();
    else :
        get_template_part('template-parts/content-none');
    endif;
}

/**
 * Display pagination
 */
function suitepress_display_pagination() {
    echo '<div class="sp-blog-pagination">';
    suitepress_pagination();
    echo '</div>';
}

/**
 * Get post meta HTML
 */
function suitepress_get_post_meta() {
    ob_start();
    ?>
    <div class="sp-entry-meta">
        <div class="sp-meta-items">
            <?php suitepress_posted_on(); ?>
            <span class="sp-meta-separator">•</span>
            <?php suitepress_posted_by(); ?>
            <span class="sp-meta-separator">•</span>
            <span class="sp-reading-time"><?php echo esc_html(suitepress_get_reading_time()); ?></span>
        </div>
    </div>
    <?php
    return ob_get_clean();
}





/**
 * Get hierarchical term items.
 */
function get_hierarchical_term_items( string $taxonomy = '', int $parent_id = 0 ) : array {

    // Build query args.
    $query_args = [
        'post_type'              => 'post',
        'post_status'            => 'publish',
        'fields'                 => 'ids',
        'posts_per_page'         => 1,
        'no_found_rows'          => true,
        'update_post_meta_cache' => false,
        'update_post_term_cache' => false,
    ];

    $items = [];

    // 1. Add Parent Terms.
    $the_terms = get_terms(
        [
            'taxonomy'   => $taxonomy,
            'hide_empty' => true,
            'parent'     => $parent_id,
        ]
    );
    $the_terms = ! is_wp_error( $the_terms ) && ! empty( $the_terms ) ? $the_terms : [];

    foreach ( $the_terms as $the_term ) {

        $query_args['tax_query'] = [
            [
                'taxonomy' => $taxonomy,
                'field'    => 'slug',
                'terms'    => [ $the_term->slug ],
            ],
        ];

        $posts_with_the_term = new WP_Query( $query_args );

        if ( empty( $posts_with_the_term->posts ) ) {
            continue;
        }

        $term_data = [
            'label' => $the_term->name,
            'value' => $the_term->term_id,
            'slug'  => $the_term->slug,
        ];

        // 2. Add Child Terms if they exist.
        $term_children = get_terms(
            [
                'taxonomy'     => $taxonomy,
                'hierarchical' => 1,
                'hide_empty'   => 0,
                'parent'       => $the_term->term_id ?? 0,
            ]
        );

        if ( ! empty( $term_children ) && ! is_wp_error( $term_children ) ) {
            $term_data['children'] = [];

            foreach ( $term_children as $term_child ) {
                if ( ! empty( $term_child ) && $term_child instanceof WP_Term ) {

                    $query_args['tax_query'] = [
                        [
                            'taxonomy' => $taxonomy,
                            'field'    => 'slug',
                            'terms'    => [ $term_child->slug ],
                        ],
                    ];

                    $posts_with_term_child = new WP_Query( $query_args );

                    if ( empty( $posts_with_term_child->posts ) ) {
                        continue;
                    }

                    $term_child_data = [
                        'label' => $term_child->name ?? '',
                        'value' => $term_child->term_id ?? '',
                        'slug'  => $term_child->slug,
                    ];

                    // 3. Add grandchildren terms if they exist.
                    $term_grand_children = get_terms(
                        [
                            'taxonomy'     => $taxonomy,
                            'hierarchical' => 1,
                            'hide_empty'   => 0,
                            'parent'       => $term_child->term_id ?? 0,
                        ]
                    );

                    if ( ! empty( $term_grand_children ) && ! is_wp_error( $term_grand_children ) ) {
                        $term_child_data['children'] = [];

                        foreach ( $term_grand_children as $term_grand_child ) {
                            if ( ! empty( $term_grand_child ) && $term_grand_child instanceof WP_Term ) {

                                $query_args['tax_query'] = [
                                    [
                                        'taxonomy' => $taxonomy,
                                        'field'    => 'slug',
                                        'terms'    => [ $term_grand_child->slug ],
                                    ],
                                ];

                                $posts_with_term_grand_child = new WP_Query( $query_args );

                                if ( empty( $posts_with_term_grand_child->posts ) ) {
                                    continue;
                                }

                                $term_grand_child_data = [
                                    'label' => $term_grand_child->name ?? '',
                                    'value' => $term_grand_child->term_id ?? '',
                                    'slug'  => $term_grand_child->slug ?? '',
                                ];

                                // 4. Add great-grandchildren terms if they exist.
                                $term_great_grand_children = get_terms(
                                    [
                                        'taxonomy'     => $taxonomy,
                                        'hierarchical' => 1,
                                        'hide_empty'   => 0,
                                        'parent'       => $term_grand_child->term_id ?? 0,
                                    ]
                                );

                                if ( ! empty( $term_great_grand_children ) && ! is_wp_error( $term_great_grand_children ) ) {
                                    foreach ( $term_great_grand_children as $term_great_grand_child ) {
                                        if ( ! empty( $term_great_grand_child ) && $term_great_grand_child instanceof WP_Term ) {

                                            $query_args['tax_query'] = [
                                                [
                                                    'taxonomy' => $taxonomy,
                                                    'field'    => 'slug',
                                                    'terms'    => [ $term_great_grand_child->slug ],
                                                ],
                                            ];

                                            $posts_with_term_great_grand_child = new WP_Query( $query_args );

                                            if ( empty( $posts_with_term_great_grand_child->posts ) ) {
                                                continue;
                                            }

                                            $term_grand_child_data['children'][] = [
                                                'label' => $term_great_grand_child->name ?? '',
                                                'value' => $term_great_grand_child->term_id ?? '',
                                                'slug'  => $term_great_grand_child->slug ?? '',
                                            ];
                                        }
                                    }
                                }

                                $term_child_data['children'][] = $term_grand_child_data;
                            }
                        }
                    }

                    $term_data['children'][] = $term_child_data;
                }
            }
        }

        $items[] = $term_data;

    }

    return $items;
}

/**
 * Get Filter Ids with their title.
 *
 * Pairs of filter ids and title in their respective key's
 * e.g. ['destinations'=> [123 => 'Canada', 345 => 'Egypt']].
 */
function get_filter_ids( array $filters_data = [] ): array {
    if ( empty( $filters_data ) || ! is_array( $filters_data ) ) {
        return [];
    }

    $filter_ids = [];

    foreach ( $filters_data as $filter_data ) {
        if (
            empty( $filter_data['slug'] )
            || empty( $filter_data['children'] )
            || ! is_array( $filter_data['children'] )
        ) {
            continue;
        }

        // Build Data.
        $key                = $filter_data['slug'];
        $filter_ids[ $key ] = [];

        // Parent.
        foreach ( $filter_data['children'] as $parent_item ) {
            $filter_ids[ $key ][ $parent_item['value'] ] = [
                'slug' => $parent_item['slug'] ?? '',
                'text' => $parent_item['label'] ?? '',
            ];

            if ( empty( $parent_item['children'] ) || ! is_array( $parent_item['children'] ) ) {
                continue;
            }

            // Children.
            foreach ( $parent_item['children'] as $child_item ) {
                $filter_ids[ $key ][ $child_item['value'] ] = [
                    'slug' => $child_item['slug'] ?? '',
                    'text' => $child_item['label'] ?? '',
                ];

                if ( empty( $child_item['children'] ) || ! is_array( $child_item['children'] ) ) {
                    continue;
                }

                // Grand Children.
                foreach ( $child_item['children'] as $grand_child_item ) {
                    $filter_ids[ $key ][ $grand_child_item['value'] ] = [
                        'slug' => $grand_child_item['slug'] ?? '',
                        'text' => $grand_child_item['label'] ?? '',
                    ];

                    if ( empty( $grand_child_item['children'] ) || ! is_array( $grand_child_item['children'] ) ) {
                        continue;
                    }

                    // Great Grand Children.
                    foreach ( $grand_child_item['children'] as $great_grand_child_item ) {
                        $filter_ids[ $key ][ $great_grand_child_item['value'] ] = [
                            'slug' => $great_grand_child_item['slug'] ?? '',
                            'text' => $great_grand_child_item['label'] ?? '',
                        ];
                    }
                }
            }
        }
    }

    return $filter_ids;
}

/**
 * Get Filters data.
 *
 */
function get_filters_data(): array {
    $category_terms = get_hierarchical_term_items( 'category' );
    $tag_terms = get_hierarchical_term_items( 'post_tag' );

    return [
        [
            'label'    => 'Categories',
            'slug'     => 'category',
            'children' => $category_terms,
        ],
        [
            'label'    => 'Tags',
            'slug'     => 'post_tag',
            'children' => $tag_terms,
        ],
    ];
}

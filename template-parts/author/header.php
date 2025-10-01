<?php
/**
 * Author Header Template Part.
 *
 * @package SuitePress
 */

?>

<header class="page-header row mb-4">

    <div class="site-content">
        <?php

        if ( ! empty( get_the_author() ) ) {
            printf(
                '<h3 class="font-size-xl h3 pb-4 pl-4">%1$s %2$s</h3>',
                __( 'Articles written by ', 'suitepress' ),
                get_the_author()
            );
        }
        ?>
    </div>

</header>
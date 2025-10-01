<?php
/*
 * Main Template File
 *
 * @package SuitePress
 */
get_header();
?>
<div id="primary">
        <div id="main" class="site-main mt-5" role="main">
            <?php
            if( have_posts() ) :
            ?>

            <div class="container suitepress-blogs-containers">

                <?php

                if( is_home() && !is_front_page()){
                    ?>
                    <header class="mt-5">
                        <h1 class="page-title"> <?php single_post_title() ?> </h1>
                    </header>
                    <?php
                }
                ?>

                <div class="row">

                    <?php
                    $index = 0;
                    $no_of_col = 3;

                    while(have_posts()) : the_post();

                        if(0 === $index % $no_of_col){ ?>
                            <div class="row">
                        <?php } ?>

                        <div class="col-lg-4 col-md-6 col-sm-12">
                            <?php get_template_part('/template-parts/content'); ?>
                        </div>
                    <?php

                        $index++;
                        if(0 !== $index && 0 === $index % $no_of_col){ ?>
                            </div>
                        <?php }
                    endwhile;
                    ?>

                </div> <!--row end-->
                <?php
                else:
                    get_template_part('/template-parts/content-none');

                endif;
                suitepress_pagination();
                ?>
            </div><!--container end-->

        </div>
    </div>

<?php
get_footer();

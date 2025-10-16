<?php
/*
 * Header Navbar template
 *
 * @package SuitePress
 */
$menu_class = \SUITEPRESS_THEME\Inc\Menus::get_instance();
$header_menu_id = $menu_class->get_menu_id('suitepress-primary-menu');
$header_menus = wp_get_nav_menu_items($header_menu_id);
?>
<!-- Enhanced Top Banner Section -->
<section class="sp-top-banner">
    <div class="sp-container">
        <div class="sp-banner-content">
            <!-- Left Side - Main Message -->
            <div class="sp-banner-main">
                <div class="sp-banner-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.24 10.28 4 13l8 8 8-8c2.76-2.72 2.54-6.3.42-8.42z"></path>
                    </svg>
                </div>
                <div class="sp-banner-text">
                    Empowering Tech Journey
                </div>
            </div>

            <!-- Center - Feature Highlights -->
            <div class="sp-banner-features">
                <div class="sp-feature-item">
                    <span class="sp-feature-icon">🎁</span>
                    <span class="sp-feature-text">Free Plugins</span>
                </div>
                <div class="sp-feature-item">
                    <span class="sp-feature-icon">📚</span>
                    <span class="sp-feature-text">Expert Blogs</span>
                </div>
                <div class="sp-feature-item">
                    <span class="sp-feature-icon">🎓</span>
                    <span class="sp-feature-text">Tutorials</span>
                </div>
            </div>

            <!-- Right Side - CTA -->
            <div class="sp-banner-actions">
                <a href="/plugins" class="sp-banner-btn sp-banner-btn-primary">
                    Explore Free Plugins
                </a>
                <button class="sp-banner-close" aria-label="Close banner" title="Close banner">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
        </div>

        <!-- Expanded Details (Hidden by default, shows on hover) -->
        <div class="sp-banner-details">
            <div class="sp-details-grid">
                <div class="sp-detail-item">
                    <div class="sp-detail-icon">🆓</div>
                    <div class="sp-detail-content">
                        <h4>Free Plugins</h4>
                        <p>Most of our plugins are completely free with premium features</p>
                    </div>
                </div>
                <div class="sp-detail-item">
                    <div class="sp-detail-icon">📖</div>
                    <div class="sp-detail-content">
                        <h4>Technical Blogs</h4>
                        <p>Learn from our expert articles on WordPress development</p>
                    </div>
                </div>
                <div class="sp-detail-item">
                    <div class="sp-detail-icon">💡</div>
                    <div class="sp-detail-content">
                        <h4>Easy Tutorials</h4>
                        <p>Step-by-step guides for WordPress and related technologies</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Header Section -->
<header class="suitepress-header">
    <div class="container">
        <div class="header-main">
            <!-- Logo Section -->
            <div class="header-logo">
                <?php
                if ( function_exists( 'the_custom_logo' ) ){
                    the_custom_logo();
                }
                ?>
            </div>

            <!-- Navigation Section -->
            <nav class="navbar navbar-expand-lg header-nav">
                <!-- Search Icon -->
                <div class="search-icon-wrapper">
                    <button class="search-toggle" aria-label="Open search" type="button">
                        <i class="fas fa-search"></i>
                    </button>
                </div>

                <!-- Mobile Toggle Button - FIXED: Using Bootstrap 4 syntax -->
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <!-- Main Menu -->
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <?php
                    if ( !empty($header_menus) && is_array($header_menus)){
                        ?>
                        <ul class="navbar-nav mr-auto">
                            <?php
                            foreach ($header_menus as $menu_item){
                                if ( !$menu_item->menu_item_parent ){
                                    $child_menu_items = $menu_class->get_child_menus($header_menus, $menu_item->ID);
                                    $has_children = ! empty( $child_menu_items ) && is_array($child_menu_items);

                                    if (! $has_children ){
                                        ?>
                                        <li class="nav-item">
                                            <a class="nav-link" href="<?php echo esc_url($menu_item->url) ?>">
                                                <?php echo esc_html($menu_item->title) ?>
                                            </a>
                                        </li>
                                        <?php
                                    }else{
                                        ?>
                                        <li class="nav-item dropdown">
                                            <a class="nav-link" href="<?php echo esc_url($menu_item->url) ?>" id="navbarDropdown-<?php echo $menu_item->ID; ?>">
                                                <?php echo esc_html($menu_item->title) ?>
                                                <i class="fas fa-chevron-down dropdown-arrow"></i>
                                            </a>
                                            <div class="dropdown-menu" aria-labelledby="navbarDropdown-<?php echo $menu_item->ID; ?>">
                                                <?php
                                                foreach ($child_menu_items as $child_menu_item) {
                                                    ?>
                                                    <a class="dropdown-item" href="<?php echo esc_url($child_menu_item->url) ?>">
                                                        <?php echo esc_html($child_menu_item->title) ?>
                                                    </a>
                                                    <?php
                                                }
                                                ?>
                                            </div>
                                        </li>
                                        <?php
                                    }
                                }
                            }
                            ?>
                        </ul>
                        <?php
                    }
                    ?>
                </div>
            </nav>
        </div>
    </div>
</header>

<!-- Search Popup -->
<div class="search-popup">
    <div class="search-popup-overlay"></div>
    <div class="search-popup-content">
        <button class="search-close" aria-label="Close search" type="button">
            <i class="fas fa-times"></i>
        </button>
        <div class="search-form-container">
            <h3>What are you looking for?</h3>
            <form role="search" method="get" class="search-form" action="<?php echo esc_url(home_url('/')); ?>">
                <input type="search" class="search-field" placeholder="Search..." value="<?php echo get_search_query(); ?>" name="s" />
                <button type="submit" class="search-submit">Search</button>
            </form>
        </div>
    </div>
</div>

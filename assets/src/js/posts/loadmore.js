( function ( $ ) {
    class LoadMore {
        constructor() {
            this.ajaxUrl = siteConfig?.ajaxUrl ?? '';
            this.ajaxNonce = siteConfig.nonce.loadmore_post_nonce;
            this.loadMoreBtn = $( '#load-more' );
            this.loadingTextEl = $( '#loading-text' );
            this.isRequestProcessing = false;

            this.options = {
                root: null,
                rootMargin: '0px',
                threshold: 1.0,
            };

            this.init();
        }

        init() {
            if ( ! this.loadMoreBtn.length ) {
                return;
            }

            this.totalPagesCount = $( '#post-pagination' ).data( 'max-pages' );

            const observer = new IntersectionObserver(
                ( entries ) => this.intersectionObserverCallback( entries ),
                this.options
            );
            observer.observe( this.loadMoreBtn[ 0 ] );
        }
        intersectionObserverCallback( entries ) {

            entries.forEach( ( entry ) => {
                if ( entry?.isIntersecting ) {
                    this.handleLoadMorePosts();
                }
            } );
        }

        handleLoadMorePosts() {
            // Get page no from data attribute of load-more button.
            const page = this.loadMoreBtn.data( 'page' );
            if ( ! page || this.isRequestProcessing ) {
                return null;
            }

            const nextPage = parseInt( page ) + 1; // Increment page count by one.
            this.isRequestProcessing = true;

            $.ajax( {
                url: this.ajaxUrl,
                type: 'post',
                data: {
                    page: page,
                    action: 'load_more',
                    ajax_nonce: this.ajaxNonce,
                },
                success: ( response ) => {
                    this.loadMoreBtn.data( 'page', nextPage );
                    $( '#load-more-content' ).append( response );
                    this.removeLoadMoreIfOnLastPage( nextPage );
                    this.isRequestProcessing = false;
                },
                error: ( response ) => {
                    console.log( response );
                    this.isRequestProcessing = false;
                },
            } );
        }

        removeLoadMoreIfOnLastPage( nextPage ) {
            if ( nextPage + 1 > this.totalPagesCount ) {
                this.loadMoreBtn.remove();
            }
        }

    }

    new LoadMore();
} )( jQuery );
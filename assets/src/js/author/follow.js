(function ($) {
    class AuthorFollow {
        constructor() {
            this.ajaxUrl = siteConfig.ajaxUrl;
            this.nonce = siteConfig.nonce.author_follow_nonce;
            this.followButton = $("#follow-button");
            this.unfollowButton = $("#unfollow-button");
            this.followersCountEl = $("#followers-count");
            this.init();
        }

        init() {
            if (!this.followButton.length && !this.unfollowButton.length) {
                return;
            }

            // Check initial follow status on page load
            this.checkFollowStatus();

            this.followButton.on("click", (e) => this.handleFollowClick(e));
            this.unfollowButton.on("click", (e) => this.handleUnfollowClick(e));
        }

        checkFollowStatus() {
            const authorId = this.followButton.data("author-id") || this.unfollowButton.data("author-id");

            $.ajax({
                url: this.ajaxUrl,
                type: "POST",
                data: {
                    action: "check_follow_status",
                    author_id: authorId,
                    nonce: this.nonce,
                },
                success: (response) => {
                    if (response.success) {
                        // Set initial button state based on follow status
                        if (response.data.is_following) {
                            this.unfollowButton.removeClass("d-none");
                            this.followButton.addClass("d-none");
                        } else {
                            this.followButton.removeClass("d-none");
                            this.unfollowButton.addClass("d-none");
                        }

                        // Update followers count
                        this.followersCountEl.text(response.data.followers_count);
                    }
                },
                error: () => {
                    console.error("Failed to check follow status.");
                },
            });
        }

        handleFollowClick(e) {
            e.preventDefault();

            const authorId = this.followButton.data("author-id");
            this.followAuthor(authorId);
        }

        handleUnfollowClick(e) {
            e.preventDefault();

            const authorId = this.unfollowButton.data("author-id");
            this.unfollowAuthor(authorId);
        }

        followAuthor(authorId) {
            $.ajax({
                url: this.ajaxUrl,
                type: "POST",
                data: {
                    action: "author_follow",
                    author_id: authorId,
                    nonce: this.nonce,
                },
                success: (response) => this.handleFollowSuccess(response),
                error: () => this.handleError(),
            });
        }

        unfollowAuthor(authorId) {
            $.ajax({
                url: this.ajaxUrl,
                type: "POST",
                data: {
                    action: "author_unfollow",
                    author_id: authorId,
                    nonce: this.nonce,
                },
                success: (response) => this.handleUnfollowSuccess(response),
                error: () => this.handleError(),
            });
        }

        handleFollowSuccess(response) {
            if (response.success) {
                this.followersCountEl.text(response.data.followers_count);
                this.followButton.addClass("d-none");
                this.unfollowButton.removeClass("d-none");
                showNotification("You are now following this author!");
            } else {
                showNotification(response.data.message);
            }
        }

        handleUnfollowSuccess(response) {
            if (response.success) {
                this.followersCountEl.text(response.data.followers_count);
                this.unfollowButton.addClass("d-none");
                this.followButton.removeClass("d-none");
                showNotification("You have unfollowed this author.");
            } else {
                showNotification(response.data.message);
            }
        }

        handleError() {
            showNotification("An error occurred. Please try again.");
        }
    }

    new AuthorFollow();

})(jQuery);
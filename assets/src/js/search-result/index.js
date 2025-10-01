jQuery(document).ready(function ($) {
    $(".share-trigger").on("click", function () {
        const $shareOptions = $(this).siblings(".share-options");
        $shareOptions.toggle();
    });

    $(".share-btn").on("click", function () {
        const postLink = $(this).data("post-link");
        navigator.clipboard
            .writeText(postLink)
            .then(() => {
                const $successMessage = $("<span>")
                    .text("Link copied!")
                    .css({ color: "green", marginLeft: "10px" });

                $(this).parent().append($successMessage);

                setTimeout(() => $successMessage.remove(), 2000);
            })
            .catch((err) => {
                console.error("Failed to copy link: ", err);
            });
    });
});

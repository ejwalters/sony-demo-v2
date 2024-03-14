const products = [
    {
        id: 1,
        name: "Final Fantasy",
        platform: "PS5",
        price: 59.99,
        sku: 123654,
        headline: "The Unknown Journey Continues",
        description: "Final Fantasy VII Rebirth is the second entry in the Final Fantasy VII remake project, which retells the story of the genre-redefining RPG across three distinct games.",
        img: "https://external-preview.redd.it/according-to-powerpyxs-guide-final-fantasy-7-vii-rebirth-v0-7-66Bc-0NCsLy6YPZF-iOWpPH_AvbeVT-MV1ieD6cOg.jpg?auto=webp&s=cb88b8ccee63ec817b123255bab1321cb1c8f91d"
    },
    {
        id: 2,
        name: "Helldivers",
        platform: "PS5",
        price: 59.99,
        sku: 321654,
        headline: "The Galaxy's Last Line Of Defense",
        description: "Do you believe in freedom? Can you stand in the face of oppression – and defend the defenceless? Wage war for peace. Die for democracy.",
        img: "https://game-mag.ru/wp-content/uploads/2023/12/helldivers-2-cov.jpg"
    },
    {
        id: 3,
        name: "Pulse Elite Wireless Headset",
        platform: "PS5",
        price: 149.99,
        sku: 321123,
        headline: "Pulse Elite Wireless Headset",
        description: "Enjoy lifelike gaming audio in a comfortable headset design equipped with a retractable microphone and built-in long-life battery.",
        img: "https://gmedia.playstation.com/is/image/SIEPDC/pulse-elite-wireless-headset-homepage-hero-desktop-01-en-16feb24?$2400px$"
    },
    {
        id: 4,
        name: "Playstation 5",
        platform: "PS5",
        price: 449.99,
        sku: 990392,
        headline: "Playstation 5",
        description: "PLAY LIKE NEVER BEFORE",
        img: "https://gmedia.playstation.com/is/image/SIEPDC/ps5-slim-disc-console-featured-hardware-image-block-02-en-15nov23?$1600px$"
    }
]


var myIndex = 0;
let chosenProduct = products[0];

function setChosenProduct(product) {
    chosenProduct = product;
    console.log("CHOSEN - " + chosenProduct.name);
}

document.addEventListener('DOMContentLoaded', function () {
    const heroImage = document.querySelector('.hero-image');
    const thumbnailImages = document.querySelectorAll('.thumbnail-image');
    const signInModal = document.getElementById('signInModal');
    const signInButton = document.getElementById('signInButton');
    const closeButton = document.querySelector('.close');
    const overlayTitle = document.querySelector('.overlay-title');
    let overlayDescription = document.querySelector(".overlay-description");
    const thumbnailImage = document.querySelectorAll('.thumbnail-image');
    const resetAJS = document.querySelector('.resetAJS');
    const buyButton = document.querySelector('.openBuyModalBtn');
    const checkoutModal = document.getElementById('checkoutModal');
    let modalTitle = document.getElementById('modalTitle');
    let modalQuantity = document.getElementById('modalQuantity');
    let modalPrice = document.getElementById('modalPrice');
    let modalTotal = document.getElementById('modalTotal');
    let modalPlatform = document.getElementById('modalPlatform');
    let modalSKU = document.getElementById('modalSKU');
    let modalImage = document.getElementById('modalImage');
    const payButton = document.querySelector(".payButton");
    const cname = "ajs_anonymous_id";
    const confirmSignIn = document.querySelector(".confirmSignIn");
    let newCookie = getCookie(cname);
    const span = document.getElementsByClassName("closeCheckout")[0];
    let dropdowns = document.querySelectorAll('.w3-dropdown-hover');
    const buyFeaturedButton = document.querySelector('.buyFeatured')


    let mainPageChosenProduct = products[0];


    function getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    dropdowns.forEach(function (dropdown) {
        // Add click event listener to the dropdown menu item
        dropdown.addEventListener('click', function (event) {
            // Check if the clicked element is a dropdown menu item
            if (event.target.closest('.w3-dropdown-content')) {
                // Get the text content of the clicked dropdown menu item
                var clickedItemText = event.target.textContent;
                // Perform actions based on the clicked item
                console.log('Clicked item:', clickedItemText);
                analytics.track('Menu Item Clicked', {
                    name: clickedItemText
                });
            }
        });
    });

    /***** CAROUSEL ITEM BUY FUNCTIONS *****/

    buyFeaturedButton.addEventListener('click', function () {
        mainPageChosenProduct = chosenProduct;
        chosenProduct = products[3];
        modalTitle.textContent = chosenProduct.name;
        const formattedCost = '$' + chosenProduct.price.toFixed(2);
        modalPrice.textContent = formattedCost;
        modalTotal.textContent = formattedCost;
        modalImage.src = chosenProduct.img;
        modalQuantity.textContent = "Quantity: 1";
        modalPlatform.value = chosenProduct.platform;
        modalSKU.value = chosenProduct.sku;
        checkoutModal.style.display = 'block';
    })

    //***** OPEN CHECKOUT MODAL PAGE *****//
    if (buyButton) {
        buyButton.addEventListener('click', function () {
            checkoutModal.style.display = 'block';
            mainPageChosenProduct = chosenProduct;
            const formattedCost = '$' + chosenProduct.price.toFixed(2);
            modalTitle.textContent = chosenProduct.name;
            modalPrice.textContent = formattedCost;
            modalTotal.textContent = formattedCost;
            modalImage.src = chosenProduct.img;
            modalQuantity.textContent = "Quantity: 1";
            modalPlatform.value = chosenProduct.platform;
            modalSKU.value = chosenProduct.sku;
        });
    }

    //***** CLOSE CHECKOUT MODAL PAGE WHEN CLICKING X *****//
    if (span) {
        span.onclick = function () {
            checkoutModal.style.display = "none";
            chosenProduct = mainPageChosenProduct;
        }
    }

    //***** CLOSE CHECKOUT MODAL PAGE WHEN CLICKING OUTSIDE OF MODAL *****//
    window.onclick = function (event) {
        if (event.target == checkoutModal) {
            checkoutModal.style.display = "none";
            chosenProduct = mainPageChosenProduct;
            console.log("CHOSEN CLOSE - " + chosenProduct.name);
        }
    }

    //***** OPEN SIGN IN MODAL WHEN SIGN IN BUTTON IS CLICKED *****//
    if (signInButton) {
        signInButton.addEventListener('click', function () {
            signInModal.style.display = 'block';
        });
    }

    //***** CLOSE SIGN IN MODAL WHEN CLOSE BUTTON IS CLICKED *****//
    if (closeButton) {
        closeButton.addEventListener('click', function () {
            signInModal.style.display = 'none';
        });
    }

    //***** CLOSE SIGN IN MODAL WHEN CLICKING OUTSIDE OF MODAL *****//
    window.addEventListener('click', function (event) {
        if (event.target === signInModal) {
            signInModal.style.display = 'none';
        }
    });

    //***** RESET AJS *****//
    if (resetAJS) {
        resetAJS.addEventListener('click', function () {
            analytics.reset();
        });
    }


    //***** TRACK THUMBNAIL CLICKS, SET CHOSEN PRODUCT, SEND PRODUCT VIEWED EVENT TO SEGMENT *****//
    if (thumbnailImage) {
        thumbnailImage.forEach((thumbnail, index) => {
            // Attach a click event listener to each thumbnail image
            thumbnail.addEventListener('click', () => {
                // Track the click
                let chosenProduct = products[index];
                setChosenProduct(chosenProduct);
                mainPageChosenProduct = chosenProduct;
                overlayTitle.textContent = chosenProduct.headline;
                overlayDescription.textContent = chosenProduct.description;
                modalTitle.textContent = chosenProduct.name;
                const formattedCost = '$' + chosenProduct.price.toFixed(2);
                modalPrice.textContent = formattedCost;
                modalTotal.textContent = formattedCost;
                modalQuantity.textContent = "x1";
                modalPlatform.value = chosenProduct.platform;
                modalSKU.value = chosenProduct.sku;

                thumbnailImages.forEach(function (thumb) {
                    thumb.classList.remove('selected');
                    thumb.style.opacity = '0.5';
                });

                // Add selected class to the clicked thumbnail
                thumbnail.classList.add('selected');
                thumbnail.style.opacity = '1';
                heroImage.src = thumbnail.src;
                setTimeout(function () {
                    heroImage.style.opacity = '1'; // Fade in after changing source
                }, 500);

                analytics.track('Product Viewed', {
                    name: chosenProduct.name,
                    platform: chosenProduct.platform,
                    price: chosenProduct.price,
                    sku: chosenProduct.sku
                });
            });
        });
    }

    //***** HANDLE COMPLETE ORDER, SEND IDENTIFY CALL AND ORDER COMPLETED CALL TO SEGMENT *****//
    if (payButton) {
        const checkoutForm = document.getElementById('checkoutForm');
        payButton.addEventListener("click", (event) => {
            let payEmail = document.getElementById("email").value;
            let payFullName = document.getElementById("fullName").value;

            analytics.identify(`${newCookie}`, {
                name: payFullName,
                email: payEmail
            });
            analytics.track('Order Completed', {
                name: modalTitle.textContent,
                platform: modalPlatform.textContent,
                price: modalPrice.textContent,
                sku: modalSKU.textContent
            });
            event.preventDefault();
            checkoutForm.reset();
            checkoutModal.style.display = "none";
        });
    }

    //***** HANDLE SIGN IN, SEND IDENTIFY CALL TO SEGMENT *****//
    if (confirmSignIn) {
        confirmSignIn.addEventListener('click', function (event) {
            event.preventDefault();
            let signInEmail = document.getElementById("signInEmail").value;

            analytics.identify(`${newCookie}`, {
                email: signInEmail
            });
            signInModal.style.display = "none";
        });
    }



});
// When the user clicks anywhere outside of the modal, close it
var modal = document.getElementById('ticketModal');
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Get the modal element
//var checkoutModal = document.getElementById("checkoutModal");

// Get the button that opens the modal
//var btn = document.getElementById("openModalBtn");



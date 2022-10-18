// Title format on Articles
if (document.querySelector('.taxonomy-articles-without-date')) {
    var titles = document.querySelector('.taxonomy-articles-without-date').querySelectorAll('.ph-ui-subtitle');
    for (let i = 0; i < titles.length; i++) {
        const title = titles[i];
        if (title.innerHTML.length > 50) {
            title.innerHTML = jQuery.trim(title.innerHTML).substring(0, 50).split(" ").slice(0, -1).join(" ") + "...";
        }
    }
}
var title = jQuery.trim(title).substring(0, 10);

// Goto path of selected city
if (document.querySelector('.news-views')) {
    const news_cities_filter = document.querySelector('.news-views').querySelector('#edit-field-ph-taxo-cities-target-id');
    news_cities_filter.addEventListener('change', function(e) {
        // console.log(this.selectedIndex);
        if (this.selectedIndex == 0) {
            window.location = 'news.html';
        } else {
            window.location = '/news/' + this.options[this.selectedIndex].text.toLowerCase();
        }
    })

// Set selected city on Filter
var pathname = window.location.pathname;
pathname = pathname.split('index.html');
if (pathname[2] !== undefined) {
    var option = decodeURIComponent(pathname[2]);
    for (let i = 0; i < news_cities_filter.options.length; i++) {
        var element = news_cities_filter.options[i];
        element = element.innerHTML.toLowerCase();
        if (element === option) {
            news_cities_filter.selectedIndex = i;
            break;
        }
    }
}
}

// Filter letter active class toggle
const letter_list = document.querySelectorAll(".letter-list li a");
for (letter of letter_list) {
    letter.addEventListener("click", (event) => {
        for (eachLetter of letter_list) {
            eachLetter.classList.remove("active");
        }
        event.target.classList.add("active");
    });
}

//show hide search
function searchToggle () {
    const openSearch = document.querySelector("#menu-open");
    const closeSearch = document.querySelector("#menu-close");
    openSearch.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector("header").classList.add("open");
        document.querySelector("body").classList.add("overflow-hidden");
    });

    closeSearch.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector("body").classList.remove("overflow-hidden");
        document.querySelector("header").classList.remove("open");
    });
}
searchToggle();

const dropDownList = document.querySelectorAll('.list-as-dropdown, .mobile-dropdown');
dropDownList.forEach(function(e) {
    e.addEventListener('click', function(e) {
        e.classList.toggle('open');
    });
});

const headSearch = document.querySelectorAll('.btn-search');
const breadcrumb = document.querySelector('.breadcrumb');
const headBloc = document.querySelector('header');
const announcement_block = document.querySelector('#block-relatedannouncements');
headSearch.forEach(function(a) {
    a.addEventListener('click', function(e) {
        e.preventDefault();
        const mobile_pane = document.querySelector('header.open');
        headBloc.classList.toggle('show-search');
        if (breadcrumb) {
            breadcrumb.classList.toggle('adjust-margin-top');
        } else {
            if (announcement_block) {
                announcement_block.classList.toggle('adjust-margin-top');
            } else {
                document.querySelector('#content').classList.toggle('adjust-margin-top');
            }
        }
        if (mobile_pane && mobile_pane.querySelector('.mobile-flip')) {
            mobile_pane.querySelector('#menu-close').click();
        }
    });
});

// Handle margin-spacing based on breadcrumb/page-title presence
if (document.querySelector('.breadcrumb') == null) {
    document.querySelector('#content').classList.add('margin-top')
}
if (document.querySelector('.breadcrumb') == null && document.querySelector('h1.page-title') == null) {
    document.querySelector('#content').classList.remove('margin-top')
    if (window.location.pathname === '/' && !announcement_block) {
        //console.log(document.querySelector('#content').classList)
        document.querySelector('#content').classList.add('md-margin-top-60')
    }
}

const imagesOnBackground = function (hide) {
    if (document.getElementById('city-term-id')) {
        var images = document.querySelectorAll('.ph-util-imgContainer');
        for (let index = 0; index < images.length; index++) {
            var img_container = images[index];
            const img_src = img_container.querySelector('img').getAttribute('src');
            img_container.style.background = 'url('+img_src+')';
            img_container.querySelector('img').style.display = 'none';
        }
    }
}

const hideBlockItems = function () {
    jQuery('.taxonomy-city-single-result').hide();
}

const placeSleeveControlAttributes = function() {
    const pull_handles = document.querySelectorAll('.paragraph--type--ph-para-accordion-item .pull');
    pull_handles.forEach(element => {
        if (element) {
            element.querySelector('.ph-util-button-plain').setAttribute('aria-controls', 'accordion-panel-'+element.getAttribute('data-id'))
        }
    });
}

const $ = jQuery;

const setCardImageTooltip = function() {
    $('.ph-findadoc-ct-care-provider .ph-ct-care-unit-evm-card').each(function() {
        var cardImage = $(this).find('img');
        const cardLabel = $(this).find('a.label');
        cardImage.prop('title', cardLabel.text());
    });
}

const addUiActionsClassToSleeves = function() {
    jQuery('.paragraph--type--ph-para-accordion .drawer').each(function(){
        if (jQuery(this).find('p a.btn').length) {
            jQuery(this).find('p').addClass('ph-ui-actions');
        }
    });
}

const sizeHealthwiseVideos = function () {
    let jqVideos = jQuery('iframe[data-ph-hw-video-id]');
    jqVideos.each(function (i, el) {
        var jqEl = $(el);
        var width = jqEl.parent().width();
        var height = null;
        if (width) {
            height = width / 16 * 10.5;
            jqEl.attr("width", width);
            jqEl.attr("height", height);
        }
    });
}

jQuery(document).ready(function(){
    imagesOnBackground(false);
    placeSleeveControlAttributes();
    setCardImageTooltip();
    addUiActionsClassToSleeves();
    sizeHealthwiseVideos();
});

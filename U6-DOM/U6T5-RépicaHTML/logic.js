window.onload = generateContent();

function generateContent() {
    let body = document.getElementsByTagName("body")[0];
    // <div class="grid__column_space1of4-3Auw grid__column-2zuc">
    let div_root = document.createElement("div");
    div_root.setAttribute("class", "grid__column_space1of4-3Auw grid__column-2zuc");
    body.appendChild(div_root);
    // <div class="grid__card-1AMl grid__is_not_ad-3CXE">
    let div_card = document.createElement("div");
    div_card.setAttribute("class", "grid__card-1AMl grid__is_not_ad-3CXE");
    div_root.appendChild(div_card);
    // article
    let article = document.createElement("article");
    article.setAttribute("class", "cards__postcard-37d3 cards__postcardLandscape-3RIF cards__font_landscape_single_text_below_4_col-7iX7 cards__columns-4-YOiO background_color_zeta cards__no_has_section-3wNM");
    div_card.appendChild(article);
    // div vacío
    let div_vacio1 = document.createElement("div");
    article.appendChild(div_vacio1);
    // img
    let img1 = document.createElement("img");
    img1.setAttribute("title", " ");
    img1.setAttribute("class", "cards__snap_image-aOud");
    img1.setAttribute("loading", "lazy");
    img1.setAttribute("src", "https://baul.mediaset.es/dist/assets/guides/img_guide.png?w=1024");
    img1.setAttribute("srcset", "https://baul.mediaset.es/dist/assets/guides/img_guide.png?w=1024 1024w,https://baul.mediaset.es/dist/assets/guides/img_guide.png?w=800   800w,https://baul.mediaset.es/dist/assets/guides/img_guide.png?w=768   768w,https://baul.mediaset.es/dist/assets/guides/img_guide.png?w=640   640w,https://baul.mediaset.es/dist/assets/guides/img_guide.png?w=600   600w,https://baul.mediaset.es/dist/assets/guides/img_guide.png?w=480   480w,https://baul.mediaset.es/dist/assets/guides/img_guide.png?w=360   360w,https://baul.mediaset.es/dist/assets/guides/img_guide.png?w=320   320w");
    img1.setAttribute("sizes", "(min-width: 960px) 502px, (min-width: 768px) 50vw, 100vw");
    img1.setAttribute("alt", " ");
    img1.setAttribute("pinger-seen", "true");
    div_vacio1.appendChild(img1);
    // <div class="cards__postcard__content-1w21">
    let div_postcard = document.createElement("div");
    div_postcard.setAttribute("class", "cards__postcard__content-1w21");
    article.appendChild(div_postcard);
    // figure
    let figure_postcard = document.createElement("figure");
    figure_postcard.setAttribute("class", "cards__postcard__cnt_media-1R9F");
    div_postcard.appendChild(figure_postcard);
    // <div class="cards__cnt_coin-2H_i">
    let div_cnt = document.createElement("div");
    div_cnt.setAttribute("class", "cards__cnt_coin-2H_i");
    figure_postcard.appendChild(div_cnt);
    // <div><span class="cards__postcard__channel-1-fM coin_undefined"></span></div>
    let div_span = document.createElement("div");
    div_cnt.appendChild(div_span);
    let span_postcard = document.createElement("span");
    span_postcard.setAttribute("class", "cards__postcard__channel-1-fM coin_undefined");
    div_span.appendChild(span_postcard);
    // div vacío
    let div_vacio2 = document.createElement("div");
    div_cnt.appendChild(div_vacio2);
    // a figure
    let a_figure = document.createElement("a");
    a_figure.setAttribute("href", "https://www.telecinco.es/la-isla-de-las-tentaciones/galla-desvela-punto-relacion-miguel-hoyos_18_3268924939.html");
    a_figure.setAttribute("class", "cards__link-1oHn");
    a_figure.setAttribute("target", "_self");
    div_cnt.appendChild(a_figure);
    // img_a
    let img_a = document.createElement("img");
    img_a.setAttribute("title", " ");
    img_a.setAttribute("class", "cards__image-24d0");
    img_a.setAttribute("loading", "lazy");
    img_a.setAttribute("src", "https://album.mediaset.es/eimg/10000/2022/01/18/clipping_a8lSPY_2e98.jpg?w=1024");
    img_a.setAttribute("srcset", "https://album.mediaset.es/eimg/10000/2022/01/18/clipping_a8lSPY_2e98.jpg?w=1024 1024w,https://album.mediaset.es/eimg/10000/2022/01/18/clipping_a8lSPY_2e98.jpg?w=800   800w,https://album.mediaset.es/eimg/10000/2022/01/18/clipping_a8lSPY_2e98.jpg?w=768   768w,https://album.mediaset.es/eimg/10000/2022/01/18/clipping_a8lSPY_2e98.jpg?w=640   640w,https://album.mediaset.es/eimg/10000/2022/01/18/clipping_a8lSPY_2e98.jpg?w=600   600w,https://album.mediaset.es/eimg/10000/2022/01/18/clipping_a8lSPY_2e98.jpg?w=480   480w,https://album.mediaset.es/eimg/10000/2022/01/18/clipping_a8lSPY_2e98.jpg?w=360   360w,https://album.mediaset.es/eimg/10000/2022/01/18/clipping_a8lSPY_2e98.jpg?w=320   320w");
    img_a.setAttribute("sizes", "(min-width: 960px) 245px, (min-width: 768px) 50vw, 100vw");
    img_a.setAttribute("alt", "Gal·la desvela en qué punto se encuentra con Miguel de Hoyos");
    img_a.setAttribute("pinger-seen", "true");
    a_figure.appendChild(img_a);
    // div_postcard_cnt
    let div_postcard_cnt = document.createElement("div");
    div_postcard_cnt.setAttribute("class", "cards__postcard__cnt_info-21bV");
    div_postcard.appendChild(div_postcard_cnt);
    // div_sponsor
    let div_sponsor = document.createElement("div");
    div_sponsor.setAttribute("class", "sponsor__content-3-Ul sponsor__typeH-3Hjq sponsor__imgBand-2XTv");
    div_postcard_cnt.appendChild(div_sponsor);
    // div data
    let div_data = document.createElement("div");
    div_data.setAttribute("data-agth", "cardTitle");
    div_postcard_cnt.appendChild(div_data);
    // a_data
    let a_data = document.createElement("a");
    a_data.setAttribute("class", "color_eta");
    a_data.setAttribute("href", "https://www.telecinco.es/la-isla-de-las-tentaciones/galla-desvela-punto-relacion-miguel-hoyos_18_3268924939.html");
    a_data.setAttribute("target", "_self");
    div_data.appendChild(a_data);
    // h3
    let h3_a = document.createElement("h3");
    h3_a.setAttribute("class", "site_font cards__postcard__paragraph-2EVg color_eta color_eta");
    a_data.appendChild(h3_a);
    // comentario vacío
    let comentario_vacio1 = document.createComment(" ");
    let comentario_vacio2 = document.createComment(" ");
    let texto = document.createTextNode("Gal·la desvela en qué punto se encuentra su relación con Miguel tras su rechazo en 'La isla de las tentaciones\'");
    h3_a.appendChild(comentario_vacio1);
    h3_a.appendChild(texto);
    h3_a.appendChild(comentario_vacio2);
}
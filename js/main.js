function AlbumReviews(json)
{
    let slideshow = document.querySelector('.carousel-slides') [1];
    let slide = '';
    let leftarrow = document.querySelectorAll('a') [0];
    let rightarrow = document.querySelectorAll('a') [1];
    let album = document.getElementsByClassName('.carousel-slides') [0];
    let width = 0;

    for (let i=0; i< json.length; i++) {
        slide += '<div class="every-carousel-slide">';
        slide += '<p><a></a></p>';
        slide += '<p><a></a></p>';
        slide += '<a href="`+(json[i].url)+`">`+(json[slide].artist)`</a>';
        slide += '<p>$(json[i].album)</p>';
        slide += <img src= "$json[i].cover_image.path}" alt = "${json[i].cover_image.alt_content}" width = "${json[i].cover_image.width}" height = "${json[i].cover_image.height}">`;
        slide += '<p>${json[i].review.content}</p>';
        slide += '<a href="${json[i].review.url}">`-${json[i].review.source}</a>'
        slide += '</div>';
     }   
    slideslow.innerHTML = slide;

window.onload = () => {
    let body = document.querySelector(`body`);
    let script = document.createElement(`script`);
    let right = document.createElement(`div`);
    right.classList.add(`right`);
    let left = document.createElement(`div`);
    left.classList.add(`left`);
    let cover = document.getElementsByClassNumber(`carousel`);
    
    script.setAttribute(`src`,`json/data.json`);
    body.append(script);
    cover.appendChild(right);
    cover.appendChild(left);
};

    rightarrow.addEventListener(`click`, () => {
        width -= 680;
        parent.style.transform = `translate(`+width+`px)`;
        index += 1;
        checkSlide();
    };

    leftarrow.addEventListener(`click`, () => {
        width += 680;
        parent.style.transform = `translate(`+width+`px)`;
        index -= 1;
        checkSlide();
    });

    document.addEventListener(`keydown`, (e) => {
    {
        if (e.key === `ArrowRight`) 
        {
            rightButton.click();
        } 
        if (e.key === `ArrowLeft`) 
        {
            leftButton.click();
        }
     }});
};


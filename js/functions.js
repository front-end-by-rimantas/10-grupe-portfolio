function renderBlocks( target, data ) {
    let HTML = '';
    let quality = 0;

    for ( let i=0; i<data.length; i++ ) {
        const obj = data[i];

        if ( !obj.icon ||
             !obj.title ) {
            continue;
        }

        if ( quality === 4 ) {
            break;
        }

        if ( obj.number ) {
            HTML += `<div class="block">
                        <i class="fa fa-${obj.icon}"></i>
                        <p>${obj.number}</p>
                        <h4>${obj.title}</h4>
                    </div>`;
            quality++;
        }

        if ( obj.p ) {
            HTML += `<div class="block">
                        <i class="fa fa-${obj.icon}"></i>
                        <h4>${obj.title}</h4>
                        <p class="small-text">${obj.p}</p>
                    </div>`;
            quality++;
        }
    }
    

    return document.getElementById(target).innerHTML = HTML;
}

function renderSkills( data ) {
    let HTML = '';

    data.forEach( skill => {
        if ( !skill.title ||
             typeof(skill.title) !== 'string' ||
             skill.title === 0 ||
             skill.title > 50 ||
             !skill.value ||
             typeof(skill.value) !== 'number' ||
             skill.value > 100 ||
             skill.value < 0 ) {
            return;
        }
        let value = skill.value;
        if ( value % 1 !== 0 ) {
            value = Math.round(value * 100) / 100;
        }
        HTML += `<div class="progress-bar">
                    <div class="texts">
                        <div class="title">${skill.title}</div>
                        <div class="value">${value}%</div>
                    </div>
                    <div class="bar">
                        <div class="value" style="width: ${value}%;">
                            <div class="loading"></div>
                        </div>
                    </div>
                </div>`;
    });
    
    return HTML;
}

function renderGallery( target, data ) {
    let filter_HTML = '';
    let unique_tags = [];       // ['a', 'b', 'c']

    // filter out only unique categories
    for ( let i=0; i<data.length; i++ ) {
        let category = data[i].cat.toLowerCase();
        if ( unique_tags.indexOf(category) === -1 ) {
            unique_tags.push(category);
        }
    }

    // render filter HTML
    for ( let i=0; i<unique_tags.length; i++ ) {
        filter_HTML += `<div class="filter-item">${unique_tags[i]}</div>`;
    }

    // render gallery HTML
    let gallery_HTML =  '';
    for ( let i=0; i<data.length; i++ ) {
        gallery_HTML += `<div class="item" data-category="${data[i].cat.toLowerCase()}">
                            <div>IMAGE: ${data[i].pic}</div>
                            <div>TITLE: ${data[i].title}</div>
                        </div>`;
    }

    // <div>CATEGORY: <span class="cat">${data[i].cat.toLowerCase()}</span></div>

    // render complete HTML
    let HTML = `<div class="gallery">
                    <div class="filter">
                        <div class="filter-item active">All works</div>
                        ${filter_HTML}
                    </div>
                    <div class="item-list">
                        ${gallery_HTML}
                    </div>
                </div>`;
    
    // include complete HTML into targeted element
    return document.querySelector(target).innerHTML = HTML;
}

function filterGallery( event ) {
    const category = event.target.textContent.toLowerCase();

    // perkeliame "active" klase
        // pasaliname nuo visu filtravimo elementu
        // document.querySelectorAll('.gallery > .filter > .filter-item').forEach( item => {
        //     item.classList.remove('active');
        // });
        document.querySelector('.gallery > .filter > .filter-item.active').classList.remove('active');
        // uzdedame atgal tik ant to, kurio paspaudziau
        event.target.classList.add('active');

    // pereiti per galerijos blokus ir norimus paslepti/parodyti pagal paspausta filtra
    const allBlocks = document.querySelectorAll('.gallery > .item-list > .item');

    if ( category === 'all works' ) {
        allBlocks.forEach( block => {
            block.classList.remove('hidden');
        })
    } else {
        allBlocks.forEach( block => {
            if ( block.dataset.category.toLowerCase() === category ) {
                block.classList.remove('hidden');
            } else {
                block.classList.add('hidden');
            }
        })
    }

    return;
}

function renderTestimonials( target, data ) {
    let items_HTML = '';

    data.forEach( (t, index) => {
        let stars_HTML = '';

        for ( let i=0; i<Math.round(t.stars); i++ ) {
            stars_HTML += '<i class="fa fa-star"></i>';
        }
        for ( let i=Math.round(t.stars); i<5; i++ ) {
            stars_HTML += '<i class="fa fa-star-o"></i>';
        }

        items_HTML += `<div class="item ${index === 0 ? 'active' : ''}" data-index="${index}">
                            <div class="qoutes">99</div>
                            <div class="author">${t.author}</div>
                            <div class="stars">
                                ${stars_HTML}
                            </div>
                            <div class="text">${t.text}</div>
                        </div>`;
    });

    let HTML = `<div class="testimonials">
                    <div class="list">
                        ${items_HTML}
                    </div>
                    <div class="controls">
                        <i class="fa fa-long-arrow-left" data-direction="left"></i>
                        <div class="long">
                            <div class="short" style="width: ${100 / data.length}%;"></div>
                        </div>
                        <i class="fa fa-long-arrow-right" data-direction="right"></i>
                    </div>
                </div>`;

    return document.querySelector(target).innerHTML = HTML;
}

function updateVisibleTestimonial( event ) {
    const direction = event.target.dataset.direction;
    let index = parseInt(document.querySelector('.testimonials > .list > .item.active').dataset.index);
    const length = testimonials.length - 1;

    if ( direction === 'left') {
        // previous
        if ( index === 0 ) {
            index = length;
        } else {
            index--;
        }
    }

    if ( direction === 'right') {
        // next
        if ( index < length ) {
            index++
        } else {
            index = 0;
        }
    }

    document.querySelector('.testimonials > .list > .item.active')
            .classList.remove('active');
    
    document.querySelectorAll('.testimonials > .list > .item')[index]
            .classList.add('active');

    return console.log('Paspausta kryptis: '+direction);
}



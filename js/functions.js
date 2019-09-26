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
        let category = data[i].cat;
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
        gallery_HTML += `<div class="item">
                            <div>IMAGE: ${data[i].pic}</div>
                            <div>TITLE: ${data[i].title}</div>
                            <div>CATEGORY: <span class="cat">${data[i].cat}</span></div>
                        </div>`;
    }

    // render complete HTML
    let HTML = `<div class="gallery">
                    <div class="filter">
                        <div class="filter-item">All works</div>
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
    const category = event.target.textContent;

    // pereiti per galerijos blokus ir norimus paslepti/parodyti pagal paspausta filtra
    const allBlocks = document.querySelectorAll('.gallery > .item-list > .item');

    if ( category === 'All works' ) {
        allBlocks.forEach( block => {
            block.classList.remove('hidden');
        })
    } else {
        allBlocks.forEach( block => {
            if ( block.querySelector('span.cat').textContent === category ) {
                block.classList.remove('hidden');
            } else {
                block.classList.add('hidden');
            }
        })
    }

    return;
}
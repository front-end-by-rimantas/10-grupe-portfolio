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
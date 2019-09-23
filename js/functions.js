function renderAchievements( data ) {
    let HTML = '';
    let quality = 0;

    for ( let i=0; i<data.length; i++ ) {
        // HTML = HTML + template;
        // HTML += '<div class="block">\
        //             <i class="fa fa-'+ data[i][0] +'"></i>\
        //             <p>'+ data[i][1] +'</p>\
        //             <h4>'+ data[i][2] +'</h4>\
        //         </div>';

        // rejecting bad quality objects
        if ( !data[i].icon ||
             !data[i].number ||
             !data[i].title ) {
            continue;
        }

        // do not render more than 4 elements
        if ( quality === 4 ) {
            break;
        }
        
        HTML += '<div class="block">\
                    <i class="fa fa-'+ data[i].icon +'"></i>\
                    <p>'+ data[i].number +'</p>\
                    <h4>'+ data[i].title +'</h4>\
                </div>';
        quality++;
    }
    
    return document.getElementById('achievements').innerHTML = HTML;
}
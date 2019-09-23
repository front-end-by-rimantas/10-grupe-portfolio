function renderAchievements( data ) {
    console.log(data);
    let HTML = '';

    for ( let i=0; i<data.length; i++ ) {
        console.log(data[i]);
        
        // HTML = HTML + template;
        HTML += '<div class="block">\
                    <i class="fa fa-'+ data[i][0] +'"></i>\
                    <p>'+ data[i][1] +'</p>\
                    <h4>'+ data[i][2] +'</h4>\
                </div>';
    }
    
    console.log(HTML);
    
    return document.getElementById('achievements').innerHTML = HTML;
}
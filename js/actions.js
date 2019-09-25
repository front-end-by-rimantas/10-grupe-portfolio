renderBlocks( 'achievements', achievements );
renderBlocks( 'services', services );

document.querySelector('#skills .skills-right').innerHTML = renderSkills( skills );      // return -> '<div> ... </div>'
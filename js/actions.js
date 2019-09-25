renderBlocks( 'achievements', achievements );
renderBlocks( 'services', services );

document.querySelector('#skills .skills-right').innerHTML = renderSkills( skills );

renderGallery( '#latest_works > .row:nth-child(2)', works );
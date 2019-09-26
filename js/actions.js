renderBlocks( 'achievements', achievements );
renderBlocks( 'services', services );

document.querySelector('#skills .skills-right').innerHTML = renderSkills( skills );

renderGallery( '#latest_works > .row:nth-child(2)', works );

// jei norime paimti tik pirmaji elementa kuris atitinka nurodyta selektoriu
// document.querySelector('.filter-item').addEventListener('click', filterGallery);

// jei norime paimti visus elementus atitinkancius nurodyta selektoriu
document.querySelectorAll('.filter-item').forEach( item => {
    item.addEventListener('click', filterGallery);
});
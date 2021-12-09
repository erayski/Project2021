import { getAllAlbums } from '../api/data.js';
import { html } from '../lib.js'
import { getUserData } from '../util.js';

const catalogTemplate = (albums, showDetails) => html`
<section id="catalogPage">
    <h1>All Albums</h1>
    ${albums.length>0 ? html`${albums.map(a=>albumCard(a, showDetails))}` : html`<p>No Albums in Catalog!</p>`}
</section>`
const albumCard = (album, showDetails) => html`
<div class="card-box">
    <img src=${album.imgUrl}>
    <div>
        <div class="text-center">
            <p class="name">Name: ${album.name}</p>
            <p class="artist">Artist: ${album.artist}</p>
            <p class="genre">Genre: ${album.genre}</p>
            <p class="price">Price: $${album.price}</p>
            <p class="date">Release Date: ${album.releaseDate}</p>
        </div>
        ${showDetails ? html`<div class="btn-group">
            <a href="/details/${album._id}" id="details">Details</a>
        </div>` : null}        
    </div>
</div>`
export async function catalogPage(ctx){
    const albums = await getAllAlbums();
    const userData=getUserData();
    let showDetails = false;
		if(userData){
        showDetails=true;
    }
    ctx.render(catalogTemplate(albums, showDetails));
}

//<--@EraySeyhan-->
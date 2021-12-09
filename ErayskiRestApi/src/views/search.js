import { html } from '../lib.js';
import { getFilteredAlbums } from '../api/data.js';
import { getUserData } from '../util.js';

const searchTemplate = (onClick, hasClicked, result, showDetails) => html`
<section id="searchPage">
    <h1>Search by Name</h1>
    <div class="search">
    <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
    <button @click=${onClick} class="button-list">Search</button>
    </div>
    <h2>Results:</h2>
    ${hasClicked ? html`
    <!--Show after click Search button-->
    <div class="search-result">
    ${result.length > 0 ? html`${result.map(r => card(r, showDetails))}` : html`<p class="no-result">No result.</p>`}
    </div>` : null}
</section>`
const card = (album, showDetails) => html`
<div class="card-box">
    <img src=${album.imgUrl}>
    <div>
    <div class="text-center">
    <p class="name">Name: ${album.name}</p>
    <p class="artist">Artist: ${album.artist}</p>
    <p class="genre">Genre: ${album.genre}</p>
    <p class="price">Price: $${album.price}</p>
    <p class="date">Release Date: ${album.date}</p>
   </div>
   ${showDetails ? html`<div class="btn-group">
    <a href="/details/${album._id}" id="details">Details</a>
    </div>`: null}
    </div>
</div>`
export async function searchPage(ctx) {
    let hasClicked = false;
    ctx.render(searchTemplate(onClick, hasClicked));
    const inputField = document.querySelector('#search-input');
    const userData = getUserData();
    let showDetails = false;
    if (userData) {
        showDetails = true;
    }
    async function onClick(event) {
        event.preventDefault();
        hasClicked = true;
        const result = await getFilteredAlbums(inputField.value);
        ctx.render(searchTemplate(onClick, hasClicked, result, showDetails));
        inputField.value = '';
    }
}
//<--@EraySeyhan-->
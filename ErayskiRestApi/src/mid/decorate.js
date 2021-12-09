import { render } from '../lib.js';
import { getUserData } from '../util.js';
const root = document.querySelector('#main-content');
export default function decorateCtx(ctx, next){
    ctx.render = (content) => render(content, root);
    ctx.updateUserNav = updateUserNav;
    next();
}
export function updateUserNav(){
    if(getUserData()){
        [...document.querySelectorAll('.user')].forEach(e=>e.style.display='inline');
        [...document.querySelectorAll('.guest')].forEach(e=>e.style.display='none');
    } else {
        [...document.querySelectorAll('.user')].forEach(e=>e.style.display='none');
        [...document.querySelectorAll('.guest')].forEach(e=>e.style.display='inline');
    }
}

//<--@EraySeyhan-->
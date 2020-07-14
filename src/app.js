/* Handle Async/Await */
import 'regenerator-runtime';

import './styles/style.css';

/* Font Awesome  */
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
// import '@fortawesome/fontawesome-free/js/regular';
// import '@fortawesome/fontawesome-free/js/brands';

// Fisher Movies
import './script/components/search-nav.js';
import './script/components/search-main.js';
import './script/components/card-section.js';
import './script/components/card-item.js';
import main from './script/view/main.js';
document.addEventListener('DOMContentLoaded', main);

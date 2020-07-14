// Nav
const searchNav = document.querySelector('search-nav');
const inputNav = document.querySelector('search-nav input');
const buttonNav = document.querySelector('#button-nav');

// Main
const searchMain = document.querySelector('search-main');
const inputMain = document.querySelector('search-main input');
const buttonMain = document.querySelector('#button-main');

// Card
const cardSection = document.querySelector('card-section');

// Card Detail (Modal)
const cardDetail = document.querySelector('card-detail');

const endpoint = (keyword, key) =>
  `https://www.omdbapi.com/?apikey=c8832f63&${key}=${keyword}`;

const main = () => {
  buttonNav.addEventListener('click', async () => {
    try {
      // Descision Screen
      await visibleSearchMain();
    } catch (rejectReason) {
      // errorUI(rejectReason);
      console.log(rejectReason);
    }
  });

  searchNav.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
      buttonNav.click();
    }
  });
};

const visibleSearchMain = async () => {
  const mq = window.matchMedia('(max-width: 640px)');
  if (mq.matches) {
    searchMain.classList.toggle('hidden');

    buttonMain.addEventListener('click', async () => {
      const result = await getMovies(inputMain.value, 's');
      showMovies(result.Search);
    });

    searchMain.addEventListener('keyup', (e) => {
      if (e.keyCode === 13) {
        buttonMain.click();
      }
    });
  } else {
    const result = await getMovies(inputNav.value, 's');
    showMovies(result.Search);
  }
};

const getMovies = (keyword, key) => {
  return fetch(endpoint(keyword, key))
    .then((resp) => resp.json())
    .then((resp) => resp)
    .catch((rejectReason) => rejectReason);
};

const showMovies = (Search) => {
  try {
    cardSection.innerHTML = '';
    cardSection.section = Search;
  } catch (reason) {
    cardSection.innerHTML = /*html*/ `<h2 class="col-span-4 text-center text-2xl text-red-500">You're keyword ${
      inputNav.value || inputMain.value
    } not found</h2>`;
  }
};

// Movie Detail
// Event Loop
document.addEventListener('click', async (e) => {
  if (e.target.classList.contains('buttonCard')) {
    const result = await getMoviesDetail(e.target.dataset.imdbid);
    showMoviesDetail(result);
  }
});

const getMoviesDetail = (imdbid) => {
  return fetch(endpoint(imdbid, 'i'))
    .then((resp) => resp.json())
    .then((resp) => resp);
};

// Modals
const showMoviesDetail = (movies) => {
  cardDetail.innerHTML = moviesDetailElement(movies);
  toggleModal();

  const closeModal = document.querySelectorAll('.modal-close');
  closeModal.forEach((el) => {
    el.addEventListener('click', toggleModal);
  });

  // Escape event note: i dunno how it's work :'v
  document.onkeydown = function (evt) {
    evt = evt || window.event;
    var isEscape = false;
    if ('key' in evt) {
      isEscape = evt.key === 'Escape' || evt.key === 'Esc';
    } else {
      isEscape = evt.keyCode === 27;
    }
    if (isEscape && cardDetail.classList.contains('modal-active')) {
      toggleModal();
    }
  };
};

const moviesDetailElement = (movies) => {
  const { Title, Year, Genre, Plot, Poster, Writer, Actors, Ratings } = movies;

  // Handle Ratings if not have Object
  // for example if to want search keyword = "Bucin" and click Read More :)
  const rate = () => {
    for (const key of Ratings) {
      if (key.hasOwnProperty('Value')) {
        return /*html*/ `<i class="fa fa-star text-yellow-500"></i> ${key.Value}`;
      }
    }
  };

  return /*html*/ `<div
    class="modal opacity-0 pointer-events-none fixed w-full h-full inset-0 flex items-center justify-center"
  >
    <div
      class="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"
    ></div>

    <div
      class="modal-container border-2 border-blue-200 w-full h-screen sm:h-auto bg-white sm:w-3/4 lg:w-8/12 mx-auto rounded shadow-lg z-50 overflow-y-auto"
    >
      <!-- Add margin if you want to see some of the overlay behind the modal-->
      <div class="modal-content py-4 text-left px-6">
        <!--Title-->
        <div
          class="border-2 border-blue-200 items-center p-2 mb-4 rounded bg-blue-500"
        >
          <p class="text-xl font-semibold text-white">Movies Detail</p>
        </div>

        <!--Body-->
        <div class="flex flex-col sm:flex-row">
          <div class="w-full sm:w-2/3 mb-2 p-1">
            <img
              class="mx-auto"
              src="${Poster}"
              alt="${Title}"
            />
            <h5 class="text-xl text-center">${Title}</h5>
          </div>
          <ul class="w-full px-4">
            <li class="font-semibold py-1">Year: <span class="ml-2 text-gray-600">${Year}</span></li>
            <li class="font-semibold py-1">Genre: <span class="ml-2 font-normal">${Genre}</span></li>
            <li class="font-semibold py-1">Writer: <span class="ml-2 font-normal">${Writer}</span></li>
            <li class="font-semibold py-1">Actors: <span class="ml-2 font-normal">${Actors}</span></li>
            <li class="font-semibold py-1">Rating: <span class="ml-2 font-normal">${
              rate() || '-'
            }</span></li>
            <li class="font-semibold py-1">Plot: <span class="ml-2 font-normal">${Plot}</span></li>
          </ul>
        </div>

        <!--Footer-->
        <div class="flex justify-end pt-2">
          <button
            class="px-4 bg-transparent p-2 rounded-lg text-blue-500 mr-2 border border-blue-500"
          >
            Download
          </button>
          <button
            class="modal-close px-4 bg-blue-500 p-2 rounded-lg text-white hover:bg-indigo-400"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>`;
};

const toggleModal = () => {
  const modal = document.querySelector('.modal');
  modal.classList.toggle('opacity-0');
  modal.classList.toggle('pointer-events-none');
  cardDetail.classList.toggle('modal-active');
};

export default main;

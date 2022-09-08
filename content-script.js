if (document.location.search.match(/num=/)) {
  const pages = getPages();
  let currentPage = 0;

  const { imgcontainer, sitecontent, container, pageselector } = buildViewer();

  updateUi();

  function getPages() {
    return [...document.querySelectorAll('a[href*=magazines]')].map((a) => {
      const parentText = a.parentNode.firstChild.textContent.trim();
      return {
        title: parentText,
        image: a.href,
      };
    });
  }

  function updateUi() {
    const page = pages[currentPage];
    imgcontainer.innerHTML = `<img src="${page.image}" />`;

    [...pageselector.getElementsByTagName('option')].forEach((element) => {
      element.selected = '';
    });
    pageselector.getElementsByTagName('option')[currentPage].selected =
      'selected';
  }

  function closeViewer() {
    container.classList.remove('viewer--show');
    sitecontent.style = 'display: block;';
  }

  function openViewer() {
    container.classList.add('viewer--show');
    sitecontent.style = 'display: none;';
  }

  function buildViewer() {
    const viewer = `
      <div class="viewer__topbar">
          <button id="btprev" class="viewer__button" ><span class="viewer__icon">◀️</span> Précédent</button>
          <button id="btnext" class="viewer__button">Suivant <span class="viewer__icon">▶️</span></button>
          <select id="pageselector" class="viewer__page-selector">${pages.map(
            (p, n) => `<option value="${n}">${p.title}</option>`
          )}</select>
          <button id="btclose" class="viewer__button viewer__close-button"><span class="viewer__icon">❎</span> Fermer</button>
      </div>
      <div id="imgcontainer" class="viewer__imagecontainer">
      </div>
      `;

    const sitecontent = document.body.querySelector('table');
    const container = document.createElement('div');
    container.innerHTML = viewer;
    container.classList.add('viewer');
    document.body.appendChild(container);

    const btprev = document.getElementById('btprev');
    const btnext = document.getElementById('btnext');
    const btclose = document.getElementById('btclose');
    const pageselector = document.getElementById('pageselector');

    const openbuttoncontainer =
      document.querySelector('a[href*=magazines]').parentNode
        .previousElementSibling;

    const btopen = document.createElement('button');
    btopen.innerHTML = '<span class="viewer__icon">📖</span> Ouvrir la liseuse';
    btopen.classList.add('viewer__button');
    openbuttoncontainer.appendChild(btopen);

    btnext.addEventListener('click', () => {
      currentPage += 1;
      if (currentPage >= pages.length) {
        currentPage = pages.length;
      }
      updateUi();
    });

    btprev.addEventListener('click', () => {
      currentPage -= 1;
      if (currentPage < 0) {
        currentPage = 0;
      }
      updateUi();
    });

    btclose.addEventListener('click', () => {
      closeViewer();
    });

    btopen.addEventListener('click', () => {
      openViewer();
    });

    pageselector.addEventListener('change', (e) => {
      currentPage = Number(e.target.value);
      updateUi();
    });

    return {
      container,
      btprev,
      btnext,
      btclose,
      btopen,
      sitecontent,
      openbuttoncontainer,

      imgcontainer: document.getElementById('imgcontainer'),
      pageselector,
    };
  }
}

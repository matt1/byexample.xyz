window.onscroll = () => {
  const breadcrumbs = document.querySelector('.breadcrumbs-grid');
  const header = document.querySelector('.header-grid');
  if (window.pageYOffset > 0) {
    for (const elem of [breadcrumbs, header]) {
      elem.classList.add('sticky');
    }
  } else {
    for (const elem of [breadcrumbs, header]) {
      elem.classList.remove('sticky');
    }
  }
};

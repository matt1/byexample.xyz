window.onscroll = () => {
  const breadcrumbs = document.querySelector('.breadcrumbs');
  if (window.pageYOffset > 0) {
    breadcrumbs.classList.add('sticky');
  } else {
    breadcrumbs.classList.remove('sticky');
  }
};
window.onload = function(){
    console.log("working");
    window.alert("hi");
function onScroll(event) {
    var sections = document.querySelectorAll('.page-scroll');
    var scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

    for (var i = 0; i < sections.length; i++) {
        var currLink = sections[i];
        var val = currLink.getAttribute('href');
        var refElement = document.querySelector(val);
        var scrollTopMinus = scrollPos + 73;
        if (refElement.offsetTop <= scrollTopMinus && (refElement.offsetTop + refElement.offsetHeight > scrollTopMinus)) {
            document.querySelector('.page-scroll').classList.remove('active');
            currLink.classList.add('active');
        } else {
            currLink.classList.remove('active');
        }
    }
};
window.document.addEventListener('scroll', onScroll);

var pageLink = document.querySelectorAll('.page-scroll');

    pageLink.forEach(elem => {
        elem.addEventListener('click', e => {
            e.preventDefault();
            document.querySelector(elem.getAttribute('href')).scrollIntoView({
                behavior: 'smooth',
                offsetTop: 1 - 60,
            });
        });
    });
}
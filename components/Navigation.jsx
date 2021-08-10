import Link from 'next/link';
// https://material-ui.com/components/app-bar/

export default function Navigation() {
  return (
    <>
      <nav className="site-navigation">
        <div className="topnav" id="myTopnav">
          <Link href="/">
            <a className="active">
              <i className="fa fa-anchor" style={{ fontSize: 16 }}></i>
            </a>
          </Link>
          <Link href="/">
            <a>Besuchen</a>
          </Link>
          <Link href="/baeder">
            <a>Baden</a>
          </Link>
          <Link href="/plzfinder">
            <a>PLZ-Suche</a>
          </Link>
          <Link href="/funstuff">
            <a>Fun-Stuff</a>
          </Link>
          {/* <Link href="/gallery">
            <a>Galerie</a>
          </Link> */}
          {/* <Link href="/blog">
            <a>Blog</a>
          </Link> */}
          <Link href="/impressum">
            <a>Impressum</a>
          </Link>

          <Link href="/" passHref>
            <button
              className="icon"
              onClick={(e) => {
                e.preventDefault();
                let x = document.getElementById('myTopnav');
                console.log('1. x: ' + x.className);
                if (x.className === 'topnav') {
                  x.className += ' responsive';
                } else {
                  x.className = 'topnav';
                }
              }}
            >
              <i className="fa fa-bars"></i>
            </button>
          </Link>
        </div>
      </nav>
    </>
  );
}

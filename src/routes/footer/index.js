import React, { Component } from "react";
import "../../assets/footerStyle.css";

class Footers extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <footer role="contentinfo" className="footer footer-default">
        <div className="container">
          <nav className="row">
            <div className="col-xs-6 col-sm-4 col-md-2">
              <h3 className="nav-title">Company</h3>
              <ul className="nav">
                <li>
                  <a
                    href="https://www.twiggsy.com/fhgflhgildfhgiurgiuiugtrgrthtyu7467678h3"
                    id="nav-link-about"
                    data-ga-category="menu"
                    data-ga-action="about"
                  >
                    About
                  </a>
                </li>

                <li>
                  <a
                    href="https://www.twiggsy.com/hgfuyftft76rtghhchgcghdcdfjftrortgbs"
                    id="nav-link-jobs"
                    data-ga-category="menu"
                    data-ga-action="jobs"
                  >
                    Jobs
                  </a>
                </li>

                <li>
                  <a
                    href="https://www.twiggsy.com/rtjgrhgrjkgjfhgkbjhgfkb"
                    id="nav-link-press"
                    data-ga-category="menu"
                    data-ga-action="press"
                  >
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-xs-6 col-sm-4 col-md-2">
              <h3 className="nav-title">Community</h3>
              <ul className="nav">
                <li>
                  <a
                    href="https://www.twiggsy.com/reughiurgtuirtg"
                    id="nav-link-artists"
                    data-ga-category="menu"
                    data-ga-action="artists"
                  >
                    Support
                  </a>
                </li>

                <li>
                  <a
                    href="https://www.twiggsy.com/a85utui45ghb5hg56"
                    id="nav-link-brands"
                    data-ga-category="menu"
                    data-ga-action="brands"
                  >
                    Press
                  </a>
                </li>

                <li>
                  <a
                    href="https://www.twiggsy.com/54uyhuitbgrhtgjkrtjkg"
                    id="nav-link-investors"
                    data-ga-category="menu"
                    data-ga-action="investors"
                  >
                    Investors
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-xs-6 col-sm-4 col-md-2">
              <h3 className="nav-title">For Business</h3>
              <ul className="nav">
                <li>
                  <a href="https://www.twiggsy.com/a45thu45uibgh4b5gh">Twiggsy for Business</a>
                </li>

                <li className="hidden-xs">
                  <a href="https://www.twiggsy.com/a54ughu45bg45g">Pricing</a>
                </li>
                <li className="visible-xs hidden-sm">
                  <a href="https://www.twiggsy.com/a45gu4g4bg4">Contact</a>
                </li>
              </ul>
            </div>

            <div className="col-xs-12 col-md-4 col-social">
              <ul className="nav">
                <li>
                  <a href="line://ti/p/@twiggsy" target="_blank" className="fab fa-line" />
                </li>

                <li>
                  <a
                    href="https://instagram.com/twiggsycom"
                    target="_blank"
                    className="fab fa-instagram"
                  />
                </li>

                <li>
                  <a
                    href="https://facebook.com/twiggsy"
                    target="_blank"
                    className="fab fa-facebook-square"
                  />
                </li>

                <li>
                  <a
                    href="mailto:support@twiggsy.com?subject=Support"
                    target="_blank"
                    className="fas fa-envelope-square"
                  />
                </li>
              </ul>
            </div>
          </nav>

          <nav className="row row-small">
            <div className="col-xs-9 col-md-7">
              <ul className="nav nav-small">
                <li>
                  <a href="legal/end-user-agreement/index.html">Terms</a>
                </li>
                <li>
                  <a href="privacy/index.html">Privacy</a>
                </li>

                <li />

                <li>
                  <a href="legal/cookies-policy/index.html">Cookies</a>
                </li>
                <li />
              </ul>
            </div>
            <div className="col-xs-3 col-md-5 text-right">
              <small className="copyright" />
            </div>
          </nav>
        </div>
      </footer>
    );
  }
}

export default Footers;

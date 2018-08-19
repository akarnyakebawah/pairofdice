import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import styled from "styled-components";

import Greenation from "../../assets/image/Greenation.png";
import Leo from "../../assets/image/Ieo.png";
import Wisjul from "../../assets/image/Wisjul.png";
import Sbmitb2021 from "../../assets/image/sbmitb2021.png";
import Tawaria2018 from "../../assets/image/tawaria2018.png";

const Imagepad = styled.div`
  padding-bottom: 20px;
  text-align: center;

  > img {
    width: 95%;
    margin: 0 auto;
  }

  > h3 {
    font-size: 20px;
    font-weight: 900;
    line-height: 1.4;
    color: white;

    letter-spacing: -0.01em;
    margin-top: 24px;
    margin-bottom: 5px;
  }

  > span {
    color: #919496;
    font-weight: 300;
    line-height: 0.5;
  }

  > .slick-dots li.slick-active button:before {
    color: white;
  }
`;

class Featured extends Component {
  render() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 4,
      initialSlide: 0,
      dotsClass: "slick-dotas",
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
    return (
      <div className="container">
        <div className="col-md-12">
          <h3 className="headline centered padding-top-45 margin-bottom-45">
            <span style={{ "font-size": "32px" }}>🔥 Featured</span>
          </h3>
        </div>
        <div className="col-md-12">
          <Slider {...settings} arrows={false}>
            <div>
              <a href="http://www.twiggsy.com/TAWARIA2018">
                <Imagepad>
                  <img src={Tawaria2018} />
                  <h3>Tawaria 2018</h3>
                  <span>TAWARIA2018</span>
                </Imagepad>
              </a>
            </div>
            <div>
              <a href="http://www.twiggsy.com/sbmitb2021">
                <Imagepad>
                  <img src={Sbmitb2021} />
                  <h3>SBM ITB 2021</h3>
                  <span>sbmitb2021</span>
                </Imagepad>
              </a>
            </div>
            <div>
              <a href="http://www.twiggsy.com/Wisjul2018">
                <Imagepad>
                  <img src={Wisjul} />
                  <h3>Wisjul 2018</h3>
                  <span>Wisjul2018</span>
                </Imagepad>
              </a>
            </div>
            <div>
              <a href="http://www.twiggsy.com/Greenation2018">
                <Imagepad>
                  <img src={Greenation} />
                  <h3>Greenation 2018</h3>
                  <span>Greenation2018</span>
                </Imagepad>
              </a>
            </div>
            <div>
              <a href="http://www.twiggsy.com/ieo">
                <Imagepad>
                  <img src={Leo} />
                  <h3>Indonesia Economic Outlook '19</h3>
                  <span>ieo</span>
                </Imagepad>
              </a>
            </div>
          </Slider>
        </div>
      </div>
    );
  }
}
export default Featured;

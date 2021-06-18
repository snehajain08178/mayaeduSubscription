import { CButton, CImg } from '@coreui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import img from '../../assets/img';
import endpoints from '../../routes/endpoints';
import './home.scss';

function Home() {
  return (
    <div className="View__Home">
      <div className="View__Home__Image__Wrapper">
        <div className="View__Home__Container container">
          <div className="row mx-auto">
            <div className="col-md-9 mt-lg-5 d-flex justify-content-center justify-content-sm-start flex-column text-center text-md-left align-items-center align-items-md-start View__Home__Container__Left">
              <h1 className="text-white font-weight-bold">This is MayaEDU,</h1>
              <h1 className="text-white font-weight-bold">AI for diagnosis</h1>
              <span className="mt-5">
                <h4 className="text-white">
                  AI healthcare in your hands, accessible 24/7. Analyze <br />
                  symptoms, get healthcare insights & the right care.
                </h4>
              </span>
              <CButton
                color="info"
                size="lg"
                className="View__Home__Button mt-4 text-decoration-none"
                type="link"
              >
                <Link to={endpoints.signup} className="text-white text-decoration-none">Get Started</Link>
              </CButton>
            </div>
            <div className="col-md-3 d-flex justify-content-center justify-content-sm-end mt-4 mt-md-0">
              <CImg src={img.landingMobileImg} width={250} height={450} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

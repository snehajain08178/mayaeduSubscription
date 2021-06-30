import { CButton, CImg } from '@coreui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import img from '../../assets/img';
import endpoints from '../../routes/endpoints';
import './home.scss';
import '../../scss/styles.scss';
import {
  conversationalInterface,
  clinicalAlgorithms,
  medicalKnowledge,
  conversationalInterface1,
  conversationalInterface2,
  clinicalAlgorithms1,
  clinicalAlgorithms2,
  medicalKnowledge1,
  medicalKnowledge2
} from '../../libs/strings';

function Home() {
  return (
    <div className="View__Home">
      <div className="View__Home__Image__Wrapper">
        <div className="View__Home__Container container">
          <div className="row mx-auto">
            <div className="col-md-9 mt-lg-5 d-flex justify-content-center justify-content-sm-start flex-column text-center text-md-left align-items-center align-items-md-start View__Home__Container__Left">
              <p className="text-white font-weight-bold Font-Size--48px">Maya EDU, a unique interactive</p>
              <p className="text-white font-weight-bold Font-Size--48px">flip clinical-education tool</p>
              <span className="mt-5">
                <h3 className="text-white">
                  AI healthcare in your hands, accessible 24/7. Analyze <br />
                  symptoms, get healthcare insights & the right care.
                </h3>
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
            <CImg src={img.landingMobileImg} width={250} height={500} />
            </div>
          </div>
        </div>
        <div className="container">
            <div className="row">
              <div className="col-sm View__Feature__Card border">
                <p>{conversationalInterface}</p>
                <p>{conversationalInterface1}</p>
                <p>{conversationalInterface2}</p>
              </div>
              <div className="col-sm View__Feature__Card border">
                <p>{clinicalAlgorithms}</p>
                <p>{clinicalAlgorithms1}</p>
                <p>{clinicalAlgorithms2}</p>
              </div>
              <div className="col-sm View__Feature__Card border">
                <p>{medicalKnowledge}</p>
                <p>{medicalKnowledge1}</p>
                <p>{medicalKnowledge2}</p>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}

export default Home;

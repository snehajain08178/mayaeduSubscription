import { CButton, CImg } from '@coreui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import Typist from 'react-typist';
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
  medicalKnowledge2,
  patientDiagnosis,
  patientDiagnosis1,
  practiceCases,
  practiceCases1,
  prepareExams,
  prepareExams1,
  activeCases,
  activeCases1,
  universityCirculum,
  universityCirculum1
} from '../../libs/strings';
import SVG from '../../assets/img/svg';

function Home() {
  return (
    <div className="View__Home">
      <div className="View__Home__Image__Wrapper">
        <div className="Pt--130"></div>
        <div className="View__Home__Container container">
          <div className="row mx-auto">
            <div className="col-md-9 mt-lg-5 d-flex justify-content-center justify-content-sm-start flex-column text-center text-md-left align-items-center align-items-md-start View__Home__Container__Left">
            <Typist className="mt-5 text-primary" cursor={{ show: false }} avgTypingDelay={100}>
                <p className="text-white font-weight-bold Font-Size--48px">Maya EDU, a unique interactive</p>
                <p className="text-white font-weight-bold Font-Size--48px">flip clinical-education tool</p>
                <span className="mt-5">
                  <h3 className="text-primary">
                    AI healthcare in your hands, accessible 24/7. Analyze <br />
                    symptoms, get healthcare insights & the right care.
                  </h3>
                </span>
                </Typist>
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
              <CImg src={img.landingMobileImg} width={350} height={480} />
            </div>
          </div>
        </div>
        <div className="container" style={{ marginTop: '50px' }}>
          <div className="row">
            <div className="col-sm View__Feature__Card border">
              <div className="ribbon mb-5">{conversationalInterface}</div>
              <CImg src={SVG.conversationalIcon} />
              <div className="mt-5 mb-3">
                <p>{conversationalInterface1}</p>
                <p>{conversationalInterface2}</p>
              </div>
            </div>
            <div className="col-sm View__Feature__Card border">
              <div className="ribbon mb-5">{clinicalAlgorithms}</div>
              <CImg src={SVG.algorithmIcon} />
              <div className="mt-5 mb-3">
                <p>{clinicalAlgorithms1}</p>
                <p>{clinicalAlgorithms2}</p>
              </div>
            </div>
            <div className="col-sm View__Feature__Card border">
              <div className="ribbon mb-5">{medicalKnowledge}</div>
              <CImg src={SVG.medicalKnowledgeIcon} />
              <div className="mt-5 mb-3">
                <p>{medicalKnowledge1}</p>
                <p>{medicalKnowledge2}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="Layouts__HomePage text-primary">
        <div className="d-flex row justify-content-center Mt--50">
          <div className="col-md-6 text-center align-self-center">
              <div>
                <h1 className="font-weight-bold mb-4">
                  {patientDiagnosis}
                </h1>
              </div>
              <div className="d-flex w-75 mx-auto mt-4">
                <p>{patientDiagnosis1}</p>
              </div>
          </div>
          <div className="col-md-4 justify-content-sm-end featureImagesBackground">
              <CImg src={img.patientDiagnosis} width={290} height={480}/>
          </div>
        </div>
        <div className="d-flex row justify-content-center Mt--50">
          <div className="col-md-4 featureImagesBackground">
              <CImg src={img.praticeCasesImg} width={290} height={480}/>
          </div>
          <div className="col-md-6 justify-content-sm-end text-center align-self-center">
              <div>
                <h1 className="font-weight-bold mb-4">
                  {practiceCases}
                </h1>
              </div>
              <div className="d-flex w-75 mx-auto mt-4">
                <p>{practiceCases1}</p>
              </div>
          </div>
        </div>
        <div className="d-flex row justify-content-center Mt--50">
          <div className="col-md-6 text-center align-self-center">
              <div>
                <h1 className="font-weight-bold mb-4">
                  {prepareExams}
                </h1>
              </div>
              <div className="d-flex w-75 mx-auto mt-4">
                <p>{prepareExams1}</p>
              </div>
          </div>
          <div className="col-md-4 justify-content-sm-end featureImagesBackground">
              <CImg src={img.prepareExamsImg} width={290} height={480}/>
          </div>
        </div>
        <div className="d-flex row justify-content-center Mt--50">
          <div className="col-md-4 featureImagesBackground">
              <CImg src={img.activeCasesImg} width={290} height={480}/>
          </div>
          <div className="col-md-6 justify-content-sm-end text-center align-self-center">
              <div>
                <h1 className="font-weight-bold mb-4">
                  {activeCases}
                </h1>
              </div>
              <div className="d-flex w-75 mx-auto mt-4">
                <p>{activeCases1}</p>
              </div>
          </div>
        </div>
        <div className="d-flex row justify-content-center Mt--50">
          <div className="col-md-6 text-center align-self-center">
              <div>
                <h1 className="font-weight-bold mb-4">
                  {universityCirculum}
                </h1>
              </div>
              <div className="d-flex w-75 mx-auto mt-4">
                <p>{universityCirculum1}</p>
              </div>
          </div>
          <div className="col-md-4 justify-content-sm-end featureImagesBackground">
              <CImg src={img.universityCirculumImg} width={290} height={480}/>
          </div>
        </div>
    </div>
    </div>
  );
}

export default Home;

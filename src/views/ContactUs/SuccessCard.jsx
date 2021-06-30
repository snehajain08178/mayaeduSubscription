import React from 'react';
import { CImg } from '@coreui/react';
import { Link } from 'react-router-dom';
import endpoints from '../../routes/endpoints';
import Button from '../../components/Button';
import svg from '../../assets/img/svg';

export default function SuccessCard() {
  return (
    <div className="container">
      <div className="card mx-auto p-2 shadow rounded-lg Form__Width">
        <div className="mx-auto mt-2">
          <CImg src={svg.tickIcon} width="100%" height="100%" />
        </div>
        <div>
          <h6 className="p-3 text-center mt-5">
            We will be glad to onboard your institution. One of our
            representatives will contact you soon.
          </h6>
        </div>
        <div className="d-flex  mx-auto">
          <Link to={endpoints.home}>
            <Button color="link">Go Back</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

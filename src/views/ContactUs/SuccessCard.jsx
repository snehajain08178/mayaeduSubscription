import React from 'react';
import { CImg } from '@coreui/react';
import { Link } from 'react-router-dom';
import endpoints from '../../routes/endpoints';
import Button from '../../components/Button';
import svg from '../../assets/img/svg';

export default function SuccessCard() {
  return (
    <div className="container">
      <div style={{ padding: '120px 0 32px 0' }}>
      <div className="card mx-auto p-2 shadow rounded-lg Form__Width">
        <div className="mx-auto my-4">
          <CImg src={svg.tickIcon} width="100%" height="100%" />
        </div>
        <div>
          <h6 className="p-4 text-center my-4">
            We will be glad to onboard your institution. One of our
            representatives will contact you soon.
          </h6>
        </div>
        <div className="mx-auto my-2">
          <Link to={endpoints.home}>
            <Button color="link">Go Back</Button>
          </Link>
        </div>
      </div>
      </div>
    </div>
  );
}

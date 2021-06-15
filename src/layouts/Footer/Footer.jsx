import { CImg } from '@coreui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import img from '../../assets/img';
import endpoints from '../../routes/endpoints';
import './footer.scss';

export default function Footer() {
  return (
    <div className="Layouts__Footer">
      <div className="d-flex">
        <div className="text-primary font-weight-bold p-3">
          <CImg src={img.footerIcon} width={100} height={20} />
        </div>
        <div className="text-primary font-weight-bold p-3">
          <Link to={endpoints.login} className="text-decoration-none">
            Sing In
          </Link>
        </div>
        <div className="text-primary font-weight-bold p-3 text-decoration-none">
          <Link className="text-decoration-none" to={endpoints.signup}>
            Sing Up
          </Link>
        </div>
      </div>
    </div>
  );
}

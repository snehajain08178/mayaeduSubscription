import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useLocation } from 'react-router';
import { notify } from '../../redux/actions/notification';
import ContentWrap from '../../components/ContentWrap';
import { getLocalStorageWithExpiry } from '../../libs/auth';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function withStripeProvider(Component, restProps) {
  function ComponentWithStripe(props) {
    const [isLoading, setLoading] = useState(false);
    const stripe = useRef(null);

    useEffect(() => {
      setLoading(true);
      loadStripe(getLocalStorageWithExpiry('STRIPE_PUBLIC_KEY')).then((res) => {
        stripe.current = res;
        setLoading(false);
      }).catch((err) => {
        props.notify(err);
        setLoading(false);
      });
      setLoading(false);
    }, []);
    const query = useQuery();
    const id = query.get('id');

    return (
      <ContentWrap isFetching={isLoading}>
        <Elements stripe={stripe.current}>
          <Component {...props} {...restProps} paymentId={id} />
        </Elements>
      </ContentWrap>
    );
  }

  ComponentWithStripe.propTypes = {
    notify: PropTypes.func.isRequired,
  };

  function mapStateToProps() {
    return {};
  }

  return connect(mapStateToProps, { notify })(ComponentWithStripe);
}

export default withStripeProvider;

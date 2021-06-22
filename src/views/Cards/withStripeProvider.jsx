import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useLocation } from 'react-router';
import { getStripePublicKey } from '../../libs/auth';

const stripePromise = loadStripe(getStripePublicKey());

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function withStripeProvider(Component, restProps) {
  function ComponentWithStripe(props) {
    const query = useQuery();
    const id = query.get('id');

    return (
      <Elements stripe={stripePromise}>
        <Component {...props} {...restProps} paymentId={id} />
      </Elements>
    );
  }

  return ComponentWithStripe;
}

export default withStripeProvider;

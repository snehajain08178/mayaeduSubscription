import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useLocation } from 'react-router';

const stripePromise = loadStripe(localStorage.getItem('STRIPE_PUBLIC_KEY'));

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

import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useLocation } from 'react-router';

const stripePromise = loadStripe(
  'pk_test_51HwJgxDSkL3ExR1ZNlbUYFX79wffsdKU9q2RTwrwW2X9efpAHFI2YJyc29TdFGKjbpTJ7ZZCOWijOiXQ7FeWzT7U00eqsnRv7m'
);

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

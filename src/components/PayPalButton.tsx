import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

interface PayPalButtonProps {
  amount: number;
  onSuccess: (details: any) => void;
  onError: (error: any) => void;
}

const PayPalButton: React.FC<PayPalButtonProps> = ({ amount, onSuccess, onError }) => {
  const initialOptions = {
    clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID,
    currency: "USD",
    intent: "capture",
    components: "buttons"
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <PayPalButtons
        style={{
          layout: "vertical",
          shape: "rect",
          color: "gold"
        }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: amount.toString(),
                  currency_code: "USD"
                },
                description: "Product Hunt Launch Service"
              }
            ],
            application_context: {
              shipping_preference: "NO_SHIPPING"
            }
          });
        }}
        onApprove={async (data, actions) => {
          if (actions.order) {
            try {
              const details = await actions.order.capture();
              onSuccess(details);
            } catch (err) {
              onError(err);
            }
          }
        }}
        onError={(err) => {
          console.error('PayPal Error:', err);
          onError(err);
        }}
        onCancel={() => {
          console.log('Payment cancelled');
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
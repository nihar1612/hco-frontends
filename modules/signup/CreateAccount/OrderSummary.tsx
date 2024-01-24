import React from 'react';
import { ChecklistItem } from 'components/page-sections/Checklist';

interface OrderSummaryProps {
  coupon?: string;
}


const checkList = {
  checklistItems: [
    { checked: true, text: 'Access to sleep therapist' },
    { checked: true, text: 'Personalized guidance via video' },
    { checked: true, text: 'Sleep tracking and insight' },
    { checked: true, text: 'Sleep progress reports' },
    { checked: true, text: '14-day money back guarantee' },
  ],
};

const getPrice = (coupon?: string) => {
  if (coupon && process.env.NEXT_PUBLIC_STRIPE_DEFAULT_COUPON === coupon) {
    return `$${process.env.NEXT_PUBLIC_STRIPE_STANDARD_PRICE_AMOUNT_AFTER_COUPON}`;
  }
  return `$${process.env.NEXT_PUBLIC_STRIPE_STANDARD_PRICE_AMOUNT}`;
};

export const OrderSummary = ({ coupon }: OrderSummaryProps) => {
  return (
    <div className="w-full pb-8 bg-white bg-opacity-6 rounded-2xl">
      <h2 className="px-8 pt-8 text-2xl font-semibold">
        Personal Sleep Therapy Program
      </h2>

      <table className="w-full text-xl font-normal leading-8 table-auto">
        <tbody>
          <ChecklistItem checklist={checkList} />
          <tr>
            <td className="pt-8 pl-8 text-2xl font-semibold">Due Today</td>
            <td className="pt-8 pr-8 text-2xl font-semibold text-right">
               {getPrice(coupon)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export const MobileOrderSummary = ({ coupon }: OrderSummaryProps) => {
  return (
    <div className="py-6 bg-white rounded-2xl bg-opacity-5">
      <h2 className="px-6 text-xl font-semibold text-center">
        Personal Sleep Therapy Program
      </h2>
      <ChecklistItem checklist={checkList} />
      <h2 className="mt-2 text-xl font-semibold leading-6 text-center">
        {getPrice(coupon)} Due Today
      </h2>
    </div>
  );
};

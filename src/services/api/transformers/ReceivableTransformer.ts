import type { 
  CreatePaymentLinkRequest, 
  PaymentAccountObject,
  ReceivableResponse,
  ReceivableFacadeCreateQuotePayload,
  ReceivableFacadeCreateInvoicePayload
} from '@monite/sdk-api';

export const transformToReceivable = (data: any) => {
  const receivable: ReceivableFacadeCreateInvoicePayload = {
    type: 'invoice',
    counterpart_id: data.counterpart_id,
    currency: data.currency,
    line_items: data.items.map((item: any) => ({
      product_id: item.id,
      quantity: item.quantity,
      unit_price: item.price
    }))
  };

  return receivable;
};

export const transformFromReceivable = (receivable: ReceivableResponse) => {
  return {
    id: receivable.id,
    amount: receivable.total_amount || 0,
    currency: receivable.currency,
    status: receivable.status,
    created_at: receivable.created_at,
    updated_at: receivable.updated_at,
    line_items: ('line_items' in receivable ? receivable.line_items : []).map(item => ({
      id: item.id,
      description: item.description,
      quantity: item.quantity,
      price: item.unit_price
    }))
  };
};
export interface Order {
  id: number;
  customerId: number;
  customerName: string;
  dishId: number;
  dishName: string;
  quantity: number;
  totalPrice: number;
  status: 'PENDENTE' | 'CONFIRMADO' | 'EM_PREPARO' | 'PRONTO' | 'ENTREGUE' | 'CANCELADO';
  deliveryAddress: string;
  createdAt: string;
  deliveryPersonId?: number;
  deliveryPersonName?: string;
}

export interface OrderRequest {
  dishId: number;
  quantity: number;
  deliveryAddress: string;
}

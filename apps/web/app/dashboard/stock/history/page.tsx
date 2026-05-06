'use client';

import { useStockHistory } from '@repo/stock';
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from '@repo/ui/table';
import { Badge } from '@repo/ui/badge';

export default function StockHistoryPage() {
  const { history, loading } = useStockHistory();

  const getVariant = (type: string) => {
    switch (type) {
      case 'in': return 'success';
      case 'out': return 'warning';
      case 'adjustment': return 'info';
      default: return 'neutral';
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Stock Movement History</h1>
          <p className="text-gray-500">Audit trail for all inventory changes</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Timestamp</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>User</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-12 text-gray-500">
                  Loading history...
                </TableCell>
              </TableRow>
            ) : history.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-12 text-gray-500">
                  No movement records found.
                </TableCell>
              </TableRow>
            ) : (
              history.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>{new Date(record.timestamp).toLocaleString()}</TableCell>
                  <TableCell className="font-medium">{record.productId}</TableCell>
                  <TableCell>
                    <Badge variant={getVariant(record.type)}>{record.type}</Badge>
                  </TableCell>
                  <TableCell className={record.type === 'in' ? 'text-green-600 font-bold' : record.type === 'out' ? 'text-orange-600 font-bold' : ''}>
                    {record.type === 'in' ? '+' : record.type === 'out' ? '-' : ''}{record.quantity}
                  </TableCell>
                  <TableCell>{record.reason}</TableCell>
                  <TableCell>{record.user}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

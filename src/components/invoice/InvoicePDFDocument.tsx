import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { InvoiceData } from '@/types/invoice';

// Define styles for PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  column: {
    flexDirection: 'column',
  },
  label: {
    fontSize: 10,
    color: '#666',
    marginBottom: 4,
  },
  value: {
    fontSize: 12,
  },
  table: {
    marginTop: 30,
    marginBottom: 30,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingBottom: 5,
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  description: {
    flex: 2,
  },
  quantity: {
    flex: 1,
    textAlign: 'center',
  },
  price: {
    flex: 1,
    textAlign: 'right',
  },
  total: {
    marginTop: 30,
    borderTopWidth: 1,
    borderTopColor: '#000',
    paddingTop: 10,
  },
  notes: {
    marginTop: 30,
    fontSize: 10,
    color: '#666',
  },
});

interface Props {
  data: InvoiceData;
}

const InvoicePDFDocument: React.FC<Props> = ({ data }) => {
  const calculateTotal = () => {
    return data.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>INVOICE</Text>
          
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.label}>FROM</Text>
              <Text style={styles.value}>{data.companyName}</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.label}>INVOICE NUMBER</Text>
              <Text style={styles.value}>{data.invoiceNumber}</Text>
            </View>
          </View>
          
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.label}>BILL TO</Text>
              <Text style={styles.value}>{data.clientName}</Text>
              <Text style={styles.value}>{data.clientEmail}</Text>
              <Text style={styles.value}>{data.clientAddress}</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.label}>DATE</Text>
              <Text style={styles.value}>{data.date}</Text>
              <Text style={styles.label}>DUE DATE</Text>
              <Text style={styles.value}>{data.dueDate}</Text>
            </View>
          </View>
        </View>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.description}>Description</Text>
            <Text style={styles.quantity}>Quantity</Text>
            <Text style={styles.price}>Price</Text>
          </View>
          
          {data.items.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.quantity}>{item.quantity}</Text>
              <Text style={styles.price}>${item.price.toFixed(2)}</Text>
            </View>
          ))}
        </View>

        <View style={styles.total}>
          <Text style={styles.value}>Total: ${calculateTotal().toFixed(2)}</Text>
        </View>

        {data.notes && (
          <View style={styles.notes}>
            <Text style={styles.label}>NOTES</Text>
            <Text style={styles.value}>{data.notes}</Text>
          </View>
        )}
      </Page>
    </Document>
  );
};

export default InvoicePDFDocument;

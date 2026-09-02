import type { Metadata } from 'next';
import DataDeletion from '@/views/DataDeletion';

export const metadata: Metadata = {
  title: 'Data Deletion — BizNavigo',
};

export default function DataDeletionPage() {
  return <DataDeletion />;
}
